import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import PlacesToVisitNearMurreeClient from "./PlacesToVisitNearMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Places Near Murree",
  description:
    "Best places to visit near Murree — Nathiagali, Ayubia, Galliyat, Abbottabad, Patriata. From Himalaya Villas Bhurban, every destination in the Murree Hills is a day trip, not a separate stay.",
  path: "/places-to-visit-near-murree",
  keywords: [
    "places to visit near murree",
    "nathiagali day trip",
    "ayubia national park",
    "miranjani hike",
    "galliyat tour",
    "bhurban day trips",
  ],
  ogImage: "/assets/murree-mountain-hero.jpg",
});

export default function PlacesToVisitNearMurreePage() {
  return <PlacesToVisitNearMurreeClient />;
}
