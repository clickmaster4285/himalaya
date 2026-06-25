import { getSiteOrigin } from "@/lib/seo/site-config";
import { getArticleSitemapRouteDefs } from "@/lib/seo/sitemap-routes";
import { getAllVillaSlugsForSitemap } from "@/lib/seo/fetch-villa-slugs";

const DEFAULT_LASTMOD = "2026-04-19";

export const revalidate = 300;

export async function GET() {
  const origin = getSiteOrigin();
  const villaSlugs = await getAllVillaSlugsForSitemap();
  const articleDefs = getArticleSitemapRouteDefs("villas");

  const entries = [
    ...villaSlugs.map((slug) => `  <url>
    <loc>${origin}/villas/${encodeURIComponent(slug)}</loc>
    <lastmod>${DEFAULT_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`),
    ...articleDefs.map((def) => {
      const lastmod = def.lastModified ? def.lastModified.toISOString().split("T")[0] : DEFAULT_LASTMOD;
      return `  <url>
    <loc>${origin}${def.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${def.changeFrequency}</changefreq>
    <priority>${def.priority}</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
