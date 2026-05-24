"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { pushFormSubmission } from "@/lib/analytics/push-form-submission";
import { buildCouplesMurreeWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["2 Guests", "4 Guests"] as const;

const occasionOptions = [
  "Honeymoon",
  "Anniversary",
  "Proposal / surprise",
  "Weekend escape",
  "Birthday celebration",
  "Just because",
] as const;

const packageOptions = [
  "Honeymoon Sanctuary (from PKR 75,000)",
  "Couples Weekend Escape (from PKR 55,000)",
  "Anniversary Package (from PKR 65,000)",
  "Custom — help me choose",
] as const;

const mustHaveOptions = [
  "Private bonfire evening",
  "Kashmir Point at dawn",
  "In-villa terrace dinner",
  "Pindi Point sunset walk",
  "All of the above",
] as const;

export default function CouplesMurreeHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("2 Guests");
  const [occasion, setOccasion] = useState<(typeof occasionOptions)[number]>("Weekend escape");
  const [packageInterest, setPackageInterest] = useState<(typeof packageOptions)[number]>(
    "Couples Weekend Escape (from PKR 55,000)"
  );
  const [mustHave, setMustHave] = useState<(typeof mustHaveOptions)[number]>("All of the above");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildCouplesMurreeWhatsAppUrl({
      name: name.trim() || "Guest",
      phone: phone.trim(),
      email: email.trim(),
      checkIn,
      checkOut,
      guests,
      occasion,
      packageInterest,
      mustHave,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    pushFormSubmission("things_to_do_in_murree_for_couples_hero_form");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <div className="text-left mb-8">
          <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">
            Book Your Couples Escape
          </h2>
          <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
            Tell us the occasion, date, and mood — bonfire, Kashmir Point sunrise, and terrace dinner
            arranged before you arrive.
          </p>
          <p className="mt-3 text-[11px] font-bold text-[#c9a55b] uppercase tracking-widest">
            Direct bookings — preferential availability &amp; rate
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-check-in" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Check-in
              </label>
              <input
                id="c-check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
            <div>
              <label htmlFor="c-check-out" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Check-out
              </label>
              <input
                id="c-check-out"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-guests" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Guests
              </label>
              <div className="relative">
                <select
                  id="c-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value as (typeof guestOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {guestOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="c-occasion" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Occasion
              </label>
              <div className="relative">
                <select
                  id="c-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as (typeof occasionOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {occasionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-package" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Package
              </label>
              <div className="relative">
                <select
                  id="c-package"
                  value={packageInterest}
                  onChange={(e) => setPackageInterest(e.target.value as (typeof packageOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {packageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="c-must" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Must-have
              </label>
              <div className="relative">
                <select
                  id="c-must"
                  value={mustHave}
                  onChange={(e) => setMustHave(e.target.value as (typeof mustHaveOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {mustHaveOptions.map((opt) => (
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
            <label htmlFor="c-name" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
              Your name
            </label>
            <input
              id="c-name"
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
              <label htmlFor="c-phone" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Phone / WhatsApp
              </label>
              <input
                id="c-phone"
                type="tel"
                placeholder={SITE_CONTACT.phoneDisplay}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Email
              </label>
              <input
                id="c-email"
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
            WhatsApp — occasion &amp; dates
          </button>

          <a
            href={SITE_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#40C351] text-white h-12 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#38b047] transition-colors"
          >
            Quick chat — {SITE_CONTACT.phoneDisplay}
          </a>
        </form>
      </div>
    </div>
  );
}
