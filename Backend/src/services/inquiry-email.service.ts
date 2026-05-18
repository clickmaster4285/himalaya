import type { InquiryEmailPayload, InquiryEmailResult } from "./inquiry-email.types";
import { sendMailMessage } from "./mail-transport";
import { buildInquiryConfirmationEmail } from "../templates/emails/inquiry-confirmation";
import { buildInquiryStaffNotificationEmail } from "../templates/emails/inquiry-staff-notification";

export type { InquiryEmailPayload, InquiryEmailResult } from "./inquiry-email.types";

/** Inbox(es) that receive new inquiry alerts — set INQUIRY_TO_EMAIL in backend/.env */
export function getInquiryNotifyEmails(): string[] {
  const raw =
    process.env.INQUIRY_TO_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "himalayavillas@gmail.com";
  return [...new Set(raw.split(/[,;]/).map((e) => e.trim().toLowerCase()).filter(Boolean))];
}

/** 1) Email to you with full form details  2) Confirmation to guest */
export async function sendInquiryNotificationEmail(
  payload: InquiryEmailPayload,
): Promise<InquiryEmailResult> {
  const staffRecipients = getInquiryNotifyEmails();
  const staffMail = buildInquiryStaffNotificationEmail(payload);

  let method: InquiryEmailResult["method"];
  let staffSent = false;
  let guestSent = false;
  const errors: string[] = [];

  // Staff notification first (your inbox)
  for (const to of staffRecipients) {
    try {
      method = await sendMailMessage({
        to,
        subject: staffMail.subject,
        text: staffMail.text,
        html: staffMail.html,
        replyTo: payload.email,
      });
      staffSent = true;
      console.info(`[inquiries] Staff notification sent → ${to}`);
    } catch (e) {
      errors.push(`staff(${to}): ${e instanceof Error ? e.message : e}`);
      console.error(`[inquiries] Staff email failed for ${to}:`, e);
    }
  }

  // Guest confirmation
  try {
    const guestMail = buildInquiryConfirmationEmail(payload);
    await sendMailMessage({
      to: payload.email,
      subject: guestMail.subject,
      text: guestMail.text,
      html: guestMail.html,
    });
    guestSent = true;
    console.info(`[inquiries] Guest confirmation sent → ${payload.email}`);
  } catch (e) {
    errors.push(`guest: ${e instanceof Error ? e.message : e}`);
    console.error("[inquiries] Guest email failed:", e);
  }

  const emailSent = staffSent || guestSent;
  const detail = errors.length ? errors.join(" | ") : undefined;

  return {
    emailSent,
    staffEmailSent: staffSent,
    guestEmailSent: guestSent,
    method,
    detail,
  };
}
