export type VillaCategory = "Presidential" | "Family" | "Suite" | "Suite 1" | "Suite 2" | "Complete Villa";

/** Public / UI shape (matches former static catalog). */
export type Villa = {
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

export type VillaListItem = Pick<
  Villa,
  "slug" | "title" | "category" | "description" | "price" | "image" | "bedrooms" | "guests"
>;

export const VILLA_CATEGORIES: VillaCategory[] = ["Presidential", "Family", "Suite", "Suite 1", "Suite 2", "Complete Villa"];
