import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import FamilyThingsMurreeClient from "./FamilyThingsMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Family Things to Do in Murree",
  description:
    "Best family activities in Murree — Patriata chairlift, Ayubia, horse riding, snowfall, Sozo Adventure Park. And why every family activity is better when your base is Himalaya Villas Bhurban.",
  path: "/family-things-to-do-murree",
  keywords: [
    "family things to do murree",
    "murree with kids",
    "kid friendly murree",
    "patriata chairlift family",
    "family trip murree",
    "himalaya villas family",
  ],
  ogImage: "/assets/gallery-interior.jpg",
});

export default function FamilyThingsToDoMurreePage() {
  return <FamilyThingsMurreeClient />;
}
