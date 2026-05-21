import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import CouplesThingsMurreeClient from "./CouplesThingsMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Things to Do in Murree for Couples — Romantic Guide | Himalaya Villas Bhurban",
  description:
    "Most romantic things to do in Murree for couples — Kashmir Point at dawn, forest walks, mountain dining, private bonfire evenings. The couple's experience begins at Himalaya Villas Bhurban.",
  path: "/things-to-do-in-murree-for-couples",
  keywords: [
    "romantic things to do murree",
    "murree for couples",
    "honeymoon murree",
    "couples getaway islamabad",
    "private bonfire murree",
    "kashmir point sunrise",
  ],
  ogImage: "/assets/gallery-interior.jpg",
});

export default function CouplesThingsMurreePage() {
  return <CouplesThingsMurreeClient />;
}
