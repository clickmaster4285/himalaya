"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildOutdoorMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  adventureSportsBullets,
  forestTrailOptions,
  golfDetails,
  jeepSafariDetails,
  miranjaniHikeTable,
  outdoorActivityBase,
  outdoorFaqs,
  outdoorRelatedLinks,
  packingEssentials,
  sampleAdventureWeekend,
  seasonGuide,
} from "@/lib/seo/outdoor-activities-murree-content";
import OutdoorMurreeHeroCtaForm from "./OutdoorMurreeHeroCtaForm";
import {
  ArrowRight,
  ChevronRight,
  Flag,
  Footprints,
  Minus,
  Mountain,
  Plus,
  TreePine,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Outdoor Activities in Murree — Hiking, Trekking & Adventure",
  description:
    "Best outdoor activities in Murree — Miranjani hike, forest trails, golf, jeep safaris, zip-lining. Trailhead at the gate at Himalaya Villas Bhurban.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: outdoorFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function OutdoorActivitiesMurreeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main>
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image
            src="/assets/murree-mountain-hero.jpg"
            alt="Outdoor activities in Murree Hills from Himalaya Villas Bhurban"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/85 to-[#1b261b]/50" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Footprints className="w-4 h-4" aria-hidden />
                  HIKING · GOLF · JEEP SAFARI
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.1rem] text-white leading-[1.08]">
                  Outdoor Activities in Murree —{" "}
                  <span className="text-[#c9a55b] italic font-light">Adventure From the Property Gate</span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Forest trails begin at the gate. Miranjani is 40 minutes. Golf is 5 minutes. The concierge
                  arranges guides, safaris, and the rest.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">5 min</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      To forest trail
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">40 min</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      To Miranjani
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">18</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Hole golf course
                    </p>
                  </div>
                </div>
              </div>
              <OutdoorMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] md:text-lg text-[#5c5a52] leading-relaxed">
            <p>
              The Murree Hills contain one of Pakistan&apos;s most accessible outdoor activity landscapes —
              forest trails, ridge traverses, a mountain golf course, jeep safari routes, zip-lines, and one of
              the country&apos;s best accessible day hikes. Almost none of it requires specialist equipment,
              significant fitness preparation, or a guide.
            </p>
            <p>
              At Himalaya Villas, the Bhurban forest trail network begins at the property gate. No transport, no
              trailhead car park, no logistics — you step off the villa terrace and you are in the pine forest
              within five minutes. For every activity that requires a drive, the distances are 5 to 40 minutes.
              The concierge handles the rest: trail briefings, guide arrangement, equipment logistics, and
              activity timing recommendations based on current conditions.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-4 text-center">
              Outdoor activity base — Himalaya Villas Bhurban
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {outdoorActivityBase.map((item) => (
                <div key={item.title} className="bg-[#1b261b] border border-[#2d402d] p-6">
                  <h3 className="text-[#c9a55b] text-xs font-bold uppercase tracking-widest mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#b8c9b8] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <TreePine className="w-8 h-8 text-[#c9a55b] mb-6" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
                The Bhurban Forest Trails — Where the Walk Begins
              </h2>
              <div className="space-y-5 text-[15px] text-[#5c5a52] leading-relaxed mb-8">
                <p>
                  The trail network surrounding Himalaya Villas and the broader Bhurban area is the most
                  immediately accessible hiking available from any accommodation in the Murree Hills. Guests can
                  begin walking within five minutes of leaving the villa — no car, no planning, no trailhead fee.
                </p>
                <p>
                  The trails are unmarked — which means they are not crowded. The Himalaya Villas concierge
                  provides trail briefings and arranges staff accompaniment for those who prefer guidance. In
                  winter, the trails become one of the most extraordinary snowfall walking environments in
                  Pakistan.
                </p>
              </div>
              <ul className="space-y-3">
                {forestTrailOptions.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed">
                    <span className="text-[#c9a55b] font-bold shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] border border-[#e5e1d8] overflow-hidden">
              <Image src="/assets/gallery-exterior.jpg" alt="Bhurban forest trails near Himalaya Villas" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <Mountain className="w-8 h-8 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Miranjani Peak — The Hike Worth Planning Your Trip Around
            </h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-8 max-w-3xl">
              Miranjani (9,462 ft) is the benchmark hike of the Galliyat region. On clear October and November
              days, Nanga Parbat at 26,660 ft is visible to the north-northwest. It is 40 minutes from Himalaya
              Villas, and it is worth planning your trip dates around.
            </p>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-[#fcfbf8]">
              <table className="w-full text-left border-collapse min-w-[520px] text-[13px] md:text-[14px]">
                <tbody>
                  {miranjaniHikeTable.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8] w-[38%]">
                        {row.label}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a
              href={buildOutdoorMurreeWhatsAppUrl({
                name: "Guest",
                activityFocus: "Miranjani day hike",
                activitiesToArrange: "Miranjani guide in Nathiagali",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#1b261b]"
            >
              October Miranjani dates sell earliest — WhatsApp {SITE_CONTACT.phoneDisplay}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8] border-y border-[#e5e1d8]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <Flag className="w-7 h-7 text-[#c9a55b] mb-4" />
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
                Bhurban Golf Club — 18 Holes at 6,500 Feet
              </h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                Five minutes from Himalaya Villas — a full 18-hole mountain course carved through pine forest
                with Himalayan ridgeline views. Open to visiting players without membership. In summer, the
                course is consistently 10–15°C below Islamabad.
              </p>
              <ul className="space-y-2">
                {golfDetails.map((item) => (
                  <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                    <span className="text-[#c9a55b]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
                Jeep Safaris — The Murree Most Visitors Never See
              </h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                Ridge routes and forest tracks inaccessible to standard vehicles — viewpoints 20 minutes from
                Mall Road that might as well be in a different country.
              </p>
              <ul className="space-y-2">
                {jeepSafariDetails.map((item) => (
                  <li key={item} className="text-[14px] text-[#5c5a52] flex gap-2">
                    <span className="text-[#c9a55b]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Adventure Sports — Beyond the Standard Trail
            </h2>
            <ul className="space-y-3 mb-10">
              {adventureSportsBullets.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed">
                  <span className="text-[#c9a55b] font-bold shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-8">Best Season by Activity</h2>
              <div className="overflow-x-auto border border-[#e5e1d8] bg-white">
                <table className="w-full text-left border-collapse min-w-[400px] text-[13px]">
                  <thead>
                    <tr className="bg-[#1b261b] text-white">
                      <th className="p-4 text-xs font-bold uppercase tracking-wider">Activity</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider">Best timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasonGuide.map((row, i) => (
                      <tr key={row.activity} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                        <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">
                          {row.activity}
                        </td>
                        <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-8">What to Pack</h2>
              <ul className="space-y-3 bg-white p-8 border border-[#e5e1d8]">
                {packingEssentials.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52]">
                    <span className="text-[#c9a55b]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Sample 3-Day Adventure Weekend
            </h2>
            <div className="space-y-6">
              {sampleAdventureWeekend.map((day) => (
                <div key={day.day} className="bg-[#fcfbf8] p-8 border border-[#e5e1d8] flex gap-6">
                  <p className="text-[#c9a55b] font-display text-2xl shrink-0 w-16">{day.day}</p>
                  <div>
                    <h3 className="font-bold text-[#1b261b] mb-2">{day.title}</h3>
                    <p className="text-[14px] text-[#5c5a52] leading-relaxed">{day.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">Outdoor FAQs</h2>
            <div className="border border-[#e5e1d8]">
              {outdoorFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#e5e1d8] last:border-0 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-[#fcfbf8] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-bold text-[#1b261b] pr-6">{faq.q}</span>
                      <span className="shrink-0 w-7 h-7 border border-[#e5e1d8] flex items-center justify-center">
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

        <section className="py-14 px-6 border-t border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-[#1b261b] mb-6">Related guides</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {outdoorRelatedLinks.map((link) => (
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
            <Footprints className="w-10 h-10 text-[#c9a55b] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              The Trailhead Is at the Gate — Book Himalaya Villas
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Forest trails | Golf 5 min | Miranjani 40 min | Jeep safaris arranged | All from one base
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildOutdoorMurreeWhatsAppUrl({
                  name: "Guest",
                  activityFocus: "Multi-activity weekend",
                  activitiesToArrange: "All of the above",
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
                himalayavillas.com/contact
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
