// app/accommodations/page.tsx
// Content supplied by the SEO team (meta, H1, body copy, FAQ and schema).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { Users, LayoutGrid, Lock, Sparkles, CalendarCheck, ArrowRight } from "lucide-react";

const PAGE_PATH = "/accommodations";
const META_TITLE = "Accommodation in Murree | Himalaya Villas and Resort";
const META_DESCRIPTION =
  "Book accommodation in Murree at Himalaya Villas and Resort, Bhurban. Compare rooms, apartments, suites and villas, check availability and reserve your stay.";
const HERO_IMAGE = "/images/villas/lux-complete5.jpg";

const baseMetadata = createPageMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  path: PAGE_PATH,
  keywords: [
    "Accommodation in Murree",
    "Rooms in Murree",
    "Apartments in Murree",
    "Suites in Murree",
    "Villas in Murree",
    "Himalaya Villas and Resort",
  ],
  ogImage: HERO_IMAGE,
  appendSiteBrand: false,
});

// Title is already branded: emit it exactly as the SEO team wrote it (no site suffix).
export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: META_TITLE },
};

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type AccommodationType = {
  id: string;
  name: string;
  paragraphs: string[];
  cta: string;
  href: string;
  image: string;
  alt: string;
};

const accommodationTypes: AccommodationType[] = [
  {
    id: "rooms",
    name: "Rooms in Murree",
    paragraphs: [
      "Book a private room for a comfortable short stay at Himalaya Villas and Resort. Rooms are suitable for solo travellers, couples and smaller bookings that do not require the additional space of an apartment, suite or complete villa.",
      "View the available rooms to check guest capacity, bed arrangement, features, photos, rates and availability.",
    ],
    cta: "View Rooms",
    href: "/accommodations/rooms",
    image: "/images/villas/lux-single.jpg",
    alt: "Private room at Himalaya Villas and Resort, Murree",
  },
  {
    id: "apartments",
    name: "Apartments in Murree",
    paragraphs: [
      "Choose an apartment when you want additional space for a family or small group staying together.",
      "Compare the available apartment options by layout, guest capacity, features, photos, current rates and availability for your travel dates.",
    ],
    cta: "View Apartments",
    href: "/accommodations/apartments",
    image: "/images/villas/complete-apt3.jpeg",
    alt: "Apartment at Himalaya Villas and Resort, Murree",
  },
  {
    id: "suites",
    name: "Suites in Murree",
    paragraphs: [
      "Book a suite when you prefer more space than a standard room during your short stay in Murree.",
      "Depending on the suite, the accommodation may include additional sitting or living space. Review each available suite for its layout, guest capacity, features, photos, rates and availability.",
    ],
    cta: "View Suites",
    href: "/accommodations/suites",
    image: "/images/villas/lux-suite1.jpg",
    alt: "Suite with sitting area at Himalaya Villas and Resort, Murree",
  },
  {
    id: "villas",
    name: "Villas in Murree",
    paragraphs: [
      "Book a complete villa when your family or group wants more privacy and space to stay together.",
      "Complete villas provide multiple private and shared spaces under one booking, making them suitable for guests travelling together for a short stay in Murree.",
      "Check each villa for its layout, guest capacity, features, photos, current rates and availability.",
    ],
    cta: "View Villas",
    href: "/villas",
    image: "/images/villas/rak-complete-villa.jpg",
    alt: "Complete villa at Himalaya Villas and Resort, Murree",
  },
];

const comparisonRows = [
  {
    type: "Rooms",
    suitableFor: "Solo travellers, couples and smaller bookings",
    style: "Private room accommodation",
    stay: "Short stays",
  },
  {
    type: "Apartments",
    suitableFor: "Families and small groups",
    style: "Additional space for guests staying together",
    stay: "Short stays",
  },
  {
    type: "Suites",
    suitableFor: "Couples, families and guests wanting extra space",
    style: "Private suite with additional space depending on the layout",
    stay: "Short stays",
  },
  {
    type: "Villas",
    suitableFor: "Families and larger groups",
    style: "Complete villa with multiple private and shared spaces",
    stay: "Short stays",
  },
];

