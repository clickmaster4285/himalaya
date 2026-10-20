// app/accommodations/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import { BedDouble, Users, Maximize, Check } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Accommodation in Bhurban, Murree | Himalaya Villas",
  description:
    "Explore rooms, suites, apartments and private villas at Himalaya Villas and Resort Hotel. Compare accommodation options, check availability and book now!",
  path: "/accommodations",
  keywords: [
    "Luxury Accommodation Bhurban",
    "Murree Hotels",
    "Private Villas Murree",
    "Himalaya Villas",
  ],
  ogImage: "/assets/accommodations-hero.jpg",
  appendSiteBrand: false,
});

/* ------------------------------------------------------------------ */
/*  Content config — single source of truth for the collections        */
/* ------------------------------------------------------------------ */

type Accommodation = {
  name: string;
  blurb: string;
  image: string;
  beds?: string;
  guests?: string;
  size?: string;
  href: string;
};

type Collection = {
  id: string;
  name: string;
  intro: string;
  image: string;
  options: Accommodation[];
};

const collections: Collection[] = [
  {
    id: "himalaya-apartments",
    name: "Himalaya Apartments",
    intro:
      "Comfortable accommodation for individuals, couples, and families. Choose an individual luxury room or book the complete two-bedroom apartment when you need additional space.",
    image: "/images/villas/attic-room.jpg",
    options: [
      {
        name: "Single Luxury Room",
        blurb:
          "Relax in a comfortable room featuring warm interiors and mountain-facing windows. A suitable option for guests who prefer an individual room with essential comforts.",
         image: "/images/villas/lux-single-villa.jpg",
        beds: "1 King Bed",
        guests: "2 Guests",
        href: "/villas/apartment-single-luxury",
      },
      {
        name: "Complete Two-Bedroom Apartment",
        blurb:
          "Two bedrooms and a shared living area in one apartment — ideal for families and small groups who want to stay together with additional space.",
          image: "/images/villas/rak-suite4.jpg",
        
        beds: "2 Bedrooms",
        guests: "4–6 Guests",
        href: "/villas/apartment-complete",
      },
    ],
  },
  {
    id: "rakaposhi-villa",
    name: "Rakaposhi Villa",
    intro:
      "Executive rooms, spacious suites, and a complete villa booking option. Whether you're staying individually or travelling with a group, choose accommodation that matches your requirements.",
     image: "/images/villas/lux-suite-villa.jpg",
    options: [
      {
        name: "Single Executive Room",
        blurb:
          "A furnished executive room with a king-sized bed and comfortable interiors, offering a relaxing setting during your stay.",
         image: "/images/villas/rak-complete10.jpg",

        beds: "1 King Bed",
        guests: "2 Guests",
        href: "/villas/rakaposhi-single-executive",
      },
      {
        name: "Executive Suite",
        blurb:
          "A spacious executive suite featuring separate rooms and a private TV lounge, providing additional comfort and living space.",
        image: "/images/villas/rak-private-suite.jpg",
        beds: "1 Bedroom + Lounge",
        guests: "2–3 Guests",
        href: "/villas/rakaposhi-executive-suite",
      },
      {
        name: "Complete Rakaposhi Villa",
        blurb:
          "Book the complete five-room Rakaposhi Villa for your family or group. Multiple bedrooms and shared living areas make it a practical choice for private accommodation.",
        image: "/images/villas/rak-complete-villa.jpg",
        beds: "5 Bedrooms",
        guests: "10+ Guests",
        href: "/villas/rakaposhi-complete-villa",
      },
    ],
  },
  {
    id: "himalaya-luxury-villas",
    name: "Himalaya Luxury Villas",
    intro:
      "Elegant rooms, spacious suites, and complete villa accommodation. Choose an individual room or reserve an entire four-bedroom villa for a private stay with family or friends.",
    image: "/images/villas/lux-complete6.jpg",
    options: [
      {
        name: "Attic Room",
        blurb:
          "A cosy attic room featuring sloped wooden ceilings and warm interiors — a comfortable place to relax.",
         image: "/images/villas/lux-attic-villa.jpg",
        beds: "1 Bed",
        guests: "2 Guests",
        href: "/villas/luxury-attic",
      },
      {
        name: "Single Luxury Room",
        blurb:
          "A well-furnished luxury room featuring comfortable interiors and mountain views for a relaxing visit.",
        image: "/images/villas/lux-single.jpg",
        beds: "1 King Bed",
        guests: "2 Guests",
        href: "/villas/luxury-single",
      },
      {
        name: "Luxury Suite",
        blurb:
          "Additional space with a separate sitting area and comfortable bedroom accommodation.",
         image: "/images/villas/lux-suite1.jpg",
        beds: "1 Bedroom + Sitting Area",
        guests: "2–3 Guests",
        href: "/villas/luxury-suite",
      },
      {
        name: "Complete Four-Bedroom Villa",
        blurb:
          "A complete luxury villa with four bedrooms, shared living spaces, and outdoor areas — ideal for families and groups looking for additional privacy and space.",
       image: "/images/villas/complete-apt3.jpeg",
        beds: "4 Bedrooms",
        guests: "8–10 Guests",
        href: "/villas/luxury-complete-villa",
      },
    ],
  },
];

