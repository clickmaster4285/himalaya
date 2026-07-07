import { getSiteOrigin } from "@/lib/seo/site-config";

export const revalidate = 300; // 5 minutes

export async function GET() {
  const origin = getSiteOrigin();

  const sitemaps = [
    { loc: `${origin}/sitemap_pages.xml`, lastmod: new Date().toISOString().split("T")[0] },
    { loc: `${origin}/sitemap_villas.xml`, lastmod: new Date().toISOString().split("T")[0] },
    { loc: `${origin}/sitemap_blogs.xml`, lastmod: new Date().toISOString().split("T")[0] },
    { loc: `${origin}/sitemap_events.xml`, lastmod: new Date().toISOString().split("T")[0] },
    { loc: `${origin}/sitemap_weather.xml`, lastmod: new Date().toISOString().split("T")[0] },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
