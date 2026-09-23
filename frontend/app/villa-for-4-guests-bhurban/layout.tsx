import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Private Villa for 4 Guests in Bhurban - Himalaya Villas & Resorts",
  description:
    "Private villa for 4 guests in Bhurban Murree – 3 exclusive-use villas for couples & families from PKR 50,000/night with terrace & mountain views. Reserve today.",
  path: "/villa-for-4-guests-bhurban",
  keywords: [
    "villa for 4 guests Bhurban",
    "private villa Bhurban Murree",
    "4 bedroom villa Murree",
    "Himalaya Villas Bhurban",
    "villa for couples Murree",
    "family villa Bhurban",
  ],
  ogImage: "/assets/villa-hero.jpg",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
