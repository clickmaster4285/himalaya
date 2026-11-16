"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Snowflake,
  Calendar,
  Thermometer,
  MapPin,
  Phone,
  ChevronRight,
  ChevronDown,
  Clock,
  Star,
  Shield,
  Wifi,
  Car,
  Utensils,
  TreePine,
  Mountain,
  Camera,
  Home,
  Flame,
  Check,
  ArrowRight,
  Eye,
  Wind,
  CloudSnow,
} from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
};

const photos: GalleryItem[] = [
  { src: "/images/winter-villas/winter-lodge-view.jpeg", alt: "Snow-covered lodge and mountain view" },
  { src: "/images/winter-villas/lodge-terraces-snow.jpeg", alt: "Lodge terraces after snowfall" },
  { src: "/images/winter-villas/snowy-lodge-branches.jpeg", alt: "Snow-laden branches beside the lodge" },
  { src: "/images/winter-villas/winter-lodge-courtyard.jpeg", alt: "Snow-covered lodge courtyard" },
  { src: "/images/winter-villas/winter-lodge-path.jpeg", alt: "Winter path beside the lodge" },
];

const snowfallSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Snowfall in Murree — Complete Guide for 2025 & 2026",
  description:
    "Monthly snowfall calendar, weather forecast guide, snowfall pics and luxury winter stays in Bhurban, Murree Hills.",
  author: { "@id": "https://himalayavillas.com/#organization" },
  publisher: { "@id": "https://himalayavillas.com/#organization" },
  about: {
    "@type": "Place",
    name: "Murree Hills",
    geo: { "@type": "GeoCoordinates", latitude: "33.9032", longitude: "73.3932" },
  },
  dateModified: "2025-11-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does snowfall start in Murree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Snowfall in Murree typically begins in late November to mid-December, depending on the arrival of western disturbances from the west. The first significant snowfall of the season usually occurs between December 10–20. At Bhurban (6,500 ft elevation), snowfall often arrives slightly earlier than at Murree town (7,500 ft) due to elevation differences in accumulation patterns. The peak snowfall season in Murree runs from December 15 through the end of February.",
      },
    },
    {
      "@type": "Question",
      name: "Which months have the most snowfall in Murree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "January and February are the months with the highest snowfall frequency and accumulation in Murree and Bhurban. January typically sees 3–6 separate snowfall events from western disturbances crossing the region. February delivers similar frequency with slightly increasing daytime temperatures toward month-end, resulting in faster melt. December (last 2 weeks) and early March can also produce snowfall, but with lower probability than January–February.",
      },
    },
    {
      "@type": "Question",
      name: "What is the snowfall weather forecast for Murree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Real-time snowfall forecasts for Murree are published by the Pakistan Meteorological Department (PMD) at pmd.gov.pk. PMD issues winter weather advisories 48–72 hours before significant snowfall events covering the Murree Hills and Galliyat region. For real-time tracking, Accuweather (search 'Bhurban Pakistan weather') and Windy.com provide detailed short-range snowfall probability maps.",
      },
    },
    {
      "@type": "Question",
      name: "Is Bhurban better than Murree for snowfall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bhurban receives comparable snowfall to Murree but offers a substantially different experience of it. Murree town is the most crowded snowfall destination in Pakistan — during peak snowfall weekends, traffic can back up 4–8 hours on the Murree Expressway. Bhurban, 15 minutes further from Murree town, receives the same snowfall events with a fraction of the visitor volume and higher-quality accommodation options.",
      },
    },
    {
      "@type": "Question",
      name: "How long does snowfall last in Murree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical western disturbance snowfall event in Murree lasts 12–36 hours of active snowfall. Ground accumulation from a single event typically ranges from 2–12 inches depending on storm intensity. Snow remains on the ground in Bhurban for 2–5 days after a heavy event before melting at lower elevations.",
      },
    },
  ],
};

// ---------- Ambient snow ----------
const snowflakes = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 6 + Math.random() * 14,
  duration: 10 + Math.random() * 12,
  delay: Math.random() * 10,
  opacity: 0.25 + Math.random() * 0.5,
}));

