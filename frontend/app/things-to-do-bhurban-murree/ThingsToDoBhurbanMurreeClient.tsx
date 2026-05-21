"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildBhurbanMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  bhurbanAdvantages,
  bhurbanFaqs,
  bhurbanRelatedLinks,
  dayTripDistances,
  forestTrailBhurban,
  golfBhurbanBullets,
} from "@/lib/seo/things-to-do-bhurban-content";
import BhurbanMurreeHeroCtaForm from "./BhurbanMurreeHeroCtaForm";
import { ArrowRight, ChevronRight, Flag, MapPin, Minus, Plus, TreePine } from "lucide-react";

export default function ThingsToDoBhurbanMurreeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans">
      <Navbar />
      <main>
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image src="/assets/blog-bhurban-forest-nature-walk.png" alt="Things to do in Bhurban Murree" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/85 to-[#1b261b]/50" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="text-[#c9a55b] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">BHURBAN · COMPLETE GUIDE</p>
                <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.08]">
                  Things to Do in Bhurban Murree —{" "}
                  <span className="text-[#c9a55b] italic font-light">Why Bhurban Beats the Town</span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Same mountain. Same pine forest. Without the tourist current that makes peak Murree town an exercise
                  in managing expectations.
                </p>
              </div>
              <BhurbanMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] text-[#5c5a52] leading-relaxed">
            <p>
              Everyone who has spent time in the Murree Hills knows Bhurban — but most know it as a 15-minute drive past
              on the way to Murree town. The Pearl Continental sign on the left, the golf club on the right, then the road
              curves toward the Mall Road crowd.
            </p>
            <p>
              Visitors who stay in Bhurban — specifically at Himalaya Villas — experience a different destination. Same
              mountain. Same pine forest. Same Himalayan ridgeline. Without the tourist current.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-8 text-center">
              Bhurban — the case for staying here instead of Murree town
            </p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {bhurbanAdvantages.map((line) => (
                <li key={line} className="text-[14px] text-[#b8c9b8] flex gap-2">
                  <span className="text-[#c9a55b]">•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">What Bhurban Is — And What It Is Not</h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed">
              Bhurban is a sub-locality at 6,500 feet — quieter than Murree town, residential and resort character rather
              than tourist bazaar. It sits 15 minutes south of Murree town, marginally closer to Islamabad. Bhurban is not
              the place for Mall Road bhutta — those are 15 minutes away. It is the place for the mountain without the
              commercial infrastructure: pine forest, Himalayan views, golf, private accommodation, quiet evenings.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <Flag className="w-8 h-8 text-[#c9a55b] mb-6" />
              <h2 className="font-display text-3xl text-[#1b261b] mb-6">Bhurban Golf Club</h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                18 holes across pine forest at 6,500 feet. Ball flight extends in thinner mountain air. Temperature 10–15°C
                below Islamabad June–August. Views from the fairway make golf feel like a different sport.
              </p>
              <ul className="space-y-2">
                {golfBhurbanBullets.map((item) => (
                  <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                    <span className="text-[#c9a55b]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={buildBhurbanMurreeWhatsAppUrl({ name: "Guest", activities: "Golf tee time" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b]"
              >
                Golfers: mention Bhurban Golf Club when you WhatsApp to book
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative aspect-[4/3] border border-[#e5e1d8] overflow-hidden">
              <Image src="/assets/gallery-garden.jpg" alt="Bhurban golf and forest" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-4xl mx-auto">
            <TreePine className="w-8 h-8 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl text-[#1b261b] mb-6">The Forest Walk That Begins at the Villa Gate</h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-8">
              The most genuinely Bhurban-specific activity — unavailable to visitors based elsewhere. Trails begin within
              five minutes of leaving the villa. No transport, booking, or trailhead fee.
            </p>
            <ul className="space-y-3">
              {forestTrailBhurban.map((item) => (
                <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                  <span className="text-[#c9a55b]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl text-[#1b261b] mb-6">Mountain Viewpoints — The Property as the Viewpoint</h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed italic border-l-2 border-[#c9a55b] pl-6 text-left">
              The mountain view is not an amenity at Himalaya Villas. It is the premise of the entire property.
            </p>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mt-6 text-left">
              Sunrise: light from grey to rose to gold across the ridgeline before 6am in summer, around 7am in winter.
              Sunset: western sky above the hills, pine forest dark against the sky. Neither requires leaving the property.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto">
            <MapPin className="w-8 h-8 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl text-[#1b261b] mb-8">Day Trips From Bhurban — The Geographic Advantage</h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-8 max-w-3xl">
              Murree town 15 min — Mall Road as an after-dinner impulse. Nathiagali 40 min — Miranjani as a morning activity,
              not a separate overnight. Guests who move from town hotels to Himalaya Villas consistently see more of the hills
              in three days from Bhurban.
            </p>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white">
              <table className="w-full text-left min-w-[520px] text-[13px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 text-xs font-bold uppercase">Destination</th>
                    <th className="p-4 text-xs font-bold uppercase">Drive</th>
                    <th className="p-4 text-xs font-bold uppercase">Why from Bhurban</th>
                  </tr>
                </thead>
                <tbody>
                  {dayTripDistances.map((row, i) => (
                    <tr key={row.destination} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">{row.destination}</td>
                      <td className="p-4 text-[#c9a55b] border-b border-[#e5e1d8]">{row.drive}</td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-[#1b261b] mb-10 text-center">Bhurban FAQs</h2>
            <div className="border border-[#e5e1d8]">
              {bhurbanFaqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q} className="border-b last:border-0">
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full py-5 px-6 flex justify-between text-left bg-white">
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

        <section className="py-14 px-6 border-t">
          <ul className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-3">
            {bhurbanRelatedLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex justify-between p-4 border bg-white hover:border-[#c9a55b]">
                  <span className="text-[14px]">{l.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#c9a55b]" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-20 px-6 bg-[#1b261b] text-center">
          <h2 className="font-display text-3xl text-white mb-4">Himalaya Villas Bhurban — The Best Version of Murree</h2>
          <p className="text-[#869986] mb-8">Private villa. Forest from the gate. Golf 5 minutes away.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildBhurbanMurreeWhatsAppUrl({ name: "Guest" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/himalaya-villas-bhurban-murree-rest-house" className="inline-flex items-center border border-[#c9a55b] text-[#c9a55b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest">
              Rest house page
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
