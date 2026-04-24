import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle2, Heart, MapPin, Sparkles, Users } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import EventsHeroSlider from "@/components/EventsHeroSlider";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Events & Experiences | Himalaya Villas",
  description:
    "Host weddings, corporate retreats, and social celebrations at Himalaya Villas with curated decor, premium hospitality, and mountain views.",
  path: "/events",
  keywords: [
    "events Himalaya Villas",
    "wedding venues Bhurban",
    "nikah venue Murree",
    "destination events Pakistan",
  ],
  ogImage: "/assets/event-hero-1.png",
});

const highlights = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Scenic mountain backdrop",
    text: "A private estate view that elevates every ceremony photo and video.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Flexible guest capacity",
    text: "From intimate gatherings to larger celebrations with smooth management.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Luxury decor execution",
    text: "Elegant floral setups, stage styling, lighting, and coordinated service.",
  },
];

const eventSections = [
  {
    id: 1,
    title: "WEDDINGS & CEREMONIES",
    cards: [
      {
        id: 1,
        title: "Nikah & Wedding Reception",
        description: "Complete setup from sacred ceremony to elegant reception.",
        badge: "Popular",
        href: "/weddings/nikah",
      },
      {
        id: 2,
        title: "Mehndi",
        description: "Colorful mehndi celebrations with music, dance, and floral stage design.",
        badge: "Culture",
        href: "/weddings/mehndi",
      },
      {
        id: 3,
        title: "Baraat",
        description: "Grand baraat entry and reception-style setup with premium event flow.",
        badge: "Grand",
        href: "/weddings/baraat",
      },
      {
        id: 37,
        title: "Dholki & Bridal Shower",
        description: "Intimate pre-wedding celebrations tailored to your family style.",
        badge: "Elegant",
        href: "/weddings/dholki",
      },
      {
        id: 4,
        title: "Valima & Wedding Dinner",
        description: "Refined dining and stage styling for post-nikah celebration.",
        badge: "Premium",
        href: "/weddings/valima",
      },
      {
        id: 5,
        title: "Engagement Ceremonies",
        description: "Ring ceremony with floral stage, lights, and guest hospitality.",
        badge: "Family",
        href: "/weddings/engagement",
      },
    ],
  },
  {
    id: 2,
    title: "MUSIC, CULTURE & ENTERTAINMENT",
    cards: [
      {
        id: 7,
        title: "Sufi & Qawwali Evenings",
        description: "Live spiritual music nights with warm traditional atmosphere.",
        badge: "Live",
        href: "/music/qawwali",
      },
      {
        id: 8,
        title: "Private Musical Concerts",
        description: "Exclusive classical and acoustic performances for private guests.",
        badge: "Featured",
        href: "/music/concert",
      },
      {
        id: 9,
        title: "Mushaira & Poetry Evenings",
        description: "Curated poetry gatherings in peaceful mountain ambiance.",
        badge: "Literary",
        href: "/music/poetry-evenings",
      },
      {
        id: 10,
        title: "DJ Nights & Music Parties",
        description: "Energetic dance nights with stage lighting and premium sound.",
        badge: "Party",
        href: "/music/dj-nights",
      },
      {
        id: 11,
        title: "Live Band Performances",
        description: "Modern or fusion live band options for high-energy events.",
        badge: "Concert",
        href: "/music/band-performances",
      },
      {
        id: 12,
        title: "Cultural Shows & Acts",
        description: "Traditional performances to enrich your celebration vibe.",
        badge: "Heritage",
        href: "/music/cultural-shows",
      },
    ],
  },
  {
    id: 3,
    title: "CORPORATE EVENTS",
    cards: [
      {
        id: 13,
        title: "Corporate Retreat Packages",
        description: "Strategic offsite planning with accommodation and activities.",
        badge: "Business",
        href: "/corporate/retreat",
      },
      {
        id: 14,
        title: "Product Launches & Brand Events",
        description: "Premium venue for memorable product unveilings and showcases.",
        badge: "Branding",
        href: "/corporate/product-launch",
      },
      {
        id: 15,
        title: "Award Dinners & Gala Nights",
        description: "Elegant formal evenings with stage, dining, and protocol flow.",
        badge: "Luxury",
        href: "/corporate/award-dinners",
      },
      {
        id: 16,
        title: "Conferences & Seminars",
        description: "Professional setup with presentation zones and hospitality.",
        badge: "MICE",
        href: "/corporate/conferences",
      },
      {
        id: 17,
        title: "Team Building Retreats",
        description: "Outdoor + indoor team activities for stronger collaboration.",
        badge: "Teams",
        href: "/corporate/team-building",
      },
      {
        id: 18,
        title: "Exhibitions & Trade Meets",
        description: "Structured event space with guided attendee movement.",
        badge: "Expo",
        href: "/corporate/exhibitions",
      },
    ],
  },
  {
    id: 4,
    title: "FAMILY & SOCIAL CELEBRATIONS",
    cards: [
      {
        id: 19,
        title: "Milestone Birthdays",
        description: "Theme-based birthday celebrations for all age groups.",
        badge: "Popular",
        href: "/events",
      },
      {
        id: 20,
        title: "Eid Gatherings & Family Reunions",
        description: "Large family experiences with full-villa coordination.",
        badge: "Festive",
        href: "/events",
      },
      {
        id: 21,
        title: "Baby Showers & Gender Reveal",
        description: "Soft floral themes and delightful family-focused arrangements.",
        badge: "Family",
        href: "/events",
      },
      {
        id: 22,
        title: "Graduation Parties",
        description: "Celebrate big achievements with stylish event staging.",
        badge: "Youth",
        href: "/events",
      },
      {
        id: 23,
        title: "Retirement Celebrations",
        description: "Dignified events for honoring long professional journeys.",
        badge: "Respect",
        href: "/events",
      },
      {
        id: 24,
        title: "Farewells & Send-offs",
        description: "Warm and memorable setups for meaningful goodbyes.",
        badge: "Moments",
        href: "/events",
      },
    ],
  },
  {
    id: 5,
    title: "EXPERIENCES & ACTIVITIES",
    cards: [
      {
        id: 25,
        title: "Bonfire & Stargazing Nights",
        description: "High-demand evening add-on for guests and families.",
        badge: "Signature",
        href: "/events",
      },
      {
        id: 26,
        title: "Guided Trails & Forest Walks",
        description: "Scenic nature experiences for groups and couples.",
        badge: "Nature",
        href: "/events",
      },
      {
        id: 27,
        title: "Private Chef & Dining Experiences",
        description: "Personalized dining themes and curated food journeys.",
        badge: "Dining",
        href: "/events",
      },
      {
        id: 28,
        title: "Adventure & Outdoor Activities",
        description: "Thrilling mountain activities designed for safe fun.",
        badge: "Adventure",
        href: "/events",
      },
      {
        id: 29,
        title: "Workshops & Creative Sessions",
        description: "Hands-on workshops for teams, families, and creators.",
        badge: "Creative",
        href: "/events",
      },
      {
        id: 30,
        title: "Photography & Content Packages",
        description: "Professional coverage for weddings and brand campaigns.",
        badge: "Media",
        href: "/events",
      },
    ],
  },
  {
    id: 6,
    title: "WELLNESS & RETREATS",
    cards: [
      {
        id: 31,
        title: "Yoga & Meditation Retreats",
        description: "Mindful sessions with serene mountain environments.",
        badge: "Wellness",
        href: "/events",
      },
      {
        id: 32,
        title: "Digital Detox Experiences",
        description: "Low-screen peaceful stays with curated routines.",
        badge: "Detox",
        href: "/events",
      },
      {
        id: 33,
        title: "Spa & Relaxation Escapes",
        description: "Rejuvenating body and mind with holistic comfort.",
        badge: "Relax",
        href: "/events",
      },
      {
        id: 34,
        title: "Health & Fitness Camps",
        description: "Active wellness programs with guided outdoor workouts.",
        badge: "Fitness",
        href: "/events",
      },
      {
        id: 35,
        title: "Holistic Healing Programs",
        description: "Balanced healing experiences for stress-free recovery.",
        badge: "Healing",
        href: "/events",
      },
      {
        id: 36,
        title: "Luxury Honeymoon Packages",
        description: "Private and romantic stays with premium amenities.",
        badge: "Romance",
        href: "/events",
      },
    ],
  },
];