function Snow({ density = "normal" }: { density?: "light" | "normal" | "heavy" }) {
  const count = density === "light" ? 20 : density === "heavy" ? 60 : 40;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {snowflakes.slice(0, count).map((f) => (
        <span
          key={f.id}
          className="snowflake-char"
          style={
            {
              left: `${f.left}%`,
              fontSize: `${f.size}px`,
              "--snow-duration": `${f.duration}s`,
              "--snow-delay": `-${f.delay}s`,
              "--snow-opacity": f.opacity,
            } as React.CSSProperties
          }
        >
          ❄
        </span>
      ))}
    </div>
  );
}

// ---------- Reusable heading ----------
function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl text-[color:var(--navy-deep)] md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[color:var(--navy)]/70">{sub}</p>}
    </div>
  );
}

export default function SnowfallInMurreePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const snowfallCalendar = [
    { month: "January", snowfall: "Heavy Snow", level: 100, temp: "-2°C to +5°C", description: "Peak season" },
    { month: "February", snowfall: "Heavy Snow", level: 95, temp: "-1°C to +7°C", description: "Peak season" },
    { month: "March", snowfall: "Light Snow", level: 40, temp: "+3°C to +13°C", description: "Early spring" },
    { month: "April", snowfall: "Rare", level: 10, temp: "+8°C to +18°C", description: "Spring begins" },
    { month: "May", snowfall: "None", level: 0, temp: "+12°C to +22°C", description: "Green season" },
    { month: "June", snowfall: "None", level: 0, temp: "+16°C to +26°C", description: "Peak summer" },
    { month: "July", snowfall: "None", level: 0, temp: "+17°C to +27°C", description: "Monsoon" },
    { month: "August", snowfall: "None", level: 0, temp: "+16°C to +26°C", description: "Monsoon peak" },
    { month: "September", snowfall: "None", level: 0, temp: "+13°C to +23°C", description: "Post-monsoon" },
    { month: "October", snowfall: "Rare", level: 10, temp: "+8°C to +18°C", description: "Autumn clear" },
    { month: "November", snowfall: "Early Snow", level: 30, temp: "+2°C to +11°C", description: "Season begins" },
    { month: "December", snowfall: "Regular Snow", level: 75, temp: "-1°C to +7°C", description: "Winter opens" },
  ];

  const packages = [
    {
      name: "Winter Snow Escape",
      bestFor: "Couples & Small Groups",
      duration: "2 nights",
      price: "PKR 65,000–90,000/stay",
      features: [
        "Private villa with mountain views",
        "In-villa fireplace",
        "Hot breakfast daily",
        "Evening bonfire on snowfall nights",
        "Dedicated villa host",
      ],
    },
    {
      name: "Family Snow Weekend",
      bestFor: "Families (4–8 guests)",
      duration: "2–3 nights",
      price: "PKR 90,000–150,000/stay",
      features: [
        "Full family villa",
        "In-villa dining all meals",
        "Winter outdoor activities",
        "Snowfall morning walk",
        "Hot chocolate & bonfire service",
      ],
    },
    {
      name: "Honeymoon Snow Sanctuary",
      bestFor: "Newlywed Couples",
      duration: "2 nights",
      price: "PKR 75,000–100,000/stay",
      features: [
        "Premium suite with ridgeline views",
        "Romantic winter dinner",
        "Fireplace setup",
        "Snowfall morning room service",
        "Late checkout",
      ],
    },
    {
      name: "Corporate Winter Retreat",
      bestFor: "Teams (10–30 guests)",
      duration: "2 nights+",
      price: "PKR 200,000+ (10 pax)",
      features: [
        "Conference setup",
        "All-inclusive meals",
        "Team evening bonfire",
        "Private mountain snowfall briefing environment",
      ],
    },
  ];

  const faqs = [
    {
      question: "When does snowfall start in Murree?",
      answer:
        "Snowfall in Murree typically begins in late November to mid-December, depending on the arrival of western disturbances from the west. The first significant snowfall of the season usually occurs between December 10–20. At Bhurban (6,500 ft elevation), snowfall often arrives slightly earlier than at Murree town (7,500 ft) due to elevation differences in accumulation patterns. The peak snowfall season in Murree runs from December 15 through the end of February.",
    },
    {
      question: "Which months have the most snowfall in Murree?",
      answer:
        "January and February are the months with the highest snowfall frequency and accumulation in Murree and Bhurban. January typically sees 3–6 separate snowfall events from western disturbances crossing the region. February delivers similar frequency with slightly increasing daytime temperatures toward month-end, resulting in faster melt. December (last 2 weeks) and early March can also produce snowfall, but with lower probability than January–February.",
    },
    {
      question: "What is the snowfall weather forecast for Murree?",
      answer:
        "Real-time snowfall forecasts for Murree are published by the Pakistan Meteorological Department (PMD) at pmd.gov.pk. PMD issues winter weather advisories 48–72 hours before significant snowfall events covering the Murree Hills and Galliyat region. For real-time tracking, Accuweather (search 'Bhurban Pakistan weather') and Windy.com provide detailed short-range snowfall probability maps. During active winter disturbances, Pakistani TV channels broadcast regular weather updates.",
    },
    {
      question: "Is Bhurban better than Murree for snowfall?",
      answer:
        "Bhurban receives comparable snowfall to Murree but offers a substantially different experience of it. Murree town is the most crowded snowfall destination in Pakistan — during peak snowfall weekends, traffic can back up 4–8 hours on the Murree Expressway and the town itself becomes extremely congested. Bhurban, 15 minutes further from Murree town, receives the same snowfall events with a fraction of the visitor volume, higher-quality accommodation options, and private outdoor space that makes the snowfall experience accessible rather than observational.",
    },
    {
      question: "How long does snowfall last in Murree?",
      answer:
        "A typical western disturbance snowfall event in Murree lasts 12–36 hours of active snowfall. Ground accumulation from a single event typically ranges from 2–12 inches depending on storm intensity. Snow remains on the ground in Bhurban for 2–5 days after a heavy event before melting at lower elevations (1–2 days in Murree town center). January events tend to produce the longest-lasting snow cover due to lower overall temperatures and reduced solar radiation.",
    },
  ];

  const quickRef = useMemo(
    () => [
      {
        icon: Calendar,
        label: "First Snowfall Expected",
        value: "Late Nov – mid-Dec",
        detail: "Elevation-dependent timing",
      },
      {
        icon: Snowflake,
        label: "Peak Snowfall Season",
        value: "Dec 15 – Feb 28",
        detail: "Heaviest accumulation in Jan & Feb",
      },
      {
        icon: Thermometer,
        label: "Bhurban Temperature",
        value: "-2°C to +8°C",
        detail: "Across December–February",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[color:var(--frost)] text-[color:var(--navy-deep)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(snowfallSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={photos[0].src}
            alt="Snowfall in Bhurban Murree Hills — Himalaya Villas winter lodge"
            fill
            priority
            className="object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy-deep)]/85 via-[color:var(--navy-deep)]/55 to-[color:var(--navy-deep)]/95" />
        </div>
        <Snow density="heavy" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 pt-28 pb-20 text-white">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--gold-soft)] backdrop-blur">
              <Snowflake className="h-3.5 w-3.5 animate-spin-slow" /> Complete Guide · 2025 & 2026
            </span>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Snowfall in <span className="gold-shimmer">Murree</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              When it snows, what to expect, snowfall photos from Bhurban, and
              luxury winter stays — the definitive guide for planning your
              Murree Hills snowfall trip.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://wa.me/923045679000"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] shadow-xl shadow-black/30 transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> Book Winter Snow Stay
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/snowfall-in-murree/winter-villas"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                <Home className="h-4 w-4" /> View Winter Villas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUICK REFERENCE ============ */}
      <section className="relative -mt-16 z-10 px-4">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {quickRef.map((item, i) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,27,61,0.4)] animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--navy-deep)] text-[color:var(--gold)]">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--navy)]/60">
                  {item.label}
                </p>
              </div>
              <p className="mt-4 font-serif text-2xl text-[color:var(--navy-deep)]">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-[color:var(--navy)]/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SNOWFALL CALENDAR ============ */}
      <section className="bg-[color:var(--frost)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Historical Patterns"
            title="Monthly Snowfall Calendar"
            sub="Murree & Bhurban annual averages — how snow behaves across the Murree Hills, month by month."
          />

          <div className="mt-14 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_60px_-30px_rgba(15,27,61,0.3)]">
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 border-b border-black/5 bg-[color:var(--navy-deep)] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white/80">
              <div>Month</div>
              <div>Snowfall Intensity</div>
              <div>Temperature</div>
              <div>Season</div>
            </div>
            <div className="divide-y divide-black/5">
              {snowfallCalendar.map((month) => (
                <div
                  key={month.month}
                  className="grid grid-cols-[1fr_2fr_1fr_1fr] items-center gap-4 px-6 py-4 transition hover:bg-[color:var(--frost)]/60"
                >
                  <div className="font-semibold text-[color:var(--navy-deep)]">
                    {month.month}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[color:var(--navy)] to-[color:var(--gold)]"
                          style={{ width: `${month.level}%` }}
                        />
                      </div>
                      <span className="w-24 text-xs font-medium text-[color:var(--navy)]/70">
                        {month.snowfall}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-[color:var(--navy)]/70">{month.temp}</div>
                  <div className="text-sm text-[color:var(--navy)]/60">{month.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-[color:var(--gold)]/20 bg-[color:var(--gold)]/5 p-8">
            <h3 className="font-serif text-2xl text-[color:var(--navy-deep)]">
              When is snowfall most reliable?
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { period: "December (Late)", prob: "Moderate–High", note: "First heavy snowfall typically arrives Dec 15–31" },
                { period: "January", prob: "Very High", note: "Most reliable — 3–6 separate snowfall events" },
                { period: "February", prob: "High", note: "Photogenic snowfall with bright skies" },
                { period: "March (Early)", prob: "Low–Moderate", note: "Late-season, unpredictable" },
              ].map((item) => (
                <div key={item.period} className="rounded-xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[color:var(--navy-deep)]">{item.period}</p>
                    <span className="rounded-full bg-[color:var(--navy-deep)] px-3 py-1 text-xs font-semibold text-[color:var(--gold-soft)]">
                      {item.prob}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--navy)]/70">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FORECAST & SAFETY ============ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Real-Time Intelligence"
            title="Snowfall forecast — Murree & Bhurban"
            sub="The most accurate real-time snowfall forecast comes from the Pakistan Meteorological Department (PMD). Here's how to read it — and how to plan around it."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-black/5 bg-[color:var(--frost)] p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--navy-deep)] text-[color:var(--gold)]">
                  <CloudSnow className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl text-[color:var(--navy-deep)]">
                  How to track snowfall
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Pakistan Meteorological Department",
                    body: "pmd.gov.pk — official advisories 48–72h before major snowfall events.",
                  },
                  {
                    title: "AccuWeather (Bhurban)",
                    body: "Hour-by-hour and 15-day forecasts specific to Bhurban — great for week-ahead planning.",
                  },
                  {
                    title: "Windy.com (Advanced)",
                    body: "Visual snow accumulation maps tracking western disturbances across Pakistan.",
                  },
                  {
                    title: "Himalaya Villas WhatsApp",
                    body: "Message +92-304-567-9000 for direct on-property snowfall updates.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--gold)]" />
                    <div>
                      <p className="font-semibold text-[color:var(--navy-deep)]">{item.title}</p>
                      <p className="text-sm text-[color:var(--navy)]/70">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-[color:var(--navy-deep)] p-8 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--gold)] text-[color:var(--navy-deep)]">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl">Road conditions & safety</h3>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { t: "Check road status", d: "Via PDMA Punjab's official social media before departure." },
                  { t: "Depart early", d: "Before 7:00 AM from Islamabad significantly reduces risk." },
                  { t: "4x4 recommended", d: "Strongly advised for Bhurban access during active snowfall." },
                  { t: "Property briefings", d: "Himalaya Villas guests receive WhatsApp road updates pre-travel." },
                ].map((item) => (
                  <div key={item.t} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-[color:var(--gold-soft)]" />
                    <div>
                      <p className="font-semibold">{item.t}</p>
                      <p className="text-sm text-white/60">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5 p-6">
            <Clock className="mt-0.5 h-6 w-6 flex-none text-[color:var(--gold)]" />
            <div>
              <p className="font-semibold text-[color:var(--navy-deep)]">
                Forecast vs. experience
              </p>
              <p className="mt-1 text-sm text-[color:var(--navy)]/70">
                A 70% snowfall probability does not mean the entire region will be covered.
                Snowfall distribution varies with elevation. Bhurban (6,500 ft) consistently
                receives snow when Murree town (7,500 ft) does, and often when lower
                elevations do not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="relative overflow-hidden bg-[color:var(--navy-deep)] py-24 text-white">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--navy)]/60 blur-3xl" />
        <Snow density="light" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-soft)]">
              The Snowfall Experience
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              What snowfall in Bhurban actually looks and feels like.
            </h2>
            <p className="mt-6 text-white/70">
              Most visitors experience Murree snowfall from a car window, a roadside
              vendor stall, or a crowded hotel lobby. The snowfall itself — the silence
              after a heavy fall, the weight of snow on pine branches, the blue-grey
              light of a Himalayan winter morning — is extraordinary. But it is almost
              entirely inaccessible to guests in shared hotel environments.
            </p>
            <p className="mt-4 text-white/70">
              Bhurban sits higher than Murree town, so snowfall arrives earlier,
              accumulates deeper, and stays longer. At Himalaya Villas, the snow lands
              on your private terrace — not a shared lobby.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[color:var(--gold)]/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <Image
                src={photos[1].src}
                alt={photos[1].alt}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)]">
                  Bhurban · 6,500 ft
                </p>
                <p className="mt-1 font-serif text-2xl">The private-terrace morning</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-7xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="font-serif text-2xl text-[color:var(--gold-soft)]">
              What guests describe
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Waking to fresh snowfall on a private terrace — no crowds, no noise beyond pine branches",
                "Fireplace-lit evenings with in-villa dining — served at your pace",
                "Morning walks through the Bhurban pine forest directly from the villa grounds",
                "The ridgeline view in full winter white from your primary terrace",
                "Hot breakfast served while snowfall continues outside",
                "Evening bonfire in private outdoor space — arranged on snowfall nights",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4 flex-none fill-[color:var(--gold)] text-[color:var(--gold)]" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PLANNING GUIDE ============ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Buyer's Guide"
            title="Plan a snowfall trip to Murree & Bhurban"
            sub="The 5 decisions that make or break a winter snowfall trip."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Timing",
                priority: "HIGH",
                advice: "Book weekday if possible — weekend trips involve 4–8 hour traffic queues from Islamabad.",
                villa: "Book 2–3 weeks ahead. Midweek has 40% less traffic.",
              },
              {
                n: "02",
                title: "Elevation",
                priority: "CRITICAL",
                advice: "Bhurban (6,500 ft) is higher, quieter, and has deeper accumulation than central Murree.",
                villa: "Book accommodation in Bhurban, not central Murree town.",
              },
              {
                n: "03",
                title: "Accommodation",
                priority: "CRITICAL",
                advice: "Shared hotel rooms mean competing for terrace views and crowded dining.",
                villa: "Private villa at Himalaya — book direct for best availability.",
              },
              {
                n: "04",
                title: "Transport",
                priority: "HIGH",
                advice: "A 4x4 or AWD vehicle is strongly recommended during active snowfall.",
                villa: "Transfer service available from Himalaya Villas.",
              },
              {
                n: "05",
                title: "Duration",
                priority: "HIGH",
                advice: "Single-night visits are often insufficient for the full snowfall experience.",
                villa: "Minimum 2 nights recommended for winter stays.",
              },
            ].map((item, i) => (
              <div
                key={item.n}
                className="group rounded-2xl border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:border-[color:var(--gold)]/40 hover:shadow-lg animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-[color:var(--gold)]/70">
                    {item.n}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      item.priority === "CRITICAL"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl text-[color:var(--navy-deep)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--navy)]/70">{item.advice}</p>
                <div className="mt-4 border-t border-black/5 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
                    Himalaya Villas
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--navy)]/70">{item.villa}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-black/5 bg-[color:var(--frost)] p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--navy-deep)] text-[color:var(--gold)]">
                  <Utensils className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl text-[color:var(--navy-deep)]">
                  What to pack
                </h3>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { t: "Thermal base layers", d: "Bhurban drops to -2°C at night Jan–Feb" },
                  { t: "Waterproof outer layer", d: "Snowfall is wet; windproof jacket essential" },
                  { t: "Waterproof boots", d: "Standard shoes become uncomfortable on snow paths" },
                  { t: "Gloves & warm headwear", d: "Wind chill makes uncovered skin uncomfortable fast" },
                  { t: "Power bank", d: "Cold drains phone batteries 2–3x faster" },
                ].map((item) => (
                  <div key={item.t} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--navy-deep)]">
                        {item.t}
                      </p>
                      <p className="text-xs text-[color:var(--navy)]/60">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-[color:var(--gold)]/10 p-4">
                <p className="text-xs text-[color:var(--navy)]/70">
                  <strong className="text-[color:var(--navy-deep)]">
                    Note for Himalaya Villas guests:
                  </strong>{" "}
                  All indoor areas are centrally heated. Thermal layers are needed for
                  outdoor time only — the villa itself is warm from arrival.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[color:var(--navy-deep)] p-8 text-white">
              <Snow density="light" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--gold)] text-[color:var(--navy-deep)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl">Plan your snow stay</h3>
                </div>
                <p className="mt-4 text-sm text-white/70">
                  Tell us your dates and group size — we'll handle the rest.
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: Phone, t: "WhatsApp: +92-304-567-9000", d: "Open 9 AM – 10 PM · 15-min response" },
                    { icon: Calendar, t: "Flexible booking", d: "Snowfall Chaser package available" },
                    { icon: Shield, t: "Road updates", d: "Real-time briefings before departure" },
                    { icon: Wifi, t: "Weather alerts", d: "Direct WhatsApp snowfall notifications" },
                  ].map((item) => (
                    <div key={item.t} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-none text-[color:var(--gold-soft)]" />
                      <div>
                        <p className="text-sm font-semibold">{item.t}</p>
                        <p className="text-xs text-white/60">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://wa.me/923045679000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold text-[color:var(--navy-deep)] transition hover:brightness-110"
                >
                  Plan Your Snow Trip Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SNOWFALL PICS GALLERY — now using all 5 photos ============ */}
      <section className="bg-[color:var(--frost)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Snowfall Pics"
            title="Bhurban & Murree Hills"
            sub="Professional snowfall photography from Himalaya Villas Bhurban."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {photos.map((image, index) => (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-2xl shadow-[0_20px_60px_-30px_rgba(15,27,61,0.4)] animate-fade-up ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-[color:var(--navy-deep)]/0 to-transparent opacity-70 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Camera className="h-3.5 w-3.5 text-[color:var(--gold-soft)]" />
                    <span>Bhurban · Himalaya Villas</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-white/90">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PACKAGES ============ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Winter Stays"
            title="Luxury snowfall packages"
            sub="Dedicated winter packages designed around the snowfall season."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,27,61,0.3)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(15,27,61,0.4)] animate-fade-up"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="absolute right-6 top-6 rounded-full bg-[color:var(--gold)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--gold)]">
                  {pkg.duration}
                </div>
                <h3 className="pr-24 font-serif text-2xl text-[color:var(--navy-deep)]">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--navy)]/60">
                  Best for: {pkg.bestFor}
                </p>
                <p className="mt-4 font-serif text-2xl text-[color:var(--gold)]">
                  {pkg.price}
                </p>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-green-600" />
                      <span className="text-sm text-[color:var(--navy)]/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/923045679000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--navy-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--navy)]"
                >
                  Book This Package <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
     <section className="py-16 md:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Common questions about staying in our villas in Bhurban, Murree.
      </p>
    </div>

    <div className="max-w-4xl mx-auto divide-y divide-gray-100 border-y border-gray-100">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
            <h3 className="font-medium text-neutral-900 group-open:text-[#8b6914] transition-colors">
              {faq.question}
            </h3>
            <span className="mt-0.5 shrink-0 text-[#c9a55b] transition-transform group-open:rotate-45">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
        </details>
      ))}
    </div>
  </div>
</section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src={photos[4].src}
            alt={photos[4].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[color:var(--navy-deep)]/90" />
        </div>
        <Snow density="heavy" />

        <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
          <Snowflake className="mx-auto h-10 w-10 animate-float-slow text-[color:var(--gold)]" />
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            Experience <span className="gold-shimmer">snowfall in Bhurban</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/75">
            Private villa. Mountain views. No crowds. Peak weekends fill 3–4 weeks
            in advance — book direct.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/923045679000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-8 py-4 text-sm font-semibold text-[color:var(--navy-deep)] shadow-xl transition hover:brightness-110"
            >
              <Phone className="h-4 w-4" /> WhatsApp: +92-304-567-9000
            </a>
            <Link
              href="/himalaya-villas-bhurban-murree-rest-house"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              View Property Details
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}