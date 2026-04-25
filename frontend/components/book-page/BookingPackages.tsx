"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function BookingPackages() {
  const packages = [
    {
      category: "COUPLES & LEISURE",
      title: "Honeymoon Sanctuary",
      duration: "2 Nights · Private Villa",
      price: "PKR 65,000",
      priceSuffix: "night",
      mostPopular: false,
      features: [
        "Private honeymoon villa with panoramic view",
        "Romantic candlelit dinner on arrival night",
        "Spa treatment for two (60 minutes each)",
        "Fresh flowers, fruit basket & welcome amenities",
        "Late checkout at 3 PM",
        "Dedicated villa attendant throughout stay"
      ],
      ctaText: "ENQUIRE - WHATSAPP",
      ctaLink: "https://wa.me/923000000000",
      ctaStyle: "outline"
    },
    {
      category: "FAMILIES & GROUPS",
      title: "Family Mountain Escape",
      duration: "2-3 Nights · Grand Family Villa",
      price: "PKR 80,000",
      priceSuffix: "night",
      mostPopular: true,
      features: [
        "Grand family villa (sleeps 6-8)",
        "Daily breakfast for all guests",
        "One private family dinner in the villa",
        "Guided nature trail in the Bhurban pine forest",
        "Bonfire & s'mores experience",
        "Children's welcome hamper on arrival"
      ],
      ctaText: "CHECK AVAILABILITY",
      ctaLink: "/book/stay",
      ctaStyle: "solid"
    },
    {
      category: "CORPORATE & BUSINESS",
      title: "Executive Retreat",
      duration: "2 Nights · Exclusive Villa Wing",
      price: "PKR 180,000",
      priceSuffix: "group",
      mostPopular: false,
      features: [
        "Exclusive villa wing (10-50 guests)",
        "Private board room with AV equipment",
        "All-inclusive catering for all sessions",
        "Team building activity programme",
        "Corporate billing & GST invoicing",
        "Dedicated event coordinator"
      ],
      ctaText: "REQUEST GROUP QUOTE",
      ctaLink: "https://wa.me/923000000000",
      ctaStyle: "outline"
    }
  ];

  return (
    <section className="bg-[#f6f1ea] px-6 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>CURATED STAY PACKAGES</span>
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1b261b] leading-[1.1] tracking-tight">
            Select Your
            <span className="block italic text-[#c9a55b] font-light mt-1">Mountain Escape</span>
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto">
            Every stay at Himalaya Villas is a composed experience. Choose a package designed for your occasion — or speak with our reservations team to build a bespoke programme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`bg-white border border-[#eae3d5] relative flex flex-col h-full shadow-lg ${pkg.mostPopular ? 'ring-2 ring-[#c9a55b] -translate-y-2' : ''}`}
            >
              {pkg.mostPopular && (
                <div className="absolute top-0 right-0 bg-[#c9a55b] text-[#1b261b] text-[9px] font-bold uppercase tracking-widest py-1.5 px-4 z-10">
                  MOST POPULAR
                </div>
              )}
              
              <div className="bg-[#1b261b] p-8 md:p-10 relative">
                <p className="text-[#c9a55b] text-[9px] font-bold uppercase tracking-[0.2em] mb-4">
                  {pkg.category}
                </p>
                <h3 className="font-display text-2xl text-white mb-2 tracking-tight">
                  {pkg.title}
                </h3>
                <p className="text-[12px] text-white/60">
                  {pkg.duration}
                </p>
              </div>

              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <div className="mb-8 pb-8 border-b border-[#eae3d5]">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mb-1">
                    FROM
                  </p>
                  <p className="font-display text-3xl text-[#1b261b]">
                    {pkg.price} <span className="text-[13px] text-neutral-400 font-sans font-normal italic tracking-normal">/ {pkg.priceSuffix}</span>
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-[13px] text-neutral-600 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <a
                    href={pkg.ctaLink}
                    className={`block w-full text-center py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      pkg.ctaStyle === 'solid' 
                        ? 'bg-[#1b261b] text-white hover:bg-black' 
                        : 'border border-[#dfd5c5] text-[#1b261b] hover:border-[#1b261b]'
                    }`}
                  >
                    {pkg.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
