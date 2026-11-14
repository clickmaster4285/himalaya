// app/villas/page.tsx
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
  Trees,
  Mountain,
  Sparkles,
  MapPin,
  ShieldCheck,
  Home,
  CalendarCheck,
} from "lucide-react";

const PAGE_PATH = "/villas";
const META_TITLE = "Book Villas in Murree | Himalaya Villas and Resort";
const META_DESCRIPTION =
  "Book villas in Murree at Himalaya Villas and Resort, Bhurban. Explore available villas, check nightly rates and availability, then reserve your stay.";

const baseMetadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: PAGE_PATH,
  keywords: [
    "Villas in Murree",
    "Villas in Bhurban",
    "Murree villa booking",
    "Himalaya Villas and Resort",
  ],
  ogImage: "/images/villas/lux-complete-villa.jpg",
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

type Villa = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  detailsLine: string;
  rooms: { label: string; value: string };
  guests: string;
  outdoor?: string;
  amenities: string[];
  view: string;
  rate: string;
};

const VILLA_AMENITIES = [
  "Complimentary breakfast",
  "Complimentary Wi-Fi",
  "24/7 room service",
  "Daily housekeeping",
  "Premium bedding & linens",
  "Private bathrooms with hot water",
];

const villas: Villa[] = [
  {
    slug: "rakaposhi-complete-villa",
    name: "Rakaposhi Villa",
    image: "/images/villas/rak-complete-villa.jpg",
    blurb:
      "Book the complete Rakaposhi Villa for a private stay with your family or group.",
    detailsLine:
      "The villa includes five executive rooms, giving guests the convenience of staying together within one complete accommodation.",
    rooms: { label: "Rooms", value: "5 Executive Rooms" },
    guests: "10 Adults (+5 extra mattresses)",
    amenities: VILLA_AMENITIES,
    view: "Mountain & pine forest views",
    rate: "70,000",
  },
  {
    slug: "luxury-complete-villa",
    name: "Himalaya Luxury Villa",
    image: "/images/villas/lux-complete-villa.jpg",
    blurb:
      "Stay in the complete Himalaya Luxury Villa and enjoy spacious private accommodation for your visit to Bhurban, Murree.",
    detailsLine:
      "With four bedrooms, private garden space and mountain surroundings, the villa provides a comfortable setting for guests who want to stay together while enjoying additional privacy.",
    rooms: { label: "Bedrooms", value: "4" },
    guests: "8 Adults (+4 extra mattresses)",
    outdoor: "Private Gardens",
    amenities: VILLA_AMENITIES,
    view: "Mountain Views",
    rate: "99,000",
  },
];

const highlights = [
  { icon: MapPin, title: "Bhurban, Murree", text: "A peaceful mountain setting" },
  { icon: Home, title: "Whole Villa", text: "Stay together in one place" },
  { icon: ShieldCheck, title: "Privacy", text: "Your own private accommodation" },
  { icon: CalendarCheck, title: "Short Stays", text: "Flexible nightly bookings" },
];

