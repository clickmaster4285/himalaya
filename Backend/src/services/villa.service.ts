import type { VillaCategory, VillaPublic } from "../villa-types";
import { VILLA_CATEGORIES } from "../villa-types";
import { VillaM } from "../models/schemas";

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

export type VillaRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
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
  createdAt: Date;
  updatedAt: Date;
};

function assertCategory(c: string): VillaCategory {
  const t = c.trim();
  if (!(VILLA_CATEGORIES as readonly string[]).includes(t)) {
    throw new Error("Invalid category.");
  }
  return t as VillaCategory;
}

function mapRow(doc: {
  _id: string;
  slug: string;
  title: string;
  category: string;
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
  createdAt: Date;
  updatedAt: Date;
}): VillaRow {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    description: doc.description,
    price: doc.price,
    image: doc.image,
    gallery: doc.gallery ?? [],
    bedrooms: doc.bedrooms,
    guests: doc.guests,
    size: doc.size,
    highlights: doc.highlights ?? [],
    amenities: doc.amenities ?? [],
    content: doc.content,
    published: doc.published,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function villaRowToPublic(row: VillaRow): VillaPublic {
  const c = row.category.trim();
  const category = (VILLA_CATEGORIES as readonly string[]).includes(c) ? (c as VillaCategory) : "Suite";
  return {
    slug: row.slug,
    title: row.title,
    category,
    description: row.description,
    price: row.price,
    image: row.image,
    gallery: row.gallery?.length ? row.gallery : undefined,
    bedrooms: row.bedrooms,
    guests: row.guests,
    size: row.size,
    highlights: row.highlights,
    amenities: row.amenities,
    content: row.content,
  };
}

export async function findVillaBySlug(slug: string) {
  const row = await VillaM.findOne({ slug: slug.trim().toLowerCase() }).lean();
  return row ? mapRow(row as unknown as Parameters<typeof mapRow>[0]) : null;
}

export async function createVillaRow(data: VillaWriteInput) {
  const doc = await VillaM.create({
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
  });
  return mapRow(doc.toObject() as unknown as Parameters<typeof mapRow>[0]);
}

export async function updateVillaRow(id: string, data: VillaWriteInput) {
  const doc = await VillaM.findByIdAndUpdate(
    id,
    {
      $set: {
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
    },
    { new: true },
  ).lean();
  if (!doc) return null;
  return mapRow(doc as unknown as Parameters<typeof mapRow>[0]);
}

export async function deleteVillaRow(id: string) {
  const r = await VillaM.findByIdAndDelete(id);
  return !!r;
}

export async function listPublishedVillaRows() {
  const rows = await VillaM.find({ published: true }).sort({ createdAt: -1 }).lean();
  return rows.map((r) => mapRow(r as unknown as Parameters<typeof mapRow>[0]));
}

export async function listAllVillaRowsAdmin() {
  const rows = await VillaM.find().sort({ updatedAt: -1 }).lean();
  return rows.map((r) => mapRow(r as unknown as Parameters<typeof mapRow>[0]));
}

export async function findVillaRowById(id: string) {
  const row = await VillaM.findById(id).lean();
  return row ? mapRow(row as unknown as Parameters<typeof mapRow>[0]) : null;
}
