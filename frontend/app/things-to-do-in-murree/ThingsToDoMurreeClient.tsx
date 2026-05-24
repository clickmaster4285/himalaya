"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import {
  activityClusterLinks,
  activityTableRows,
  adventureItems,
  dayTripBullets,
  mallRoadBuys,
  murreeVsNathiagaliRows,
  thingsToDoFaqs,
} from "@/lib/seo/things-to-do-murree-content";
import ThingsToDoHeroCtaForm from "./ThingsToDoHeroCtaForm";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Minus,
  Mountain,
  Plus,
  Sparkles,
  TreePine,
} from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Things to Do in Murree 2026 — Activities, Food & More",
  description:
    "The complete Murree activities guide from Himalaya Villas Bhurban — Kashmir Point, Mall Road, Patriata, Nathiagali day trips, and private villa experiences.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: thingsToDoFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

function CtaStrip({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-[#c9a55b]/30 bg-[#1b261b] p-6 md:p-8 ${
        compact ? "" : "shadow-xl"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-2">
        Check Your Dates — Himalaya Villas Bhurban
      </p>
      <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
        Everything in this guide within 45 minutes. Private villa. Mountain views.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={buildWhatsAppBookingUrl("I would like to check availability for my Murree trip")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
        >
          WhatsApp {SITE_CONTACT.phoneDisplay}
        </a>
        <Link
          href="/villas"
          className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:border-white/50 transition-colors"
        >
          View villas
        </Link>
        <Link
          href="/murree-hotel-packages"
          className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:border-white/50 transition-colors"
        >
          Packages
        </Link>
      </div>
    </div>
  );
}

export default function ThingsToDoMurreeClient() {
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
        {/* Hero + CTA form */}
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image
            src="/assets/murree-mountain-hero.jpg"
            alt="Things to do in Murree — Himalayan views from Bhurban"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/80 to-[#1b261b]/55" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
              <div className="max-w-xl text-left pt-4 lg:pt-0">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <span className="h-[1px] w-8 bg-[#c9a55b]" />
                  BHURBAN · MURREE HILLS · 2026 GUIDE
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] text-white leading-[1.08]">
                  Things to Do in Murree —{" "}
                  <span className="text-[#c9a55b] italic font-light">The Complete 2026 Guide</span>{" "}
                  from Himalaya Villas
                </h1>
                <p className="mt-6 text-[15px] md:text-base text-[#b8c9b8] leading-relaxed font-light">
                  Two people can visit Murree on the same weekend and have almost nothing in common. Same
                  destination — completely different experience. The difference is not luck; it is where you
                  stay.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl mb-1">15 min</p>
                    <p className="text-[9px] md:text-[10px] text-white/45 uppercase tracking-widest font-semibold">
                      To Murree town
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl mb-1">40 min</p>
                    <p className="text-[9px] md:text-[10px] text-white/45 uppercase tracking-widest font-semibold">
                      To Nathiagali
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl mb-1">45 min</p>
                    <p className="text-[9px] md:text-[10px] text-white/45 uppercase tracking-widest font-semibold">
                      From Islamabad
                    </p>
                  </div>
                </div>
                <p className="mt-8 text-[12px] text-[#869986] leading-relaxed max-w-md hidden sm:block">
                  Private villa · Forest trails at the gate · In-villa dining · Concierge plans every outing
                </p>
              </div>
              <ThingsToDoHeroCtaForm />
            </div>
          </div>
        </section>

        {/* Intro contrast */}
        <section className="py-16 md:py-20 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[15px] md:text-lg text-[#5c5a52] leading-relaxed">
              One drives up Saturday morning, sits in traffic for three hours, photographs Kashmir Point
              from behind a crowd, eats at a roadside dhaba, and leaves by evening. The other wakes at
              Himalaya Villas in Bhurban at 5:15am, reaches Kashmir Point before the world arrives,
              returns for breakfast on a private mountain terrace, spends the afternoon on a forest trail
              that begins at the property gate, and ends the day at a bonfire in the pine trees with the
              Milky Way overhead.
            </p>
            <p className="mt-6 text-[#1b261b] font-medium text-base md:text-lg leading-relaxed">
              This guide covers everything to do in Murree and the surrounding Galliyat hills, and
              explains exactly why each activity is better when Himalaya Villas in Bhurban is your base.
            </p>
          </div>
        </section>

        {/* Base card */}
        <section className="py-12 md:py-16 px-6 bg-[#f2efe9]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1b261b] p-8 md:p-10 border border-[#2d402d]">
              <div className="flex items-start gap-4 mb-6">
                <Mountain className="w-8 h-8 text-[#c9a55b] shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-white">
                    Himalaya Villas — Your Base for All of This
                  </h2>
                  <p className="mt-2 text-[#869986] text-sm leading-relaxed">
                    Private luxury villa in Bhurban · 15 min from Murree town · 40 min from Nathiagali
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-[13px] text-[#b8c9b8] mb-8">
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  Direct access to forest trails · In-villa dining · 24-hr concierge for activity logistics
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  Peak weekends typically full 3–4 weeks in advance — check availability before your dates
                  close
                </li>
              </ul>
              <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-widest">
                <a
                  href={SITE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a55b] hover:text-[#ebd59f] transition-colors"
                >
                  WhatsApp: {SITE_CONTACT.phoneDisplay}
                </a>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  himalayavillas.com/contact
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What makes Murree special */}
        <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-8">
            What Makes Murree Special — And Why Most Visitors Miss It
          </h2>
          <div className="space-y-6 text-[15px] text-[#5c5a52] leading-relaxed">
            <p>
              Murree&apos;s speciality is not any single viewpoint or street. It is the combination of
              sub-Himalayan mountain landscape, pine forest, colonial heritage, and year-round
              accessibility that no other Pakistani destination replicates within an hour of Islamabad.
              What most visitors miss is not the destination itself — it is the version of it that exists
              away from the weekend tourist current.
            </p>
            <p>
              The Mall Road version of Murree — crowded, commercial, familiar — is what the majority
              experience. The Bhurban version — private, forested, quiet, with the same Himalayan ridgeline
              as its backdrop — is what guests at Himalaya Villas experience. This guide is written for
              people who want the second one.
            </p>
            <p className="border-l-2 border-[#c9a55b] pl-6 text-[#1b261b] font-medium italic">
              The famous street in Murree is Mall Road. The famous experience is something different —
              and it starts in Bhurban.
            </p>
          </div>
        </section>

        {/* Kashmir Point */}
        <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e5e1d8]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-4">
                Sunrise advantage
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
                Kashmir Point — How Our Guests See It
              </h2>
              <div className="space-y-5 text-[15px] text-[#5c5a52] leading-relaxed">
                <p>
                  Kashmir Point is Murree&apos;s most photographed viewpoint and one of Pakistan&apos;s most
                  over-experienced ones. On a peak summer Saturday, it is a crowded terrace with vendor
                  carts, a hundred identical photographs, and a view that you can barely reach the railing
                  to see.
                </p>
                <p>
                  Himalaya Villas guests see Kashmir Point at 5:30am. The drive from the property takes 20
                  minutes. At that hour, the viewpoint is empty — the panorama across the Himalayan
                  foothills is the same view that draws thousands later in the day, experienced by almost
                  nobody. The villa kitchen prepares hot chai in a thermos the night before. You are back at
                  the property for a full breakfast on the terrace before Murree town has woken up.
                </p>
                <p className="text-[#1b261b] font-medium">
                  This is not a trick of early rising. It is the specific advantage of a base that is 15
                  minutes from Murree&apos;s best viewpoint rather than 3 hours in traffic from Islamabad.
                </p>
              </div>
              <a
                href={buildWhatsAppBookingUrl("I would like to request a Kashmir Point sunrise on Day 1")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#1b261b] transition-colors"
              >
                Most booked guests request Kashmir Point sunrise on Day 1
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#e5e1d8]">
              <Image
                src="/assets/gallery-exterior.jpg"
                alt="Kashmir Point sunrise trip from Himalaya Villas Bhurban"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mall Road */}
        <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
            Mall Road — What to Do, What to Buy, and When to Go
          </h2>
          <div className="space-y-6 text-[15px] text-[#5c5a52] leading-relaxed mb-10">
            <p>
              Mall Road is Murree&apos;s colonial-era main street and its commercial spine — a pedestrianized
              ridge road lined with shops, chai stalls, and buildings that make Murree Pakistan&apos;s most
              distinctive hill station architecturally. Kashmiri shawls and pashmina in the textile shops are
              better quality and lower price than Islamabad markets. Mountain honey from bazaar vendors is
              raw, wild, and authentic. Bhutta and doodh patti chai are the specific food experience Murree
              is famous for.
            </p>
            <p>
              The time to visit Mall Road is either early morning (before 10am) or weekday evenings (after
              6pm in summer). Saturday afternoon and Sunday morning are when the Expressway queue meets the
              Mall Road crowd. Himalaya Villas&apos; concierge team tracks road and crowd conditions in real
              time and advises guests on timing for every outing.
            </p>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#1b261b] mb-4">
            What to Buy on Mall Road
          </h3>
          <ul className="space-y-3">
            {mallRoadBuys.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed border-b border-[#e5e1d8] pb-3 last:border-0"
              >
                <span className="text-[#c9a55b] font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <CtaStrip />
          </div>
        </section>

        {/* Patriata */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Patriata Chairlift — And What It Looks Like From the Right Base
            </h2>
            <div className="space-y-6 text-[15px] text-[#5c5a52] leading-relaxed">
              <p>
                The Patriata chairlift is one of Pakistan&apos;s most genuinely memorable accessible
                attractions — an open double cabin ascending over pine-covered slopes with the Murree Hills
                ridgeline opening in every direction. The experience is different in every season: green
                canopy in summer, golden forest in autumn, white slopes in winter.
              </p>
              <p>
                From Himalaya Villas, Patriata is 25 minutes by road. Guests who visit on a weekday morning
                or arrive at the base station before 10am avoid the queues that make the peak weekend
                version a different, more transactional experience.
              </p>
            </div>
            <ul className="mt-8 space-y-2 text-[14px] text-[#1b261b]">
              <li>• Ticket: PKR 300–500 return | Gondola option for young children</li>
              <li>• Best timing: Weekday mornings | October–November for clearest skies | Winter for snow views</li>
            </ul>
          </div>
        </section>

        {/* Adventure */}
        <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
            Adventure in the Murree Hills — What Most Guides Don&apos;t Cover
          </h2>
          <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-8">
            Murree&apos;s adventure landscape goes significantly beyond the chairlift. Jeep safaris through
            off-road ridge terrain, zip-lining at Patriata, rock climbing on natural outcrop faces in the
            Bhurban hills, and Sozo Adventure Park&apos;s managed multi-activity environment are all accessible
            from Himalaya Villas. The property&apos;s concierge arranges private jeep safaris for staying guests —
            routes that penetrate the Murree forest reserve away from road access.
          </p>
          <ul className="space-y-4">
            {adventureItems.map((item) => (
              <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed">
                <Sparkles className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={buildWhatsAppBookingUrl("Please pre-arrange Murree activities for my stay")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#1b261b]"
          >
            Tell us what activities you want when you WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* Day trips */}
        <section id="day-trips" className="py-16 md:py-24 px-6 bg-white border-y border-[#e5e1d8] scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Day Trips That Change the Shape of a Murree Trip
            </h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
              Bhurban sits at the midpoint between Murree town and Nathiagali — 15 minutes in one direction,
              40 minutes in the other. A 3-day stay at Himalaya Villas covers both without changing
              accommodation: Murree town on day one, Nathiagali and the Galliyat on day two, Bhurban and
              Patriata on day three.
            </p>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-8">
              Nathiagali at 8,700 feet is significantly cooler than Murree in summer and the base for
              Miranjani Peak — one of the best accessible day hikes in Pakistan. On a clear October morning
              from the summit, Nanga Parbat is visible at 26,660 feet. October at Himalaya Villas fills
              before September ends.
            </p>
            <ul className="space-y-3 mb-8">
              {dayTripBullets.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52]">
                  <MapPin className="w-4 h-4 text-[#c9a55b] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/places-to-visit-near-murree"
              className="text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#1b261b] inline-flex items-center gap-2"
            >
              Full day trips guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Forest trail */}
        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-4xl mx-auto">
            <TreePine className="w-10 h-10 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              The Forest Trail at the Gate — Outdoor Murree Starts Here
            </h2>
            <div className="space-y-6 text-[#869986] text-[15px] leading-relaxed">
              <p>
                Most Murree visitors treat hiking as a logistics exercise. At Himalaya Villas, the forest
                trail network begins at the property gate — walk from your villa into the pine forest within
                five minutes. Trails range from a 30-minute flat forest loop to a four-hour ridge traverse
                with unobstructed Himalayan views.
              </p>
              <p>
                The Bhurban Golf Club is five minutes from the property — 18 holes across pine-covered
                mountain terrain, open to visiting players.
              </p>
              <p className="text-white font-display text-xl italic border-l-2 border-[#c9a55b] pl-6">
                When the trailhead is at your gate, the mountain isn&apos;t a destination — it&apos;s your morning.
              </p>
            </div>
            <Link
              href="/experiences/adventure"
              className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f]"
            >
              Full outdoor guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Night */}
        <section id="murree-at-night" className="py-16 md:py-24 px-6 max-w-4xl mx-auto scroll-mt-24">
          <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
            Murree at Night — The Version Nobody Advertises
          </h2>
          <div className="space-y-6 text-[15px] text-[#5c5a52] leading-relaxed">
            <p>
              The Murree most visitors experience ends when they return to their hotel. The Murree that
              exists after day visitors leave — a pine forest evening, a private fire, stars visible from a
              mountain terrace — is the version that Himalaya Villas is built for.
            </p>
            <p>
              Mall Road at night is genuinely worth experiencing — food stalls more atmospheric in cooler
              evening air, Kashmiri chai sold by coal-fire vendors. Himalaya Villas guests who do Mall Road in
              the evening are back at the property by 9pm. The rest of the evening belongs to the mountain.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-4 text-center">
              Murree vs Nathiagali — The Honest Comparison
            </h2>
            <p className="text-center text-[#5c5a52] text-sm mb-10 max-w-2xl mx-auto">
              Stay at Himalaya Villas in Bhurban — midpoint between the two — and you do not choose. You do
              both.
            </p>
            <div className="overflow-x-auto border border-[#e5e1d8] bg-white shadow-sm">
              <table className="w-full text-left border-collapse min-w-[640px] text-[13px] md:text-[14px]">
                <thead>
                  <tr className="bg-[#1b261b] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[22%]">Factor</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[39%]">Murree Town</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-xs w-[39%]">Nathiagali</th>
                  </tr>
                </thead>
                <tbody>
                  {murreeVsNathiagaliRows.map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? "bg-[#fcfbf8]" : "bg-white"}>
                      <td className="p-4 font-semibold text-[#1b261b] border-b border-[#e5e1d8]">
                        {row.factor}
                      </td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.murreeTown}</td>
                      <td className="p-4 text-[#5c5a52] border-b border-[#e5e1d8]">{row.nathiagali}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center mt-8 text-[14px] text-[#5c5a52]">
              Guests staying 2+ nights typically do Murree town on Day 1 and Nathiagali on Day 2.{" "}
              <a
                href={buildWhatsAppBookingUrl("Please help build my 2-night Murree and Nathiagali itinerary")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a55b] font-semibold hover:underline"
              >
                WhatsApp us to build your itinerary
              </a>
            </p>
          </div>
        </section>

        {/* Activity table */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-4 text-center">
              The Full Murree Activity Guide
            </h2>
            <p className="text-center text-[#5c5a52] text-sm mb-10">
              What, where, and from Himalaya Villas
            </p>
            <div className="overflow-x-auto border border-[#e5e1d8] shadow-lg">
              <table className="w-full text-left border-collapse min-w-[900px] text-[12px] md:text-[13px]">
                <thead>
                  <tr className="bg-[#c9a55b]/15 border-b border-[#e5e1d8]">
                    <th className="p-4 font-bold text-[#1b261b] uppercase tracking-wider">Activity</th>
                    <th className="p-4 font-bold text-[#1b261b] uppercase tracking-wider">
                      The Himalaya Villas Version
                    </th>
                    <th className="p-4 font-bold text-[#1b261b] uppercase tracking-wider">From Property</th>
                    <th className="p-4 font-bold text-[#1b261b] uppercase tracking-wider">Best Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activityTableRows.map((row, i) => (
                    <tr
                      key={row.activity}
                      className={`border-b border-[#e5e1d8] last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-[#fcfbf8]"
                      } hover:bg-[#f2efe9]/80 transition-colors`}
                    >
                      <td className="p-4 font-semibold text-[#1b261b]">{row.activity}</td>
                      <td className="p-4 text-[#5c5a52]">{row.villasVersion}</td>
                      <td className="p-4 text-[#5c5a52] whitespace-nowrap">{row.fromProperty}</td>
                      <td className="p-4 text-[#5c5a52]">{row.bestTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-0 border border-[#e5e1d8] bg-white">
              {thingsToDoFaqs.map((faq, index) => {
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

        {/* Cluster links */}
        <section className="py-16 md:py-20 px-6 bg-white border-t border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
              Explore the Full Activity Cluster
            </h2>
            <p className="text-[14px] text-[#5c5a52] leading-relaxed mb-8">
              Each page below covers one specific slice of the Murree experience — with Himalaya Villas as
              the base that changes what each activity is.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {activityClusterLinks.map((link) => (
                <li key={link.href + link.label}>
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
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Every Activity in This Guide Is Better From Himalaya Villas
            </h2>
            <p className="text-[#869986] text-[15px] leading-relaxed mb-8">
              Private villa. 15 minutes from Murree. Trailhead at the gate. Bonfire in the evenings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={buildWhatsAppBookingUrl("I would like to book Himalaya Villas for my Murree trip")}
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
