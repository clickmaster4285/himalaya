import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/seo/sitemap-builder";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemapEntries();
}
