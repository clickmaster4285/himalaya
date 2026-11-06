import Link from "next/link";

/**
 * HIM-CRO-0011: the price basis, booking process and cancellation terms, visible next to every
 * booking CTA. Terms mirror /refund-policy and /terms-and-conditions; update all three together.
 */
export const BOOKING_TERMS = {
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  cancellation: [
    "Free cancellation 7 or more days before check-in.",
    "50% refund for cancellations 3 to 6 days before check-in.",
    "No refund for cancellations less than 3 days before check-in, or for a no-show.",
  ],
  process: [
    "Send your dates, guest count and the villa you want on WhatsApp.",
    "The reservations team replies with availability, the final rate and the booking amount.",
    "Your dates are held once the booking amount is received and the team confirms in writing.",
  ],
} as const;

export function BookingTermsCompact({ className = "" }: { className?: string }) {
  return (
    <div className={`text-[13px] leading-relaxed text-gray-600 ${className}`}>
      <p>
        Check-in {BOOKING_TERMS.checkIn} · Check-out {BOOKING_TERMS.checkOut}
      </p>
      <p className="mt-1.5">
        The booking amount is confirmed with your quote. {BOOKING_TERMS.cancellation[0]}
      </p>
      <p className="mt-1.5">
        <Link href="/refund-policy" className="underline underline-offset-2 hover:text-[#8b6914]">
          Cancellation and refund policy
        </Link>{" "}
        ·{" "}
        <Link href="/terms-and-conditions" className="underline underline-offset-2 hover:text-[#8b6914]">
          Terms
        </Link>
      </p>
    </div>
  );
}

export function BookingTermsSection({ heading = "How booking works", className = "" }: { heading?: string; className?: string }) {
  return (
    <section className={`px-6 py-16 ${className}`} aria-labelledby="booking-terms-heading">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <h2 id="booking-terms-heading" className="font-display text-3xl text-neutral-900">
            {heading}
          </h2>
          <ol className="mt-5 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-700">
            {BOOKING_TERMS.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="font-display text-2xl text-neutral-900">Price basis</h3>
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-700">
            Villa rates are per night for the unit and include breakfast for two guests. Extra guests and extra
            mattresses are charged. Event and wedding prices are quoted for the date and guest count; there is no
            catalogue price.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
            Check-in {BOOKING_TERMS.checkIn} · Check-out {BOOKING_TERMS.checkOut}
          </p>
        </div>
        <div>
          <h3 className="font-display text-2xl text-neutral-900">Cancellation</h3>
          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-neutral-700">
            {BOOKING_TERMS.cancellation.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/refund-policy" className="font-semibold text-[#8b6914] underline underline-offset-4">
              Refund policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms-and-conditions" className="font-semibold text-[#8b6914] underline underline-offset-4">
              Terms and conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
