"use client";

import React from "react";

export default function BookingReviews() {
  const reviews = [
    {
      text: "The finest mountain stay in Pakistan, without question. The villa was immaculate — down to crisp sheets so clean I thought they had replaced the windows with paintings. Staff anticipated every need before we expressed it. Himalaya Villas has no peer in Murree.",
      author: "Tariq Mahmood",
      details: "Islamabad - Stayed Feb 2024 - Family",
      platform: "TRIPADVISOR",
      stars: "★★★★★"
    },
    {
      text: "We booked for our anniversary and arrived expecting a nice stay. We left transformed. The private terrace, the mountain air at 5 AM, the breakfast delivered exactly when we asked — nothing else in Murree operates at this level. We have already rebooked for Eid.",
      author: "Sana Rizvi",
      details: "Lahore - Stayed Jan 2024 - Couple",
      platform: "BOOKING.COM",
      stars: "10/10"
    },
    {
      text: "We brought 24 people for a two-day corporate offsite. The logistics were handled flawlessly — meeting rooms, catering, accommodation, team activities. My team called it the best company event we have ever had. The GM personally checked on us twice daily.",
      author: "Asim Chaudhry",
      details: "Rawalpindi - Corporate Retreat - Group of 24",
      platform: "GOOGLE",
      stars: "★★★★★"
    }
  ];

  return (
    <section className="bg-[#1a2318] px-6 py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]"></span>
            <span>VERIFIED GUEST REVIEWS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight">
            What Our Guests Say About
            <span className="block italic text-[#c9a55b] font-light mt-1">Booking Murree Hotels With Us</span>
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-white/70 leading-relaxed font-light max-w-2xl">
            Every review below is from a verified guest who stayed at Himalaya Villas. We have not curated these — we have simply earned them through consistent service.
          </p>
        </div>

        {/* Rating Header Block */}
        <div className="border border-[#2d3a2b] bg-[#1e291c] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="text-[#c9a55b] font-display text-5xl md:text-6xl">
              4.8
            </div>
            <div>
              <div className="text-[#c9a55b] text-xl mb-1 tracking-widest">
                ★★★★★
              </div>
              <p className="text-white/60 text-[11px] uppercase tracking-widest font-bold">
                127 verified guest reviews
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 md:gap-12">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">GOOGLE</p>
              <p className="text-[#c9a55b] text-[13px] font-bold">4.7 ★</p>
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">TRIPADVISOR</p>
              <p className="text-[#c9a55b] text-[13px] font-bold">4.9 ★</p>
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">BOOKING.COM</p>
              <p className="text-[#c9a55b] text-[13px] font-bold">9.1</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="border border-[#2d3a2b] bg-[#1e291c] p-8 md:p-10 flex flex-col h-full hover:border-[#c9a55b]/50 transition-colors"
            >
              <div className="text-[#c9a55b] font-display text-5xl opacity-40 leading-none mb-4">
                "
              </div>
              <p className="text-[13px] text-white/80 leading-relaxed font-light flex-grow mb-10 italic">
                {r.text}
              </p>
              
              <div className="flex justify-between items-end border-t border-[#2d3a2b] pt-6">
                <div>
                  <p className="text-white text-[13px] font-bold mb-1">{r.author}</p>
                  <p className="text-white/40 text-[10px]">{r.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-[9px] uppercase tracking-widest font-bold mb-1">{r.platform}</p>
                  <p className="text-[#c9a55b] text-[12px] tracking-widest">{r.stars}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
