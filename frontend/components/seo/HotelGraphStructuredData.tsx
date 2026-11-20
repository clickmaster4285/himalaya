"use client";

import { usePathname } from "next/navigation";
import { buildHotelGraphJsonLd } from "@/lib/seo/hotel-graph-schema";

function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Organization + LodgingBusiness + WebSite + WebPage @graph — render in page/layout head. */
export function HotelGraphStructuredData() {
  const pathname = usePathname();
  // The home page renders its own Resort/WebSite/WebPage graph (lib/seo/homepage-schema.ts).
  if (pathname === "/") return null;

  return (
    <script
      id="hv-jsonld-hotel-graph"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(buildHotelGraphJsonLd() as unknown as Record<string, unknown>),
      }}
    />
  );
}
