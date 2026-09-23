"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BedDouble,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  HelpCircle,
  MapPin,
  MessageCircle,
  Moon,
  Mountain,
  Sparkles,
  Star,
  Sun,
  Sunset,
  Trees,
  Users,
} from "lucide-react";

/* ============================================================
   SEO: Product/Offer structured data
   ============================================================ */
const villaFor4Schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Private Villa for 4 Guests in Bhurban - Himalaya Villas & Resorts",
  description:
    "Private villa for 4 guests in Bhurban Murree – 3 exclusive-use villas for couples & families from PKR 50,000/night with terrace & mountain views.",
  brand: {
    "@type": "Brand",
    name: "Himalaya Villas & Resorts",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "PKR",
    lowPrice: "50000",
    highPrice: "65000",
    offerCount: "3",
    availability: "https://schema.org/InStock",
    url: "https://himalayavillas.com/villa-for-4-guests-bhurban",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can 4 guests book the entire Himalaya Villas estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard villa booking gives your group exclusive use of that one villa and its outdoor space. If you want the whole estate — all 12 villas and shared outdoor areas — a full estate buyout can be arranged on direct enquiry. For a group of 4, this usually isn't necessary; a single villa already gives you full privacy.",
      },
    },
    {
      "@type": "Question",
      name: "What's the minimum stay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Outside peak periods, single-night stays are available, and 2-night stays are standard on weekends. During peak season — Eid and July–August weekends — a 2-night minimum may apply.",
      },
    },
    {
      "@type": "Question",
      name: "Is the villa private, or shared with other guests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fully private. All three 4-guest villas operate on exclusive-use terms, meaning no other guests share the villa or its outdoor spaces during your stay.",
      },
    },
    {
      "@type": "Question",
      name: "Which villa is best for two couples travelling together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Garden Villa Retreat, since its 3 bedrooms let each couple have a separate room rather than sharing one or two rooms between four people.",
      },
    },
    {
      "@type": "Question",
      name: "Does the villa include meals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — in-villa dining is available with pre-arranged menus for breakfast, dinner, and special occasions, coordinated ahead of arrival via WhatsApp concierge.",
      },
    },
  ],
};

/* ============================================================
   DATA — exact content
   ============================================================ */
const heroSlides = [
  "/assets/villa-hero.jpg",
  "/assets/villa-exterior.jpg",
  "/assets/gallery-balcony.jpg",
];

const introPills = [
  "3 Exclusive-Use Villas",
  "From PKR 50,000/Night",
  "47 km from Islamabad",
];

const villas = [
  {
    id: "penthouse",
    name: "Himalayan Penthouse",
    bestFor: "Best for Balcony and View",
    bedrooms: "2",
    rate: "PKR 60,000–65,000/night",
    image: "/assets/villa-penthouse.jpg",
    accent: Star,
    feature: "the largest private balcony on the estate",
    bestForText:
      "couples who want to spend most of their time outdoors, on the terrace, taking in the view",
    description:
      "If your group's priority is sitting outside with coffee in the morning and drinks at sunset, this is the villa built around that.",
  },
  {
    id: "sunset",
    name: "Sunset Suite",
    bestFor: "Best for Sunset Views",
    bedrooms: "1–2",
    rate: "PKR 50,000–55,000/night",
    image: "/assets/gallery-sunlight.jpg",
    accent: Sunset,
    feature: "west-facing windows that catch the full sunset",
    bestForText:
      "couples or small groups who specifically want the room orientation to work with the evening light",
    description:
      "This is the most budget-friendly of the three, and the one to pick if watching the sunset from inside the villa (not just the terrace) matters to you.",
  },
  {
    id: "garden",
    name: "Garden Villa Retreat",
    bestFor: "Best for Two Couples",
    bedrooms: "3",
    rate: "PKR 55,000–60,000/night",
    image: "/assets/gallery-garden.jpg",
    accent: Trees,
    feature: "private garden terrace with direct garden access",
    bestForText:
      "two couples who want separate bedrooms and don't want to share a room configuration",
    description:
      "With three bedrooms for four guests, this villa gives every couple their own space rather than everyone crowded into one or two rooms — the most practical option if privacy between couples matters.",
  },
];

