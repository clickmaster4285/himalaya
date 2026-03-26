"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import { LuxurySingleDateCalendar, defaultEventDate } from "@/components/LuxuryBookingCalendar";
import {
  CalendarDays,
  Check,
  CreditCard,
  Crown,
  Landmark,
  Lock,
  Mail,
  Mountain,
  Phone,
  Shield,
  Smartphone,
  Star,
  Tag,
  User,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const stepsConfig: { n: Step; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { n: 1, label: "Dates", Icon: CalendarDays },
  { n: 2, label: "Packages", Icon: Crown },
  { n: 3, label: "Details", Icon: User },
  { n: 4, label: "Review Booking", Icon: Check },
  { n: 5, label: "Payment", Icon: CreditCard },
];

const activityTypes = ["Zip Lining", "Hiking Trail", "ATV Ride", "Bonfire Night", "Guided Nature Walk", "Archery"];

const activitySessions = [
  { id: "sunrise", name: "Sunrise Session", time: "06:00 AM – 08:00 AM" },
  { id: "morning", name: "Morning Session", time: "09:00 AM – 12:00 PM" },
  { id: "afternoon", name: "Afternoon Session", time: "01:00 PM – 04:30 PM" },
  { id: "evening", name: "Evening Session", time: "05:00 PM – 08:00 PM" },
];

const packages = [
  {
    id: "solo",
    name: "Solo Adventure",
    tagline: "Perfect for individual explorers",
    guests: "1 Person",
    price: 3_500,
    Icon: Mountain,
    features: [
      "Personalized guided tour",
      "Safety equipment included",
      "Photo opportunity spots",
      "Refreshments during session",
      "Basic first-aid support",
      "Certificate of completion",
    ],
  },
  {
    id: "couple",
    name: "Couple's Package",
    tagline: "Romantic adventure for two",
    guests: "2 People",
    price: 6_000,
    Icon: Star,
    features: [
      "Private session access",
      "Professional guide",
      "Photo package included",
      "Romantic picnic setup",
      "Priority scheduling",
      "Safety equipment included",
    ],
  },
  {
    id: "family",
    name: "Family Package",
    tagline: "Fun for the whole family",
    guests: "Up to 4 People",
    price: 9_000,
    Icon: User,
    features: [
      "Family-friendly route",
      "Dedicated guide",
      "Kids safety equipment",
      "Snack & refreshment pack",
      "Group photos",
      "Flexible timing options",
    ],
  },
  {
    id: "group",
    name: "Group Adventure",
    tagline: "Great for teams & friends",
    guests: "5–10 People",
    price: 14_000,
    Icon: Crown,
    features: [
      "Group discounts applied",
      "Multiple activity options",
      "Team building exercises",
      "Refreshments included",
      "Group photos & videos",
      "Dedicated coordinator",
    ],
  },
];

const addOnCatalog = [
  { id: "gopro", name: "GoPro Camera Rental", price: 12_000 },
  { id: "drone", name: "Drone Footage Package", price: 15_000 },
  { id: "guide", name: "Additional Guide/Instructor", price: 10_000 },
  { id: "meal", name: "Premium Meal Upgrade", price: 8_000 },
  { id: "transport", name: "Luxury Transport Upgrade", price: 20_000 },
  { id: "souvenir", name: "Adventure Souvenir Pack", price: 6_000 },
  { id: "extend", name: "Extended Activity Time (+2 hours)", price: 25_000 },
  { id: "private", name: "Private Session (exclusive)", price: 30_000 },
  { id: "album", name: "Premium Photo Album", price: 18_000 },
  { id: "edit", name: "Professional Video Editing", price: 22_000 },
];

function formatShortDate(d: Date | undefined) {
  if (!d) return "Mar 30, 2026";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

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

export default function FunActivitiesFlow() {
  const [step, setStep] = useState<Step>(1);
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [date, setDate] = useState<Date | undefined>(defaultEventDate);
  const [sessionId, setSessionId] = useState(activitySessions[0].id);
  const [selectedPkg, setSelectedPkg] = useState(packages[0].id);
  const [addonQty, setAddonQty] = useState<Record<string, number>>({ gopro: 1, drone: 1 });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "jazzcash" | "easypaisa">("bank");

  const session = activitySessions.find((s) => s.id === sessionId) ?? activitySessions[0];
  const pkg = packages.find((p) => p.id === selectedPkg) ?? packages[0];

  const addOnTotal = useMemo(() => {
    return addOnCatalog.reduce((sum, a) => sum + (addonQty[a.id] ?? 0) * a.price, 0);
  }, [addonQty]);

  const selectedAddonLines = useMemo(() => {
    return addOnCatalog
      .filter((a) => (addonQty[a.id] ?? 0) > 0)
      .map((a) => ({ ...a, qty: addonQty[a.id] ?? 0 }));
  }, [addonQty]);

  const total = pkg.price + addOnTotal;
  const bookingRef = "HV-79088541";

  const bumpAddon = (id: string, delta: number) => {
    setAddonQty((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      <DetailNavbar />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-14">
        <div className="flex items-center gap-3 text-neutral-700">
          <span className="text-base">↩</span>
          <Link href="/book" className="text-[11px] md:text-[12px] tracking-[0.15em] uppercase hover:underline">
            Back to Book Now
          </Link>
        </div>

        {step !== 6 && (
          <>
            <h1 className="mt-6 font-display text-[44px] leading-[1.05] md:text-[56px] text-neutral-900">
              Fun Activities
            </h1>
            <p className="mt-3 text-[12px] md:text-[13px] text-neutral-500/90 max-w-2xl">
              Experience thrilling adventures and create unforgettable memories in the mountains.
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
              <div className={step === 6 ? "lg:col-span-12 max-w-[920px] mx-auto w-full" : "lg:col-span-8 bg-white border border-[#eadfce]"}>
                {step === 1 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Select Type, Date &amp; Time</p>

                    <div className="mt-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500\">Activity type</p>
                      <select
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        className="mt-2 w-full h-11 px-4 border border-[#eadfce] bg-[#fbf8f2] text-[13px] text-neutral-900 focus:outline-none focus:bg-white"
                      >
                        {activityTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-6">
                      <LuxurySingleDateCalendar date={date} onDateChange={setDate} defaultMonth={date} />
                    </div>

                    <div className="mt-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Select session</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activitySessions.map((s) => {
                          const active = sessionId === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSessionId(s.id)}
                              className={[
                                "border p-4 text-left transition-colors",
                                active ? "border-[#c9a55b] bg-[#fbf8f2]" : "border-[#eadfce] bg-white hover:bg-[#faf8f4]",
                              ].join(" ")}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-[12px] font-semibold text-neutral-900">{s.name}</p>
                                  <p className="mt-2 text-[11px] text-neutral-500">{s.time}</p>
                                </div>
                                {active && <span className="text-[#c9a55b] text-lg leading-none">✓</span>}
                              </div>
                            </button>
                          );
                        })}
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

                {step === 2 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Choose Your Event Package</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {packages.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedPkg(p.id)}
                          className={[
                            "text-left border p-6 transition-colors relative",
                            selectedPkg === p.id ? "border-[#c9a55b] bg-[#f5f0e6]" : "border-[#eadfce] bg-white hover:bg-[#fbf8f2]",
                          ].join(" ")}
                        >
                          {selectedPkg === p.id && (
                            <span className="absolute top-4 right-4 h-6 w-6 rounded-full border border-[#c9a55b] flex items-center justify-center text-[#c9a55b] text-sm">
                              ✓
                            </span>
                          )}
                          <p.Icon className="h-5 w-5 text-[#c9a55b]" strokeWidth={1.25} />
                          <p className="mt-4 font-display text-lg text-neutral-900">{p.name}</p>
                          <p className="mt-1 text-[12px] text-neutral-500">{p.tagline}</p>
                          <p className="mt-2 text-[11px] text-neutral-400">{p.guests}</p>
                          <p className="mt-4 text-[10px] uppercase tracking-widest text-neutral-500">Package Price</p>
                          <p className="mt-1 font-display text-xl text-neutral-900">PKR {p.price.toLocaleString()}</p>
                          <p className="mt-4 text-[10px] uppercase tracking-widest text-neutral-500">Package Includes:</p>
                          <ul className="mt-2 space-y-1.5">
                            {p.features.slice(0, 8).map((f) => (
                              <li key={f} className="flex items-start gap-2 text-[11px] text-neutral-600">
                                <Check className="h-3.5 w-3.5 shrink-0 text-[#c9a55b] mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
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

                {step === 3 && (
                  <div className="p-8 space-y-8">
                    <div>
                      <p className="font-display text-[15px] text-neutral-900">Couple Information</p>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">First Name</p>
                          <input className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf8f2] text-[12px] focus:outline-none focus:bg-white" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Last Name</p>
                          <input className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf8f2] text-[12px] focus:outline-none focus:bg-white" />
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Email Address</p>
                          <div className="mt-2 flex items-center gap-2 border border-[#eadfce] bg-[#fbf8f2] px-4 h-10">
                            <Mail className="h-4 w-4 text-[#c9a55b]" />
                            <input className="flex-1 bg-transparent text-[12px] focus:outline-none" />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Phone Number</p>
                          <div className="mt-2 flex items-center gap-2 border border-[#eadfce] bg-[#fbf8f2] px-4 h-10">
                            <Phone className="h-4 w-4 text-[#c9a55b]" />
                            <span className="text-[12px] text-neutral-500">+92</span>
                            <input className="flex-1 bg-transparent text-[12px] focus:outline-none" />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Number of Participants</p>
                          <input className="mt-2 w-full h-10 px-4 border border-[#eadfce] bg-[#fbf8f2] text-[12px] focus:outline-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-display text-[15px] text-neutral-900">Customize Your Package</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {addOnCatalog.map((a) => {
                          const on = (addonQty[a.id] ?? 0) > 0;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => bumpAddon(a.id, on ? -(addonQty[a.id] ?? 0) : 1)}
                              className={[
                                "text-left border p-4 flex justify-between items-start transition-colors",
                                on ? "border-[#c9a55b] bg-[#fbf8f2]" : "border-[#eadfce] bg-white hover:bg-[#faf8f4]",
                              ].join(" ")}
                            >
                              <div>
                                <p className="text-[12px] font-semibold text-neutral-800">{a.name}</p>
                                <p className="mt-1 text-[11px] text-[#c9a55b]">PKR {a.price.toLocaleString()}</p>
                              </div>
                              {on && <Check className="h-4 w-4 text-[#c9a55b] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedAddonLines.length > 0 && (
                      <div className="border border-[#c9a55b]/40 bg-[#fbf8f2] px-5 py-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 flex items-center gap-2">
                          <Tag className="h-4 w-4 text-[#c9a55b]" />
                          Added Services
                        </p>
                        <ul className="mt-4 space-y-3">
                          {selectedAddonLines.map((a) => (
                            <li key={a.id} className="flex items-center justify-between gap-3 text-[12px] text-neutral-800">
                              <span className="flex-1">{a.name}</span>
                              <span className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  className="h-8 w-8 border border-[#d9c7a7] bg-white text-sm"
                                  onClick={() => bumpAddon(a.id, -1)}
                                >
                                  −
                                </button>
                                <span className="w-6 text-center">{a.qty}</span>
                                <button
                                  type="button"
                                  className="h-8 w-8 border border-[#d9c7a7] bg-white text-sm"
                                  onClick={() => bumpAddon(a.id, 1)}
                                >
                                  +
                                </button>
                                <button
                                  type="button"
                                  className="ml-2 text-red-500 text-lg leading-none"
                                  aria-label="Remove"
                                  onClick={() => bumpAddon(a.id, -a.qty)}
                                >
                                  ×
                                </button>
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 text-[12px] text-neutral-600">
                          Additional Services Total:{" "}
                          <span className="font-display text-[#c9a55b] text-lg">PKR {addOnTotal.toLocaleString()}</span>
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Special Requests</p>
                      <textarea className="mt-2 w-full min-h-[100px] border border-[#eadfce] bg-[#fbf8f2] px-4 py-3 text-[12px] resize-none focus:outline-none" />
                    </div>

                    <div className="border border-[#eadfce] bg-[#fbf8f2] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">Cancellation Policy</p>
                      <ul className="mt-2 text-[11px] text-neutral-600 space-y-1">
                        <li>• Free cancellation up to 24 hours before the session.</li>
                        <li>• 50% refund for cancellations 12–24 hours prior.</li>
                        <li>• No refund within 12 hours of the session.</li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-3">
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

                {step === 4 && (
                  <div className="p-8">
                    <p className="font-display text-2xl text-neutral-900">Booking Overview</p>
                    <div className="mt-8 space-y-6 border-t border-[#eadfce] pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Mountain className="h-5 w-5 text-[#c9a55b]" />
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-neutral-500">Selected Activity</p>
                            <p className="mt-1 text-[14px] text-neutral-800">{activityType}</p>
                          </div>
                        </div>
                        <button type="button" className="text-[11px] text-[#c9a55b] underline">
                          Edit
                        </button>
                      </div>

                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <CalendarDays className="h-5 w-5 text-[#c9a55b]" />
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-neutral-500">Activity Schedule</p>
                            <p className="mt-1 text-[14px] text-neutral-800">
                              {date?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }) ??
                                "—"}
                            </p>
                            <p className="mt-1 text-[12px] text-neutral-600">{session.name}</p>
                          </div>
                        </div>
                        <button type="button" className="text-[11px] text-[#c9a55b] underline">
                          Edit
                        </button>
                      </div>

                      <div className="border border-[#eadfce] bg-[#f4f0e8] p-5">
                        <div className="flex justify-between">
                          <div className="flex gap-3">
                            <Crown className="h-5 w-5 text-[#c9a55b]" />
                            <div>
                              <p className="font-display text-lg">{pkg.name}</p>
                              <p className="text-[12px] text-neutral-600 mt-1">{pkg.guests}</p>
                            </div>
                          </div>
                          <p className="font-display text-[#c9a55b]">PKR {pkg.price.toLocaleString()}</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-600">
                          {pkg.features.slice(0, 6).map((f) => (
                            <span key={f} className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-[#c9a55b]" /> {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border border-[#eadfce] bg-[#fbf8f2] p-5">
                        <p className="text-[11px] uppercase tracking-widest text-neutral-500">Participant Information</p>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] text-neutral-700">
                          <p>First Name —</p>
                          <p>Last Name —</p>
                          <p>Email —</p>
                          <p>Phone —</p>
                          <p className="sm:col-span-2">Participants —</p>
                        </div>
                      </div>

                      {selectedAddonLines.length > 0 && (
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-neutral-500">Additional Service</p>
                          <ul className="mt-2 space-y-2 text-[12px] text-neutral-700">
                            {selectedAddonLines.map((a) => (
                              <li key={a.id} className="flex justify-between gap-2">
                                <span>
                                  {a.name} (×{a.qty})
                                </span>
                                <span>PKR {(a.qty * a.price).toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="border border-[#eadfce] bg-[#fbf8f2] px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">Cancellation Policy</p>
                        <ul className="mt-2 text-[11px] text-neutral-600 space-y-1">
                          <li>• Free cancellation up to 24 hours before the session.</li>
                          <li>• 50% refund for cancellations 12–24 hours prior.</li>
                          <li>• No refund within 12 hours of the session.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between gap-3">
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
                        className="px-10 py-3 bg-neutral-900 text-white text-[11px] uppercase tracking-widest hover:bg-neutral-800"
                      >
                        Proceed To Payment
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="p-8">
                    <p className="font-display text-[15px] text-neutral-900">Secure Payment</p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "card" as const, title: "Credit/Debit Card", sub: "Visa, Mastercard, American Express", Icon: CreditCard },
                        { id: "bank" as const, title: "Bank Transfer", sub: "Direct bank transfer", Icon: Landmark },
                        { id: "jazzcash" as const, title: "JazzCash", sub: "Mobile wallet payment", Icon: Smartphone },
                        { id: "easypaisa" as const, title: "EasyPaisa", sub: "Mobile wallet payment", Icon: Smartphone },
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
                      <div className="mt-6 border border-[#eadfce] bg-[#f5f0e6] px-6 py-5">
                        <p className="text-[12px] font-medium text-neutral-800 mb-3">Bank Details:</p>
                        {[
                          ["Bank Name", "Himalaya Bank Ltd"],
                          ["Account Title", "Himalaya Villas"],
                          ["Account Number", "1234567890"],
                          ["IBAN", "PK123HIMA0001234567890"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between text-[12px] py-1">
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
                        <input placeholder="Enter your account number" className="flex-1 bg-transparent text-[12px] focus:outline-none" />
                      </div>
                      <p className="mt-2 text-[11px] italic text-neutral-500">
                        Please transfer the amount and provide your account number for verification.
                      </p>
                    </div>

                    <div className="mt-6 border border-[#c9a55b]/50 bg-[#fbf8f2] px-5 py-4 flex gap-3">
                      <Lock className="h-5 w-5 text-[#c9a55b] shrink-0" />
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        <span className="font-medium text-neutral-800">Secure Payment.</span> Your payment information is encrypted and secure.
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
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="pb-16 px-4">
                    <div className="text-center">
                      <div className="mx-auto h-[72px] w-[72px] rounded-full bg-[#c1a378] flex items-center justify-center">
                        <Check className="h-8 w-8 text-white" strokeWidth={3} />
                      </div>
                      <h2 className="mt-8 font-display text-4xl md:text-[44px] italic text-neutral-800">
                        Booking Request Received!
                      </h2>
                      <p className="mt-3 text-[13px] text-neutral-600">Thank you for choosing Himalaya Villas</p>
                      <div className="mt-6 inline-block rounded-md bg-[#1a1d1a] px-6 py-2.5">
                        <span className="text-[11px] text-white tracking-wide">Booking Reference: {bookingRef}</span>
                      </div>
                    </div>

                    <div className="mt-12 bg-white border border-[#eadfce] rounded-sm px-8 py-10 max-w-2xl mx-auto">
                      <p className="font-display text-xl italic text-neutral-900">What Happens Next?</p>
                      <div className="mt-8 space-y-8">
                        {[
                          {
                            n: 1,
                            t: "Email Confirmation",
                            d: "You'll receive a confirmation email with all your booking details within 15 minutes.",
                          },
                          { n: 2, t: "Team Contact", d: "Our team will contact you within 24 hours to finalize details." },
                          { n: 3, t: "Confirmation & Payment", d: "Complete payment and receive final confirmation with all access details." },
                        ].map((item) => (
                          <div key={item.n} className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8dfd0] text-sm font-semibold text-neutral-800">
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

                    <div className="mt-10 max-w-2xl mx-auto rounded-sm bg-[#1a1d1a] px-8 py-8 text-white">
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
                    <div className="mt-5 h-px bg-white/10" />
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Adventure Type</p>
                      <p className="mt-2 text-[14px] font-semibold">{activityType}</p>
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Date</p>
                      <p className="mt-2 text-[14px] font-semibold">{formatShortDate(date)}</p>
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Activity Session</p>
                      <p className="mt-2 text-[13px] text-white/80">{session.name}</p>
                      <p className="mt-1 text-[12px] text-white/50">{session.time}</p>
                    </div>
                    {step >= 2 && (
                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Package</p>
                        <p className="mt-2 text-[14px] font-semibold">{pkg.name}</p>
                      </div>
                    )}
                    {step >= 3 && selectedAddonLines.length > 0 && (
                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a55b]/90">Added Services</p>
                        <p className="mt-2 text-[12px] text-white/80">{selectedAddonLines.map((a) => a.name).join(", ")}</p>
                      </div>
                    )}
                    {step === 5 && (
                      <>
                        <div className="mt-6 space-y-2 text-[12px] text-white/90">
                          <div className="flex justify-between">
                            <span>Package</span>
                            <span>PKR {pkg.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Additional Services</span>
                            <span>PKR {addOnTotal.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-end">
                          <span className="text-[11px] uppercase tracking-widest text-white/70">Total Amount</span>
                          <span className="font-display text-2xl text-[#c9a55b]">PKR {total.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {step < 5 && (
                      <p className="mt-6 text-[11px] text-white/50">Complete your booking details to see the total cost</p>
                    )}
                  </div>

                  <div className="bg-white border border-[#eadfce] p-6">
                    <div className="space-y-4">
                      {[
                        { t: "Secure Booking", d: "SSL encrypted", Icon: Shield },
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

