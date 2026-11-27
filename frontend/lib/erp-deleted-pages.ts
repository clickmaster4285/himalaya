// lib/erp-deleted-pages.ts
// ERP "Page Delete Requests": URLs a developer marked Done in the ERP must be
// gone from this site (proxy.ts answers 410 Gone). Moving the request away from
// Done brings them back, with no redeploy: page code is never removed.
//
//   GET {ERP}/public/{domain}/deleted-pages
//   → { data: { pages: [{ path: "/villas/old-villa", deletedAt }] } }
//
// Used by proxy.ts, so no server-only / next/cache imports here. Render-time
// code (sitemaps, listings) uses lib/erp-deleted-pages-server.ts instead.
//
// Caching: the list is read on every page request, but the ERP rate-limits per
// IP (120/min) and every visitor shares this server's IP. So one in-memory copy
// per process, refreshed at most every 30 s, one request in flight at a time.
// The copy lives on globalThis because proxy.ts and the route handlers are
// separate bundles in the same Node.js process: /api/erp-revalidate clears it
// (clearDeletedPathsCache) and the next request sees the change immediately.
//
// Fail open: on any ERP error the last good list is kept (empty if none), so an
// outage never takes pages offline and never brings deleted pages back.
import { CMS_API_URL, cmsBaseUrl } from "@/lib/erp-config";
import { normalizeEditPath } from "@/lib/erp-edits-shared";

export const DELETED_PAGES_CACHE_TAG = "erp-deleted-pages";
export const DELETED_PAGES_TTL_MS = 30_000;
const TIMEOUT_MS = 5000;
const isDev = process.env.NODE_ENV === "development";

