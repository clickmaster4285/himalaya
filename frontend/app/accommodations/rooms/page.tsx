// app/accommodations/rooms/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import {
  BedDouble,
  Users,
  Bath,
  Mountain,
  Sparkles,
  MapPin,
  Heart,
  User,
  CalendarCheck,
} from "lucide-react";

const PAGE_PATH = "/accommodations/rooms";
const META_TITLE = "Rooms in Murree, Bhurban - Himalya Villas and Resort";
const META_DESCRIPTION =
  "Book rooms in Murree at Himalya Villas and Resort, Bhurban. Check room types, amenities, rates and availability, then reserve your stay.";

const baseMetadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: PAGE_PATH,
  keywords: [
    "Rooms in Murree",
    "Rooms in Bhurban",
    "Hotel rooms Murree",
    "Himalya Villas and Resort",
  ],
  ogImage: "/images/villas/lux-single.jpg",
  appendSiteBrand: false,
});

// Title is already branded — emit it exactly as written (no site suffix).
export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: META_TITLE },
};

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Room = {
  slug: string;
  name: string;
  collection: string;
  image: string;
  blurb: string;
  guests: string;
  bed: string;
  bathroom: string;
  amenities: string[];
  view: string;
  rate: string;
};

const BLURB_A =
  "Comfortable guest accommodation for your stay at Himalya Villas and Resort in Bhurban, Murree.";
const BLURB_B =
  "Stay in a comfortable hotel room in Murree with the space and facilities suited to your visit.";

const ROOM_AMENITIES = [
  "Complimentary breakfast for 2",
  "Complimentary Wi-Fi",
  "24/7 room service",
  "Daily housekeeping",
  "Premium bedding & linens",
];

const rooms: Room[] = [
  {
    slug: "rakaposhi-single-executive",
    name: "Single Executive Room",
    collection: "Rakaposhi Villa",
    image: "/images/villas/rak-single4.jpg",
    blurb: BLURB_A,
    guests: "2 Adults",
    bed: "1 King Bed",
    bathroom: "Private, with hot water",
    amenities: ROOM_AMENITIES,
    view: "Villa garden & mountains",
    rate: "16,500",
  },
  {
    slug: "luxury-single",
    name: "Single Luxury Room",
    collection: "Himalaya Luxury Villas",
    image: "/images/villas/lux-single.jpg",
    blurb: BLURB_B,
    guests: "2 Adults (+1 extra mattress)",
    bed: "1 King Bed",
    bathroom: "Private, with hot water",
    amenities: ROOM_AMENITIES,
    view: "Panoramic mountain",
    rate: "27,000",
  },
  {
    slug: "apartment-single-luxury",
    name: "Single Luxury Room",
    collection: "Himalaya Apartments",
    image: "/images/villas/single-apt1.jpg",
    blurb: BLURB_A,
    guests: "2 Adults (+1 extra mattress)",
    bed: "1 King Bed",
    bathroom: "Private, with hot water",
    amenities: ROOM_AMENITIES,
    view: "Mountain & pine forest",
    rate: "27,000",
  },
  {
    slug: "luxury-attic",
    name: "Attic Room",
    collection: "Himalaya Luxury Villas",
    image: "/images/villas/attic-room.jpg",
    blurb: BLURB_B,
    guests: "2 Adults",
    bed: "1 Queen Bed",
    bathroom: "Private, with hot water",
    amenities: ROOM_AMENITIES,
    view: "Dormer mountain view",
    rate: "27,000",
  },
];

const highlights = [
  { icon: MapPin, title: "Bhurban, Murree", text: "In the heart of the Murree Hills" },
  { icon: User, title: "Solo Travellers", text: "Comfortable individual rooms" },
  { icon: Heart, title: "Couples & Families", text: "Rooms for every kind of visit" },
  { icon: CalendarCheck, title: "Short Stays", text: "Flexible nightly bookings" },
];

