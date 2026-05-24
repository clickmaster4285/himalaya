"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { pushFormSubmission } from "@/lib/analytics/push-form-submission";
import { buildThingsToDoMurreeWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["1 Adult", "2 Adults", "3 Adults", "4 Adults", "5 Adults", "6+ Guests"] as const;

const tripFocusOptions = [
  "Weekend getaway from Islamabad",
  "Family holiday (with children)",
  "Couples / Honeymoon",
  "3-day Murree + Nathiagali itinerary",
  "Adventure & outdoor activities",
  "Not sure — help me plan",
] as const;

const activityOptions = [
  "Kashmir Point sunrise (Day 1)",
  "Mall Road shopping & street food",
  "Patriata chairlift",
  "Nathiagali + Miranjani day trip",
  "Forest trails from the villa",
  "Bonfire & stargazing evening",
  "Full itinerary — plan everything",
] as const;

export default function ThingsToDoHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("2 Adults");
  const [tripFocus, setTripFocus] = useState<(typeof tripFocusOptions)[number]>(
    "Weekend getaway from Islamabad"
  );
  const [activities, setActivities] = useState<(typeof activityOptions)[number]>(
    "Full itinerary — plan everything"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildThingsToDoMurreeWhatsAppUrl({
      name: name.trim() || "Guest",
      phone: phone.trim(),
      email: email.trim(),
      checkIn,
      checkOut,
      guests,
      tripFocus,
      activities,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    pushFormSubmission("things_to_do_in_murree_hero_form");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <div className="text-left mb-8">
          <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">
            Plan Your Murree Stay
          </h2>
          <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
            Tell us your dates and what you want to do — we&apos;ll confirm villa availability and build
            your activity plan within 15 minutes.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[9px] text-[#8b8878] uppercase tracking-widest font-semibold mt-4">
            <span>BEST RATE GUARANTEED</span>
            <span aria-hidden>·</span>
            <span>DIRECT BOOKING</span>
            <span aria-hidden>·</span>
            <span>REPLY IN 15 MIN</span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="td-check-in"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-in
              </label>
              <input
                id="td-check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
            <div>
              <label
                htmlFor="td-check-out"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-out
              </label>
              <input
                id="td-check-out"
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
              <label
                htmlFor="td-guests"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Guests
              </label>
              <div className="relative">
                <select
                  id="td-guests"
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
                htmlFor="td-trip"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Trip focus
              </label>
              <div className="relative">
                <select
                  id="td-trip"
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
          </div>

          <div>
            <label
              htmlFor="td-activities"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Top activity you want
            </label>
            <div className="relative">
              <select
                id="td-activities"
                value={activities}
                onChange={(e) => setActivities(e.target.value as (typeof activityOptions)[number])}
                className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              >
                {activityOptions.map((opt) => (
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
              htmlFor="td-name"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Your name
            </label>
            <input
              id="td-name"
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
                htmlFor="td-phone"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Phone / WhatsApp
              </label>
              <input
                id="td-phone"
                type="tel"
                placeholder={SITE_CONTACT.phoneDisplay}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="td-email"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Email
              </label>
              <input
                id="td-email"
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
            Check availability &amp; plan activities
          </button>

          <div className="relative py-1 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5e1d8]" />
            </div>
            <span className="relative bg-[#fcfbf8] px-4 text-[9px] text-[#8b8878] tracking-widest uppercase">
              or contact directly
            </span>
          </div>

          <a
            href={SITE_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#40C351] text-white h-12 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#38b047] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp — {SITE_CONTACT.phoneDisplay}
          </a>
          <p className="text-center text-[9px] text-[#8b8878] tracking-wide leading-relaxed">
            Peak weekends fill 3–4 weeks ahead · Free cancellation 7+ days prior
          </p>
        </form>
      </div>
    </div>
  );
}
