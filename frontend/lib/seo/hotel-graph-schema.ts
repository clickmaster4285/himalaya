import { BRAND, getSiteOrigin } from "@/lib/seo/site-config";
import { SITE_CONTACT } from "@/lib/site-contact";

/** One Organization and one lodging entity for the whole site. No star or review rating. */
export function buildHotelGraphJsonLd() {
  const origin = getSiteOrigin();
  const lodgingId = `${origin}/#lodging`;
  const organizationId = `${origin}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BRAND.name,
        alternateName: [...BRAND.alternateNames],
        url: `${origin}/`,
        logo: {
          "@type": "ImageObject",
          "@id": `${origin}/#logo`,
          url: `${origin}/assets/himalaya-logo.png`,
        },
        telephone: SITE_CONTACT.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          ...SITE_CONTACT.address,
        },
      },
      {
        "@type": ["VacationRental", "LodgingBusiness"],
        "@id": lodgingId,
        name: BRAND.name,
        description:
          "Private villa estate in Bhurban, Murree Hills. Twelve villas booked for stays, weddings, and gatherings. Himalaya Villas does not carry a formal star rating.",
        url: `${origin}/`,
        telephone: SITE_CONTACT.phoneDisplay,
        image: `${origin}/assets/gallery-exterior.jpg`,
        logo: { "@id": `${origin}/#logo` },
        priceRange: SITE_CONTACT.priceRange,
        currenciesAccepted: "PKR",
        numberOfRooms: 12,
        address: {
          "@type": "PostalAddress",
          ...SITE_CONTACT.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE_CONTACT.geo.latitude,
          longitude: SITE_CONTACT.geo.longitude,
        },
        hasMap: SITE_CONTACT.googleMapsUrl,
        checkinTime: "14:00",
        checkoutTime: "12:00",
        parentOrganization: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: BRAND.name,
        publisher: { "@id": organizationId },
      },
    ],
  };
}
