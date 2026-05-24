import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { nikahVenueConfig } from "@/lib/seo/wedding-venue-seo-content";
import WeddingVenueClusterClient from "@/components/seo/WeddingVenueClusterClient";

const nikahLegacyConfig = {
  ...nikahVenueConfig,
  path: "/weddings/nikah",
  meta: {
    ...nikahVenueConfig.meta,
    title: "Nikah & Nikkah Venue Murree Bhurban | Private Mountain Ceremony",
    description:
      "Book a private nikah or nikkah ceremony at Himalaya Villas Bhurban — intimate mountain terrace, Himalayan views, imam coordination, and full hospitality. 45 minutes from Islamabad.",
    keywords: [
      ...nikahVenueConfig.meta.keywords,
      "weddings nikah Murree",
      "nikah wedding venue Pakistan",
      "nikkah venue Bhurban",
    ],
    h1ImageAlt:
      "Nikah wedding ceremony at Himalaya Villas Bhurban with Himalayan mountain backdrop",
  },
  hero: {
    ...nikahVenueConfig.hero,
    h1: "Nikah Wedding Venue in Bhurban Murree —",
    h1Accent: "Sacred Ceremony in the Hills at Himalaya Villas",
  },
  pillarBackLink: { href: "/weddings", label: "All wedding celebrations" },
};

export const metadata: Metadata = createPageMetadata({
  title: nikahLegacyConfig.meta.title,
  description: nikahLegacyConfig.meta.description,
  path: nikahLegacyConfig.path,
  keywords: nikahLegacyConfig.meta.keywords,
  ogImage: nikahLegacyConfig.heroImage,
  appendSiteBrand: false,
});

export default function WeddingsNikahPage() {
  return <WeddingVenueClusterClient config={nikahLegacyConfig} />;
}
