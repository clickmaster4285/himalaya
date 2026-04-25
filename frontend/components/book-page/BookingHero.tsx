"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function BookingHero() {
  return (
    <section className="relative w-full bg-[#1b261b] px-6 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Side: Text Content */}
        <div className="max-w-xl text-left">
          <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>BHURBAN | MURREE HILLS | PAKISTAN</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.05] tracking-tight">
            Hotel Booking in Murree
            <span className="block italic text-[#c9a55b] font-light mt-2">Begins Here.</span>
          </h1>

          <p className="mt-8 text-[14px] md:text-[15px] text-white/80 leading-relaxed font-light">
            Pakistan's most exclusive private mountain estate. Twelve luxury villas perched
            above the pine forests of Bhurban — 60 kilometres from Islamabad, a world
            apart from everything else. Book hotels in Murree the way they were meant to
            be experienced.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1">4.8</p>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">GUEST RATING</p>
            </div>
            <div>
              <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1">127+</p>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">VERIFIED REVIEWS</p>
            </div>
            <div>
              <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1">12</p>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">PRIVATE VILLAS</p>
            </div>
            <div>
              <p className="text-[#c9a55b] font-display text-2xl md:text-3xl mb-1 flex items-center">5<span className="text-xl ml-1 text-[#c9a55b]">★</span></p>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">MOUNTAIN LUXURY</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/villas"
              className="bg-[#c9a55b] text-[#1b261b] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors inline-flex items-center gap-2"
            >
              <span>▶</span> BOOK YOUR VILLA
            </Link>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:border-white transition-colors"
            >
              WHATSAPP US
            </a>
          </div>
        </div>

        {/* Right Side: Floating Booking Form */}
        <div className="bg-[#fcfbf8] shadow-2xl p-8 lg:p-10 border border-[#eae3d5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-sm">
          <div className="text-center mb-8">
            <h2 className="font-display text-[26px] text-[#1b261b]">Check Availability</h2>
            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-semibold mt-2">
              MURREE HOTEL BOOKING • INSTANT RESPONSE
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                  CHECK IN DATE
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full h-11 px-4 border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                  CHECK OUT DATE
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full h-11 px-4 border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                  GUESTS
                </label>
                <div className="relative">
                  <select className="w-full h-11 px-4 appearance-none border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] transition-colors">
                    <option>2 Adults</option>
                    <option>1 Adult</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                  VILLA TYPE
                </label>
                <div className="relative">
                  <select className="w-full h-11 px-4 appearance-none border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] transition-colors">
                    <option>Any</option>
                    <option>Honeymoon Villa</option>
                    <option>Family Villa</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="w-full h-11 px-4 border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] focus:ring-1 focus:ring-[#c9a55b] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                  PHONE / WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full h-11 px-4 border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full h-11 px-4 border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#c9a55b] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1b261b] mb-2">
                OCCASION
              </label>
              <div className="relative">
                <select className="w-full h-11 px-4 appearance-none border border-[#dfd5c5] bg-white text-[13px] text-neutral-800 focus:outline-none focus:border-[#c9a55b] transition-colors">
                  <option>Select (optional)</option>
                  <option>Honeymoon</option>
                  <option>Anniversary</option>
                  <option>Family Vacation</option>
                  <option>Corporate Retreat</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#1b261b] text-white h-12 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
              >
                CHECK AVAILABILITY & RATES
              </button>
            </div>

            <div className="relative py-3 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dfd5c5]"></div>
              </div>
              <div className="relative bg-[#fcfbf8] px-4 text-[10px] text-neutral-400 tracking-widest uppercase">
                or reach us directly
              </div>
            </div>

            <div>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white h-12 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#20bd5a] transition-colors rounded-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                BOOK VIA WHATSAPP — INSTANT REPLY
              </a>
              <p className="text-center text-[10px] text-neutral-500 mt-4 leading-relaxed">
                Response within <strong>15 minutes</strong> — 8 AM - 10 PM daily<br />
                <span className="text-neutral-400">No payment required to inquire · Best rate guaranteed on direct booking</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
