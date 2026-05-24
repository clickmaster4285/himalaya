import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { walimaHallConfig } from "@/lib/seo/wedding-venue-seo-content";
import WeddingVenueClusterClient from "@/components/seo/WeddingVenueClusterClient";

export const metadata: Metadata = createPageMetadata({
  title: walimaHallConfig.meta.title,
  description: walimaHallConfig.meta.description,
  path: walimaHallConfig.path,
  keywords: walimaHallConfig.meta.keywords,
  ogImage: walimaHallConfig.heroImage,
  appendSiteBrand: false,
});

export default function WalimaHallMurreePage() {
  return <WeddingVenueClusterClient config={walimaHallConfig} />;
}
