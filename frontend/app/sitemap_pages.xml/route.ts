import { getSiteOrigin } from "@/lib/seo/site-config";
import { getStaticSitemapRouteDefs } from "@/lib/seo/sitemap-routes";

export const revalidate = 300;

export async function GET() {
  const origin = getSiteOrigin();
  const staticDefs = getStaticSitemapRouteDefs();

  const entries = staticDefs.map((def) => {
    const lastmod = def.lastModified ? def.lastModified.toISOString().split("T")[0] : new Date("2026-04-19").toISOString().split("T")[0];
    return `  <url>
    <loc>${origin}${def.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${def.changeFrequency}</changefreq>
    <priority>${def.priority}</priority>
  </url>`;
  });

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
