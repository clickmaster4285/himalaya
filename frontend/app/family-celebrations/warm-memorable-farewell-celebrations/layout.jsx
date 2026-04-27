import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "Warm & Memorable Farewell Celebrations | Himalaya Villas & Resorts",
  description: "Host your warm & memorable farewell celebrations with us. Create meaningful goodbyes for colleagues, friends, and loved ones in our beautiful mountain setting. From intimate send-offs to grand celebrations, we craft farewells that honor the moment.",
  path: "/family-celebrations/warm-memorable-farewell-celebrations",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
