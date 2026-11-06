import { routeMetadata } from "@/lib/seo/route-titles";

export const metadata = routeMetadata("/show-card");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