const faqs = [
  {
    question: "Are the villas available for short stays?",
    answer:
      "Yes. The villas at Himalaya Villas and Resort are offered as short-stay guest accommodation, subject to availability for your selected travel dates.",
  },
  {
    question: "Are these villas for sale?",
    answer:
      "No. The villas shown on this page are offered as guest accommodation for stays at Himalaya Villas and Resort and are not property-sale or ownership listings.",
  },
  {
    question: "Are the villas suitable for families and groups?",
    answer:
      "Villa suitability depends on your group size and the capacity of the selected property. Review the individual villa details before booking for your family or group.",
  },
  {
    question: "How many rooms are available in the villas?",
    answer:
      "The complete Rakaposhi Villa includes five executive rooms, while the Himalaya Luxury Villa includes four bedrooms. Check the individual villa page for sleeping arrangements and guest capacity.",
  },
  {
    question: "How much does a villa cost per night?",
    answer:
      "The Rakaposhi Villa is currently listed from PKR 70,000 per night, while the Himalaya Luxury Villa is listed from PKR 99,000 per night. Rates may vary according to travel dates and availability.",
  },
  {
    question: "Do the villas have mountain views?",
    answer:
      "Views vary by villa and its position within the property. The Himalaya Luxury Villa includes mountain-facing surroundings. Check the individual villa photos and details for the view available with your selected accommodation.",
  },
  {
    question: "How can I check villa availability?",
    answer:
      "Choose your preferred villa and check availability for your travel dates before confirming your reservation.",
  },
  {
    question: "How do I book a villa at Himalaya Villas and Resort?",
    answer:
      "Select your preferred villa, review its details and current nightly rate, check availability for your travel dates, and use the booking option to reserve your stay.",
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
      name: "Himalaya Villas and Resort",
      url: `${SITE}/`,
      description:
        "Himalaya Villas and Resort provides short-stay accommodation in Bhurban, Murree.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhurban",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Villas in Murree for Short Stays at Himalaya Villas and Resort",
      description: META_DESCRIPTION,
      isPartOf: { "@id": `${SITE}/accommodations#webpage` },
      about: { "@id": `${SITE}/#hotel` },
      mainEntity: { "@id": `${PAGE_URL}#villa-list` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      hasPart: { "@id": `${PAGE_URL}#faq` },
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE}/accommodations#webpage`,
      url: `${SITE}/accommodations`,
      name: "Accommodations at Himalaya Villas and Resort",
      about: { "@id": `${SITE}/#hotel` },
    },
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#villa-list`,
      name: "Villas at Himalaya Villas and Resort",
      numberOfItems: villas.length,
      itemListElement: villas.map((villa, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/villas/${villa.slug}`,
        name: villa.name,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Accommodations",
          item: `${SITE}/accommodations`,
        },
        { "@type": "ListItem", position: 3, name: "Villas", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
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

const BOOK_HREF = "/book/stay";

export default function VillasPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "villas-schema", data: jsonLd }]} />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[68vh] lg:min-h-[72vh] overflow-hidden">
        <div className="absolute inset-0 animate-[heroZoom_18s_ease-out_forwards]">
          <Image
            src="/images/villas/lux-complete6.jpg"
            alt="Villa accommodation at Himalaya Villas and Resort, Bhurban, Murree"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 min-h-[60vh] md:min-h-[68vh] lg:min-h-[72vh] flex items-center justify-start">
          <div className="text-left text-white max-w-4xl mr-auto w-full">
            <div className="flex items-center justify-start gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6 animate-[fadeUp_0.7s_ease-out_both]">
              <span className="h-px w-8 bg-[#c9a55b]" />
              <span>Himalaya Villas</span>
              <span className="h-px w-8 bg-[#c9a55b]" />
            </div>

            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6 animate-[fadeUp_0.8s_ease-out_0.1s_both]">
              Villas in Murree for Short Stays at Himalaya Villas and Resort
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
              Stay in our villas in Murree at Himalaya Villas and Resort, located in Bhurban and
              offering spacious short-stay accommodation for families, groups and guests who prefer
              more privacy during their visit.
            </p>

            <p className="text-base md:text-lg text-white/80 max-w-3xl mb-8 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
              Our villas give guests the space to stay together while enjoying their own private
              accommodation in the Murree Hills. Explore the available villas below, or discover
              more accommodation options at Himalaya Villas and Resort.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-[fadeUp_0.8s_ease-out_0.4s_both]">
              <Link
                href={BOOK_HREF}
                className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
              >
                Book Your Stay
              </Link>
              <Link
                href="/accommodations"
                className="inline-block px-8 py-3 border border-white/70 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore More Accommodations
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroZoom {
            from { transform: scale(1.06); }
            to   { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] { animation: none !important; }
          }
        `}</style>
      </section>

      {/* Highlights strip */}
      <section className="bg-neutral-900 animate-[fadeIn_0.9s_ease-out_0.5s_both]">
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

      {/* Our Villas */}
      <section id="our-villas" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-[#8b6914] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="h-px w-6 bg-[#8b6914]" />
              <span>Choose Your Villa</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Villas
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Choose from our available villas at Himalaya Villas and Resort in Bhurban, Murree.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each villa offers a different amount of space and room configuration, allowing
              families and groups to choose the accommodation that best suits their stay.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {villas.map((villa) => {
              const specs = [
                { icon: BedDouble, label: villa.rooms.label, value: villa.rooms.value },
                { icon: Users, label: "Guest Capacity", value: villa.guests },
                ...(villa.outdoor
                  ? [{ icon: Trees, label: "Outdoor Space", value: villa.outdoor }]
                  : []),
                { icon: Mountain, label: "View", value: villa.view },
                {
                  icon: CalendarCheck,
                  label: "Availability",
                  value: "Check for Your Travel Dates",
                },
              ];
              return (
                <article
                  key={villa.slug}
                  className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-64 md:h-72 bg-gray-100 overflow-hidden">
                    <Image
                      src={villa.image}
                      alt={`${villa.name} at Himalaya Villas and Resort, Bhurban`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow">
                      From <span className="text-[#8b6914]">PKR {villa.rate}</span> / Night
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <h3 className="font-display text-2xl text-neutral-900 mb-3 group-hover:text-[#8b6914] transition-colors">
                      {villa.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{villa.blurb}</p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      {villa.detailsLine}
                    </p>

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
                        {villa.amenities.map((a) => (
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
                          <span className="font-display text-xl text-[#8b6914]">
                            PKR {villa.rate}
                          </span>{" "}
                          <span className="text-sm text-gray-500">/ Night</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/villas/${villa.slug}`}
                          className="inline-block px-5 py-2.5 border border-[#c9a55b] text-[#8b6914] text-xs font-semibold rounded-lg hover:bg-[#faf7f1] transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          href={BOOK_HREF}
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
            Rates shown are starting nightly rates and may vary by villa, travel dates, season and
            availability.
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
              Common questions about staying in our villas in Bhurban, Murree.
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
            src="/images/villas/rak-complete3.jpg"
            alt="Book your villa in Bhurban, Murree"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-neutral-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-px w-8 bg-[#c9a55b]" />
              <span>Reserve Your Stay</span>
              <span className="h-px w-8 bg-[#c9a55b]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
              Book Your Villa in Murree at Himalaya Villas
            </h2>
            <p className="text-white/85 leading-relaxed mb-4">
              Book a private villa at Himalaya Villas and Resort in Bhurban and enjoy the space and
              privacy of staying together with your family or group.
            </p>
            <p className="text-white/85 leading-relaxed mb-8">
              Choose your preferred villa, check the current rate and availability, then reserve
              your stay for your selected travel dates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={BOOK_HREF}
                className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
              >
                Check Availability
              </Link>
              <Link
                href={BOOK_HREF}
                className="inline-block px-8 py-3 border border-white/70 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
