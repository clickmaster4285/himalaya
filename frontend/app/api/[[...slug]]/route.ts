import { NextRequest, NextResponse } from "next/server";
import { getBackendInternalUrl } from "@/lib/api/backend-url";
import { forwardSetCookie } from "@/lib/api/proxy";

type Ctx = { params: Promise<{ slug?: string[] }> };

async function proxy(req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;
  const parts = slug ?? [];
  if (parts.length === 0) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const path = parts.map((p) => encodeURIComponent(p)).join("/");
  const search = req.nextUrl.search;
  const url = `${getBackendInternalUrl()}/api/${path}${search}`;

  const cookie = req.headers.get("cookie") ?? "";
  const headers: Record<string, string> = { cookie };
  const ct = req.headers.get("content-type");
  if (ct) headers["Content-Type"] = ct;

  const method = req.method;
  let body: ArrayBuffer | undefined;
  if (method !== "GET" && method !== "HEAD") {
    const buf = await req.arrayBuffer();
    if (buf.byteLength > 0) body = buf;
  }

  const res = await fetch(url, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const resBody = await res.arrayBuffer();
  const nextRes = new NextResponse(resBody, { status: res.status });
  const outCt = res.headers.get("content-type");
  if (outCt) nextRes.headers.set("Content-Type", outCt);
  forwardSetCookie(res, nextRes);
  return nextRes;
}

export async function GET(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}
