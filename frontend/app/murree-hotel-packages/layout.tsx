import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Murree Hotel Packages | All-Inclusive Deals | Holiday Packages | Himalaya Villas",
  description: "Murree hotel packages with all-inclusive deals, holiday packages, and special offers at Himalaya Villas Bhurban. Family packages, honeymoon deals, corporate retreats. Best rates guaranteed!",
  keywords: "Murree hotel packages, all-inclusive hotel deals Murree, holiday packages Bhurban, family vacation packages Murree Hills, honeymoon packages Himalaya Villas, corporate retreat packages Pakistan, weekend getaways Murree",
  openGraph: {
    title: "Murree Hotel Packages - All-Inclusive Deals at Himalaya Villas",
    description: "Best hotel packages in Murree with all-inclusive deals, family packages, honeymoon offers, and corporate retreat packages at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/murree-hotel-packages",
  },
  alternates: {
    canonical: "https://himalayavillas.com/murree-hotel-packages",
  },
};

export default function MurreeHotelPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
