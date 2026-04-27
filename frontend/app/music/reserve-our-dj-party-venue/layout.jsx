import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Reserve Our DJ & Party Venue | Himalaya Villas & Resorts",
  description: "Host your reserve our dj & party venue with us. Host your club night, music festival, or private party in our professional venue. We provide the stage, sound, lighting, and electrifying atmosphere for unforgettable dance events.",
  path: "/music/reserve-our-dj-party-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
