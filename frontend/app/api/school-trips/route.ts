import { NextResponse } from "next/server";
import { submitInquiryToBackend } from "@/lib/submit-inquiry-server";

/** /school-trips inquiry form → same Backend inquiry pipeline as the other site forms
 *  (saved to the Inquiry collection, staff notification e-mail, guest confirmation when an e-mail is given). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function s(value: unknown, max = 600) {
  return value == null ? "" : String(value).trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    if (s(body.website)) return NextResponse.json({ ok: true }); // honeypot

    const school = s(body.school, 120);
    const contact = s(body.contact, 80);
    const designation = s(body.designation, 60);
    const city = s(body.city, 60);
    const phone = s(body.phone, 40);
    const students = s(body.students, 6);
    const teachers = s(body.teachers, 6);
    const date = s(body.date, 20);
    const type = s(body.type, 80);
    const email = s(body.email, 120).toLowerCase();
    const notes = s(body.notes, 600);

    if (!school || !contact || !city || !phone || !students || !teachers || !date || !type) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const utm = Object.entries(body)
      .filter(([k]) => k.startsWith("utm_"))
      .map(([k, v]) => `${k}: ${s(v, 120)}`);

    const message = [
      "SCHOOL TRIP INQUIRY",
      `Institution: ${school}`,
      `Contact: ${contact}${designation ? ` (${designation})` : ""}`,
      `City: ${city}`,
      `WhatsApp: ${phone}`,
      `Students: ${students} · Teachers: ${teachers}`,
      `Preferred date: ${date}`,
      `Trip type: ${type}`,
      notes ? `Requirements: ${notes}` : "",
      utm.length ? `\n${utm.join("\n")}` : "",
      `Placement: ${s(body.placement, 40) || "form"}`,
      `Page: ${s(body.page, 300)}`,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitInquiryToBackend({
      fullName: `${contact} — ${school}`.slice(0, 200),
      email,
      phone,
      checkInDate: date,
      numberOfGuests: `${students} + ${teachers} staff`.slice(0, 20),
      message,
      source: "school-trips",
    });

    return NextResponse.json({ ok: true, saved: result.saved, staffEmailSent: result.staffEmailSent });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";
    console.error("[school-trips]", message);
    return NextResponse.json({ error: "Could not submit inquiry." }, { status: 500 });
  }
}
