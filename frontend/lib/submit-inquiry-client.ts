export type InquiryPayload = {
  fullName: string;
  email: string;
  phone?: string | null;
  checkInDate?: string | null;
  checkOutDate?: string | null;
  numberOfGuests?: string | null;
  message?: string | null;
  source: string;
};

export async function submitInquiry(
  payload: InquiryPayload,
): Promise<
  | { ok: true; saved?: boolean; emailSent?: boolean; guestEmailSent?: boolean }
  | { ok: false; error: string }
> {
  let res: Response;
  try {
    res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    };
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    return {
      ok: false,
      error:
        typeof data.error === "string"
          ? data.error
          : res.status === 503
            ? "Server is offline. Please try again in a moment or contact us on WhatsApp."
            : "Could not send inquiry. Please try again.",
    };
  }

  return {
    ok: true,
    saved: Boolean(data.saved),
    emailSent: Boolean(data.emailSent),
    guestEmailSent: Boolean(data.guestEmailSent),
  };
}
