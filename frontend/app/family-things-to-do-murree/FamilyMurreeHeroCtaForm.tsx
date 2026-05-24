"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildFamilyMurreeWhatsAppUrl } from "@/lib/whatsapp";

const adultOptions = ["2 Adults", "3 Adults", "4 Adults", "5+ Adults"] as const;
const childOptions = ["0", "1", "2", "3", "4+"] as const;

const tripFocusOptions = [
  "Weekend family getaway",
  "School holidays trip",
  "Multi-generational family",
  "Baby / toddler friendly stay",
  "Teen adventure weekend",
  "Not sure — help us plan",
] as const;

const topActivityOptions = [
  "Patriata chairlift",
  "Ayubia full-day trip",
  "Sozo Adventure Park",
  "Horse riding",
  "Private grounds & forest play",
  "Full family itinerary",
] as const;

export default function FamilyMurreeHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState<(typeof adultOptions)[number]>("2 Adults");
  const [children, setChildren] = useState<(typeof childOptions)[number]>("2");
  const [childAges, setChildAges] = useState("");
  const [tripFocus, setTripFocus] = useState<(typeof tripFocusOptions)[number]>(
    "Weekend family getaway"
  );
  const [topActivity, setTopActivity] = useState<(typeof topActivityOptions)[number]>(
    "Full family itinerary"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildFamilyMurreeWhatsAppUrl({
      name: name.trim() || "Guest",
      phone: phone.trim(),
      email: email.trim(),
      checkIn,
      checkOut,
      adults,
      children: `${children} children`,
      childAges: childAges.trim() || "—",
      tripFocus,
      topActivity,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <div className="text-left mb-8">
          <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">
            Plan Your Family Trip
          </h2>
          <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
            Share dates, children&apos;s ages, and what you want to do — we send a Family Mountain Escape
            quote and pre-arrange Patriata, Ayubia, and dining on your schedule.
          </p>
          <p className="mt-3 text-[11px] font-bold text-[#c9a55b] uppercase tracking-widest">
            Family packages from PKR 80,000
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="f-check-in"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-in
              </label>
              <input
                id="f-check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
            <div>
              <label
                htmlFor="f-check-out"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-out
              </label>
              <input
                id="f-check-out"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="f-adults"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Adults
              </label>
              <div className="relative">
                <select
                  id="f-adults"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value as (typeof adultOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {adultOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="f-children"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Children
              </label>
              <div className="relative">
                <select
                  id="f-children"
                  value={children}
                  onChange={(e) => setChildren(e.target.value as (typeof childOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {childOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === "0" ? "No children" : `${opt} child${opt === "1" ? "" : "ren"}`}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="f-ages"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Children&apos;s ages
            </label>
            <input
              id="f-ages"
              type="text"
              placeholder="e.g. 4, 7, 12"
              value={childAges}
              onChange={(e) => setChildAges(e.target.value)}
              className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="f-trip"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Trip type
              </label>
              <div className="relative">
                <select
                  id="f-trip"
                  value={tripFocus}
                  onChange={(e) => setTripFocus(e.target.value as (typeof tripFocusOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {tripFocusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="f-activity"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Top activity
              </label>
              <div className="relative">
                <select
                  id="f-activity"
                  value={topActivity}
                  onChange={(e) => setTopActivity(e.target.value as (typeof topActivityOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {topActivityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="f-name"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Your name
            </label>
            <input
              id="f-name"
              type="text"
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="f-phone"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Phone / WhatsApp
              </label>
              <input
                id="f-phone"
                type="tel"
                placeholder={SITE_CONTACT.phoneDisplay}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="f-email"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Email
              </label>
              <input
                id="f-email"
                type="email"
                placeholder="Optional"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1b261b] text-white h-12 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
          >
            Get family package quote
          </button>

          <a
            href={SITE_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#40C351] text-white h-12 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#38b047] transition-colors"
          >
            WhatsApp — {SITE_CONTACT.phoneDisplay}
          </a>
        </form>
      </div>
    </div>
  );
}
