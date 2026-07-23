import { HOTEL_GRAPH_JSON_LD } from "@/lib/seo/hotel-graph-schema";

function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Organization + LodgingBusiness + WebSite + WebPage @graph — render in page/layout head. */
export function HotelGraphStructuredData() {
  return (
    <script
      id="hv-jsonld-hotel-graph"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(
          HOTEL_GRAPH_JSON_LD as unknown as Record<string, unknown>,
        ),
      }}
    />
  );
}
