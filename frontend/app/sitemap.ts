import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/seo/sitemap-builder";

// Regenerate hourly so new app routes are picked up automatically.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemapEntries();
}
