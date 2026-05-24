import type { SitemapRouteDef } from "@/lib/seo/sitemap-routes";

export function routeDefFromPath(path: string): Pick<SitemapRouteDef, "changeFrequency" | "priority"> {
  if (path === "/") {
    return { changeFrequency: "weekly", priority: 1 };
  }
  if (path.startsWith("/book")) {
    return { changeFrequency: "weekly", priority: 0.95 };
  }
  if (path === "/villas" || path.startsWith("/villas/")) {
    return { changeFrequency: "weekly", priority: 0.9 };
  }
  if (path.startsWith("/blog/")) {
    return { changeFrequency: "monthly", priority: 0.75 };
  }
  if (path.startsWith("/events/")) {
    return { changeFrequency: "monthly", priority: 0.8 };
  }
  if (
    /\/(privacy-policy|terms-and-conditions|refund-policy)$/.test(path)
  ) {
    return { changeFrequency: "yearly", priority: 0.35 };
  }
  if (/(hotel|murree|bhurban|villa|wedding|nikah|walima|snowfall)/i.test(path)) {
    return { changeFrequency: "monthly", priority: 0.88 };
  }
  return { changeFrequency: "monthly", priority: 0.7 };
}
