import type { Metadata } from "next";
import { CONTENT_REVIEW } from "@/lib/seo/intent-canonicals";

export const metadata: Metadata = {
  title: "Luxury Hotels in Murree: Resorts and Private Villas | Himalaya Villas & Resorts",
  description:
    "The guide to luxury, 5-star, and resort stays in Murree. Compare Bhurban's private villas with the hotels travellers shortlist, then book direct.",
  authors: [{ name: CONTENT_REVIEW.author }],
  alternates: {
    canonical: "https://himalayavillas.com/luxury-hotels-in-murree",
  },
  openGraph: {
    title: "Luxury Hotels in Murree",
    description:
      "Best, 5-star, luxury, and resort stays in Murree, compared from Himalaya Villas in Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/luxury-hotels-in-murree",
  },
};

export default function LuxuryHotelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
