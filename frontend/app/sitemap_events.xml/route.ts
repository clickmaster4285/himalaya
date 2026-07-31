import { getSiteOrigin } from "@/lib/seo/site-config";

const DEFAULT_LASTMOD = "2026-07-31";

export const revalidate = 300;

// All event slugs extracted from your eventDetails object
// These match exactly what's in your events/[slug]/page.tsx
function getEventSlugs(): string[] {
  // This is the complete list from your eventDetails object
  return [
    "nikah-wedding-reception",
    "mehndi",
    "baraat",
    "dholki-bridal-shower",
    "valima-wedding-dinner",
    "engagement-ceremonies",
    "sufi-qawwali-evenings",
    "private-musical-concerts",
    "mushaira-poetry-evenings",
    "dj-nights-music-parties",
    "live-band-performances",
    "cultural-shows-acts",
    "corporate-retreat-packages",
    "product-launches-brand-events",
    "award-dinners-gala-nights",
    "conferences-seminars",
    "team-building-retreats",
    "exhibitions-trade-meets",
    "milestone-birthdays",
    "eid-gatherings-family-reunions",
    "baby-showers-gender-reveal",
    "graduation-parties",
    "retirement-celebrations",
    "farewells-send-offs",
    "bonfire-stargazing-nights",
    "guided-trails-forest-walks",
    "private-chef-dining-experiences",
    "adventure-outdoor-activities",
    "workshops-creative-sessions",
    "photography-content-packages",
    "yoga-meditation-retreats",
    "digital-detox-experiences",
    "spa-relaxation-escapes",
    "health-fitness-camps",
    "holistic-healing-programs",
    "luxury-honeymoon-packages"
  ];
}

export async function GET() {
  const origin = getSiteOrigin();
  const eventSlugs = getEventSlugs();

  // Generate URLs for all events
  const eventUrls = eventSlugs.map((slug) => {
    return `  <url>
    <loc>${origin}/events/${slug}</loc>
    <lastmod>${DEFAULT_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Add the main events page
  const mainEventsPage = `  <url>
    <loc>${origin}/events</loc>
    <lastmod>${DEFAULT_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>`;

  const allEntries = [mainEventsPage, ...eventUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}