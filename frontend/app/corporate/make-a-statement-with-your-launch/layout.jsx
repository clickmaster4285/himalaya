import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Make a Statement With Your Launch | Himalaya Villas & Resorts",
  description: "Host your make a statement with your launch with us. Unveil your product in style with our premium event venue. From intimate brand previews to large-scale productions, we deliver unforgettable launch experiences.",
  path: "/corporate/make-a-statement-with-your-launch",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
