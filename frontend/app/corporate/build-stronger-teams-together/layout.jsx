import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Build Stronger Teams Together | Himalaya Villas & Resorts",
  description: "Host your build stronger teams together with us. Take your team out of the office and into experiences that build trust, improve communication, and create lasting bonds through fun and meaningful activities.",
  path: "/corporate/build-stronger-teams-together",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
