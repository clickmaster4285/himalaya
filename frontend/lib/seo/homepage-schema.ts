export type JsonLdScript = {
  id: string;
  data: Record<string, unknown>;
};

const SCRIPT_ID = "hv-jsonld-homepage";

const HOME_URL = "https://himalayavillas.com/";
const HOME_DESCRIPTION =
  "Enjoy a comfortable stay at Himalaya Villas & Resort Hotel in Murree, Bhurban. Choose from rooms, suites, apartments and private villas. Book Now!";

/**
 * Homepage JSON-LD graph (Resort + WebSite + WebPage).
 * Rendered only on the root route `/` (app/page.tsx). The sitewide hotel graph
 * in the root layout is skipped on `/` so these @ids are not defined twice.
 */
export function buildHomepageJsonLd(): JsonLdScript {
  return {
    id: SCRIPT_ID,
    data: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Resort",
          "@id": `${HOME_URL}#resort`,
          name: "Himalaya Villas and Resort",
          url: HOME_URL,
          description: HOME_DESCRIPTION,
          telephone: "+92 304 567 9000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Mohra Iswal near Kashmiri Bazar",
            addressLocality: "Bhurban",
            addressRegion: "Punjab",
            postalCode: "47190",
            addressCountry: "PK",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+92 304 567 9000",
            contactType: "reservations",
          },
          mainEntityOfPage: { "@id": `${HOME_URL}#webpage` },
        },
        {
          "@type": "WebSite",
          "@id": `${HOME_URL}#website`,
          url: HOME_URL,
          name: "Himalaya Villas and Resort",
          publisher: { "@id": `${HOME_URL}#resort` },
          inLanguage: "en",
        },
        {
          "@type": "WebPage",
          "@id": `${HOME_URL}#webpage`,
          url: HOME_URL,
          name: "Himalaya Villas and Resort Hotel in Murree, Bhurban",
          description: HOME_DESCRIPTION,
          isPartOf: { "@id": `${HOME_URL}#website` },
          mainEntity: { "@id": `${HOME_URL}#resort` },
          about: { "@id": `${HOME_URL}#resort` },
          inLanguage: "en",
        },
      ],
    },
  };
}
