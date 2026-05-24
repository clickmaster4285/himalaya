"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildMurree3DayWhatsAppUrl } from "@/lib/whatsapp";
import type { ScheduleRow } from "@/lib/seo/murree-3-day-itinerary-content";
import {
  day1Schedule,
  day2Schedule,
  day3Schedule,
  itineraryFaqs,
  itineraryRelatedLinks,
  packingClothing,
  packingFootwear,
  packingGear,
  packingWinter,
  trafficTips,
  tripAtGlance,
} from "@/lib/seo/murree-3-day-itinerary-content";
import Murree3DayHeroCtaForm from "./Murree3DayHeroCtaForm";
import { ArrowRight, Calendar, ChevronRight, Luggage, Minus, Plus, Route } from "lucide-react";

function DayTable({ title, rows }: { title: string; rows: ScheduleRow[] }) {
  return (
    <div className="mb-16">
      <h3 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-6">{title}</h3>
      <div className="overflow-x-auto border border-[#e5e1d8] bg-white shadow-lg">
        <table className="w-full text-left border-collapse min-w-[640px] text-[13px]">
          <thead>
            <tr className="bg-[#1b261b] text-white">
              <th className="p-4 text-xs font-bold uppercase">Time</th>
              <th className="p-4 text-xs font-bold uppercase">Activity</th>
              <th className="p-4 text-xs font-bold uppercase">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.time + row.activity} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                <td className="p-4 font-medium text-[#c9a55b] border-b border-[#e5e1d8] whitespace-nowrap">{row.time}</td>
                <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">{row.activity}</td>
                <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Murree3DayItineraryClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans">
      <Navbar />
      <main>
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image src="/assets/murree-mountain-hero.jpg" alt="Murree 3 day itinerary from Bhurban" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/85 to-[#1b261b]/50" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Calendar className="w-4 h-4" />
                  3 DAYS · BHURBAN BASE · 2026
                </p>
                <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.08]">
                  Murree 3-Day Itinerary —{" "}
                  <span className="text-[#c9a55b] italic font-light">Day-by-Day Guide &amp; Packing List</span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Murree town, Nathiagali, Patriata, and Bhurban forest — one villa base, no hotel changes, less
                  logistics than a Murree town stay.
                </p>
              </div>
              <Murree3DayHeroCtaForm />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] text-[#5c5a52] leading-relaxed">
            <p>
              Most Murree itinerary guides assume your base is Murree town. This itinerary is written from Himalaya
              Villas in Bhurban — 15 minutes from Murree town, 40 minutes from Nathiagali, with Bhurban forest directly
              from the property gate.
            </p>
            <p>
              If you are planning a 3-day Murree trip and have not yet confirmed accommodation: this itinerary is built
              around Himalaya Villas, and the property is what makes the timing work.
            </p>
            <a
              href={buildMurree3DayWhatsAppUrl({ name: "Guest", preArrange: "All of the above" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b]"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay} — check dates before reading further
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-8">3-day trip at a glance</p>
            <ul className="space-y-3 text-left max-w-xl mx-auto mb-8">
              {tripAtGlance.days.map((d) => (
                <li key={d} className="text-[14px] text-[#b8c9b8] flex gap-2">
                  <Route className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-[#869986]">Base: {tripAtGlance.base}</p>
            <p className="text-[13px] text-[#c9a55b] mt-2">Optimal months: {tripAtGlance.optimalMonths}</p>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto">
            <DayTable title="Day 1 — Arrival, Murree Town, Evening" rows={day1Schedule} />
            <p className="text-[13px] text-[#5c5a52] italic mb-16 border-l-2 border-[#c9a55b] pl-4">
              If you want a Day 1 bonfire — include it in your WhatsApp booking message. Arranged before arrival.
            </p>
            <DayTable title="Day 2 — Nathiagali, Miranjani, Galliyat" rows={day2Schedule} />
            <p className="text-[14px] text-[#5c5a52] mb-16">
              Day 2 is the active day. Miranjani takes 3–5 hours return; Ayubia cable car adds 1.5 hours. 6:30am
              departure returns you by 6pm with time for bonfire evening.
            </p>
            <DayTable title="Day 3 — Patriata, Bhurban, Departure" rows={day3Schedule} />
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-4 flex items-center gap-3">
              <Luggage className="w-8 h-8 text-[#c9a55b]" />
              Complete Packing List
            </h2>
            <p className="text-[14px] text-[#5c5a52] mb-10 italic">
              Himalaya Villas provides all indoor amenities — pack light on accommodation; this list is for outdoor time only.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { title: "Clothing — all seasons", items: packingClothing },
                { title: "Footwear", items: packingFootwear },
                { title: "Gear and practical", items: packingGear },
                { title: "Winter additional", items: packingWinter },
              ].map((block) => (
                <div key={block.title}>
                  <h3 className="font-bold text-[#1b261b] mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                        <span className="text-[#c9a55b]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8] border-y border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl text-[#1b261b] mb-6">Islamabad ↔ Murree Traffic Tips</h2>
            <ul className="space-y-3">
              {trafficTips.map((tip) => (
                <li key={tip} className="text-[14px] text-[#5c5a52] flex gap-2">
                  <span className="text-[#c9a55b]">→</span>
                  {tip}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] text-[#5c5a52]">
              <strong>2 nights vs 3:</strong> Two nights works for families with young children; three days covers the full
              range without compressing Miranjani or Patriata.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-[#1b261b] mb-10 text-center">Itinerary FAQs</h2>
            <div className="border border-[#e5e1d8]">
              {itineraryFaqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q} className="border-b last:border-0 bg-white">
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full py-5 px-6 flex justify-between text-left">
                      <span className="text-[14px] font-bold text-[#1b261b] pr-6">{faq.q}</span>
                      {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                    {open ? <div className="px-6 pb-6 text-[14px] text-[#5c5a52] leading-relaxed">{faq.a}</div> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 px-6">
          <div className="max-w-4xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-3">
              {itineraryRelatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex justify-between p-4 border bg-white hover:border-[#c9a55b]">
                    <span className="text-[14px]">{l.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#c9a55b]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#1b261b] text-center">
          <a
            href={buildMurree3DayWhatsAppUrl({ name: "Guest", preArrange: "Full pre-arrival briefing" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest"
          >
            Book 3 nights — WhatsApp {SITE_CONTACT.phoneDisplay}
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