// The ERP sends decoded, lowercase paths; anything else is dropped.
const DELETED_PATH_REGEX = /^\/[^\s?#]{1,2047}$/;

type State = {
  /** Last good list (normalized paths). */
  paths: Set<string>;
  /** When the last fetch finished (success or failure); 0 = must fetch before answering. */
  fetchedAt: number;
  inFlight: Promise<Set<string>> | null;
  /** Bumped by clearDeletedPathsCache so a fetch started before the clear can't mark the cache fresh. */
  generation: number;
};

const STATE_KEY = Symbol.for("himalaya-villas.erp-deleted-pages");

function state(): State {
  const store = globalThis as unknown as Record<symbol, State | undefined>;
  return (store[STATE_KEY] ??= { paths: new Set(), fetchedAt: 0, inFlight: null, generation: 0 });
}

const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

/** ERP payload → normalized paths. Throws on anything but a valid list, so callers keep the last good copy. */
export function parseDeletedPaths(json: unknown): string[] {
  const pages = obj(obj(json).data).pages;
  if (!Array.isArray(pages)) throw new Error("deleted-pages: invalid payload (data.pages is not an array)");
  const paths = new Set<string>();
  for (const page of pages) {
    const raw = obj(page).path;
    if (typeof raw !== "string" || raw === "/" || !DELETED_PATH_REGEX.test(raw)) continue;
    const path = normalizeEditPath(raw);
    if (path !== "/") paths.add(path); // the home page is never blocked
  }
  return [...paths];
}

/** One request to the ERP. Throws on network errors, timeouts, non-2xx and invalid JSON. */
export async function fetchDeletedPathList(): Promise<string[]> {
  const url = `${cmsBaseUrl()}/deleted-pages`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return parseDeletedPaths(await res.json());
}

async function refresh(s: State): Promise<Set<string>> {
  const generation = s.generation;
  try {
    const paths = new Set(await fetchDeletedPathList());
    // A fetch started before a clear may hold old data: don't let it overwrite the newer one.
    if (s.generation === generation) {
      s.paths = paths;
      s.fetchedAt = Date.now();
    }
    return paths;
  } catch (error) {
    // Retry after the TTL, not on every request; keep serving the last good list.
    if (s.generation === generation) s.fetchedAt = Date.now();
    console.error(
      "[erp-deleted-pages] fetch failed, keeping last good list:",
      error instanceof Error ? error.message : error,
    );
    return s.paths;
  }
}

function startRefresh(s: State): Promise<Set<string>> {
  if (!s.inFlight) {
    const run = refresh(s).finally(() => {
      if (s.inFlight === run) s.inFlight = null;
    });
    s.inFlight = run;
  }
  return s.inFlight;
}

/**
 * Normalized paths ("/a/b") deleted in the ERP. Never throws, never "/".
 * Fresh copy (< 30 s): returned as is. Stale copy: returned as is while one
 * background request refreshes it. No copy yet, or cleared by
 * /api/erp-revalidate: waits for the ERP (≤ 5 s). Development: always asks the ERP.
 */
export async function getDeletedPaths(): Promise<Set<string>> {
  if (!CMS_API_URL) return new Set();
  const s = state();
  if (isDev || s.fetchedAt === 0) return startRefresh(s);
  if (Date.now() - s.fetchedAt >= DELETED_PAGES_TTL_MS) void startRefresh(s);
  return s.paths;
}

/** Last good list held in this process (no request). Used as the fallback for render-time reads. */
export function lastGoodDeletedPaths(): Set<string> {
  return state().paths;
}

/** Called by /api/erp-revalidate: the next request refetches (and waits for) the list. */
export function clearDeletedPathsCache(): void {
  const s = state();
  s.generation++;
  s.fetchedAt = 0;
  s.inFlight = null;
}

/* ----------------------------- proxy helpers ----------------------------- */

const FILE_EXTENSION_REGEX = /\.[a-z0-9]{1,8}$/i;

/** Only GET/HEAD page requests are checked: never /, /api, /_next, /erp-preview, sitemaps or static files. */
export function shouldCheckDeletedPath(method: string, pathname: string): boolean {
  if (method !== "GET" && method !== "HEAD") return false;
  const path = normalizeEditPath(pathname);
  if (path === "/" || path === "/erp-preview") return false;
  if (path === "/api" || path.startsWith("/api/") || path.startsWith("/_next")) return false;
  if (path.startsWith("/sitemap") || path === "/robots.txt" || path.startsWith("/favicon")) return false;
  const lastSegment = path.slice(path.lastIndexOf("/") + 1);
  return !FILE_EXTENSION_REGEX.test(lastSegment);
}

// Static markup only: no ERP data ever goes in here. Colors and fonts match
// the site (globals.css: #F6F1EA background, Cormorant Garamond headings,
// DM Sans body, #8b6914 accent).
const GONE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>This page has been removed | Himalaya Villas &amp; Resorts</title>
<style>
  *{box-sizing:border-box}
  html,body{margin:0;min-height:100%}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#F6F1EA;color:#171717;font-family:"DM Sans",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center}
  main{max-width:560px}
  .eyebrow{margin:0 0 16px;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#8b6914}
  h1{margin:0 0 16px;font-family:"Cormorant Garamond",ui-serif,Georgia,serif;font-weight:500;font-size:clamp(34px,6vw,52px);line-height:1.1}
  p{margin:0 0 32px;font-size:17px;line-height:1.6;color:#525252}
  a{display:inline-block;padding:14px 28px;border-radius:999px;background:#8b6914;color:#fff;font-size:15px;font-weight:600;text-decoration:none}
  a:hover,a:focus-visible{background:#6f5410}
</style>
</head>
<body>
<main>
  <p class="eyebrow">Himalaya Villas &amp; Resorts</p>
  <h1>This page has been removed</h1>
  <p>The page you were looking for is no longer available. Explore our villas, experiences and guides from the home page.</p>
  <a href="/">Back to the home page</a>
</main>
</body>
</html>`;

/** 410 Gone for a deleted page: not 404, not a redirect, never cached or indexed. */
export function deletedPageResponse(): Response {
  return new Response(GONE_HTML, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
