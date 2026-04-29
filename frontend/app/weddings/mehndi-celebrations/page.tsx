"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CheckCircle2, HelpCircle, Music, Sparkles } from "lucide-react";

const mehndiEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Mehndi Celebrations at Himalaya Villas",
  "description": "Vibrant mehndi celebrations with traditional yellow-orange themes, floral hangings, live dhol music, and family event coordination in Bhurban, Murree Hills.",
  "url": "https://himalayavillas.com/weddings/mehndi-celebrations",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "location": {
    "@type": "Place",
    "name": "Himalaya Villas and Resort",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bhurban",
      "addressLocality": "Murree",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Himalaya Villas and Resort",
    "telephone": "+92 304 567 9000"
  },
  "offers": {
    "@type": "Offer",
    "price": "80000",
    "priceCurrency": "PKR",
    "description": "Mehndi celebration package with stage styling and music arrangements"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What themes are available for mehndi celebrations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer vibrant yellow-orange themes, floral hangings, and traditional seating setups that can be customized to your preferences."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide music and dhol for mehndi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we arrange live dhol and curated playlists to create high-energy family celebration vibes for your mehndi event."
      }
    }
  ]
};

const heroSlides = [
  "/assets/mehndi-hero-1.png",
  "/assets/mehndi-hero-2.png",
  "/assets/wedding6.jpg",
  "/assets/wedding7.jpg",
];

const services = [
  {
    title: "Mehndi Stage Styling",
    text: "Vibrant yellow-orange themes, floral hangings, and traditional seating setup.",
  },
  {
    title: "Music & Dhol Arrangements",
    text: "Live dhol and curated playlist for high-energy family celebration vibes.",
  },
  {
    title: "Family Event Coordination",
    text: "Smooth guest flow, timing, and on-ground support for stress-free celebration.",
  },
];

const checklist = [
  "Custom mehndi decor themes",
  "Dance floor and entry styling",
  "Photography and video moments",
  "Food counters and hospitality",
];

const steps = [
  { n: "01", t: "Share your date", d: "Send date, guests, and your mehndi theme preference." },
  { n: "02", t: "Curate decor", d: "We finalize stage colors, florals, lights, and entry vibe." },
  { n: "03", t: "Lock the flow", d: "Timings for dhol, dances, dinner, and family moments." },
  { n: "04", t: "Celebrate", d: "On-ground team manages everything while you enjoy." },
];

const gallery = [
  "/assets/mehndi-hero-1.png",
  "/assets/mehndi-hero-2.png",
  "/assets/wedding6.jpg",
  "/assets/wedding7.jpg",
];

const faqs = [
  { q: "Is mehndi decor customizable?", a: "Yes — colors, florals, stage layout, and lighting can be customized to your theme." },
  { q: "Can you manage dhol + sound system?", a: "Yes — we can arrange dhol and sound setup based on your program and guest count." },
  { q: "Do you provide photography?", a: "We can arrange coverage packages, or coordinate smoothly with your photographer." },
];

export default function MehndiPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mehndiEventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative min-h-[720px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, idx) => (
            <Image
              key={slide}
              src={slide}
              alt="Mehndi event setup"
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <Navbar />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
            Mehndi Celebrations
          </h1>
          <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
            Experience vibrant mehndi celebrations at Himalaya Villas. Our curated mehndi celebrations offer high-energy dhol, custom stages, and full family coordination.
          </p>
          <a href="#book" className="mt-8 inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition">
            Book Mehndi Date
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fbf7ee]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Mehndi Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2 text-[#9a7b3a]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Why Mehndi at Himalaya Villas & Resorts</h2>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#9a7b3a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl border border-neutral-200">
            <Image src="/assets/mehndi-hero-1.png" alt="Mehndi decor" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fffaf2]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Mehndi Planning Steps</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">4-step flow so everything stays organized.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-[#eddcc1] bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#f5ead7] px-3 py-1 text-xs font-semibold tracking-wider text-[#9a7b3a]">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Mehndi Gallery</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">A few visuals to set the mood.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <div key={img} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
                <Image src={img} alt="Mehndi gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#0f172a] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl">FAQs</h2>
            <p className="mt-3 text-sm md:text-base text-white/80">Quick answers for common questions.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="mb-3 inline-flex rounded-full bg-white/10 p-2">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6 md:p-10">
            <h2 className="font-display text-3xl md:text-4xl">Book Your Mehndi Event</h2>
            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Full Name" />
              <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Phone Number" />
              <input type="email" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Email Address" />
              <input type="date" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none" />
              <textarea rows={4} className="md:col-span-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Share your mehndi plan..." />
              <button type="submit" className="md:col-span-2 rounded-lg bg-[#c9a55b] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741]">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
