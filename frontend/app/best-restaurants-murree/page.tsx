import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import BestRestaurantsMurreeClient from "./BestRestaurantsMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Best Restaurants in Murree",
  description:
    "Murree dining guide — Mall Road street food, Pearl Continental Bhurban, local restaurants, and in-villa chef dining at Himalaya Villas. Halal, private terrace, your schedule.",
  path: "/best-restaurants-murree",
  keywords: [
    "best restaurants murree",
    "murree food guide",
    "bhurban restaurants",
    "halal dining murree",
    "in villa dining bhurban",
    "mall road food murree",
  ],
  ogImage: "/assets/blog-bhurban-terrace-dining-dusk.png",
});

export default function BestRestaurantsMurreePage() {
  return <BestRestaurantsMurreeClient />;
}
