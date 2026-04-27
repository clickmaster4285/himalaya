import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Reserve Our Literary Venue | Himalaya Villas & Resorts",
  description: "Host your reserve our literary venue with us. Host your mushaira, poetry reading, or literary festival in our dedicated venue. We provide authentic ambiance, professional sound, and elegant spaces for unforgettable literary evenings.",
  path: "/music/reserve-our-literary-venue",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
