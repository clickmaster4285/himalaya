import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { outdoorWeddingConfig } from "@/lib/seo/wedding-venue-seo-content";
import WeddingVenueClusterClient from "@/components/seo/WeddingVenueClusterClient";

export const metadata: Metadata = createPageMetadata({
  title: outdoorWeddingConfig.meta.title,
  description: outdoorWeddingConfig.meta.description,
  path: outdoorWeddingConfig.path,
  keywords: outdoorWeddingConfig.meta.keywords,
  ogImage: outdoorWeddingConfig.heroImage,
  appendSiteBrand: false,
});

export default function OutdoorWeddingVenueMurreePage() {
  return <WeddingVenueClusterClient config={outdoorWeddingConfig} />;
}
