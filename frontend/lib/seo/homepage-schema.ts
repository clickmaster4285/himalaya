import { getSiteOrigin } from "@/lib/seo/site-config";

export type JsonLdScript = {
  id: string;
  data: Record<string, unknown>;
};

const SCRIPT_ID = "hv-jsonld-homepage";

/**
 * Homepage JSON-LD graph.
 * Emits a single connected @graph with:
 *   - the sitewide lodging entity (#lodging), referenced, not redefined
 *   - WebSite (#website)
 *   - WebPage (#webpage)
 *   - FAQPage (#faq)
 * All entities reference each other via @id, so Google treats them as one graph.
 */
export function buildHomepageJsonLd(): JsonLdScript {
  const origin = getSiteOrigin();
  const url = `${origin}/`;

  return {
    id: SCRIPT_ID,
    data: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${origin}/#webpage`,
          url,
          name: "Himalaya Villas & Resorts | Bhurban, Murree",
          description:
            "Enjoy a comfortable stay at Himalaya Villas & Resorts in Bhurban, Murree. Choose from rooms, suites, apartments and private villas. Book Now!",
          isPartOf: { "@id": `${origin}/#website` },
          about: { "@id": `${origin}/#lodging` },
          mainEntity: { "@id": `${origin}/#lodging` },
          inLanguage: "en",
        },
        {
          "@type": "FAQPage",
          "@id": `${origin}/#faq`,
          isPartOf: { "@id": `${origin}/#webpage` },
          mainEntity: [
            {
              "@type": "Question",
              name: "Where is Himalaya Villas & Resorts located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Himalaya Villas & Resorts is located in Bhurban, Murree, Pakistan. The property offers rooms, suites, apartments and private villas.",
              },
            },
            {
              "@type": "Question",
              name: "What accommodation options are available?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Guests can choose from luxury rooms, executive rooms, suites, apartments and complete villas across Himalaya Apartments, Rakaposhi Villa and Himalaya Luxury Villas.",
              },
            },
            {
              "@type": "Question",
              name: "Can I book an individual room instead of a complete villa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Individual luxury rooms, executive rooms and suites are available for booking, subject to availability.",
              },
            },
            {
              "@type": "Question",
              name: "Can I book a complete private villa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Rakaposhi Villa and Himalaya Luxury Villas offer complete-villa booking options for families and groups.",
              },
            },
            {
              "@type": "Question",
              name: "Can I arrange a wedding or private event at the property?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The property offers options for weddings, nikah ceremonies, family celebrations and corporate gatherings, subject to availability and event requirements.",
              },
            },
            {
              "@type": "Question",
              name: "How can I check accommodation prices and availability?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Contact the reservations team with your travel dates, guest count and preferred accommodation to confirm current prices and availability.",
              },
            },
            {
              "@type": "Question",
              name: "Can I view the property before booking?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Guests can visit the Virtual Tour page to explore accommodation interiors and property surroundings before booking.",
              },
            },
          ],
        },
      ],
    },
  };
}