import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Professional Conference Venue | Himalaya Villas & Resorts",
  description: "Host your professional conference venue with us. Host impactful conferences, seminars, and corporate events in our fully-equipped venue. From keynotes to breakout sessions, we deliver seamless professional experiences.",
  path: "/corporate/professional-conference-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
