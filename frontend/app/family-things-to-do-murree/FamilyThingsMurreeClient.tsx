"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildFamilyMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  ageGuideRows,
  familyActivities,
  familyFaqs,
  familyRelatedLinks,
  familyVillaHighlights,
} from "@/lib/seo/family-things-murree-content";
import FamilyMurreeHeroCtaForm from "./FamilyMurreeHeroCtaForm";
import {
  ArrowRight,
  Baby,
  ChevronRight,
  Minus,
  Mountain,
  Plus,
  Sparkles,
  TreePine,
  Users,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Family Things to Do in Murree — Kid-Friendly Activities Guide",
  description:
    "Best family activities in Murree — Patriata, Ayubia, horse riding, snowfall, Sozo Adventure Park. Why every family activity is better from Himalaya Villas Bhurban.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: familyFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const highlightIcons = [TreePine, Users, Sparkles, Mountain] as const;

export default function FamilyThingsMurreeClient() {
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
            src="/assets/gallery-interior.jpg"
            alt="Family stay at Himalaya Villas Bhurban Murree"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/82 to-[#1b261b]/55" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Users className="w-4 h-4" aria-hidden />
                  FAMILY GUIDE · BHURBAN · KID-FRIENDLY
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.15rem] text-white leading-[1.08]">
                  Family Things to Do in Murree —{" "}
                  <span className="text-[#c9a55b] italic font-light">
                    Activities for Every Age
                  </span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Patriata, Ayubia, horse riding, private grounds — the activities are the same. The base
                  you launch from determines whether the trip is a good memory or a managed inconvenience.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">4–12</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Guest capacity
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">PKR 80k+</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Family package
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">24hr</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Quote turnaround
                    </p>
                  </div>
                </div>
              </div>
              <FamilyMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        {/* Intro — two versions */}
        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-[15px] md:text-lg text-[#5c5a52] leading-relaxed">
              A family trip to Murree has two versions. This guide covers the best family activities in
              Murree — written from the version where your base is Himalaya Villas Bhurban.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-8 md:p-10 border border-[#e5e1d8] bg-[#f8f6f2]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-4">
                Version one — hotel in Murree town
              </p>
              <p className="text-[14px] text-[#5c5a52] leading-relaxed">
                Drive up Saturday in the Expressway queue. Share a hotel corridor with strangers. Manage
                children&apos;s meals around restaurant timing. Evenings in a room identical to every other
                hotel room. Activities are the same — but the platform makes it a managed inconvenience.
              </p>
            </div>
            <div className="p-8 md:p-10 border border-[#c9a55b]/40 bg-[#1b261b] shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a55b] mb-4">
                Version two — Himalaya Villas
              </p>
              <p className="text-[14px] text-[#b8c9b8] leading-relaxed">
                Children wake in private outdoor grounds before the first activity. Meals when they are
                ready — villa kitchen, no shared dining. Patriata, Nathiagali, Bhurban forest — at timing
                that suits your family, not the tour bus schedule.
              </p>
            </div>
          </div>
        </section>

        {/* What makes villas different */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-4 text-center">
              Himalaya Villas for Families — What Makes It Different
            </h2>
            <p className="text-center text-[#5c5a52] text-[15px] mb-12 max-w-2xl mx-auto">
              Family Mountain Escape package from PKR 80,000 · Groups of 4–12
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {familyVillaHighlights.map((item, i) => {
                const Icon = highlightIcons[i] ?? Users;
                return (
                  <div
                    key={item.title}
                    className="bg-white p-6 md:p-8 border border-[#e5e1d8] hover:border-[#c9a55b]/50 transition-colors"
                  >
                    <Icon className="w-7 h-7 text-[#c9a55b] mb-4" />
                    <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#1b261b] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#5c5a52] leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-10 text-center">
              <a
                href={SITE_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#1b261b] transition-colors"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay}
              </a>
            </p>
          </div>
        </section>

        {/* Age guide table */}
        <section className="py-16 md:py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Baby className="w-6 h-6 text-[#c9a55b]" />
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b]">
                Family Activity Age Guide
              </h2>
            </div>
            <p className="text-[14px] text-[#5c5a52] mb-8 max-w-2xl">
              Quick reference from Himalaya Villas — distances and minimum ages so you plan once, not on
              the road.
            </p>
            <div className="overflow-x-auto border border-[#e5e1d8] shadow-sm">
              <table className="w-full text-left border-collapse min-w-[720px] text-[12px] md:text-[13px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">Activity</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">Ages</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">From villa</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {ageGuideRows.map((row, i) => (
                    <tr key={row.activity} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">
                        {row.activity}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.ages}</td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8] whitespace-nowrap">
                        {row.fromProperty}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 md:py-28 px-6 bg-[#fcfbf8]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1b261b] text-center mb-14">
              Best Family Activities in{" "}
              <span className="text-[#c9a55b] italic">Murree &amp; Bhurban</span>
            </h2>
            <div className="space-y-8">
              {familyActivities.map((activity, index) => {
                const isFeatured = activity.id === "grounds";
                return (
                  <article
                    key={activity.id}
                    id={activity.id}
                    className={`scroll-mt-24 p-8 md:p-12 border ${
                      isFeatured
                        ? "bg-[#1b261b] border-[#2d402d] text-white"
                        : index % 2 === 0
                          ? "bg-white border-[#e5e1d8]"
                          : "bg-[#f2efe9] border-[#e5e1d8]"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <h3
                        className={`font-display text-2xl md:text-3xl leading-tight max-w-3xl ${
                          isFeatured ? "text-white" : "text-[#1b261b]"
                        }`}
                      >
                        {activity.title}
                      </h3>
                      {"badge" in activity && activity.badge ? (
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-[#c9a55b] text-[#1b261b] px-3 py-1.5">
                          {activity.badge}
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`space-y-5 text-[15px] leading-relaxed ${
                        isFeatured ? "text-[#869986]" : "text-[#5c5a52]"
                      }`}
                    >
                      {activity.paragraphs.map((p) => (
                        <p key={p.slice(0, 48)}>{p}</p>
                      ))}
                    </div>
                    {activity.bullets.length > 0 ? (
                      <ul className={`mt-8 space-y-3 ${isFeatured ? "text-[#b8c9b8]" : "text-[#5c5a52]"}`}>
                        {activity.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-[14px] leading-relaxed">
                            <span className="text-[#c9a55b] font-bold shrink-0">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {isFeatured ? (
                      <a
                        href={buildFamilyMurreeWhatsAppUrl({
                          name: "Guest",
                          adults: "2 Adults",
                          children: "2 children",
                          tripFocus: "Weekend family getaway",
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-10 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f]"
                      >
                        Family configurations for groups of 4–12 — WhatsApp your group size
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Image + package CTA */}
        <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e5e1d8]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] border border-[#e5e1d8] overflow-hidden">
              <Image
                src="/assets/gallery-exterior.jpg"
                alt="Family outdoor space at Himalaya Villas Bhurban"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
                Book the Family Mountain Escape
              </h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-4">
                Private villa · Safe outdoor grounds · Children&apos;s schedule, not the hotel&apos;s
              </p>
              <ul className="space-y-3 text-[14px] text-[#5c5a52] mb-8">
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  Grand family villa (sleeps 4–8) · daily breakfast · one private family dinner
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  Guided nature trail · bonfire &amp; s&apos;mores · children welcome hamper
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  Concierge plans Patriata, Ayubia, and transport before you arrive
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buildFamilyMurreeWhatsAppUrl({
                    name: "Guest",
                    tripFocus: "Weekend family getaway",
                    topActivity: "Full family itinerary",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
                >
                  WhatsApp {SITE_CONTACT.phoneDisplay}
                </a>
                <Link
                  href="/murree-hotel-packages"
                  className="inline-flex items-center justify-center gap-2 border border-[#1b261b] text-[#1b261b] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#1b261b] hover:text-white transition-colors"
                >
                  View packages
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Family Murree — FAQs
            </h2>
            <div className="border border-[#e5e1d8] bg-white">
              {familyFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#e5e1d8] last:border-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-[#fcfbf8] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-bold text-[#1b261b] pr-6 leading-snug">
                        {faq.q}
                      </span>
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
              {familyRelatedLinks.map((link) => (
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
            <Users className="w-10 h-10 text-[#c9a55b] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Every Family Activity Is Better From the Right Base
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Himalaya Villas Bhurban — private grounds, your schedule, activities planned before arrival
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildFamilyMurreeWhatsAppUrl({
                  name: "Guest",
                  tripFocus: "Weekend family getaway",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:border-white transition-colors"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
