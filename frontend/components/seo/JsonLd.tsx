import type { JsonLdScript } from "@/lib/seo/himalaya-schema";

function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export type JsonLdProps = {
  /** Each block must use a stable unique `id` (HTML id) to avoid duplicate injection. */
  items: readonly JsonLdScript[];
};

/**
 * Injects JSON-LD into the document. Safe in App Router Server Components (no client state).
 * Place in `<head>` (layout) or at the top of a page tree — Google accepts either.
 */
export function JsonLd({ items }: JsonLdProps) {
  return (
    <>
      {items.map(({ id, data }) => (
        <script
          key={id}
          id={id}
          type="application/ld+json"
          // Server-only static JSON; avoids hydration mismatch vs client components.
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
      ))}
    </>
  );
}
