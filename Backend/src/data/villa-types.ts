export const VILLA_CATEGORIES = ["Presidential", "Apartment", "Family", "Suite", "Suite 1", "Suite 2", "Complete Villa"] as const;
export type VillaCategory = (typeof VILLA_CATEGORIES)[number];

export function normalizeVillaCategory(value: string): VillaCategory | null {
  const normalized = value.trim().toLowerCase();
  const match = VILLA_CATEGORIES.find((category) => category.toLowerCase() === normalized);
  return match ?? null;
}

export type VillaPublic = {
  slug: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  gallery?: string[];
  bedrooms: number;
  guests: number;
  size: string;
  highlights: string[];
  amenities: string[];
  content: string;
};
