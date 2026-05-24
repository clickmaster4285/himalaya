import type { Metadata } from "next";
import { absoluteUrl, getSiteOrigin } from "@/lib/seo/site-config";

export type OgType = "website" | "article";

/** Shorter suffix keeps titles under Screaming Frog's ~561px SERP width limit. */
export const SITE_TITLE_BRAND = "Himalaya Villas & Resorts";
export const SERP_TITLE_BRAND = "Himalaya Villas";
export const SERP_TITLE_MAX_PIXELS = 561;

const TITLE_BRAND_SUFFIX = ` | ${SERP_TITLE_BRAND}`;

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  canonicalPath?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: OgType;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** @deprecated Brand is applied centrally. */
  appendSiteBrand?: boolean;
};

function resolveImageUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absoluteUrl(src.startsWith("/") ? src : `/${src}`);
}

/** Approximate Google SERP title pixel width (Screaming Frog uses ~561px). */
export function estimateTitlePixels(title: string): number {
  let pixels = 0;
  for (const ch of title) {
    if (ch === " ") pixels += 4.2;
    else if (ch === "|") pixels += 4.8;
    else if (ch === "—" || ch === "–") pixels += 10;
    else if (ch === "&") pixels += 8.5;
    else if (ch === "W" || ch === "M") pixels += 11;
    else if (ch === "w" || ch === "m") pixels += 8;
    else if (/[A-Z]/.test(ch)) pixels += 8.5;
    else if (/[0-9]/.test(ch)) pixels += 7.5;
    else pixels += 7;
  }
  return pixels;
}

/** Remove trailing site-brand fragments so brand suffix is never duplicated. */
export function stripTitleBrand(title: string): string {
  let cleaned = title.trim();
  const brandPattern =
    /\s*(?:[|—–-]\s*)?(?:Himalaya(?:\s+Premium)?\s+Villas(?:\s*(?:&\s*Resorts|and\s+Resort))?)(?:\s*(?:Bhurban|Murree))?\s*$/i;

  while (brandPattern.test(cleaned)) {
    cleaned = cleaned.replace(brandPattern, "").trim();
  }

  return cleaned.replace(/\s*[|—–-]\s*$/, "").trim();
}

function truncateAtWord(text: string): string {
  const lastSpace = text.lastIndexOf(" ");
  if (lastSpace > text.length * 0.55) {
    return text.slice(0, lastSpace).replace(/[,;:|—–-…]+$/, "").trim();
  }
  return text.replace(/[,;:|—–-…]+$/, "").trim();
}

/** Fit primary segment so full title (with brand suffix) stays within pixel budget. */
export function fitTitleForSerp(primary: string): string {
  const cleaned = stripTitleBrand(primary);
  if (!cleaned) return SERP_TITLE_BRAND;

  let candidate = cleaned;
  while (candidate.length > 0) {
    const full = `${candidate}${TITLE_BRAND_SUFFIX}`;
    if (estimateTitlePixels(full) <= SERP_TITLE_MAX_PIXELS) {
      return candidate;
    }
    candidate = truncateAtWord(candidate.slice(0, Math.max(0, candidate.length - 4)));
  }

  return SERP_TITLE_BRAND;
}

/** Full document `<title>` for `{ absolute: buildDocumentTitle(...) }`. */
export function buildDocumentTitle(primary: string): string {
  return `${fitTitleForSerp(primary)}${TITLE_BRAND_SUFFIX}`;
}

/** Use on pages that export manual `metadata` objects. */
export function absoluteSeoTitle(primary: string): Metadata["title"] {
  return { absolute: buildDocumentTitle(primary) };
}

export function createPageMetadata(input: PageSeoInput): Metadata {
  const canonicalPath = input.canonicalPath ?? input.path;
  const canonical = absoluteUrl(canonicalPath);
  const primaryTitle = fitTitleForSerp(input.title);
  const documentTitle = buildDocumentTitle(input.title);
  const ogImages = input.ogImage
    ? [{ url: resolveImageUrl(input.ogImage), alt: primaryTitle }]
    : [{ url: resolveImageUrl("/assets/gallery-exterior.jpg"), alt: primaryTitle }];

  const og: Metadata["openGraph"] = {
    title: primaryTitle,
    description: input.description,
    url: canonical,
    siteName: SITE_TITLE_BRAND,
    locale: "en_PK",
    type: input.ogType === "article" ? "article" : "website",
    images: ogImages,
  };

  if (input.ogType === "article" && input.publishedTime) {
    (og as { publishedTime?: string }).publishedTime = input.publishedTime;
    if (input.modifiedTime) (og as { modifiedTime?: string }).modifiedTime = input.modifiedTime;
  }

  return {
    title: { absolute: documentTitle },
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    openGraph: og,
    twitter: {
      card: "summary_large_image",
      title: primaryTitle,
      description: input.description,
      images: ogImages.map((i) => i.url),
    },
    robots: input.noindex ? { index: false, follow: true, googleBot: { index: false, follow: true } } : undefined,
    metadataBase: new URL(getSiteOrigin()),
  };
}
