// app/winter-villas/page.tsx
import WinterVillasClient from "./WinterVillasClient";
import { VILLA_CATALOG_LISTINGS } from "@/lib/villa-catalog";

export const metadata = {
  title: "View Winter Villas — Himalaya Villas Bhurban",
  description:
    "Explore our luxury winter snowfall villas in Bhurban & Murree Hills — private fireplaces, panoramic ridge views, and exclusive winter packages.",
  openGraph: {
    title: "View Winter Villas — Himalaya Villas",
    description:
      "Private villas built for the Himalayan winter — snowfall views, fireplaces, and quiet mornings.",
    url: "https://himalayavillas.com/snowfall-in-murree/winter-villas",
  },
  alternates: {
    canonical: "https://himalayavillas.com/snowfall-in-murree/winter-villas",
  },
};

export type Villa = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  guests: string;
  bedrooms: string;
  price: string;
  rating: number;
  features: string[];
  accent: string;
};

const winterPickSlugs = [
  "luxury-suite",
  "luxury-complete-villa",
  "rakaposhi-complete-villa",
  "apartment-complete",
] as const;

const accentBySlug: Record<string, string> = {
  "luxury-suite": "Couples & Honeymooners",
  "luxury-complete-villa": "Celebrations & Groups",
  "rakaposhi-complete-villa": "Families & Reunions",
  "apartment-complete": "Small Families",
};

export const villas: Villa[] = VILLA_CATALOG_LISTINGS.filter((v) =>
  (winterPickSlugs as readonly string[]).includes(v.slug),
).map((v) => ({
  id: v.slug,
  name: v.name,
  tagline: v.description,
  image: v.image,
  guests: `Up to ${v.guests} guests`,
  bedrooms: `${v.bedrooms} bedroom${v.bedrooms > 1 ? "s" : ""}`,
  price: `PKR ${v.price}`,
  rating: 4.9,
  features: ["Central heating", "Complimentary breakfast", "Mountain views"],
  accent: accentBySlug[v.slug] ?? v.collection,
}));

export default function Page() {
  return <WinterVillasClient villas={villas} />;
}