const inclusions = [
  {
    title: "Full villa, exclusive use",
    text: "Every room and outdoor space belongs to your group only",
    icon: Moon,
  },
  {
    title: "Private terrace or garden",
    text: "No shared outdoor areas with other guests",
    icon: Sun,
  },
  {
    title: "In-villa dining",
    text: "Pre-arranged menus covering breakfast, dinner, and special-occasion meals",
    icon: Sparkles,
  },
  {
    title: "Pre-arrival WhatsApp concierge",
    text: "For planning activities, flagging dietary preferences, or arranging anything special before you arrive",
    icon: MessageCircle,
  },
  {
    title: "Flexible check-in/check-out",
    text: "For guests who book directly",
    icon: Clock,
  },
];

const itinerary = [
  {
    day: "Day 1 — Evening",
    title: "Arrival & Bonfire Dinner",
    text: "Arrive, settle in, bonfire dinner at the fire pit garden.",
    icon: Moon,
  },
  {
    day: "Day 2 — Morning",
    title: "Sunrise & Patriata Chairlift",
    text: "Sunrise from the private terrace, a short forest walk, then a 15-minute drive to Patriata Chairlift.",
    icon: Mountain,
  },
  {
    day: "Day 2 — Afternoon",
    title: "Nathia Gali or Villa Downtime",
    text: "Either a day trip to Nathia Gali or a relaxed afternoon on the villa terrace.",
    icon: Sun,
  },
  {
    day: "Day 2 — Evening",
    title: "Private Candlelit Dinner",
    text: "Private candlelit dinner on the terrace.",
    icon: Sparkles,
  },
  {
    day: "Day 3 — Morning",
    title: "Kashmir Point & Mall Road",
    text: "A 20-minute drive to Kashmir Point and Mall Road, then return for a late checkout.",
    icon: MapPin,
  },
];

const pricingTable = [
  { villa: "Sunset Suite", bedrooms: "1–2", rate: "PKR 50,000–55,000" },
  { villa: "Garden Villa Retreat", bedrooms: "3", rate: "PKR 55,000–60,000" },
  { villa: "Himalayan Penthouse", bedrooms: "2", rate: "PKR 60,000–65,000" },
];

const faqs = [
  {
    q: "Can 4 guests book the entire Himalaya Villas estate?",
    a: "A standard villa booking gives your group exclusive use of that one villa and its outdoor space. If you want the whole estate — all 12 villas and shared outdoor areas — a full estate buyout can be arranged on direct enquiry. For a group of 4, this usually isn't necessary; a single villa already gives you full privacy.",
  },
  {
    q: "What's the minimum stay?",
    a: "Outside peak periods, single-night stays are available, and 2-night stays are standard on weekends. During peak season — Eid and July–August weekends — a 2-night minimum may apply.",
  },
  {
    q: "Is the villa private, or shared with other guests?",
    a: "Fully private. All three 4-guest villas operate on exclusive-use terms, meaning no other guests share the villa or its outdoor spaces during your stay.",
  },
  {
    q: "Which villa is best for two couples travelling together?",
    a: "The Garden Villa Retreat, since its 3 bedrooms let each couple have a separate room rather than sharing one or two rooms between four people.",
  },
  {
    q: "Does the villa include meals?",
    a: "Yes — in-villa dining is available with pre-arranged menus for breakfast, dinner, and special occasions, coordinated ahead of arrival via WhatsApp concierge.",
  },
];

/* ============================================================
   WhatsApp
   ============================================================ */
const WHATSAPP_NUMBER = "923045679000";

function waUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ============================================================
   PAGE
   ============================================================ */
