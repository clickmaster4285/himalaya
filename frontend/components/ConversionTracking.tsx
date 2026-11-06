"use client";

import { useEffect } from "react";
import { pushConversion, unitForWhatsAppLink } from "@/lib/conversion";

/** One document-level listener, so every WhatsApp and phone link is measured without per-button code. */
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.href;
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) {
        pushConversion("whatsapp_click", {
          unit: anchor.dataset.unit || unitForWhatsAppLink(href, window.location.pathname),
          link_url: href,
        });
      } else if (href.startsWith("tel:")) {
        pushConversion("call_click", { link_url: href });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
