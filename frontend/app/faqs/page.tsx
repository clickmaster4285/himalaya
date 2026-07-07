// app/faq/page.tsx
import { createPageMetadata } from "@/lib/seo/build-metadata";
import type { Metadata } from "next";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ — Himalaya Villas & Resort, Bhurban Murree",
  description: "Answers abouts reservations, villas, dining, private events and getting to Himalaya Villas & Resort in Bhurban, Murree.",
  path: "/faqs",
  keywords: [
    "Murree luxury accommodation",
    "private villa resort Pakistan",
    "Bhurban booking information",
    "Himalaya resort amenities",
  ],
  ogImage: "/assets/faq-hero.jpg",
});

export default function FaqPage() {
  return <FaqsClient />;
}