const faqs = [
  {
    question: "Where are the rooms located?",
    answer: "The rooms are located at Himalya Villas and Resort in Bhurban, Murree, Pakistan.",
  },
  {
    question: "Are the rooms available for short stays?",
    answer:
      "Yes. Our rooms are offered as short-stay guest accommodation for visitors to Bhurban and Murree, subject to availability for your selected dates.",
  },
  {
    question: "What types of rooms are available?",
    answer:
      "Available room types are shown on this page. Each room listing includes its guest capacity, bed arrangement, amenities, rate and availability.",
  },
  {
    question: "Are rooms available for couples?",
    answer:
      "Yes. Couples can choose an available room that matches their guest and accommodation requirements, subject to the property's booking policies.",
  },
  {
    question: "Are rooms suitable for families?",
    answer:
      "Family suitability depends on the capacity, bedding and facilities of the selected room. Check the individual room details before booking.",
  },
  {
    question: "Can solo travellers book a room?",
    answer: "Yes. Solo travellers can book an available room that suits their stay requirements.",
  },
  {
    question: "What amenities are included with the rooms?",
    answer:
      "Amenities vary by room type. Check the individual room details for the exact facilities and features included with your stay.",
  },
  {
    question: "How much does a room in Murree cost per night?",
    answer:
      "Room rates depend on the selected room type, travel dates, season and availability. Check the current nightly rate before confirming your booking.",
  },
  {
    question: "How can I check room availability?",
    answer:
      "Choose your preferred room and check availability for your travel dates before confirming the reservation.",
  },
  {
    question: "How do I book a room at Himalya Villas and Resort?",
    answer:
      "Select your preferred room, review its details and current rate, check availability for your travel dates, and use the booking option to reserve your stay.",
  },
];

/* ------------------------------------------------------------------ */
/*  Structured data                                                    */
/* ------------------------------------------------------------------ */

