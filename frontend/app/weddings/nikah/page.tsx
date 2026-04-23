"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Heart, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heroSlides = [
  "/assets/nikah-hero-1.png",
  "/assets/nikah-hero-2.png",
  "/assets/wedding3.jpg",
  "/assets/wedding8.jpg",
];

const services = [
  {
    title: "Traditional Nikah Ceremony",
    text: "Imam coordination, witness setup, sacred seating plan, and smooth flow management.",
  },
  {
    title: "Nikah + Reception Setup",
    text: "Complete stage decor, lighting, guest hospitality, and premium dining service.",
  },
  {
    title: "Photography & Content Coverage",
    text: "Dedicated wedding shoots, cinematic reels, and family portrait moments.",
  },
];

const features = [
  "Elegant floral and stage design",
  "Family-friendly private venue",
  "Flexible guest capacity and layouts",
  "On-ground event management team",
];

const gallery = [
  "/assets/wedding1.jpg",
  "/assets/wedding2.jpg",
  "/assets/wedding6.jpg",
  "/assets/nikah-hero-2.png",
];

export default function NikahPage() {
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
              alt="Nikah setup at Himalaya Villas"
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
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.18em] text-white/95">
            <Heart className="h-4 w-4" />
            Signature Nikah Experience
          </p>

          <h1 className="mt-6 font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
            Nikah & Wedding
            <br />
            Celebrations in the Hills
          </h1>

          <p className="mt-5 max-w-2xl text-sm md:text-base text-white/90 leading-relaxed">
            Har 3 second baad hero image change hoti hai, aur aapki provided images bhi is slider me use ki gayi hain for a premium visual experience.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#services"
              className="rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#aa8843]"
            >
              View Services
            </a>
            <a
              href="#book"
              className="rounded-md border border-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-neutral-900"
            >
              Book Nikah Venue
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-20 bg-[#f8f5ee]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Our Services</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Services section ko clear aur visible design me improve kiya gaya hai.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-[#e7dbc6] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2 text-[#9a7b3a]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Why Couples Choose Us</h2>
            <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">
              From intimate nikah moments to full wedding receptions, our team handles each detail with elegance and care.
            </p>
            <ul className="mt-6 space-y-3">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#9a7b3a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
            <Image
              src="/assets/nikah-hero-1.png"
              alt="Nikah ceremony decor"
              width={1200}
              height={780}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#0f172a] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h2 className="font-display text-3xl md:text-4xl">Nikah Moments Gallery</h2>
            <p className="text-sm md:text-base text-white/80">Extra section add kiya gaya hai for visual impact.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <div key={img} className="relative h-52 overflow-hidden rounded-xl border border-white/10">
                <Image src={img} alt="Nikah gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-10 shadow-sm">
            <div className="mb-6 text-center">
              <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Book Your Nikah Date</h2>
              <p className="mt-2 text-sm md:text-base text-neutral-600">Share details and our team will contact you shortly.</p>
            </div>

            <form className="grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#c9a55b]" placeholder="Full Name" />
              <input className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#c9a55b]" placeholder="Phone Number" />
              <input type="email" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#c9a55b]" placeholder="Email Address" />
              <input type="date" className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#c9a55b]" />
              <select className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] md:col-span-2">
                <option value="">Select Ceremony Type</option>
                <option>Traditional Nikah</option>
                <option>Nikah + Reception</option>
                <option>Custom Wedding Plan</option>
              </select>
              <textarea rows={4} className="rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] md:col-span-2" placeholder="Tell us your event requirements..." />
              <button type="submit" className="md:col-span-2 rounded-lg bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700">
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
