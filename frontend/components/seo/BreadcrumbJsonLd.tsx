"use client";

import { usePathname } from "next/navigation";
import { getSiteOrigin } from "@/lib/seo/site-config";

function titleFromSegment(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const origin = getSiteOrigin();

  const cleanPath = pathname.split("?")[0] || "/";
  const segments = cleanPath.split("/").filter(Boolean);

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${origin}/`,
    },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem",
        position: index + 2,
        name: titleFromSegment(segment),
        item: `${origin}${href}`,
      };
    }),
  ];

  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      id="hv-jsonld-breadcrumb"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
