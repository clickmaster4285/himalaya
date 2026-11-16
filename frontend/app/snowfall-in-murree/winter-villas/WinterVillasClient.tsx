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
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Villa } from "./page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

type GalleryItem = { src: string; alt: string };

const photos: GalleryItem[] = [
  { src: "/images/winter-villas/winter-lodge-view.jpeg", alt: "Snow-covered lodge and mountain view" },
  { src: "/images/winter-villas/lodge-terraces-snow.jpeg", alt: "Lodge terraces after snowfall" },
  { src: "/images/winter-villas/snowy-lodge-branches.jpeg", alt: "Snow-laden branches beside the lodge" },
  { src: "/images/winter-villas/winter-lodge-courtyard.jpeg", alt: "Snow-covered lodge courtyard" },
  { src: "/images/winter-villas/winter-lodge-path.jpeg", alt: "Winter path beside the lodge" },
];

const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 6 + Math.random() * 14,
  duration: 8 + Math.random() * 14,
  delay: Math.random() * 12,
  opacity: 0.25 + Math.random() * 0.55,
  drift: Math.random() * 40 - 20,
}));

function Snow({ density = "normal" }: { density?: "light" | "normal" | "heavy" }) {
  const count = density === "light" ? 20 : density === "heavy" ? 70 : 40;
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
              "--snow-drift": `${f.drift}px`,
            } as React.CSSProperties
          }
        >
          ❄
        </span>
      ))}
    </div>
  );
}

const stats = [
  { k: "12", l: "Private Villas", icon: MountainSnow },
  { k: "6,500 ft", l: "Bhurban Elevation", icon: MapPin },
  { k: "Dec–Feb", l: "Peak Snowfall", icon: Snowflake },
  { k: "4.9★", l: "Guest Rating", icon: Star },
];

const amenities = [
  { icon: Flame, t: "Fireplace", d: "Wood-burning stone hearth" },
  { icon: Wifi, t: "High-Speed WiFi", d: "Fibre-backed, work-ready" },
  { icon: Utensils, t: "Full Kitchen", d: "Chef & self-catering both" },
  { icon: Bath, t: "Hot Water 24/7", d: "Even in -2°C nights" },
  { icon: Car, t: "Private Parking", d: "Snow-cleared driveway" },
  { icon: BedDouble, t: "Heated Bedding", d: "Electric blankets on request" },
  { icon: MountainSnow, t: "Ridge Views", d: "Unobstructed Himalayan vista" },
  { icon: Snowflake, t: "Snow Terrace", d: "Private, not shared" },
];

const experienceItems = [
  { icon: Flame, t: "In-villa fireplace", d: "Wood-burning stone hearths in every villa" },
  { icon: Bath, t: "Hot showers", d: "Round-the-clock hot water even in -2°C nights" },
  { icon: Utensils, t: "Chef-served meals", d: "Kashmiri, continental, and BBQ options on request" },
  { icon: Car, t: "4x4 pickup available", d: "Snow-day pickup from Bhurban gate arranged on booking" },
];

const trustSignals = [
  { icon: Shield, label: "Fully private villas" },
  { icon: Clock, label: "24/7 on-site support" },
  { icon: Sparkles, label: "Deep-cleaned between stays" },
];

