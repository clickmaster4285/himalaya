import type { Metadata } from "next";
import { absoluteSeoTitle } from "@/lib/seo/build-metadata";

import MurreeHotelPageChrome from "@/components/seo/MurreeHotelPageChrome";

export const metadata: Metadata = {
  title: absoluteSeoTitle("Family Hotels Murree"),
  description: "Family hotels in Murree with kid-friendly amenities, family suites, and children's activities at Himalaya Villas Bhurban. Safe environment, spacious rooms, family dining. Book your family vacation today!",
  keywords: "family hotels Murree, kid-friendly hotels Bhurban, family accommodation Murree Hills, children's activities Murree, family suites Himalaya Villas, safe family hotels Pakistan, family vacation Bhurban",
  openGraph: {
    title: "Family Hotels Murree - Kid-Friendly Hotels at Himalaya Villas",
    description: "Family-friendly hotels in Murree with kids' activities, family suites, and safe environment. Perfect family vacation at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/family-hotels-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/family-hotels-murree",
  },
};

export default function FamilyHotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MurreeHotelPageChrome page="family-hotels-murree">{children}</MurreeHotelPageChrome>;
}
