import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Reserve Our Cultural Venue | Himalaya Villas & Resorts",
  description: "Host your reserve our cultural venue with us. Host your cultural show, folk festival, or heritage event in our dedicated venue. We provide traditional ambiance, professional facilities, and authentic atmosphere for unforgettable cultural celebrations.",
  path: "/music/reserve-our-cultural-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
