// lib/cms.ts
// Server-only client for the ClickMasters ERP CMS public (read-only) API:
// pages *created* in the ERP Page Creation module. Edits to existing pages
// (ERP Page Editing) live in lib/erp-edits.ts.
//
// The public API only ever returns the *published* snapshot of a page, so
// drafts / unpublished pages come back as 404 and are never rendered here.
import "server-only";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { getSiteOrigin } from "@/lib/seo/site-config";

/** ERP backend base URL (server-only; never a NEXT_PUBLIC_ variable). */
export const CMS_API_URL = (
  process.env.CMS_API_URL ??
  (process.env.NODE_ENV === "development" ? "https://apierp.clickmasters.pk" : undefined)
)?.replace(/\/+$/, "");

/** The domain this site is registered under in the ERP. */
export const CMS_SITE_DOMAIN = (process.env.CMS_SITE_DOMAIN ?? "himalayavillas.com")
  .trim()
  .toLowerCase()
  .replace(/^https?:\/\//, "")
  .replace(/^www\./, "")
  .replace(/\/.*$/, "");

/** Cache tag expired by /api/erp-revalidate when the ERP publishes. */
export const CMS_CACHE_TAG = "cms-page";
// Safety net only: publishes expire the cache immediately through
// /api/erp-revalidate. This bounds staleness if that webhook is not configured.
export const CMS_REVALIDATE_SECONDS = 300;
const CMS_TIMEOUT_MS = 5000;

// Same format the ERP stores (validSlug): "/segment" or "/nested/segment".
const SLUG_REGEX = /^(\/[a-z0-9_-]+)+$/;
const MAX_SLUG_LENGTH = 512;

export const isCmsSlug = (slug: string) => slug.length <= MAX_SLUG_LENGTH && SLUG_REGEX.test(slug);

export const cmsBaseUrl = () => `${CMS_API_URL}/public/${encodeURIComponent(CMS_SITE_DOMAIN)}`;

export type CmsSettings = Record<string, unknown>;

export type CmsSection = {
  id: string;
  type: string;
  order: number;
  content: Record<string, unknown>;
  settings: CmsSettings;
};

export type CmsSeo = {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  focusKeyword: string;
  twitterHandle: string;
};

/** Published pages the ERP attaches for Blog Posts / Related Posts sections. */
export type CmsPostSummary = {
  title: string;
  url: string;
  pageType: string;
  excerpt: string;
  image: string;
  publishedAt: string;
};

export type CmsPage = {
  title: string;
  slug: string;
  pageType: string;
  featuredImage: string;
  publishedAt: string;
  sections: CmsSection[];
  seo: CmsSeo;
  posts: CmsPostSummary[];
};

export type CmsPageSummary = {
  title: string;
  slug: string;
  pageType: string;
  publishedAt: string;
  noindex: boolean;
};

/**
 * Fetches one published page by slug (e.g. "/winter-packages").
 * Returns null when the page doesn't exist / isn't published, or when the
 * ERP is unreachable — callers show the normal not-found page in both cases,
 * so an ERP outage never crashes the site (or a build).
 */
export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  if (!isCmsSlug(slug)) return null;
  if (!CMS_API_URL) {
    console.error("[cms] CMS_API_URL is not set");
    return null;
  }
  try {
    return await fetchCmsPageCached(slug);
  } catch (error) {
    console.error(`[cms] failed to fetch page ${slug}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

async function fetchCmsPage(slug: string): Promise<CmsPage | null> {
  // slug is validated by SLUG_REGEX, so it is safe to append as a path.
  const url = `${cmsBaseUrl()}/pages${slug}`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(CMS_TIMEOUT_MS) });
  if (res.status === 404) {
    // "Website not found" is a configuration problem, not a missing page:
    // throw so it is logged and never cached as a legitimate 404.
    const body = (await res.json().catch(() => null)) as { message?: unknown } | null;
    if (body?.message === "Website not found") throw new Error(`${CMS_SITE_DOMAIN} is not registered/active in the ERP`);
    return null;
  }
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  const json = (await res.json()) as { data?: { page?: unknown } };
  const page = parsePage(json?.data?.page);
  if (!page) throw new Error(`${url} returned an invalid page payload`);
  return page;
}

// unstable_cache (not fetch's own cache) so that a 404 is cached too:
// fetch only caches 200s, which would keep serving an unpublished page from
// the stale cache forever. Outages throw instead of returning, so they are
// never cached and a revalidation during an outage keeps the last good copy.
const fetchCmsPageCached =
  process.env.NODE_ENV === "development"
    ? fetchCmsPage
    : unstable_cache(fetchCmsPage, ["cms-page", CMS_SITE_DOMAIN], {
        revalidate: CMS_REVALIDATE_SECONDS,
        tags: [CMS_CACHE_TAG],
      });

async function fetchCmsPages(): Promise<CmsPageSummary[]> {
  const url = `${cmsBaseUrl()}/pages`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(CMS_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  const json = (await res.json()) as { data?: { pages?: unknown } };
  const pages = json?.data?.pages;
  if (!Array.isArray(pages)) return [];
  return pages.map(obj).map((p) => ({
    title: str(p.title),
    slug: str(p.slug),
    pageType: str(p.pageType),
    publishedAt: str(p.publishedAt),
    noindex: p.noindex === true,
  }));
}

const fetchCmsPagesCached =
  process.env.NODE_ENV === "development"
    ? fetchCmsPages
    : unstable_cache(fetchCmsPages, ["cms-pages", CMS_SITE_DOMAIN], {
        revalidate: CMS_REVALIDATE_SECONDS,
        tags: [CMS_CACHE_TAG],
      });

/** All published ERP pages (for the sitemap). Empty on any error. */
export async function getCmsPages(): Promise<CmsPageSummary[]> {
  if (!CMS_API_URL) return [];
  try {
    return await fetchCmsPagesCached();
  } catch (error) {
    console.error("[cms] failed to list pages:", error instanceof Error ? error.message : error);
    return [];
  }
}

/* ------------------------------ metadata ------------------------------ */

const isHttpUrl = (v: string) => /^https?:\/\//i.test(v);

/** Canonical path from the ERP value, only when it points at this site. */
function canonicalPath(value: string, fallback: string): string {
  if (!value) return fallback;
  if (value.startsWith("/") && !value.startsWith("//")) return isCmsSlug(value) || value === "/" ? value : fallback;
  try {
    const url = new URL(value);
    const site = new URL(getSiteOrigin());
    const host = url.hostname.replace(/^www\./, "");
    return host === site.hostname && (url.protocol === "https:" || url.protocol === "http:") ? url.pathname : fallback;
  } catch {
    return fallback;
  }
}

/** First hero/text copy on the page, trimmed to a meta-description length. */
function fallbackDescription(page: CmsPage): string {
  for (const section of page.sections) {
    const c = section.content;
    const text = [c.description, c.body, c.bodyHtml]
      .map((v) => (typeof v === "string" ? v.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : ""))
      .find((v) => v.length >= 40);
    if (text) return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  }
  return "";
}

/** Next.js metadata built from the page's ERP SEO fields, in the site's SEO format. */
export function buildCmsMetadata(page: CmsPage | null): Metadata {
  if (!page) return { title: "Page Not Found", robots: { index: false, follow: true } };

  const { seo } = page;
  const title = seo.title || page.title;
  // Never inherit the site-wide default description (duplicate across pages):
  // fall back to the page's own opening copy.
  const description = seo.metaDescription || fallbackDescription(page);
  const ogImageSource = [seo.ogImage, page.featuredImage].find(
    (v) => isHttpUrl(v) || (v.startsWith("/") && !v.startsWith("//")),
  );
  const isArticle = page.pageType === "blog";
  const noindex = /noindex/i.test(seo.robots);

  const metadata = createPageMetadata({
    title,
    description,
    path: page.slug,
    canonicalPath: canonicalPath(seo.canonicalUrl, page.slug),
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
    ogImage: ogImageSource,
    ogType: isArticle ? "article" : "website",
    publishedTime: isArticle ? page.publishedAt || undefined : undefined,
    noindex,
  });

  if (!description) delete metadata.description;
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description || undefined;
  metadata.openGraph = { ...metadata.openGraph, title: ogTitle, description: ogDescription };
  metadata.twitter = {
    ...metadata.twitter,
    title: ogTitle,
    description: ogDescription,
    ...(/^@?\w{1,15}$/.test(seo.twitterHandle)
      ? { site: seo.twitterHandle.startsWith("@") ? seo.twitterHandle : `@${seo.twitterHandle}` }
      : {}),
  };
  if (!noindex && /nofollow/i.test(seo.robots)) metadata.robots = { index: true, follow: false };
  return metadata;
}

/* ------------------------- defensive parsing ------------------------- */
// ERP content is untrusted data: only copy known fields of the right type.

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

const SECTION_TYPE_REGEX = /^[A-Za-z][A-Za-z0-9_-]{0,40}$/;

function parsePage(raw: unknown): CmsPage | null {
  const p = obj(raw);
  const slug = str(p.slug);
  if (!slug || !Array.isArray(p.sections)) return null;
  const seo = obj(p.seo);
  const posts = obj(p.context).posts;
  // The ERP resolves the page's template (plus website/page overrides) into
  // `design`; its per-section-type defaults apply under each section's settings.
  // Brand tokens (colors, fonts) are intentionally not applied: Himalaya
  // Villas' own design system styles every ERP page.
  const sectionDefaults = obj(obj(p.design).sectionDefaults);
  return {
    title: str(p.title),
    slug,
    pageType: str(p.pageType),
    featuredImage: str(p.featuredImage),
    publishedAt: str(p.publishedAt),
    sections: p.sections
      .map(obj)
      .filter((s) => SECTION_TYPE_REGEX.test(str(s.type)) && s.hidden !== true)
      .map((s, i) => ({
        id: str(s.id) || `section-${i}`,
        type: str(s.type),
        order: typeof s.order === "number" && Number.isFinite(s.order) ? s.order : i,
        content: obj(s.content),
        settings: { ...obj(sectionDefaults[str(s.type)]), ...obj(s.settings) },
      }))
      .sort((a, b) => a.order - b.order),
    seo: {
      title: str(seo.title),
      metaDescription: str(seo.metaDescription),
      canonicalUrl: str(seo.canonicalUrl),
      robots: str(seo.robots),
      ogTitle: str(seo.ogTitle),
      ogDescription: str(seo.ogDescription),
      ogImage: str(seo.ogImage),
      focusKeyword: str(seo.focusKeyword),
      twitterHandle: str(seo.twitterHandle),
    },
    posts: (Array.isArray(posts) ? posts : []).map(obj).map((post) => ({
      title: str(post.title),
      url: str(post.url),
      pageType: str(post.pageType),
      excerpt: str(post.excerpt),
      image: str(post.image),
      publishedAt: str(post.publishedAt),
    })),
  };
}