const choosingFactors = [
  {
    title: "Guest Capacity",
    text: "Check how many guests the accommodation can accommodate before making your reservation.",
    icon: Users,
  },
  {
    title: "Space and Layout",
    text: "Consider whether you need a private room, additional living space or a complete villa for everyone to stay together.",
    icon: LayoutGrid,
  },
  {
    title: "Privacy",
    text: "Rooms and suites provide individual accommodation, while apartments and complete villas can provide more space for families and groups.",
    icon: Lock,
  },
  {
    title: "Features and Amenities",
    text: "Review the individual accommodation page to confirm the features and amenities included with your selected option.",
    icon: Sparkles,
  },
  {
    title: "Rates and Availability",
    text: "Check the current rate and availability for your travel dates before confirming your booking.",
    icon: CalendarCheck,
  },
];

const faqs = [
  {
    question: "What types of accommodation are available at Himalaya Villas and Resort?",
    answer:
      "Himalaya Villas and Resort offers rooms, apartments, suites and complete villas for short stays in Bhurban, Murree. Each accommodation type differs in space, layout, guest capacity and level of privacy.",
  },
  {
    question: "Which accommodation is suitable for solo travellers?",
    answer:
      "Rooms are generally the most practical option for solo travellers looking for private accommodation for a short stay in Murree.",
  },
  {
    question: "Which accommodation is suitable for couples?",
    answer:
      "Couples can choose from available rooms or suites depending on their preferred space, layout and availability.",
  },
  {
    question: "Which accommodation is suitable for families?",
    answer:
      "Families can compare rooms, suites, apartments and complete villas depending on their number of guests and space requirements.",
  },
  {
    question: "Which accommodation is suitable for groups?",
    answer:
      "Small groups can consider apartments or suitable suites, while complete villas provide more space for larger groups wanting to stay together.",
  },
  {
    question: "Can I book a room or suite separately?",
    answer:
      "Yes. Available rooms and suites can be booked as individual accommodation options, subject to current availability.",
  },
  {
    question: "Are the rooms, apartments, suites and villas available for short stays?",
    answer:
      "Yes. The accommodation options listed on the website are available for short stays, subject to availability and applicable booking conditions.",
  },
  {
    question: "Where is Himalaya Villas and Resort located?",
    answer: "Himalaya Villas and Resort is located in Bhurban, Murree, Pakistan.",
  },
  {
    question: "How can I check current rates and availability?",
    answer:
      "Open your preferred room, apartment, suite or villa to review its current details, then check the rate and availability for your travel dates before booking.",
  },
];

