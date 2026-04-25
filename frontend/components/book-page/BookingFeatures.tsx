"use client";

import React from "react";

export default function BookingFeatures() {
  const features = [
    {
      num: "01",
      title: "GUARANTEED LOWEST RATE",
      desc: "Our direct booking rate is always equal to or lower than any OTA platform. We never reward third-party commissions at your expense. Book direct, pay less, receive more."
    },
    {
      num: "02",
      title: "HUMAN RESERVATIONS - 15 MIN RESPONSE",
      desc: "No bots. No automated queues. A dedicated reservations manager responds to every inquiry within 15 minutes via WhatsApp and confirms your villa personally."
    },
    {
      num: "03",
      title: "FLEXIBLE CANCELLATION",
      desc: "Cancellations 7 days before arrival receive a full refund of advance payment. We accommodate schedule changes where third-party booking sites cannot."
    },
    {
      num: "04",
      title: "COMPLIMENTARY UPGRADES",
      desc: "Direct guests are prioritised for villa upgrades, early check-in from 12 PM, and late check-out to 3 PM — subject to availability. OTA bookings are not eligible."
    }
  ];

  return (
    <section className="bg-[#fcfbf8] px-6 py-20 md:py-28 border-b border-[#eae3d5]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>WHY BOOK DIRECTLY WITH US</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1b261b] leading-[1.1] tracking-tight">
            Murree Hotel Booking
            <span className="block italic text-[#c9a55b] font-light mt-1">Done Right.</span>
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-light max-w-3xl">
            Booking Murree hotels through OTAs costs you more and gives you less. When you book directly with Himalaya Villas, you receive priority treatment, our lowest available rate, and a human reservations team — not an algorithm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#eae3d5] bg-white">
          {features.map((f, i) => (
            <div 
              key={f.num} 
              className={`p-8 lg:p-10 ${i !== features.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#eae3d5]' : ''}`}
            >
              <div className="text-[32px] md:text-[40px] font-display text-[#eae3d5] mb-6 tracking-tight">
                {f.num}
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1b261b] mb-4 leading-relaxed">
                {f.title}
              </h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed font-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
