"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { pushFormSubmission } from "@/lib/analytics/push-form-submission";
import { buildBhurbanMurreeWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["2 Guests", "4 Guests", "6 Guests", "8 Guests", "10+ Guests"] as const;
const focusOptions = ["Golf weekend", "Forest trails from villa", "Full Murree Hills range", "Quiet Bhurban escape", "Help me plan"] as const;
const activityOptions = ["Golf tee time", "Forest walk briefing", "Day trips to Nathiagali", "Bonfire evenings", "All of the above"] as const;

export default function BhurbanMurreeHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("4 Guests");
  const [stayFocus, setStayFocus] = useState<(typeof focusOptions)[number]>("Full Murree Hills range");
  const [activities, setActivities] = useState<(typeof activityOptions)[number]>("All of the above");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(
      buildBhurbanMurreeWhatsAppUrl({
        name: name.trim() || "Guest",
        phone: phone.trim(),
        email: email.trim(),
        checkIn,
        checkOut,
        guests,
        stayFocus,
        activities,
      }),
      "_blank",
      "noopener,noreferrer"
    );
    pushFormSubmission("things_to_do_bhurban_murree_hero_form");
  };

  const today = new Date().toISOString().split("T")[0];
  const inputClass =
    "w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2";

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">Stay in Bhurban</h2>
        <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
          Forest from the gate. Golf 5 minutes. Murree 15 min. Nathiagali 40 min — one base.
        </p>
        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="b-in" className={labelClass}>Check-in</label>
              <input id="b-in" type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="b-out" className={labelClass}>Check-out</label>
              <input id="b-out" type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="b-guests" className={labelClass}>Guests</label>
              <div className="relative">
                <select id="b-guests" value={guests} onChange={(e) => setGuests(e.target.value as typeof guests)} className={`${inputClass} appearance-none`}>
                  {guestOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="b-focus" className={labelClass}>Stay focus</label>
              <div className="relative">
                <select id="b-focus" value={stayFocus} onChange={(e) => setStayFocus(e.target.value as typeof stayFocus)} className={`${inputClass} appearance-none`}>
                  {focusOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="b-act" className={labelClass}>Activities</label>
            <div className="relative">
              <select id="b-act" value={activities} onChange={(e) => setActivities(e.target.value as typeof activities)} className={`${inputClass} appearance-none`}>
                {activityOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="b-name" className={labelClass}>Your name</label>
            <input id="b-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="b-phone" className={labelClass}>Phone</label>
              <input id="b-phone" type="tel" placeholder={SITE_CONTACT.phoneDisplay} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="b-email" className={labelClass}>Email</label>
              <input id="b-email" type="email" placeholder="Optional" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#1b261b] text-white h-12 text-[11px] font-bold uppercase tracking-widest hover:bg-black">
            WhatsApp — tell us your dates
          </button>
          <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#40C351] text-white h-12 flex items-center justify-center text-[11px] font-bold uppercase tracking-widest">
            {SITE_CONTACT.phoneDisplay}
          </a>
        </form>
      </div>
    </div>
  );
}