/* ------------------------------------------------------------------ */
/*  Schema (as supplied by the SEO team; FAQ built from `faqs` above)  */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Resort",
      "@id": "https://himalayavillas.com/#resort",
      name: "Himalaya Villas and Resort",
      url: "https://himalayavillas.com/",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhurban",
        addressRegion: "Murree",
        addressCountry: "PK",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://himalayavillas.com/#website",
      url: "https://himalayavillas.com/",
      name: "Himalaya Villas and Resort",
      publisher: { "@id": "https://himalayavillas.com/#resort" },
      inLanguage: "en-GB",
    },
    {
      "@type": "CollectionPage",
      "@id": "https://himalayavillas.com/accommodations#webpage",
      url: "https://himalayavillas.com/accommodations",
      name: "Accommodation in Murree at Himalaya Villas and Resort",
      description: META_DESCRIPTION,
      isPartOf: { "@id": "https://himalayavillas.com/#website" },
      about: { "@id": "https://himalayavillas.com/#resort" },
      mainEntity: { "@id": "https://himalayavillas.com/accommodations#itemlist" },
      breadcrumb: { "@id": "https://himalayavillas.com/accommodations#breadcrumb" },
      inLanguage: "en-GB",
    },
    {
      "@type": "ItemList",
      "@id": "https://himalayavillas.com/accommodations#itemlist",
      name: "Accommodation Types at Himalaya Villas and Resort",
      numberOfItems: 4,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: [
        ["Rooms in Murree", "https://himalayavillas.com/accommodations/rooms/"],
        ["Apartments in Murree", "https://himalayavillas.com/accommodations/apartments/"],
        ["Suites in Murree", "https://himalayavillas.com/accommodations/suites/"],
        ["Villas in Murree", "https://himalayavillas.com/villas"],
      ].map(([name, url], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: { "@type": "CollectionPage", "@id": url, url, name },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://himalayavillas.com/accommodations#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://himalayavillas.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Accommodation",
          item: "https://himalayavillas.com/accommodations",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://himalayavillas.com/accommodations#faq",
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

const primaryButton =
  "inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors";
const outlineLightButton =
  "inline-block px-8 py-3 border border-white/70 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors";

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  const color = light ? "text-[#c9a55b]" : "text-[#8b6914]";
  const line = light ? "bg-[#c9a55b]" : "bg-[#8b6914]";
  return (
    <div className={`flex items-center justify-center gap-3 ${color} text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-5`}>
      <span className={`h-px w-8 ${line}`} />
      <span>{children}</span>
      <span className={`h-px w-8 ${line}`} />
    </div>
  );
}

export default function AccommodationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "accommodations-schema", data: jsonLd }]} />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-150 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Accommodation in Murree at Himalaya Villas and Resort, Bhurban"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex items-center justify-center min-h-150 px-6 py-24">
          <div className="text-center text-white max-w-4xl">
            <Eyebrow light>Bhurban, Murree</Eyebrow>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
              Accommodation in Murree at Himalaya Villas and Resort
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-4">
              Find comfortable accommodation in Murree at Himalaya Villas and Resort, located in
              Bhurban and offering short-stay options for solo travellers, couples, families and
              groups.
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Choose from rooms, apartments, suites and complete villas based on your number of
              guests, preferred space and privacy. Compare the available accommodation below, check
              current rates and availability, and book the option that best suits your stay.
            </p>
            <Link href="/contact" className={primaryButton}>
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Accommodation */}
      <section id="accommodation-types" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <Eyebrow>Stay With Us</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">
              Choose Your Accommodation in Murree
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accommodationTypes.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-60 md:h-72 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="font-display text-2xl text-neutral-900 mb-4">{item.name}</h3>
                  <div className="space-y-3 mb-6">
                    {item.paragraphs.map((text) => (
                      <p key={text} className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {text}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Our Accommodation Options */}
      <section className="py-16 md:py-24 bg-[#faf7f1] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>At a Glance</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">
              Compare Our <span className="text-[#c9a55b] italic">Accommodation</span> Options
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-xl border border-[#eadfce]">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-neutral-50 border-b border-[#eadfce]">
                  <th scope="col" className="p-5 font-semibold text-neutral-500 uppercase text-xs tracking-wider bg-[#c9a55b]/10">
                    Accommodation Type
                  </th>
                  <th scope="col" className="p-5 font-semibold text-neutral-500 uppercase text-xs tracking-wider">Suitable For</th>
                  <th scope="col" className="p-5 font-semibold text-neutral-500 uppercase text-xs tracking-wider">Accommodation Style</th>
                  <th scope="col" className="p-5 font-semibold text-neutral-500 uppercase text-xs tracking-wider">Stay Type</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {comparisonRows.map((row) => (
                  <tr
                    key={row.type}
                    className="align-top border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition"
                  >
                    <th scope="row" className="p-5 font-display text-lg font-semibold text-[#8b6914] bg-[#c9a55b]/5">
                      {row.type}
                    </th>
                    <td className="p-5 text-neutral-700">{row.suitableFor}</td>
                    <td className="p-5 text-neutral-600">{row.style}</td>
                    <td className="p-5">
                      <span className="inline-block whitespace-nowrap rounded-full bg-[#c9a55b]/10 px-3 py-1 text-xs font-semibold text-[#8b6914]">
                        {row.stay}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            The right accommodation depends on your number of guests, space requirements, preferred
            privacy and availability for your travel dates.
          </p>
        </div>
      </section>

      {/* How to Choose the Right Accommodation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              How to Choose the Right Accommodation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Before booking, compare the details of each room, apartment, suite or villa to find
              the option that suits your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {choosingFactors.map(({ title, text, icon: Icon }) => (
              <div key={title} className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-full bg-[#c9a55b] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-lg text-neutral-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Your Stay */}
      <section className="py-16 md:py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Eyebrow light>Reserve Your Stay</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Book Your Stay at Himalaya Villas and Resort
          </h2>
          <p className="text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto">
            Choose from our available rooms, apartments, suites and villas in Murree and find the
            accommodation that suits your guest numbers, space requirements and travel plans.
          </p>
          <p className="text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            Check current rates and availability for your preferred dates, then reserve your short
            stay at Himalaya Villas and Resort in Bhurban, Murree.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className={primaryButton}>
              Check Availability
            </Link>
            <Link href="/contact" className={outlineLightButton}>
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-neutral-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto divide-y divide-gray-100 border-y border-gray-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                  <span className="font-medium text-neutral-900 group-open:text-[#8b6914] transition-colors">
                    {faq.question}
                  </span>
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

      <Footer />
    </div>
  );
}
