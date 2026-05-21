"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildPlacesNearMurreeWhatsAppUrl } from "@/lib/whatsapp";
import {
  dayTripDestinations,
  dayTripFaqs,
  miranjaniHikeDetails,
  murreeVsNathiagaliPoints,
  placesRelatedLinks,
  suggestedItinerary,
} from "@/lib/seo/places-to-visit-near-murree-content";
import PlacesNearMurreeHeroCtaForm from "./PlacesNearMurreeHeroCtaForm";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Minus,
  Mountain,
  Plus,
  Route,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Places to Visit Near Murree — Day Trips to Nathiagali, Galliyat & More",
  description:
    "Best places to visit near Murree — Nathiagali, Ayubia, Galliyat, Abbottabad, Patriata. Day trips from Himalaya Villas Bhurban without changing accommodation.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: dayTripFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function PlacesToVisitNearMurreeClient() {
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
            src="/assets/murree-mountain-hero.jpg"
            alt="Day trips from Himalaya Villas — Galliyat and Murree Hills"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/85 to-[#1b261b]/50" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Route className="w-4 h-4" aria-hidden />
                  DAY TRIPS · GALLIYAT RIDGE
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.1rem] text-white leading-[1.08]">
                  Places to Visit Near Murree —{" "}
                  <span className="text-[#c9a55b] italic font-light">
                    The Day Trip Case for Himalaya Villas
                  </span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  Murree town 15 minutes one way. Nathiagali 40 minutes the other. Every point on the
                  Galliyat ridge — a day trip that starts and ends at the villa, no hotel change.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">15 min</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      To Murree
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">40 min</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      To Nathiagali
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">40 km</p>
                    <p className="text-[9px] text-white/45 uppercase tracking-widest font-semibold mt-1">
                      Galliyat chain
                    </p>
                  </div>
                </div>
              </div>
              <PlacesNearMurreeHeroCtaForm />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] md:text-lg text-[#5c5a52] leading-relaxed">
            <p>
              The Murree Hills are not one destination. They are a connected ridge of sub-Himalayan
              landscape stretching from Bhurban through Murree town, Ghora Gali, Dunga Gali, Ayubia,
              Nathiagali, Khanspur, and Changla Gali — a 40-kilometre chain of hill stations, national park
              forest, and mountain villages that no single visit covers fully. Most visitors pick one
              endpoint — Murree town — and never see the rest.
            </p>
            <p>
              Himalaya Villas in Bhurban sits at the western access point of this entire ridge. Every point
              between and beyond is a day trip that starts and ends at the villa with no accommodation
              change. This is not a selling point we invented. It is simple geography. The question is
              whether you are based at the right point to take advantage of it.
            </p>
          </div>
        </section>

        {/* Destinations table */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-[#c9a55b]" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b]">
                Day Trips from Himalaya Villas
              </h2>
            </div>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white shadow-lg">
              <table className="w-full text-left border-collapse min-w-[640px] text-[13px] md:text-[14px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">Destination</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">
                      Drive from Himalaya Villas
                    </th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs">What to do</th>
                  </tr>
                </thead>
                <tbody>
                  {dayTripDestinations.map((row, i) => (
                    <tr key={row.destination} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">
                        {row.destination}
                      </td>
                      <td className="p-4 text-[#c9a55b] font-medium border-b border-[#e5e1d8] whitespace-nowrap">
                        {row.drive}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.activities}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Nathiagali */}
        <section className="py-16 md:py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-4">
                Highest point in the Galliyat
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
                Nathiagali — Why It Deserves Its Own Day
              </h2>
              <div className="space-y-5 text-[15px] text-[#5c5a52] leading-relaxed">
                <p>
                  Nathiagali at 8,700 feet is the Galliyat&apos;s most rewarding destination for anyone whose
                  Murree trip has a physical or photographic component. The town itself is small — a bazaar,
                  a few hotels, St. Matthew&apos;s colonial-era church in the forest — but the Miranjani Peak
                  trail that begins at the bazaar edge is one of the best accessible day hikes in Pakistan.
                </p>
                <p>
                  The trail ascends five kilometres through dense pine and oak forest to the summit at 9,462
                  feet. On clear days from the summit — best in October and November, when monsoon dust has
                  been cleared by autumn storms — Nanga Parbat (26,660 feet, the world&apos;s ninth highest
                  mountain) is visible to the north-northwest.
                </p>
                <p className="font-medium text-[#1b261b]">
                  Himalaya Villas guests who want the Nanga Parbat view are advised to book October or
                  November dates specifically. Both months fill earlier than any other period.
                </p>
              </div>
              <a
                href={buildPlacesNearMurreeWhatsAppUrl({
                  name: "Guest",
                  tripFocus: "Nanga Parbat view (Oct/Nov)",
                  mustSee: "Nathiagali & Miranjani",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#1b261b]"
              >
                WhatsApp {SITE_CONTACT.phoneDisplay} — October window closes fast
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative aspect-[4/3] border border-[#e5e1d8] overflow-hidden">
              <Image
                src="/assets/gallery-exterior.jpg"
                alt="Nathiagali and Galliyat forest views from Bhurban"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Miranjani table */}
        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8] border-y border-[#e5e1d8]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-8">
              Miranjani Hike — Practical Details
            </h2>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white">
              <table className="w-full text-left border-collapse min-w-[520px] text-[13px] md:text-[14px]">
                <tbody>
                  {miranjaniHikeDetails.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8] w-[35%]">
                        {row.label}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Ayubia */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Mountain className="w-8 h-8 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Ayubia National Park — The Cable Car and the Forest Network
            </h2>
            <div className="space-y-5 text-[15px] text-[#5c5a52] leading-relaxed mb-8">
              <p>
                Ayubia National Park encompasses the entire Galliyat ridge from Dunga Gali through Ayubia and
                Khanspur. The cable car between Dunga Gali and Ayubia — an enclosed gondola crossing the
                valley above the forest canopy — is the park&apos;s most popular and most accessible activity,
                suitable for all ages.
              </p>
              <p>
                After the cable car, the marked trail network between the park&apos;s villages can occupy an
                afternoon of walking. The park is also the best birdwatching location accessible from Himalaya
                Villas — Himalayan woodpecker, red-billed blue magpie, hill partridge, and multiple owl species
                are resident. Early morning (5:30–9am) forest walks in spring and autumn produce the best
                observation conditions.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Cable car: PKR 200–400 return | Enclosed, all ages, 10-minute crossing",
                "Trail network: Multiple marked routes 2–8 hours | Suitable families with children 7+",
                "From Himalaya Villas: 35 minutes | Combine with Nathiagali on same day — depart 7am, return 6pm",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed">
                  <span className="text-[#c9a55b] font-bold shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Murree vs Nathiagali */}
        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl mb-6 text-center">
              Murree vs Nathiagali — The Question Every Visitor Asks
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed text-center max-w-2xl mx-auto mb-12">
              The honest answer is that they are not alternatives. They are complements, best experienced on
              consecutive days from the same base.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {murreeVsNathiagaliPoints.map((point) => (
                <div key={point.title} className="bg-[#1b261b] border border-[#2d402d] p-8">
                  <h3 className="text-[#c9a55b] text-sm font-bold uppercase tracking-widest mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[14px] text-[#b8c9b8] leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-[13px] text-[#869986]">
              Is Nathiagali part of Abbottabad? Yes — administratively within Abbottabad district, KPK. Drive
              from Himalaya Villas follows the Galliyat road through Ghora Gali and Dunga Gali.
            </p>
            <p className="mt-6 text-center">
              <a
                href={buildPlacesNearMurreeWhatsAppUrl({
                  name: "Guest",
                  tripFocus: "3-night Murree + Nathiagali itinerary",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f] inline-flex items-center gap-2"
              >
                Most 3-night stays cover both without rushing — WhatsApp to plan
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </div>
        </section>

        {/* Suggested 3-day itinerary — extra */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Sample 3-Night Itinerary from Bhurban
            </h2>
            <div className="space-y-6">
              {suggestedItinerary.map((day) => (
                <div
                  key={day.day}
                  className="bg-white p-8 border border-[#e5e1d8] flex flex-col sm:flex-row gap-6 sm:items-start"
                >
                  <div className="shrink-0 w-20">
                    <p className="text-[#c9a55b] font-display text-2xl">{day.day}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1b261b] mb-2">{day.title}</h3>
                    <p className="text-[14px] text-[#5c5a52] leading-relaxed">{day.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Day Trips — FAQs
            </h2>
            <div className="border border-[#e5e1d8] bg-[#fcfbf8]">
              {dayTripFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#e5e1d8] last:border-0 bg-white">
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
        <section className="py-14 px-6 bg-[#fcfbf8] border-t border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-[#1b261b] mb-6">Related guides</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {placesRelatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between gap-2 p-4 border border-[#e5e1d8] bg-white rounded-lg hover:border-[#c9a55b] transition-colors group"
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
            <Route className="w-10 h-10 text-[#c9a55b] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              One Base. The Whole Galliyat Ridge.
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Himalaya Villas Bhurban — day trips to Murree, Nathiagali, Ayubia, and beyond without changing
              where you sleep.
            </p>
            <a
              href={buildPlacesNearMurreeWhatsAppUrl({
                name: "Guest",
                tripFocus: "3-night Murree + Nathiagali itinerary",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
