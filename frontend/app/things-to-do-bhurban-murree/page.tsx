import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import ThingsToDoBhurbanMurreeClient from "./ThingsToDoBhurbanMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Things to Do in Bhurban Murree",
  description:
    "Complete guide to things to do in Bhurban Murree — golf, forest trails, private villa experiences, day trips to Murree and Nathiagali. Himalaya Villas is the best luxury villa in Bhurban.",
  path: "/things-to-do-bhurban-murree",
  keywords: [
    "things to do bhurban",
    "bhurban murree activities",
    "bhurban golf club",
    "stay in bhurban",
    "himalaya villas bhurban",
  ],
  ogImage: "/assets/blog-bhurban-forest-nature-walk.png",
});

export default function ThingsToDoBhurbanMurreePage() {
  return <ThingsToDoBhurbanMurreeClient />;
}
