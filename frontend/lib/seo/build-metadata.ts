import type { Metadata } from "next";
import { BRAND, absoluteUrl, getSiteOrigin } from "@/lib/seo/site-config";

export type OgType = "website" | "article";

export type PageSeoInput = {
  title: string;
  description: string;
  /** Current pathname including leading slash (used if canonicalPath omitted for canonical). */
  path: string;
  /** Override canonical pathname when legacy URL should consolidate to another path. */
  canonicalPath?: string;
  keywords?: string[];
  /** Public path `/assets/...` or absolute image URL */
  ogImage?: string;
  ogType?: OgType;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  /** If true, emits noindex,follow (dashboard, drafts, etc.) */
  noindex?: boolean;
  /**
   * When false, title is emitted as-is (already branded).
   * Default true appends `| Himalaya Villas & Resorts` when title has no Himalaya token.
   */
  appendSiteBrand?: boolean;
};

function resolveImageUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absoluteUrl(src.startsWith("/") ? src : `/${src}`);
}

const TRAILING_BRAND = /\s*[|\-—–:]\s*Himalaya Villas(?:\s*(?:&|and|&amp;)\s*Resorts?)?(?:,?\s*Bhurban(?:,?\s*Murree)?)?\s*$/i;

/**
 * HIM-TRUST-0007: one brand suffix on every title.
 * A trailing brand in any older form is rewritten to the standard suffix; a title that names the
 * brand mid-sentence is left alone; any other title gets the suffix appended.
 */
export function formatTitle(title: string, _appendSiteBrand = true): string {
  const trimmed = title.trim();
  const base = trimmed.replace(TRAILING_BRAND, "").trim();
  if (base !== trimmed) return `${base}${BRAND.titleSuffix}`;
  if (/himalaya villas/i.test(trimmed)) return trimmed;
  return `${trimmed}${BRAND.titleSuffix}`;
}

/**
 * App Router metadata factory — use as `export const metadata = createPageMetadata({...})`
 * or `export async function generateMetadata(...) { return createPageMetadata({...}); }`.
 * Sets canonical, Open Graph, and Twitter card fields from one config (avoids drift).
 */
export function createPageMetadata(input: PageSeoInput): Metadata {
  const appendBrand = input.appendSiteBrand !== false;
  const canonicalPath = input.canonicalPath ?? input.path;
  const canonical = absoluteUrl(canonicalPath);
  const title = formatTitle(input.title, appendBrand);
  const ogImages = input.ogImage
    ? [{ url: resolveImageUrl(input.ogImage), alt: input.title }]
    : [{ url: resolveImageUrl("/assets/gallery-exterior.jpg"), alt: input.title }];

  const og: Metadata["openGraph"] = {
    title: input.title,
    description: input.description,
    url: canonical,
    siteName: BRAND.name,
    locale: "en_PK",
    type: input.ogType === "article" ? "article" : "website",
    images: ogImages,
  };

  if (input.ogType === "article" && input.publishedTime) {
    (og as { publishedTime?: string }).publishedTime = input.publishedTime;
    if (input.modifiedTime) (og as { modifiedTime?: string }).modifiedTime = input.modifiedTime;
  }

  return {
    title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    openGraph: og,
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: ogImages.map((i) => i.url),
    },
    authors: input.authorName ? [{ name: input.authorName }] : undefined,
    robots: input.noindex ? { index: false, follow: true, googleBot: { index: false, follow: true } } : undefined,
    metadataBase: new URL(getSiteOrigin()),
  };
}
