import { getValidImageSrc } from "@/lib/image-utils";

/** Fallback when slug/asset path is missing (exists in repo). */
export const DEFAULT_EVENT_IMAGE = "/assets/hero-bhurban-static.png";

const EVENT_IMAGE_BY_SLUG: Record<string, string> = {
  "nikah-wedding-reception": "/assets/nikah-hero-1.png",
  mehndi: "/assets/mehndi-hero-1.png",
  baraat: "/assets/barat-hero-2.png",
  "dholki-bridal-shower": "/assets/dholki-hero-1.jpg",
  "valima-wedding-dinner": "/assets/valima-hero-1.jpg",
  "engagement-ceremonies": "/assets/wedding6.jpg",
  "sufi-qawwali-evenings": "/assets/culture1.webp",
  "private-musical-concerts": "/assets/concert1.webp",
  "mushaira-poetry-evenings": "/assets/culture2.webp",
  "dj-nights-music-parties": "/assets/dj1.jpg",
  "live-band-performances": "/assets/band1.jpg",
  "cultural-shows-acts": "/assets/culture3.jpg",
  "corporate-retreat-packages": "/assets/team.webp",
  "product-launches-brand-events": "/assets/conference1.webp",
  "award-dinners-gala-nights": "/assets/himalaya-banquet.png",
  "conferences-seminars": "/assets/conference2.webp",
  "team-building-retreats": "/assets/team-dinner1.webp",
  "exhibitions-trade-meets": "/assets/exibition1.webp",
  "milestone-birthdays": "/assets/villa-celebration.webp",
  "eid-gatherings-family-reunions": "/assets/hero-bhurban-static.png",
  "baby-showers-gender-reveal": "/assets/baby-shower1.webp",
  "graduation-parties": "/assets/family-reunion1.webp",
  "retirement-celebrations": "/assets/retirement1.webp",
  "farewells-send-offs": "/assets/family-reunion-group.webp",
  "bonfire-stargazing-nights": "/assets/journal-bonfire.jpg",
  "guided-trails-forest-walks": "/assets/blog-bhurban-forest-nature-walk.png",
  "private-chef-dining-experiences": "/assets/gallery-dining-night.jpg",
  "adventure-outdoor-activities": "/assets/murree-mountain-hero.jpg",
  "workshops-creative-sessions": "/assets/services-events-real.jpg",
  "photography-content-packages": "/assets/gallery-exterior.jpg",
  "yoga-meditation-retreats": "/assets/philosophy-interior.jpg",
  "digital-detox-experiences": "/assets/murree-forest-pines.jpg",
  "spa-relaxation-escapes": "/assets/amenities-interior-real.jpg",
  "health-fitness-camps": "/assets/murree-summer.jpg",
  "holistic-healing-programs": "/assets/why-villa-garden.jpg",
  "luxury-honeymoon-packages": "/assets/villa-honeymoon-real.jpg",
};

/** Slider / listing heroes — all local paths used elsewhere on the site. */
export const EVENTS_HERO_SLIDES = [
  "/assets/hero-bhurban-static.png",
  "/assets/murree-mountain-hero.jpg",
  "/assets/blog-bhurban-forest-nature-walk.png",
  "/assets/gallery-exterior.jpg",
  "/assets/villa-honeymoon-real.jpg",
  "/assets/wedding8.jpg",
  "/assets/journal-bonfire.jpg",
] as const;

export function resolveEventImage(slug: string, image?: string): string {
  const mapped = EVENT_IMAGE_BY_SLUG[slug];
  if (mapped) return mapped;
  if (image && !image.includes("picsum.photos")) {
    return getValidImageSrc(image, DEFAULT_EVENT_IMAGE);
  }
  return DEFAULT_EVENT_IMAGE;
}
