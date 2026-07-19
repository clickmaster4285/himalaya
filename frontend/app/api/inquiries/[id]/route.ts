import { NextRequest, NextResponse } from "next/server";
import { getBackendInternalUrl } from "@/lib/api/backend-url";
import { forwardSetCookie } from "@/lib/api/proxy";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const url = `${getBackendInternalUrl()}/api/inquiries/${encodeURIComponent(id)}`;
  const cookie = req.headers.get("cookie") ?? "";
  const res = await fetch(url, { method: "DELETE", headers: { cookie }, cache: "no-store" });
  const body = await res.text();
  const nextRes = new NextResponse(body, { status: res.status });
  const ct = res.headers.get("content-type");
  if (ct) nextRes.headers.set("Content-Type", ct);
  forwardSetCookie(res, nextRes);
  return nextRes;
}
