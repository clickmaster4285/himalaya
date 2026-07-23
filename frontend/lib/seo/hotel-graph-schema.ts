/** Site-wide Organization + LodgingBusiness + WebSite @graph JSON-LD. */
export const HOTEL_GRAPH_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://himalayavillas.com/#organization",
      name: "Himalaya Premium Villas",
      alternateName: "Himalaya Villas & Resorts",
      url: "https://himalayavillas.com/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://himalayavillas.com/#logo",
        url: "https://himalayavillas.com/assets/himalaya-logo.png",
      },
      telephone: "+92 304 567 9000",
    },
    {
      "@type": "LodgingBusiness",
      "@id": "https://himalayavillas.com/#lodgingbusiness",
      name: "Himalaya Premium Villas",
      alternateName: "Himalaya Villas & Resorts",
      url: "https://himalayavillas.com/",
      logo: {
        "@id": "https://himalayavillas.com/#logo",
      },
      image: "https://himalayavillas.com/assets/himalaya-logo.png",
      telephone: "+92 304 567 9000",
      priceRange: "$$",
      hasMap: "https://maps.app.goo.gl/SzyHVXrCLic2CuvH8",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mohra Iswal near Kashmiri Bazar",
        addressLocality: "Bhurban",
        addressRegion: "Murree",
        postalCode: "47190",
        addressCountry: "PK",
      },
      areaServed: {
        "@type": "Place",
        name: "Murree",
      },
      parentOrganization: {
        "@id": "https://himalayavillas.com/#organization",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://himalayavillas.com/#website",
      url: "https://himalayavillas.com/",
      name: "Himalaya Premium Villas",
      publisher: {
        "@id": "https://himalayavillas.com/#organization",
      },
    },
  ],
} as const;
