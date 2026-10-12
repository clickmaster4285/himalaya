"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getVillaCatalogCollections } from "@/lib/villa-catalog";
import { buildWhatsAppVillaBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen, trackClick } from "@/lib/trackedClick";

type Room = {
  tag: string;
  href: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

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
              onClick={(e) =>
                trackClick(e, {
                  eventType: "villa_view_detail_click",
                  elementId: `view_detail_${room.href}`,
                  metadata: {
                    villa: room.name,
                    tag: room.tag,
                    price: room.price,
                    slug: room.href,
                  },
                })
              }
            >
              View Detail
            </a>
          </div>

          {/* Book Now row */}
          <a
            onClick={(e) =>
              trackAndOpen(
                e,
                buildWhatsAppVillaBookingUrl({
                  name: room.name,
                  tag: room.tag,
                  price: room.price,
                  href: room.href,
                }),
                {
                  villa: room.name,
                  tag: room.tag,
                  price: room.price,
                  slug: room.href,
                  source: "villa_card",
                }
              )
            }
            href={buildWhatsAppVillaBookingUrl({
              name: room.name,
              tag: room.tag,
              price: room.price,
              href: room.href,
            })}
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

/** Maps a catalog category to the display collection it belongs to. */
function collectionForCategory(category: string): string {
  switch (category) {
    case "Apartment":
      return "Himalaya Apartments";
    case "Complete Villa":
      return "Himalaya Private Villas";
    case "Suite":
    default:
      return "Himalaya Rooms & Suites";
  }
}

const COLLECTION_ORDER = [
  "Himalaya Rooms & Suites",
  "Himalaya Apartments",
  "Himalaya Private Villas",
] as const;

const COLLECTION_SUBTITLES: Record<string, string> = {
  "Himalaya Rooms & Suites":
    "Relax in our furnished luxury rooms and executive suites, offering comfortable bedrooms and additional living areas in selected suites. These options are suitable for individual guests, couples, and small families looking for a comfortable hotel stay.",
  "Himalaya Apartments":
    "Enjoy additional comfort and space with our apartment accommodation. Himalaya Apartments offers a complete two-bedroom apartment with separate bedrooms and a shared living area.",
  "Himalaya Private Villas":
    "Enjoy greater privacy with complete villa bookings for families and groups. Choose from Rakaposhi Villa or Himalaya Luxury Villas, with multiple bedrooms and shared living spaces that allow everyone to stay together.",
};

export default function VillasAccommodations({
  hideViewAllLink = false,
}: {
  hideViewAllLink?: boolean;
}) {
  // Group listings by their display collection based on category.
  const grouped = new Map<string, Room[]>();

  for (const collection of getVillaCatalogCollections()) {
    for (const room of collection.rooms) {
      const targetCollection = collectionForCategory(room.category);
      const entry: Room = {
        tag: room.tag,
        href: room.slug,
        name: room.name,
        description: room.description,
        price: room.price,
        image: room.image,
      };

      if (!grouped.has(targetCollection)) {
        grouped.set(targetCollection, []);
      }
      grouped.get(targetCollection)!.push(entry);
    }
  }

  // Build final collection list in the desired order, skipping empty ones.
  const collections = COLLECTION_ORDER.map((title) => ({
    title,
    subtitle: COLLECTION_SUBTITLES[title],
    rooms: grouped.get(title) ?? [],
  })).filter((c) => c.rooms.length > 0);

  return (
    <section
      id="villas-accommodations"
      className="bg-[#e9e2d1] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a07c1f] mb-3">
            Accommodation · Bhurban Murree
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#2b2b2b] leading-tight">
            Our Accommodation
          </h2>
          <p className="mt-4 text-[#6b6357] leading-relaxed">
            Explore our collection of comfortable rooms, spacious suites,
            apartments, and private villas. Whether you prefer an individual
            room, additional living space, or an entire villa for your group,
            find the right accommodation for your stay.
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

        {/* Budget note */}
        {/* <p className="mt-14 text-center text-sm text-[#6b6357] leading-relaxed max-w-3xl mx-auto">
          If you&apos;re comparing cheap hotels in Murree, Pakistan against a
          full luxury stay, our Rakaposhi Executive Room at PKR 16,500/night is
          one of the most accessible low price hotel in Murree options that
          still gives you a genuine 5-star setting—private terrace, mountain
          views, and breakfast included, without the noise of a standard
          commercial hotel.
        </p> */}

        {!hideViewAllLink ? (
          <div className="mt-8 text-center">
            <Link
              href="/villas"
              className="inline-flex items-center gap-2 rounded-md border border-[#c9a24a] bg-[#fdfaf3] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf]"
            >
              View All Villas &amp; Room Rates
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ) : null}

        {/* Footnote */}
        {/* <p className="mt-14 text-center text-sm text-[#8a8071] max-w-7xl mx-auto">
          * Max 3 persons per room with the option of 1 extra mattress
          (additional charges apply). Rates include complimentary breakfast for
          2 guests per room. *
        </p> */}
      </div>
    </section>
  );
}