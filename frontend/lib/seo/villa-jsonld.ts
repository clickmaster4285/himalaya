import type { Villa } from "@/lib/villa-types";
import { absoluteUrl, getSiteOrigin } from "@/lib/seo/site-config";
import type { JsonLdScript } from "@/lib/seo/himalaya-schema";
import { getValidImageSrc } from "@/lib/image-utils";

export function buildVillaVacationRentalJsonLd(villa: Villa): JsonLdScript {
  const origin = getSiteOrigin();
  const path = `/villas/${encodeURIComponent(villa.slug)}`;
  const url = absoluteUrl(path);
  const images = [villa.image, ...(villa.gallery ?? [])].map((src) => absoluteUrl(getValidImageSrc(src)));

  return {
    id: `hv-jsonld-villa-${villa.slug}`,
    data: {
      "@context": "https://schema.org",
      "@type": ["VacationRental", "LodgingBusiness"],
      "@id": `${url}#villa`,
      name: villa.title,
      description: villa.description,
      url,
      image: images,
      numberOfRooms: villa.bedrooms,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Max guests", value: String(villa.guests) },
        { "@type": "PropertyValue", name: "Size", value: villa.size },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhurban",
        addressRegion: "Murree",
        addressCountry: "PK",
      },
      containedInPlace: {
        "@type": "Place",
        name: "Himalaya Premium Villas",
        url: `${origin}/`,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        description: villa.price,
        url: absoluteUrl(`/book/stay?villa=${encodeURIComponent(villa.slug)}`),
        availability: "https://schema.org/LimitedAvailability",
      },
    },
  };
}
