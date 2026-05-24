import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import Murree3DayItineraryClient from "./Murree3DayItineraryClient";

export const metadata: Metadata = createPageMetadata({
  title: "Murree 3-Day Itinerary 2026",
  description:
    "Best Murree 3-day itinerary — day-by-day plan, timing, packing list. Based at Himalaya Villas Bhurban. Covers Murree town, Nathiagali, Patriata and Bhurban forest in 3 days without rushing.",
  path: "/murree-3-day-itinerary",
  keywords: [
    "murree 3 day itinerary",
    "murree trip plan",
    "3 days in murree",
    "murree packing list",
    "bhurban itinerary",
  ],
  ogImage: "/assets/murree-mountain-hero.jpg",
});

export default function Murree3DayItineraryPage() {
  return <Murree3DayItineraryClient />;
}
