/**
 * @file Head-oriented JSON-LD exports (App Router: prefer `<SiteStructuredData />` in root `<head>`).
 * Re-exports the same implementations as `StructuredData.tsx` for naming discoverability.
 */
export { JsonLd } from "@/components/seo/JsonLd";
export {
  StructuredData,
  SiteStructuredData,
  HomeStructuredData,
  ContactStructuredData,
} from "@/components/seo/StructuredData";
export type {
  StructuredDataProps,
  SiteStructuredDataProps,
  HomeStructuredDataProps,
  ContactStructuredDataProps,
} from "@/components/seo/StructuredData";
