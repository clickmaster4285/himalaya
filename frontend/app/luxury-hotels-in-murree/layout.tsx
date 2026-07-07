import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Hotels in Murree Pakistan | Himalaya Villas",
  description: "When Pakistan's most discerning travellers search for luxury hotels in Murree, they end up here. Discover our private estate in Bhurban.",
  path: "/luxury-hotels-in-muree",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
