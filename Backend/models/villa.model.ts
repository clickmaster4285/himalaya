import { db } from "@/lib/db";
import type { VillaCategory } from "@/lib/villa-types";
import { VILLA_CATEGORIES } from "@/lib/villa-types";

export type VillaWriteInput = {
  slug: string;
  title: string;
  category: VillaCategory;
  description: string;
  price: string;
  image: string;
  gallery: string[];
  bedrooms: number;
  guests: number;
  size: string;
  highlights: string[];
  amenities: string[];
  content: string;
  published: boolean;
};

function assertCategory(c: string): VillaCategory {
  const t = c.trim();
  if (!(VILLA_CATEGORIES as readonly string[]).includes(t)) {
    throw new Error("Invalid category.");
  }
  return t as VillaCategory;
}

export const VillaModel = {
  findBySlug(slug: string) {
    return db.villa.findUnique({ where: { slug: slug.trim().toLowerCase() } });
  },

  create(data: VillaWriteInput) {
    return db.villa.create({
      data: {
        slug: data.slug.trim().toLowerCase(),
        title: data.title.trim(),
        category: assertCategory(data.category),
        description: data.description.trim(),
        price: data.price.trim(),
        image: data.image.trim(),
        gallery: data.gallery,
        bedrooms: data.bedrooms,
        guests: data.guests,
        size: data.size.trim(),
        highlights: data.highlights,
        amenities: data.amenities,
        content: data.content.trim(),
        published: data.published,
      },
    });
  },

  update(id: string, data: VillaWriteInput) {
    return db.villa.update({
      where: { id },
      data: {
        slug: data.slug.trim().toLowerCase(),
        title: data.title.trim(),
        category: assertCategory(data.category),
        description: data.description.trim(),
        price: data.price.trim(),
        image: data.image.trim(),
        gallery: data.gallery,
        bedrooms: data.bedrooms,
        guests: data.guests,
        size: data.size.trim(),
        highlights: data.highlights,
        amenities: data.amenities,
        content: data.content.trim(),
        published: data.published,
      },
    });
  },

  delete(id: string) {
    return db.villa.delete({ where: { id } });
  },
};
