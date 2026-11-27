import { getSiteOrigin } from "@/lib/seo/site-config";
import { getCmsSitemapEntries } from "@/lib/seo/cms-sitemap";
import { withoutDeletedPaths } from "@/lib/erp-deleted-pages-server";

const DEFAULT_LASTMOD = "2026-07-31";

export const revalidate = 300;

// All static book routes from your folder structure
const bookRoutes = [
  { path: "/book/stay", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/book/activities", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/book/dining", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/book/event", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/book/meetings", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/book/wedding", priority: 0.9, changeFrequency: "weekly" as const },
];

export async function GET() {
  const origin = getSiteOrigin();

  // ERP Page Delete Requests: deleted paths leave the sitemap.
  const deletedFiltered = await withoutDeletedPaths(bookRoutes, (route) => route.path);
  // Book pages created in the ERP (/book/…).
  const cmsEntries = await getCmsSitemapEntries("book", bookRoutes.map((route) => route.path));
  const routes = [
    ...deletedFiltered,
    ...cmsEntries.map((page) => ({ path: page.path, priority: 0.8, changeFrequency: "weekly" as const })),
  ];
  const entries = routes.map((route) => {
    return `  <url>
    <loc>${origin}${route.path}</loc>
    <lastmod>${DEFAULT_LASTMOD}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
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