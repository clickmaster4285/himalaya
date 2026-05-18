import type { BookingApi } from "../../services/booking.service";
import { escapeHtml, wrapEmailHtml } from "./layout";

export type BookingEmailTemplate = "confirmation" | "pending" | "cancelled";

export type BookingEmailContent = {
  subject: string;
  text: string;
  html: string;
};

function guestDisplayName(booking: BookingApi): string {
  const first = booking.guestFirstName?.trim();
  const last = booking.guestLastName?.trim();
  if (first || last) return [first, last].filter(Boolean).join(" ");
  return booking.user.fullName;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-PK", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatMoney(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

function bookingDetailsRows(booking: BookingApi): string {
  const rows: Array<[string, string]> = [
    ["Reference", booking.reference],
    ["Experience", booking.experienceType],
    ["Package", booking.packageName],
    ["Check-in / date", formatDate(booking.bookingDate)],
  ];

  if (booking.checkOutDate) {
    rows.push(["Check-out", formatDate(booking.checkOutDate)]);
  }
  if (booking.villaSlug) {
    rows.push(["Villa", booking.villaSlug.replace(/-/g, " ")]);
  }
  if (booking.adults != null) {
    const guests = booking.children
      ? `${booking.adults} adult(s), ${booking.children} child(ren)`
      : `${booking.adults} guest(s)`;
    rows.push(["Guests", guests]);
  }
  rows.push(["Total", formatMoney(booking.totalAmount)]);
  rows.push(["Status", booking.status]);

  return rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 0;color:#6b5d4f;font-size:14px;vertical-align:top;width:38%;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#2c2419;font-size:14px;"><strong>${escapeHtml(value)}</strong></td>
        </tr>`,
    )
    .join("");
}

function bookingDetailsText(booking: BookingApi): string {
  const lines = [
    `Reference: ${booking.reference}`,
    `Experience: ${booking.experienceType}`,
    `Package: ${booking.packageName}`,
    `Date: ${formatDate(booking.bookingDate)}`,
  ];
  if (booking.checkOutDate) lines.push(`Check-out: ${formatDate(booking.checkOutDate)}`);
  if (booking.villaSlug) lines.push(`Villa: ${booking.villaSlug}`);
  lines.push(`Total: ${formatMoney(booking.totalAmount)}`);
  lines.push(`Status: ${booking.status}`);
  return lines.join("\n");
}

function detailsBlock(booking: BookingApi): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;background:#f9f6f1;border-radius:8px;padding:4px 16px;">
    ${bookingDetailsRows(booking)}
  </table>`;
}

export function buildBookingEmail(
  template: BookingEmailTemplate,
  booking: BookingApi,
): BookingEmailContent {
  const name = guestDisplayName(booking);
  const siteUrl = (process.env.PUBLIC_SITE_URL ?? "https://himalayavillas.com").replace(/\/$/, "");

  if (template === "confirmation") {
    const subject = `Congratulations — your booking is confirmed | ${booking.reference}`;
    const intro =
      `Dear ${name},\n\n` +
      `Congratulations from Himalaya Villas! We are delighted to confirm your reservation. ` +
      `The hills of Bhurban await you.\n\n` +
      bookingDetailsText(booking) +
      `\n\nIf you have any questions, simply reply to this email.\n\n` +
      `Warm regards,\nThe Himalaya Villas Team`;

    const bodyHtml = `
      <p style="margin:0 0 16px;">Dear <strong>${escapeHtml(name)}</strong>,</p>
      <p style="margin:0 0 16px;">
        <strong>Congratulations from Himalaya Villas!</strong> We are delighted to confirm your reservation.
        Your mountain retreat is officially on our calendar.
      </p>
      ${detailsBlock(booking)}
      <p style="margin:0 0 16px;">
        We look forward to welcoming you. If you need to update your plans or have special requests,
        reply to this email and our team will assist you.
      </p>
      <p style="margin:24px 0 0;">
        <a href="${escapeHtml(siteUrl)}" style="display:inline-block;background:#1a3d2e;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:15px;">Visit our website</a>
      </p>
      <p style="margin:24px 0 0;color:#6b5d4f;">Warm regards,<br /><strong>The Himalaya Villas Team</strong></p>`;

    return {
      subject,
      text: intro,
      html: wrapEmailHtml("Booking confirmed", bodyHtml),
    };
  }

  if (template === "pending") {
    const subject = `We received your booking | ${booking.reference}`;
    const intro =
      `Dear ${name},\n\n` +
      `Thank you for choosing Himalaya Villas. We have received your booking request and it is currently pending confirmation.\n\n` +
      bookingDetailsText(booking) +
      `\n\nOur team will review your request and send a confirmation email shortly.\n\n` +
      `Warm regards,\nThe Himalaya Villas Team`;

    const bodyHtml = `
      <p style="margin:0 0 16px;">Dear <strong>${escapeHtml(name)}</strong>,</p>
      <p style="margin:0 0 16px;">
        Thank you for choosing <strong>Himalaya Villas</strong>. We have received your booking request
        and it is <strong>pending confirmation</strong>.
      </p>
      ${detailsBlock(booking)}
      <p style="margin:0 0 16px;">
        Our reservations team will review your details and email you once your booking is confirmed.
      </p>
      <p style="margin:24px 0 0;color:#6b5d4f;">Warm regards,<br /><strong>The Himalaya Villas Team</strong></p>`;

    return {
      subject,
      text: intro,
      html: wrapEmailHtml("Booking received", bodyHtml),
    };
  }

  const subject = `Booking update — ${booking.reference}`;
  const intro =
    `Dear ${name},\n\n` +
    `We are writing regarding your reservation with Himalaya Villas. This booking has been marked as cancelled.\n\n` +
    bookingDetailsText(booking) +
    `\n\nIf this was unexpected or you would like to rebook, please contact us.\n\n` +
    `Warm regards,\nThe Himalaya Villas Team`;

  const bodyHtml = `
    <p style="margin:0 0 16px;">Dear <strong>${escapeHtml(name)}</strong>,</p>
    <p style="margin:0 0 16px;">
      We are writing regarding your reservation with Himalaya Villas.
      This booking has been marked as <strong>cancelled</strong>.
    </p>
    ${detailsBlock(booking)}
    <p style="margin:0 0 16px;">
      If you believe this is a mistake or would like to make a new reservation, please reply to this email.
    </p>
    <p style="margin:24px 0 0;color:#6b5d4f;">Warm regards,<br /><strong>The Himalaya Villas Team</strong></p>`;

  return {
    subject,
    text: intro,
    html: wrapEmailHtml("Booking cancelled", bodyHtml),
  };
}
