import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import OutdoorActivitiesMurreeClient from "./OutdoorActivitiesMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Outdoor Activities in Murree — Hiking, Trekking & Adventure | Himalaya Villas Bhurban",
  description:
    "Best outdoor activities in Murree — Miranjani hike, forest trails, golf, jeep safaris, zip-lining. At Himalaya Villas Bhurban, the trailhead is at the gate and the concierge arranges the rest.",
  path: "/outdoor-activities-murree",
  keywords: [
    "outdoor activities murree",
    "hiking murree",
    "miranjani hike",
    "bhurban golf club",
    "jeep safari murree",
    "trekking galliyat",
  ],
  ogImage: "/assets/murree-mountain-hero.jpg",
});

export default function OutdoorActivitiesMurreePage() {
  return <OutdoorActivitiesMurreeClient />;
}
