import { STATIC_VILLAS } from "@/lib/server/data/static-villas";
import { findVillaBySlug, listPublishedVillaRows, villaRowToPublic } from "@/lib/server/services/villa.service";

export async function getPublishedVillasMerged() {
  const rows = await listPublishedVillaRows();
  const fromDb = rows.map(villaRowToPublic);
  const slugSet = new Set(fromDb.map((v) => v.slug));
  const fromStatic = STATIC_VILLAS.filter((v) => !slugSet.has(v.slug));
  return [...fromDb, ...fromStatic];
}

export async function getVillaBySlugPublic(slug: string) {
  const normalized = decodeURIComponent(slug || "").trim().toLowerCase();
  if (!normalized) return null;
  const row = await findVillaBySlug(normalized);
  if (row?.published) return villaRowToPublic(row);
  return STATIC_VILLAS.find((v) => v.slug === normalized) ?? null;
}
