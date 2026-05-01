import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Romantic Hotels Murree | Couples Retreat | Honeymoon Hotels | Himalaya Villas",
  description: "Romantic hotels in Murree for couples and honeymoon at Himalaya Villas Bhurban. Private suites, romantic dining, couples spa services, intimate settings. Perfect for romantic getaways and anniversaries.",
  keywords: "romantic hotels Murree, couples retreat Bhurban, honeymoon hotels Murree Hills, romantic getaways Pakistan, couples spa services, intimate hotels Himalaya Villas, anniversary packages Murree, romantic dining Bhurban",
  openGraph: {
    title: "Romantic Hotels Murree - Couples Retreat at Himalaya Villas",
    description: "Romantic hotels in Murree with private suites, couples spa, romantic dining, and intimate settings perfect for honeymoons and romantic getaways at Himalaya Villas.",
    type: "website",
    url: "https://himalayavillas.com/romantic-hotels-murree",
  },
  alternates: {
    canonical: "https://himalayavillas.com/romantic-hotels-murree",
  },
};

export default function RomanticHotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
