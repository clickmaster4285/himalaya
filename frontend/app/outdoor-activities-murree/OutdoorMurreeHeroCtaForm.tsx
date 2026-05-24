"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildOutdoorMurreeWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["2 Guests", "4 Guests", "6 Guests", "8 Guests", "10+ Guests"] as const;

const activityFocusOptions = [
  "Miranjani day hike",
  "Forest trails from gate",
  "Golf at Bhurban",
  "Jeep safari",
  "Multi-activity weekend",
  "Help me plan — not sure yet",
] as const;

const arrangeOptions = [
  "Trail briefing + guide",
  "Miranjani guide in Nathiagali",
  "Jeep safari (half day)",
  "Golf tee time + caddie",
  "Zip-line / Sozo booking",
  "All of the above",
] as const;

export default function OutdoorMurreeHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("4 Guests");
  const [activityFocus, setActivityFocus] = useState<(typeof activityFocusOptions)[number]>(
    "Multi-activity weekend"
  );
  const [activitiesToArrange, setActivitiesToArrange] = useState<(typeof arrangeOptions)[number]>(
    "All of the above"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildOutdoorMurreeWhatsAppUrl({
      name: name.trim() || "Guest",
      phone: phone.trim(),
      email: email.trim(),
      checkIn,
      checkOut,
      guests,
      activityFocus,
      activitiesToArrange,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <div className="text-left mb-8">
          <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">
            Plan Your Adventure
          </h2>
          <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
            Forest trails from the gate, Miranjani 40 min away, golf 5 min — share dates and activities;
            our concierge arranges guides, safaris, and tee times.
          </p>
          <p className="mt-3 text-[11px] font-bold text-[#c9a55b] uppercase tracking-widest">
            October Miranjani dates sell earliest
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="o-check-in" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Check-in
              </label>
              <input
                id="o-check-in"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
            <div>
              <label htmlFor="o-check-out" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Check-out
              </label>
              <input
                id="o-check-out"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
              />
            </div>
          </div>

          <div>
            <label htmlFor="o-guests" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
              Group size
            </label>
            <div className="relative">
              <select
                id="o-guests"
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
              <label htmlFor="o-focus" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Activity focus
              </label>
              <div className="relative">
                <select
                  id="o-focus"
                  value={activityFocus}
                  onChange={(e) => setActivityFocus(e.target.value as (typeof activityFocusOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {activityFocusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="o-arrange" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Concierge arrange
              </label>
              <div className="relative">
                <select
                  id="o-arrange"
                  value={activitiesToArrange}
                  onChange={(e) => setActivitiesToArrange(e.target.value as (typeof arrangeOptions)[number])}
                  className="w-full h-12 px-4 appearance-none border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700"
                >
                  {arrangeOptions.map((opt) => (
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
            <label htmlFor="o-name" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
              Your name
            </label>
            <input
              id="o-name"
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
              <label htmlFor="o-phone" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Phone / WhatsApp
              </label>
              <input
                id="o-phone"
                type="tel"
                placeholder={SITE_CONTACT.phoneDisplay}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="o-email" className="block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                Email
              </label>
              <input
                id="o-email"
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
            Check availability &amp; arrange activities
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
