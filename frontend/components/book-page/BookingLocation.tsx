"use client";

import React from "react";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const DIRECTIONS_WHATSAPP = buildWhatsAppBookingUrl("directions hotel in bhurban murree");
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Himalaya+Villas+Bhurban+Murree";

export default function BookingLocation() {
  const distances = [
    { label: "Islamabad (F-7 / Blue Area)", distance: "60 km - ~1.5 hrs" },
    { label: "Rawalpindi (Saddar)", distance: "58 km - ~1.5 hrs" },
    { label: "Bhurban Murree Town Centre", distance: "8 km - ~15 min" },
    { label: "Lahore (via Motorway)", distance: "~390 km - ~4 hrs" },
    { label: "Islamabad International Airport", distance: "78 km - ~90 min" },
    { label: "Pearl Continental Bhurban", distance: "3.5 km - ~8 min" }
  ];

  return (
    <section className="bg-[#1b261b] px-6 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Text and Distances */}
        <div>
          <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>LOCATION & DIRECTIONS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-2">
            Bhurban Murree Hills
          </h2>
          <p className="font-display text-2xl md:text-3xl text-[#c9a55b] italic font-light mb-8">
            60 km from Islamabad
          </p>
          
          <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed font-light mb-12 max-w-lg">
            Finding a hotel in bhurban on a map is easy — finding a private ridge with twelve villas is different.
            We sit at 1,850 metres on a forested slope, roughly 60 km from Islamabad via Murree Expressway, minutes from
            Pearl Continental Bhurban and Murree town.
          </p>

          <div className="space-y-4">
            {distances.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[13px] text-white/80 font-light">{item.label}</span>
                <span className="text-[11px] text-[#c9a55b] font-bold tracking-widest">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Map Box */}
        <div className="w-full">
          <div className="bg-[#212d21] border border-[#2d3a2b] p-8 md:p-16 flex flex-col items-center justify-center text-center h-full min-h-[450px]">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 relative">
              <div className="w-2 h-2 rounded-full bg-[#c9a55b]"></div>
              <div className="absolute inset-0 rounded-full border border-[#c9a55b] animate-ping opacity-20"></div>
            </div>
            
            <h3 className="font-display text-2xl text-white mb-4">Himalaya Villas, Bhurban</h3>
            <p className="text-[12px] text-white/50 tracking-widest uppercase leading-loose mb-10">
              Bhurban Road, Bhurban,<br />
              Bhurban Murree Hills - 47160, Pakistan
            </p>

            <div className="w-full max-w-xs space-y-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#c9a55b] text-[#1b261b] py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
              >
                Open bhurban hotel murree location — Maps
              </a>
              <a
                href={DIRECTIONS_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-white/20 text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:border-white transition-colors"
              >
                WhatsApp directions to resort in bhurban
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
