"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { pushFormSubmission } from "@/lib/analytics/push-form-submission";
import { buildPlacesNearMurreeWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["2 Guests", "4 Guests", "6 Guests", "8 Guests", "10+ Guests"] as const;

const tripFocusOptions = [
  "3-night Murree + Nathiagali itinerary",
  "Nanga Parbat view (Oct/Nov)",
  "Family day trips",
  "Ayubia & cable car focus",
  "Weekend from Islamabad",
  "Help me plan — not sure yet",
] as const;

const mustSeeOptions = [
  "Nathiagali & Miranjani",
  "Ayubia National Park",
  "Murree town & Patriata",
  "All Galliyat highlights",
  "Abbottabad day trip",
] as const;

export default function PlacesNearMurreeHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("4 Guests");
  const [tripFocus, setTripFocus] = useState<(typeof tripFocusOptions)[number]>(
    "3-night Murree + Nathiagali itinerary"
  );
  const [mustSee, setMustSee] = useState<(typeof mustSeeOptions)[number]>("All Galliyat highlights");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildPlacesNearMurreeWhatsAppUrl({
      name: name.trim() || "Guest",
      phone: phone.trim(),
      email: email.trim(),
      checkIn,
      checkOut,
      guests,
      tripFocus,
      mustSee,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    pushFormSubmission("places_to_visit_near_murree_hero_form");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <div className="text-left mb-8">
          <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">
            Plan Your Day Trips
          </h2>
          <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
            Murree, Nathiagali, Ayubia — all from one base in Bhurban. Share dates and what you want to see;
            we build the itinerary and confirm villa availability.
          </p>
          <p className="mt-3 text-[11px] font-bold text-[#c9a55b] uppercase tracking-widest">
            October fills early for Nanga Parbat views
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="p-check-in"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-in
              </label>
              <input
                id="p-check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
            <div>
              <label
                htmlFor="p-check-out"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Check-out
              </label>
              <input
                id="p-check-out"
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
              htmlFor="p-guests"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Group size
            </label>
            <div className="relative">
              <select
                id="p-guests"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="p-trip"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Trip focus
              </label>
              <div className="relative">
                <select
                  id="p-trip"
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
                htmlFor="p-must-see"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Must-see
              </label>
              <div className="relative">
                <select
                  id="p-must-see"
                  value={mustSee}
                  onChange={(e) => setMustSee(e.target.value as (typeof mustSeeOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {mustSeeOptions.map((opt) => (
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
              htmlFor="p-name"
              className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
            >
              Your name
            </label>
            <input
              id="p-name"
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
                htmlFor="p-phone"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Phone / WhatsApp
              </label>
              <input
                id="p-phone"
                type="tel"
                placeholder={SITE_CONTACT.phoneDisplay}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="p-email"
                className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2"
              >
                Email
              </label>
              <input
                id="p-email"
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
            Plan itinerary &amp; check availability
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
