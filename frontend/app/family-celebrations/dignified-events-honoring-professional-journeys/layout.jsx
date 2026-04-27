import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Dignified Events Honoring Professional Journeys | Himalaya Villas & Resorts",
  description: "Host your dignified events honoring professional journeys with us. Celebrate a lifetime of achievement with elegance and respect. From intimate family dinners to grand organizational galas, we create retirement events that honor the legacy.",
  path: "/family-celebrations/dignified-events-honoring-professional-journeys",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
