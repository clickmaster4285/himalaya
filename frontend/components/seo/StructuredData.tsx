import type { HimalayaJsonLdConfig } from "@/lib/seo/himalaya-schema";
import {
  contactPageJsonLdScripts,
  globalJsonLdScripts,
  homePageJsonLdScripts,
  type JsonLdScript,
} from "@/lib/seo/himalaya-schema";
import { JsonLd } from "@/components/seo/JsonLd";

export { JsonLd };

export type StructuredDataProps = {
  items: readonly JsonLdScript[];
};

/**
 * Generic entry point: pass pre-built schema objects from `lib/seo/himalaya-schema` or custom builders.
 */
export function StructuredData({ items }: StructuredDataProps) {
  return <JsonLd items={items} />;
}

export type SiteStructuredDataProps = {
  config?: HimalayaJsonLdConfig;
};

/** WebSite + Organization — render once in root layout. */
export function SiteStructuredData({ config }: SiteStructuredDataProps) {
  return <JsonLd items={globalJsonLdScripts(config)} />;
}

export type HomeStructuredDataProps = {
  config?: HimalayaJsonLdConfig;
};

/** LodgingBusiness/Hotel, Service, Reservation, FAQPage — home route only. */
export function HomeStructuredData({ config }: HomeStructuredDataProps) {
  return <JsonLd items={homePageJsonLdScripts(config)} />;
}

export type ContactStructuredDataProps = {
  config?: HimalayaJsonLdConfig;
};

/** ContactPage — `/contact` only (global org/website already in layout). */
export function ContactStructuredData({ config }: ContactStructuredDataProps) {
  return <JsonLd items={contactPageJsonLdScripts(config)} />;
}
