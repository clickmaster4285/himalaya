// app/api/erp-revalidate/route.ts
// Called by the ERP right after a created or edited page is published,
// updated, unpublished or deleted, and for each URL of a page delete request
// marked Done (or moved back from Done), so the change shows on the next load.
//   POST /api/erp-revalidate   { "path": "/some-page" }
//   Header: Authorization: Bearer <ERP_REVALIDATE_SECRET>
import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CMS_CACHE_TAG } from "@/lib/cms";
import { EDITS_CACHE_TAG, EDIT_PATH_REGEX } from "@/lib/erp-edits";
import { normalizeEditPath } from "@/lib/erp-edits-shared";
import { DELETED_PAGES_CACHE_TAG, clearDeletedPathsCache } from "@/lib/erp-deleted-pages";

export const dynamic = "force-dynamic";
const SITEMAPS = [
  "/sitemap_index.xml",
  "/sitemap_pages.xml",
  "/sitemap_villas.xml",
  "/sitemap_blogs.xml",
  "/sitemap_blog.xml",
  "/sitemap_events.xml",
  "/sitemap_book.xml",
];
const noStore = { "Cache-Control": "no-store" };

function authorized(request: NextRequest): boolean {
  const secret = process.env.ERP_REVALIDATE_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) return false;
  const given = Buffer.from(match[1].trim());
  const expected = Buffer.from(secret);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401, headers: noStore });
  }

  let path = "/";
  try {
    const body = (await request.json()) as { path?: unknown };
    if (typeof body?.path === "string") path = body.path;
  } catch {
    // No/invalid body: refresh the ERP caches only.
  }
  const slug = path.length <= 1024 ? normalizeEditPath(path) : "";
  if (!slug || !EDIT_PATH_REGEX.test(slug) || slug.split("/").some((s) => s === ".." || s === ".")) {
    return NextResponse.json({ ok: false, message: "Invalid path" }, { status: 400, headers: noStore });
  }

  // Expire now (not stale-while-revalidate): the next request refetches.
  // Both ERP modules: Page Editing (edits) and Page Creation (lib/cms.ts).
  revalidateTag(EDITS_CACHE_TAG, { expire: 0 });
  revalidateTag(CMS_CACHE_TAG, { expire: 0 });
  // Page Delete Requests (called for each URL when a request is marked Done or
  // moved away from Done): proxy.ts refetches the list on its next request
  // (same Node.js process), and render-time filters (sitemaps, listings) expire.
  clearDeletedPathsCache();
  revalidateTag(DELETED_PAGES_CACHE_TAG, { expire: 0 });
  // Page HTML (ERP page content, SEO metadata) is cached by ISR too.
  revalidatePath(slug);
  // ERP pages appear in the pages sitemap; deleted paths leave every sitemap.
  for (const sitemap of SITEMAPS) revalidatePath(sitemap);

  return NextResponse.json({ ok: true, path: slug }, { headers: noStore });
}
