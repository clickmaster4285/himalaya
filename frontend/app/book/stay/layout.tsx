import { routeMetadata } from "@/lib/seo/route-titles";

export const metadata = routeMetadata("/book/stay");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
