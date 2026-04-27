import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Welcome Your Little Miracle | Himalaya Villas & Resorts",
  description: "Host your welcome your little miracle with us. Soft floral themes and delightful family-focused arrangements. Celebrate your baby shower or gender reveal in a dreamy space designed for precious moments.",
  path: "/family-celebrations/welcome-your-little-miracle",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
