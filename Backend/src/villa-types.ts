export type VillaCategory = "Presidential" | "Family" | "Suite" | "Suite 1" | "Suite 2" | "Complete Villa";

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

export const VILLA_CATEGORIES: VillaCategory[] = ["Presidential", "Family", "Suite", "Suite 1", "Suite 2", "Complete Villa"];
