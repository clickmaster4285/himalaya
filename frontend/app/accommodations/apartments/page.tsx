// app/accommodations/apartments/page.tsx
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

const PAGE_PATH = "/accommodations/apartments";
const META_TITLE = "Apartments in Murree, Bhurban | Himalya Villas and Resort";
const META_DESCRIPTION =
  "Book apartments in Murree at Himalya Villas and Resort, Bhurban. Check rates, amenities and availability, then reserve your stay.";

const baseMetadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: PAGE_PATH,
  keywords: [
    "Apartments in Murree",
    "Apartments in Bhurban",
    "Murree apartment booking",
    "Himalya Villas and Resort",
  ],
  ogImage: "/images/villas/complete-apt3.jpeg",
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

type Apartment = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  amenities: string[];
  view: string;
  rate: string;
};

const apartments: Apartment[] = [
  {
    slug: "apartment-single-luxury",
    name: "Single Luxury Room",
    image: "/images/villas/single-apt1.jpg",
    blurb:
      "Stay in a comfortable apartment in Bhurban, Murree, with the space and facilities needed for a relaxing short stay.",
    guests: "2 Adults (+1 extra mattress)",
    bedrooms: "1",
    beds: "1 King Bed",
    bathrooms: "1 Private (hot water)",
    amenities: [
      "Complimentary breakfast for 2",
      "Complimentary Wi-Fi",
      "24/7 room service",
      "Daily housekeeping",
      "Premium bedding & linens",
    ],
    view: "Mountain & pine forest",
    rate: "27,000",
  },
  {
    slug: "apartment-complete",
    name: "Complete Two-Bedroom Apartment",
    image: "/images/villas/complete-apt3.jpeg",
    blurb:
      "Stay in a comfortable apartment in Bhurban, Murree, with the space and facilities needed for a relaxing short stay.",
    guests: "4 Adults (+2 extra mattresses)",
    bedrooms: "2 + Shared Living Area",
    beds: "2 King Beds",
    bathrooms: "Private (hot water)",
    amenities: [
      "Complimentary breakfast",
      "Complimentary Wi-Fi",
      "24/7 room service",
      "Daily housekeeping",
      "Private shared living area",
    ],
    view: "Mountain views",
    rate: "60,000",
  },
];

const highlights = [
  { icon: MapPin, title: "Bhurban, Murree", text: "A peaceful mountain setting" },
  { icon: Home, title: "More Space", text: "Room for families & small groups" },
  { icon: ShieldCheck, title: "Privacy", text: "Your own self-contained stay" },
  { icon: CalendarCheck, title: "Short Stays", text: "Flexible nightly bookings" },
];

