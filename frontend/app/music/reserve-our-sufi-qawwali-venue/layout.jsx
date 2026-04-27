import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Reserve Our Sufi Qawwali Venue | Himalaya Villas & Resorts",
  description: "Host your reserve our sufi qawwali venue with us. Host your private mehfil, corporate event, or cultural gathering in our dedicated Sufi space. We provide the authentic ambiance, professional sound, and renowned qawwali artists for an unforgettable evening.",
  path: "/music/reserve-our-sufi-qawwali-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
