import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo/site-config";
import { getAllVillaSlugsForSitemap } from "@/lib/seo/fetch-villa-slugs";
import { getBlogSitemapRouteDefs, getStaticSitemapRouteDefs } from "@/lib/seo/sitemap-routes";

const DEFAULT_LASTMOD = new Date("2026-04-19");

function toAbsolute(path: string): string {
  const origin = getSiteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticDefs = getStaticSitemapRouteDefs();
  const blogDefs = getBlogSitemapRouteDefs();
  const villaSlugs = await getAllVillaSlugsForSitemap();

  const out: MetadataRoute.Sitemap = [];

  for (const def of [...staticDefs, ...blogDefs]) {
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
