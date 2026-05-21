"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildMurreeNightWhatsAppUrl } from "@/lib/whatsapp";

const guestOptions = ["2 Guests", "4 Guests", "6 Guests", "8 Guests", "10+ Guests"] as const;
const eveningOptions = ["Bonfire + stargazing", "Mall Road evening food", "Kashmir Point sunset", "Full evening plan", "Help me plan"] as const;
const bonfireOptions = ["Yes — bonfire evening", "Maybe — tell me more", "Not needed"] as const;

export default function MurreeNightHeroCtaForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<(typeof guestOptions)[number]>("4 Guests");
  const [eveningFocus, setEveningFocus] = useState<(typeof eveningOptions)[number]>("Bonfire + stargazing");
  const [includeBonfire, setIncludeBonfire] = useState<(typeof bonfireOptions)[number]>("Yes — bonfire evening");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(
      buildMurreeNightWhatsAppUrl({
        name: name.trim() || "Guest",
        phone: phone.trim(),
        email: email.trim(),
        checkIn,
        checkOut,
        guests,
        eveningFocus,
        includeBonfire,
      }),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const inputClass =
    "w-full h-12 px-4 border border-[#e5e1d8] bg-white text-[13px] focus:outline-none focus:border-[#c9a55b] transition-colors text-neutral-700";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2";

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto shadow-2xl">
      <div className="bg-[#fcfbf8] p-8 lg:p-10 border border-[#e5e1d8]/80">
        <h2 className="font-display text-[28px] md:text-[32px] text-[#1b261b] leading-tight">Book Your Night Experience</h2>
        <p className="mt-3 text-[13px] text-[#5c5a52] leading-relaxed">
          Request bonfire evening in your message — arranged before you arrive.
        </p>
        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="n-in" className={labelClass}>Check-in</label>
              <input id="n-in" type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="n-out" className={labelClass}>Check-out</label>
              <input id="n-out" type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="n-guests" className={labelClass}>Guests</label>
              <div className="relative">
                <select id="n-guests" value={guests} onChange={(e) => setGuests(e.target.value as typeof guests)} className={`${inputClass} appearance-none`}>
                  {guestOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="n-evening" className={labelClass}>Evening focus</label>
              <div className="relative">
                <select id="n-evening" value={eveningFocus} onChange={(e) => setEveningFocus(e.target.value as typeof eveningFocus)} className={`${inputClass} appearance-none`}>
                  {eveningOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="n-bonfire" className={labelClass}>Bonfire evening</label>
            <div className="relative">
              <select id="n-bonfire" value={includeBonfire} onChange={(e) => setIncludeBonfire(e.target.value as typeof includeBonfire)} className={`${inputClass} appearance-none`}>
                {bonfireOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="n-name" className={labelClass}>Your name</label>
            <input id="n-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="n-phone" className={labelClass}>Phone</label>
              <input id="n-phone" type="tel" placeholder={SITE_CONTACT.phoneDisplay} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="n-email" className={labelClass}>Email</label>
              <input id="n-email" type="email" placeholder="Optional" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#1b261b] text-white h-12 text-[11px] font-bold uppercase tracking-widest hover:bg-black">
            WhatsApp — include bonfire evening
          </button>
          <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#40C351] text-white h-12 flex items-center justify-center text-[11px] font-bold uppercase tracking-widest">
            {SITE_CONTACT.phoneDisplay}
          </a>
        </form>
      </div>
    </div>
  );
}
