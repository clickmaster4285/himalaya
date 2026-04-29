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

const bookingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hotel Booking Service at Himalaya Villas",
  "description": "Book luxury hotel accommodation in Murree at Himalaya Villas. Guaranteed lowest rates, flexible cancellation, and 5-star mountain luxury in Bhurban.",
  "provider": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort",
    "telephone": "+92 304 567 9000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhurban",
      "addressLocality": "Murree",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    }
  },
  "serviceType": "Hotel Booking",
  "offers": {
    "@type": "Offer",
    "price": "40000",
    "priceCurrency": "PKR",
    "description": "Luxury villa accommodation starting from PKR 40,000 per night",
    "availability": "https://schema.org/InStock"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Murree Hills, Bhurban"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book a villa at Himalaya Villas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book directly through our website booking system or contact us via WhatsApp for personalized assistance. We offer guaranteed lowest rates on direct bookings."
      }
    },
    {
      "@type": "Question",
      "name": "What is your cancellation policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer flexible cancellation with free cancellation available 7+ days prior to check-in for most bookings."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: "Hotel Booking in Murree | Himalaya Villas",
  description: "Book your luxury hotel in Murree at Himalaya Villas. Enjoy guaranteed lowest rates, flexible cancellation, and 5-star mountain luxury in Bhurban.",
};

export default function BookNowLandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
