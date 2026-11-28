"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, BadgeCheck, CalendarCheck, Check, Coffee, Loader2, UserRound } from "lucide-react";
import LocationMap from "@/components/LocationMap";
import type { Room } from "@/content/villas/villa-content";

interface ReservationCheckoutPreviewProps {
  room: Room;
  image: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  childCount: string;
  rooms: string;
  onBack: () => void;
}

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b] focus:ring-2 focus:ring-[#c9a55b]/20";
const fieldLabelClass = "block text-[13px] font-medium text-neutral-800";

type CreatedBooking = {
  reference: string;
  totalAmount: number;
};

function getNightCount(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut || checkOut <= checkIn) return 0;
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  return Math.round((end - start) / 86_400_000);
}

function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

export default function ReservationCheckoutPreview({
  room,
  image,
  checkIn,
  checkOut,
  adults,
  childCount,
  rooms,
  onBack,
}: ReservationCheckoutPreviewProps) {
  const nights = getNightCount(checkIn, checkOut);
  const nightlyRate = Number(room.price.replace(/[^\d]/g, ""));
  const roomCount = Math.max(1, Number(rooms) || 1);
  const total = nights > 0 ? nightlyRate * nights * roomCount : null;
  const guestCapacity = room.details.find((detail) => /guest|adult/i.test(detail.label))?.value;
  const includesBreakfast = room.amenities.some((amenity) => /breakfast/i.test(amenity));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdBooking, setCreatedBooking] = useState<CreatedBooking | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const field = (name: string) => String(formData.get(name) ?? "").trim();

    try {
      const response = await fetch("/api/bookings/guest-stay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          villaSlug: room.slug,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults: Number(adults),
          children: Number(childCount),
          rooms: Number(rooms),
          guestFirstName: field("guestFirstName"),
          guestLastName: field("guestLastName"),
          guestContactEmail: field("guestContactEmail"),
          guestPhone: field("guestPhone"),
          guestDocumentNumber: field("guestDocumentNumber"),
          expectedArrivalTime: field("expectedArrivalTime"),
          guestAddress: field("guestAddress"),
          guestAddress2: field("guestAddress2"),
          guestCity: field("guestCity"),
          guestRegion: field("guestRegion"),
          guestPostalCode: field("guestPostalCode"),
          guestCountry: field("guestCountry"),
          specialRequests: field("specialRequests"),
          paymentMethod: field("paymentMethod"),
          termsAccepted: formData.get("termsAccepted") === "on",
        }),
      });
      const data: {
        error?: unknown;
        booking?: { reference?: unknown; totalAmount?: unknown };
      } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(
          typeof data.error === "string" ? data.error : "Could not save your booking. Please try again.",
        );
        return;
      }

      if (
        typeof data.booking?.reference !== "string" ||
        typeof data.booking.totalAmount !== "number" ||
        !Number.isFinite(data.booking.totalAmount)
      ) {
        setSubmitError("We couldn't read the booking confirmation. Please contact our team before trying again.");
        return;
      }

      setCreatedBooking({
        reference: data.booking.reference,
        totalAmount: data.booking.totalAmount,
      });
    } catch {
      setSubmitError("Could not reach the booking service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#8b6914]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to stay details
        </button>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
            <div className="relative min-h-56 bg-neutral-100 md:min-h-[320px]">
              <Image
                src={image}
                alt={room.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b58d4a]">
                    {room.collection}
                  </p>
                  <h1 className="mt-1 font-display text-2xl font-semibold text-[#c2a05f] sm:text-3xl">
                    {room.h1 ?? room.name}
                  </h1>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Availability to be confirmed
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-600">{room.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
                <span>{guestCapacity ?? `${adults} adults, ${childCount} children`}</span>
                <span>{room.details.find((detail) => /bedroom|room/i.test(detail.label))?.value ?? `${rooms} room(s)`}</span>
              </div>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b58d4a]">Price per night</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-[#c2a05f]">{formatPkr(nightlyRate)}</p>
                  {includesBreakfast && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                      <Coffee className="h-3.5 w-3.5" />
                      Breakfast included
                    </span>
                  )}
                </div>
                <div className="text-right text-sm">
                  <p className="text-neutral-500">
                    {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Dates not selected"}
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {total === null ? "Total confirmed after dates" : formatPkr(total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.55fr)]">
          <aside className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <h2 className="flex items-center gap-2 bg-[#c9a96b] px-5 py-3.5 text-base font-semibold text-white">
              <CalendarCheck className="h-4 w-4" />
              Booking Summary
            </h2>
            <div className="p-5">
              <p className="text-sm font-semibold text-[#b58d4a]">Accommodation</p>
              <dl className="mt-3 space-y-3 text-[13px]">
                {[
                  ["Rate Plan", "Standard nightly rate"],
                  ["Room Type", room.name],
                  ["Rooms", String(roomCount)],
                  ["Check-in", checkIn || "Not selected"],
                  ["Check-out", checkOut || "Not selected"],
                  ["Nights", nights > 0 ? String(nights) : "—"],
                  ["Guests", `${adults} adults, ${childCount} children`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-3">
                    <dt className="text-gray-500">{label}:</dt>
                    <dd className="text-right font-medium text-neutral-800">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-[#b58d4a]">Price Summary</p>
                <div className="mt-3 flex justify-between gap-3 text-[13px]">
                  <span className="text-gray-500">Room rate</span>
                  <span className="font-medium text-neutral-800">{formatPkr(nightlyRate)} / night</span>
                </div>
                <div className="mt-3 flex justify-between gap-3 border-t border-gray-100 pt-3 font-semibold">
                  <span className="text-neutral-800">Grand Total</span>
                  <span className="text-[#b58d4a]">
                    {total === null ? "Select dates" : formatPkr(total)}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-[#f8f8f6] p-4">
                <p className="text-sm font-semibold text-[#b58d4a]">Key Booking Policies</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-5 text-gray-600">
                  <li>Reservations are subject to availability and confirmation.</li>
                  <li>Check-in is at 2:00 PM; check-out is at 12:00 PM. A valid ID is required.</li>
                  <li>Primary guest must be 18 or older.</li>
                  <li>Cancel 7+ days ahead for a full refund; 3–6 days ahead for 50%; under 3 days or no-show is non-refundable.</li>
                </ul>
                <p className="mt-3 text-xs leading-5 text-gray-600">
                  See the full{" "}
                  <Link href="/terms-and-conditions" className="font-medium text-[#a17d3c] underline underline-offset-2">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund-policy" className="font-medium text-[#a17d3c] underline underline-offset-2">
                    Cancellation &amp; Refund Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-5 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <h2 className="flex items-center gap-2 bg-[#c9a96b] px-5 py-3.5 text-base font-semibold text-white lg:sticky lg:top-0 lg:z-10">
                <UserRound className="h-4 w-4" />
                Guest Details
              </h2>
              {createdBooking ? (
                <div role="status" className="p-6 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-900">
                    Booking request saved
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Your request is pending review by our booking team. Keep this reference for your records.
                  </p>
                  <dl className="mt-5 space-y-3 rounded-lg bg-[#f8f8f6] p-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Reference</dt>
                      <dd className="font-semibold text-neutral-900">{createdBooking.reference}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Estimated total</dt>
                      <dd className="font-semibold text-neutral-900">{formatPkr(createdBooking.totalAmount)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Status</dt>
                      <dd className="font-semibold text-amber-700">Pending</dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                  <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                    <label className={fieldLabelClass}>
                      First Name <span className="text-red-600">*</span>
                      <input
                        name="guestFirstName"
                        className={fieldClass}
                        autoComplete="given-name"
                        placeholder="First name"
                        maxLength={100}
                        required
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      Last Name <span className="text-red-600">*</span>
                      <input
                        name="guestLastName"
                        className={fieldClass}
                        autoComplete="family-name"
                        placeholder="Last name"
                        maxLength={100}
                        required
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      Email <span className="text-red-600">*</span>
                      <input
                        name="guestContactEmail"
                        className={fieldClass}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        maxLength={320}
                        required
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      Phone <span className="text-red-600">*</span>
                      <input
                        name="guestPhone"
                        className={fieldClass}
                        type="tel"
                        autoComplete="tel"
                        placeholder="+92 3XX XXXXXXX"
                        maxLength={40}
                        required
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      CNIC / Passport
                      <input
                        name="guestDocumentNumber"
                        className={fieldClass}
                        placeholder="CNIC or passport number"
                        maxLength={100}
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      Expected Arrival Time
                      <select name="expectedArrivalTime" className={fieldClass} defaultValue="">
                        <option value="">Select arrival time</option>
                        <option>12:00 PM - 2:00 PM</option>
                        <option>2:00 PM - 4:00 PM</option>
                        <option>4:00 PM - 6:00 PM</option>
                        <option>After 6:00 PM</option>
                      </select>
                    </label>
                    <label className={`${fieldLabelClass} sm:col-span-2`}>
                      Address
                      <input
                        name="guestAddress"
                        className={fieldClass}
                        placeholder="Street address"
                        autoComplete="street-address"
                        maxLength={250}
                      />
                    </label>
                    <label className={`${fieldLabelClass} sm:col-span-2`}>
                      Address 2
                      <input
                        name="guestAddress2"
                        className={fieldClass}
                        placeholder="Apartment, suite, etc. (optional)"
                        maxLength={250}
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      City
                      <input
                        name="guestCity"
                        className={fieldClass}
                        autoComplete="address-level2"
                        placeholder="City"
                        maxLength={100}
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      State / Province
                      <input
                        name="guestRegion"
                        className={fieldClass}
                        autoComplete="address-level1"
                        placeholder="Province or state"
                        maxLength={100}
                      />
                    </label>
                    <label className={fieldLabelClass}>
                      Postal Code
                      <input
                        name="guestPostalCode"
                        className={fieldClass}
                        autoComplete="postal-code"
                        placeholder="Postal code"
                        maxLength={30}
                      />
                    </label>
                    <label className={`${fieldLabelClass} sm:col-span-2`}>
                      Country
                      <input
                        name="guestCountry"
                        className={fieldClass}
                        defaultValue="Pakistan"
                        autoComplete="country-name"
                        maxLength={100}
                      />
                    </label>
                    <label className={`${fieldLabelClass} sm:col-span-2`}>
                      Special Requests
                      <textarea
                        name="specialRequests"
                        className={`${fieldClass} min-h-24 py-3`}
                        placeholder="Any special requests or requirements..."
                        maxLength={5000}
                      />
                    </label>
                  </div>

                  <fieldset className="mt-5 border-t border-gray-100 pt-4">
                    <legend className="text-[13px] font-semibold text-neutral-800">Payment Method</legend>
                    <label className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-700">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Pay at Hotel"
                        defaultChecked
                        className="accent-[#c9a55b]"
                      />
                      Pay at Hotel
                    </label>
                  </fieldset>

                  <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-neutral-600">
                    <input
                      name="termsAccepted"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(event) => setTermsAccepted(event.target.checked)}
                      required
                      className="mt-1 accent-[#c9a55b]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms-and-conditions" className="text-[#a17d3c] underline">
                        terms and conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-[#a17d3c] underline">
                        privacy policy
                      </Link>
                      .
                    </span>
                  </label>

                  {submitError && (
                    <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !termsAccepted}
                    className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#c9a96b] px-4 text-sm font-semibold text-white transition hover:bg-[#a98741] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    {isSubmitting ? "Saving Booking..." : "Create Booking Request"}
                  </button>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    Your request will be saved as pending until a booking manager reviews it.
                  </p>
                </form>
              )}
            </section>
            <LocationMap />
          </div>
        </div>
      </div>
    </main>
  );
}
