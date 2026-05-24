import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo/site-config";
import { getAllEventSlugs } from "@/lib/events/event-images";
import { getAllVillaSlugsForSitemap } from "@/lib/seo/fetch-villa-slugs";
import { getBlogSitemapRouteDefs, getStaticSitemapRouteDefs } from "@/lib/seo/sitemap-routes";

const DEFAULT_LASTMOD = new Date("2026-04-19");

function toAbsolute(path: string): string {
  const origin = getSiteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

function pushDef(
  out: MetadataRoute.Sitemap,
  seen: Set<string>,
  def: {
    path: string;
    lastModified?: Date;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  },
) {
  if (seen.has(def.path)) return;
  seen.add(def.path);
  out.push({
    url: toAbsolute(def.path),
    lastModified: def.lastModified ?? DEFAULT_LASTMOD,
    changeFrequency: def.changeFrequency,
    priority: def.priority,
  });
}

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticDefs = getStaticSitemapRouteDefs();
  const blogDefs = getBlogSitemapRouteDefs();
  const [villaSlugs, eventSlugs] = await Promise.all([
    getAllVillaSlugsForSitemap(),
    Promise.resolve(getAllEventSlugs()),
  ]);

  const out: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  for (const def of [...staticDefs, ...blogDefs]) {
    pushDef(out, seen, def);
  }

  for (const slug of villaSlugs) {
    pushDef(out, seen, {
      path: `/villas/${encodeURIComponent(slug)}`,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const slug of eventSlugs) {
    pushDef(out, seen, {
      path: `/events/${encodeURIComponent(slug)}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return out;
}