const packages = [
  {
    title: "Nikah & Wedding Events",
    text: "Traditional and modern wedding ceremonies with full-stage decor and hospitality.",
    image: "/assets/event-hero-3.png",
    href: "/weddings/nikah",
  },
  {
    title: "Corporate Retreats",
    text: "Offsite planning for teams with meeting spaces, catering, and stay options.",
    image: "/assets/event-hero-4.png",
    href: "/events",
  },
  {
    title: "Social Celebrations",
    text: "Birthdays, anniversaries, and family events with curated themes and support.",
    image: "/assets/event-hero-2.png",
    href: "/events",
  },
];

const process = [
  "Share your date and guest count",
  "Get a tailored package and decor proposal",
  "Confirm booking and final checklist",
  "Enjoy a fully managed event day",
];

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Events and Experiences at Himalaya Villas",
  description: "Luxury destination events and wedding experiences in Bhurban",
  url: absoluteUrl("/events"),
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd items={[{ id: "hv-jsonld-events-page", data: eventsJsonLd }]} />

     {/* Hero Section - Left Aligned with Card Width */}
{/* Hero Section - Left aligned content with form on right */}
<section className="relative min-h-[780px] w-full overflow-hidden">
  <EventsHeroSlider alt="Luxury events at Himalaya Villas" priority />
  <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

  <Navbar />

  <div className="relative z-10 w-full px-4 md:px-8 lg:px-10 pt-36 pb-14 md:pt-40 md:pb-20">
    {/* Same max-w-7xl as your card sections */}
    <div className="mx-auto max-w-7xl">
      {/* Grid layout preserved - left content + right form */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 items-start">
        
        {/* Left side - Content aligned left within its column */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/90">
            <Heart className="h-4 w-4" />
            Curated Destination Events
          </p>

          <h1 className="mt-5 font-display text-white text-4xl md:text-6xl leading-tight">
            <span className="block">Events That Look Premium,</span>
            <span className="block">Feel Effortless</span>
          </h1>

          <p className="mt-5 max-w-xl text-white/90 text-sm md:text-base leading-relaxed">
            Plan your wedding, nikah, corporate retreat, or private celebration with end-to-end support in the heart of the Himalayas.
          </p>

          <div className="mt-8 flex gap-3">
            <a
              href="#inquiry"
              className="rounded-md bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-900 transition hover:bg-white/90"
            >
              Get Event Quote
            </a>
            <a
              href="#explore"
              className="rounded-md border border-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-neutral-900"
            >
              Explore Events
            </a>
          </div>
        </div>

        {/* Right side - Form (keeping original position) */}
        <div id="inquiry" className="w-full max-w-md rounded-2xl bg-white p-6 md:p-8 shadow-2xl lg:mr-0">
          <h2 className="font-display text-2xl text-neutral-900">Get Event Quote</h2>
          <p className="mt-2 text-sm text-neutral-600">Form ab clear aur visible hai - details share karein, team jaldi contact karegi.</p>

          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]" />
              <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]" />
            </div>

            <input type="email" placeholder="Email Address" className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="date" className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]" />
              <select className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]">
                <option value="">Select Event Type</option>
                <option value="nikah">Nikah / Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="social">Social Celebration</option>
              </select>
            </div>

            <textarea placeholder="Tell us your vision..." rows={4} className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]" />

            <button type="submit" className="w-full rounded-lg bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>



      <section className="bg-[#faf7f1] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8dfcf] bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-full bg-[#f4ecde] p-2 text-[#9a7b3a]">{item.icon}</div>
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Explore Our Event Categories</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">
              Yehi cards se aap direct relevant page par ja sakte hain.
            </p>
          </div>

          {eventSections.map((section) => (
            <div key={section.id} className="mb-12">
              <h3 className="mb-5 text-center text-sm md:text-base font-semibold tracking-[0.16em] text-neutral-800">{section.title}</h3>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                {section.cards.map((card, cardIndex) => (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="event-card group rounded-xl border border-neutral-200/90 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#d8c093] hover:shadow-[0_14px_34px_rgba(18,18,18,0.12)]"
                    style={{ animationDelay: `${cardIndex * 70}ms` }}
                  >
                    <span className="mb-3 inline-block rounded-full border border-[#d6e8d7] bg-gradient-to-r from-[#eef9ef] to-[#def5e1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#2e7d32] transition group-hover:scale-105">
                      {card.badge}
                    </span>
                    <h4 className="text-sm font-semibold text-neutral-900 leading-snug min-h-[34px] transition-colors duration-300 group-hover:text-[#7a5a1d]">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-neutral-600 min-h-[52px]">
                      {card.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#9a7b3a] transition-all duration-300 group-hover:gap-2 group-hover:text-[#6f531f]">
                      Learn More
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Featured Event Sections</h2>
            <p className="mt-3 text-sm md:text-base text-neutral-600">Aap ke liye 3 clear visible sections add kiye gaye hain.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.title} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-56 w-full">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900">{pkg.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{pkg.text}</p>
                  <Link href={pkg.href} className="mt-5 inline-block text-xs font-semibold uppercase tracking-wider text-[#9a7b3a] hover:text-[#6e5527]">
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-16 md:py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl">How We Plan Your Event</h2>
          <p className="mt-3 text-sm md:text-base text-white/80">Fast and simple process so your form submission turns into a confirmed event smoothly.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {process.map((step, idx) => (
              <div key={step} className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 p-4 text-left">
                <div className="rounded-full bg-white/15 p-2">
                  {idx === 0 ? <Calendar className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                </div>
                <p className="text-sm text-white/90">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
