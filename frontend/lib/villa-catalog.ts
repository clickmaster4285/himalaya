import type { Villa } from "@/lib/villa-types";

/** Public villa listings — single source of truth (matches homepage / VillasAccommodations). */
export const VILLA_CATALOG_LISTINGS = [
  {
    collection: "Himalaya Apartments",
    collectionSubtitle:
      "Warm, homely apartments ideal for couples and small families who want quiet nights and mountain-facing windows.",
    slug: "apartment-single-luxury",
    tag: "APARTMENT",
    name: "Single Luxury Room",
    description: "A cozy luxury room with mountain-facing windows and warm interiors.",
    price: "27,000",
    image: "/images/villas/apt-single-room.jpg",
    category: "Apartment" as const,
    bedrooms: 1,
    guests: 2,
  },
  {
    collection: "Himalaya Apartments",
    collectionSubtitle:
      "Warm, homely apartments ideal for couples and small families who want quiet nights and mountain-facing windows.",
    slug: "apartment-complete",
    tag: "APARTMENT",
    name: "Complete Apartment (2 bedrooms + living area)",
    description: "Two luxury bedrooms with a shared living area — perfect for families.",
    price: "60,000",
    image: "/images/villas/apt-complete-room.jpg",
    category: "Apartment" as const,
    bedrooms: 2,
    guests: 4,
  },
  {
    collection: "Rakaposhi Villa",
    collectionSubtitle:
      "Our signature villa collection, with executive rooms and a full-villa option for groups.",
    slug: "rakaposhi-single-executive",
    tag: "EXECUTIVE",
    name: "Single Executive Room",
    description: "Refined executive room with king bed and warm ambient lighting.",
    price: "16,500",
    image: "/images/villas/rak-single-room.jpg",
    category: "Suite" as const,
    bedrooms: 1,
    guests: 2,
  },
  {
    collection: "Rakaposhi Villa",
    collectionSubtitle:
      "Our signature villa collection, with executive rooms and a full-villa option for groups.",
    slug: "rakaposhi-executive-suite",
    tag: "SUITE",
    name: "Executive Suite (2 rooms + private TV lounge)",
    description: "Two rooms with a private TV lounge — space to gather and unwind.",
    price: "30,000",
    image: "/images/villas/rak-private-suite.jpg",
    category: "Suite" as const,
    bedrooms: 2,
    guests: 4,
  },
  {
    collection: "Rakaposhi Villa",
    collectionSubtitle:
      "Our signature villa collection, with executive rooms and a full-villa option for groups.",
    slug: "rakaposhi-complete-villa",
    tag: "WHOLE VILLA",
    name: "Complete Villa (5 executive rooms)",
    description: "The entire Rakaposhi Villa — five executive rooms for your group.",
    price: "70,000",
    image: "/images/villas/rak-complete-villa.jpg",
    category: "Complete Villa" as const,
    bedrooms: 5,
    guests: 10,
  },
  {
    collection: "Himalaya Luxury Villas",
    collectionSubtitle:
      "Our flagship residences — ranging from a cozy attic escape to a full four-bedroom villa for celebrations.",
    slug: "luxury-attic",
    tag: "COZY",
    name: "Attic Room",
    description: "A snug loft with sloped wooden ceilings and soft evening light.",
    price: "27,000",
    image: "/images/villas/lux-attic-villa.jpg",
    category: "Suite" as const,
    bedrooms: 1,
    guests: 2,
  },
  {
    collection: "Himalaya Luxury Villas",
    collectionSubtitle:
      "Our flagship residences — ranging from a cozy attic escape to a full four-bedroom villa for celebrations.",
    slug: "luxury-single",
    tag: "LUXURY",
    name: "Single Luxury Room",
    description: "Marble accents, elegant lighting, and sweeping mountain views.",
    price: "27,000",
    image: "/images/villas/lux-single-villa.jpg",
    category: "Suite" as const,
    bedrooms: 1,
    guests: 2,
  },
  {
    collection: "Himalaya Luxury Villas",
    collectionSubtitle:
      "Our flagship residences — ranging from a cozy attic escape to a full four-bedroom villa for celebrations.",
    slug: "luxury-suite",
    tag: "SUITE",
    name: "Luxury Suite (1 & 2)",
    description: "A bedroom paired with a private sitting area under a chandelier.",
    price: "50,000",
    image: "/images/villas/lux-suite-villa.jpg",
    category: "Suite" as const,
    bedrooms: 1,
    guests: 3,
  },
  {
    collection: "Himalaya Luxury Villas",
    collectionSubtitle:
      "Our flagship residences — ranging from a cozy attic escape to a full four-bedroom villa for celebrations.",
    slug: "luxury-complete-villa",
    tag: "WHOLE VILLA",
    name: "Complete Villa (4 bedrooms, private garden)",
    description: "Four bedrooms, private gardens, and mountain vistas — yours entirely.",
    price: "99,000",
    image: "/images/villas/lux-complete-villa.jpg",
    category: "Complete Villa" as const,
    bedrooms: 4,
    guests: 8,
  },
] as const;

export type VillaCatalogListing = (typeof VILLA_CATALOG_LISTINGS)[number];

export const VILLA_CATALOG_SLUGS: string[] = VILLA_CATALOG_LISTINGS.map((v) => v.slug);

export function isCatalogVillaSlug(slug: string): boolean {
  return VILLA_CATALOG_SLUGS.includes(slug);
}

export function getVillaCatalogCollections() {
  const seen = new Map<
    string,
    { title: string; subtitle: string; rooms: VillaCatalogListing[] }
  >();

  for (const listing of VILLA_CATALOG_LISTINGS) {
    const existing = seen.get(listing.collection);
    if (existing) {
      existing.rooms.push(listing);
    } else {
      seen.set(listing.collection, {
        title: listing.collection,
        subtitle: listing.collectionSubtitle,
        rooms: [listing],
      });
    }
  }

  return [...seen.values()];
}

export function toStaticVilla(listing: VillaCatalogListing): Villa {
  return {
    slug: listing.slug,
    title: listing.name,
    category: listing.category,
    description: listing.description,
    price: `PKR ${listing.price}`,
    image: listing.image,
    gallery: [listing.image],
    bedrooms: listing.bedrooms,
    guests: listing.guests,
    size: "—",
    highlights: [listing.tag],
    amenities: [
      "Complimentary breakfast for 2",
      "Mountain-facing windows",
      "Complimentary Wi-Fi",
      "Daily housekeeping",
    ],
    content: listing.description,
  };
}

export const CATALOG_VILLAS: Villa[] = VILLA_CATALOG_LISTINGS.map(toStaticVilla);
