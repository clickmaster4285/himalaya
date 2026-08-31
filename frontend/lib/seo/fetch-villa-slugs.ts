import { VILLA_CATALOG_SLUGS } from "@/lib/villa-catalog";

/**
 * Villa slugs for sitemap — current public catalog only.
 */
export async function getAllVillaSlugsForSitemap(): Promise<string[]> {
  return [...VILLA_CATALOG_SLUGS];
}
