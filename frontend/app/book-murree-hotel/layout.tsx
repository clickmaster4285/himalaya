import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Murree Hotel | Online Hotel Booking Murree | Himalaya Villas",
  description: "Book Murree hotel online at Himalaya Villas Bhurban. Easy hotel booking with best rates, secure payment, instant confirmation. Luxury rooms, suites, and villas available. Reserve your stay today!",
  keywords: "book Murree hotel, online hotel booking Murree, Murree hotel reservation, Bhurban hotel booking, luxury hotel Murree, Himalaya Villas booking, hotel rooms Murree, suite booking Bhurban",
  openGraph: {
    title: "Book Murree Hotel - Online Hotel Booking at Himalaya Villas",
    description: "Book your luxury hotel in Murree online with best rates and instant confirmation. Premium rooms, suites, and villas at Himalaya Villas Bhurban.",
    type: "website",
    url: "https://himalayavillas.com/book-murree-hotel",
  },
  alternates: {
    canonical: "https://himalayavillas.com/book-murree-hotel",
  },
};

export default function BookMurreeHotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
