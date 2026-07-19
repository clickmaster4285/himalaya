// app/villas/[slug]/VillasClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { type Room } from "@/content/villas/villa-content";
import VillaAmenitiesSection from "@/components/VillaAmenitiesSection";
import { amenityImages } from "@/content/villas/villa-content";
import { buildWhatsAppBookingUrl, buildWhatsAppVillaBookingUrl, buildWhatsAppVillaEnquiryUrl } from "@/lib/whatsapp";

interface VillasClientProps {
  room: Room;
}

export default function VillasClient({ room }: VillasClientProps) {
  const [active, setActive] = useState(0);

  // Use the new images array from the room data
  const gallery = room.images;

  return (
    <div className="min-h-screen bg-[#e9e2d1]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:pt-20">
        {/* Back link */}
        <Link
          href="/villas"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6b6357] transition hover:text-[#2b2b2b]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to villas
        </Link>

        {/* Header */}
        <div className="mt-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a07c1f]">
            {room.collection} · {room.tag}
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#2b2b2b] leading-tight">
            {room.name}
          </h1>
          <p className="mt-4 text-[#6b6357] leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Gallery */}
<div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(31,51,82,0.18)]">
    <Image
      src={gallery[active] || "/assets/villas/placeholder.jpg"}
      alt={room.name}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 70vw"
      priority
    />
  </div>

  <div className="flex gap-4">
    {/* First column - first 5 images */}
    <div className="flex flex-col gap-4">
      {gallery.slice(0, 5).map((src, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`relative shrink-0 w-27 h-27 overflow-hidden rounded-md transition ${
            active === i
              ? "ring-2 ring-[#c9a24a]"
              : "opacity-80 hover:opacity-100"
          }`}
        >
          <Image
            src={src}
            alt={`${room.name} view ${i + 1}`}
            fill
            className="object-cover"
            sizes="96px"
          />
        </button>
      ))}
    </div>

    {/* Second column - remaining images */}
    {gallery.length > 5 && (
      <div className="flex flex-col gap-4">
        {gallery.slice(5).map((src, i) => (
          <button
            key={i + 5}
            onClick={() => setActive(i + 5)}
            className={`relative shrink-0 w-27 h-27 overflow-hidden rounded-md transition ${
              active === i + 5
                ? "ring-2 ring-[#c9a24a]"
                : "opacity-80 hover.opacity-100"
            }`}
          >
            <Image
              src={src}
              alt={`${room.name} view ${i + 6}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>
    )}
  </div>
</div>

        {/* Content grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Left: description + highlights + amenities */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-serif text-2xl text-[#2b2b2b]">
                About this stay
              </h2>
              <div className="mt-3 h-px w-16 bg-[#c9a24a]" />
              <p className="mt-5 text-[#5b5347] leading-relaxed">
                {room.longDescription}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#2b2b2b]">Highlights</h2>
              <div className="mt-3 h-px w-16 bg-[#c9a24a]" />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {room.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-[#5b5347]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fdfaf3] text-[#a07c1f] ring-1 ring-[#ece5d3]">
                      <Check className="h-3 w-3" strokeWidth={2} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right: booking card + details */}
        <aside className="lg:col-span-1">
  <div className="sticky top-8 rounded-2xl border border-[#eee5d6] bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
    {/* Price */}
    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b58a1d]">
      PER NIGHT
    </p>

    <h3 className="mt-2 font-serif text-4xl italic leading-none text-[#2b2b2b]">
      PKR {room.price}
    </h3>

    <p className="mt-2 text-sm text-[#8a8071]">
      Includes breakfast for 2 guests
    </p>

    {/* Buttons */}
    <div className="mt-7 space-y-3">
      <a
      href={buildWhatsAppVillaBookingUrl({
  name: room.name,
  tag: room.tag,
  price: room.price,
  href: room.slug, // or room.href if that's what your Room type has
})}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-lg bg-[#2b2b2b] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#c9a24a]"
      >
        Book Now
      </a>

      <a
     href={buildWhatsAppVillaEnquiryUrl({
  name: room.name,
  tag: room.tag,
  price: room.price,
  slug: room.slug,
})}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-lg border border-[#e8deca] bg-[#faf7f1] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#2b2b2b] transition duration-300 hover:border-[#c9a24a] hover:bg-[#f5efdf]"
      >
        Enquire
      </a>
    </div>

    {/* Divider */}
    <div className="my-7 h-px bg-[#ece5d3]" />

    {/* Details */}
    <dl className="space-y-4">
      {room.details.map((d) => (
        <div
          key={d.label}
          className="flex items-start justify-between gap-4 border-b border-[#f5f0e5] pb-3 last:border-0 last:pb-0"
        >
          <dt className="text-sm text-[#8a8071]">{d.label}</dt>
          <dd className="text-right text-sm font-medium text-[#2b2b2b]">
            {d.value}
          </dd>
        </div>
      ))}
    </dl>
  </div>
</aside>
        </div>

     

        <p className="mt-16 text-center text-xs text-[#8a8071] max-w-xl mx-auto">
          Max 3 persons per room with the option of 1 extra mattress (additional
          charges apply). Rates include complimentary breakfast for 2 guests per
          room.
        </p>
      </div>
        <VillaAmenitiesSection 
  amenities={room.amenities} 
  imageByAmenity={amenityImages}   // ← Pass the mapping from villa-content
/>
    </div>
  );
}