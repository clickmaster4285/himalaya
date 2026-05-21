import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { marriageHallPillarConfig } from "@/lib/seo/wedding-venue-seo-content";
import WeddingVenueClusterClient from "@/components/seo/WeddingVenueClusterClient";

export const metadata: Metadata = createPageMetadata({
  title: marriageHallPillarConfig.meta.title,
  description: marriageHallPillarConfig.meta.description,
  path: marriageHallPillarConfig.path,
  keywords: marriageHallPillarConfig.meta.keywords,
  ogImage: marriageHallPillarConfig.heroImage,
  appendSiteBrand: false,
});

export default function MarriageHallBhurbanMurreePage() {
  return <WeddingVenueClusterClient config={marriageHallPillarConfig} />;
}
