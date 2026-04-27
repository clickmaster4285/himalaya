import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Celebrate Your Milestone Moment | Himalaya Villas & Resorts",
  description: "Host your celebrate your milestone moment with us. Turning 18, 30, 50, or 80? Host your unforgettable birthday celebration in our premium venue. From intimate dinners to grand galas, we deliver joy, elegance, and lasting memories.",
  path: "/family-celebrations/celebrate-your-milestone-moment",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
