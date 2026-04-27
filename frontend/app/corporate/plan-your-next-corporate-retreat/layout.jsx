import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Plan Your Next Corporate Retreat | Himalaya Villas & Resorts",
  description: "Host your plan your next corporate retreat with us. Strategize, bond, and recharge with our all-inclusive corporate retreat packages. We provide the ideal environment for productive offsites and team building.",
  path: "/corporate/plan-your-next-corporate-retreat",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
