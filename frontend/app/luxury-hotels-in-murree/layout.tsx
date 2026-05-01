import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Hotels in Murree Pakistan | Top-Rated Resorts | Bhurban | Himalaya Villas",
  description: "Top-rated luxury hotels in Murree Pakistan at Himalaya Villas Bhurban. Premium resorts with private villas, mountain views, fine dining. Discover the best luxury accommodations in Murree Hills.",
  keywords: "luxury hotels in Murree Pakistan, top-rated resorts Bhurban, premium accommodations Murree Hills, luxury villas Pakistan, upscale resorts Himalaya Villas, deluxe hotels Murree, high-end accommodation Bhurban",
  openGraph: {
    title: "Luxury Hotels in Murree - Premium Accommodation at Himalaya Villas",
    description: "Experience luxury at its finest in Murree with premium accommodation, private villas, and world-class amenities at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/luxury-hotels-in-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/luxury-hotels-in-murree",
  },
};

export default function LuxuryHotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
