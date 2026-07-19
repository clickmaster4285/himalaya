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
  const url = `${getBackendInternalUrl()}/api/inquiries`;
  const cookie = req.headers.get("cookie") ?? "";
  const res = await fetch(url, { headers: { cookie }, cache: "no-store" });
  const body = await res.text();
  const nextRes = new NextResponse(body, { status: res.status });
  const ct = res.headers.get("content-type");
  if (ct) nextRes.headers.set("Content-Type", ct);
  forwardSetCookie(res, nextRes);
  return nextRes;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = pickString(body.fullName, 200);
    const email = pickString(body.email, 320).toLowerCase();
    const phone = pickString(body.phone, 40);
    const checkInDate = pickString(body.checkInDate, 20);
    const checkOutDate = pickString(body.checkOutDate, 20);
    const numberOfGuests = pickString(body.numberOfGuests, 20);
    const message = pickString(body.message, 5000);
    const source = pickString(body.source, 120) || "website";

    if (!fullName) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const result = await submitInquiryToBackend({
      fullName,
      email,
      phone: phone || null,
      checkInDate: checkInDate || null,
      checkOutDate: checkOutDate || null,
      numberOfGuests: numberOfGuests || null,
      message: message || null,
      source,
    });

    return NextResponse.json({
      ok: true,
      id: result.id,
      saved: result.saved,
      emailSent: result.emailSent,
      staffEmailSent: result.staffEmailSent,
      guestEmailSent: result.guestEmailSent,
      method: result.method,
      emailDetail: result.emailDetail,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not submit inquiry.";
    console.error("[api/inquiries POST]", message);

    const isBackendDown =
      message.includes("offline") ||
      message.includes("fetch failed") ||
      message.includes("ECONNREFUSED");

    return NextResponse.json(
      { error: message },
      { status: isBackendDown ? 503 : 500 },
    );
  }
}
