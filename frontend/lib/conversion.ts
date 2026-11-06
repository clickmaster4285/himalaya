/**
 * HIM-CRO-0011: GA4 key events through GTM's dataLayer (GTM-T4KVZ7PW) and gtag, when present.
 *   whatsapp_click  { unit, link_url, page_path }
 *   call_click      { link_url, page_path }
 *   enquiry_submit  { form, page_path }
 * Mark these three as key events in GA4 and verify them in DebugView.
 */
type ConversionEvent = "whatsapp_click" | "call_click" | "enquiry_submit";

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

export function pushConversion(event: ConversionEvent, params: Record<string, string | undefined> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  const payload = { page_path: window.location.pathname, ...params };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
  if (typeof w.gtag === "function") w.gtag("event", event, payload);
}

/** The unit a WhatsApp link is about: the villa page it sits on, or the villa named in the message. */
export function unitForWhatsAppLink(href: string, pathname: string): string {
  const villa = pathname.match(/^\/villas\/([^/]+)/);
  if (villa) return villa[1];
  try {
    const text = new URL(href).searchParams.get("text") ?? "";
    const named = text.match(/(?:book|enquire about|interested in)\s+(?:the\s+)?([^\n.,]+?)(?:\s+[-–(|]|\n|$)/i);
    if (named) return named[1].trim().slice(0, 80);
  } catch {
    /* not a URL */
  }
  return "general";
}
