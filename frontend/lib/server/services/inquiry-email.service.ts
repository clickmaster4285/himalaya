import type { InquiryEmailPayload, InquiryEmailResult } from "@/lib/server/services/inquiry-email.types";
import { sendMailMessage } from "./mail-transport";
import { buildInquiryConfirmationEmail } from "@/lib/server/templates/emails/inquiry-confirmation";
import { buildInquiryStaffNotificationEmail } from "@/lib/server/templates/emails/inquiry-staff-notification";

export type { InquiryEmailPayload, InquiryEmailResult } from "@/lib/server/services/inquiry-email.types";

/** Inbox(es) that receive new inquiry alerts — set INQUIRY_TO_EMAIL in .env.local */
export function getInquiryNotifyEmails(): string[] {
  const raw =
    process.env.INQUIRY_TO_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "himalayavillas@gmail.com";
  return [...new Set(raw.split(/[,;]/).map((e) => e.trim().toLowerCase()).filter(Boolean))];
}

/** Staff + guest emails in parallel (one shared SMTP connection pool). */
export async function sendInquiryNotificationEmail(
  payload: InquiryEmailPayload,
): Promise<InquiryEmailResult> {
  const staffRecipients = getInquiryNotifyEmails();
  const staffMail = buildInquiryStaffNotificationEmail(payload);
  const guestMail = buildInquiryConfirmationEmail(payload);

  let method: InquiryEmailResult["method"];
  let staffSent = false;
  let guestSent = false;
  const errors: string[] = [];

  const tasks: Promise<void>[] = [];

  for (const to of staffRecipients) {
    tasks.push(
      sendMailMessage({
        to,
        subject: staffMail.subject,
        text: staffMail.text,
        html: staffMail.html,
        replyTo: payload.email,
      })
        .then((m) => {
          method = m;
          staffSent = true;
          console.info(`[inquiries] Staff notification sent → ${to}`);
        })
        .catch((e) => {
          errors.push(`staff(${to}): ${e instanceof Error ? e.message : e}`);
          console.error(`[inquiries] Staff email failed for ${to}:`, e);
        }),
    );
  }

  tasks.push(
    sendMailMessage({
      to: payload.email,
      subject: guestMail.subject,
      text: guestMail.text,
      html: guestMail.html,
    })
      .then((m) => {
        method = m;
        guestSent = true;
        console.info(`[inquiries] Guest confirmation sent → ${payload.email}`);
      })
      .catch((e) => {
        errors.push(`guest: ${e instanceof Error ? e.message : e}`);
        console.error("[inquiries] Guest email failed:", e);
      }),
  );

  await Promise.all(tasks);

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
