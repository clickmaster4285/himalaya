import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingHero from "@/components/book-page/BookingHero";
import BookingFeatures from "@/components/book-page/BookingFeatures";
import BookingPackages from "@/components/book-page/BookingPackages";
import BookingReviews from "@/components/book-page/BookingReviews";
import BookingAbout from "@/components/book-page/BookingAbout";
import BookingLocation from "@/components/book-page/BookingLocation";
import BookingCTA from "@/components/book-page/BookingCTA";

export const metadata: Metadata = {
  title: "Hotel Booking in Murree | Himalaya Villas",
  description: "Book your luxury hotel in Murree at Himalaya Villas. Enjoy guaranteed lowest rates, flexible cancellation, and 5-star mountain luxury in Bhurban.",
};

export default function BookNowLandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] flex flex-col">
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
        <BookingCTA />
      </main>

      <Footer />
    </div>
  );
}
