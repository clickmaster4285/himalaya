import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5-Star Luxury Hotel Murree | Premium Suites | World-Class Service | Himalaya Villas",
  description: "5-star luxury hotel in Murree with premium suites and world-class service at Himalaya Villas Bhurban. Elegant accommodations, fine dining, spa services. Experience ultimate luxury hospitality in Murree Hills.",
  keywords: "5-star hotel Murree, luxury suites Bhurban, premium hotel Murree Hills, world-class hospitality Pakistan, deluxe accommodation Himalaya Villas, upscale rooms Murree, high-end suites Bhurban",
  openGraph: {
    title: "Luxury Hotel Murree - 5-Star Premium Accommodation at Himalaya Villas",
    description: "Experience ultimate luxury at our 5-star hotel in Murree with premium suites, fine dining, and world-class amenities at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/luxury-hotel-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/luxury-hotel-murree",
  },
};

export default function LuxuryHotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
