import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import ThingsToDoMurreeClient from "./ThingsToDoMurreeClient";

export const metadata: Metadata = createPageMetadata({
  title: "Things to Do in Murree 2026",
  description:
    "The complete Murree activities guide — from Kashmir Point at dawn to private bonfire evenings in Bhurban. Everything in this guide is better when you're staying at Himalaya Villas, 45 min from Islamabad.",
  path: "/things-to-do-in-murree",
  keywords: [
    "things to do in murree",
    "murree activities",
    "kashmir point murree",
    "mall road murree",
    "patriata chairlift",
    "nathiagali day trip",
    "bhurban activities",
    "himalaya villas murree",
  ],
  ogImage: "/assets/murree-mountain-hero.jpg",
});

export default function ThingsToDoInMurreePage() {
  return <ThingsToDoMurreeClient />;
}
