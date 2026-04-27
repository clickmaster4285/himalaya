"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CheckCircle2, Crown, HelpCircle, Users } from "lucide-react";

const heroSlides = [
  "/assets/barat-hero-1.png",
  "/assets/barat-hero-2.png",
  "/assets/barat-hero-3.png",
  "/assets/barat-hero-4.png",
];

const services = [
  {
    title: "Grand Baraat Entry",
    text: "Regal entry setup with lights, pathway styling, and signature welcome theme.",
  },
  {
    title: "Main Stage & Reception",
    text: "Large-format stage design, sofa setup, floral wall, and coordinated lighting.",
  },
  {
    title: "Guest Hospitality Flow",
    text: "Managed seating, dinner flow, and smooth event operations for large crowds.",
  },
];

const benefits = [
  "Premium baraat stage themes",
  "Dedicated planning and timeline control",
  "Luxury dining and service setup",
  "Photo-friendly visual experience",
];

const steps = [
  { n: "01", t: "Finalize date", d: "Share the baraat day date, venue needs, and guest count." },
  { n: "02", t: "Stage & entry design", d: "We lock stage theme, lighting, and entry pathway styling." },
  { n: "03", t: "Dinner flow", d: "We set seating + service movement for smooth hospitality." },
  { n: "04", t: "Event day control", d: "On-ground team manages timing, coordination, and execution." },
];

const gallery = [
  "/assets/barat-hero-1.png",
  "/assets/barat-hero-2.png",
  "/assets/barat-hero-3.png",
  "/assets/barat-hero-4.png",
];

const faqs = [
  { q: "Can we customize the stage theme?", a: "Yes — colors, floral density, sofa style, and lighting can be customized." },
  { q: "Do you handle big guest counts?", a: "Yes — we plan seating + dinner flow to keep everything smooth." },
  { q: "Is entry pathway styling included?", a: "We can design the entry as an add-on or include it in a full package." },
];

export default function BaraatPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

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
              alt="Baraat event setup"
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
            Baraat Celebrations
          </h1>
          <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
            Host grand baraat celebrations in the hills. We manage premium baraat celebrations with stunning stage decor and VIP hospitality flows.
          </p>
          <a href="#book" className="mt-8 inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition">
            Book Baraat Date
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#faf7f0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Baraat Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2 text-[#9a7b3a]">
                  <Crown className="h-5 w-5" />
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
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Designed for Big Family Celebrations</h2>
            <ul className="mt-6 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#9a7b3a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl border border-neutral-200">
            <Image src="/assets/barat-hero-2.png" alt="Baraat stage" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fffaf2]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Baraat Planning Steps</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Structured planning for a grand event day.</p>
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
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Baraat Gallery</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Stage and ambiance previews.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <div key={img} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
                <Image src={img} alt="Baraat gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#0f172a] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl">FAQs</h2>
            <p className="mt-3 text-sm md:text-base text-white/80">Quick answers for baraat planning.</p>
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
            <h2 className="font-display text-3xl md:text-4xl">Book Your Baraat Event</h2>
            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Full Name" />
              <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Phone Number" />
              <input type="email" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Email Address" />
              <input type="date" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none" />
              <select className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none md:col-span-2">
                <option value="">Select Event Type</option>
                <option>Baraat Reception</option>
                <option>Baraat + Dinner Setup</option>
                <option>Custom Family Event</option>
              </select>
              <textarea rows={4} className="md:col-span-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60" placeholder="Share your baraat requirements..." />
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
