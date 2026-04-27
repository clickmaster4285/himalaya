import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Barat Celebrations | Himalaya Villas & Resorts",
  description: "Host grand barat celebrations in the hills. We manage premium barat celebrations with stunning stage decor and VIP hospitality flows.",
  path: "/weddings/barat-celebrations",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
