import type { Metadata } from "next";
import { HotelGraphStructuredData } from "@/components/seo/HotelGraphStructuredData";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title:
    "Hotel Rooms in Murree: Types, Rates & What to Check Before Booking (2026)",
  description:
    "A complete guide to hotel rooms in Murree — room types, realistic rates by area and season, what to verify before booking, and when a private villa makes more sense.",
  path: "/hotel-rooms-in-murree",
  appendSiteBrand: false,
  keywords: [
    "hotel rooms in murree",
    "hotel room rates in murree",
    "hotel room prices in murree",
    "family rooms in murree hotels",
    "hotels in murree mall road",
    "cheap hotel rooms in murree",
    "luxury hotel rooms murree",
    "murree hotel booking",
    "hotel rooms in bhurban",
  ],
  ogType: "article",
  publishedTime: "2026-07-01T00:00:00+05:00",
  modifiedTime: "2026-07-23T00:00:00+05:00",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HotelGraphStructuredData />
      {children}
    </>
  );
}
