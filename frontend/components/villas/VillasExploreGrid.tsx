"use client";

import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppVillaBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen, trackClick } from "@/lib/trackedClick";

type VillaListing = {
  tag: string;
  name: string;
  href: string;
  description: string;
  highlight: string;
  details?: string;
  price: string;
  image: string;
};

const listings: VillaListing[] = [
  {
    tag: "CABIN",
    name: "Serene Valley Cabin",
    href: "serene-valley-cabin",
    description:
      "A serene cabin retreat with panoramic windows, a private terrace, and peaceful valley views.",
    highlight: "Floor-to-ceiling valley-facing windows",
    details: "Max 4 adults · 2 Queen/1 King · ~400 sq ft",
    price: "45,000",
    image: "/assets/villa-honeymoon-real.jpg",
  },
  {
    tag: "SUITE",
    name: "Sunset Suite",
    href: "sunset-suite",
    description:
      "A warm suite with sunset-facing windows, cozy interiors, and a calm mountain atmosphere.",
    highlight: "Golden sunset views from an intimate layout",
    details: "Max 2 adults · 1 King · ~360 sq ft",
    price: "49,000",
    image: "/assets/villa-penthouse.jpg",
  },
  {
    tag: "RETREAT",
    name: "Garden Villa Retreat",
    href: "garden-villa-retreat",
    description:
      "A spacious family-friendly villa with mountain views, a private garden, and room to breathe.",
    highlight: "3 bedrooms + private garden, ideal for groups",
    details: "Max 6 adults · 3 Bedrooms · ~700 sq ft",
    price: "39,000",
    image: "/assets/villa-alpine.jpg",
  },
  {
    tag: "PENTHOUSE",
    name: "Himalayan Penthouse",
    href: "himalayan-penthouse",
    description:
      "A luxe penthouse stay with a broad balcony, skyline views, and refined mountain comfort.",
    highlight: "Expansive balcony built for sunrise-to-sunset views",
    details: "Max 3 adults · 1 King + lounge · ~600 sq ft",
    price: "70,000",
    image: "/assets/villa-exterior.jpg",
  },
  {
    tag: "PRESIDENTIAL",
    name: "Presidential Suite",
    href: "presidential-suite",
    description:
      "The flagship suite with a private terrace, jacuzzi, and elevated mountain views.",
    highlight: "Private jacuzzi + terrace, our most luxurious suite",
    details: "Max 4 adults · 1 King + lounge · ~650 sq ft",
    price: "65,000",
    image: "/assets/villa-presidential-real.jpg",
  },
  {
    tag: "LODGE",
    name: "Alpine Family Lodge",
    href: "alpine-family-lodge",
    description:
      "A three-bedroom family lodge surrounded by cedar forests, mountain air, and open outdoor space.",
    highlight: "Cedar forest setting, built for multi-generational stays",
    details: "Max 6 adults · 3 Bedrooms · ~760 sq ft",
    price: "39,000",
    image: "/assets/villa-alpine-real.jpg",
  },
  {
    tag: "SUITE",
    name: "Luxury Suite (1 & 2)",
    href: "luxury-suite",
    description:
      "A bedroom paired with a private sitting area under a chandelier — elegant comfort for couples.",
    highlight: "Private sitting area, chandelier lighting",
    price: "50,000",
    image: "/images/villas/lux-suite-villa.jpg",
  },
  {
    tag: "LUXURY",
    name: "Single Luxury Room",
    href: "luxury-single",
    description:
      "Marble accents, elegant lighting, and sweeping mountain views in a refined single room.",
    highlight: "Marble interiors, best value entry point to the Luxury Villas collection",
    price: "27,000",
    image: "/images/villas/lux-single-villa.jpg",
  },
];

function VillaCard({ villa }: { villa: VillaListing }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(31,51,82,0.18)] transition hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={villa.image}
          alt={villa.name}
          width={1024}
          height={768}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] font-medium tracking-[0.25em] text-white/85">{villa.tag}</p>
          <h3 className="mt-1 font-serif text-2xl text-white leading-tight">{villa.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-[#6b6357] leading-relaxed">{villa.description}</p>
        <p className="mt-3 text-sm text-[#2b2b2b]">
          <span className="text-[#a07c1f]">✦</span> Highlight: {villa.highlight}
        </p>
        {villa.details ? (
          <p className="mt-1 text-xs text-[#8a8071]">
            <span className="text-[#a07c1f]">✦</span> {villa.details}
          </p>
        ) : null}

        <div className="mt-5 h-px w-full bg-[#ece5d3]" />

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-serif italic text-lg text-[#2b2b2b]">
              PKR {villa.price}/night
              <span className="block text-xs not-italic font-sans text-[#8a8071]">
                Includes breakfast for 2
              </span>
            </p>
            <Link
              href={`/villas/${villa.href}`}
              onClick={(e) =>
                trackClick(e, {
                  eventType: "villa_view_detail_click",
                  elementId: `view_detail_${villa.href}`,
                  metadata: { villa: villa.name, tag: villa.tag, price: villa.price, slug: villa.href },
                })
              }
              className="text-sm font-medium text-[#8b6914] underline underline-offset-4 shrink-0"
            >
              View Detail
            </Link>
          </div>

          <a
            href={buildWhatsAppVillaBookingUrl({
              name: villa.name,
              tag: villa.tag,
              price: villa.price,
              href: villa.href,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) =>
              trackAndOpen(
                e,
                buildWhatsAppVillaBookingUrl({
                  name: villa.name,
                  tag: villa.tag,
                  price: villa.price,
                  href: villa.href,
                }),
                { villa: villa.name, tag: villa.tag, price: villa.price, slug: villa.href, source: "villas_page" }
              )
            }
            className="w-full rounded-md border border-[#ece5d3] bg-[#fdfaf3] px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf] hover:border-[#c9a24a]"
          >
            Book Now
          </a>
        </div>
      </div>
    </article>
  );
}

export default function VillasExploreGrid() {
  return (
    <section id="explore-villas" className="bg-[#e9e2d1] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-[#2b2b2b] leading-tight">
            Explore Our Villas — Bhurban Murree
          </h2>
          <p className="mt-4 text-[#6b6357] leading-relaxed">
            Every villa and suite is designed around a different way to experience Bhurban — from a quiet
            couple&apos;s hideaway to a full family lodge. Compare the layouts, views, and rates below to find
            the stay that fits your trip.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((villa) => (
            <VillaCard key={villa.href} villa={villa} />
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-[#8a8071] max-w-3xl mx-auto">
          * Max 3 persons per room with the option of 1 extra mattress (additional charges apply). Rates
          include complimentary breakfast for 2 guests per room. *
        </p>
      </div>
    </section>
  );
}
