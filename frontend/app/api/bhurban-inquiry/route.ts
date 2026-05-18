import { NextResponse } from "next/server";
import { sendBhurbanInquiryEmail, type BhurbanInquiryPayload } from "@/lib/send-bhurban-inquiry-server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pickString(value: unknown, max = 2000) {
  if (value == null) return "";
  return String(value).trim().slice(0, max);
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
    const source = pickString(body.source, 120) || "hotels-in-bhurban";

    if (!fullName) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const payload: BhurbanInquiryPayload = {
      fullName,
      email,
      phone: phone || undefined,
      checkInDate: checkInDate || undefined,
      checkOutDate: checkOutDate || undefined,
      numberOfGuests: numberOfGuests || undefined,
      message: message || undefined,
      source,
    };

    const result = await sendBhurbanInquiryEmail(payload);

    return NextResponse.json({
      ok: true,
      emailSent: result.emailSent,
      saved: result.saved,
      staffEmailSent: result.staffEmailSent,
      guestEmailSent: result.guestEmailSent,
      method: result.method,
      emailDetail: result.emailDetail,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";
    console.error("[bhurban-inquiry]", message);

    const isBackendDown =
      message.includes("unavailable") ||
      message.includes("fetch failed") ||
      message.includes("ECONNREFUSED");

    return NextResponse.json(
      {
        error: isBackendDown
          ? "API server is offline. Run npm run dev from the project folder (starts frontend + backend), then try again."
          : message || "Could not submit inquiry. Use WhatsApp below.",
      },
      { status: isBackendDown ? 503 : 500 }
    );
  }
}
