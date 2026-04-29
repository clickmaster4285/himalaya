import DestinationWeddingFlow from "@/components/DestinationWeddingFlow";

const weddingBookingSchema = {
  "@context": "https://schema.org",
  "@type": "ReservationPackage",
  "name": "Wedding Booking at Himalaya Villas",
  "description": "Book destination weddings at Himalaya Villas with complete ceremony packages, venue decoration, catering, and event management.",
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
  "offers": {
    "@type": "Offer",
    "price": "450000",
    "priceCurrency": "PKR",
    "description": "Complete wedding package starting from PKR 450,000",
    "availability": "https://schema.org/InStock"
  },
  "bookingAgent": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort"
  }
};

export default function DestinationWeddingPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingBookingSchema) }} />
      <DestinationWeddingFlow />
    </div>
  );
}
