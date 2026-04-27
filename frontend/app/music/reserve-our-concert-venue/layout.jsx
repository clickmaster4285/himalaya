import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Reserve Our Concert Venue | Himalaya Villas & Resorts",
  description: "Host your reserve our concert venue with us. Host your private concert, recital, or jazz evening in our acoustically-optimized venue. We provide the perfect space, professional sound, and elegant ambiance for unforgettable musical events.",
  path: "/music/reserve-our-concert-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
