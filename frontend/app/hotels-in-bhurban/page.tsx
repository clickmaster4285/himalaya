import type { Metadata } from "next";
import HotelsInBhurbanClient from "./HotelsInBhurbanClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOTELS_IN_BHURBAN_FAQS } from "@/lib/seo/hotels-in-bhurban-faqs";
import { hotelsInBhurbanJsonLdScripts } from "@/lib/seo/himalaya-schema";

const PAGE_TITLE =
  "Hotels in Bhurban Murree | Himalaya Premium Villas — Best Hotel Bhurban Murree";

const PAGE_DESCRIPTION =
  "Looking for the best hotel in Bhurban Murree? Himalaya Premium Villas offers luxury estate stays with panoramic Himalayan views, in-villa dining, dedicated concierge, and exclusive privacy. Book direct via WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords:
    "hotels in Bhurban Murree, best hotel Bhurban Murree, luxury hotel Bhurban, Himalaya Premium Villas, bhurban hotels",
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    url: "https://himalayavillas.com/hotels-in-bhurban",
  },
  alternates: {
    canonical: "https://himalayavillas.com/hotels-in-bhurban",
  },
};

export default function HotelsInBhurbanPage() {
  const jsonLd = hotelsInBhurbanJsonLdScripts(HOTELS_IN_BHURBAN_FAQS);

  return (
    <>
      <JsonLd items={jsonLd} />
      <HotelsInBhurbanClient />
    </>
  );
}