const SITE = "https://himalayavillas.com";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Hotel",
      "@id": `${SITE}/#hotel`,
      name: "Himalya Villas and Resort",
      url: `${SITE}/`,
      description:
        "Himalya Villas and Resort provides short-stay hotel accommodation in Bhurban, Murree.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhurban",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: "Rooms in Murree at Himalya Villas and Resort",
      description: META_DESCRIPTION,
      isPartOf: { "@id": `${SITE}/accommodations/#webpage` },
      about: { "@id": `${SITE}/#hotel` },
      breadcrumb: { "@id": `${PAGE_URL}/#breadcrumb` },
      hasPart: { "@id": `${PAGE_URL}/#faq` },
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE}/accommodations/#webpage`,
      url: `${SITE}/accommodations`,
      name: "Accommodations at Himalya Villas and Resort",
      about: { "@id": `${SITE}/#hotel` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Accommodations", item: `${SITE}/accommodations` },
        { "@type": "ListItem", position: 3, name: "Rooms", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const bookHref = (slug?: string) => (slug ? `/book/stay?villa=${slug}` : "/book/stay");

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "rooms-schema", data: jsonLd }]} />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-150 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/villas/lux-single2.jpg"
            alt="Guest room at Himalya Villas and Resort, Bhurban, Murree"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/70" />

        <div className="relative z-10 flex items-center justify-center min-h-150 px-6 py-24">
          <div className="text-center text-white max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center justify-center gap-2 text-xs text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/accommodations" className="hover:text-white transition-colors">
                    Accommodations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#c9a55b]" aria-current="page">Rooms</li>
              </ol>
            </nav>

            <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-px w-8 bg-[#c9a55b]" />
              <span>Guest Rooms</span>
              <span className="h-px w-8 bg-[#c9a55b]" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
              Rooms in Murree at Himalya Villas and Resort
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Book a comfortable room in Murree at Himalya Villas and Resort, located in Bhurban and
              suitable for solo travellers, couples, families and guests looking for a comfortable
              short stay in the Murree Hills.
            </p>
            <Link
              href={bookHref()}
              className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 py-6 px-4 lg:px-8">
              <Icon className="w-6 h-6 text-[#c9a55b] shrink-0" />
              <div>
                <div className="text-white text-sm font-semibold">{title}</div>
                <div className="text-white/60 text-xs">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[#8b6914] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="h-px w-6 bg-[#8b6914]" />
              <span>Stay in Bhurban</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-6">
              Guest Rooms in Bhurban, Murree
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our guest rooms provide comfortable accommodation with room-specific space,
              facilities and views. Explore our wider{" "}
              <Link
                href="/accommodations"
                className="font-medium text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
              >
                accommodation options
              </Link>
              , or view the available rooms below to compare guest capacity, amenities, nightly
              rates and availability.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="#our-rooms"
                className="inline-block px-6 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
              >
                View Rooms
              </Link>
              <Link
                href={bookHref()}
                className="inline-block px-6 py-3 border border-[#c9a55b] text-[#8b6914] text-sm font-semibold rounded-lg hover:bg-[#faf7f1] transition-colors"
              >
                Check Availability
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/images/villas/rak-single2.jpg"
                alt="Executive room interior at Himalya Villas and Resort"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-gray-100 mt-10">
              <Image
                src="/images/villas/lux-single3.jpg"
                alt="Luxury room with mountain views in Bhurban, Murree"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Rooms */}
      <section id="our-rooms" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-[#8b6914] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="h-px w-6 bg-[#8b6914]" />
              <span>Choose Your Room</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">Our Rooms</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Choose from the available rooms at Himalya Villas and Resort.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each room listing provides the important information needed before booking, including
              room type, guest capacity, bed arrangement, amenities, view, nightly rate and
              availability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rooms.map((room) => {
              const specs = [
                { icon: Users, label: "Guests", value: room.guests },
                { icon: BedDouble, label: "Bed", value: room.bed },
                { icon: Bath, label: "Bathroom", value: room.bathroom },
                { icon: Mountain, label: "View", value: room.view },
              ];
              return (
                <article
                  key={room.slug}
                  className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-64 md:h-72 bg-gray-100 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={`${room.name}, ${room.collection} at Himalya Villas and Resort, Bhurban`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow">
                      From <span className="text-[#8b6914]">PKR {room.rate}</span> / Night
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6914] mb-2">
                      {room.collection}
                    </div>
                    <h3 className="font-display text-2xl text-neutral-900 mb-3 group-hover:text-[#8b6914] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{room.blurb}</p>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                      {specs.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                          <span className="w-8 h-8 rounded-full bg-[#faf7f1] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[#c9a55b]" />
                          </span>
                          <div>
                            <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                              {label}
                            </dt>
                            <dd className="text-sm text-neutral-900">{value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#c9a55b]" />
                        Key Amenities
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {room.amenities.map((a) => (
                          <li
                            key={a}
                            className="text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-full px-3 py-1"
                          >
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                          Rate
                        </div>
                        <div className="text-neutral-900">
                          From{" "}
                          <span className="font-display text-xl text-[#8b6914]">PKR {room.rate}</span>{" "}
                          <span className="text-sm text-gray-500">/ Night</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/villas/${room.slug}`}
                          className="inline-block px-5 py-2.5 border border-[#c9a55b] text-[#8b6914] text-xs font-semibold rounded-lg hover:bg-[#faf7f1] transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          href={bookHref(room.slug)}
                          className="inline-block px-5 py-2.5 bg-[#c9a55b] text-white text-xs font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-xs text-gray-500">
            Rates shown are starting nightly rates and may vary by room type, travel dates, season
            and availability.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Common questions about booking a room in Bhurban, Murree.
            </p>
          </div>

          <div className="max-w-4xl mx-auto divide-y divide-gray-100 border-y border-gray-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                  <h3 className="font-medium text-neutral-900 group-open:text-[#8b6914] transition-colors">
                    {faq.question}
                  </h3>
                  <span className="mt-0.5 shrink-0 text-[#c9a55b] transition-transform group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/villas/lux-single4.jpg"
            alt="Book your room in Bhurban, Murree"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-neutral-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-px w-8 bg-[#c9a55b]" />
            <span>Reserve Your Stay</span>
            <span className="h-px w-8 bg-[#c9a55b]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Book Your Room in Murree
          </h2>
          <p className="text-white/85 leading-relaxed mb-4 max-w-2xl mx-auto">
            Book your stay at Himalya Villas and Resort in Bhurban and choose the room that suits
            your visit to Murree.
          </p>
          <p className="text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">
            Check the room details, current nightly rate and availability, then reserve your stay
            for your preferred travel dates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={bookHref()}
              className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
            >
              Check Availability
            </Link>
            <Link
              href={bookHref()}
              className="inline-block px-8 py-3 border border-white/70 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
