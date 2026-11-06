/**
 * Exact-path permanent redirects outside the intent families. next.config.ts serves them and the
 * sitemaps leave them out, so no sitemap lists a URL that redirects (HIM-TECH-0006 T2).
 */
// Imported by next.config.ts: keep this file free of "@/" imports.

export const WHY_VILLAS_POST = "/blogs/why-villas-are-the-ultimate-luxury-stays-in-bhurban";

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
  { source: "/murree-bhurban-ramadan", destination: "/bhurban-murree-ramadan", permanent: true },
  // Event types merged into the offering they belong to (HIM-CONTENT-0004).
  { source: "/events/live-band-performances", destination: "/events/private-musical-concerts", permanent: true },
  { source: "/events/team-building-retreats", destination: "/events/corporate-retreat-packages", permanent: true },
  { source: "/events/digital-detox-experiences", destination: "/events/yoga-meditation-retreats", permanent: true },
  { source: "/events/health-fitness-camps", destination: "/events/spa-relaxation-escapes", permanent: true },
  { source: "/events/holistic-healing-programs", destination: "/events/spa-relaxation-escapes", permanent: true },
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
