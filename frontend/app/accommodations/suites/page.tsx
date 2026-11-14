// app/accommodations/suites/page.tsx
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
  DoorOpen,
  Bath,
  Mountain,
  Sparkles,
  MapPin,
  ShieldCheck,
  Home,
  CalendarCheck,
} from "lucide-react";

const PAGE_PATH = "/accommodations/suites";
const META_TITLE = "Book Suites in Murree | Himalaya Villas and Resort";
const META_DESCRIPTION =
  "Book suites in Murree at Himalaya Villas and Resort, Bhurban. Explore available suites, check rates and availability, then reserve your short stay.";

const baseMetadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: PAGE_PATH,
  keywords: [
    "Suites in Murree",
    "Suites in Bhurban",
    "Murree suite booking",
    "Himalaya Villas and Resort",
  ],
  ogImage: "/images/villas/luxury-suite.jpg",
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

type Suite = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  detailsLine: string;
  guests: string;
  bedrooms?: string;
  bed: string;
  bathroom: string;
  livingSpace: string;
  amenities: string[];
  view: string;
  rate: string;
};

const SUITE_AMENITIES = [
  "Complimentary breakfast",
  "Complimentary Wi-Fi",
  "24/7 room service",
  "Daily housekeeping",
  "Premium bedding & linens",
];

const suites: Suite[] = [
  {
    slug: "luxury-suite",
    name: "Luxury Suite",
    image: "/images/villas/lux-suite1.jpg",
    blurb:
      "The Luxury Suite provides comfortable suite accommodation with additional space to relax during your stay at Himalaya Villas and Resort.",
    detailsLine:
      "Review the suite details to check its guest capacity, sleeping arrangement, facilities, current rate and availability for your travel dates.",
    guests: "2 Adults (+1 extra mattress)",
    bed: "1 King Bed",
    bathroom: "Private, with hot water",
    livingSpace: "Separate living area",
    amenities: SUITE_AMENITIES,
    view: "Panoramic mountain views",
    rate: "35,000",
  },
  {
    slug: "rakaposhi-executive-suite",
    name: "Rakaposhi Executive Suite",
    image: "/images/villas/rak-suite3.jpg",
    blurb:
      "The Rakaposhi Executive Suite offers comfortable accommodation with additional space for guests staying at Himalaya Villas and Resort.",
    detailsLine:
      "View the suite details to check its guest capacity, room arrangement, facilities, current nightly rate and availability before booking.",
    guests: "4 Adults (+2 extra mattresses)",
    bedrooms: "1 Bedroom + Living Area",
    bed: "1 King Bed + Sofa Bed",
    bathroom: "Private, with hot water",
    livingSpace: "Separate living area",
    amenities: SUITE_AMENITIES,
    view: "Mountain & pine forest views",
    rate: "45,000",
  },
];

const highlights = [
  { icon: MapPin, title: "Bhurban, Murree", text: "A peaceful mountain setting" },
  { icon: Home, title: "Extra Space", text: "Suites with room to relax" },
  { icon: ShieldCheck, title: "Privacy", text: "Your own self-contained stay" },
  { icon: CalendarCheck, title: "Short Stays", text: "Flexible nightly bookings" },
];

