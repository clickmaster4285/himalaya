import { getSiteOrigin } from "@/lib/seo/site-config";
import { getCmsSitemapEntries } from "@/lib/seo/cms-sitemap";
import { withoutDeletedPaths } from "@/lib/erp-deleted-pages-server";
import { getArticleSitemapRouteDefs, getBlogSitemapRouteDefs } from "@/lib/seo/sitemap-routes";

export const revalidate = 300;

export async function GET() {
  const origin = getSiteOrigin();
  const blogDefs = getBlogSitemapRouteDefs();
  const articleDefs = getArticleSitemapRouteDefs("blog");

  // ERP Page Delete Requests: deleted paths leave the sitemap.
  const defs = await withoutDeletedPaths([...blogDefs, ...articleDefs], (def) => def.path);
  // Blog pages created in the ERP (/blogs/… or pageType "blog").
  const cmsEntries = await getCmsSitemapEntries("blogs", defs.map((def) => def.path));
  const entries = defs.map((def) => {
    const lastmod = def.lastModified ? def.lastModified.toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
    return `  <url>
    <loc>${origin}${def.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${def.changeFrequency}</changefreq>
    <priority>${def.priority}</priority>
  </url>`;
  }).concat(
    cmsEntries.map(
      (page) => `  <url>
    <loc>${origin}${page.path}</loc>
    <lastmod>${page.lastmod ?? new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ),
  );

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
