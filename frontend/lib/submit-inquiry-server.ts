import "server-only";

import { getBackendInternalUrl } from "@/lib/api/backend-url";

export type InquiryServerPayload = {
  fullName: string;
  email: string;
  phone?: string | null;
  checkInDate?: string | null;
  checkOutDate?: string | null;
  numberOfGuests?: string | null;
  message?: string | null;
  source: string;
  status?: string;
};

export type InquirySubmitResult = {
  emailSent: boolean;
  saved: boolean;
  staffEmailSent?: boolean;
  guestEmailSent?: boolean;
  method?: string;
  emailDetail?: string;
  id?: string;
};

function backendUnavailableMessage() {
  return "Booking server is offline. From the project root run: npm run dev (or npm run dev:backend), then try again.";
}

/** Save inquiry + send email via Himalaya Backend (single source of truth). */
export async function submitInquiryToBackend(
  payload: InquiryServerPayload,
): Promise<InquirySubmitResult> {
  const backend = getBackendInternalUrl();

  let res: Response;
  try {
    res = await fetch(`${backend}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(backendUnavailableMessage());
  }

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    id?: string;
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
          ? backendUnavailableMessage()
          : `Inquiry failed (${res.status})`),
    );
  }

  return {
    emailSent: Boolean(data.emailSent),
    saved: Boolean(data.saved ?? true),
    staffEmailSent: Boolean(data.staffEmailSent),
    guestEmailSent: Boolean(data.guestEmailSent),
    method: data.method,
    emailDetail: data.emailDetail,
    id: data.id,
  };
}
