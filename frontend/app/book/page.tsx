import { BookingTermsSection } from "@/components/BookingTerms";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingHero from "@/components/book-page/BookingHero";
import BookingFeatures from "@/components/book-page/BookingFeatures";
import BookingPackages from "@/components/book-page/BookingPackages";
import BookingReviews from "@/components/book-page/BookingReviews";
import BookingAbout from "@/components/book-page/BookingAbout";
import BookingLocation from "@/components/book-page/BookingLocation";
import BookingCTA from "@/components/book-page/BookingCTA";

const bookingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hotel Booking Service at Himalaya Villas",
  "description": "Book a private villa stay at Himalaya Villas & Resorts in Bhurban, Murree. Rates are confirmed in the quote on WhatsApp.",
  "provider": { "@id": "https://himalayavillas.com/#organization" },
  "serviceType": "Hotel Booking",
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};



export const metadata: Metadata = createPageMetadata({
  title: "Hotel Booking in Murree | Himalaya Villas",
  description: "Book a stay at Himalaya Villas in Bhurban. Rates are confirmed in the quote.",
  path: "/book",
  appendSiteBrand: false,
});

export default function BookNowLandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingServiceSchema) }} />
      {/* Top Announcement Bar */}
      <div className="bg-[#c9a55b] w-full py-2 px-4 text-center z-50 relative">
        <p className="text-[#1b261b] text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
          LIMITED SUMMER AVAILABILITY — EID & PEAK WEEKEND VILLAS BOOKING FAST | BOOK DIRECT FOR BEST RATE
        </p>
      </div>

      <Navbar />
      
      <main className="flex-grow">
        <BookingHero />
        <BookingFeatures />
        <BookingPackages />
        <BookingReviews />
        <BookingAbout />
        <BookingLocation />
        <BookingTermsSection className="bg-white" />
        <BookingCTA />
      </main>

      <Footer />
    </div>
  );
}
