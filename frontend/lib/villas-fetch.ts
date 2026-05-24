import "server-only";

import type { Villa } from "@/lib/villa-types";
import { connectDb } from "@/lib/server/db";
import {
  getPublishedVillasMerged,
  getVillaBySlugPublic as getVillaBySlugFromDb,
} from "@/lib/server/data/villas-catalog";

/** Load published villas from MongoDB + static catalog (no self-fetch — avoids dev deadlock). */
export async function getPublishedVillas(): Promise<Villa[]> {
  try {
    await connectDb();
    const villas = await getPublishedVillasMerged();
    return villas as Villa[];
  } catch (err) {
    console.error("[villas-fetch] getPublishedVillas:", err);
    return [];
  }
}

export async function getVillaBySlugPublic(slug: string): Promise<Villa | null> {
  try {
    await connectDb();
    const villa = await getVillaBySlugFromDb(slug);
    return (villa as Villa | null) ?? null;
  } catch (err) {
    console.error("[villas-fetch] getVillaBySlugPublic:", err);
    return null;
  }
}
