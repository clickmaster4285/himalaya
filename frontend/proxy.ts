// proxy.ts (Next.js 16; formerly middleware.ts). Always runs on the Node.js
// runtime, in the same process as the route handlers, so /api/erp-revalidate
// can clear the deleted-pages cache this file reads.
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ERP_PREVIEW_PATH, erpPreviewFrameAncestors } from "./lib/erp-preview";
import { deletedPageResponse, getDeletedPaths, shouldCheckDeletedPath } from "./lib/erp-deleted-pages";
import { normalizeEditPath } from "./lib/erp-edits-shared";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, { status: 301 });
  }

  const { pathname, search } = request.nextUrl;

  // ERP Page Delete Requests: a deleted path answers 410 Gone before any page
  // (code-owned, ERP-created or ERP-edited) renders. Checked before the
  // lowercase redirect so "/Old-Page?x=1" is 410 directly, not 301 → 410.
  if (shouldCheckDeletedPath(request.method, pathname)) {
    const deleted = await getDeletedPaths();
    if (deleted.size && deleted.has(normalizeEditPath(pathname))) return deletedPageResponse();
  }

  // Letters inside %XX escapes keep their case: Next normalizes them to
  // uppercase, so lowercasing them redirected in a loop.
  const lower = pathname.replace(/%[0-9a-f]{2}|[^%]+/gi, (s) => (s.startsWith("%") ? s : s.toLowerCase()));

  if (pathname !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    url.search = search;
    return NextResponse.redirect(url, { status: 301 });
  }

  if (pathname === ERP_PREVIEW_PATH) {
    // Only the ERP page editor (ERP_ADMIN_ORIGINS, read at runtime) may frame
    // the draft preview. next.config.ts sends no X-Frame-Options for this route.
    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", `frame-ancestors ${erpPreviewFrameAncestors()}`);
    response.headers.delete("X-Frame-Options");
    return response;
  }

  return NextResponse.next();
}

// Unchanged from middleware.ts. The deleted-page check itself skips non-page
// requests (shouldCheckDeletedPath): /api, /_next, files, sitemaps, /erp-preview.
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
