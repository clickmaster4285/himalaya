import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ERP_PREVIEW_PATH, erpPreviewFrameAncestors } from "./lib/erp-preview";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, { status: 301 });
  }

  const { pathname, search } = request.nextUrl;
  const lower = pathname.toLowerCase();

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

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
