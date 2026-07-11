// app/winter-villas/WinterVillasClient.tsx
"use client";

import { useState } from "react";
import {
  Snowflake,
  MountainSnow,
  Flame,
  Wifi,
  Utensils,
  Car,
  Bath,
  Users,
  BedDouble,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Villa } from "./page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

// Pre-generate snowflake positions at the module level (outside component)
const generateSnowflakes = () => {
  return Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 14,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 10,
    opacity: 0.35 + Math.random() * 0.5,
  }));
};

// Generate once at module load
const snowflakes = generateSnowflakes();

function Snow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {snowflakes.map((f) => (
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

// Stats that don't need to be dynamic
const stats = [
  { k: "12", l: "Private Villas" },
  { k: "6,500 ft", l: "Bhurban Elevation" },
  { k: "Dec–Feb", l: "Peak Snowfall" },
  { k: "4.9★", l: "Guest Rating" },
];

const amenities = [
  { icon: Flame, t: "Fireplace" },
  { icon: Wifi, t: "High-Speed WiFi" },
  { icon: Utensils, t: "Full Kitchen" },
  { icon: Bath, t: "Hot Water 24/7" },
  { icon: Car, t: "Private Parking" },
  { icon: BedDouble, t: "Heated Bedding" },
  { icon: MountainSnow, t: "Ridge Views" },
  { icon: Snowflake, t: "Snow Terrace" },
];

const experienceItems = [
  { icon: Flame, t: "In-villa fireplace", d: "Wood-burning stone hearths in every villa" },
  { icon: Bath, t: "Hot showers & jacuzzis", d: "Round-the-clock hot water even in -2°C nights" },
  { icon: Utensils, t: "Chef-served meals", d: "Kashmiri, continental, and BBQ options on request" },
  { icon: Car, t: "4x4 pickup available", d: "Snow-day pickup from Bhurban gate arranged on booking" },
];

export default function WinterVillasClient({ villas }: { villas: Villa[] }) {
  const [activeVilla, setActiveVilla] = useState<string>(villas[0].id);

  // Get the hero image URL (first villa's image or a dedicated hero image)
  const heroImageUrl = "/assets/villa-hero.jpg";

  return (
    <div className="min-h-screen bg-[color:var(--frost)] text-[color:var(--navy-deep)]">
  
     <Navbar />
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt="Snowfall villa in Bhurban"
            className="h-full w-full object-cover animate-ken-burns"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy-deep)]/85 via-[color:var(--navy-deep)]/55 to-[color:var(--navy-deep)]/95" />
        </div>
        <Snow />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-28 pb-24 text-white">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--gold-soft)] backdrop-blur">
              <Snowflake className="h-3.5 w-3.5" /> Winter Collection · 2025–2026
            </span>
            <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Our <span className="gold-shimmer">Winter Villas</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Handpicked private villas across Bhurban & the Murree Hills — built
              for snowfall mornings, fireside evenings and views no crowded hotel
              lobby can offer.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/villas"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] shadow-xl shadow-black/30 transition hover:brightness-110"
              >
                Explore Villas
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="border-l border-[color:var(--gold)]/40 pl-4 animate-fade-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="font-serif text-3xl text-[color:var(--gold-soft)]">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VILLAS GRID */}
      <section id="villas" className="relative bg-[color:var(--frost)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">The Collection</p>
            <h2 className="mt-4 font-serif text-4xl text-[color:var(--navy-deep)] md:text-5xl">
              Four winter homes. One Himalayan hillside.
            </h2>
            <p className="mt-4 text-[color:var(--navy)]/70">
              Each villa is fully private — no shared corridors, no lobbies, no
              other guests. Just your group, the snow, and the ridgeline.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {villas.map((v, idx) => (
              <article
                key={v.id}
                onMouseEnter={() => setActiveVilla(v.id)}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-30px_rgba(15,27,61,0.4)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(15,27,61,0.5)] animate-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.name}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/70 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[color:var(--navy-deep)]">
                    <Star className="h-3 w-3 fill-[color:var(--gold)] text-[color:var(--gold)]" />
                    {v.rating}
                  </div>
                  <div className="absolute right-5 top-5 rounded-full bg-[color:var(--gold)] px-3 py-1 text-xs font-semibold text-[color:var(--navy-deep)]">
                    {v.accent}
                  </div>
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-2xl md:text-3xl">{v.name}</h3>
                    <p className="mt-1 text-sm text-white/85">{v.tagline}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[color:var(--navy)]/70">
                    <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-[color:var(--gold)]" /> {v.guests}</span>
                    <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[color:var(--gold)]" /> {v.bedrooms}</span>
                    <span className="inline-flex items-center gap-1.5"><Snowflake className="h-4 w-4 text-[color:var(--gold)]" /> Snow view</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {v.features.map((f) => (
                      <span key={f} className="rounded-full bg-[color:var(--frost)] px-3 py-1 text-xs font-medium text-[color:var(--navy)]">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t border-black/5 pt-5">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[color:var(--navy)]/50">From</div>
                      <div className="font-serif text-2xl text-[color:var(--navy-deep)]">
                        {v.price}
                        <span className="text-sm font-sans text-[color:var(--navy)]/60"> / night</span>
                      </div>
                    </div>
                    <a
                       href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[color:var(--navy-deep)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--navy)]"
                    >
                      Reserve
                      <ChevronRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section id="experience" className="relative overflow-hidden bg-[color:var(--navy-deep)] py-24 text-white">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--navy)]/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-soft)]">
              The Snowfall Experience
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              The silence after a heavy fall — thats what you are paying for.
            </h2>
            <p className="mt-6 text-white/70">
              Bhurban sits higher than Murree town. Snow arrives earlier,
              accumulates deeper, and stays longer. At Himalaya Villas, that
              snow lands on your private terrace — not a shared hotel lobby.
            </p>

            <div className="mt-10 space-y-5">
              {experienceItems.map((it) => (
                <div key={it.t} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold-soft)] ring-1 ring-[color:var(--gold)]/30">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{it.t}</div>
                    <div className="text-sm text-white/60">{it.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[color:var(--gold)]/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <Image
                src={villas.find((v) => v.id === activeVilla)?.image ?? villas[0].image}
                alt="Selected villa preview"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-all duration-700"
                key={activeVilla}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)]">Now viewing</div>
                <div className="mt-1 font-serif text-2xl">
                  {villas.find((v) => v.id === activeVilla)?.name}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {villas.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVilla(v.id)}
                  className={`overflow-hidden rounded-xl ring-2 transition ${
                    activeVilla === v.id ? "ring-[color:var(--gold)]" : "ring-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image 
                    src={v.image} 
                    alt={v.name} 
                    loading="lazy" 
                    width={200} 
                    height={200} 
                    className="aspect-square w-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="bg-[color:var(--frost)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
              Every Villa Includes
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[color:var(--navy-deep)] md:text-5xl">
              Built for winter, not adapted to it.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a) => (
              <div
                key={a.t.toLowerCase().replace(/\s+/g, "-")}
                className="group rounded-2xl border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:border-[color:var(--gold)]/40 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--navy-deep)] text-[color:var(--gold)] transition group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--navy-deep)]">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-[color:var(--navy-deep)]">{a.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section id="book" className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src={heroImageUrl} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-[color:var(--navy-deep)]/90" />
        </div>
        <Snow />
        <div className="relative mx-auto max-w-4xl px-6 text-center text-white">
          <Snowflake className="mx-auto h-10 w-10 animate-float-slow text-[color:var(--gold)]" />
          <h2 className="mt-6 font-serif text-4xl md:text-6xl">
            Reserve your <span className="gold-shimmer">snow season</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/75">
            Peak snow weeks (Dec 20 – Feb 15) book out early. Message us on
            WhatsApp for real-time availability and snowfall updates.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
                href={buildWhatsAppBookingUrl("a private villa tour")}
                              target="_blank"
                              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-8 py-4 text-sm font-semibold text-[color:var(--navy-deep)] shadow-xl transition hover:brightness-110"
            >
              <Phone className="h-4 w-4" /> Book Your Stay
            </a>
            <a
               href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" /> Check Availability
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4 text-[color:var(--gold)]" /> Bhurban, Murree Hills · 6,500 ft
          </div>
        </div>
      </section>
      <Footer />
     
    </div>
  );
}