import { getSiteOrigin } from "@/lib/seo/site-config";
import { getArticleSitemapRouteDefs } from "@/lib/seo/sitemap-routes";

const DEFAULT_LASTMOD = "2026-04-19";

export const revalidate = 300;

// Event-related pages that should be in the events sitemap
const eventRoutes = [
  { path: "/book/event", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/book/wedding", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/book/dining", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/book/stay", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/book/activities", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/book/meetings", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/experience", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/weddings", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/family-celebrations", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/corporate-retreats", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/corporate", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/wedding-venue-near-islamabad", priority: 0.75, changeFrequency: "monthly" as const },
];

export async function GET() {
  const origin = getSiteOrigin();
  const articleDefs = getArticleSitemapRouteDefs("events");

  const entries = [...eventRoutes, ...articleDefs].map((route) => {
    const lastmod = "lastModified" in route && route.lastModified
      ? route.lastModified.toISOString().split("T")[0]
      : DEFAULT_LASTMOD;

    return `  <url>
    <loc>${origin}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
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
