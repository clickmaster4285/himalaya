import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Reserve Our Live Music Venue | Himalaya Villas & Resorts",
  description: "Host your reserve our live music venue with us. Host your concert, album launch, or live music event in our professional venue. We provide the stage, sound, lighting, and electrifying atmosphere for unforgettable performances.",
  path: "/music/reserve-our-live-music-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
