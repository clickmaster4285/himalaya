import type { Metadata } from "next";
import HotelsInBhurbanClient from "./HotelsInBhurbanClient";

const PAGE_TITLE =
  "Hotels in Bhurban | Himalaya Premium Villas — Private Luxury Hotel Bhurban Murree";

const PAGE_DESCRIPTION =
  "Looking for hotels in Bhurban? Himalaya Premium Villas is one of the best hotel in Bhurban murree, only private luxury estate — panoramic Himalayan views, dedicated concierge, complete privacy. Book direct via WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords:
    "Hotels in Bhurban, luxury hotel Bhurban Murree, Himalaya Premium Villas, private villa Bhurban",
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
  return <HotelsInBhurbanClient />;
}
