"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Wifi,
} from "lucide-react";
import type { Room } from "@/content/villas/villa-content";
import { BookingTermsCompact } from "@/components/BookingTerms";
import ReservationCheckoutPreview from "@/components/book-page/ReservationCheckoutPreview";
import { readStayBookingDraft, saveStayBookingDraft } from "@/lib/stay-booking-draft";
import { buildWhatsAppVillaEnquiryUrl } from "@/lib/whatsapp";

interface StayBookingPreviewProps {
  room: Room;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: string;
  initialChildren?: string;
  initialRooms?: string;
}

function getLocalDateInputValue(): string {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

function getNextDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + 1);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getNightCount(checkIn: string, checkOut: string): number {
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  return Math.round((end - start) / 86_400_000);
}

export default function StayBookingPreview({
  room,
  initialCheckIn = "",
  initialCheckOut = "",
  initialAdults = "1",
  initialChildren = "0",
  initialRooms = "1",
}: StayBookingPreviewProps) {
  const images = room.images.length ? room.images : ["/assets/villas/placeholder.jpg"];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [minimumDate] = useState(getLocalDateInputValue);
  const [checkIn, setCheckIn] = useState(() =>
    initialCheckIn && initialCheckIn >= minimumDate ? initialCheckIn : "",
  );
  const [checkOut, setCheckOut] = useState(() =>
    initialCheckIn >= minimumDate && initialCheckOut > initialCheckIn ? initialCheckOut : "",
  );
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [rooms] = useState(initialRooms);
  const [showCheckout, setShowCheckout] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);
  const minimumCheckOut = checkIn ? getNextDate(checkIn) : minimumDate;
  const canBookNow = Boolean(checkIn && checkOut && checkOut > checkIn);
  const selectedNights = canBookNow ? getNightCount(checkIn, checkOut) : 0;

  useEffect(() => {
    window.scrollTo(0, 0);

    const draft = readStayBookingDraft(room.slug);
    if (draft) {
      const restoredCheckIn =
        draft.checkIn && draft.checkIn >= minimumDate ? draft.checkIn : initialCheckIn;
      const restoredCheckOut =
        restoredCheckIn && draft.checkOut && draft.checkOut > restoredCheckIn
          ? draft.checkOut
          : initialCheckOut;
      const hasValidDates = Boolean(
        restoredCheckIn &&
          restoredCheckIn >= minimumDate &&
          restoredCheckOut &&
          restoredCheckOut > restoredCheckIn,
      );

      setCheckIn(hasValidDates ? restoredCheckIn : "");
      setCheckOut(hasValidDates ? restoredCheckOut : "");
      setAdults(draft.adults ?? initialAdults);
      setChildren(draft.children ?? initialChildren);
      setShowCheckout(Boolean(draft.showCheckout && hasValidDates));
    }

    setDraftRestored(true);
  }, [initialAdults, initialCheckIn, initialCheckOut, initialChildren, minimumDate, room.slug]);

  useEffect(() => {
    if (!draftRestored) return;

    const existingDraft = readStayBookingDraft(room.slug);
    saveStayBookingDraft(room.slug, {
      ...existingDraft,
      checkIn,
      checkOut,
      adults,
      children,
      showCheckout,
    });
  }, [adults, checkIn, checkOut, children, draftRestored, room.slug, showCheckout]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCheckout]);

  async function checkAvailabilityAndContinue() {
    if (!canBookNow || isCheckingAvailability) return;

    setIsCheckingAvailability(true);
    setAvailabilityMessage(null);
    try {
      const response = await fetch(
        `/api/bookings/villa-availability?villaSlug=${encodeURIComponent(room.slug)}`,
        { cache: "no-store" },
      );
      const data: { error?: unknown; ranges?: unknown } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setAvailabilityMessage(
          typeof data.error === "string"
            ? data.error
            : "Could not check these dates. Please try again.",
        );
        return;
      }

      if (
        !Array.isArray(data.ranges) ||
        !data.ranges.every(
          (range) =>
            typeof range === "object" &&
            range !== null &&
            "checkIn" in range &&
            "checkOut" in range &&
            typeof range.checkIn === "string" &&
            typeof range.checkOut === "string",
        )
      ) {
        setAvailabilityMessage("We couldn't verify availability. Please try again.");
        return;
      }

      const hasOverlap = data.ranges.some((range) => {
        const occupiedCheckIn = range.checkIn.slice(0, 10);
        const occupiedCheckOut = range.checkOut.slice(0, 10);
        return checkIn < occupiedCheckOut && occupiedCheckIn < checkOut;
      });

      if (hasOverlap) {
        setAvailabilityMessage(
          "This stay is unavailable for those dates. Please choose different dates.",
        );
        return;
      }

      setAvailabilityMessage("Your dates are available. Continuing to guest details...");
      setShowCheckout(true);
    } catch {
      setAvailabilityMessage("Could not reach the availability service. Please try again.");
    } finally {
      setIsCheckingAvailability(false);
    }
  }

  const moveImage = (offset: number) => {
    setActiveImageIndex((index) => (index + offset + images.length) % images.length);
  };

  if (showCheckout) {
    return (
      <ReservationCheckoutPreview
        room={room}
        image={images[activeImageIndex] ?? images[0]!}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        childCount={children}
        rooms={rooms}
        draftSlug={room.slug}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <main className="min-h-[70vh] bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/villas" className="transition hover:text-[#8b6914]">All villas</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-neutral-800">{room.name}</span>
        </nav>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(330px,0.9fr)] lg:gap-8">
          <section className="min-w-0 overflow-hidden rounded-2xl border border-[#e9e1d4] bg-white shadow-[0_10px_35px_rgba(37,31,20,0.06)]">
            <div className="p-5 pb-0 sm:p-7 sm:pb-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9b722d]">
                {room.collection} <span className="mx-1 text-[#c9a55b]">/</span> {room.tag}
              </p>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-[#211f1a] sm:text-4xl">
                {room.h1 ?? room.name}
              </h1>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-600">{room.description}</p>
            </div>

            <div className="relative aspect-[1.7] overflow-hidden bg-neutral-100">
              <Image
                src={images[activeImageIndex] ?? images[0]!}
                alt={`${room.name} photo ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-xs font-semibold text-neutral-900 shadow-sm">
                From <span className="text-[#8b6914]">PKR {room.price}</span> / night
              </span>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveImage(-1)}
                    aria-label="Show previous photo"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(1)}
                    aria-label="Show next photo"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {activeImageIndex + 1} / {images.length} photos
                  </span>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 px-4 pt-4 sm:px-5">
                {images.slice(0, 4).map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show photo ${index + 1}`}
                    aria-pressed={activeImageIndex === index}
                    className={`relative aspect-[1.65] overflow-hidden rounded-lg transition ${
                      activeImageIndex === index
                        ? "ring-2 ring-[#c9a55b] ring-offset-2"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 25vw, 16vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <dl className="mx-5 mt-5 grid gap-3 sm:mx-7 sm:grid-cols-2">
              {room.details.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3.5"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-neutral-900">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="p-5 pt-7 sm:p-7 sm:pt-8">
              <h2 className="mt-7 font-display text-2xl text-neutral-900 sm:text-3xl">About This Stay</h2>
              <p className="mt-4 text-[15px] leading-7 text-neutral-600">{room.longDescription}</p>

              <h3 className="mt-8 font-display text-xl text-neutral-900">Highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {room.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9a55b]">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              {room.amenities.length > 0 && (
                <div className="mt-8 border-t border-[#eee8de] pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-neutral-500">
                    Included with your stay
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 6).map((amenity, index) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-2 rounded-full border border-[#eee8de] bg-white px-3 py-1.5 text-xs text-neutral-700"
                      >
                        {index === 0 ? <Wifi className="h-3.5 w-3.5 text-[#b18437]" /> : null}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] sm:p-7 lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a55b]">Per Night</p>
            <p className="mt-2 font-display text-4xl italic leading-none text-neutral-900">PKR {room.price}</p>
            <p className="mt-2 text-sm text-gray-500">Per night for the unit. Includes breakfast for 2 guests.</p>
            <BookingTermsCompact className="mt-4" />

            <div className="mt-6 border-t border-gray-200 pt-5">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                <CalendarDays className="h-4 w-4 text-[#c9a55b]" />
                Stay dates &amp; guests
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="stay-check-in" className="text-[11px] font-semibold text-neutral-800">
                    Arrival date*
                  </label>
                  <input
                    id="stay-check-in"
                    type="date"
                    min={minimumDate}
                    value={checkIn}
                    disabled={isCheckingAvailability}
                    onChange={(event) => {
                      const nextDate = event.target.value;
                      setCheckIn(nextDate < minimumDate ? "" : nextDate);
                      if (checkOut && nextDate && checkOut <= nextDate) setCheckOut("");
                      setAvailabilityMessage(null);
                    }}
                    className="mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-neutral-900 shadow-sm transition focus:border-[#c9a55b] focus:outline-none focus:ring-2 focus:ring-[#c9a55b]/20"
                  />
                </div>
                <div>
                  <label htmlFor="stay-check-out" className="text-[11px] font-semibold text-neutral-800">
                    Departure date*
                  </label>
                  <input
                    id="stay-check-out"
                    type="date"
                    min={minimumCheckOut}
                    value={checkOut}
                    disabled={isCheckingAvailability}
                    onChange={(event) =>
                      {
                        setCheckOut(event.target.value < minimumCheckOut ? "" : event.target.value);
                        setAvailabilityMessage(null);
                      }
                    }
                    className="mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-neutral-900 shadow-sm transition focus:border-[#c9a55b] focus:outline-none focus:ring-2 focus:ring-[#c9a55b]/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="stay-adults" className="text-[11px] font-semibold text-neutral-800">
                      Adults
                    </label>
                    <select
                      id="stay-adults"
                      value={adults}
                      onChange={(event) => setAdults(event.target.value)}
                      className="mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#c9a55b] focus:outline-none focus:ring-2 focus:ring-[#c9a55b]/20"
                    >
                      {Array.from({ length: 10 }, (_, index) => String(index + 1)).map((count) => (
                        <option key={count} value={count}>{count.padStart(2, "0")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="stay-children" className="text-[11px] font-semibold text-neutral-800">
                      Children
                    </label>
                    <select
                      id="stay-children"
                      value={children}
                      onChange={(event) => setChildren(event.target.value)}
                      className="mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#c9a55b] focus:outline-none focus:ring-2 focus:ring-[#c9a55b]/20"
                    >
                      {Array.from({ length: 10 }, (_, index) => String(index)).map((count) => (
                        <option key={count} value={count}>{count.padStart(2, "0")}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div
                id="stay-date-status"
                aria-live="polite"
                className="mt-4 rounded-lg border border-[#efe5d2] bg-[#faf8f4] px-3 py-3 text-center text-xs font-medium text-neutral-600"
              >
                {availabilityMessage ? (
                  availabilityMessage
                ) : canBookNow ? (
                  <>
                    <span className="block text-sm font-semibold text-neutral-900">
                      {selectedNights} night{selectedNights === 1 ? "" : "s"} selected
                    </span>
                    <span className="mt-1 block">Check availability to continue.</span>
                  </>
                ) : checkIn ? (
                  "Select a departure date to continue."
                ) : (
                  "Select arrival and departure dates to continue."
                )}
              </div>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  disabled={!canBookNow || isCheckingAvailability}
                  aria-describedby="stay-date-status"
                  onClick={checkAvailabilityAndContinue}
                  className={`flex min-h-12 w-full items-center justify-center rounded-lg px-4 text-sm font-semibold uppercase tracking-[0.16em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6914] ${
                    canBookNow && !isCheckingAvailability
                      ? "bg-[#c9a55b] text-white hover:bg-[#a98741]"
                      : "cursor-not-allowed bg-neutral-300 text-neutral-600"
                  }`}
                >
                  {isCheckingAvailability ? "Checking Dates..." : "Book Now"}
                </button>
                <a
                  href={buildWhatsAppVillaEnquiryUrl({
                    name: room.name,
                    tag: room.tag,
                    price: room.price,
                    slug: room.slug,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-800 transition hover:border-[#c9a55b] hover:bg-[#faf7f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6914]"
                >
                  Enquire
                </a>
              </div>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500">
                Availability is checked before you continue to guest details.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
