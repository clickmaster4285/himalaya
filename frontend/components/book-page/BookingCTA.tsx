"use client";

import React from "react";
import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="bg-[#1a2318] px-6 py-24 md:py-32 border-t border-white/5 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-4">
          Still Deciding?
          <span className="block italic text-[#c9a55b] font-light mt-2">Let's Talk.</span>
        </h2>
        
        <p className="text-[12px] md:text-[13px] text-white/60 leading-relaxed font-light mb-10 max-w-md mx-auto">
          Our reservations team is available 8 AM — 10 PM, 7 days a week.<br />
          No commitment needed to ask a question.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book/stay"
            className="w-full sm:w-auto px-10 py-4 bg-[#c9a55b] text-[#1b261b] text-[10px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
          >
            CHECK AVAILABILITY NOW
          </Link>
          <a
            href="tel:+923000000000"
            className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:border-white transition-colors"
          >
            CALL: +92 300 000 0000
          </a>
        </div>
      </div>
    </section>
  );
}
