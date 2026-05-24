"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { pushFormSubmission } from "@/lib/analytics/push-form-submission";
import { buildDiningMurreeWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["2 Guests", "4 Guests", "6 Guests", "8 Guests", "10+ Guests"] as const;

const diningPreferenceOptions = [
  "In-villa dining only",
  "Mostly in-villa + one restaurant evening",
  "Mix in-villa and Mall Road street food",
  "Interested in seasonal menu details",
  "Special dietary requirements",
] as const;

export default function DiningMurreeHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("4 Guests");
  const [diningPreference, setDiningPreference] = useState<(typeof diningPreferenceOptions)[number]>(
    "In-villa dining only"
  );
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildDiningMurreeWhatsAppUrl({
      name: name.trim() || "Guest",
      phone: phone.trim(),
      email: email.trim(),
      checkIn,
      checkOut,
      guests,
      diningPreference,
      dietaryNotes: dietaryNotes.trim() || "—",
    });
    window.open(url, "_blank", "noopener,noreferrer");
    pushFormSubmission("best_restaurants_murree_hero_form");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <div className="text-left mb-8">
          <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">
            Plan Your Dining Stay
          </h2>
          <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
            Ask about the seasonal in-villa menu, terrace breakfast, and fireside dinners — Halal throughout,
            served on your schedule.
          </p>
          <p className="mt-3 text-[11px] font-bold text-[#c9a55b] uppercase tracking-widest">
            100% Halal · Private terrace · Chef-prepared
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="d-check-in"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-in
              </label>
              <input
                id="d-check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
            <div>
              <label
                htmlFor="d-check-out"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-out
              </label>
              <input
                id="d-check-out"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="d-guests"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Group size
            </label>
            <div className="relative">
              <select
                id="d-guests"
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
            <label
              htmlFor="d-pref"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Dining preference
            </label>
            <div className="relative">
              <select
                id="d-pref"
                value={diningPreference}
                onChange={(e) =>
                  setDiningPreference(e.target.value as (typeof diningPreferenceOptions)[number])
                }
                className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              >
                {diningPreferenceOptions.map((opt) => (
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
              htmlFor="d-dietary"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Dietary notes
            </label>
            <input
              id="d-dietary"
              type="text"
              placeholder="Allergies, children's preferences, etc."
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="d-name"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Your name
            </label>
            <input
              id="d-name"
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
                htmlFor="d-phone"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Phone / WhatsApp
              </label>
              <input
                id="d-phone"
                type="tel"
                placeholder={SITE_CONTACT.phoneDisplay}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="d-email"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Email
              </label>
              <input
                id="d-email"
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
            Ask about seasonal menu &amp; stay
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
