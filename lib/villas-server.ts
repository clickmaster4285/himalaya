import { db } from "@/lib/db";
import type { Villa, VillaCategory } from "@/lib/villa-types";
import { VILLA_CATEGORIES } from "@/lib/villa-types";
import { STATIC_VILLAS } from "@/lib/villas-static-data";
import type { Villa as VillaRow } from "@prisma/client";

function normalizeCategory(raw: string): VillaCategory {
  const c = raw.trim();
  return (VILLA_CATEGORIES as readonly string[]).includes(c) ? (c as VillaCategory) : "Suite";
}

export function villaRowToPublic(row: VillaRow): Villa {
  return {
    slug: row.slug,
    title: row.title,
    category: normalizeCategory(row.category),
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

export async function getPublishedVillas(): Promise<Villa[]> {
  const rows = await db.villa.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  const fromDb = rows.map(villaRowToPublic);
  const slugSet = new Set(fromDb.map((v) => v.slug));
  const fromStatic = STATIC_VILLAS.filter((v) => !slugSet.has(v.slug));
  return [...fromDb, ...fromStatic];
}

export async function getVillaBySlugPublic(slug: string): Promise<Villa | null> {
  const normalized = decodeURIComponent(slug || "").trim().toLowerCase();
  if (!normalized) return null;
  const row = await db.villa.findFirst({
    where: { published: true, slug: normalized },
  });
  if (row) return villaRowToPublic(row);
  return STATIC_VILLAS.find((v) => v.slug === normalized) ?? null;
}

export async function getAllVillasAdmin() {
  return db.villa.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getVillaByIdAdmin(id: string) {
  return db.villa.findUnique({ where: { id } });
}
