import MeetingBookingFlow from "@/components/MeetingBookingFlow";

const meetingBookingSchema = {
  "@context": "https://schema.org",
  "@type": "ReservationPackage",
  "name": "Corporate Meeting Booking at Himalaya Villas",
  "description": "Book corporate meetings and business events at Himalaya Villas with conference facilities, boardrooms, and professional event management.",
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
    "price": "180000",
    "priceCurrency": "PKR",
    "description": "Corporate meeting package starting from PKR 180,000",
    "availability": "https://schema.org/InStock"
  },
  "bookingAgent": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort"
  }
};

export default function MeetingsBookingPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(meetingBookingSchema) }} />
      <MeetingBookingFlow />
    </div>
  );
}

