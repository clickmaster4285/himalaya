/** Single source of truth for NAP + maps (use everywhere in UI + JSON-LD). */
export const SITE_CONTACT = {
  businessName: "Himalaya Villas & Resorts",
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
  /** Pin embedded on the contact page. Confirm this matches the Google Business Profile. */
  geo: {
    latitude: 33.9562,
    longitude: 73.385,
  },
  /** Published room-to-villa rate card. Not a star classification. */
  priceRange: "PKR 16,500 - PKR 99,000",
  address: {
    streetAddress: "Mohra Iswal near Kashmiri Bazar",
    addressLocality: "Bhurban",
    addressRegion: "Murree",
    postalCode: "47190",
    addressCountry: "PK",
  },
} as const;

export function telHref(): string {
  return `tel:${SITE_CONTACT.phoneE164}`;
}

export function mailtoHref(email: keyof typeof SITE_CONTACT.emails): string {
  return `mailto:${SITE_CONTACT.emails[email]}`;
}
