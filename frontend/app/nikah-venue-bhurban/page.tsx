import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { nikahVenueConfig } from "@/lib/seo/wedding-venue-seo-content";
import WeddingVenueClusterClient from "@/components/seo/WeddingVenueClusterClient";

export const metadata: Metadata = createPageMetadata({
  title: nikahVenueConfig.meta.title,
  description: nikahVenueConfig.meta.description,
  path: nikahVenueConfig.path,
  keywords: nikahVenueConfig.meta.keywords,
  ogImage: nikahVenueConfig.heroImage,
  appendSiteBrand: false,
});

export default function NikahVenueBhurbanPage() {
  return <WeddingVenueClusterClient config={nikahVenueConfig} />;
}
