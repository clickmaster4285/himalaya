/**
 * Exact-path permanent redirects outside the intent families. next.config.ts serves them and the
 * sitemaps leave them out, so no sitemap lists a URL that redirects (HIM-TECH-0006 T2).
 */
// Imported by next.config.ts: keep this file free of "@/" imports.

export const WHY_VILLAS_POST = "/blogs/why-villas-are-the-ultimate-luxury-stays-in-bhurban";

function retired(pairs: [string, string][]): { source: string; destination: string; permanent: true }[] {
  return pairs.map(([source, destination]) => ({ source, destination, permanent: true as const }));
}

export const legacyRedirects: { source: string; destination: string; permanent: true }[] = [
  { source: "/villas-in-bhurban-murree", destination: WHY_VILLAS_POST, permanent: true },
  { source: "/book-now", destination: "/book", permanent: true },
  { source: "/journal", destination: "/blogs", permanent: true },
  { source: "/about", destination: "/about-himalaya-villas-bhurban", permanent: true },
  { source: "/services", destination: "/", permanent: true },
  { source: "/gallery", destination: "/", permanent: true },
  // One hop from every old form of this post to its final lowercase URL.
  { source: "/Why-Villas-are-the-ultimate-luxury-stays-in-Bhurban", destination: WHY_VILLAS_POST, permanent: true },
  { source: "/why-villas-are-the-ultimate-luxury-stays-in-bhurban", destination: WHY_VILLAS_POST, permanent: true },
  // Old internal links that returned 404.
  { source: "/blogs/hotels-in-bhurban-murree", destination: "/hotels-in-bhurban-murree", permanent: true },
  { source: "/murree-bhurban-ramadan", destination: "/bhurban-cedar-estate-eid-weekend-planning", permanent: true },
  // Event types merged into the offering they belong to (HIM-CONTENT-0004).
  { source: "/events/live-band-performances", destination: "/events/private-musical-concerts", permanent: true },
  { source: "/events/team-building-retreats", destination: "/events/corporate-retreat-packages", permanent: true },
  { source: "/events/digital-detox-experiences", destination: "/events/yoga-meditation-retreats", permanent: true },
  { source: "/events/health-fitness-camps", destination: "/events/spa-relaxation-escapes", permanent: true },
  { source: "/events/holistic-healing-programs", destination: "/events/spa-relaxation-escapes", permanent: true },
  // Retired pages (removed Nov 2026): every inbound link lands on the closest live page.
  // /luxury-hotels-in-murree, /family-hotels-in-murree and /romantic-hotels-murree redirect via intent-canonicals.ts.
  ...retired([
    ["/womens-safety-mountain-travel-bhurban", "/villas"],
    ["/womens-professional-retreats-pakistan", "/corporate-retreats"],
    ["/women-solo-travellers-bhurban", "/villas"],
    ["/women-leadership-retreat-islamabad", "/corporate-retreats"],
    ["/winter-bonfire-bhurban", "/experience"],
    ["/why-private-villa-over-hotel-bhurban", "/himalaya-villas-not-a-hotel"],
    ["/what-makes-bhurban-cedar-estate-different", "/himalaya-villas-not-a-hotel"],
    ["/weekend-getaway-near-islamabad", "/villas"],
    ["/villa-with-fireplace-bhurban", "/villas"],
    ["/villa-with-bhurban", "/villas"],
    ["/villa-with-bbq-bhurban", "/villas"],
    ["/villa-near-murree-families", "/family-villa-bhurban-murree"],
    ["/villa-near-islamabad-airport", "/islamabad-to-bhurban-guide"],
    ["/villa-for-2-guests-bhurban", "/villas"],
    ["/villa-for-4-guests-bhurban", "/villas"],
    ["/villa-for-6-guests-bhurban", "/villas"],
    ["/villa-for-8-guests-bhurban", "/villas"],
    ["/villa-for-10-guests-bhurban", "/villas"],
    ["/villa-for-12-guests-bhurban", "/villas"],
    ["/villa-for-15-guests-bhurban", "/himalaya-villas-full-estate-buyout"],
    ["/villa-for-20-guests-bhurban", "/himalaya-villas-full-estate-buyout"],
    ["/villa-for-25-guests-bhurban", "/himalaya-villas-full-estate-buyout"],
    ["/villa-for-30-guests-bhurban", "/himalaya-villas-full-estate-buyout"],
    ["/uae-banking-community-ramadan-return-bhurban", "/bhurban-cedar-estate-from-dubai-uae"],
    ["/sunset-suite-himalaya-villas-bhurban", "/villas"],
    ["/shangrila-resort-murree-alternative", "/hotels-in-bhurban"],
    ["/shangrila-marco-polo-murree-guide", "/hotels-in-bhurban"],
    ["/restaurants-near-bhurban-murree", "/dining"],
    ["/remote-work-villa-bhurban", "/villas"],
    ["/ramada-murree-guide", "/hotels-in-bhurban"],
    ["/ramada-murree-alternative", "/hotels-in-bhurban"],
    ["/private-pool-villa-near-islamabad", "/villas"],
    ["/falettis-grand-hotel-murree", "/hotels-in-bhurban"],
    ["/cheap-hotels-murree-guide", "/hotels-in-bhurban"],
    ["/bhurban-resort-guide", "/bhurban-resorts"],
    ["/bhurban-murree-visa-guide", "/things-to-do-in-murree"],
    ["/bhurban-murree-ramadan", "/bhurban-cedar-estate-eid-weekend-planning"],
    ["/bhurban-murree-instagram-guide", "/bhurban-murree-photography-guide"],
    ["/bhurban-hotel-rooms", "/hotel-rooms-in-murree"],
    ["/bhurban-boutique-accommodation", "/accommodations"],
    ["/bhurban-accommodation-guide", "/accommodations"],
    ["/best-hotels-nathia-gali", "/hotels-in-bhurban"],
    ["/ayubia-national-park-guide", "/things-to-do-in-murree"],
    ["/best-hotel-near-islamabad-mountains", "/hotels-in-bhurban"],
    ["/anniversary-villa-bhurban", "/anniversary-birthday-bhurban-cedar-estate"],
    ["/resort-near-islamabad", "/bhurban-resorts"],
  ]),
];

/** 301 (not 308) for these two hub duplicates, as the register asked. */
export const legacyRedirects301: { source: string; destination: string; statusCode: 301 }[] = [
  { source: "/booking", destination: "/book", statusCode: 301 },
  { source: "/experiences", destination: "/experience", statusCode: 301 },
];

const REDIRECT_SOURCES = new Set(
  [...legacyRedirects, ...legacyRedirects301].map((r) => r.source.toLowerCase()),
);

export function isLegacyRedirectSource(path: string): boolean {
  return REDIRECT_SOURCES.has(path.toLowerCase());
}
