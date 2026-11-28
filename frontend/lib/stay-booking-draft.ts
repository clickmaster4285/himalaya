export type StayBookingDraft = {
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  showCheckout?: boolean;
  guestDetails?: Record<string, string>;
  termsAccepted?: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every((item) => typeof item === "string");
}

function isStayBookingDraft(value: unknown): value is StayBookingDraft {
  if (!isRecord(value)) return false;
  return (
    (!("checkIn" in value) || typeof value.checkIn === "string") &&
    (!("checkOut" in value) || typeof value.checkOut === "string") &&
    (!("adults" in value) || typeof value.adults === "string") &&
    (!("children" in value) || typeof value.children === "string") &&
    (!("showCheckout" in value) || typeof value.showCheckout === "boolean") &&
    (!("guestDetails" in value) || isStringRecord(value.guestDetails)) &&
    (!("termsAccepted" in value) || typeof value.termsAccepted === "boolean")
  );
}

function getStorageKey(villaSlug: string): string {
  return `himalaya-stay-booking:${villaSlug}`;
}

export function readStayBookingDraft(villaSlug: string): StayBookingDraft | null {
  try {
    const stored = window.sessionStorage.getItem(getStorageKey(villaSlug));
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    if (isStayBookingDraft(parsed)) return parsed;

    console.error("[stay-booking-draft] Stored booking draft has an invalid shape.");
    window.sessionStorage.removeItem(getStorageKey(villaSlug));
    return null;
  } catch (error) {
    console.error("[stay-booking-draft] Could not read the booking draft.", error);
    return null;
  }
}

export function saveStayBookingDraft(villaSlug: string, draft: StayBookingDraft): boolean {
  try {
    window.sessionStorage.setItem(getStorageKey(villaSlug), JSON.stringify(draft));
    return true;
  } catch (error) {
    console.error("[stay-booking-draft] Could not save the booking draft.", error);
    return false;
  }
}

export function clearStayBookingDraft(villaSlug: string): boolean {
  try {
    window.sessionStorage.removeItem(getStorageKey(villaSlug));
    return true;
  } catch (error) {
    console.error("[stay-booking-draft] Could not clear the booking draft.", error);
    return false;
  }
}
