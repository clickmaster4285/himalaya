import "server-only";

import { STATIC_VILLAS } from "@/lib/villas-static-data";
import { connectDb } from "@/lib/server/db";
import { getPublishedVillasMerged } from "@/lib/server/data/villas-catalog";

/**
 * Villa slugs for sitemap: static catalog plus published villas from MongoDB (build / ISR).
 */
export async function getAllVillaSlugsForSitemap(): Promise<string[]> {
  const fromStatic = STATIC_VILLAS.map((v) => v.slug);
  try {
    await connectDb();
    const villas = await getPublishedVillasMerged();
    const api = villas.map((v) => v.slug).filter(Boolean);
    return [...new Set([...fromStatic, ...api])];
  } catch {
    return [...new Set(fromStatic)];
  }
}
