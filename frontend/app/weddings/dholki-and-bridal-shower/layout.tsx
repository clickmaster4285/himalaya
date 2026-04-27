import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dholki and Bridal Shower | Himalaya Villas & Resorts",
  description: "Celebrate intimate dholki and bridal shower events. Our dholki and bridal shower setups bring traditional charm and modern elegance.",
  path: "/weddings/dholki-and-bridal-shower",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
