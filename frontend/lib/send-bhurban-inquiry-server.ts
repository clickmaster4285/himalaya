import "server-only";

import type { BhurbanInquiryPayload } from "@/lib/bhurban-inquiry-types";
import { getBackendInternalUrl } from "@/lib/api/backend-url";

export type { BhurbanInquiryPayload } from "@/lib/bhurban-inquiry-types";

export type BhurbanInquirySendResult = {
  emailSent: boolean;
  saved: boolean;
  staffEmailSent?: boolean;
  guestEmailSent?: boolean;
  method?: string;
  emailDetail?: string;
};

/** Save inquiry + send email via Himalaya Backend (single source of truth). */
export async function sendBhurbanInquiryEmail(
  payload: BhurbanInquiryPayload
): Promise<BhurbanInquirySendResult> {
  const backend = getBackendInternalUrl();

  const res = await fetch(`${backend}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    saved?: boolean;
    emailSent?: boolean;
    staffEmailSent?: boolean;
    guestEmailSent?: boolean;
    method?: string;
    emailDetail?: string;
  };

  if (!res.ok || !data.ok) {
    throw new Error(
      data.error ??
        (res.status === 503 || res.status >= 500
          ? "Booking server is offline. From the project root run: npm run dev:backend (or npm run dev). You can also use WhatsApp below."
          : `Inquiry failed (${res.status})`)
    );
  }

  return {
    emailSent: Boolean(data.emailSent),
    saved: Boolean(data.saved ?? true),
    staffEmailSent: Boolean(data.staffEmailSent),
    guestEmailSent: Boolean(data.guestEmailSent),
    method: data.method,
    emailDetail: data.emailDetail,
  };
}
