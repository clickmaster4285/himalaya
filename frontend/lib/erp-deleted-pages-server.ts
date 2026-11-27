// lib/erp-deleted-pages-server.ts
// Render-time reads of the ERP deleted-pages list (sitemaps, blog index,
// related links, ERP post cards). proxy.ts uses lib/erp-deleted-pages.ts.
//
// Uses unstable_cache (tag "erp-deleted-pages", expired by /api/erp-revalidate)
// rather than a no-store fetch, so static/ISR pages and sitemaps stay static
// and are regenerated as soon as a deletion is marked Done or undone.
import "server-only";
import { unstable_cache } from "next/cache";
import { CMS_API_URL, CMS_SITE_DOMAIN } from "@/lib/erp-config";
import {
  DELETED_PAGES_CACHE_TAG,
  fetchDeletedPathList,
  lastGoodDeletedPaths,
} from "@/lib/erp-deleted-pages";
import { normalizeEditPath } from "@/lib/erp-edits-shared";
import { getSiteOrigin } from "@/lib/seo/site-config";

const isDev = process.env.NODE_ENV === "development";
// Safety net only (same as lib/cms.ts): /api/erp-revalidate expires the tag the
// moment a request is marked Done or undone. A shorter value would shorten the
// ISR period of every page and sitemap that reads the list.
const RENDER_REVALIDATE_SECONDS = 300;
// After a failure, skip the ERP for this long (keeps builds fast while it is down).
const FAILURE_BACKOFF_MS = 30_000;

const fetchCached = isDev
  ? fetchDeletedPathList
  : unstable_cache(fetchDeletedPathList, ["erp-deleted-pages", CMS_SITE_DOMAIN], {
      revalidate: RENDER_REVALIDATE_SECONDS,
      tags: [DELETED_PAGES_CACHE_TAG],
    });

let lastGood: Set<string> | null = null;
let lastFailureAt = 0;

/**
 * Normalized deleted paths for render-time filtering. Never throws: on an ERP
 * error, the last good list (this module's, else the proxy's) is used.
 */
export async function getDeletedPathsForRender(): Promise<Set<string>> {
  const fallback = () => lastGood ?? lastGoodDeletedPaths();
  if (!CMS_API_URL || Date.now() - lastFailureAt < FAILURE_BACKOFF_MS) return fallback();
  try {
    lastGood = new Set(await fetchCached());
    return lastGood;
  } catch (error) {
    lastFailureAt = Date.now();
    console.error(
      "[erp-deleted-pages] render-time fetch failed, keeping last good list:",
      error instanceof Error ? error.message : error,
    );
    return fallback();
  }
}

/**
 * Normalized path of a link on this site ("/a/b", relative or absolute on this
 * domain, with or without www), or null for external / invalid links.
 */
export function pathOfSiteUrl(href: string): string | null {
  if (!href) return null;
  if (href.startsWith("/") && !href.startsWith("//")) return normalizeEditPath(href);
  try {
    const url = new URL(href);
    const site = new URL(getSiteOrigin()).hostname.replace(/^www\./, "");
    if (!/^https?:$/.test(url.protocol) || url.hostname.replace(/^www\./, "") !== site) return null;
    return normalizeEditPath(url.pathname);
  } catch {
    return null;
  }
}

/** Items whose site path is not deleted in the ERP. `pathOf` returns a path or a site URL. */
export async function withoutDeletedPaths<T>(items: T[], pathOf: (item: T) => string): Promise<T[]> {
  const deleted = await getDeletedPathsForRender();
  if (!deleted.size) return items;
  return items.filter((item) => {
    const path = pathOfSiteUrl(pathOf(item));
    return path === null || !deleted.has(path);
  });
}
