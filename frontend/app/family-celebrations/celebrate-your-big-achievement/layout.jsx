import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Celebrate Your Big Achievement | Himalaya Villas & Resorts",
  description: "Host your celebrate your big achievement with us. Celebrate big achievements with stylish event staging. From high school to college and beyond, host an unforgettable graduation party in our modern venue.",
  path: "/family-celebrations/celebrate-your-big-achievement",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
