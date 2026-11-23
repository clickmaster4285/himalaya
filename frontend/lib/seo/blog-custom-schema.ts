import type { JsonLdScript } from "@/lib/seo/himalaya-schema";

/**
 * Hand-written JSON-LD for individual blog posts. When a post has an entry here, its page emits
 * only this schema in place of the auto-generated BlogPosting + FAQPage blocks.
 */
const BLOG_CUSTOM_SCHEMA: Record<string, Record<string, unknown>> = {
  "what-is-accommodation": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://himalayavillas.com/blogs/what-is-accommodation/#article",
        url: "https://himalayavillas.com/blogs/what-is-accommodation/",
        headline: "What Is Accommodation? Types & Examples in Hospitality",
        description:
          "What is accommodation? Learn how it works in hospitality, its main property types, accommodation options and what guests should consider before booking.",
        inLanguage: "en",
        mainEntityOfPage: {
          "@id": "https://himalayavillas.com/blogs/what-is-accommodation/#webpage",
        },
        author: {
          "@type": "Organization",
          "@id": "https://himalayavillas.com/#resort",
          name: "Himalaya Villas and Resort",
          url: "https://himalayavillas.com/",
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://himalayavillas.com/#resort",
          name: "Himalaya Villas and Resort",
          url: "https://himalayavillas.com/",
        },
        keywords: [
          "what is accommodation",
          "accommodation in hospitality",
          "types of accommodation",
          "hospitality accommodation",
          "accommodation examples",
          "rooms suites apartments villas",
        ],
        about: [
          { "@type": "Thing", name: "Accommodation" },
          { "@type": "Thing", name: "Hospitality" },
          { "@type": "Thing", name: "Hotel" },
          { "@type": "Thing", name: "Resort" },
          { "@type": "Thing", name: "Room" },
          { "@type": "Thing", name: "Suite" },
          { "@type": "Thing", name: "Apartment" },
          { "@type": "Thing", name: "Villa" },
        ],
        mentions: {
          "@type": "Resort",
          "@id": "https://himalayavillas.com/#resort",
          name: "Himalaya Villas and Resort",
          url: "https://himalayavillas.com/",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://himalayavillas.com/blogs/what-is-accommodation/#webpage",
        url: "https://himalayavillas.com/blogs/what-is-accommodation/",
        name: "What Is Accommodation? Types & Examples in Hospitality",
        description:
          "What is accommodation? Learn how it works in hospitality, its main property types, accommodation options and what guests should consider before booking.",
        inLanguage: "en",
        isPartOf: { "@id": "https://himalayavillas.com/#website" },
        mainEntity: { "@id": "https://himalayavillas.com/blogs/what-is-accommodation/#article" },
        about: { "@type": "Thing", name: "Accommodation" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://himalayavillas.com/blogs/what-is-accommodation/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is accommodation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Accommodation is temporary lodging provided to guests and travellers during a trip, holiday or visit. In hospitality, accommodation may be provided by hotels, resorts, guest houses and other lodging businesses.",
            },
          },
          {
            "@type": "Question",
            name: "What is accommodation in hospitality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Accommodation in hospitality is the lodging provided by a hospitality property to its guests. A hotel or resort may provide accommodation through rooms, suites, apartments, villas or other accommodation units.",
            },
          },
          {
            "@type": "Question",
            name: "What is accommodation in tourism?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Accommodation in tourism refers to lodging used by travellers while visiting a destination. It is one of the main parts of the travel and hospitality experience.",
            },
          },
          {
            "@type": "Question",
            name: "What are the main types of accommodation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Accommodation can be classified in different ways. Hospitality property types include hotels, resorts, guest houses, hostels and bed and breakfasts, while accommodation options within a property can include rooms, suites, apartments and villas.",
            },
          },
          {
            "@type": "Question",
            name: "Is a hotel the same as a room?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A hotel is a hospitality property that provides accommodation. A room is an accommodation unit that can be offered within a hotel or another hospitality property.",
            },
          },
          {
            "@type": "Question",
            name: "Is a resort the same as a villa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A resort is a hospitality property that can provide different accommodation options. A villa can be an accommodation option within a resort or operate independently depending on the business model.",
            },
          },
          {
            "@type": "Question",
            name: "Can a resort have rooms, suites, apartments and villas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A resort can provide several accommodation options within the same property, including rooms, suites, apartments and villas, depending on the resort.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a room, suite, apartment and villa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A room is a private accommodation unit. A suite generally provides additional space, an apartment can provide more independent living space, and a villa can provide a more complete and private accommodation option. Exact layouts vary by property.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a fixed number of accommodation types?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Accommodation can be classified by property type, service model, structure, privacy, guest capacity and other factors, so different hospitality guides may use different numbers of accommodation types.",
            },
          },
          {
            "@type": "Question",
            name: "What should guests consider before booking accommodation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Guests should consider capacity, location, space, layout, privacy, facilities, rates, availability and the purpose of their stay before booking.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://himalayavillas.com/blogs/what-is-accommodation/#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://himalayavillas.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://himalayavillas.com/blogs/" },
          {
            "@type": "ListItem",
            position: 3,
            name: "What Is Accommodation? Types & Examples in Hospitality",
            item: "https://himalayavillas.com/blogs/what-is-accommodation/",
          },
        ],
      },
      {
        "@type": "Resort",
        "@id": "https://himalayavillas.com/#resort",
        name: "Himalaya Villas and Resort",
        url: "https://himalayavillas.com/",
      },
      {
        "@type": "WebSite",
        "@id": "https://himalayavillas.com/#website",
        url: "https://himalayavillas.com/",
        name: "Himalaya Villas and Resort",
        publisher: { "@id": "https://himalayavillas.com/#resort" },
        inLanguage: "en",
      },
    ],
  },
};

export function getBlogCustomSchema(slug: string): JsonLdScript | undefined {
  const data = BLOG_CUSTOM_SCHEMA[slug.toLowerCase()];
  return data ? { id: `hv-jsonld-blog-${slug.toLowerCase()}`, data } : undefined;
}
