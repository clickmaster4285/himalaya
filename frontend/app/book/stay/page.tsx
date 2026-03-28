"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DetailNavbar from "@/components/DetailNavbar";
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
  Lock,
  Mail,
  Phone,
  Shield,
  Smartphone,
  User,
  Wallet,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const steps = [
  { n: 1 as Step, label: "Dates & Guests" },
  { n: 2 as Step, label: "Select Villa" },
  { n: 3 as Step, label: "Guest Details" },
  { n: 4 as Step, label: "Review Booking" },
  { n: 5 as Step, label: "Payment" },
] as const;

const stepIcons: Record<Step, React.ComponentType<{ className?: string }>> = {
  1: CalendarDays,
  2: Home,
  3: User,
  4: Check,
  5: CreditCard,
  6: Check,
};

function StepDot({ step, active, done }: { step: Step; active: boolean; done: boolean }) {
  const Icon = stepIcons[step];
  return (
    <div
      className={[
        "h-9 w-9 rounded-full flex items-center justify-center",
        done || active ? "bg-neutral-900 text-white" : "bg-[#efe7da] text-neutral-500",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

export default function BookStayPage({ searchParams }: { searchParams?: { step?: string; villa?: string } }) {
  const initialStep = (Number(searchParams?.step ?? 1) || 1) as Step;
  const [step, setStep] = useState<Step>(
    (initialStep >= 1 && initialStep <= 6 ? initialStep : 1) as Step,
  );

  const selectedVillaSlug = (searchParams?.villa ?? "").toString();
  const [villaCatalog, setVillaCatalog] = useState<Villa[]>([]);

  useEffect(() => {
    fetch("/api/villas")
      .then((r) => r.json())
      .then((d) => setVillaCatalog(Array.isArray(d.villas) ? d.villas : []))
      .catch(() => setVillaCatalog([]));
  }, []);

  const selectedVilla = useMemo(() => {
    if (!selectedVillaSlug) return undefined;
    const n = decodeURIComponent(selectedVillaSlug).trim().toLowerCase();
    return villaCatalog.find((v) => v.slug === n);
  }, [selectedVillaSlug, villaCatalog]);

  const villaOptions = useMemo(() => villaCatalog, [villaCatalog]);

  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "jazzcash" | "easypaisa">("bank");

  const totalGuests = adults + children;
  const guestsLabel = `${adults} Adults, ${children} Children`;

  const subtotalPkr = 340_000;
  const taxesPkr = 54_400;
  const totalPkr = subtotalPkr + taxesPkr;

  const bookingRef = "HV-87451072";
  const confirmedSubtotal = 90_000;
  const confirmedTax = 14_400;
  const confirmedTotal = 104_400;

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <DetailNavbar />

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
            <p className="mt-3 text-[12px] md:text-[13px] text-neutral-500/90 max-w-2xl">
              Choose the perfect experience and let us create unforgettable memories for you
            </p>
          </>
        )}

        <div className={step === 6 ? "mt-8" : "mt-10 bg-[#fbf8f2] border border-[#eadfce]"}>
          {/* Stepper */}
          {step !== 6 && (
            <div className="px-6 md:px-10 py-8 border-b border-[#eadfce]">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                {steps.map((s, idx) => {
                  const active = step === s.n;
                  const done = step > s.n;
                  const isLast = idx === steps.length - 1;
                  return (
                    <div key={s.n} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <StepDot step={s.n} active={active} done={done} />
                        {!isLast && (
                          <div className="hidden md:block h-px w-28 bg-[#eadfce] mt-4" />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className="text-[11px] uppercase tracking-widest text-neutral-500">Step {s.n}</p>
                        <p className="text-[12px] text-neutral-700 mt-1">{s.label}</p>
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
                {step === 1 && (
                  <div className="p-8">
                    <p className="text-[12px] text-neutral-800 mb-6">When would you like to stay?</p>

                    <div className="border border-[#eadfce] bg-[#fbf8f2] px-4 py-6">
                      <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={range}
                        onSelect={setRange}
                        className="w-full"
                        classNames={{
                          months: "flex flex-col md:flex-row md:gap-12 gap-8 justify-center",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center",
                          caption_label:
                            "text-[12px] tracking-wide text-neutral-800",
                          nav: "space-x-0 flex items-center",
                          nav_button:
                            "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 text-neutral-700",
                          nav_button_previous: "absolute left-0",
                          nav_button_next: "absolute right-0",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex justify-between",
                          head_cell:
                            "text-neutral-500/80 rounded-md w-9 font-normal text-[10px] uppercase tracking-widest",
                          row: "flex w-full mt-2 justify-between",
                          cell:
                            "h-9 w-9 text-center text-[11px] p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected])]:bg-neutral-900 focus-within:relative focus-within:z-20",
                          day:
                            "h-9 w-9 p-0 font-normal text-neutral-700 hover:bg-neutral-900 hover:text-white rounded-full transition-colors",
                          day_selected:
                            "bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white focus:bg-neutral-900 focus:text-white rounded-full",
                          day_range_start:
                            "day-range-start bg-neutral-900 text-white rounded-full",
                          day_range_end:
                            "day-range-end bg-neutral-900 text-white rounded-full",
                          day_range_middle:
                            "aria-selected:bg-neutral-900 aria-selected:text-white rounded-none",
                          day_outside:
                            "day-outside text-neutral-400/60 opacity-70 aria-selected:bg-neutral-900/80 aria-selected:text-white/80",
                          day_disabled: "text-neutral-300 opacity-60",
                          day_today: "bg-white text-neutral-900",
                        }}
                      />
                    </div>

                    <div className="mt-10">
                      <p className="text-[12px] text-neutral-800 mb-4">Number of Guests</p>

                      <div className="border border-[#eadfce]">
                        <div className="px-6 py-5 flex items-center justify-between border-b border-[#eadfce] bg-[#fbf8f2]">
                          <div className="flex items-center gap-3">
                            <span className="text-[#c9a55b]">👤</span>
                            <div>
                              <p className="text-[12px] text-neutral-900">Adults</p>
                              <p className="text-[11px] text-neutral-500 mt-1">Age 13+</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setAdults((p) => Math.max(1, p - 1))}
                              className="h-7 w-7 border border-[#d9c7a7] bg-white text-neutral-700 hover:bg-neutral-50"
                              aria-label="Decrease adults"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-[12px] text-neutral-700">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setAdults((p) => Math.min(9, p + 1))}
                              className="h-7 w-7 border border-[#d9c7a7] bg-white text-neutral-700 hover:bg-neutral-50"
                              aria-label="Increase adults"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="px-6 py-5 flex items-center justify-between bg-[#fbf8f2]">
                          <div className="flex items-center gap-3">
                            <span className="text-[#c9a55b]">🧒</span>
                            <div>
                              <p className="text-[12px] text-neutral-900">Children</p>
                              <p className="text-[11px] text-neutral-500 mt-1">Age 0-12</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setChildren((p) => Math.max(0, p - 1))}
                              className="h-7 w-7 border border-[#d9c7a7] bg-white text-neutral-700 hover:bg-neutral-50"
                              aria-label="Decrease children"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-[12px] text-neutral-700">{children}</span>
                            <button
                              type="button"
                              onClick={() => setChildren((p) => Math.min(9, p + 1))}
                              className="h-7 w-7 border border-[#d9c7a7] bg-white text-neutral-700 hover:bg-neutral-50"
                              aria-label="Increase children"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-widest">Total Guests</p>
                            <p className="text-[12px] mt-1">{String(totalGuests).padStart(2, "0")}</p>
                          </div>
                          <p className="text-[11px] uppercase tracking-widest text-white/90">{guestsLabel}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="text-[12px] text-neutral-800 mb-4">Choose Your Villa</p>
                    <div className="space-y-3">
                      {villaOptions.map((v) => (
                        <button
                          key={v.slug}
                          type="button"
                          className={[
                            "w-full border border-[#eadfce] bg-[#fbf8f2] p-4 text-left hover:bg-white transition",
                            selectedVillaSlug === v.slug ? "outline outline-2 outline-neutral-900" : "",
                          ].join(" ")}
                        >
                          <div className="flex items-center gap-4">
                            <img src={v.image} alt={v.title} className="h-14 w-20 object-cover border border-[#eadfce]" />
                            <div className="flex-1">
                              <p className="text-[13px] text-neutral-900">{v.title}</p>
                              <p className="text-[11px] text-neutral-500 mt-1">{v.description}</p>
                              <p className="text-[11px] text-neutral-500 mt-1">{v.price}</p>
                            </div>
                            <span className="text-[#c9a55b]">★</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-neutral-300 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="px-8 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="p-8">
                    <p className="font-display text-[14px] text-neutral-900">Your Details</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          First Name <span className="text-[#c9a55b]">*</span>
                        </p>
                        <input
                          defaultValue="John"
                          className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf8f2] text-[12px] text-neutral-700 focus:outline-none focus:bg-white"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          Last Name <span className="text-[#c9a55b]">*</span>
                        </p>
                        <input
                          defaultValue="John"
                          className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf8f2] text-[12px] text-neutral-700 focus:outline-none focus:bg-white"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          Email Address <span className="text-[#c9a55b]">*</span>
                        </p>
                        <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf8f2] px-4 h-10">
                          <span className="text-[#c9a55b]">✉</span>
                          <input
                            defaultValue="john.doe@example.com"
                            className="w-full bg-transparent text-[12px] text-neutral-700 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          Phone Number <span className="text-[#c9a55b]">*</span>
                        </p>
                        <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf8f2] px-4 h-10">
                          <span className="text-[#c9a55b]">☎</span>
                          <input
                            defaultValue="+92 300 1234567"
                            className="w-full bg-transparent text-[12px] text-neutral-700 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Special Requests</p>
                        <textarea
                          defaultValue="Any special requirements or preferences..."
                          className="mt-2 w-full min-h-[120px] px-4 py-3 border border-[#eadfce] bg-[#fbf8f2] text-[12px] text-neutral-600 focus:outline-none focus:bg-white resize-none"
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
                  <div className="p-8">
                    <p className="font-display text-[14px] text-neutral-900">Review Your Booking</p>

                    {/* Selected villa summary */}
                    <div className="mt-6 border border-[#eadfce] bg-[#fbf8f2]">
                      <div className="p-5 flex items-center gap-4">
                        <img
                          src={(selectedVilla?.image ?? "/assets/villa-presidential-real.jpg")}
                          alt={selectedVilla?.title ?? "Selected villa"}
                          className="h-14 w-20 object-cover border border-[#eadfce]"
                        />
                        <div className="flex-1">
                          <p className="text-[13px] text-neutral-900">{selectedVilla?.title ?? "Alpine Family Lodge"}</p>
                          <p className="text-[11px] text-neutral-500 mt-1">
                            {adults} Adults, {children} children · {selectedVilla?.size ?? "450m²"}
                          </p>
                          <p className="text-[11px] text-neutral-500 mt-1">{selectedVilla?.price ?? "PKR 39,000"}</p>
                        </div>
                        <span className="text-[#c9a55b] text-sm">★</span>
                      </div>
                    </div>

                    {/* Booking details */}
                    <div className="mt-6 border border-[#eadfce] bg-white">
                      <div className="px-5 py-4 border-b border-[#eadfce] flex items-center justify-between bg-[#fbf8f2]">
                        <p className="text-[11px] uppercase tracking-widest text-neutral-600">Booking Details</p>
                        <span className="text-[#c9a55b] text-xs">✎</span>
                      </div>
                      <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Check In</p>
                          <p className="mt-2 text-[12px] text-neutral-800">
                            {range?.from ? range.from.toLocaleDateString() : "Mar 28, 2026"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Check Out</p>
                          <p className="mt-2 text-[12px] text-neutral-800">
                            {range?.to ? range.to.toLocaleDateString() : "Mar 31, 2026"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Guests</p>
                          <p className="mt-2 text-[12px] text-neutral-800">{guestsLabel}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Nights</p>
                          <p className="mt-2 text-[12px] text-neutral-800">4</p>
                        </div>
                      </div>
                    </div>

                    {/* Guest information */}
                    <div className="mt-6 border border-[#eadfce] bg-white">
                      <div className="px-5 py-4 border-b border-[#eadfce] flex items-center justify-between bg-[#fbf8f2]">
                        <p className="text-[11px] uppercase tracking-widest text-neutral-600">Guest Information</p>
                        <span className="text-[#c9a55b] text-xs">✎</span>
                      </div>
                      <div className="px-5 py-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">First Name</p>
                          <p className="text-[12px] text-neutral-800">John</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Email</p>
                          <p className="text-[12px] text-neutral-800">john.doe@example.com</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Phone</p>
                          <p className="text-[12px] text-neutral-800">+92 300 1234567</p>
                        </div>
                        <div className="pt-2">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Special Requests</p>
                          <div className="mt-2 border border-[#eadfce] bg-[#fbf8f2] px-4 py-3 text-[12px] text-neutral-600">
                            I would like an extra bed in my room
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation policy */}
                    <div className="mt-6 border border-[#eadfce] bg-[#fbf8f2] px-5 py-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">Cancellation Policy</p>
                      <ul className="mt-4 space-y-2 text-[11px] text-neutral-600">
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
                  <div className="p-8">
                    <p className="font-display text-[14px] text-neutral-900">Secure Payment</p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={[
                          "text-left border p-5 transition-colors bg-[#fbf8f2]",
                          paymentMethod === "card" ? "border-[#c9a55b] bg-[#f5f0e6]" : "border-[#eadfce] hover:bg-white",
                        ].join(" ")}
                      >
                        <CreditCard className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                        <p className="mt-3 font-display text-[13px] text-neutral-900">Credit/Debit Card</p>
                        <p className="mt-1 text-[11px] text-neutral-500">Visa, Mastercard, American Express</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bank")}
                        className={[
                          "text-left border p-5 transition-colors bg-[#fbf8f2]",
                          paymentMethod === "bank" ? "border-[#c9a55b] bg-[#f5f0e6]" : "border-[#eadfce] hover:bg-white",
                        ].join(" ")}
                      >
                        <Landmark className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                        <p className="mt-3 font-display text-[13px] text-neutral-900">Bank Transfer</p>
                        <p className="mt-1 text-[11px] text-neutral-500">Direct bank transfer</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("jazzcash")}
                        className={[
                          "text-left border p-5 transition-colors bg-[#fbf8f2]",
                          paymentMethod === "jazzcash" ? "border-[#c9a55b] bg-[#f5f0e6]" : "border-[#eadfce] hover:bg-white",
                        ].join(" ")}
                      >
                        <Smartphone className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                        <p className="mt-3 font-display text-[13px] text-neutral-900">JazzCash</p>
                        <p className="mt-1 text-[11px] text-neutral-500">Mobile wallet payment</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("easypaisa")}
                        className={[
                          "text-left border p-5 transition-colors bg-[#fbf8f2]",
                          paymentMethod === "easypaisa" ? "border-[#c9a55b] bg-[#f5f0e6]" : "border-[#eadfce] hover:bg-white",
                        ].join(" ")}
                      >
                        <Smartphone className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                        <p className="mt-3 font-display text-[13px] text-neutral-900">Easypaisa</p>
                        <p className="mt-1 text-[11px] text-neutral-500">Mobile wallet payment</p>
                      </button>
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="mt-6 border border-[#eadfce] bg-[#f5f0e6] px-6 py-5 space-y-3">
                        {[
                          ["Bank Name", "Himalaya Bank Ltd"],
                          ["Account Title", "Himalaya Villas"],
                          ["Account Number", "1234567890"],
                          ["IBAN", "PK12HIMA0001234567890"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between gap-4 text-[12px]">
                            <span className="text-neutral-600">{k}</span>
                            <span className="text-neutral-900 font-medium text-right">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                        Your Account Number <span className="text-[#c9a55b]">*</span>
                      </p>
                      <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf8f2] px-4 h-11">
                        <Landmark className="h-4 w-4 shrink-0 text-[#c9a55b]" strokeWidth={1.25} />
                        <input
                          type="text"
                          placeholder="Enter your account number"
                          className="w-full bg-transparent text-[12px] text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
                        />
                      </div>
                      <p className="mt-2 text-[11px] italic text-neutral-500">
                        Please transfer the amount and provide your account number for verification.
                      </p>
                    </div>

                    <div className="mt-8 border border-[#c9a55b]/60 bg-[#fbf8f2] px-5 py-4 flex gap-4">
                      <Lock className="h-5 w-5 shrink-0 text-[#c9a55b]" strokeWidth={1.25} />
                      <div>
                        <p className="text-[12px] font-medium text-neutral-900">Secure Payment</p>
                        <p className="mt-1 text-[11px] text-neutral-600 leading-relaxed">
                          Your payment information is encrypted and secure. We never store your card details.
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-8 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(6)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition"
                      >
                        Complete Payment
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
                        Booking Confirmed!
                      </h2>
                      <p className="mt-3 text-[13px] text-neutral-600">
                        Thank you for choosing Himalaya Villas
                      </p>
                      <div className="mt-6 inline-flex rounded-sm bg-neutral-800 px-6 py-2.5">
                        <span className="text-[11px] uppercase tracking-widest text-white">
                          Booking Reference: {bookingRef}
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
                            main: "April 14, 2026",
                            sub: "After 3:00 PM",
                          },
                          {
                            label: "Check-out",
                            icon: CalendarLucide,
                            main: "April 16, 2026",
                            sub: "Before 11:00 AM",
                          },
                          { label: "Guests", icon: User, main: "2 Adults", sub: "" },
                          { label: "Duration", icon: Clock, main: "2 Nights", sub: "" },
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
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400">Guest Name</p>
                        <p className="mt-1 text-[14px] text-neutral-800">S S</p>
                        <div className="mt-4 flex flex-wrap items-center gap-6 text-[12px] text-neutral-600">
                          <span className="inline-flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#c9a55b]" strokeWidth={1.25} />
                            john.doe@example.com
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#c9a55b]" strokeWidth={1.25} />
                            +92 300 1234567
                          </span>
                        </div>
                      </div>

                      <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                        Payment Information
                      </p>
                      <div className="mt-4 border border-[#eadfce] bg-[#fbf8f2] px-5 py-4 flex gap-4">
                        <Wallet className="h-5 w-5 shrink-0 text-[#c9a55b]" strokeWidth={1.25} />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-neutral-500">Payment Method</p>
                          <p className="mt-1 text-[13px] text-neutral-900">Easypaisa</p>
                          <p className="mt-1 text-[11px] text-neutral-500">N/A</p>
                        </div>
                      </div>

                      <div className="mt-8 border border-[#eadfce] bg-[#fbf8f2] px-6 py-5 space-y-3">
                        <div className="flex items-center justify-between text-[12px] text-neutral-700">
                          <span>Subtotal</span>
                          <span>PKR {confirmedSubtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-[12px] text-neutral-700">
                          <span>Taxes &amp; Fees (16%)</span>
                          <span>PKR {confirmedTax.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[#eadfce]">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                            Total Paid
                          </span>
                          <span className="font-display text-2xl text-[#c9a55b]">
                            PKR {confirmedTotal.toLocaleString()}
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
                <div className="bg-[#1a1a1a] text-white p-7">
                  <p className="font-display italic text-2xl text-white">Booking Summary</p>
                  <div className="mt-5 h-px w-full bg-white/10" />

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
                        <p className="mt-1 text-[11px] text-white/60">4 nights</p>
                      </div>

                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Guests</p>
                        <p className="mt-2 text-[13px] font-semibold text-white">{adults} Adults</p>
                      </div>

                      <div className="mt-6 space-y-3 text-[12px]">
                        <div className="flex items-center justify-between text-white/85">
                          <span>PKR 85,000 x 4 nights</span>
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
                        <p className="text-[11px] uppercase tracking-widest text-white/60">Dates</p>
                        <p className="mt-2 text-[12px] text-white/90">
                          {range?.from ? range.from.toLocaleDateString(undefined, { month: "short", day: "2-digit" }) : "—"}
                          {range?.to
                            ? ` - ${range.to.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}`
                            : ""}
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-widest text-white/60">
                          {range?.from && range?.to ? "4 nights" : "Select dates"}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-[11px] uppercase tracking-widest text-white/60">Guests</p>
                        <p className="mt-2 text-[12px] text-white/90">{adults} Adults</p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/10">
                        <p className="text-[11px] text-white/60">
                          Complete your booking details to see the total cost
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-white border border-[#eadfce] p-6">
                  <div className="space-y-4">
                    {[
                      { t: "Secure Booking", d: "SSL Encrypted", Icon: Shield },
                      { t: "Privacy Protected", d: "Your data is safe", Icon: Lock },
                      { t: "Best Price Guarantee", d: "No hidden fees", Icon: Check },
                    ].map((row) => (
                      <div key={row.t} className="flex items-start gap-3">
                        <row.Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a55b]" strokeWidth={1.25} />
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-neutral-700">{row.t}</p>
                          <p className="text-[11px] text-neutral-500 mt-1">{row.d}</p>
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

