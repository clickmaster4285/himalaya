"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildWinterMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  packingList,
  winterActivities,
  winterAtAGlance,
  winterFaqs,
  winterRelatedLinks,
} from "@/lib/seo/things-to-do-murree-winter-content";
import WinterMurreeHeroCtaForm from "./WinterMurreeHeroCtaForm";
import {
  ArrowRight,
  ChevronRight,
  Flame,
  Minus,
  Plus,
  Snowflake,
  Star,
  TreePine,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Things to Do in Murree in Winter 2026 — Snowfall Activities & Guide",
  description:
    "What to do in Murree in winter — snow walks, sledging, bonfire evenings, Patriata in snow. Private snowfall experience at Himalaya Villas Bhurban.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: winterFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const experienceIcons: Record<string, typeof Flame> = {
  bonfire: Flame,
  sledging: Snowflake,
  patriata: Star,
  photography: Star,
  stargazing: Star,
};

export default function ThingsToDoMurreeWinterClient() {
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
        <section className="relative w-full overflow-hidden bg-[#172017]">
          <Image
            src="/assets/murree-mountain-hero.jpg"
            alt="Murree in winter — snow on the Bhurban pine forest"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172017]/95 via-[#1b261b]/85 to-[#1b261b]/50" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Snowflake className="w-4 h-4" aria-hidden />
                  WINTER GUIDE · BHURBAN · 2026
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.08]">
                  Things to Do in Murree in Winter —{" "}
                  <span className="text-[#c9a55b] italic font-light">The Private Snow Experience</span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  No Expressway queue. No Mall Road crowd. Fresh snow on your terrace, forest walks from the
                  gate, and a bonfire in the pine trees — when you are already in Bhurban, not driving up
                  the same morning.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">Dec–Feb</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Snow season
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">Jan–Feb</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Peak snowfall
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">Heated</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      All villas
                    </p>
                  </div>
                </div>
              </div>
              <WinterMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        {/* Two experiences contrast */}
        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-[15px] md:text-lg text-[#5c5a52] leading-relaxed max-w-3xl mx-auto mb-12">
              Both are technically &apos;Murree in winter.&apos; They are not the same experience.
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-8 md:p-10 border border-[#e5e1d8] bg-[#f8f6f2]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-4">
                  The standard Murree winter
                </p>
                <p className="text-[14px] text-[#5c5a52] leading-relaxed">
                  Leave Islamabad on Saturday morning. Sit in the Expressway queue for four hours. Reach Mall
                  Road in the dark. See snow on the roadside. Photograph it from the car window. Drive home.
                  Consider it done.
                </p>
              </div>
              <div className="p-8 md:p-10 border border-[#c9a55b]/40 bg-[#1b261b] text-white shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a55b] mb-4">
                  The Himalaya Villas winter
                </p>
                <p className="text-[14px] text-[#b8c9b8] leading-relaxed">
                  Check in on Friday evening. Wake on Saturday to fresh snow on the mountain terrace. Walk
                  into the pine forest from the property gate within five minutes — no other footprints. Hot
                  breakfast while the Murree traffic queue is still forming. Private bonfire in the trees.
                  Sunday at your own pace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Winter at a glance */}
        <section className="py-16 md:py-20 px-6 bg-[#f2efe9]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <Snowflake className="w-6 h-6 text-[#c9a55b]" />
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b]">
                Murree Winter at a Glance
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {winterAtAGlance.map((item) => (
                <div
                  key={item.label}
                  className="bg-white p-6 border border-[#e5e1d8] hover:border-[#c9a55b]/40 transition-colors"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b8878] mb-2">
                    {item.label}
                  </p>
                  <p className="text-[14px] text-[#1b261b] font-medium leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[13px] text-[#5c5a52]">
              Winter weekends fill fastest of all —{" "}
              <a
                href={SITE_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a55b] font-semibold hover:underline"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay}
              </a>{" "}
              to confirm dates before they close
            </p>
          </div>
        </section>

        {/* Private snow walk */}
        <section className="py-16 md:py-28 px-6 bg-[#172017] text-white overflow-hidden">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-4">
                Only if you slept here
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-8">
                The Private Snow Walk — Why It Only Exists at Himalaya Villas
              </h2>
              <div className="space-y-6 text-[15px] text-[#869986] leading-relaxed">
                <p>
                  After a heavy overnight snowfall in Bhurban, the pine forest surrounding Himalaya Villas
                  holds snow on its branches for approximately three to four hours in the morning before the
                  weight causes it to fall. From first light until around 9am — undisturbed, white, completely
                  silent.
                </p>
                <p>
                  Guests who wake early on a snowfall morning can be in the forest within five minutes. The
                  trails have no other visitors at this hour — no tour groups, no vendors, no families from
                  the car park. The footprints in the snow are your own.
                </p>
                <p>
                  This experience does not exist in Murree town where the streets are active by dawn, and it
                  does not exist if you are driving up from Islamabad the same morning. It exists only if you
                  are already there.
                </p>
              </div>
              <blockquote className="mt-10 border-l-2 border-[#c9a55b] pl-6">
                <p className="font-display text-xl md:text-2xl text-[#c9a55b] italic leading-relaxed">
                  The footprints in the snow are your own. That is only possible if you slept here.
                </p>
              </blockquote>
              <a
                href={buildWinterMurreeWhatsAppUrl({
                  name: "Guest",
                  tripFocus: "January / February snow trip",
                  activities: "Private snow walk in pine forest",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-10 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f] transition-colors"
              >
                Winter snowfall weekends sell out in advance — WhatsApp your Jan/Feb dates
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative aspect-[4/5] lg:aspect-square border border-[#2d402d] overflow-hidden">
              <Image
                src="/assets/gallery-exterior.jpg"
                alt="Private snow walk in Bhurban pine forest near Himalaya Villas"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172017]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <TreePine className="w-8 h-8 text-[#c9a55b] mb-3" />
                <p className="text-white text-sm font-medium">Forest trail from the property gate · 5 min</p>
              </div>
            </div>
          </div>
        </section>

        {/* Winter activities */}
        <section className="py-16 md:py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 md:mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1b261b]">
                Winter Activities at and From{" "}
                <span className="text-[#c9a55b] italic">Himalaya Villas</span>
              </h2>
              <p className="mt-4 text-[#5c5a52] max-w-2xl mx-auto text-[15px] leading-relaxed">
                Bonfire evenings, private sledging, Patriata in snow, photography, and stargazing — arranged
                from a heated villa base in Bhurban.
              </p>
            </div>
            <div className="space-y-8">
              {winterActivities.map((activity, index) => {
                const Icon = experienceIcons[activity.id] ?? Snowflake;
                const isDark = index % 2 === 1;
                return (
                  <article
                    key={activity.id}
                    id={activity.id}
                    className={`scroll-mt-24 p-8 md:p-12 border ${
                      isDark
                        ? "bg-[#1b261b] border-[#2d402d] text-white"
                        : "bg-[#fcfbf8] border-[#e5e1d8]"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 flex items-center justify-center shrink-0 ${
                            isDark ? "bg-[#2d402d]" : "bg-[#f2efe9]"
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${isDark ? "text-[#c9a55b]" : "text-[#1b261b]"}`} />
                        </div>
                        <h3
                          className={`font-display text-2xl md:text-3xl leading-tight ${
                            isDark ? "text-white" : "text-[#1b261b]"
                          }`}
                        >
                          {activity.title}
                        </h3>
                      </div>
                      {"badge" in activity && activity.badge ? (
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-[#c9a55b] text-[#1b261b] px-3 py-1.5">
                          {activity.badge}
                        </span>
                      ) : null}
                    </div>
                    <div className={`space-y-5 text-[15px] leading-relaxed ${isDark ? "text-[#869986]" : "text-[#5c5a52]"}`}>
                      {activity.paragraphs.map((p) => (
                        <p key={p.slice(0, 40)}>{p}</p>
                      ))}
                    </div>
                    {activity.bullets.length > 0 ? (
                      <ul className={`mt-8 space-y-3 ${isDark ? "text-[#b8c9b8]" : "text-[#5c5a52]"}`}>
                        {activity.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-[14px] leading-relaxed">
                            <span className="text-[#c9a55b] font-bold shrink-0">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Town vs villa winter comparison */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Same Snowfall. Different Winter Stay.
            </h2>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white shadow-sm">
              <table className="w-full text-left border-collapse min-w-[640px] text-[13px] md:text-[14px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-1/3">Experience</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[33%]">
                      Murree town hotel
                    </th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[33%] bg-[#c9a55b]/20 text-[#c9a55b]">
                      Himalaya Villas Bhurban
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Snow on arrival", "Drive up same day — often miss fresh morning snow", "Already on-site — terrace snow at dawn"],
                    ["Forest walk", "Drive to crowded viewpoints", "Trail from gate in 5 minutes"],
                    ["Evening", "Shared hotel dining / Mall Road crowds", "Private bonfire in pine trees"],
                    ["Footprints", "Shared streets and viewpoints", "Your own in private forest"],
                    ["Heating", "Hotel room only", "Central heating + outdoor fire setup"],
                  ].map(([label, town, villa], i) => (
                    <tr key={label} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">{label}</td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{town}</td>
                      <td className="p-4 text-[#1b261b] font-medium border-b border-[#e5e1d8] bg-[#c9a55b]/5">
                        {villa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Packing */}
        <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-4">
              What to Pack for Murree in Winter
            </h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-10">
              Himalaya Villas&apos; indoor spaces are centrally heated throughout winter. Thermal layers are
              needed for outdoor time only — but that outdoor time is the reason you are there, so pack them.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {packingList.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 p-5 bg-[#fcfbf8] border border-[#e5e1d8] text-[14px] text-[#5c5a52] leading-relaxed"
                >
                  <Snowflake className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="py-14 px-6 bg-[#1b261b]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-4">
              Plan a Private Snowfall Weekend
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Include bonfire and snow-walk arrangements in your WhatsApp message — set up before you arrive.
            </p>
            <a
              href={buildWinterMurreeWhatsAppUrl({
                name: "Guest",
                tripFocus: "Snowfall weekend from Islamabad",
                activities: "Bonfire evening in the trees",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Winter Murree — Frequently Asked Questions
            </h2>
            <div className="border border-[#e5e1d8] bg-white">
              {winterFaqs.map((faq, index) => {
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
        <section className="py-14 px-6 bg-white border-t border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-[#1b261b] mb-6">
              More Murree &amp; Winter Guides
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {winterRelatedLinks.map((link) => (
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
        <section className="py-20 md:py-28 px-6 bg-[#172017] text-center">
          <div className="max-w-2xl mx-auto">
            <Snowflake className="w-10 h-10 text-[#c9a55b] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              The Private Snow Experience Starts in Bhurban
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Heated villa · Terrace snowfall · Bonfire in the pines · No crowd, no queue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWinterMurreeWhatsAppUrl({
                  name: "Guest",
                  checkIn: "January",
                  tripFocus: "January / February snow trip",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay}
              </a>
              <Link
                href="/snowfall-in-murree"
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:border-white transition-colors"
              >
                Snowfall calendar guide
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
