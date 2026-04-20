import { SITE_CONTACT } from "@/lib/site-contact";

export function buildWhatsAppBookingUrl(villaName?: string): string {
  const message = villaName ? `I want to book ${villaName}` : "I want to book a stay at Himalaya Villas";
  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

