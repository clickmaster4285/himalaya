import { NextRequest, NextResponse } from "next/server";
import { getBackendInternalUrl } from "@/lib/api/backend-url";
import { forwardSetCookie } from "@/lib/api/proxy";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Stream multipart uploads straight to Express — avoids buffering/truncation in the catch-all proxy. */
export async function POST(req: NextRequest) {
  const url = `${getBackendInternalUrl()}/api/upload`;
  const headers = new Headers();
  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const init: RequestInit & { duplex?: "half" } = {
    method: "POST",
    headers,
    body: req.body,
    duplex: "half",
    cache: "no-store",
  };

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (err) {
    console.error("[upload proxy]", err);
    return NextResponse.json({ error: "Upload service unavailable." }, { status: 503 });
  }

  const resBody = await res.arrayBuffer();
  const nextRes = new NextResponse(resBody, { status: res.status });
  const outCt = res.headers.get("content-type");
  if (outCt) nextRes.headers.set("Content-Type", outCt);
  forwardSetCookie(res, nextRes);
  return nextRes;
}
