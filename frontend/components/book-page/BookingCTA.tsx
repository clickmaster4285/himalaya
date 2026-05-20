"use client";

import React from "react";
import Link from "next/link";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const FINAL_WHATSAPP = buildWhatsAppBookingUrl("book villas in bhurban murree");

export default function BookingCTA() {
  return (
    <section className="bg-[#1a2318] px-6 py-24 md:py-32 border-t border-white/5 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-4">
          Ready to book your
          <span className="block italic text-[#c9a55b] font-light mt-2">bhurban hotel murree stay — privately?</span>
        </h2>

        <p className="text-[12px] md:text-[14px] text-white/60 leading-relaxed font-light mb-10 max-w-xl mx-auto">
          Reservations 8 AM — 10 PM, seven days a week. Ask about bhurban hotels, compare our resort in bhurban packages,
          or lock villas in bhurban murree — no payment needed to inquire.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <Link
            href="/book/stay"
            className="w-full sm:w-auto px-10 py-4 bg-[#c9a55b] text-[#1b261b] text-[10px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
          >
            Book villas in bhurban murree online
          </Link>
          <a
            href={FINAL_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-colors"
          >
            WhatsApp best hotel in bhurban rates
          </a>
          <a
            href="tel:+923045679000"
            className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:border-white transition-colors"
          >
            Call +92 304 567 9000
          </a>
          <Link
            href="/hotels-in-bhurban"
            className="w-full sm:w-auto px-10 py-4 border border-[#c9a55b]/35 text-[#c9a55b] text-[10px] font-bold uppercase tracking-widest hover:border-[#c9a55b] transition-colors"
          >
            Bhurban best hotels guide
          </Link>
        </div>
      </div>
    </section>
  );
}
