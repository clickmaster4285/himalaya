import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import MurreeAtNightClient from "./MurreeAtNightClient";

export const metadata: Metadata = createPageMetadata({
  title: "Murree at Night Guide 2026",
  description:
    "What to do in Murree at night — Mall Road evening walk, night food, stargazing, private bonfire evenings at Himalaya Villas. The mountain at night is the experience most Murree visitors never get.",
  path: "/things-to-do-in-murree-at-night",
  keywords: [
    "murree at night",
    "things to do murree evening",
    "murree nightlife",
    "bonfire murree",
    "stargazing bhurban",
  ],
  ogImage: "/assets/gallery-dining-night.jpg",
});

export default function MurreeAtNightPage() {
  return <MurreeAtNightClient />;
}
