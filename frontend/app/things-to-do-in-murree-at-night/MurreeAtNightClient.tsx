"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildMurreeNightWhatsAppUrl } from "@/lib/whatsapp";
import {
  bonfireNightBullets,
  eveningComparison,
  eveningTimeline,
  kashmirSunsetBullets,
  mallRoadNightBullets,
  murreeAfterDark,
  nightFaqs,
  nightRelatedLinks,
  stargazingBullets,
} from "@/lib/seo/murree-night-content";
import MurreeNightHeroCtaForm from "./MurreeNightHeroCtaForm";
import { ArrowRight, ChevronRight, Flame, Minus, Moon, Plus, Star } from "lucide-react";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Things to Do in Murree at Night — Evening Activities & Guide 2026",
  description:
    "What to do in Murree at night — Mall Road evening walk, stargazing, private bonfire evenings at Himalaya Villas Bhurban.",
  author: { "@type": "Organization", name: "Himalaya Villas" },
  publisher: { "@type": "Organization", name: "Himalaya Villas", url: "https://himalayavillas.com" },
  dateModified: "2026-05-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: nightFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[14px] text-[#5c5a52] leading-relaxed">
          <span className="text-[#c9a55b] font-bold shrink-0">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function MurreeAtNightClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#fcfbf8] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <section className="relative w-full overflow-hidden bg-[#1b261b]">
          <Image src="/assets/gallery-dining-night.jpg" alt="Murree at night — bonfire and terrace" fill className="object-cover opacity-35" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b]/95 via-[#1b261b]/88 to-[#1b261b]/55" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-32 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Moon className="w-4 h-4" aria-hidden />
                  EVENING GUIDE · 2026
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3rem] text-white leading-[1.08]">
                  Things to Do in Murree at Night —{" "}
                  <span className="text-[#c9a55b] italic font-light">The Version Most Visitors Miss</span>
                </h1>
                <p className="mt-6 text-[15px] text-[#b8c9b8] leading-relaxed font-light">
                  By 9pm at Himalaya Villas: pine forest, a private fire, stars on the terrace — the mountain after
                  dark that day-trippers never experience.
                </p>
              </div>
              <MurreeNightHeroCtaForm />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white border-b border-[#e5e1d8]">
          <div className="max-w-3xl mx-auto space-y-6 text-[15px] text-[#5c5a52] leading-relaxed">
            <p>
              By 6pm on a peak summer day, a significant portion of Murree&apos;s day visitors are already in traffic
              on the Expressway back to Islamabad. The viewpoints empty. Mall Road vendors shift to the smaller,
              slower crowd of evening walkers. The mountain begins to relax.
            </p>
            <p>
              By 9pm, if you are at Himalaya Villas in Bhurban, you are in a pine forest with a fire in front of you,
              a mountain visible only as a dark ridgeline against a sky full of stars, and the specific silence that most
              city residents have never experienced long enough to stop finding strange.
            </p>
            <p>
              Murree has nightlife in the sense that every destination has some version of it. It does not have
              nightclubs or late entertainment. What it has after dark is more interesting: food culture that only works
              in cold air, a sky dark enough to see the galaxy from, and the private mountain evening Himalaya Villas
              is designed to deliver.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#172017] text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-6 text-center">
              Murree after dark — what to expect
            </p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {murreeAfterDark.map((line) => (
                <li key={line} className="text-[14px] text-[#b8c9b8] flex gap-2">
                  <span className="text-[#c9a55b]">•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">Evening Timeline from Bhurban</h2>
            <div className="space-y-4">
              {eveningTimeline.map((item) => (
                <div key={item.time} className="bg-white p-6 border border-[#e5e1d8] flex flex-col sm:flex-row gap-4">
                  <p className="text-[#c9a55b] text-xs font-bold uppercase tracking-widest shrink-0 w-32">{item.time}</p>
                  <div>
                    <h3 className="font-bold text-[#1b261b] mb-1">{item.title}</h3>
                    <p className="text-[14px] text-[#5c5a52]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 bg-[#172017] text-white">
          <div className="max-w-4xl mx-auto">
            <Flame className="w-10 h-10 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              The Private Bonfire — The Best Night Activity in the Murree Hills
            </h2>
            <div className="space-y-5 text-[15px] text-[#b8c9b8] leading-relaxed mb-8">
              <p>
                The private bonfire at Himalaya Villas is the most consistently requested evening activity — across
                families, couples, corporate groups, and solo travellers. A fire on the private outdoor terrace, dinner
                or snacks at the fireside, pine forest in complete darkness except for the fire.
              </p>
              <p className="italic text-[#c9a55b]/90 border-l-2 border-[#c9a55b] pl-6">
                The Mall Road version of Murree&apos;s evening is good. The bonfire version is unforgettable.
              </p>
            </div>
            <BulletList items={bonfireNightBullets} />
            <a
              href={buildMurreeNightWhatsAppUrl({ name: "Guest", includeBonfire: "Yes — bonfire evening" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-[11px] font-bold uppercase tracking-widest text-[#c9a55b] hover:text-[#ebd59f]"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay} — include bonfire in your booking
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Star className="w-8 h-8 text-[#c9a55b] mb-6" />
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-6">
              Stargazing From Bhurban — The Night Sky Nobody Markets
            </h2>
            <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
              Between October and March, on clear nights, the sky above Bhurban is genuinely dark. The Milky Way is
              visible from the Himalaya Villas mountain terrace with the naked eye — invisible from Islamabad,
              Rawalpindi, or Lahore. The villa team notifies guests when conditions are optimal.
            </p>
            <BulletList items={stargazingBullets} />
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#fcfbf8]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">Mall Road at Night</h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                Mall Road in the evening is a different atmosphere from midday. Chai at coal-fire stalls, dry fruits and
                honey without time pressure, walk from church end to bazaar end without an agenda.
              </p>
              <BulletList items={mallRoadNightBullets} />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">Sunset at Kashmir Point</h2>
              <p className="text-[15px] text-[#5c5a52] leading-relaxed mb-6">
                Kashmir Point at sunset: fewer people, golden hour light across the foothills. In October and November
                sunset arrives around 5:30–6pm when the day crowd has thinned.
              </p>
              <BulletList items={kashmirSunsetBullets} />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-[#f2efe9]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-[#1b261b] mb-10 text-center">Mall Road vs Bhurban Evening</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {eveningComparison.map((row) => (
                <div key={row.place} className="bg-white p-8 border border-[#e5e1d8]">
                  <h3 className="text-[#c9a55b] text-sm font-bold uppercase tracking-widest mb-3">{row.place}</h3>
                  <p className="text-[14px] text-[#5c5a52] mb-3">{row.vibe}</p>
                  <p className="text-[13px] font-semibold text-[#1b261b]">Best for: {row.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-[#1b261b] mb-10 text-center">Night FAQs</h2>
            <div className="border border-[#e5e1d8]">
              {nightFaqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q} className="border-b border-[#e5e1d8] last:border-0 bg-white">
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="w-full py-5 px-6 flex justify-between text-left" aria-expanded={open}>
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

        <section className="py-14 px-6 border-t border-[#e5e1d8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl text-[#1b261b] mb-6">Related guides</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {nightRelatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex justify-between p-4 border bg-white rounded-lg hover:border-[#c9a55b] group">
                    <span className="text-[14px] group-hover:text-[#c9a55b]">{l.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#c9a55b]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#1b261b] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl text-white mb-4">Book Your Murree Night Experience</h2>
            <p className="text-[#869986] mb-8">Bonfire in the trees. Stars from the terrace. The mountain after dark.</p>
            <a
              href={buildMurreeNightWhatsAppUrl({ name: "Guest", includeBonfire: "Yes — bonfire evening" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-[11px] font-bold uppercase tracking-widest"
            >
              WhatsApp {SITE_CONTACT.phoneDisplay}
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-6">
              <Link href="/contact" className="text-[11px] text-[#c9a55b] uppercase tracking-widest hover:underline">
                himalayavillas.com/contact
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
