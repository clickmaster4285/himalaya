"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Villa } from "@/lib/villa-types";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import {
  Calendar as CalendarLucide,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Home,
  Landmark,
  Loader2,
  Lock,
  Mail,
  Phone,
  Shield,
  Smartphone,
  User,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { computeStayTotalPkr, countStayNights, parseNightlyPkr } from "@/lib/stay-booking-compute";
import {
  isDayReserved,
  selectionOverlapsOccupied,
  startOfLocalDay,
  type OccupiedRange,
} from "@/lib/stay-calendar-utils";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const STAY_EXPERIENCE = "Book Your Stay";

type CreatedBooking = {
  reference: string;
  status: string;
  totalAmount: number;
  id: string;
};

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const steps = [
  { n: 1 as Step, label: "Select Villa" },
  { n: 2 as Step, label: "Dates & Guests" },
  { n: 3 as Step, label: "Guest Details" },
  { n: 4 as Step, label: "Review Booking" },
  { n: 5 as Step, label: "Payment" },
] as const;

const stepIcons: Record<Step, LucideIcon> = {
  1: Home,
  2: CalendarDays,
  3: User,
  4: Check,
  5: CreditCard,
  6: Check,
};

/** Labels + inputs: readable body text, clear focus, consistent across steps */
const fieldLabel =
  "block text-[13px] font-semibold text-neutral-800 tracking-wide";
const fieldHint = "text-[12px] text-neutral-600 mt-1";
const inputClass =
  "mt-2.5 w-full min-h-[48px] px-4 py-3 border-2 border-[#cfc0a6] bg-white text-[15px] leading-snug text-neutral-900 rounded-lg shadow-sm placeholder:text-neutral-400 transition-colors focus:outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10";
const inputWithIconInner =
  "w-full min-h-[44px] bg-transparent text-[15px] leading-snug text-neutral-900 placeholder:text-neutral-400 focus:outline-none";
const textareaClass =
  "mt-2.5 w-full min-h-[132px] px-4 py-3.5 border-2 border-[#cfc0a6] bg-white text-[15px] leading-relaxed text-neutral-900 rounded-lg shadow-sm placeholder:text-neutral-400 resize-none transition-colors focus:outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10";
const sectionTitle =
  "font-display text-lg md:text-xl text-neutral-900 font-medium tracking-tight";

function StepDot({ step, active, done }: { step: Step; active: boolean; done: boolean }) {
  const Icon = stepIcons[step];
  return (
    <div
      className={[
        "relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
        done
          ? "border-neutral-900 bg-neutral-900 text-white shadow-md"
          : active
            ? "border-[#b8923d] bg-white text-[#8b6914] shadow-[0_6px_20px_rgba(201,165,91,0.28)] ring-2 ring-[#c9a55b]/25 scale-105"
            : "border-[#c9b896] bg-[#faf6ef] text-neutral-700",
      ].join(" ")}
      aria-current={active ? "step" : undefined}
    >
      {done ? (
        <Check className="h-5 w-5" strokeWidth={2.5} />
      ) : (
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      )}
    </div>
  );
}

function BookStayContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialStep = (Number(searchParams.get("step") ?? 1) || 1) as Step;
  const [step, setStep] = useState<Step>(
    (initialStep >= 1 && initialStep <= 6 ? initialStep : 1) as Step,
  );

  const selectedVillaSlug = (searchParams.get("villa") ?? "").toString();
  const [villaCatalog, setVillaCatalog] = useState<Villa[]>([]);
  const [bookingLoadError, setBookingLoadError] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [occupiedRanges, setOccupiedRanges] = useState<OccupiedRange[]>([]);
  const [dateError, setDateError] = useState<string | null>(null);
  const prevVillaSlugRef = useRef<string | null>(null);

  useEffect(() => {
    fetch("/api/villas")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load villas");
        return r.json();
      })
      .then((d) => {
        const next = Array.isArray(d.villas) ? d.villas : [];
        setVillaCatalog(next);
        if (next.length === 0) {
          setBookingLoadError("Villa availability is temporarily unavailable.");
          return;
        }
        setBookingLoadError(null);
      })
      .catch(() => {
        setVillaCatalog([]);
        setBookingLoadError("Something went wrong while loading booking. Contact us on WhatsApp.");
      });
  }, []);

  useEffect(() => {
    if (!selectedVillaSlug) {
      setOccupiedRanges([]);
      return;
    }
    fetch(`/api/bookings/villa-availability?villaSlug=${encodeURIComponent(selectedVillaSlug)}`)
      .then((r) => r.json())
      .then((d: { ranges?: OccupiedRange[] }) => setOccupiedRanges(Array.isArray(d.ranges) ? d.ranges : []))
      .catch(() => setOccupiedRanges([]));
  }, [selectedVillaSlug]);

  useEffect(() => {
    if (prevVillaSlugRef.current !== null && prevVillaSlugRef.current !== selectedVillaSlug) {
      setRange(undefined);
      setDateError(null);
    }
    prevVillaSlugRef.current = selectedVillaSlug;
  }, [selectedVillaSlug]);

  useEffect(() => {
    if (!range?.from || !range?.to) return;
    if (!occupiedRanges.length) {
      setDateError(null);
      return;
    }
    if (selectionOverlapsOccupied(range.from, range.to, occupiedRanges)) {
      setRange(undefined);
      setDateError("These dates are already booked. Please select another date range.");
    } else {
      setDateError(null);
    }
  }, [range, occupiedRanges]);

  const selectedVilla = useMemo(() => {
    if (!selectedVillaSlug) return undefined;
    const n = decodeURIComponent(selectedVillaSlug).trim().toLowerCase();
    return villaCatalog.find((v) => v.slug === n);
  }, [selectedVillaSlug, villaCatalog]);

  const villaOptions = useMemo(() => villaCatalog, [villaCatalog]);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "jazzcash" | "easypaisa">("bank");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [createdBooking, setCreatedBooking] = useState<CreatedBooking | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const totalGuests = adults + children;
  const guestsLabel = `${adults} Adults, ${children} Children`;

  const pricing = useMemo(() => {
    if (!selectedVilla || !range?.from || !range?.to) {
      return { subtotal: 0, taxes: 0, total: 0, nights: 0 };
    }
    const nightly = parseNightlyPkr(selectedVilla.price);
    const nights = countStayNights(range.from, range.to);
    return computeStayTotalPkr(nightly, nights);
  }, [selectedVilla, range]);

  const { subtotal: subtotalPkr, taxes: taxesPkr, total: totalPkr, nights: stayNights } = pricing;

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d: { user?: { email?: string; fullName?: string } }) => {
        const u = d.user;
        if (!u) return;
        if (u.email) setEmail(u.email);
        if (u.fullName) {
          const parts = u.fullName.trim().split(/\s+/);
          setFirstName(parts[0] ?? "");
          setLastName(parts.slice(1).join(" "));
        }
      })
      .catch(() => {});
  }, []);

  const selectVilla = useCallback(
    (slug: string) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set("villa", slug);
      router.push(`${pathname}?${next.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const submitStayBooking = useCallback(async () => {
    setSubmitError(null);
    if (!range?.from || !range?.to) {
      setSubmitError("Please select check-in and check-out dates.");
      return;
    }
    if (!selectedVillaSlug || !selectedVilla) {
      setSubmitError("Please select a villa.");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setSubmitError("Please enter your first and last name (step 3).");
      return;
    }
    if (!email.trim()) {
      setSubmitError("Please enter your email.");
      return;
    }
    if (!phone.trim()) {
      setSubmitError("Please enter your phone number.");
      return;
    }

    const meRes = await fetch("/api/auth/me", { credentials: "include" });
    const meData = await meRes.json().catch(() => ({}));
    if (!meData?.user) {
      const q = searchParams.toString();
      router.push(`/login?from=${encodeURIComponent(`${pathname}${q ? `?${q}` : ""}`)}`);
      return;
    }

    if (totalPkr <= 0) {
      setSubmitError("Could not calculate total — check dates and villa price.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          experienceType: STAY_EXPERIENCE,
          packageName: selectedVilla.title,
          bookingDate: range.from.toISOString(),
          checkOutDate: range.to.toISOString(),
          totalAmount: totalPkr,
          notes: specialRequests.trim() || null,
          villaSlug: selectedVilla.slug,
          adults,
          children,
          guestPhone: phone.trim(),
          guestFirstName: firstName.trim(),
          guestLastName: lastName.trim(),
          guestContactEmail: email.trim().toLowerCase(),
          paymentMethod,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(
          res.status === 409 && typeof data.error === "string"
            ? data.error
            : typeof data.error === "string"
              ? data.error
              : "Could not submit booking.",
        );
        return;
      }
      const b = data.booking;
      if (b?.reference && b?.id) {
        setCreatedBooking({
          id: b.id,
          reference: b.reference,
          status: b.status ?? "PENDING",
          totalAmount: Number(b.totalAmount) || totalPkr,
        });
        setStep(6);
      } else {
        setSubmitError("Unexpected response from server.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    adults,
    children,
    email,
    firstName,
    lastName,
    pathname,
    paymentMethod,
    phone,
    range,
    router,
    searchParams,
    selectedVilla,
    selectedVillaSlug,
    specialRequests,
    totalPkr,
  ]);

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-14">
        <div className="flex items-center gap-3 text-neutral-700">
          <span className="text-xl">↩</span>
          <Link
            href={step === 6 ? "/" : "/book"}
            className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase hover:underline"
          >
            {step === 6 ? "Back to Home" : "Back To Home"}
          </Link>
        </div>

        {step !== 6 && (
          <>
            <h1 className="mt-6 font-display text-[44px] leading-[1.05] md:text-[56px] text-neutral-900">
              Book Your Stay
            </h1>
            <p className="mt-3 text-sm md:text-[15px] text-neutral-600 max-w-2xl leading-relaxed">
              Choose the perfect experience and let us create unforgettable memories for you
            </p>
            {bookingLoadError ? (
              <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                <p className="font-semibold">{bookingLoadError}</p>
                <a
                  href={buildWhatsAppBookingUrl(selectedVilla?.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[12px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4"
                >
                  Continue on WhatsApp
                </a>
              </div>
            ) : null}
          </>
        )}

        <div className={step === 6 ? "mt-8" : "mt-10 bg-[#fbf8f2] border border-[#eadfce]"}>
          {/* Stepper */}
          {step !== 6 && (
            <div className="px-4 sm:px-8 md:px-12 py-9 md:py-10 border-b-2 border-[#e5d9c4] bg-gradient-to-b from-[#fffdf9] to-[#fbf8f2]">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-2">
                {steps.map((s, idx) => {
                  const active = step === s.n;
                  const done = step > s.n;
                  const isLast = idx === steps.length - 1;
                  const prevStep = idx > 0 ? steps[idx - 1]!.n : null;
                  const segmentAfterDone = prevStep != null && step > prevStep;
                  return (
                    <div
                      key={s.n}
                      className="flex min-w-0 items-center gap-4 md:flex-1 md:flex-col md:items-stretch md:gap-0"
                    >
                      <div className="flex shrink-0 items-center md:min-w-0 md:w-full md:flex-1">
                        <div
                          className={[
                            "hidden h-1 flex-1 rounded-full md:block",
                            idx === 0 ? "invisible" : "",
                            segmentAfterDone ? "bg-neutral-900" : "bg-[#c9b896]/70",
                          ].join(" ")}
                          aria-hidden
                        />
                        <div className="mx-1 shrink-0 md:mx-2 md:self-center">
                          <StepDot step={s.n} active={active} done={done} />
                        </div>
                        <div
                          className={[
                            "hidden h-1 flex-1 rounded-full md:block",
                            isLast ? "invisible" : "",
                            done ? "bg-neutral-900" : "bg-[#c9b896]/70",
                          ].join(" ")}
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 text-left md:mt-5 md:flex-1 md:text-center md:px-1">
                        <p
                          className={[
                            "text-[11px] font-bold uppercase tracking-[0.2em]",
                            active ? "text-[#8b6914]" : done ? "text-neutral-700" : "text-neutral-600",
                          ].join(" ")}
                        >
                          Step {s.n}
                        </p>
                        <p
                          className={[
                            "mt-1.5 font-display text-[15px] leading-snug md:text-[17px]",
                            active ? "font-semibold text-neutral-900" : "font-medium text-neutral-800",
                          ].join(" ")}
                        >
                          {s.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content */}
          <div className={step === 6 ? "px-0 py-0" : "px-6 md:px-10 py-10"}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div
                className={
                  step === 6
                    ? "lg:col-span-12 max-w-[920px] mx-auto w-full"
                    : "lg:col-span-8 bg-white border border-[#eadfce]"
                }
              >
                {step === 2 && (
                  <div className="p-6 sm:p-8 md:p-10">
                    <p className={sectionTitle}>When would you like to stay?</p>
                    <p className="mt-2 text-sm text-neutral-600">
                      Choose check-in and check-out. <strong>Nights</strong> = full nights between those dates (e.g. 30 Jan →
                      1 Feb = <strong>2 nights</strong>). Faded days are already booked for this villa.
                    </p>

                    {dateError && (
                      <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950">
                        <div className="font-semibold">Already booked</div>
                        <div className="mt-1">{dateError}</div>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-neutral-700">
                      <div className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded-full border border-neutral-400 bg-white" aria-hidden />
                        <span className="font-medium">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-neutral-300 bg-neutral-100"
                          aria-hidden
                        />
                        <span className="font-medium">Booked</span>
                      </div>
                      <div className="ml-auto flex flex-wrap items-center gap-3 text-[13px] text-neutral-800">
                        <span className="rounded-full border border-[#dccfb8] bg-[#faf8f4] px-3 py-1 font-semibold tabular-nums">
                          Nights: {stayNights}
                        </span>
                        <span className="rounded-full border border-[#dccfb8] bg-[#faf8f4] px-3 py-1 font-semibold tabular-nums">
                          Days: {stayNights > 0 ? stayNights + 1 : 0}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 overflow-hidden rounded-xl border-2 border-[#dccfb8] bg-white px-3 py-6 shadow-sm sm:px-6">
                      <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={range}
                        onSelect={() => {
                          // We manage range ourselves via onDayClick for reliable behavior + messages.
                        }}
                        onDayClick={(day) => {
                          setDateError(null);

                          // Booked day click -> message (do not change selection)
                          if (selectedVillaSlug && occupiedRanges.length > 0 && isDayReserved(day, occupiedRanges)) {
                            setDateError("This date is already booked. Please select another date.");
                            return;
                          }

                          const clicked = startOfLocalDay(day);
                          const curFrom = range?.from ? startOfLocalDay(range.from) : undefined;
                          const curTo = range?.to ? startOfLocalDay(range.to) : undefined;

                          let next: DateRange;
                          // Start a new selection if none, or if already completed.
                          if (!curFrom || (curFrom && curTo)) {
                            next = { from: clicked, to: undefined };
                          } else {
                            // Completing or adjusting the range.
                            if (clicked.getTime() < curFrom.getTime()) {
                              next = { from: clicked, to: undefined };
                            } else if (clicked.getTime() === curFrom.getTime()) {
                              // Same day click toggles off.
                              setRange(undefined);
                              return;
                            } else {
                              next = { from: curFrom, to: clicked };
                            }
                          }

                          // If the completed range overlaps any booked nights, block it.
                          if (next.from && next.to && occupiedRanges.length > 0) {
                            if (selectionOverlapsOccupied(next.from, next.to, occupiedRanges)) {
                              setRange(undefined);
                              setDateError("These dates are already booked. Please select another date range.");
                              return;
                            }
                          }

                          setRange(next);
                        }}
                        disabled={(date) => {
                          const t0 = startOfLocalDay(new Date()).getTime();
                          if (startOfLocalDay(date).getTime() < t0) return true;
                          return false;
                        }}
                        modifiers={{
                          booked: (date) =>
                            !!selectedVillaSlug &&
                            occupiedRanges.length > 0 &&
                            isDayReserved(date, occupiedRanges),
                        }}
                        modifiersClassNames={{
                          booked:
                            "text-neutral-300 opacity-60 line-through hover:bg-transparent hover:text-neutral-300 cursor-not-allowed",
                        }}
                        className="w-full"
                        classNames={{
                          months: "flex flex-col md:flex-row md:gap-12 gap-8 justify-center",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center",
                          caption_label:
                            "text-sm font-semibold tracking-wide text-neutral-900",
                          nav: "space-x-0 flex items-center",
                          nav_button:
                            "h-9 w-9 rounded-lg border border-[#dccfb8] bg-white p-0 text-neutral-800 hover:bg-[#fbf8f2]",
                          nav_button_previous: "absolute left-0",
                          nav_button_next: "absolute right-0",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex justify-between",
                          head_cell:
                            "text-neutral-600 rounded-md w-10 font-semibold text-[11px] uppercase tracking-wider",
                          row: "flex w-full mt-2 justify-between",
                          cell:
                            "h-10 w-10 text-center text-[13px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected])]:bg-neutral-900 focus-within:relative focus-within:z-20",
                          day:
                            "h-10 w-10 p-0 font-medium text-neutral-800 hover:bg-neutral-900 hover:text-white rounded-full transition-colors",
                          day_selected:
                            "bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white focus:bg-neutral-900 focus:text-white rounded-full",
                          day_range_start:
                            "day-range-start bg-neutral-900 text-white rounded-full",
                          day_range_end:
                            "day-range-end bg-neutral-900 text-white rounded-full",
                          day_range_middle:
                            "aria-selected:bg-neutral-900 aria-selected:text-white rounded-none",
                          day_outside:
                            "day-outside text-neutral-400 opacity-80 aria-selected:bg-neutral-900/80 aria-selected:text-white/80",
                          day_disabled: "text-neutral-300 opacity-50",
                          day_today: "bg-[#f5ecd8] text-neutral-900 font-semibold",
                        }}
                      />
                    </div>

                    <div className="mt-10">
                      <p className={sectionTitle}>Number of guests</p>
                      <p className="mt-2 text-sm text-neutral-600">Tell us how many adults and children will stay.</p>

                      <div className="mt-6 overflow-hidden rounded-xl border-2 border-[#dccfb8] bg-white shadow-sm">
                        <div className="px-5 py-5 sm:px-6 flex items-center justify-between border-b border-[#eadfce] bg-[#faf8f4]">
                          <div className="flex items-center gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a55b]/20 text-lg" aria-hidden>
                              👤
                            </span>
                            <div>
                              <p className="text-[15px] font-semibold text-neutral-900">Adults</p>
                              <p className={fieldHint}>Age 13+</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              type="button"
                              onClick={() => setAdults((p) => Math.max(1, p - 1))}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#cfc0a6] bg-white text-lg font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-800"
                              aria-label="Decrease adults"
                            >
                              −
                            </button>
                            <span className="min-w-[2rem] text-center text-base font-semibold tabular-nums text-neutral-900">
                              {adults}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAdults((p) => Math.min(9, p + 1))}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#cfc0a6] bg-white text-lg font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-800"
                              aria-label="Increase adults"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="px-5 py-5 sm:px-6 flex items-center justify-between bg-[#faf8f4]">
                          <div className="flex items-center gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a55b]/20 text-lg" aria-hidden>
                              🧒
                            </span>
                            <div>
                              <p className="text-[15px] font-semibold text-neutral-900">Children</p>
                              <p className={fieldHint}>Age 0–12</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              type="button"
                              onClick={() => setChildren((p) => Math.max(0, p - 1))}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#cfc0a6] bg-white text-lg font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-800"
                              aria-label="Decrease children"
                            >
                              −
                            </button>
                            <span className="min-w-[2rem] text-center text-base font-semibold tabular-nums text-neutral-900">
                              {children}
                            </span>
                            <button
                              type="button"
                              onClick={() => setChildren((p) => Math.min(9, p + 1))}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#cfc0a6] bg-white text-lg font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-800"
                              aria-label="Increase children"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="px-5 py-4 sm:px-6 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Total guests</p>
                            <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                              {String(totalGuests).padStart(2, "0")}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-white/95">{guestsLabel}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href="/book"
                        className="px-6 py-3 text-[11px] uppercase tracking-widest text-neutral-700 underline-offset-4 hover:underline"
                      >
                        ← Back
                      </Link>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={
                          !range?.from ||
                          !range?.to ||
                          !selectedVillaSlug ||
                          (occupiedRanges.length > 0 &&
                            selectionOverlapsOccupied(range.from, range.to, occupiedRanges))
                        }
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="p-6 sm:p-8 md:p-10">
                    <p className={sectionTitle}>Choose your villa</p>
                    <p className="mt-2 text-sm text-neutral-600">Pick the residence that fits your stay.</p>
                    <div className="mt-8 space-y-4">
                      {villaOptions.map((v) => (
                        <button
                          key={v.slug}
                          type="button"
                          onClick={() => selectVilla(v.slug)}
                          className={[
                            "w-full rounded-xl border-2 p-4 text-left shadow-sm transition-all sm:p-5",
                            selectedVillaSlug === v.slug
                              ? "border-neutral-900 bg-white ring-2 ring-neutral-900/15"
                              : "border-[#dccfb8] bg-[#faf8f4] hover:border-[#b8923d] hover:bg-white",
                          ].join(" ")}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={v.image}
                              alt={v.title}
                              className="h-16 w-24 shrink-0 rounded-lg object-cover border-2 border-[#e5d9c4]"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-display text-base font-semibold text-neutral-900">{v.title}</p>
                              <p className="mt-1 text-sm leading-snug text-neutral-600 line-clamp-2">{v.description}</p>
                              <p className="mt-2 text-sm font-semibold text-[#8b6914]">{v.price}</p>
                            </div>
                            <span className="text-xl text-[#c9a55b]" aria-hidden>
                              ★
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Link
                        href="/book"
                        className="px-6 py-3 border border-neutral-300 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition"
                      >
                        Back
                      </Link>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!selectedVilla}
                        className="px-8 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="p-6 sm:p-8 md:p-10">
                    <p className={sectionTitle}>Your details</p>
                    <p className="mt-2 text-sm text-neutral-600">We will use this to confirm your reservation.</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                      <div>
                        <label className={fieldLabel}>
                          First name <span className="text-[#b8923d]">*</span>
                        </label>
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className={inputClass}
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <label className={fieldLabel}>
                          Last name <span className="text-[#b8923d]">*</span>
                        </label>
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className={inputClass}
                          autoComplete="family-name"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={fieldLabel}>
                          Email <span className="text-[#b8923d]">*</span>
                        </label>
                        <div className="mt-2.5 flex min-h-[48px] items-center gap-3 rounded-lg border-2 border-[#cfc0a6] bg-white px-4 shadow-sm transition-colors focus-within:border-neutral-900 focus-within:ring-4 focus-within:ring-neutral-900/10">
                          <Mail className="h-5 w-5 shrink-0 text-[#b8923d]" strokeWidth={1.75} aria-hidden />
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className={inputWithIconInner}
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className={fieldLabel}>
                          Phone <span className="text-[#b8923d]">*</span>
                        </label>
                        <div className="mt-2.5 flex min-h-[48px] items-center gap-3 rounded-lg border-2 border-[#cfc0a6] bg-white px-4 shadow-sm transition-colors focus-within:border-neutral-900 focus-within:ring-4 focus-within:ring-neutral-900/10">
                          <Phone className="h-5 w-5 shrink-0 text-[#b8923d]" strokeWidth={1.75} aria-hidden />
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            className={inputWithIconInner}
                            autoComplete="tel"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className={fieldLabel}>Special requests</label>
                        <p className="mt-1 text-sm text-neutral-600">Optional — dietary needs, arrival time, etc.</p>
                        <textarea
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className={textareaClass}
                          placeholder="Any special requirements or preferences..."
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="px-8 py-3 border border-neutral-400 text-neutral-800 text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="p-6 sm:p-8 md:p-10">
                    <p className={sectionTitle}>Review your booking</p>
                    <p className="mt-2 text-sm text-neutral-600">Confirm dates, villa, and guest information before payment.</p>

                    {/* Selected villa summary */}
                    <div className="mt-8 overflow-hidden rounded-xl border-2 border-[#dccfb8] bg-[#faf8f4]">
                      <div className="p-5 sm:p-6 flex items-center gap-4">
                        <img
                          src={(selectedVilla?.image ?? "/assets/villa-presidential-real.jpg")}
                          alt={selectedVilla?.title ?? "Selected villa"}
                          className="h-16 w-24 shrink-0 rounded-lg object-cover border-2 border-[#e5d9c4]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-base font-semibold text-neutral-900">
                            {selectedVilla?.title ?? "Alpine Family Lodge"}
                          </p>
                          <p className="mt-1 text-sm text-neutral-600">
                            {adults} adults, {children} children · {selectedVilla?.size ?? "450m²"}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[#8b6914]">{selectedVilla?.price ?? "PKR 39,000"}</p>
                        </div>
                        <span className="text-[#c9a55b] text-xl" aria-hidden>
                          ★
                        </span>
                      </div>
                    </div>

                    {/* Booking details */}
                    <div className="mt-6 overflow-hidden rounded-xl border-2 border-[#dccfb8] bg-white shadow-sm">
                      <div className="flex items-center justify-between border-b border-[#eadfce] bg-[#faf8f4] px-5 py-4 sm:px-6">
                        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-800">Booking details</p>
                        <span className="text-[#b8923d] text-sm" aria-hidden>
                          ✎
                        </span>
                      </div>
                      <div className="px-5 py-6 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Check-in</p>
                          <p className="mt-2 text-[15px] font-medium text-neutral-900">
                            {range?.from ? range.from.toLocaleDateString() : "Mar 28, 2026"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Check-out</p>
                          <p className="mt-2 text-[15px] font-medium text-neutral-900">
                            {range?.to ? range.to.toLocaleDateString() : "Mar 31, 2026"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Guests</p>
                          <p className="mt-2 text-[15px] font-medium text-neutral-900">{guestsLabel}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Nights</p>
                          <p className="mt-2 text-[15px] font-medium text-neutral-900">
                            {stayNights > 0 ? stayNights : "—"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Guest information */}
                    <div className="mt-6 overflow-hidden rounded-xl border-2 border-[#dccfb8] bg-white shadow-sm">
                      <div className="flex items-center justify-between border-b border-[#eadfce] bg-[#faf8f4] px-5 py-4 sm:px-6">
                        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-800">Guest information</p>
                        <span className="text-[#b8923d] text-sm" aria-hidden>
                          ✎
                        </span>
                      </div>
                      <div className="px-5 py-6 sm:px-6 space-y-5">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Guest</p>
                          <p className="text-[15px] font-medium text-neutral-900 sm:text-right">
                            {firstName} {lastName}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Email</p>
                          <p className="text-[15px] font-medium text-neutral-900 sm:text-right break-all">{email}</p>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Phone</p>
                          <p className="text-[15px] font-medium text-neutral-900 sm:text-right">{phone}</p>
                        </div>
                        <div className="pt-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Special requests</p>
                          <div className="mt-3 rounded-lg border-2 border-[#dccfb8] bg-[#faf8f4] px-4 py-3.5 text-sm leading-relaxed text-neutral-800">
                            {specialRequests.trim() || "—"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation policy */}
                    <div className="mt-6 rounded-xl border-2 border-[#dccfb8] bg-[#faf8f4] px-5 py-5 sm:px-6">
                      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-800">Cancellation policy</p>
                      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-neutral-700">
                        <li>- Free cancellation up to 14 days before check-in</li>
                        <li>- 50% refund for cancellations 7–14 days before check-in</li>
                        <li>- No refund for cancellations within 7 days of check-in</li>
                        <li>- Modifications subject to availability and rate changes</li>
                      </ul>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3">
                      <button
                        onClick={() => setStep(3)}
                        className="px-8 py-3 border border-neutral-400 text-neutral-800 text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(5)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="p-6 sm:p-8 md:p-10">
                    <p className={sectionTitle}>Secure payment</p>
                    <p className="mt-2 text-sm text-neutral-600">Choose a method and complete your reservation.</p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={[
                          "rounded-xl border-2 p-5 text-left shadow-sm transition-all",
                          paymentMethod === "card"
                            ? "border-[#b8923d] bg-[#fffdf8] ring-2 ring-[#c9a55b]/25"
                            : "border-[#dccfb8] bg-[#faf8f4] hover:border-neutral-800 hover:bg-white",
                        ].join(" ")}
                      >
                        <CreditCard className="h-6 w-6 text-[#b8923d]" strokeWidth={1.75} />
                        <p className="mt-3 font-display text-base font-semibold text-neutral-900">Credit / debit card</p>
                        <p className="mt-1.5 text-sm text-neutral-600">Visa, Mastercard, American Express</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bank")}
                        className={[
                          "rounded-xl border-2 p-5 text-left shadow-sm transition-all",
                          paymentMethod === "bank"
                            ? "border-[#b8923d] bg-[#fffdf8] ring-2 ring-[#c9a55b]/25"
                            : "border-[#dccfb8] bg-[#faf8f4] hover:border-neutral-800 hover:bg-white",
                        ].join(" ")}
                      >
                        <Landmark className="h-6 w-6 text-[#b8923d]" strokeWidth={1.75} />
                        <p className="mt-3 font-display text-base font-semibold text-neutral-900">Bank transfer</p>
                        <p className="mt-1.5 text-sm text-neutral-600">Direct bank transfer</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("jazzcash")}
                        className={[
                          "rounded-xl border-2 p-5 text-left shadow-sm transition-all",
                          paymentMethod === "jazzcash"
                            ? "border-[#b8923d] bg-[#fffdf8] ring-2 ring-[#c9a55b]/25"
                            : "border-[#dccfb8] bg-[#faf8f4] hover:border-neutral-800 hover:bg-white",
                        ].join(" ")}
                      >
                        <Smartphone className="h-6 w-6 text-[#b8923d]" strokeWidth={1.75} />
                        <p className="mt-3 font-display text-base font-semibold text-neutral-900">JazzCash</p>
                        <p className="mt-1.5 text-sm text-neutral-600">Mobile wallet</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("easypaisa")}
                        className={[
                          "rounded-xl border-2 p-5 text-left shadow-sm transition-all",
                          paymentMethod === "easypaisa"
                            ? "border-[#b8923d] bg-[#fffdf8] ring-2 ring-[#c9a55b]/25"
                            : "border-[#dccfb8] bg-[#faf8f4] hover:border-neutral-800 hover:bg-white",
                        ].join(" ")}
                      >
                        <Smartphone className="h-6 w-6 text-[#b8923d]" strokeWidth={1.75} />
                        <p className="mt-3 font-display text-base font-semibold text-neutral-900">Easypaisa</p>
                        <p className="mt-1.5 text-sm text-neutral-600">Mobile wallet</p>
                      </button>
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="mt-6 space-y-3 rounded-xl border-2 border-[#dccfb8] bg-[#faf8f4] px-5 py-5 sm:px-6">
                        {[
                          ["Bank name", "Himalaya Bank Ltd"],
                          ["Account title", "Himalaya Villas"],
                          ["Account number", "1234567890"],
                          ["IBAN", "PK12HIMA0001234567890"],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            className="flex flex-col gap-0.5 border-b border-[#eadfce] pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                          >
                            <span className="text-sm font-medium text-neutral-700">{k}</span>
                            <span className="text-[15px] font-semibold text-neutral-900 sm:text-right">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8">
                      <label className={fieldLabel}>
                        Your account number <span className="text-[#b8923d]">*</span>
                      </label>
                      <p className="mt-1 text-sm text-neutral-600">For bank transfer verification.</p>
                      <div className="mt-2.5 flex min-h-[48px] items-center gap-3 rounded-lg border-2 border-[#cfc0a6] bg-white px-4 shadow-sm transition-colors focus-within:border-neutral-900 focus-within:ring-4 focus-within:ring-neutral-900/10">
                        <Landmark className="h-5 w-5 shrink-0 text-[#b8923d]" strokeWidth={1.75} />
                        <input
                          type="text"
                          placeholder="Enter your account number"
                          className={inputWithIconInner}
                        />
                      </div>
                      <p className="mt-2 text-sm italic text-neutral-600">
                        Please transfer the amount and provide your account number for verification.
                      </p>
                    </div>

                    <div className="mt-8 flex gap-4 rounded-xl border-2 border-[#c9a55b]/50 bg-[#fffdf8] px-5 py-4 sm:px-6">
                      <Lock className="mt-0.5 h-6 w-6 shrink-0 text-[#b8923d]" strokeWidth={1.75} />
                      <div>
                        <p className="text-[15px] font-semibold text-neutral-900">Secure payment</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">
                          Your payment information is encrypted. We never store your full card details.
                        </p>
                      </div>
                    </div>

                    {submitError && (
                      <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                        {submitError}
                      </p>
                    )}

                    <p className="mt-4 text-sm text-neutral-600">
                      You must be signed in to submit. We will send this request to our booking team — status stays{" "}
                      <strong>Pending</strong> until a manager confirms it in the dashboard.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        disabled={submitting}
                        className="px-8 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => void submitStayBooking()}
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition disabled:opacity-60"
                      >
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                        Submit booking request
                      </button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="pb-16">
                    {/* Confirmation header */}
                    <div className="text-center px-4">
                      <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#c9a55b] shadow-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white">
                          <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                      <h2 className="mt-8 font-display text-4xl md:text-[44px] italic text-neutral-800">
                        Request received
                      </h2>
                      <p className="mt-3 text-[13px] text-neutral-600">
                        Thank you for choosing Himalaya Villas. Your booking is{" "}
                        <strong>{createdBooking?.status === "CONFIRMED" ? "confirmed" : "pending review"}</strong>.
                        {createdBooking?.status !== "CONFIRMED" ? (
                          <>
                            {" "}
                            Open <Link href="/dashboard/user" className="underline font-medium">My bookings</Link> to
                            track status.
                          </>
                        ) : null}
                      </p>
                      <div className="mt-6 inline-flex rounded-sm bg-neutral-800 px-6 py-2.5">
                        <span className="text-[11px] uppercase tracking-widest text-white">
                          Booking reference: {createdBooking?.reference ?? "—"}
                        </span>
                      </div>
                    </div>

                    {/* Your Reservation card */}
                    <div className="mt-12 bg-white border border-[#e8dfd0] shadow-sm px-6 md:px-10 py-10">
                      <p className="font-display text-xl italic text-neutral-900">Your Reservation</p>

                      <div className="mt-8 flex flex-col sm:flex-row gap-6">
                        <img
                          src={selectedVilla?.image ?? "/assets/villa-honeymoon-real.jpg"}
                          alt={selectedVilla?.title ?? "Villa"}
                          className="h-28 w-full sm:w-36 shrink-0 object-cover border border-[#eadfce]"
                        />
                        <div>
                          <p className="font-display text-xl text-neutral-900">
                            {selectedVilla?.title ?? "Honeymoon Chalet"}
                          </p>
                          <p className="mt-1 text-[12px] text-neutral-500">Romantic Collection</p>
                          <p className="mt-3 text-[11px] text-neutral-400">
                            {selectedVilla?.bedrooms ?? 1} Bedroom · {selectedVilla?.guests ?? 2} Guests ·{" "}
                            {selectedVilla?.size ?? "180m²"}
                          </p>
                        </div>
                      </div>

                      <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                        Stay Details
                      </p>
                      <div className="mt-6 grid grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                          {
                            label: "Check-in",
                            icon: CalendarLucide,
                            main: range?.from
                              ? range.from.toLocaleDateString(undefined, {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—",
                            sub: "After 3:00 PM",
                          },
                          {
                            label: "Check-out",
                            icon: CalendarLucide,
                            main: range?.to
                              ? range.to.toLocaleDateString(undefined, {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—",
                            sub: "Before 11:00 AM",
                          },
                          { label: "Guests", icon: User, main: guestsLabel, sub: "" },
                          {
                            label: "Duration",
                            icon: Clock,
                            main: stayNights > 0 ? `${stayNights} night${stayNights === 1 ? "" : "s"}` : "—",
                            sub: "",
                          },
                        ].map((row) => (
                          <div key={row.label} className="text-left">
                            <row.icon className="h-4 w-4 text-[#c9a55b]" strokeWidth={1.25} />
                            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                              {row.label}
                            </p>
                            <p className="mt-2 text-[13px] text-neutral-800">{row.main}</p>
                            {row.sub ? <p className="mt-1 text-[11px] text-neutral-500">{row.sub}</p> : null}
                          </div>
                        ))}
                      </div>

                      <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                        Guest Information
                      </p>
                      <div className="mt-4">
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400">Guest name</p>
                        <p className="mt-1 text-[14px] text-neutral-800">
                          {firstName} {lastName}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-6 text-[12px] text-neutral-600">
                          <span className="inline-flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#c9a55b]" strokeWidth={1.25} />
                            {email}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#c9a55b]" strokeWidth={1.25} />
                            {phone}
                          </span>
                        </div>
                      </div>

                      <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                        Payment information
                      </p>
                      <div className="mt-4 border border-[#eadfce] bg-[#fbf8f2] px-5 py-4 flex gap-4">
                        <Wallet className="h-5 w-5 shrink-0 text-[#c9a55b]" strokeWidth={1.25} />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-neutral-500">Payment method</p>
                          <p className="mt-1 text-[13px] text-neutral-900">
                            {paymentMethod === "card" && "Credit / debit card"}
                            {paymentMethod === "bank" && "Bank transfer"}
                            {paymentMethod === "jazzcash" && "JazzCash"}
                            {paymentMethod === "easypaisa" && "Easypaisa"}
                          </p>
                          <p className="mt-1 text-[11px] text-neutral-500">Pending manager confirmation</p>
                        </div>
                      </div>

                      <div className="mt-8 border border-[#eadfce] bg-[#fbf8f2] px-6 py-5 space-y-3">
                        <div className="flex items-center justify-between text-[12px] text-neutral-700">
                          <span>Subtotal</span>
                          <span>PKR {subtotalPkr.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[12px] text-neutral-700">
                          <span>Taxes &amp; Fees (16%)</span>
                          <span>PKR {taxesPkr.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[#eadfce]">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Total (quoted)
                          </span>
                          <span className="font-display text-2xl text-[#c9a55b]">
                            PKR {(createdBooking?.totalAmount ?? totalPkr).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                        Cancellation Policy
                      </p>
                      <div className="mt-4 border border-[#eadfce] bg-[#fbf8f2] px-5 py-4">
                        <ul className="space-y-2 text-[11px] text-neutral-600 leading-relaxed">
                          <li>• Free cancellation up to 7 days before check-in.</li>
                          <li>• 50% refund for cancellations 3–7 days before check-in.</li>
                          <li>• No refund for cancellations within 3 days of check-in.</li>
                          <li>• Modifications subject to availability and rate changes.</li>
                        </ul>
                      </div>
                    </div>

                    {/* What happens next */}
                    <div className="mt-14 px-2">
                      <p className="font-display text-2xl text-neutral-900">What Happens Next?</p>
                      <div className="mt-8 space-y-8">
                        {[
                          {
                            n: 1,
                            t: "Confirmation Email",
                            d: "You'll receive a confirmation email with your booking details and reference number.",
                          },
                          {
                            n: 2,
                            t: "Concierge Contact",
                            d: "Our concierge team will contact you within 24 hours to finalize payment and arrange any special services.",
                          },
                          {
                            n: 3,
                            t: "Pre-Arrival Information",
                            d: "You'll receive detailed arrival instructions and villa information one week before your check-in date.",
                          },
                        ].map((item) => (
                          <div key={item.n} className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c9a55b] text-sm font-semibold text-white">
                              {item.n}
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-neutral-800">{item.t}</p>
                              <p className="mt-4 text-[12px] text-neutral-500 leading-relaxed">{item.d}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                      <Link
                        href="/villas"
                        className="px-8 py-3 border border-neutral-400 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-white transition"
                      >
                        Back to Villas
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {step !== 6 && (
              <aside className="lg:col-span-4 space-y-6">
                <div className="rounded-xl bg-[#141414] text-white p-7 shadow-lg ring-1 ring-white/10">
                  <p className="font-display text-2xl font-medium not-italic tracking-tight text-white">Booking summary</p>
                  <div className="mt-5 h-px w-full bg-white/15" />

                  {step === 5 ? (
                    <>
                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Villa</p>
                        <p className="mt-2 text-[13px] font-semibold text-white">
                          {selectedVilla?.title ?? "Presidential Suite"}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Dates</p>
                        <p className="mt-2 text-[13px] font-semibold text-white">
                          {range?.from && range?.to
                            ? `${range.from.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${range.to.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
                            : "Mar 28 - Mar 31, 2026"}
                        </p>
                        <p className="mt-1 text-[11px] text-white/60">
                          {stayNights > 0 ? `${stayNights} night${stayNights === 1 ? "" : "s"}` : "Select dates"}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Guests</p>
                        <p className="mt-2 text-[13px] font-semibold text-white">{guestsLabel}</p>
                      </div>

                      <div className="mt-6 space-y-3 text-[12px]">
                        <div className="flex items-center justify-between text-white/85">
                          <span>
                            {selectedVilla && stayNights > 0
                              ? `PKR ${parseNightlyPkr(selectedVilla.price).toLocaleString()} × ${stayNights} night${stayNights === 1 ? "" : "s"}`
                              : "—"}
                          </span>
                          <span>PKR {subtotalPkr.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-white/85">
                          <span>Taxes &amp; Fees (16%)</span>
                          <span>PKR {taxesPkr.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/10 flex items-end justify-between gap-4">
                        <p className="text-[11px] uppercase tracking-widest text-white/70">Total Amount</p>
                        <p className="font-display text-2xl text-[#c9a55b]">PKR {totalPkr.toLocaleString()}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a55b]">Dates</p>
                        <p className="mt-2 text-[15px] font-medium leading-snug text-white">
                          {range?.from ? range.from.toLocaleDateString(undefined, { month: "short", day: "2-digit" }) : "—"}
                          {range?.to
                            ? ` – ${range.to.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}`
                            : ""}
                        </p>
                        <p className="mt-2 text-sm text-white/75">
                          {range?.from && range?.to && stayNights > 0
                            ? `${stayNights} night${stayNights === 1 ? "" : "s"}`
                            : "Select dates"}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#c9a55b]">Guests</p>
                        <p className="mt-2 text-[15px] font-medium text-white">{adults} adults</p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/15">
                        <p className="text-sm leading-relaxed text-white/80">
                          Complete your booking to see the full total.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="rounded-xl border-2 border-[#dccfb8] bg-white p-6 shadow-sm">
                  <div className="space-y-5">
                    {[
                      { t: "Secure booking", d: "SSL encrypted checkout", Icon: Shield },
                      { t: "Privacy protected", d: "Your data stays confidential", Icon: Lock },
                      { t: "Best price guarantee", d: "No hidden fees on our rates", Icon: Check },
                    ].map((row) => (
                      <div key={row.t} className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9a55b]/15">
                          <row.Icon className="h-5 w-5 text-[#8b6914]" strokeWidth={2} />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-neutral-900">{row.t}</p>
                          <p className="mt-1 text-sm leading-snug text-neutral-700">{row.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BookStayFallback() {
  return (
    <div className="min-h-screen bg-[#F6F1EA] px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">Book Your Stay</h1>
        <p className="mt-3 max-w-3xl text-neutral-700">
          Plan your stay at Himalaya Villas. Choose your villa, select dates, and complete your reservation details.
        </p>
        <div className="mt-8 rounded-lg border border-[#eadfce] bg-white p-6">
          <h2 className="text-xl font-semibold text-neutral-900">Available villas</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="rounded border border-[#dccfb8] bg-[#faf8f4] p-4">
              <p className="font-semibold text-neutral-900">Presidential Suite</p>
              <p className="mt-1 text-sm text-neutral-600">Ultra-private mountain-view suite for premium stays.</p>
            </li>
            <li className="rounded border border-[#dccfb8] bg-[#faf8f4] p-4">
              <p className="font-semibold text-neutral-900">Alpine Family Lodge</p>
              <p className="mt-1 text-sm text-neutral-600">Spacious villa ideal for families and group stays.</p>
            </li>
            <li className="rounded border border-[#dccfb8] bg-[#faf8f4] p-4">
              <p className="font-semibold text-neutral-900">Honeymoon Chalet</p>
              <p className="mt-1 text-sm text-neutral-600">Private, romantic retreat with scenic Himalayan views.</p>
            </li>
          </ul>
          <p className="mt-5 text-sm text-neutral-600">
            The interactive booking form loads automatically. If JavaScript is disabled, browse all villas on the villas page.
          </p>
          <Link
            href="/villas"
            className="mt-4 inline-block border border-neutral-300 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:bg-neutral-50"
          >
            View all villas
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookStayPage() {
  return (
    <Suspense fallback={<BookStayFallback />}>
      <BookStayContent />
    </Suspense>
  );
}
