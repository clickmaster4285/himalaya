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

export function buildBhurbanInquiryWhatsAppUrl(fields: {
  fullName: string;
  email: string;
  phone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  numberOfGuests?: string;
  message?: string;
}) {
  const text = [
    "New inquiry from Hotels in Bhurban page:",
    "",
    `Name: ${fields.fullName}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "—"}`,
    `Check-in: ${fields.checkInDate || "—"}`,
    `Check-out: ${fields.checkOutDate || "—"}`,
    `Guests: ${fields.numberOfGuests || "—"}`,
    "",
    fields.message || "(no message)",
  ].join("\n");

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}




export function buildWhatsAppVillaBookingUrl(villa: {
  name: string;
  tag: string;
  price: string;
  href: string;
}) {
  const villaUrl = `https://himalayavillas.com/villas/${villa.href}`;

  const message = `
Hello,

I would like to book the following accommodation at Himalaya Villas & Resorts.

Villa/Room: ${villa.name}
Category: ${villa.tag}
Price: PKR ${villa.price} per night

Villa Details:
${villaUrl}

Please let me know:
• Availability
• Booking process
• Any current offers

Thank you.
  `.trim();

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}



export function buildWhatsAppVillaEnquiryUrl(villa: {
  name: string;
  tag: string;
  price: string;
  slug?: string;
  href?: string;
}) {
  const path = villa.slug || villa.href || "";

  const villaUrl = `https://himalayavillas.com/villas/${path}`;

  const message = `
Hello,

I would like to enquire about the following accommodation at Himalaya Villas & Resorts.

Villa/Room: ${villa.name}
Category: ${villa.tag}
Price: PKR ${villa.price} per night

Villa Details:
${villaUrl}

Could you please provide more information about:
• Availability
• Amenities
• Booking policy
• Any current offers

Thank you.
  `.trim();

  return `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}