import { NextRequest, NextResponse } from "next/server";
import { getBackendInternalUrl } from "@/lib/api/backend-url";
import { forwardSetCookie } from "@/lib/api/proxy";
import { submitInquiryToBackend } from "@/lib/submit-inquiry-server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pickString(value: unknown, max = 2000) {
  if (value == null) return "";
  return String(value).trim().slice(0, max);
}

export async function GET(req: NextRequest) {
  const url = `${getBackendInternalUrl()}/api/activity/get-all`;
  const cookie = req.headers.get("cookie") ?? "";
  const res = await fetch(url, { headers: { cookie }, cache: "no-store" });
  const body = await res.text();
  const nextRes = new NextResponse(body, { status: res.status });
  const ct = res.headers.get("content-type");
  if (ct) nextRes.headers.set("Content-Type", ct);
  forwardSetCookie(res, nextRes);
  return nextRes;
}

