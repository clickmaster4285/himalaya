import { SITE_CONTACT } from "@/lib/site-contact";
import { format } from "date-fns";

export function buildWhatsAppBookingUrl(villaName?: string): string {
  const message = villaName ? `I want to book ${villaName}` : "I want to book a stay at Himalaya Villas & Resorts";
  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppAvailabilityUrl(
  checkIn?: Date,
  checkOut?: Date,
  guests?: string
): string {
  const message = `
I want to check availability at Himalaya Villas & Resorts.

Check-in: ${checkIn ? format(checkIn, "PPP") : "Not selected"}
Check-out: ${checkOut ? format(checkOut, "PPP") : "Not selected"}
Guests: ${guests || "Not selected"}
  `.trim();

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}