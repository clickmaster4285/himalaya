"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildDiningMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  diningComparisonRows,
  diningFaqs,
  diningRelatedLinks,
  famousMurreeFoods,
  inVillaDiningBlocks,
  publicDiningOptions,
} from "@/lib/seo/best-restaurants-murree-content";
import DiningMurreeHeroCtaForm from "./DiningMurreeHeroCtaForm";
import {
  ArrowRight,
  ChefHat,
  ChevronRight,
  Coffee,
  Minus,
  Plus,
  Utensils,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Restaurants in Murree — Dining Guide | Himalaya Villas Bhurban",
  description:
    "Murree and Bhurban dining guide — Mall Road street food, Pearl Continental Bhurban, local restaurants, and why in-villa dining at Himalaya Villas changes the equation.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: diningFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function BestRestaurantsMurreeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image
            src="/assets/blog-bhurban-terrace-dining-dusk.png"
            alt="In-villa dining on mountain terrace at Himalaya Villas Bhurban"
            fill
            className="object-cover opacity-45"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/82 to-[#1b261b]/50" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Utensils className="w-4 h-4" aria-hidden />
                  DINING GUIDE · BHURBAN &amp; MURREE
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.15rem] text-white leading-[1.08]">
                  Best Restaurants in Murree —{" "}
                  <span className="text-[#c9a55b] italic font-light">
                    And the Dining Experience Restaurants Cannot Sell
                  </span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Mall Road karahi, Pearl Continental Bhurban, local Bhurban eateries — plus why in-villa
                  dining at Himalaya Villas is a different category entirely: private terrace, your timing,
                  fully Halal.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">100%</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Halal certified
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">Private</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Mountain terrace
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">Your time</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Not the kitchen&apos;s
                    </p>
                  </div>
                </div>
              </div>
              <DiningMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[15px] md:text-lg text-[#5c5a52] leading-relaxed">
              Dining in the Murree Hills splits into two worlds: public restaurants serving volume at peak
              hours, and private in-villa dining prepared for one group at the time you choose. This guide
              maps both — honestly — and explains why guests who care about the meal as an experience, not
              only the plate, base themselves at Himalaya Villas in Bhurban.
            </p>
          </div>
        </section>

        {/* Famous Murree foods */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Coffee className="w-6 h-6 text-[#c9a55b]" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b]">
                Famous Food in Murree — What to Try
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {famousMurreeFoods.map((food) => (
                <div
                  key={food.name}
                  className="bg-white p-6 md:p-8 border border-[#e5e1d8] hover:border-[#c9a55b]/40 transition-colors"
                >
                  <h3 className="text-lg font-bold text-[#1b261b] mb-2">{food.name}</h3>
                  <p className="text-[14px] text-[#5c5a52] leading-relaxed">{food.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[13px] text-[#5c5a52] text-center max-w-2xl mx-auto">
              Himalaya Villas guests often do Mall Road street food as a half-day outing — early morning or
              weekday evening — then return to the property for the main meals in-villa.
            </p>
          </div>
        </section>

        {/* Public restaurants */}
        <section className="py-16 md:py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1b261b] text-center mb-4">
              Restaurants in Murree &amp;{" "}
              <span className="text-[#c9a55b] italic">Bhurban</span>
            </h2>
            <p className="text-center text-[#5c5a52] text-[15px] mb-14 max-w-2xl mx-auto">
              When you want a change from in-villa meals, these are the options guests reference most.
            </p>
            <div className="space-y-8">
              {publicDiningOptions.map((option, index) => (
                <article
                  key={option.id}
                  id={option.id}
                  className={`scroll-mt-24 p-8 md:p-10 border ${
                    index === 0 ? "bg-[#fcfbf8] border-[#c9a55b]/30" : "bg-white border-[#e5e1d8]"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a55b] mb-2">
                    {option.subtitle}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-5">{option.title}</h3>
                  <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">{option.description}</p>
                  <ul className="space-y-2">
                    {option.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed">
                        <span className="text-[#c9a55b] font-bold shrink-0">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* In-villa dining — featured */}
        <section className="py-16 md:py-28 px-6 bg-[#172017] text-white overflow-hidden">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <ChefHat className="w-10 h-10 text-[#c9a55b] mb-6" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-6">
                The In-Villa Dining Experience — Why It Changes the Equation
              </h2>
              <p className="text-[15px] text-[#869986] leading-relaxed mb-6">
                Restaurants in Murree and Bhurban are serving hundreds of guests at peak times. The
                quality-per-plate is managed down to a level that accommodates volume. In-villa dining is
                prepared for one group — yours — at the time you specify, with the menu agreed in advance
                with the head chef. There is no volume management.
              </p>
              <div className="space-y-8 mt-10">
                {inVillaDiningBlocks.map((block) => (
                  <div key={block.title}>
                    <h3 className="text-[#c9a55b] text-sm font-bold uppercase tracking-widest mb-2">
                      {block.title}
                    </h3>
                    <p className="text-[14px] text-[#b8c9b8] leading-relaxed">{block.description}</p>
                  </div>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-[#c9a55b] pl-6">
                <p className="font-display text-xl md:text-2xl text-white italic leading-relaxed">
                  The mountain view from the table is not an amenity. It is the point.
                </p>
              </blockquote>
              <a
                href={buildDiningMurreeWhatsAppUrl({
                  name: "Guest",
                  diningPreference: "Interested in seasonal menu details",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-10 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f]"
              >
                Ask about the current seasonal menu when you book
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative aspect-[4/5] border border-[#2d402d] overflow-hidden">
              <Image
                src="/assets/blog-bhurban-pc-fine-dining-interior.png"
                alt="Chef-prepared dining at Himalaya Villas"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172017]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-sm font-medium">Private terrace · Halal · Your schedule</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Restaurant Dining vs In-Villa at Himalaya Villas
            </h2>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white shadow-sm">
              <table className="w-full text-left border-collapse min-w-[680px] text-[13px] md:text-[14px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[22%]">Factor</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[39%]">
                      Public restaurant
                    </th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[39%] text-[#c9a55b]">
                      Himalaya Villas in-villa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diningComparisonRows.map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">
                        {row.factor}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.restaurant}</td>
                      <td className="p-4 text-[#1b261b] font-medium border-b border-[#e5e1d8] bg-[#c9a55b]/5">
                        {row.inVilla}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Meal timeline — extra section */}
        <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              A Typical Dining Day at Himalaya Villas
            </h2>
            <ol className="space-y-0 border-l-2 border-[#c9a55b] ml-4 md:ml-6">
              {[
                {
                  time: "Morning",
                  title: "Terrace breakfast",
                  desc: "Paratha, eggs, fruit, chai — when your group is ready, with the ridgeline in view.",
                },
                {
                  time: "Midday",
                  title: "Optional Mall Road or Bhurban lunch",
                  desc: "Street food, karahi, or a quick local restaurant — concierge advises on timing.",
                },
                {
                  time: "Afternoon",
                  title: "Light lunch in-villa",
                  desc: "Packed lunch or simple in-villa meal if you stayed on property for activities.",
                },
                {
                  time: "Evening",
                  title: "Multi-course dinner or bonfire meal",
                  desc: "Private table or fireside service — course order and timing in your control.",
                },
              ].map((step) => (
                <li key={step.time} className="relative pl-8 pb-10 last:pb-0">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#c9a55b]" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a55b] mb-1">
                    {step.time}
                  </p>
                  <h3 className="text-lg font-bold text-[#1b261b] mb-2">{step.title}</h3>
                  <p className="text-[14px] text-[#5c5a52] leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Dining in Murree — FAQs
            </h2>
            <div className="border border-[#e5e1d8] bg-white">
              {diningFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#e5e1d8] last:border-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-[#fcfbf8] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-bold text-[#1b261b] pr-6 leading-snug">{faq.q}</span>
                      <span className="shrink-0 w-7 h-7 border border-[#e5e1d8] flex items-center justify-center text-neutral-500">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="px-6 pb-6 text-[14px] text-[#5c5a52] leading-relaxed">{faq.a}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-14 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-[#1b261b] mb-6">Related guides</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {diningRelatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between gap-2 p-4 border border-[#e5e1d8] rounded-lg hover:border-[#c9a55b] hover:bg-[#fcfbf8] transition-colors group"
                  >
                    <span className="text-[14px] font-medium text-[#1b261b] group-hover:text-[#c9a55b]">
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 px-6 bg-[#1b261b] text-center">
          <div className="max-w-2xl mx-auto">
            <Utensils className="w-10 h-10 text-[#c9a55b] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Stay at Himalaya Villas — The Best Dining in Bhurban Is In-Villa
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Private mountain terrace · Chef-prepared · Halal · Your timing, not the restaurant&apos;s
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildDiningMurreeWhatsAppUrl({
                  name: "Guest",
                  diningPreference: "Interested in seasonal menu details",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay}
              </a>
              <Link
                href="/himalaya-villas-bhurban-murree-rest-house"
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:border-white transition-colors"
              >
                Himalaya Villas Bhurban
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
