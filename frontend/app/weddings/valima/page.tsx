"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CheckCircle2, Crown, HelpCircle } from "lucide-react";

const heroSlides = [
  "/assets/valima-hero-1.jpg",
  "/assets/valima-hero-2.jpg",
  "/assets/barat-hero-2.png",
  "/assets/barat-hero-3.png",
];

const services = [
  { title: "Valima Stage and Floral Wall", text: "Luxury stage theme with florals, sofa styling, and balanced lighting." },
  { title: "Dinner and Table Styling", text: "Banquet table setup, centerpieces, and smooth fine-dining flow." },
  { title: "Guest Seating and Protocol", text: "Managed seating plan and event timing for a calm premium experience." },
];

const benefits = [
  "Premium valima stage themes",
  "Luxury banquet hall ambiance",
  "Professional guest flow management",
  "Photo-friendly lighting and layout",
];

const steps = [
  { n: "01", t: "Share your plan", d: "Date, guest count, and your preferred stage theme." },
  { n: "02", t: "Design proposal", d: "Stage and dining layout visuals with budget-friendly options." },
  { n: "03", t: "Finalize checklist", d: "Timings, vendors, and event day flow confirmation." },
  { n: "04", t: "Execute", d: "We manage the setup while you enjoy the night." },
];

const gallery = [
  "/assets/valima-hero-1.jpg",
  "/assets/valima-hero-2.jpg",
  "/assets/barat-hero-2.png",
  "/assets/barat-hero-3.png",
];

const faqs = [
  { q: "Can we customize stage colors?", a: "Yes. Colors, floral density, sofa style, and lighting are customizable." },
  { q: "Do you manage dinner flow?", a: "Yes. Seating and service movement is planned for smooth hospitality." },
  { q: "Can you arrange photo lighting?", a: "Yes. We can add balanced stage lighting for better photos and videos." },
];

export default function ValimaPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[720px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, idx) => (
            <Image
              key={slide}
              src={slide}
              alt="Valima and wedding dinner setup"
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <Navbar />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
            Valima and Wedding Dinner
            <br />
            Luxury Reception Experience
          </h1>
          <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
            Premium stage, elegant dining, and smooth guest flow. Hero slider auto-changes every 3 seconds.
          </p>
          <a href="#book" className="mt-8 inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition">
            Book Valima Date
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fbf7ee]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Valima Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2 text-[#9a7b3a]">
                  <Crown className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Why Valima at Himalaya Villas</h2>
            <ul className="mt-6 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#9a7b3a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <Image src="/assets/valima-hero-1.jpg" alt="Valima decor" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fffaf2]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Planning Steps</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">A clear flow from inquiry to event day.</p>
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

      <section className="py-16 md:py-20 bg-[#0f172a] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl">Gallery</h2>
            <p className="mt-3 text-sm md:text-base text-white/80">Reception style previews.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <div key={img} className="relative h-52 overflow-hidden rounded-2xl border border-white/10">
                <Image src={img} alt="Valima gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">FAQs</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Quick answers for valima planning.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-[#f5ead7] p-2 text-[#9a7b3a]">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6 md:p-10">
            <h2 className="font-display text-3xl md:text-4xl">Book Your Valima Event</h2>
            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Full Name" />
              <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Phone Number" />
              <input type="email" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Email Address" />
              <input type="date" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none" />
              <textarea rows={4} className="md:col-span-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Share your plan..." />
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