const faqs = [
  {
    question: "Where are Himalya Apartments located?",
    answer:
      "Himalya Apartments are located at Himalya Villas and Resort in Bhurban, Murree, Pakistan.",
  },
  {
    question: "Are the apartments available for short stays?",
    answer:
      "Yes. The apartments are offered as short-stay accommodation for guests visiting Bhurban and Murree, subject to availability for the selected travel dates.",
  },
  {
    question: "Are the apartments for sale?",
    answer:
      "No. The apartments on this page are offered for temporary guest accommodation and are not listed for property sale, investment or permanent ownership.",
  },
  {
    question: "Are the apartments suitable for families?",
    answer:
      "Yes, depending on the guest capacity, bedroom arrangement and facilities of the available apartment. Review the apartment details before booking for your family.",
  },
  {
    question: "Can couples stay in the apartments?",
    answer:
      "Yes. Couples can book an available apartment that suits their space and accommodation requirements.",
  },
  {
    question: "Can small groups book an apartment?",
    answer:
      "Yes. Small groups can stay in an apartment where the listed guest capacity and sleeping arrangements meet their requirements.",
  },
  {
    question: "What amenities are available in the apartments?",
    answer:
      "Amenities vary by apartment. Check the individual apartment details for the exact facilities and features included with your stay.",
  },
  {
    question: "How much does an apartment in Murree cost per night?",
    answer:
      "Nightly rates depend on the selected travel dates, season and availability. Check the current rate before confirming your reservation.",
  },
  {
    question: "How can I check apartment availability?",
    answer: "Check availability for your preferred travel dates before confirming your reservation.",
  },
  {
    question: "How do I book an apartment?",
    answer:
      "Review the apartment details, check the current rate and availability for your travel dates, and use the booking option to reserve your stay.",
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
      description: "Himalya Villas and Resort provides short-stay accommodation in Bhurban, Murree.",
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
      name: "Apartments in Murree at Himalya Villas and Resort",
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
        { "@type": "ListItem", position: 3, name: "Apartments", item: PAGE_URL },
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

export default function ApartmentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "apartments-schema", data: jsonLd }]} />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-150 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/villas/complete-apt.jpeg"
            alt="Apartment accommodation at Himalya Villas and Resort, Bhurban, Murree"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/70" />

        <div className="relative z-10 flex items-center justify-center min-h-150 px-6 py-24">
          <div className="text-center text-white max-w-4xl">
            {/* Breadcrumb */}
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
                <li className="text-[#c9a55b]" aria-current="page">Apartments</li>
              </ol>
            </nav>

            <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-px w-8 bg-[#c9a55b]" />
              <span>Himalya Apartments</span>
              <span className="h-px w-8 bg-[#c9a55b]" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
              Apartments in Murree at Himalya Villas and Resort
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Book a comfortable apartment in Murree at Himalya Villas and Resort, located in
              Bhurban and suitable for short stays with families, couples and small groups looking
              for more space, privacy and a peaceful mountain setting.
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

      {/* Our Apartments */}
      <section id="our-apartments" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 text-[#8b6914] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="h-px w-6 bg-[#8b6914]" />
              <span>Choose Your Apartment</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Our Apartments
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Choose apartment accommodation at Himalya Villas and Resort in Bhurban, Murree.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each available apartment displays the important details you need before booking,
              including guest capacity, bedrooms, bed configuration, amenities, views, nightly rate
              and availability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {apartments.map((apt) => {
              const specs = [
                { icon: Users, label: "Guests", value: apt.guests },
                { icon: DoorOpen, label: "Bedrooms", value: apt.bedrooms },
                { icon: BedDouble, label: "Beds", value: apt.beds },
                { icon: Bath, label: "Bathrooms", value: apt.bathrooms },
                { icon: Mountain, label: "View", value: apt.view },
              ];
              return (
                <article
                  key={apt.slug}
                  className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-64 md:h-72 bg-gray-100 overflow-hidden">
                    <Image
                      src={apt.image}
                      alt={`${apt.name} at Himalya Villas and Resort, Bhurban`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow">
                      From <span className="text-[#8b6914]">PKR {apt.rate}</span> / Night
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <h3 className="font-display text-2xl text-neutral-900 mb-3 group-hover:text-[#8b6914] transition-colors">
                      {apt.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{apt.blurb}</p>

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
                        {apt.amenities.map((a) => (
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
                          From <span className="font-display text-xl text-[#8b6914]">PKR {apt.rate}</span>{" "}
                          <span className="text-sm text-gray-500">/ Night</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/villas/${apt.slug}`}
                          className="inline-block px-5 py-2.5 border border-[#c9a55b] text-[#8b6914] text-xs font-semibold rounded-lg hover:bg-[#faf7f1] transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          href={bookHref(apt.slug)}
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
            Rates shown are starting nightly rates and may vary by travel dates, season and
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
              Common questions about staying in our apartments in Bhurban, Murree.
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
            src="/images/villas/complete-apt6.jpg"
            alt="Book your apartment stay in Bhurban, Murree"
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
            Book Your Apartment in Murree
          </h2>
          <p className="text-white/85 leading-relaxed mb-4 max-w-2xl mx-auto">
            Book your stay at Himalya Villas and Resort in Bhurban, Murree and enjoy comfortable
            apartment accommodation for your visit.
          </p>
          <p className="text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">
            Check the current rate and availability for your preferred travel dates, then reserve
            your stay.
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
