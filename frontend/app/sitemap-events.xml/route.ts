import { getSiteOrigin } from "@/lib/seo/site-config";

const DEFAULT_LASTMOD = "2026-04-19";

export const revalidate = 300;

// Event-related pages that should be in the events sitemap
const eventRoutes = [
  { path: "/book/event", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/book/wedding", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/book/dining", priority: 0.9, changeFrequency: "weekly" as const },
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

  const entries = eventRoutes.map((route) => `  <url>
    <loc>${origin}${route.path}</loc>
    <lastmod>${DEFAULT_LASTMOD}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);

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
