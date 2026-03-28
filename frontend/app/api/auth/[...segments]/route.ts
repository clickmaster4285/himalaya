import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");

function forwardSetCookie(from: Response, to: NextResponse) {
  const headers = from.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof headers.getSetCookie === "function") {
    for (const c of headers.getSetCookie()) {
      to.headers.append("Set-Cookie", c);
    }
    return;
  }
  const single = from.headers.get("set-cookie");
  if (single) {
    to.headers.append("Set-Cookie", single);
  }
}

type RouteCtx = { params: Promise<{ segments: string[] }> };

export async function GET(req: NextRequest, ctx: RouteCtx) {
  const { segments } = await ctx.params;
  const path = segments?.join("/") ?? "";
  if (path !== "me") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const url = `${BACKEND}/api/auth/me`;
  const cookie = req.headers.get("cookie") ?? "";
  const res = await fetch(url, { headers: { cookie }, cache: "no-store" });
  const body = await res.text();
  const nextRes = new NextResponse(body, { status: res.status });
  const ct = res.headers.get("content-type");
  if (ct) nextRes.headers.set("Content-Type", ct);
  forwardSetCookie(res, nextRes);
  return nextRes;
}

export async function POST(req: NextRequest, ctx: RouteCtx) {
  const { segments } = await ctx.params;
  const path = segments?.join("/") ?? "";
  if (!["login", "register", "logout"].includes(path)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const url = `${BACKEND}/api/auth/${path}`;
  const cookie = req.headers.get("cookie") ?? "";
  const body = await req.text();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("content-type") ?? "application/json",
      cookie,
    },
    body,
    cache: "no-store",
  });
  const resBody = await res.text();
  const nextRes = new NextResponse(resBody, { status: res.status });
  const ct = res.headers.get("content-type");
  if (ct) nextRes.headers.set("Content-Type", ct);
  forwardSetCookie(res, nextRes);
  return nextRes;
}
