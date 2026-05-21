"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildCouplesMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  couplesFaqs,
  couplesPackages,
  couplesRelatedLinks,
  couplesWeekendTimeline,
  inVillaDiningBullets,
  kashmirPointDawn,
  pindiPointSunset,
  privacyComparison,
  romanticExperienceCards,
  winterCouplesAddOns,
} from "@/lib/seo/couples-things-murree-content";
import CouplesMurreeHeroCtaForm from "./CouplesMurreeHeroCtaForm";
import {
  ArrowRight,
  ChevronRight,
  Flame,
  Heart,
  Minus,
  Moon,
  Plus,
  Sunrise,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Things to Do in Murree for Couples — Romantic Guide",
  description:
    "Most romantic things to do in Murree for couples — Kashmir Point at dawn, forest walks, mountain dining, private bonfire evenings at Himalaya Villas Bhurban.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: couplesFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function CouplesThingsMurreeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main>
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image
            src="/assets/gallery-interior.jpg"
            alt="Romantic stay for couples at Himalaya Villas Bhurban Murree"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/88 to-[#1b261b]/60" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Heart className="w-4 h-4" aria-hidden />
                  COUPLES · ROMANCE · PRIVACY
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.05rem] text-white leading-[1.08]">
                  Things to Do in Murree for Couples —{" "}
                  <span className="text-[#c9a55b] italic font-light">The Privacy Principle</span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Sunrise with no one else present. Bonfire with no crowd noise. Dinner with no restaurant
                  floor — privacy is the precondition of romance, not an add-on.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">5:15</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Kashmir Point depart
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">PKR 55k</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Weekend from
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">45 min</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      From Islamabad
                    </p>
                  </div>
                </div>
              </div>
              <CouplesMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] md:text-lg text-[#5c5a52] leading-relaxed">
            <p>
              Most couples who visit Murree experience it from a shared hotel floor, a crowded viewpoint, and a
              restaurant table surrounded by other tables. The mountain backdrop is the same one that appears in
              every Murree photograph. The atmosphere is — by design — public.
            </p>
            <p>
              Murree&apos;s romantic potential is genuine. A sunrise over the Himalayan ridgeline with no one else
              present, a forest walk in morning light through pine trees, a dinner on a mountain terrace with no
              visible city and no sound but wind — these are experiences that the destination makes possible. But
              only from the right base.
            </p>
            <p className="font-medium text-[#1b261b]">
              This guide covers the best activities in Murree for couples. Every activity on this list is better
              from Himalaya Villas — because privacy is not an add-on to romance. It is the precondition of it.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-8 text-center">
              Himalaya Villas couples packages
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {couplesPackages.map((pkg) => (
                <div key={pkg.name} className="bg-[#1b261b] border border-[#2d402d] p-8 flex flex-col">
                  <h3 className="font-display text-xl text-[#c9a55b] mb-2">{pkg.name}</h3>
                  <p className="text-white font-bold text-lg mb-4">{pkg.price}</p>
                  <p className="text-[13px] text-[#b8c9b8] leading-relaxed flex-1">{pkg.includes}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[12px] text-[#869986]">
              Direct bookings receive preferential availability and rate
            </p>
            <p className="mt-4 text-center">
              <a
                href={buildCouplesMurreeWhatsAppUrl({ name: "Guest", occasion: "Weekend escape" })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f] inline-flex items-center gap-2"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay} — tell us the occasion
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Four Experiences That Define the Trip
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {romanticExperienceCards.map((card) => (
                <div key={card.title} className="bg-white p-8 border border-[#e5e1d8]">
                  <h3 className="text-[#c9a55b] text-sm font-bold uppercase tracking-widest mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-[#5c5a52] leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Sunrise className="w-8 h-8 text-[#c9a55b] mb-6" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
                Kashmir Point at Dawn — The Empty Viewpoint
              </h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                Kashmir Point at 5:30am is a different place from Kashmir Point at 11am. The viewpoint is empty.
                The panorama extends without obstruction. Himalaya Villas couples: the villa kitchen prepares chai
                in a thermos the night before. The drive takes 20 minutes. You are back for breakfast before the
                Expressway queue forms.
              </p>
              <ul className="space-y-2">
                {kashmirPointDawn.map((item) => (
                  <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                    <span className="text-[#c9a55b]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] border border-[#e5e1d8] overflow-hidden">
              <Image src="/assets/murree-mountain-hero.jpg" alt="Kashmir Point sunrise Murree Hills" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8] border-y border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              The Mountain Terrace Sunrise — Without Leaving the Property
            </h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed">
              The Himalaya Villas mountain terrace faces the Himalayan ridgeline directly. First light arrives
              across the mountain faces before the valley below is lit — deep grey to rose to gold while the pine
              forest below is still in shadow. The villa kitchen prepares the earliest breakfast on any morning a
              couple requests it. Chai, paratha, fruit — served on the terrace as the mountain light moves. No
              travel required. The property is the viewpoint.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 bg-[#172017] text-white">
          <div className="max-w-4xl mx-auto">
            <Flame className="w-10 h-10 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Private Bonfire Evening — The One Experience Guests Come Back For
            </h2>
            <div className="space-y-5 text-[15px] text-[#b8c9b8] leading-relaxed">
              <p>
                The private bonfire at Himalaya Villas is the most consistently cited experience in guest
                feedback across all seasons. The villa host arranges the fire on the outdoor terrace before your
                requested timing. The in-villa kitchen prepares a fireside dinner — served at the fire, at your
                pace, without a restaurant schedule.
              </p>
              <p>
                For honeymoon couples, anniversary celebrations, or any occasion that warrants a memorable
                evening: the private bonfire competes with nothing else available in the Murree Hills. Most
                powerful on snowfall evenings in January and February.
              </p>
              <p className="text-[#c9a55b] font-medium">
                Include the bonfire in your WhatsApp booking message. It is set up before you arrive.
              </p>
            </div>
            <a
              href={buildCouplesMurreeWhatsAppUrl({
                name: "Guest",
                occasion: "Anniversary",
                mustHave: "Private bonfire evening",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f]"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay} — occasion, date, and mood
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
                Pindi Point at Sunset — The Forest Walk for Two
              </h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                The forest walk at Pindi Point in the late afternoon puts couples in the pine canopy at golden
                hour. In autumn (October–November), the light produces photographs that make Murree look nothing
                like its Mall Road reputation.
              </p>
              <ul className="space-y-2">
                {pindiPointSunset.map((item) => (
                  <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                    <span className="text-[#c9a55b]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
                In-Villa Mountain Dining — The Dinner That Competes With Nothing
              </h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                Served on the mountain terrace or at the indoor fireplace table in winter — the setting, privacy,
                and absence of restaurant logistics create something no restaurant table produces. The head chef
                meets with couples who want a specific menu before the stay.
              </p>
              <ul className="space-y-2">
                {inVillaDiningBullets.map((item) => (
                  <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                    <span className="text-[#c9a55b]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-4xl mx-auto">
            <Moon className="w-8 h-8 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Mountain Terrace Stargazing — After the Bonfire
            </h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed">
              On clear nights away from Mall Road light pollution, the terrace above Bhurban offers open-sky
              stargazing without leaving the property. Many couples extend the bonfire evening with blankets and
              chai on the terrace — the same ridgeline that caught morning light now holds a full sky. Autumn and
              winter (Oct–Feb) bring the clearest air after monsoon.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Sample Couples Weekend Timeline
            </h2>
            <div className="space-y-4">
              {couplesWeekendTimeline.map((item) => (
                <div key={item.time} className="flex gap-6 p-6 border border-[#e5e1d8] bg-[#fcfbf8]">
                  <p className="text-[#c9a55b] text-xs font-bold uppercase tracking-widest shrink-0 w-28 pt-0.5">
                    {item.time}
                  </p>
                  <p className="text-[14px] text-[#5c5a52] leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-8 text-center">
              Why Privacy Changes the Experience
            </h2>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white">
              <table className="w-full text-left border-collapse min-w-[560px] text-[13px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 text-xs font-bold uppercase">Aspect</th>
                    <th className="p-4 text-xs font-bold uppercase">Typical hotel</th>
                    <th className="p-4 text-xs font-bold uppercase">Himalaya Villas</th>
                  </tr>
                </thead>
                <tbody>
                  {privacyComparison.map((row, i) => (
                    <tr key={row.aspect} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">
                        {row.aspect}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.hotel}</td>
                      <td className="p-4 text-[#1b261b] border-b border-[#e5e1d8] font-medium">{row.villa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl mb-6 text-center">Winter Couples — Snow &amp; Bonfire</h2>
            <ul className="space-y-3">
              {winterCouplesAddOns.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-[#b8c9b8] leading-relaxed">
                  <span className="text-[#c9a55b]">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link
                href="/things-to-do-in-murree-in-winter"
                className="text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f] inline-flex items-center gap-2"
              >
                Full winter guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">Couples FAQs</h2>
            <div className="border border-[#e5e1d8]">
              {couplesFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#e5e1d8] last:border-0 bg-[#fcfbf8]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-5 px-6 flex items-center justify-between text-left bg-white hover:bg-[#fcfbf8]"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-bold text-[#1b261b] pr-6">{faq.q}</span>
                      <span className="shrink-0 w-7 h-7 border border-[#e5e1d8] flex items-center justify-center">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="px-6 pb-6 text-[14px] text-[#5c5a52] leading-relaxed bg-white">{faq.a}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 px-6 border-t border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-[#1b261b] mb-6">Related guides</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {couplesRelatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between p-4 border border-[#e5e1d8] bg-white rounded-lg hover:border-[#c9a55b] group"
                  >
                    <span className="text-[14px] font-medium group-hover:text-[#c9a55b]">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#c9a55b]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 bg-[#1b261b] text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="w-10 h-10 text-[#c9a55b] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Book Your Couples Escape — Himalaya Villas Bhurban
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Private villa | Kashmir Point at dawn | Bonfire evenings | Mountain terrace dinner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildCouplesMurreeWhatsAppUrl({
                  name: "Guest",
                  occasion: "Honeymoon",
                  mustHave: "All of the above",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f]"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#c9a55b] text-[#c9a55b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#c9a55b]/10"
              >
                Honeymoon &amp; couples packages
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
