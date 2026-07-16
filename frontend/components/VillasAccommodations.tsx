"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

type Room = {
  tag: string;
  href: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

type Collection = {
  title: string;
  subtitle: string;
  rooms: Room[];
};

const collections: Collection[] = [
  {
    title: "Himalaya Apartments",
    
    subtitle:
      "Warm, homely apartments for couples and small families — quiet nights, mountain-facing windows.",
    rooms: [
      {
        tag: "APARTMENT",
        name: "Single Luxury Room",
         href: "apartment-single-luxury",
        description:
          "A cozy luxury room with mountain-facing windows and warm interiors.",
        price: "27,000",
        image: "/images/villas/apt-single-room.jpg",
      },
      {
        tag: "APARTMENT",
        name: "Complete Apartment",
                href: "apartment-complete",
        description:
          "Two luxury bedrooms with a shared living area — perfect for families.",
        price: "60,000",
        image: "/images/villas/apt-complete-room.jpg",
      },
    ],
  },
  {
    title: "Rakaposhi Villa",
    subtitle:
      "Signature villa with executive suites and a full-villa option for groups who want the whole place to themselves.",
    rooms: [
      {
        tag: "EXECUTIVE",
        name: "Single Executive Room",
        href: "rakaposhi-single-executive",
        description:
          "Refined executive room with king bed and warm ambient lighting.",
        price: "16,500",
        image: "/images/villas/rak-single-room.jpg",
      },
      {
        tag: "SUITE",
        name: "Executive Suite",
          href: "rakaposhi-executive-suite",
        description:
          "Two rooms with a private TV lounge — space to gather and unwind.",
        price: "30,000",
        image: "/images/villas/rak-private-suite.jpg",
      },
      {
        tag: "WHOLE VILLA",
        name: "Complete Villa",
         href: "rakaposhi-complete-villa",
        description:
          "The entire Rakaposhi Villa — five executive rooms for your group.",
        price: "70,000",
        image: "/images/villas/rak-complete-villa.jpg",
      },
    ],
  },
  {
    title: "Himalaya Luxury Villas",
    subtitle:
      "Our flagship residences — from cozy attic escapes to full four-bedroom villas designed for celebrations.",
    rooms: [
      {
        tag: "COZY",
        name: "Attic Room",
           href: "luxury-attic",
        description:
          "A snug loft with sloped wooden ceilings and soft evening light.",
        price: "27,000",
        image: "/images/villas/lux-attic-villa.jpg",
      },
      {
        tag: "LUXURY",
            href: "luxury-single",
        name: "Single Luxury Room",
        description:
          "Marble accents, elegant lighting, and sweeping mountain views.",
        price: "27,000",
        image: "/images/villas/lux-single-villa.jpg",
      },
      {
        tag: "SUITE",
        name: "Luxury Suite (1 & 2)",
          href: "luxury-suite",
        description:
          "A bedroom paired with a private sitting area under a chandelier.",
        price: "50,000",
        image: "/images/villas/lux-suite-villa.jpg",
      },
      {
        tag: "WHOLE VILLA",
        name: "Complete Villa",
           href: "luxury-complete-villa",
        description:
          "Four bedrooms, private gardens, and mountain vistas — yours entirely.",
        price: "99,000",
        image: "/images/villas/lux-complete-villa.jpg",
      },
    ],
  },
];

function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(31,51,82,0.18)] transition hover:-translate-y-0.5">
      {/* Image with tag + title overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] font-medium tracking-[0.25em] text-white/85">
            {room.tag}
          </p>
          <h4 className="mt-1 font-serif text-2xl text-white leading-tight">
            {room.name}
          </h4>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-[#6b6357] leading-relaxed">
          {room.description}
        </p>

        <div className="mt-5 h-px w-full bg-[#ece5d3]" />

        <div className="mt-4 flex flex-col gap-3">
          {/* Price and View Detail row */}
          <div className="flex items-center justify-between">
            <p className="font-serif italic text-xl text-[#2b2b2b]">
              PKR {room.price}
            </p>
            <a
               href={`/villas/${room.href}`}
              className="rounded-md border border-[#ece5d3] bg-[#fdfaf3] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf] hover:border-[#c9a24a]"
            >
              View Detail
            </a>
          </div>

          {/* Book Now row */}
          <a
            href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-md border border-[#ece5d3] bg-[#fdfaf3] px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf] hover:border-[#c9a24a]"
          >
            Book Now
          </a>
        </div>
      </div>
    </article>
  );
}

export default function VillasAccommodations() {
  return (
    <section className="bg-[#e9e2d1] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 max-w-3xl mx-auto text-center">
  <p className="text-xs uppercase tracking-[0.3em] text-[#a07c1f] mb-3">
    Our Villas · Bhurban Murree
  </p>
  <h2 className="font-serif text-4xl sm:text-5xl text-[#2b2b2b] leading-tight">
    Rooms, suites & whole villas
  </h2>
  <p className="mt-4 text-[#6b6357] leading-relaxed">
    Three curated collections designed around how you like to stay — from a
    single luxury room to an entire villa for your group. Every rate is per
    night and includes complimentary breakfast for two guests per room.
  </p>
</div>

        {/* Collections */}
        <div className="space-y-16">
          {collections.map((c) => (
            <div key={c.title}>
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-4xl">
                  <h3 className="font-serif text-3xl text-[#2b2b2b] leading-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#6b6357] leading-relaxed">
                    {c.subtitle}
                  </p>
                </div>
                <div className="hidden sm:block h-px flex-1 bg-[#c9bfa6] mx-6" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#8a8071] shrink-0">
                  {c.rooms.length} options
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {c.rooms.map((room) => (
                  <RoomCard key={room.name} room={room} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-14 text-center text-sm text-[#8a8071] max-w-7xl mx-auto">
          * Max 3 persons per room with the option of 1 extra mattress (additional
          charges apply). Rates include complimentary breakfast for 2 guests per
          room. *
        </p>
      </div>
    </section>
  );
}