import MeetingBookingFlow from "@/components/MeetingBookingFlow";

const meetingBookingSchema = {
  "@context": "https://schema.org",
  "@type": "ReservationPackage",
  "name": "Corporate Meeting Booking at Himalaya Villas",
  "description": "Book corporate meetings and business events at Himalaya Villas with conference facilities, boardrooms, and professional event management.",
  "provider": { "@id": "https://himalayavillas.com/#organization" },
  "bookingAgent": { "@id": "https://himalayavillas.com/#organization" }
};

export default function MeetingsBookingPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(meetingBookingSchema) }} />
      <MeetingBookingFlow />
    </div>
  );
}

