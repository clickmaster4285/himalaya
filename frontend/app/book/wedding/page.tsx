import DestinationWeddingFlow from "@/components/DestinationWeddingFlow";

const weddingBookingSchema = {
  "@context": "https://schema.org",
  "@type": "ReservationPackage",
  "name": "Wedding Booking at Himalaya Villas",
  "description": "Book destination weddings at Himalaya Villas with complete ceremony packages, venue decoration, catering, and event management.",
  "provider": { "@id": "https://himalayavillas.com/#organization" },
  "bookingAgent": { "@id": "https://himalayavillas.com/#organization" }
};

export default function DestinationWeddingPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingBookingSchema) }} />
      <DestinationWeddingFlow />
    </div>
  );
}
