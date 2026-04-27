"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CheckCircle2, HelpCircle, Sparkles } from "lucide-react";

const heroSlides = [
  "/assets/dholki-hero-1.jpg",
  "/assets/dholki-hero-2.jpg",
  "/assets/mehndi-hero-1.png",
  "/assets/mehndi-hero-2.png",
];

const services = [
  { title: "Dholki Setup & Styling", text: "Traditional seating, themed cushions, stage styling, and warm lighting." },
  { title: "Music, Dhol & Dance", text: "Dhol arrangements, sound setup, and program-friendly timing support." },
  { title: "Family Flow Management", text: "Guest seating, dinner flow, and on-ground coordination." },
];

const steps = [
  { n: "01", t: "Date and guests", d: "Share date, guest count, and venue preferences." },
  { n: "02", t: "Theme finalize", d: "Colors, stage, lights, and seating layout." },
  { n: "03", t: "Program flow", d: "Dhol, dances, dinner, and key family moments." },
  { n: "04", t: "Celebrate", d: "We manage execution; you enjoy the night." },
];

const gallery = [
  "/assets/dholki-hero-1.jpg",
  "/assets/dholki-hero-2.jpg",
  "/assets/mehndi-hero-1.png",
  "/assets/mehndi-hero-2.png",
];

const faqs = [
  { q: "Is the dholki theme customizable?", a: "Yes. Colors, seating layout, stage, and lighting can be customized." },
  { q: "Can you provide dhol and sound?", a: "Yes. We can arrange sound and dhol based on your program." },
  { q: "Do you manage dinner flow?", a: "Yes. We coordinate guest movement and service timing." },
];

export default function DholkiPage() {
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
              alt="Dholki and bridal shower setup"
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
            Dholki and Bridal Shower
          </h1>
          <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">
            Celebrate intimate dholki and bridal shower events. Our dholki and bridal shower setups bring traditional charm and modern elegance.
          </p>
          <a
            href="#book"
            className="mt-8 inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition"
          >
            Book Dholki Date
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fbf7ee]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Dholki Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2 text-[#9a7b3a]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Planning Steps</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Simple flow for a smooth celebration.</p>
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
            <p className="mt-3 text-sm md:text-base text-white/80">A few visuals to set the mood.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <div key={img} className="relative h-52 overflow-hidden rounded-2xl border border-white/10">
                <Image src={img} alt="Dholki gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">FAQs</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Quick answers for dholki planning.</p>
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
            <h2 className="font-display text-3xl md:text-4xl">Book Your Dholki Event</h2>
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
