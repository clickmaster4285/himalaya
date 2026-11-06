import { routeMetadata } from "@/lib/seo/route-titles";

export const metadata = routeMetadata("/login");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
