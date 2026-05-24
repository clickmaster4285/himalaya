import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import ThingsToDoMurreeWinterClient from "./ThingsToDoMurreeWinterClient";

export const metadata: Metadata = createPageMetadata({
  title: "Murree Winter Guide 2026",
  description:
    "What to do in Murree in winter — snow walks, sledging, bonfire evenings, Patriata in snow. The private snowfall experience at Himalaya Villas Bhurban: no traffic, no crowd, pine forest from your terrace.",
  path: "/things-to-do-in-murree-in-winter",
  keywords: [
    "things to do in murree in winter",
    "murree winter activities",
    "snowfall murree",
    "murree snow trip",
    "bhurban winter stay",
    "himalaya villas winter",
    "bonfire murree",
  ],
  ogImage: "/assets/murree-mountain-hero.jpg",
});

export default function ThingsToDoInMurreeInWinterPage() {
  return <ThingsToDoMurreeWinterClient />;
}
