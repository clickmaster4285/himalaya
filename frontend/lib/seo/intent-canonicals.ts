/**
 * HIM-CONTENT-0002 — one indexable URL per search intent.
 * Every other URL in a family is a permanent redirect. Do not noindex these instead.
 */
export const CONTENT_REVIEW = {
  author: "Himalaya Villas & Resorts",
  reviewer: "Himalaya Villas editorial team",
  lastReviewedLabel: "6 November 2026",
  lastReviewedIso: "2026-11-06",
} as const;

export type IntentFamily = {
  id: string;
  canonical: string;
  sources: string[];
};

export const INTENT_FAMILIES: IntentFamily[] = [
  {
    id: "hotels-resorts",
    canonical: "/luxury-hotels-in-murree",
    sources: [
      "/best-hotels-murree-pakistan",
      "/best-hotels-in-murree-pakistan",
      "/blogs/best-hotels-in-murree-pakistan",
      "/best-hotels-murree-pakistan-2026",
      "/5-star-hotels-in-murree",
      "/5-star-hotels-murree-pakistan",
      "/luxury-hotel-murree",
      "/luxury-hotels-in-muree",
      "/blogs/best-hotels-in-murree-pakistan-2026-guide",
      "/blogs/luxury-hotels-and-villas-in-murree-2026-guide",
      "/blogs/resorts-in-murree-pakistan-2026-guide",
      "/murree-resort-guide",
      "/murree-best-hotel-guide",
      "/hotels-in-murree-pakistan",
    ],
  },
  {
    id: "weather",
    canonical: "/murree-weather",
    sources: [
      "/murree-weather-july",
      "/murree-weather-guide",
      "/murree-weather-today",
      "/murree-weather-forecast",
      "/murree-weather-snowfall",
      "/murree-weather-tomorrow",
      "/current-murree-weather",
      "/murree-weather-live-sources",
      "/bhurban-weather-today",
      "/bhurban-pakistan-weather",
      "/mushkpuri-top-weather",
      "/murree-snowfall-2026",
    ],
  },
  {
    id: "things-to-do",
    canonical: "/things-to-do-in-murree",
    sources: [
      "/things-to-do-bhurban",
      "/things-to-do-murree-pakistan",
      "/places-to-visit-in-murree",
      "/blogs/best-places-to-visit-in-murree",
      "/blogs/thing-to-do-bhurban-murree",
      "/thing-to-do-bhurban-murree",
      "/thing-to-do-bhurban-murree2",
      "/blogs/budget-friendly-trip-to-murree",
    ],
  },
  {
    id: "itineraries",
    canonical: "/murree-bhurban-itinerary",
    sources: [
      "/3-day-murree-itinerary-bhurban",
      "/2-day-murree-itinerary",
      "/bhurban-murree-4-5-day-itinerary",
    ],
  },
  {
    id: "distances",
    canonical: "/bhurban-murree-all-distances",
    sources: [
      "/how-far-is-bhurban-from-islamabad",
      "/bhurban-distance-from-lahore",
      "/bhurban-distance-from-major-cities",
      "/islamabad-to-murree-guide",
      "/lahore-to-murree-guide",
    ],
  },
  {
    id: "audience-family",
    canonical: "/family-hotels-in-murree",
    sources: [
      "/family-hotels-murree",
      "/blogs/best-family-hotels-in-murree",
      "/blogs/best-hotel-in-murree-for-family-vacations",
      "/blogs/where-to-stay-in-murree-with-family",
      "/blogs/what-makes-a-resort-family-friendly-in-murree",
      "/family-tour-murree-himalaya-villas",
      "/blogs/family-tour-murree-himalaya-villas",
    ],
  },
  {
    id: "audience-couples",
    canonical: "/romantic-hotels-murree",
    sources: [
      "/murree-for-couples",
      "/blogs/resorts-in-murree-for-couples",
      "/honeymoon-package-bhurban-murree",
    ],
  },
  {
    id: "bhurban-reference",
    canonical: "/hotels-in-bhurban",
    sources: ["/bhurban-murree-reference-2026", "/bhurban-insider-guide-2026"],
  },
  {
    id: "pc-bhurban-rates",
    canonical: "/pc-hotel-bhurban-alternative",
    sources: ["/pc-bhurban-room-rates-2026"],
  },
  {
    id: "patriata-chairlift",
    canonical: "/patriata-chairlift-bhurban",
    sources: ["/patriata-chairlift-bhurban-guide"],
  },
];

const canonicals = new Set(INTENT_FAMILIES.map((family) => family.canonical));
const seenSources = new Set<string>();

for (const family of INTENT_FAMILIES) {
  for (const source of family.sources) {
    if (source === family.canonical || canonicals.has(source)) {
      throw new Error(`Intent redirect source is also a canonical URL: ${source}`);
    }
    if (seenSources.has(source)) {
      throw new Error(`Intent redirect source is listed twice: ${source}`);
    }
    seenSources.add(source);
  }
}

export const REDIRECTED_DUPLICATE_PATHS = new Set(
  INTENT_FAMILIES.flatMap((family) => family.sources),
);

export function isRedirectedDuplicate(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return REDIRECTED_DUPLICATE_PATHS.has(normalized);
}

export const intentRedirects: { source: string; destination: string; permanent: true }[] =
  INTENT_FAMILIES.flatMap((family) =>
    family.sources.map((source) => ({
      source,
      destination: family.canonical,
      permanent: true as const,
    })),
  );
