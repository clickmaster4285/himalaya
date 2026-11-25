"use client";
// app/erp-preview/ErpPreviewBridge.tsx
// Talks to the ERP page editor that frames /erp-preview. Tells it the preview
// is ready, and on "erp-preview:refresh" re-renders the draft in place
// (router.refresh keeps scroll position and client state), then replies
// "erp-preview:refreshed". The ERP reloads the iframe itself if no reply comes
// within 3 s, so this is an optimization: it must never throw. Renders nothing.
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";

type Reply = { source: MessageEventSource; origin: string };

function send(target: MessageEventSource | Window | null | undefined, type: string, origin: string) {
  try {
    (target as Window | null)?.postMessage({ type }, origin);
  } catch {
    // Detached window or bad origin: the ERP falls back to reloading the iframe.
  }
}

export default function ErpPreviewBridge({ origins }: { origins: string[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const waiting = useRef<Reply[]>([]);
  const allowed = origins.join(",");

  useEffect(() => {
    const list = allowed ? allowed.split(",") : [];
    try {
      if (window.parent && window.parent !== window) {
        for (const origin of list) send(window.parent, "erp-preview:ready", origin);
      }
    } catch {
      // ignore
    }

    const onMessage = (event: MessageEvent) => {
      try {
        if (!list.includes(event.origin)) return;
        const data = event.data as { type?: unknown } | null;
        if (!data || typeof data !== "object" || data.type !== "erp-preview:refresh" || !event.source) return;
        waiting.current.push({ source: event.source, origin: event.origin });
        startTransition(() => router.refresh());
      } catch {
        // ignore
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [allowed, router]);

  // The transition ends once the refreshed server render is committed.
  useEffect(() => {
    if (isPending || waiting.current.length === 0) return;
    const replies = waiting.current;
    waiting.current = [];
    for (const { source, origin } of replies) send(source, "erp-preview:refreshed", origin);
  }, [isPending]);

  return null;
}
