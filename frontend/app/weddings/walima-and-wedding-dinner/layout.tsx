import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Walima and Wedding Dinner | Himalaya Villas & Resorts",
  description: "Experience a refined walima and wedding dinner in Bhurban. We provide luxury dining and protocol for a perfect walima and wedding dinner.",
  path: "/weddings/walima-and-wedding-dinner",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
