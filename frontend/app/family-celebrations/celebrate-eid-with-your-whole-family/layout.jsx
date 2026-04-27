import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Celebrate Eid With Your Whole Family | Himalaya Villas & Resorts",
  description: "Host your celebrate eid with your whole family with us. Large family experiences with full-villa coordination. From Eid feasts to multi-generational reunions, our private estate brings everyone together in comfort and style.",
  path: "/family-celebrations/celebrate-eid-with-your-whole-family",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
