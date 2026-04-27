import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Mehndi Celebrations | Himalaya Villas & Resorts",
  description: "Experience vibrant mehndi celebrations at Himalaya Villas. Our curated mehndi celebrations offer high-energy dhol, custom stages, and full family coordination.",
  path: "/weddings/mehndi-celebrations",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