const bookingChecklist = [
  {
    title: "Guest Capacity",
    text: "Check the number of guests allowed in your selected accommodation.",
  },
  {
    title: "Room Features",
    text: "Review the available beds, living areas, and included facilities.",
  },
  {
    title: "Rates & Availability",
    text: "Confirm current accommodation prices and availability for your dates.",
  },
  {
    title: "Booking Conditions",
    text: "Review breakfast arrangements, additional charges, and reservation policies.",
  },
];

const faqs = [
  {
    question:
      "What types of accommodation are available at Himalaya Villas and Resort Hotel?",
    answer:
      "We offer luxury rooms, executive rooms, suites, a two-bedroom apartment, and complete private villas in Bhurban, Murree.",
  },
  {
    question: "Can I book an individual room instead of an entire villa?",
    answer:
      "Yes. You can book individual rooms and suites without reserving a complete villa, subject to availability.",
  },
  {
    question: "Do you offer private villas for families and groups?",
    answer:
      "Yes. Guests can book complete villas with multiple bedrooms and shared living areas for family and group stays.",
  },
  {
    question: "What is the difference between booking a room and a complete villa?",
    answer:
      "An individual room provides private bedroom accommodation, while a complete villa offers multiple bedrooms and shared spaces under one reservation.",
  },
  {
    question: "How can I check accommodation prices and availability?",
    answer:
      "Choose your preferred accommodation and contact our reservations team to confirm current rates and availability for your travel dates.",
  },
  {
    question: "How can I book accommodation at Himalaya Villas and Resort Hotel?",
    answer:
      "Select your preferred room, suite, apartment, or villa and share your travel dates and guest count with our team to arrange your reservation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccommodationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Accommodation at Himalaya Villas & Resorts",
    itemListElement: collections.flatMap((collection) =>
      collection.options.map((option, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: option.name,
        description: option.blurb,
        url: absoluteUrl(option.href),
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "accommodations", data: jsonLd }]} />
      <Navbar />

      {/* ----------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ----------------------------------------------------------- */}
      <section className="relative min-h-150 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/villas/lux-complete5.jpg"
            alt="Luxury accommodation at Himalaya Villas & Resorts, Bhurban"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex items-center justify-center min-h-150 px-6">
          <div className="text-center text-white max-w-4xl">
            <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-px w-8 bg-[#c9a55b]" />
              <span>Stay With Us</span>
              <span className="h-px w-8 bg-[#c9a55b]" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Luxury Accommodation in Bhurban, Murree
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Enjoy a comfortable stay at Himalaya Villas and Resort Hotel. Choose from luxury
              rooms, spacious suites, apartments, and private villas — whether travelling as a
              couple, with family, or in a group.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
              >
                Check Availability
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 border border-white/70 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Intro — "Our Accommodation Options"                         */}
      {/* ----------------------------------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-6">
              Our Accommodation Options
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Choose accommodation that suits your comfort, privacy, and space requirements. From
              individual rooms and suites to complete apartments and villas, we offer flexible
              options for different guest needs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Explore our three accommodation collections below.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Collections                                                 */}
      {/* ----------------------------------------------------------- */}
      {collections.map((collection, ci) => (
        <section
          key={collection.id}
          id={collection.id}
          className={`py-16 md:py-24 ${ci % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Collection header + image */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-[#8b6914] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  <span className="h-px w-6 bg-[#8b6914]" />
                  <span>Collection {String(ci + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
                  {collection.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">{collection.intro}</p>
                <div className="relative h-64 md:h-80 overflow-hidden rounded-3xl bg-gray-100">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Option cards */}
              <div className="lg:col-span-7 space-y-5">
                {collection.options.map((option) => (
                  <article
                    key={option.name}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
                      <div className="relative h-48 sm:h-full min-h-40 bg-gray-100">
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl text-neutral-900 mb-2 group-hover:text-[#c9a55b] transition-colors">
                          {option.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {option.blurb}
                        </p>

                        {(option.beds || option.guests || option.size) && (
                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 mb-5">
                            {option.beds && (
                              <span className="inline-flex items-center gap-1.5">
                                <BedDouble className="w-3.5 h-3.5 text-[#c9a55b]" />
                                {option.beds}
                              </span>
                            )}
                            {option.guests && (
                              <span className="inline-flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-[#c9a55b]" />
                                {option.guests}
                              </span>
                            )}
                            {option.size && (
                              <span className="inline-flex items-center gap-1.5">
                                <Maximize className="w-3.5 h-3.5 text-[#c9a55b]" />
                                {option.size}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={option.href}
                            className="inline-block px-4 py-2 bg-[#c9a55b] text-white text-xs font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
                          >
                            View Details
                          </Link>
                          <Link
                            href="/contact"
                            className="inline-block px-4 py-2 border border-[#c9a55b] text-[#8b6914] text-xs font-semibold rounded-lg hover:bg-[#faf7f1] transition-colors"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ----------------------------------------------------------- */}
      {/* Choose Between Individual Rooms and Complete Villas         */}
      {/* ----------------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-6">
              Choose Between Individual Rooms and Complete Villas
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Himalaya Villas and Resort Hotel, you do not have to book an entire villa to enjoy
              your stay. Choose an individual room or suite for a personal visit, or select a
              complete apartment or private villa when travelling with family or a larger group.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our accommodation options allow you to choose based on your guest count, preferred
              space, and booking requirements.
            </p>
            <Link
              href="#himalaya-apartments"
              className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
            >
              Explore Rooms &amp; Villas
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* What to Know Before Booking                                 */}
      {/* ----------------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              What to Know Before Booking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Before making your reservation, review the details of your preferred room, suite,
              apartment, or villa to ensure it meets your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingChecklist.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#c9a55b] flex items-center justify-center mb-4">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6914] mb-2">
                  Step {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-lg text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-gray-600">
            For further information,{" "}
            <Link
              href="/contact"
              className="font-medium text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors"
            >
              contact our reservations team
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ----------------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Common questions about staying at Himalaya Villas and Resort Hotel.
            </p>
          </div>

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

      {/* ----------------------------------------------------------- */}
      {/* Closing CTA                                                 */}
      {/* ----------------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-px w-8 bg-[#c9a55b]" />
            <span>Reserve Your Stay</span>
            <span className="h-px w-8 bg-[#c9a55b]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
            Book Your Stay at Himalaya Villas and Resort Hotel
          </h2>
          <p className="text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            Find accommodation that suits your travel plans, from individual rooms and suites to
            complete apartments and private villas. Our reservations team can help you check
            availability, compare options, and choose the right space for your stay in Bhurban,
            Murree.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#c9a55b] text-white text-sm font-semibold rounded-lg hover:bg-[#a98741] transition-colors"
            >
              Check Availability
            </Link>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-white/70 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}