import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { weddingPackagesConfig } from "@/lib/seo/wedding-venue-seo-content";
import WeddingVenueClusterClient from "@/components/seo/WeddingVenueClusterClient";

export const metadata: Metadata = createPageMetadata({
  title: weddingPackagesConfig.meta.title,
  description: weddingPackagesConfig.meta.description,
  path: weddingPackagesConfig.path,
  keywords: weddingPackagesConfig.meta.keywords,
  ogImage: weddingPackagesConfig.heroImage,
  appendSiteBrand: false,
});

export default function WeddingPackagesMurreePricesPage() {
  return <WeddingVenueClusterClient config={weddingPackagesConfig} />;
}
