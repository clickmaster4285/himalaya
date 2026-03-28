export type VillaCategory = "Presidential" | "Family" | "Suite";

export type VillaPublic = {
  slug: string;
  title: string;
  category: VillaCategory;
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

export const VILLA_CATEGORIES: VillaCategory[] = ["Presidential", "Family", "Suite"];
