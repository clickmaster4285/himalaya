import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo/site-config";
import { getAllVillaSlugsForSitemap } from "@/lib/seo/fetch-villa-slugs";
import { getAllArticleSitemapRouteDefs, getBlogSitemapRouteDefs, getStaticSitemapRouteDefs } from "@/lib/seo/sitemap-routes";
import { isExcludedFromSitemap } from "@/lib/seo/sitemap-filter";

const DEFAULT_LASTMOD = new Date("2026-04-19");

function toAbsolute(path: string): string {
  const origin = getSiteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticDefs = getStaticSitemapRouteDefs();
  const blogDefs = getBlogSitemapRouteDefs();
  const articleDefs = getAllArticleSitemapRouteDefs();
  const villaSlugs = await getAllVillaSlugsForSitemap();

  const out: MetadataRoute.Sitemap = [];

  const seen = new Set<string>();
  for (const def of [...staticDefs, ...blogDefs, ...articleDefs]) {
    if (isExcludedFromSitemap(def.path) || seen.has(def.path)) continue;
    seen.add(def.path);
    out.push({
      url: toAbsolute(def.path),
      lastModified: def.lastModified ?? DEFAULT_LASTMOD,
      changeFrequency: def.changeFrequency,
      priority: def.priority,
    });
  }

  for (const slug of villaSlugs) {
    out.push({
      url: toAbsolute(`/villas/${encodeURIComponent(slug)}`),
      lastModified: DEFAULT_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  return out;
}
