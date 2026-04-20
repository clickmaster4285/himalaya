"use client";

import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

export default function BookStayError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F6F1EA] px-6 py-14 md:px-12">
      <div className="mx-auto max-w-3xl rounded-xl border border-[#eadfce] bg-white p-8">
        <h1 className="font-display text-3xl text-neutral-900 md:text-4xl">Booking is temporarily unavailable</h1>
        <p className="mt-3 text-neutral-700">Something went wrong. Please continue your booking on WhatsApp.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="border border-neutral-300 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900 hover:bg-neutral-50"
          >
            Try again
          </button>
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-neutral-800"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

