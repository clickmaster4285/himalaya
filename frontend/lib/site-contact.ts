/** Single source of truth for NAP + maps (use everywhere in UI + JSON-LD). */
export const SITE_CONTACT = {
  businessName: "Himalaya Premium Villas",
  /** Google Maps listing / directions */
  googleMapsUrl: "https://maps.app.goo.gl/SzyHVXrCLic2CuvH8",
  phoneDisplay: "+92 304 567 9000",
  phoneE164: "+923045679000",
  whatsappUrl: "https://wa.me/923045679000",
  emails: {
    bookings: "bookings@himalayavillas.com",
    info: "info@himalayavillas.com",
  },
  addressLines: [
    "Mohra Iswal near Kashmiri Bazar",
    "Bhurban, Murree Hills",
    "Punjab 47190, Pakistan",
  ] as const,
} as const;

export function telHref(): string {
  return `tel:${SITE_CONTACT.phoneE164}`;
}

export function mailtoHref(email: keyof typeof SITE_CONTACT.emails): string {
  return `mailto:${SITE_CONTACT.emails[email]}`;
}
