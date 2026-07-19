import "server-only";

import type { BhurbanInquiryPayload } from "@/lib/bhurban-inquiry-types";
import { submitInquiryToBackend, type InquirySubmitResult } from "@/lib/submit-inquiry-server";

export type { BhurbanInquiryPayload } from "@/lib/bhurban-inquiry-types";
export type BhurbanInquirySendResult = InquirySubmitResult;

/** Save inquiry + send email via Himalaya Backend (single source of truth). */
export async function sendBhurbanInquiryEmail(
  payload: BhurbanInquiryPayload,
): Promise<BhurbanInquirySendResult> {
  return submitInquiryToBackend({
    ...payload,
    source: payload.source ?? "hotels-in-bhurban",
  });
}
