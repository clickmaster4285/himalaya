import { faqData, type FaqPair } from "@/lib/faq-data";
import { SITE_CONTACT } from "@/lib/site-contact";
import { absoluteUrl, getSiteOrigin, orgSameAsFromEnv } from "@/lib/seo/site-config";

export type LodgingSchemaType = "Hotel" | "LodgingBusiness";

export type HimalayaJsonLdConfig = {
  organizationName?: string;
  siteName?: string;
  telephone?: string;
  bookingPath?: string;
  contactPath?: string;
  logoPath?: string;
  /** Paths under /public for ImageObject URLs */
  lodgingImagePaths?: string[];
  priceRange?: string;
  lodgingDescription?: string;
  lodgingType?: LodgingSchemaType;
  serviceName?: string;
  serviceDescription?: string;
  serviceArea?: string;
  reservationName?: string;
  /**
   * Full URL template with `{search_term_string}` placeholder, e.g.
   * `https://himalayavillas.com/search?q={search_term_string}`.
   * Leave unset/null unless search is implemented — required for valid SearchAction rich results.
   */
  searchUrlTemplate?: string | null;
  /** Max FAQ entities (same copy as on-page FAQ). Google recommends keeping this focused. */
  faqQuestionLimit?: number;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  latitude?: number;
  longitude?: number;
  checkinTime?: string;
  checkoutTime?: string;
};

const SCRIPT_IDS = {
  website: "hv-jsonld-website",
  organization: "hv-jsonld-organization",
  lodging: "hv-jsonld-lodging",
  service: "hv-jsonld-service",
  reservation: "hv-jsonld-reservation",
  faq: "hv-jsonld-faq",
  contactPage: "hv-jsonld-contact-page",
} as const;

export type JsonLdScript = { id: string; data: Record<string, unknown> };

function defaults(): Required<
  Pick<
    HimalayaJsonLdConfig,
    | "organizationName"
    | "siteName"
    | "telephone"
    | "bookingPath"
    | "contactPath"
    | "logoPath"
    | "lodgingImagePaths"
    | "priceRange"
    | "lodgingDescription"
    | "lodgingType"
    | "serviceName"
    | "serviceDescription"
    | "serviceArea"
    | "reservationName"
    | "faqQuestionLimit"
    | "streetAddress"
    | "addressLocality"
    | "addressRegion"
    | "postalCode"
    | "addressCountry"
    | "latitude"
    | "longitude"
    | "checkinTime"
    | "checkoutTime"
  >
> &
  Pick<HimalayaJsonLdConfig, "searchUrlTemplate"> {
  return {
    organizationName: "Himalaya Premium Villas",
    siteName: "Himalaya Villas & Resorts",
    telephone: SITE_CONTACT.phoneDisplay,
    bookingPath: "/book",
    contactPath: "/contact",
    logoPath: "/assets/himalaya-logo.png",
    lodgingImagePaths: ["/assets/gallery-exterior.jpg", "/assets/gallery-balcony.jpg", "/assets/journal-group-new.jpg"],
    priceRange: "$$$",
    lodgingDescription:
      "Luxury private villas in Bhurban, Murree Hills — premium stays, destination weddings, dining, and corporate retreats with mountain views.",
    lodgingType: "LodgingBusiness",
    serviceName: "Luxury villa stays & private events",
    serviceDescription:
      "Private villa accommodation, curated dining, weddings, corporate retreats, and concierge services in Bhurban, Pakistan.",
    serviceArea: "Pakistan",
    reservationName: "Villa & experience reservations",
    faqQuestionLimit: 12,
    streetAddress: "Mohra Iswal near Kashmiri Bazar",
    addressLocality: "Bhurban",
    addressRegion: "Murree",
    postalCode: "47190",
    addressCountry: "PK",
    latitude: 33.9562,
    longitude: 73.385,
    checkinTime: "14:00",
    checkoutTime: "12:00",
    searchUrlTemplate: undefined,
  };
}

function mergeConfig(overrides?: HimalayaJsonLdConfig) {
  return { ...defaults(), ...overrides };
}

function flattenFaqs(limit: number): FaqPair[] {
  const flat = faqData.flatMap((s) => s.questions);
  return flat.slice(0, limit);
}

export function buildWebSiteJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  const origin = getSiteOrigin();
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: c.siteName,
    url: `${origin}/`,
    publisher: {
      "@type": "Organization",
      name: c.organizationName,
      url: `${origin}/`,
    },
  };

  const template = c.searchUrlTemplate;
  if (template?.includes("{search_term_string}")) {
    base.potentialAction = {
      "@type": "SearchAction",
      target: template,
      "query-input": "required name=search_term_string",
    };
  }

  return { id: SCRIPT_IDS.website, data: base };
}

