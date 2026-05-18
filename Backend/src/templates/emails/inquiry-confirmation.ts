import type { InquiryEmailPayload } from "../../services/inquiry-email.types";
import { escapeHtml, wrapEmailHtml } from "./layout";

function formatDateLabel(value: string | null | undefined): string {
  if (!value?.trim()) return "—";
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });
  }
  return value;
}

export function buildInquiryConfirmationEmail(payload: InquiryEmailPayload) {
  const siteUrl = (process.env.PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const name = payload.fullName.trim();

  const subject = "Thank you — we received your inquiry | Himalaya Villas Bhurban";

  const text = [
    `Dear ${name},`,
    "",
    "Thank you for contacting Himalaya Villas. We have received your inquiry for a luxury stay in Bhurban.",
    "",
    "Your details:",
    `Check-in: ${formatDateLabel(payload.checkInDate)}`,
    `Check-out: ${formatDateLabel(payload.checkOutDate)}`,
    `Guests: ${payload.numberOfGuests || "—"}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    "",
    "Our team will review your request and reply to this email shortly with availability and rates.",
    "",
    `Visit us: ${siteUrl}`,
    "",
    "Warm regards,",
    "The Himalaya Villas Team",
    "Bhurban, Murree Hills, Pakistan",
  ]
    .filter(Boolean)
    .join("\n");

  const bodyHtml = `
    <p style="margin:0 0 16px;">Dear <strong>${escapeHtml(name)}</strong>,</p>
    <p style="margin:0 0 16px;">
      <strong>Thank you for contacting Himalaya Villas.</strong> We have received your inquiry for a
      private luxury stay in Bhurban, Murree — and our reservations team will be in touch soon.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;background:#f9f6f1;border-radius:8px;padding:4px 16px;">
      <tr>
        <td style="padding:8px 0;color:#6b5d4f;font-size:14px;width:38%;">Check-in</td>
        <td style="padding:8px 0;color:#2c2419;font-size:14px;"><strong>${escapeHtml(formatDateLabel(payload.checkInDate))}</strong></td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b5d4f;font-size:14px;">Check-out</td>
        <td style="padding:8px 0;color:#2c2419;font-size:14px;"><strong>${escapeHtml(formatDateLabel(payload.checkOutDate))}</strong></td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b5d4f;font-size:14px;">Guests</td>
        <td style="padding:8px 0;color:#2c2419;font-size:14px;"><strong>${escapeHtml(payload.numberOfGuests || "—")}</strong></td>
      </tr>
      ${
        payload.phone
          ? `<tr>
        <td style="padding:8px 0;color:#6b5d4f;font-size:14px;">Phone</td>
        <td style="padding:8px 0;color:#2c2419;font-size:14px;"><strong>${escapeHtml(payload.phone)}</strong></td>
      </tr>`
          : ""
      }
    </table>
    ${
      payload.message
        ? `<p style="margin:0 0 16px;color:#6b5d4f;font-size:14px;"><em>Your message:</em><br />${escapeHtml(payload.message)}</p>`
        : ""
    }
    <p style="margin:0 0 16px;">
      We typically respond within a few hours during business hours. For urgent bookings, reply to this email
      or message us on WhatsApp.
    </p>
    <p style="margin:24px 0 0;">
      <a href="${escapeHtml(siteUrl)}/hotels-in-bhurban" style="display:inline-block;background:#1a3d2e;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:15px;">View Bhurban villas</a>
    </p>
    <p style="margin:24px 0 0;color:#6b5d4f;">Warm regards,<br /><strong>The Himalaya Villas Team</strong></p>`;

  return {
    subject,
    text,
    html: wrapEmailHtml("Inquiry received", bodyHtml),
  };
}
