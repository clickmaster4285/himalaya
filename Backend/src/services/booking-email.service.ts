import type { BookingApi } from "./booking.service";
import {
  buildBookingEmail,
  type BookingEmailTemplate,
} from "../templates/emails/booking-emails";
import { sendMailMessage, type MailTransportMethod } from "./mail-transport";

export type BookingEmailResult = {
  emailSent: boolean;
  to?: string;
  template?: BookingEmailTemplate;
  method?: MailTransportMethod;
  detail?: string;
};

const TEMPLATES: BookingEmailTemplate[] = ["confirmation", "pending", "cancelled"];

export function resolveGuestEmail(booking: BookingApi): string | null {
  const guest = booking.guestContactEmail?.trim().toLowerCase();
  if (guest && guest.includes("@")) return guest;
  const account = booking.user.email?.trim().toLowerCase();
  if (account && account.includes("@")) return account;
  return null;
}

export async function sendBookingEmail(
  booking: BookingApi,
  template: BookingEmailTemplate,
): Promise<BookingEmailResult> {
  if (!TEMPLATES.includes(template)) {
    return { emailSent: false, detail: "Invalid template. Use: confirmation, pending, cancelled." };
  }

  const to = resolveGuestEmail(booking);
  if (!to) {
    return {
      emailSent: false,
      detail: "No guest email on this booking. Set guestContactEmail or ensure the user account has an email.",
    };
  }

  const { subject, text, html } = buildBookingEmail(template, booking);

  try {
    const method = await sendMailMessage({
      to,
      subject,
      text,
      html,
      replyTo: process.env.INQUIRY_TO_EMAIL?.trim() || process.env.SMTP_USER?.trim(),
    });
    return { emailSent: true, to, template, method };
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    return { emailSent: false, to, template, detail };
  }
}
