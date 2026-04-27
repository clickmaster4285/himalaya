import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Connect & Showcase At Our Expo Venue | Himalaya Villas & Resorts",
  description: "Host your connect & showcase at our expo venue with us. Host impactful exhibitions, trade shows, and industry meets in our structured venue. Strategically designed for smooth attendee flow and maximum exhibitor visibility.",
  path: "/corporate/connect-showcase-at-our-expo-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
