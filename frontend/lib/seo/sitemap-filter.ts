import { isRedirectedDuplicate } from "@/lib/seo/intent-canonicals";
import { isLegacyRedirectSource } from "@/lib/seo/legacy-redirects";
import { ROUTE_NOINDEX_PATHS } from "@/lib/seo/route-titles";

/** Pages a sitemap must not list: redirects, noindex routes, and paths that are not lowercase. */
const NOT_FOR_SITEMAP = new Set(["/show-card", "/blog", "/book-best-hotel-in-murree"]);

export function isExcludedFromSitemap(path: string): boolean {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p !== p.toLowerCase()) return true;
  if (NOT_FOR_SITEMAP.has(p) || ROUTE_NOINDEX_PATHS.has(p)) return true;
  if (isLegacyRedirectSource(p)) return true;
  return isRedirectedDuplicate(p);
}
