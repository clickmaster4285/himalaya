/** Site-wide Organization + LodgingBusiness + WebSite + WebPage @graph JSON-LD. */
export const HOTEL_GRAPH_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://himalayavillas.com/#organization",
      name: "Himalaya Villas & Resorts",
      alternateName: [
        "Himalaya Villas and Resort",
        "Himalaya Villas Bhurban",
        "Himalaya Premium Villas",
      ],
      url: "https://himalayavillas.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://himalayavillas.com/favicon.ico",
      },
      description:
        "Himalaya Villas & Resorts is a private luxury villa estate in Bhurban Murree, offering luxury villa stays, mountain views, curated dining, destination weddings, family celebrations, corporate retreats, and private experiences.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-304-567-9000",
        contactType: "reservations and customer support",
        areaServed: "Murree",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": ["LodgingBusiness", "Resort"],
      "@id": "https://himalayavillas.com/#lodgingbusiness",
      name: "Himalaya Villas and Resort",
      url: "https://himalayavillas.com/",
      description:
        "Himalaya Villas and Resort is a private luxury estate in Bhurban Murree offering villa stays, apartments, whole villas, private dining, weddings, celebrations, corporate retreats, and curated mountain experiences.",
      image: "https://himalayavillas.com/favicon.ico",
      telephone: "+92-304-567-9000",
      priceRange: "PKR 16,500 - PKR 99,000 per night",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mohra Iswal near Kashmiri Bazar",
        addressLocality: "Bhurban",
        addressRegion: "Punjab",
        postalCode: "47190",
        addressCountry: "PK",
      },
      areaServed: {
        "@type": "City",
        name: "Murree",
      },
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Private Villas",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Panoramic Himalayan Views",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Curated Dining Experiences",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Outdoor Celebration Spaces",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Corporate Retreat Facilities",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Private and Secure Estate",
          value: true,
        },
      ],
      makesOffer: [
        {
          "@type": "Offer",
          name: "Private Villa Stays in Bhurban Murree",
          url: "https://himalayavillas.com/villas",
        },
        {
          "@type": "Offer",
          name: "Destination Weddings in Bhurban Murree",
          url: "https://himalayavillas.com/events",
        },
        {
          "@type": "Offer",
          name: "Family Celebrations in Bhurban Murree",
          url: "https://himalayavillas.com/events",
        },
        {
          "@type": "Offer",
          name: "Corporate Retreats in Bhurban Murree",
          url: "https://himalayavillas.com/events",
        },
        {
          "@type": "Offer",
          name: "Private Dining Experiences",
          url: "https://himalayavillas.com/experience",
        },
        {
          "@type": "Offer",
          name: "Luxury Mountain Experiences",
          url: "https://himalayavillas.com/experience",
        },
      ],
      parentOrganization: {
        "@id": "https://himalayavillas.com/#organization",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://himalayavillas.com/#website",
      url: "https://himalayavillas.com/",
      name: "Himalaya Villas & Resorts",
      description:
        "Private luxury villas, resort-style stays, destination weddings, corporate retreats, family celebrations, and curated mountain experiences in Bhurban Murree.",
      publisher: {
        "@id": "https://himalayavillas.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": "https://himalayavillas.com/#webpage",
      url: "https://himalayavillas.com/",
      name: "Himalaya Villas and Resort Bhurban Murree",
      description:
        "Himalaya Villas and Resort is a private luxury estate in Bhurban Murree with private villas, luxury stays, mountain views, dining, weddings, celebrations, corporate retreats, and curated experiences.",
      isPartOf: {
        "@id": "https://himalayavillas.com/#website",
      },
      about: {
        "@id": "https://himalayavillas.com/#lodgingbusiness",
      },
      mainEntity: {
        "@id": "https://himalayavillas.com/#lodgingbusiness",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://himalayavillas.com/favicon.ico",
      },
      inLanguage: "en",
    },
  ],
} as const;