export default function VillaFor4GuestsBhurbanPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(villaFor4Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============================== NAVBAR ============================== */}
      <Navbar />

      {/* ============================== HERO ============================== */}
      <section className="relative min-h-[720px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, idx) => (
            <Image
              key={slide}
              src={slide}
              alt="Private villa for 4 guests in Bhurban at Himalaya Villas & Resorts"
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${
                idx === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-32 sm:pt-36 pb-16 sm:pb-20 md:pt-44">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
              <Users className="h-3.5 w-3.5 text-[#c9a55b]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">
                Villas for 4 Guests
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Best Villa for 4 Guests
              <br />
              in Bhurban
            </h1>
            <p className="mt-4 sm:mt-5 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
              Looking for a private villa in Bhurban that comfortably fits four
              people? Whether you&apos;re two couples travelling together, a
              small family, or a group of friends, Himalaya Villas &amp; Resorts
              has three villas built for exactly this group size — each with its
              own character, from panoramic balconies to sunset-facing rooms to
              a two-couple layout with separate bedrooms.
            </p>
            <p className="mt-3 max-w-2xl text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
              Every booking is exclusive. That means no shared hallways, no
              other guests in your villa, and no shared amenities with
              strangers. You get the whole space to yourselves.
            </p>

            <div className="mt-6 hidden sm:flex flex-wrap gap-2">
              {introPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={waUrl(
                  "Hello, I would like to check availability for a private villa for 4 guests at Himalaya Villas & Resorts, Bhurban."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c9a55b] px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Check Availability
              </a>
              <a
                href="#villas"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition"
              >
                <Mountain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Compare the 3 Villas
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============================== WHICH VILLA FITS 4 GUESTS ============================== */}
      <section id="villas" className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
              3 Options, 3 Characters
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">
              Which Villa Fits 4 Guests Best?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-3xl mx-auto">
              Not every &quot;villa for 4&quot; is the same layout. Here&apos;s
              how the three options actually differ, so you can match the villa
              to how your group wants to spend the trip.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {villas.map((villa) => {
              const Accent = villa.accent;
              return (
                <article
                  key={villa.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8dfcf] bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <Image
                      src={villa.image}
                      alt={`${villa.name} — private villa for 4 guests in Bhurban`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a55b] px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white">
                        <Accent className="h-3 w-3" />
                        {villa.bestFor}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">
                      {villa.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600">
                      <span className="inline-flex items-center gap-1.5">
                        <BedDouble className="h-3.5 w-3.5 text-[#c9a55b]" />
                        Bedrooms: {villa.bedrooms}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900">
                        {villa.rate}
                      </span>
                    </div>

                    <dl className="mt-4 space-y-2.5 text-xs sm:text-sm">
                      <div>
                        <dt className="font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] text-[#9a7b3a]">
                          Defining feature
                        </dt>
                        <dd className="mt-0.5 text-neutral-700">
                          {villa.feature}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] text-[#9a7b3a]">
                          Best for
                        </dt>
                        <dd className="mt-0.5 text-neutral-700">
                          {villa.bestForText}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {villa.description}
                    </p>

                    <div className="flex-1" aria-hidden="true" />

                    <a
                      href={waUrl(
                        `Hello, I would like to book the ${villa.name} (${villa.rate}) for 4 guests at Himalaya Villas & Resorts, Bhurban.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-900"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Reserve {villa.name}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== WHAT'S INCLUDED ============================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
              Every 4-Guest Booking
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">
              What&apos;s Included in a 4-Guest Booking
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
              Regardless of which villa you choose, every 4-guest booking
              includes:
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 sm:p-6 hover:shadow-md transition"
                >
                  <div className="mb-4 inline-flex rounded-full bg-[#c9a55b]/10 p-2.5 text-[#c9a55b]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}

            {/* CTA card filling the 6th grid slot */}
            <div className="rounded-2xl border border-[#c9a55b]/40 bg-[#0f172a] p-5 sm:p-6 text-white flex flex-col justify-center hover:shadow-md transition">
              <MessageCircle className="mb-3 h-6 w-6 text-[#c9a55b]" />
              <h3 className="text-base sm:text-lg font-semibold">
                Plan your 4-guest stay
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                Tell us your dates on WhatsApp and we&apos;ll confirm the best
                villa for your group.
              </p>
              <a
                href={waUrl(
                  "Hello, I would like to plan a 4-guest stay at Himalaya Villas & Resorts, Bhurban."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#c9a55b] px-4 py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== TYPICAL WEEKEND ITINERARY ============================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
              Two Nights, Perfectly Spent
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">
              A Typical 4-Guest Weekend
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-3xl mx-auto">
              If you&apos;re not sure how to structure a short trip, this is
              roughly how most 4-guest groups spend two nights at the villas.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            {itinerary.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.day}
                  className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0"
                >
                  {/* Timeline line */}
                  {idx < itinerary.length - 1 && (
                    <span
                      className="absolute left-[1.4rem] sm:left-[1.65rem] top-12 bottom-0 w-px bg-[#e8dfcf]"
                      aria-hidden="true"
                    />
                  )}
                  {/* Icon */}
                  <div className="relative z-10 inline-flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#e8dfcf] bg-white text-[#c9a55b] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-[#e8dfcf] bg-white p-4 sm:p-5 shadow-sm">
                    <span className="inline-block rounded-full bg-[#c9a55b]/10 px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#9a7b3a]">
                      {item.day}
                    </span>
                    <h3 className="mt-2 text-base sm:text-lg font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs sm:text-sm text-neutral-500">
            This works well because it mixes villa downtime with short,
            manageable drives — nothing that eats up a whole day of a short
            trip.
          </p>
        </div>
      </section>

      {/* ============================== PRICING TABLE ============================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#0f172a] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
              Transparent Rates
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mt-2">
              Villa Price for 4 Guests in Bhurban
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
              Rates for a 4-guest villa currently range from PKR 50,000 to
              65,000 per night, depending on which villa you pick:
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/15">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/5 text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b]">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                    Villa
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                    Bedrooms
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                    Rate/Night
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingTable.map((row) => (
                  <tr
                    key={row.villa}
                    className="border-t border-white/10 transition hover:bg-white/5"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium">
                      {row.villa}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-white/80">
                      {row.bedrooms}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-[#c9a55b]">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs sm:text-sm text-white/70">
            Direct bookings through Himalaya Villas get the best available rate
            and priority response — there&apos;s no OTA commission built into
            the price.
          </p>
        </div>
      </section>

      {/* ============================== LOCATION & DISTANCE ============================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2">
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl border border-[#e8dfcf]">
              <Image
                src="/assets/murree-valley-view.jpg"
                alt="Bhurban location in the Murree hills — view from Himalaya Villas & Resorts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
                Getting Here
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">
                Location and Distance
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                The estate sits in Bhurban, in the Murree hills, about 47 km and
                a 45-minute drive from Islamabad. From the villas, Patriata
                Chairlift is about 15 minutes away, and Kashmir Point / Mall
                Road is roughly 20 minutes by car — both easy half-day additions
                to a villa stay without needing to relocate.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Car, label: "Islamabad", value: "47 km · 45 min" },
                  { icon: Mountain, label: "Patriata Chairlift", value: "15 min" },
                  { icon: MapPin, label: "Kashmir Point / Mall Road", value: "20 min" },
                ].map((d) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={d.label}
                      className="rounded-xl border border-[#e8dfcf] bg-[#fefcf8] p-4"
                    >
                      <Icon className="h-5 w-5 text-[#c9a55b]" />
                      <p className="mt-2 text-sm font-semibold text-neutral-900">
                        {d.value}
                      </p>
                      <p className="text-xs text-neutral-500">{d.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FAQS ============================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
              Good to Know
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">
              FAQs
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={f.q}
                  className="rounded-2xl border border-[#e8dfcf] bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#c9a55b]" />
                      <span className="text-sm sm:text-base font-semibold text-neutral-900">
                        {f.q}
                      </span>
                    </span>
                    <span
                      className={`flex-shrink-0 text-lg text-[#c9a55b] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 sm:pl-14 text-xs sm:text-sm leading-relaxed text-neutral-600">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== BOOKING / CTA ============================== */}
      <section id="book" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 md:p-10 shadow-sm">
            <div className="mb-6 sm:mb-8 text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">
                Exclusive Use, Guaranteed
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-2">
                Reserve Your Villa for 4
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
                Check availability for your preferred dates — direct bookings
                get the best rate and priority response.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={waUrl(
                  "Hello, I would like to reserve a private villa for 4 guests at Himalaya Villas & Resorts, Bhurban. Please share availability and rates."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c9a55b] px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741]"
              >
                <MessageCircle className="h-4 w-4" />
                Reserve on WhatsApp
              </a>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-900 bg-transparent px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                <Calendar className="h-4 w-4" />
                Book Online
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 text-center">
              {[
                "No shared spaces with strangers",
                "Best rate on direct booking",
                "WhatsApp concierge before arrival",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-[11px] sm:text-xs text-neutral-600 border border-gray-200"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#c9a55b]" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ============================================================
   NAVBAR — dark theme for this page
   ============================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Villas", href: "/villas" },
    { label: "Experience", href: "/experience" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        scrolled ? "py-2 bg-black/90 backdrop-blur-md shadow-lg" : "py-4 bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center flex-shrink-0">
        <Image
          src="/assets/himalaya-logo.png"
          alt="Himalaya Villas & Resorts"
          width={160}
          height={160}
          priority
          className={`object-contain transition-all duration-500 ${
            scrolled ? "h-8 w-8" : "h-10 w-10"
          }`}
        />
      </Link>

      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="nav-link text-sm xl:text-base whitespace-nowrap text-white transition-opacity hover:opacity-80"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <a
        href={waUrl(
          "Hello, I would like to book a private villa for 4 guests at Himalaya Villas & Resorts, Bhurban."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-3 sm:px-5 py-1.5 sm:py-2 text-[9px] sm:text-xs font-medium tracking-wider uppercase bg-[#c9a55b] text-white hover:bg-[#a98741] transition-all duration-300 whitespace-nowrap rounded-sm"
      >
        Book Now
      </a>
    </nav>
  );
}

/* ============================================================
   FOOTER — compact, consistent with site design
   ============================================================ */
function Footer() {
  return (
    <footer
      className="relative py-12 md:py-14 px-6 md:px-12 overflow-hidden"
      style={{ background: "hsl(160 15% 14%)" }}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-block font-display font-bold text-[13px] md:text-[14px] tracking-[0.15em] uppercase mb-4 hover:opacity-90"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Himalaya Villas &amp; Resorts
            </Link>
            <p
              className="max-w-[360px] text-sm leading-6"
              style={{ color: "hsl(0 0% 100% / 0.5)" }}
            >
              A sanctuary of luxury nestled in the Himalayas. Private villas,
              panoramic views, and warm hospitality in the heart of Bhurban.
            </p>
          </div>

          <div>
            <h4
              className="text-[11px] tracking-[0.25em] uppercase mb-5 font-semibold"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Our Villas", href: "/villas" },
                { label: "Experiences", href: "/experience" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "hsl(0 0% 100% / 0.55)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-[11px] tracking-[0.25em] uppercase mb-5 font-semibold"
              style={{ color: "hsl(36 45% 55%)" }}
            >
              Legal
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "hsl(0 0% 100% / 0.55)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid hsl(0 0% 100% / 0.1)" }}
        >
          <p className="text-xs" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
            Himalaya Villas &amp; Resorts 2026. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
            Bhurban, Murree — 47 km from Islamabad
          </p>
        </div>
      </div>
    </footer>
  );
}
