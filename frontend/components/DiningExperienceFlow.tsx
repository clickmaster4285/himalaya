"use client";

import Link from "next/link";
import { useState } from "react";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import type { DateRange } from "react-day-picker";
import LuxuryBookingCalendar, { defaultDiningRange, formatRangeLabel } from "@/components/LuxuryBookingCalendar";
import {
  CalendarDays,
  Check,
  ChefHat,
  Clock,
  Coffee,
  CreditCard,
  Heart,
  Landmark,
  Lock,
  Mail,
  Phone,
  Shield,
  Smartphone,
  User,
  UtensilsCrossed,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const stepsConfig: { n: Step; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { n: 1, label: "Dates", Icon: CalendarDays },
  { n: 2, label: "Dining Type", Icon: UtensilsCrossed },
  { n: 3, label: "Menu", Icon: ChefHat },
  { n: 4, label: "Details", Icon: User },
  { n: 5, label: "Payment", Icon: CreditCard },
];

const diningTypes = [
  {
    id: "private",
    name: "Private Dining",
    sub: "Piscina",
    price: 15_000,
    Icon: Heart,
  },
  {
    id: "dinner",
    name: "Dinner",
    sub: "7:00 PM - 11:30 PM",
    price: 5_000,
    Icon: Clock,
  },
  {
    id: "breakfast",
    name: "Breakfast",
    sub: "7:00 AM - 11:00 AM",
    price: 2_500,
    Icon: Coffee,
  },
  {
    id: "lunch",
    name: "Lunch",
    sub: "12:00 PM - 4:30 PM",
    price: 3_500,
    Icon: UtensilsCrossed,
  },
];

const menus = [
  { id: "continental", name: "Continental Cuisine", sub: "European delicacies", add: 3_000 },
  { id: "pakistani", name: "Pakistani Cuisine", sub: "Authentic flavors", add: 2_500 },
  { id: "chinese", name: "Chinese Cuisine", sub: "Asian specialties", add: 2_800 },
  { id: "bbq", name: "BBQ & Grill", sub: "Smoked & grilled", add: 4_000 },
  { id: "veg", name: "Vegetarian Special", sub: "Plant-based options", add: 2_200 },
];

function StepDot({
  Icon,
  active,
  done,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  done: boolean;
}) {
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

export default function DiningExperienceFlow() {
  const [step, setStep] = useState<Step>(1);
  const [diningRange, setDiningRange] = useState<DateRange | undefined>(defaultDiningRange);
  const [preferredTime, setPreferredTime] = useState("09:00 AM");
  const [guests, setGuests] = useState(2);
  const [diningTypeId, setDiningTypeId] = useState("private");
  const [menuId, setMenuId] = useState("continental");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "jazzcash" | "easypaisa">("bank");

  const dt = diningTypes.find((d) => d.id === diningTypeId) ?? diningTypes[0];
  const menu = menus.find((m) => m.id === menuId) ?? menus[0];

  const dateLabel = formatRangeLabel(diningRange);

  const bookingRef = "HV-55688204";

  return (
    <div className="min-h-screen bg-[#F5F0E1]">
      <DetailNavbar />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-14">
        <div className="flex items-center gap-3 text-neutral-700">
          <span className="text-base">↩</span>
          <Link
            href={step === 6 ? "/book" : "/villas"}
            className="text-[11px] md:text-[12px] tracking-[0.15em] uppercase hover:underline"
          >
            {step === 6 ? "Back To Main menu" : "Back to destinations"}
          </Link>
        </div>

        {step !== 6 && (
          <>
            <h1 className="mt-6 font-display text-[44px] leading-[1.05] md:text-[56px] text-neutral-900">
              Dining Experience
            </h1>
            <p className="mt-3 text-[12px] md:text-[13px] text-neutral-500/90 max-w-2xl">
              Savor the finest flavors in a luxurious mountain setting
            </p>
          </>
        )}

        <div className={step === 6 ? "mt-8" : "mt-10 bg-[#fbf8f2] border border-[#eadfce]"}>
          {step !== 6 && (
            <div className="px-6 md:px-10 py-8 border-b border-[#eadfce]">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                {stepsConfig.map((s, idx) => {
                  const active = step === s.n;
                  const done = step > s.n;
                  const isLast = idx === stepsConfig.length - 1;
                  return (
                    <div key={s.n} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <StepDot Icon={s.Icon} active={active} done={done} />
                        {!isLast && <div className="hidden md:block h-px w-28 bg-[#eadfce] mt-4" />}
                      </div>
                      <div className="pt-1">
                        <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Step {s.n}</p>
                        <p className="text-[12px] text-neutral-700 mt-1">{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={step === 6 ? "px-0 py-0" : "px-6 md:px-10 py-10"}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div
                className={
                  step === 6
                    ? "lg:col-span-12 max-w-[920px] mx-auto w-full"
                    : "lg:col-span-8 bg-white border border-[#eadfce]"
                }
              >
                {/* Step 1 */}
                {step === 1 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Select Date &amp; Time</p>
                    <div className="mt-6">
                      <LuxuryBookingCalendar
                        range={diningRange}
                        onRangeChange={setDiningRange}
                        defaultMonth={diningRange?.from}
                      />
                    </div>

                    <div className="mt-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">
                        Preferred Time
                      </p>
                      <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf8f2] px-4 h-11">
                        <Clock className="h-4 w-4 text-[#c9a55b]" />
                        <input
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="flex-1 bg-transparent text-[12px] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500 flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-[#c9a55b]" />
                        Number of Guests
                      </p>
                      <div className="mt-2 inline-flex items-center gap-4 border border-[#eadfce] bg-[#fbf8f2] px-4 py-2">
                        <button
                          type="button"
                          className="h-8 w-8 border border-[#d9c7a7] bg-white text-neutral-800"
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[13px]">{guests}</span>
                        <button
                          type="button"
                          className="h-8 w-8 border border-[#d9c7a7] bg-white text-neutral-800"
                          onClick={() => setGuests((g) => Math.min(20, g + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Select Dining Experience</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {diningTypes.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDiningTypeId(d.id)}
                          className={[
                            "text-left border p-6 relative",
                            diningTypeId === d.id
                              ? "border-[#c9a55b] bg-[#f5f0e6]"
                              : "border-[#eadfce] bg-white hover:bg-[#fbf8f2]",
                          ].join(" ")}
                        >
                          {diningTypeId === d.id && (
                            <span className="absolute top-4 right-4 text-[#c9a55b] text-lg">✓</span>
                          )}
                          <d.Icon className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                          <p className="mt-4 font-display text-lg font-semibold text-neutral-900">{d.name}</p>
                          <p className="mt-1 text-[12px] text-neutral-500">{d.sub}</p>
                          <p className="mt-4 text-[10px] uppercase tracking-widest text-neutral-500">Package Price</p>
                          <p className="mt-1 text-[14px] font-semibold text-neutral-900">
                            PKR {d.price.toLocaleString()} / person
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-8 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Choose Your Menu</p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {menus.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMenuId(m.id)}
                          className={[
                            "text-left border p-5 relative",
                            menuId === m.id
                              ? "border-[#c9a55b] bg-[#f5f0e6]"
                              : "border-[#eadfce] bg-white hover:bg-[#fbf8f2]",
                          ].join(" ")}
                        >
                          {menuId === m.id && (
                            <span className="absolute top-3 right-3 text-[#c9a55b]">✓</span>
                          )}
                          <p className="font-display text-[15px] text-neutral-900">{m.name}</p>
                          <p className="mt-1 text-[12px] text-neutral-400">{m.sub}</p>
                          <div className="mt-3 h-px bg-[#eadfce]" />
                          <p className="mt-3 text-[10px] uppercase tracking-widest text-neutral-400">Package Price</p>
                          <p className="mt-1 text-[13px] text-neutral-800">+ PKR {m.add.toLocaleString()} / person</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-8 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Yours Details</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          First Name <span className="text-[#c9a55b]">*</span>
                        </p>
                        <input className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf9f4] text-[12px] focus:outline-none" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          Last Name <span className="text-[#c9a55b]">*</span>
                        </p>
                        <input className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf9f4] text-[12px] focus:outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          Email Address <span className="text-[#c9a55b]">*</span>
                        </p>
                        <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf9f4] px-4 h-10">
                          <Mail className="h-4 w-4 text-[#c9a55b]" />
                          <input className="flex-1 bg-transparent text-[12px] focus:outline-none" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                          Phone Number <span className="text-[#c9a55b]">*</span>
                        </p>
                        <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf9f4] px-4 h-10">
                          <Phone className="h-4 w-4 text-[#c9a55b]" />
                          <input className="flex-1 bg-transparent text-[12px] focus:outline-none" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Special Requests</p>
                        <textarea
                          className="mt-2 w-full min-h-[120px] px-4 py-3 border border-[#eadfce] bg-[#fbf9f4] text-[12px] resize-none focus:outline-none"
                          placeholder="Allergies, occasion, seating preferences…"
                        />
                      </div>
                    </div>
                    <div className="mt-10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-8 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="px-10 py-3 bg-[#1f2120] text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800"
                      >
                        Proceed To Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5 */}
                {step === 5 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Secure Payment</p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "card" as const, title: "Credit/Debit Card", sub: "Visa, Mastercard, Amex", Icon: CreditCard },
                        { id: "bank" as const, title: "Bank Transfer", sub: "Direct bank transfer", Icon: Landmark },
                        { id: "jazzcash" as const, title: "JazzCash", sub: "Mobile wallet payment", Icon: Smartphone },
                        { id: "easypaisa" as const, title: "Easypaisa", sub: "Mobile wallet payment", Icon: Smartphone },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={[
                            "text-left border p-5 bg-[#fbf8f2]",
                            paymentMethod === opt.id ? "border-[#c9a55b] bg-[#f5f0e6]" : "border-[#eadfce]",
                          ].join(" ")}
                        >
                          <opt.Icon className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                          <p className="mt-3 font-display text-[13px] text-neutral-900">{opt.title}</p>
                          <p className="mt-1 text-[11px] text-neutral-500">{opt.sub}</p>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="mt-6 border border-[#eadfce] bg-[#f5f0e6] px-6 py-5 space-y-2">
                        {[
                          ["Bank Name", "Himalaya Bank Ltd"],
                          ["Account Title", "Himalaya Villas"],
                          ["Account Number", "1234567890"],
                          ["IBAN", "PK12HIMA0001234567890"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between text-[12px]">
                            <span className="text-neutral-600">{k}</span>
                            <span className="text-neutral-900 font-medium">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                        Your Account Number <span className="text-[#c9a55b]">*</span>
                      </p>
                      <div className="mt-2 flex items-center gap-3 border border-[#eadfce] bg-[#fbf8f2] px-4 h-11">
                        <Lock className="h-4 w-4 text-[#c9a55b]" />
                        <input
                          placeholder="Enter your account number"
                          className="flex-1 bg-transparent text-[12px] focus:outline-none"
                        />
                      </div>
                      <p className="mt-2 text-[11px] italic text-neutral-500">
                        Please enter the account detail/wallet account number for verification.
                      </p>
                    </div>

                    <div className="mt-6 border border-[#c9a55b]/40 bg-[#f7f1e6] px-5 py-4 flex gap-3">
                      <Lock className="h-5 w-5 text-[#c9a55b] shrink-0" />
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        <span className="font-medium text-neutral-800">Secure Payment.</span> Your payment information is
                        encrypted and secure. We never store your card details.
                      </p>
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-8 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(6)}
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800"
                      >
                        Complete Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 6 */}
                {step === 6 && (
                  <div className="pb-16 px-4">
                    <div className="text-center">
                      <div className="mx-auto h-[72px] w-[72px] rounded-full bg-[#c4a47c] flex items-center justify-center">
                        <Check className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h2 className="mt-8 font-display text-4xl md:text-[44px] italic text-neutral-800">
                        Booking Request Received!
                      </h2>
                      <p className="mt-3 text-[13px] text-neutral-600">Thank you for choosing Himalaya Villas</p>
                      <div className="mt-6 inline-block rounded-sm bg-[#1a1d1b] px-6 py-2.5">
                        <span className="text-[11px] text-white tracking-wide">Booking Reference: {bookingRef}</span>
                      </div>
                    </div>

                    <div className="mt-12 bg-white border border-[#eadfce] shadow-sm rounded-sm px-8 py-10 max-w-2xl mx-auto">
                      <p className="font-display text-xl italic text-neutral-900">What Happens Next?</p>
                      <div className="mt-8 space-y-8">
                        {[
                          {
                            n: 1,
                            t: "Email Confirmation",
                            d: "You'll receive a confirmation email with all your booking details within 15 minutes.",
                          },
                          {
                            n: 2,
                            t: "Team Contact",
                            d: "Our team will contact you within 24 hours to finalize details and payment options.",
                          },
                          {
                            n: 3,
                            t: "Confirmation & Payment",
                            d: "Complete payment and receive final confirmation with all access details.",
                          },
                        ].map((item) => (
                          <div key={item.n} className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c4a47c] text-sm font-semibold text-white">
                              {item.n}
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-neutral-900">{item.t}</p>
                              <p className="mt-2 text-[12px] text-neutral-500 leading-relaxed">{item.d}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto rounded-sm bg-[#1a1d1b] px-8 py-8 text-white">
                      <p className="font-display text-lg italic text-white">Need Immediate Assistance?</p>
                      <div className="mt-6 space-y-3 text-[13px]">
                        <p className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-white/80 shrink-0" />
                          bookings@himalayavillas.com
                        </p>
                        <p className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-white/80 shrink-0" />
                          +92 123 456 789
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                      <Link href="/book" className="text-[11px] uppercase tracking-widest text-neutral-600 hover:underline">
                        Back to Book Now
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {step !== 6 && (
                <aside className="lg:col-span-4 space-y-6">
                  <div className="bg-[#1a1a1a] text-white p-7">
                    <p className="font-display italic text-2xl">Booking Summary</p>
                    <div className="mt-5 h-px bg-[#c9a55b]/40" />
                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Date</p>
                        <p className="mt-1 text-[14px] font-semibold">{dateLabel}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Preferred Time</p>
                        <p className="mt-1 text-[14px] font-semibold">{preferredTime}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Number of Guests</p>
                        <p className="mt-1 text-[14px] font-semibold">{guests}</p>
                      </div>
                      {step >= 2 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Dining Experience</p>
                          <p className="mt-1 text-[14px] font-semibold">{dt.name}</p>
                        </div>
                      )}
                      {step >= 3 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Menu</p>
                          <p className="mt-1 text-[14px] font-semibold">{menu.name}</p>
                        </div>
                      )}
                    </div>
                    {step < 5 && (
                      <p className="mt-6 text-[11px] text-white/50">
                        Complete your booking details to see the total cost
                      </p>
                    )}
                  </div>

                  <div className="bg-white border border-[#eadfce] p-6">
                    <div className="space-y-4">
                      {[
                        { t: "Secure Booking", d: "SSL Encryption", Icon: Shield },
                        { t: "Privacy Protected", d: "Your data is safe", Icon: Lock },
                        { t: "Best Price Guarantee", d: "No hidden fees", Icon: Check },
                      ].map((row) => (
                        <div key={row.t} className="flex items-start gap-3">
                          <row.Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a55b]" strokeWidth={1.25} />
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                              {row.t}
                            </p>
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
