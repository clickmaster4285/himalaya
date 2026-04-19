import type { Metadata } from "next";
import { absoluteUrl, getSiteOrigin } from "@/lib/seo/site-config";

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
  /** If true, emits noindex,follow (dashboard, drafts, etc.) */
  noindex?: boolean;
  /**
   * When false, title is emitted as-is (already branded).
   * Default true appends `| Himalaya Villas` when title has no Himalaya token.
   */
  appendSiteBrand?: boolean;
};

function resolveImageUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absoluteUrl(src.startsWith("/") ? src : `/${src}`);
}

function formatTitle(title: string, appendSiteBrand: boolean): string {
  if (!appendSiteBrand) return title;
  if (/himalaya/i.test(title)) return title;
  return `${title} | Himalaya Villas`;
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
    siteName: "Himalaya Villas",
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
    robots: input.noindex ? { index: false, follow: true, googleBot: { index: false, follow: true } } : undefined,
    metadataBase: new URL(getSiteOrigin()),
  };
}
