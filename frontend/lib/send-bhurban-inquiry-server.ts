import "server-only";

import { after } from "next/server";
import type { BhurbanInquiryPayload } from "@/lib/bhurban-inquiry-types";
import { connectDb } from "@/lib/server/db";
import { InquiryM } from "@/lib/server/models/schemas";
import { sendInquiryNotificationEmail } from "@/lib/server/services/inquiry-email.service";

export type { BhurbanInquiryPayload } from "@/lib/bhurban-inquiry-types";

export type BhurbanInquirySendResult = {
  emailSent: boolean;
  saved: boolean;
  staffEmailSent?: boolean;
  guestEmailSent?: boolean;
  method?: string;
  emailDetail?: string;
  /** True when emails are still sending in the background */
  emailPending?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pick(value: unknown, max: number) {
  if (value == null) return "";
  return String(value).trim().slice(0, max);
}

type InquiryRecord = {
  fullName: string;
  email: string;
  phone: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  numberOfGuests: string | null;
  message: string | null;
  source: string;
};

/** Save inquiry, return immediately; send emails in background. */
export async function sendBhurbanInquiryEmail(
  payload: BhurbanInquiryPayload,
): Promise<BhurbanInquirySendResult> {
  await connectDb();

  const record: InquiryRecord = {
    fullName: pick(payload.fullName, 200),
    email: pick(payload.email, 320).toLowerCase(),
    phone: pick(payload.phone, 40) || null,
    checkInDate: pick(payload.checkInDate, 20) || null,
    checkOutDate: pick(payload.checkOutDate, 20) || null,
    numberOfGuests: pick(payload.numberOfGuests, 20) || null,
    message: pick(payload.message, 5000) || null,
    source: pick(payload.source, 120) || "hotels-in-bhurban",
  };

  if (!record.fullName) {
    throw new Error("Full name is required.");
  }
  if (!record.email || !EMAIL_RE.test(record.email)) {
    throw new Error("A valid email address is required.");
  }

  await InquiryM.create(record);

  after(async () => {
    try {
      const emailResult = await sendInquiryNotificationEmail(record);
      if (!emailResult.staffEmailSent) {
        console.warn("[inquiries] Staff notification NOT sent.", emailResult.detail ?? "");
      }
      if (!emailResult.guestEmailSent) {
        console.warn("[inquiries] Guest confirmation NOT sent.", emailResult.detail ?? "");
      }
    } catch (err) {
      console.error("[inquiries] background email failed:", err);
    }
  });

  return {
    emailSent: false,
    saved: true,
    emailPending: true,
  };
}

/** Blocking send (used by POST /api/inquiries when caller needs email status). */
export async function sendBhurbanInquiryEmailSync(
  payload: BhurbanInquiryPayload,
): Promise<BhurbanInquirySendResult> {
  await connectDb();

  const record: InquiryRecord = {
    fullName: pick(payload.fullName, 200),
    email: pick(payload.email, 320).toLowerCase(),
    phone: pick(payload.phone, 40) || null,
    checkInDate: pick(payload.checkInDate, 20) || null,
    checkOutDate: pick(payload.checkOutDate, 20) || null,
    numberOfGuests: pick(payload.numberOfGuests, 20) || null,
    message: pick(payload.message, 5000) || null,
    source: pick(payload.source, 120) || "hotels-in-bhurban",
  };

  if (!record.fullName) throw new Error("Full name is required.");
  if (!record.email || !EMAIL_RE.test(record.email)) {
    throw new Error("A valid email address is required.");
  }

  await InquiryM.create(record);

  const emailResult = await sendInquiryNotificationEmail(record);

  return {
    emailSent: emailResult.emailSent,
    saved: true,
    staffEmailSent: emailResult.staffEmailSent,
    guestEmailSent: emailResult.guestEmailSent,
    method: emailResult.method,
    emailDetail: emailResult.detail,
  };
}