const faqs = [
  {
    question: "What is included in a suite?",
    answer:
      "Each suite has its own room layout, sleeping arrangement and facilities. Check the individual suite page for the exact space, amenities and features included with your stay.",
  },
  {
    question: "Are the suites available for short stays?",
    answer:
      "Yes. The suites at Himalaya Villas and Resort are offered as short-stay guest accommodation, subject to availability for your selected travel dates.",
  },
  {
    question: "Are the suites suitable for families?",
    answer:
      "Suitability depends on the guest capacity, sleeping arrangement and space available in the selected suite. Review the individual suite details before booking for your family.",
  },
  {
    question: "How many guests can stay in a suite?",
    answer:
      "Guest capacity varies by suite. Check the occupancy information on the individual suite page to make sure the accommodation is suitable for your group.",
  },
  {
    question: "Do the suites have separate living areas?",
    answer:
      "Suite layouts vary. Check the individual suite description and photos for details about the living and sleeping spaces included with your selected suite.",
  },
  {
    question: "What amenities are available in the suites?",
    answer:
      "Amenities vary by suite. Review the individual suite page for the exact facilities and features available during your stay.",
  },
  {
    question: "How much does a suite cost per night?",
    answer:
      "Nightly rates vary by suite, travel dates and availability. Check the current rate for your preferred suite before confirming your reservation.",
  },
  {
    question: "Do the suites have mountain views?",
    answer:
      "Views can vary by suite and its position within the property. Check the individual suite description and photos to confirm the view available with your selected accommodation.",
  },
  {
    question: "How can I check suite availability?",
    answer:
      "Choose your preferred suite and check availability for your travel dates before confirming your reservation.",
  },
  {
    question: "How do I book a suite at Himalaya Villas and Resort?",
    answer:
      "Select your preferred suite, review its details and current rate, check availability for your travel dates, and use the booking option to reserve your stay.",
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
      "@id": `${PAGE_URL}/#webpage`,
      url: `${PAGE_URL}/`,
      name: "Suites in Murree at Himalaya Villas and Resort",
      description: META_DESCRIPTION,
      isPartOf: { "@id": `${SITE}/accommodations#webpage` },
      about: { "@id": `${SITE}/#hotel` },
      mainEntity: { "@id": `${PAGE_URL}/#suites` },
      breadcrumb: { "@id": `${PAGE_URL}/#breadcrumb` },
      hasPart: { "@id": `${PAGE_URL}/#faq` },
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
      "@id": `${PAGE_URL}/#suites`,
      name: "Suites at Himalaya Villas and Resort",
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@id": `${SITE}/villas/luxury-suite#suite` },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@id": `${SITE}/villas/rakaposhi-executive-suite#suite` },
        },
      ],
    },
    {
      "@type": "Suite",
      "@id": `${SITE}/villas/luxury-suite#suite`,
      name: "Luxury Suite",
      url: `${SITE}/villas/luxury-suite`,
      containedInPlace: { "@id": `${SITE}/#hotel` },
    },
    {
      "@type": "Suite",
      "@id": `${SITE}/villas/rakaposhi-executive-suite#suite`,
      name: "Rakaposhi Executive Suite",
      url: `${SITE}/villas/rakaposhi-executive-suite`,
      containedInPlace: { "@id": `${SITE}/#hotel` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Accommodations",
          item: `${SITE}/accommodations`,
        },
        { "@type": "ListItem", position: 3, name: "Suites", item: `${PAGE_URL}/` },
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

const BOOK_HREF = "/book/stay";


export default function SuitesPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "suites-schema", data: jsonLd }]} />
      <Navbar />

      {/* Hero — full-bleed background, left-aligned content aligned to max-w-7xl */}
      <section className="relative min-h-[60vh] md:min-h-[68vh] lg:min-h-[72vh] overflow-hidden">
        {/* Background image — slow zoom */}
        <div className="absolute inset-0 animate-[heroZoom_18s_ease-out_forwards]">
          <Image
            src="/images/villas/rak-suite8.jpg"
            alt="Suite accommodation at Himalaya Villas and Resort, Bhurban, Murree"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Black overlay — kept on theme for text legibility */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24 min-h-[60vh] md:min-h-[68vh] lg:min-h-[72vh] flex items-center justify-start">
          <div className="text-left text-white max-w-4xl mr-auto w-full">
            {/* Eyebrow */}
            <div className="flex items-center justify-start gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6 animate-[fadeUp_0.7s_ease-out_both]">
              <span className="h-px w-8 bg-[#c9a55b]" />
              <span>Himalaya Suites</span>
              <span className="h-px w-8 bg-[#c9a55b]" />
            </div>

            {/* H1 */}
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6 animate-[fadeUp_0.8s_ease-out_0.1s_both]">
              Suites in Murree for Short Stays at Himalaya Villas and Resort
            </h1>

            {/* Paragraph 1 */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
              Stay in our spacious suites in Murree at Himalaya Villas and Resort, located in
              Bhurban and offering comfortable short-stay accommodation for couples, families and
              small groups.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base md:text-lg text-white/80 max-w-3xl mb-8 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
              Our suites provide additional space and privacy for a relaxing visit to the Murree
              Hills. Explore the available suites below, or discover more accommodation options at
              Himalaya Villas and Resort.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-[fadeUp_0.8s_ease-out_0.4s_both]">
              <Link
                href={BOOK_HREF}
                className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
              >
                Book Now
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

        {/* Keyframes scoped to the page */}
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

      {/* Highlights strip — soft fade in */}
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

      {/* Our Suites */}
      <section id="our-suites" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-[#8b6914] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="h-px w-6 bg-[#8b6914]" />
              <span>Choose Your Suite</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Suites
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Choose from our available suites at Himalaya Villas and Resort for your stay in
              Bhurban, Murree.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each suite offers its own layout and space, helping you choose accommodation that
              suits the number of guests and the type of stay you are planning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {suites.map((suite) => {
              const specs = [
                { icon: Users, label: "Guests", value: suite.guests },
                ...(suite.bedrooms
                  ? [{ icon: DoorOpen, label: "Bedrooms", value: suite.bedrooms }]
                  : []),
                { icon: BedDouble, label: "Bed", value: suite.bed },
                { icon: Bath, label: "Bathroom", value: suite.bathroom },
                { icon: Home, label: "Living Space", value: suite.livingSpace },
                { icon: Mountain, label: "View", value: suite.view },
              ];
              return (
                <article
                  key={suite.slug}
                  className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-64 md:h-72 bg-gray-100 overflow-hidden">
                    <Image
                      src={suite.image}
                      alt={`${suite.name} at Himalaya Villas and Resort, Bhurban`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow">
                      From <span className="text-[#8b6914]">PKR {suite.rate}</span> / Night
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <h3 className="font-display text-2xl text-neutral-900 mb-3 group-hover:text-[#8b6914] transition-colors">
                      {suite.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{suite.blurb}</p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                      {suite.detailsLine}
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
                        {suite.amenities.map((a) => (
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
                            PKR {suite.rate}
                          </span>{" "}
                          <span className="text-sm text-gray-500">/ Night</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/villas/${suite.slug}`}
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
            Rates shown are starting nightly rates and may vary by suite, travel dates, season and
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
              Common questions about staying in our suites in Bhurban, Murree.
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
            alt="Book your suite in Bhurban, Murree"
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
              Book Your Suite in Murree
            </h2>
            <p className="text-white/85 leading-relaxed mb-4">
              Book your suite at Himalaya Villas and Resort in Bhurban and enjoy comfortable
              short-stay accommodation during your visit to Murree.
            </p>
            <p className="text-white/85 leading-relaxed mb-8">
              Choose your preferred suite, check the current rate and availability, and reserve
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