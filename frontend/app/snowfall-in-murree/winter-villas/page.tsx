// app/winter-villas/page.tsx
import WinterVillasClient from "./WinterVillasClient";

// Metadata can only be exported from Server Components
export const metadata = {
  title: "View Winter Villas — Himalaya Villas Bhurban",
  description:
    "Explore our luxury winter snowfall villas in Bhurban & Murree Hills — private fireplaces, panoramic ridge views, and exclusive winter packages.",
  openGraph: {
    title: "View Winter Villas — Himalaya Villas",
    description:
      "Private villas built for the Himalayan winter — snowfall views, fireplaces, and quiet mornings.",
  },
};

// All the data that was previously in the component
export type Villa = {
  id: string;
  name: string;
  tagline: string;
  image: string; // This will be a public URL path
  guests: string;
  bedrooms: string;
  price: string;
  rating: number;
  features: string[];
  accent: string;
};

export const villas: Villa[] = [
  {
    id: "alpine",
    name: "The Alpine Retreat",
    tagline: "Fireside evenings with a full ridgeline view",
    image: "/assets/villa-hero.jpg", // Public URL
    guests: "4–6 guests",
    bedrooms: "2 bedrooms",
    price: "PKR 65,000",
    rating: 4.9,
    features: ["Stone fireplace", "Panoramic glass", "In-villa dining"],
    accent: "Couples & Small Groups",
  },
  {
    id: "cedar",
    name: "Cedar Ridge Villa",
    tagline: "Wake to snow-dusted Himalayan peaks",
    image: "/assets/villa-winter.jpg", // Public URL
    guests: "6–8 guests",
    bedrooms: "3 bedrooms",
    price: "PKR 95,000",
    rating: 4.8,
    features: ["Floor-to-ceiling views", "Heated floors", "Private balcony"],
    accent: "Families",
  },
  {
    id: "summit",
    name: "Summit House",
    tagline: "Outdoor hot tub under the winter sky",
    image: "/assets/villa-cedar.jpg", // Public URL
    guests: "8–10 guests",
    bedrooms: "4 bedrooms",
    price: "PKR 135,000",
    rating: 5.0,
    features: ["Outdoor jacuzzi", "Snow terrace", "Bonfire pit"],
    accent: "Groups & Retreats",
  },
  {
    id: "glacier",
    name: "Glacier Chalet",
    tagline: "Chef-served dining above the clouds",
    image: "/assets/villa-summit.jpg", // Public URL
    guests: "10–14 guests",
    bedrooms: "5 bedrooms",
    price: "PKR 175,000",
    rating: 4.9,
    features: ["Private chef", "Chandelier dining", "Winter garden"],
    accent: "Signature Estate",
  },
];

export default function Page() {
  return <WinterVillasClient villas={villas} />;
}