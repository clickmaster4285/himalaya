import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Engagement Ceremonies | Himalaya Villas & Resorts",
  description: "Plan beautiful engagement ceremonies with stunning floral stages. Our engagement ceremonies offer memorable ring exchanges in a private mountain setting.",
  path: "/weddings/engagement-ceremonies",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
