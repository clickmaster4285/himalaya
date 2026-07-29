import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Holiday Homes in Murree: Rental Guide, Areas & Prices 2026",
  description:
    "A practical guide to renting a holiday home in Murree — what the term means, where the best areas are, what nightly rates actually cost, and how to book safely.",
  path: "/holiday-homes-murree",
  appendSiteBrand: false,
  keywords: [
    "holiday homes murree",
    "murree cottages",
    "murree cottages for rent",
    "holiday homes murree photos",
    "holiday homes murree location",
    "holiday homes murree online booking",
    "holiday homes murree prices",
    "holiday homes murree booking form",
    "holiday homes murree reviews",
    "holiday homes murree contact number",
  ],
  ogImage: "/assets/gallery-exterior.jpg",
  ogType: "article",
  publishedTime: "2026-07-29T00:00:00+05:00",
  modifiedTime: "2026-07-29T00:00:00+05:00",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