export default function WinterVillasClient({ villas }: { villas: Villa[] }) {
  const [activeVilla, setActiveVilla] = useState<string>(villas[0].id);

  const selectedVilla = villas.find((v) => v.id === activeVilla) ?? villas[0];

  return (
    <div className="min-h-screen bg-[color:var(--frost)] text-[color:var(--navy-deep)]">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={photos[0].src}
            alt="Snowfall villa in Bhurban"
            className="h-full w-full animate-ken-burns object-cover"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy-deep)]/85 via-[color:var(--navy-deep)]/55 to-[color:var(--navy-deep)]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,27,61,0.4)_100%)]" />
        </div>
        <Snow density="heavy" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pb-24 pt-28 text-white">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--gold-soft)] backdrop-blur">
              <Snowflake className="h-3.5 w-3.5 animate-spin-slow" /> Winter Collection · 2025–2026
            </span>
            <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Our <span className="gold-shimmer">Winter Villas</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Handpicked private villas across Bhurban & the Murree Hills — built
              for snowfall mornings, fireside evenings and views no crowded hotel
              lobby can offer.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
              {trustSignals.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5">
                  <t.icon className="h-3.5 w-3.5 text-[color:var(--gold-soft)]" />
                  {t.label}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/villas"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold text-[color:var(--navy-deep)] shadow-xl shadow-black/30 transition hover:brightness-110 hover:shadow-2xl"
              >
                Explore Villas
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href={buildWhatsAppBookingUrl("a private villa tour")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="group animate-fade-up border-l border-[color:var(--gold)]/40 pl-4"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <s.icon className="mb-2 h-4 w-4 text-[color:var(--gold-soft)]/70 transition group-hover:text-[color:var(--gold-soft)]" />
                <div className="font-serif text-3xl text-[color:var(--gold-soft)]">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float-slow text-white/40">
          <ChevronRight className="h-5 w-5 rotate-90" />
        </div>
      </section>

      {/* VILLAS GRID — unchanged, uses v.image */}
<section id="villas" className="relative bg-[color:var(--frost)] py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
        The Collection
      </p>
      <h2 className="mt-4 font-serif text-4xl text-[color:var(--navy-deep)] md:text-5xl">
        Four winter homes. One Himalayan hillside.
      </h2>
      <p className="mt-4 text-[color:var(--navy)]/70">
        Each villa is fully private — no shared corridors, no lobbies, no
        other guests. Just your group, the snow, and the ridgeline.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-2">
      {villas.map((v, idx) => {
        const photo = photos[idx % photos.length];
        return (
          <article
            key={v.id}
            onMouseEnter={() => setActiveVilla(v.id)}
            className="group relative animate-fade-up overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-30px_rgba(15,27,61,0.4)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(15,27,61,0.5)]"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src}
                alt={`${v.name} — ${photo.alt}`}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/80 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[color:var(--navy-deep)] backdrop-blur">
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
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[color:var(--gold)]" /> {v.guests}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4 text-[color:var(--gold)]" /> {v.bedrooms}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Snowflake className="h-4 w-4 text-[color:var(--gold)]" /> Snow view
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {v.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-[color:var(--frost)] px-3 py-1 text-xs font-medium text-[color:var(--navy)]"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-black/5 pt-5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[color:var(--navy)]/50">
                    From
                  </div>
                  <div className="font-serif text-2xl text-[color:var(--navy-deep)]">
                    {v.price}
                    <span className="font-sans text-sm text-[color:var(--navy)]/60">
                      {" "}
                      / night
                    </span>
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
        );
      })}
    </div>
  </div>
</section>

      {/* EXPERIENCE STRIP — real winter photo */}
      <section
        id="experience"
        className="relative overflow-hidden bg-[color:var(--navy-deep)] py-24 text-white"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--navy)]/60 blur-3xl" />
        <Snow density="light" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold-soft)]">
              The Snowfall Experience
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              The silence after a heavy fall — that&rsquo;s what you are paying for.
            </h2>
            <p className="mt-6 text-white/70">
              Bhurban sits higher than Murree town. Snow arrives earlier,
              accumulates deeper, and stays longer. At Himalaya Villas, that
              snow lands on your private terrace — not a shared hotel lobby.
            </p>

            <div className="mt-10 space-y-5">
              {experienceItems.map((it, i) => (
                <div
                  key={it.t}
                  className="group flex animate-fade-up items-start gap-4"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold-soft)] ring-1 ring-[color:var(--gold)]/30 transition group-hover:bg-[color:var(--gold)]/25">
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
                src={photos[1].src}
                alt={photos[1].alt}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)]">
                  Now viewing
                </div>
                <div className="mt-1 font-serif text-2xl">{selectedVilla.name}</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {villas.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVilla(v.id)}
                  className={`overflow-hidden rounded-xl ring-2 transition ${
                    activeVilla === v.id
                      ? "ring-[color:var(--gold)]"
                      : "opacity-60 ring-transparent hover:opacity-100"
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
            {amenities.map((a, i) => (
              <div
                key={a.t}
                className="group animate-fade-up rounded-2xl border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:border-[color:var(--gold)]/40 hover:shadow-lg"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--navy-deep)] text-[color:var(--gold)] transition group-hover:bg-[color:var(--gold)] group-hover:text-[color:var(--navy-deep)]">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-[color:var(--navy-deep)]">{a.t}</div>
                <div className="mt-1 text-xs text-[color:var(--navy)]/60">{a.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA — real winter path photo */}
      <section id="book" className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src={photos[4].src}
            alt="Winter path beside the lodge"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[color:var(--navy-deep)]/90" />
        </div>
        <Snow density="heavy" />

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
            <MapPin className="h-4 w-4 text-[color:var(--gold)]" /> Bhurban, Murree Hills ·
            6,500 ft
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}