"use client";

import React from "react";
import { Award, CheckCircle, ShieldCheck, CalendarRange } from "lucide-react";

export default function BookingAbout() {
  const highlights = [
    {
      icon: <Award className="w-5 h-5 text-[#c9a55b]" />,
      title: "TripAdvisor Travellers' Choice",
      desc: "Recognized among the top luxury properties in Murree Hills by verified guest review volume and quality score."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-[#c9a55b]" />,
      title: "Booking.com Preferred Partner",
      desc: "Preferred Partner status awarded for sustained guest satisfaction scores, availability, and rapid response performance."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#c9a55b]" />,
      title: "100% Halal-Certified Property",
      desc: "Every food item served at Himalaya Villas is prepared under halal standards. No alcohol on premises. Family-safe environment."
    },
    {
      icon: <CalendarRange className="w-5 h-5 text-[#c9a55b]" />,
      title: "Year-Round Operations",
      desc: "All villas are fully heated in winter and naturally cooled in summer. Himalaya Villas operates 365 days per year with no seasonal closures."
    }
  ];

  const info = [
    { label: "CHECK-IN", value: "2:00 PM (Early from 12 PM on request)" },
    { label: "CHECK-OUT", value: "12:00 PM (Late to 3 PM for direct guests)" },
    { label: "VILLAS AVAILABLE", value: "12 Private Villas" },
    { label: "CAPACITY", value: "2 - 8 guests per villa" },
    { label: "RATE RANGE", value: "PKR 35,000 - 95,000 / night" },
    { label: "CANCELLATION", value: "Free — 7+ days before arrival" },
    { label: "PAYMENT METHODS", value: "Bank Transfer · Easypaisa · JazzCash" },
    { label: "LANGUAGES", value: "Urdu · English" },
    { label: "FOOD", value: "100% Halal - Pakistani & Continental" },
    { label: "HEATING / COOLING", value: "Central heating & air conditioning in all villas" },
    { label: "PARKING", value: "Complimentary secure on-site parking" },
    { label: "TRANSFERS", value: "From Islamabad — available on request" }
  ];

  return (
    <section className="bg-white px-6 py-20 md:py-28 border-b border-[#eae3d5]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Side: About Text & Highlights */}
        <div>
          <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>ABOUT HIMALAYA VILLAS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1b261b] leading-[1.1] tracking-tight mb-8">
            Pakistan's Benchmark for
            <span className="block italic text-[#c9a55b] font-light mt-1">Mountain Villa Hospitality</span>
          </h2>
          
          <div className="space-y-6 text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-light mb-12">
            <p>
              Himalaya Villas is Bhurban's original luxury private villa estate — conceived and built to fill a gap that Pakistan's mountain hospitality market had long ignored: truly private, truly personal, truly luxurious accommodation away from the noise of conventional hotels.
            </p>
            <p>
              Located at 1,850 metres above sea level in Bhurban, Murree Hills, the estate comprises twelve individually appointed private villas ranging from intimate suites for two to grand family villas accommodating up to eight guests. Every villa commands unobstructed panoramic views across the Himalayan foothills.
            </p>
            <p>
              Our hospitality team — many drawn from Pakistan's finest hotel brands — operates on a single philosophy: anticipate before being asked, personalise without being intrusive, and deliver consistently at the highest standard.
            </p>
          </div>

          <div className="space-y-8 border-t border-[#eae3d5] pt-8">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#fcfbf8] border border-[#eae3d5] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1b261b] mb-1">{item.title}</h4>
                  <p className="text-[13px] text-neutral-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Essential Information Box */}
        <div className="lg:mt-4">
          <div className="bg-[#fcfbf8] border border-[#eae3d5] p-8 md:p-12 shadow-sm sticky top-24">
            <h3 className="font-display text-2xl text-[#1b261b] mb-8">Essential Information</h3>
            
            <div className="divide-y divide-[#eae3d5]">
              {info.map((item, i) => (
                <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-[13px] text-neutral-800 text-right font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
