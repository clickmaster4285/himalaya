import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, type SessionRole } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/dashboard-nav";

function roleMayAccessPath(pathname: string, role: SessionRole): boolean {
  if (pathname.startsWith("/dashboard/superadmin")) return role === "SUPERADMIN";
  if (pathname.startsWith("/dashboard/manager")) return role === "BOOKING_MANAGER";
  if (pathname.startsWith("/dashboard/user")) return role === "USER";
  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("hv_session")?.value;
  if (!token) {
    const login = new URL("/login", req.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return NextResponse.redirect(new URL(dashboardPathForRole(payload.role), req.url));
  }

  if (!roleMayAccessPath(pathname, payload.role)) {
    return NextResponse.redirect(new URL(dashboardPathForRole(payload.role), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
