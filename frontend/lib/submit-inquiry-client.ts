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

export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      ok: false,
      error: typeof data.error === "string" ? data.error : "Could not send inquiry. Please try again.",
    };
  }
  return { ok: true };
}
