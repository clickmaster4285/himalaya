import type { InquiryEmailPayload } from "@/lib/server/services/inquiry-email.types";
import { escapeHtml, wrapEmailHtml } from "@/lib/server/templates/emails/layout";

function formatDateLabel(value: string | null | undefined): string {
  if (!value?.trim()) return "—";
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" });
  }
  return value;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;color:#6b5d4f;font-size:14px;vertical-align:top;width:36%;border-bottom:1px solid #ebe6df;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;color:#2c2419;font-size:14px;border-bottom:1px solid #ebe6df;"><strong>${escapeHtml(value)}</strong></td>
  </tr>`;
}

/** Email to owner/staff with every field from the inquiry form. */
export function buildInquiryStaffNotificationEmail(payload: InquiryEmailPayload) {
  const submittedAt = new Date().toLocaleString("en-PK", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const source = payload.source ?? "hotels-in-bhurban";
  const name = payload.fullName.trim();

  const subject = `New inquiry: ${name} — ${source}`;

  const text = [
    "NEW WEBSITE INQUIRY — Himalaya Villas",
    "========================================",
    "",
    `Full name:     ${name}`,
    `Email:         ${payload.email}`,
    `Phone:         ${payload.phone || "—"}`,
    `Check-in:      ${formatDateLabel(payload.checkInDate)}`,
    `Check-out:     ${formatDateLabel(payload.checkOutDate)}`,
    `Guests:        ${payload.numberOfGuests || "—"}`,
    "",
    "Message:",
    payload.message || "(no message)",
    "",
    `Source page:   ${source}`,
    `Submitted:     ${submittedAt}`,
    "",
    `Reply to guest: ${payload.email}`,
  ].join("\n");

  const messageHtml = payload.message?.trim()
    ? escapeHtml(payload.message.trim()).replace(/\n/g, "<br />")
    : "<em style='color:#6b5d4f;'>(no message)</em>";

  const bodyHtml = `
    <p style="margin:0 0 8px;font-size:13px;color:#6b5d4f;text-transform:uppercase;letter-spacing:0.08em;">New form submission</p>
    <p style="margin:0 0 20px;font-size:18px;color:#1a3d2e;">
      Someone submitted the <strong>inquiry / booking form</strong> on your website.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;background:#f9f6f1;border-radius:8px;padding:8px 20px;">
      ${row("Full name", name)}
      ${row("Email", payload.email)}
      ${row("Phone", payload.phone?.trim() || "—")}
      ${row("Check-in", formatDateLabel(payload.checkInDate))}
      ${row("Check-out", formatDateLabel(payload.checkOutDate))}
      ${row("Guests", payload.numberOfGuests?.trim() || "—")}
      ${row("Source", source)}
      ${row("Submitted", submittedAt)}
    </table>
    <p style="margin:0 0 8px;font-size:14px;color:#6b5d4f;font-weight:600;">Guest message</p>
    <div style="margin:0 0 24px;padding:16px;background:#fff;border:1px solid #ebe6df;border-radius:8px;font-size:15px;line-height:1.6;color:#2c2419;">
      ${messageHtml}
    </div>
    <p style="margin:0;">
      <a href="mailto:${escapeHtml(payload.email)}?subject=${encodeURIComponent("Re: Your Himalaya Villas inquiry")}" 
         style="display:inline-block;background:#1a3d2e;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:15px;">
        Reply to ${escapeHtml(name)}
      </a>
    </p>`;

  return {
    subject,
    text,
    html: wrapEmailHtml("New inquiry received", bodyHtml),
  };
}
