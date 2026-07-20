type TrackPayload = {
  eventType: string;
  page?: string;
  elementId?: string;
  elementText?: string;
  metadata?: Record<string, unknown>;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.BACKEND_INTERNAL_URL ??
  (typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:5051");

function getOrCreateSessionId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const existing = window.sessionStorage.getItem("himalaya_session_id");
    if (existing) return existing;

    const generated =
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    window.sessionStorage.setItem("himalaya_session_id", generated);
    return generated;
  } catch {
    return null;
  }
}

export async function trackEvent({
  eventType,
  page,
  elementId,
  elementText,
  metadata,
}: TrackPayload) {
    
console.log("Tracking payload:", {
      eventType,
      page,
      elementId,
      elementText,
      metadata,
    });

  try {
    const cookieSessionId =
      typeof document !== "undefined"
        ? document.cookie
            .split(";")
            .map((item) => item.trim())
            .find((item) => item.startsWith("hv_session="))
            ?.slice("hv_session=".length) || null
        : null;

    const sessionId = cookieSessionId ?? getOrCreateSessionId();

    const response = await fetch(`${API_BASE_URL}/api/activity`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        page,
        elementId,
        elementText,
        metadata,
        sessionId,
      }),
      keepalive: true,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("Tracking error:", response.status, errorText);
    }
  } catch (error) {
    console.error("Tracking error:", error);
  }
}



