import { getSiteOrigin } from "@/lib/seo/site-config";

const DEFAULT_LASTMOD = "2026-07-31";

export const revalidate = 300;

// All static book routes from your folder structure
const bookRoutes = [
  { path: "/book", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/book/stay", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/book/activities", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/book/dining", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/book/event", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/book/meetings", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/book/wedding", priority: 0.9, changeFrequency: "weekly" as const },
];

export async function GET() {
  const origin = getSiteOrigin();

  const entries = bookRoutes.map((route) => {
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