export function buildOrganizationJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  const origin = getSiteOrigin();
  const sameAs = orgSameAsFromEnv();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.organizationName,
    alternateName: c.siteName,
    url: `${origin}/`,
    logo: absoluteUrl(c.logoPath),
    telephone: c.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.streetAddress,
      addressLocality: c.addressLocality,
      addressRegion: c.addressRegion,
      postalCode: c.postalCode,
      addressCountry: c.addressCountry,
    },
  };

  if (sameAs?.length) {
    data.sameAs = sameAs;
  }

  data.hasMap = SITE_CONTACT.googleMapsUrl;

  return { id: SCRIPT_IDS.organization, data };
}

export function buildLodgingJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  const origin = getSiteOrigin();
  const types: string[] =
    c.lodgingType === "Hotel"
      ? ["Hotel", "LodgingBusiness", "LocalBusiness"]
      : ["LodgingBusiness", "Hotel", "LocalBusiness"];

  const images = c.lodgingImagePaths.map((p) => absoluteUrl(p));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": types,
    "@id": `${origin}/#lodging`,
    name: c.organizationName,
    alternateName: c.siteName,
    url: `${origin}/`,
    image: images,
    telephone: c.telephone,
    priceRange: c.priceRange,
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, JazzCash, Easypaisa",
    petsAllowed: false,
    numberOfRooms: 12,
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    description: c.lodgingDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.streetAddress,
      addressLocality: c.addressLocality,
      addressRegion: c.addressRegion,
      postalCode: c.postalCode,
      addressCountry: c.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.latitude,
      longitude: c.longitude,
    },
    hasMap: SITE_CONTACT.googleMapsUrl,
    checkinTime: c.checkinTime,
    checkoutTime: c.checkoutTime,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Mountain view", value: true },
    ],
  };

  return { id: SCRIPT_IDS.lodging, data };
}

export function buildServiceJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  const origin = getSiteOrigin();

  return {
    id: SCRIPT_IDS.service,
    data: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.serviceName,
      description: c.serviceDescription,
      serviceType: "Lodging and event hospitality",
      areaServed: {
        "@type": "Country",
        name: c.serviceArea,
      },
      provider: {
        "@type": "Organization",
        name: c.organizationName,
        url: `${origin}/`,
      },
      offers: {
        "@type": "Offer",
        url: absoluteUrl(c.bookingPath),
        availability: "https://schema.org/LimitedAvailability",
      },
    },
  };
}

export function buildReservationJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  const origin = getSiteOrigin();

  return {
    id: SCRIPT_IDS.reservation,
    data: {
      "@context": "https://schema.org",
      "@type": "Reservation",
      name: c.reservationName,
      url: absoluteUrl(c.bookingPath),
      reservationFor: {
        "@type": "LodgingBusiness",
        "@id": `${origin}/#lodging`,
        name: c.organizationName,
        url: `${origin}/`,
      },
      broker: {
        "@type": "Organization",
        name: c.organizationName,
        url: `${origin}/`,
      },
    },
  };
}

export function buildFaqPageJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  const origin = getSiteOrigin();
  const pairs = flattenFaqs(c.faqQuestionLimit);

  return {
    id: SCRIPT_IDS.faq,
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${origin}/#faq`,
      mainEntity: pairs.map((pair) => ({
        "@type": "Question",
        name: pair.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: pair.a,
        },
      })),
    },
  };
}

export function buildContactPageJsonLd(cfg?: HimalayaJsonLdConfig): JsonLdScript {
  const c = mergeConfig(cfg);
  return {
    id: SCRIPT_IDS.contactPage,
    data: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: absoluteUrl(c.contactPath),
      name: `Contact — ${c.organizationName}`,
      isPartOf: {
        "@type": "WebSite",
        name: c.siteName,
        url: `${getSiteOrigin()}/`,
      },
      mainEntity: {
        "@type": "LodgingBusiness",
        name: c.organizationName,
        telephone: SITE_CONTACT.phoneDisplay,
        email: SITE_CONTACT.emails.bookings,
        address: {
          "@type": "PostalAddress",
          streetAddress: c.streetAddress,
          addressLocality: c.addressLocality,
          addressRegion: c.addressRegion,
          postalCode: c.postalCode,
          addressCountry: c.addressCountry,
        },
        hasMap: SITE_CONTACT.googleMapsUrl,
      },
    },
  };
}

/** Site-wide JSON-LD (root layout): WebSite + Organization — no duplicates on inner pages. */
export function globalJsonLdScripts(cfg?: HimalayaJsonLdConfig): JsonLdScript[] {
  return [buildWebSiteJsonLd(cfg), buildOrganizationJsonLd(cfg)];
}

/** Home page: lodging, service, reservation intent, FAQ (matches visible FAQ copy). */
export function homePageJsonLdScripts(cfg?: HimalayaJsonLdConfig): JsonLdScript[] {
  return [
    buildLodgingJsonLd(cfg),
    buildServiceJsonLd(cfg),
    buildReservationJsonLd(cfg),
  ];
}

export function contactPageJsonLdScripts(cfg?: HimalayaJsonLdConfig): JsonLdScript[] {
  return [buildContactPageJsonLd(cfg)];
}
