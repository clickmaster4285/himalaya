import Image from "next/image";
import Link from "next/link";
import { Flower2, Heart, MapPin, Sparkles, Users, UtensilsCrossed } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventQuoteForm from "@/components/EventQuoteForm";
import EventFAQs from "@/components/EventFAQs";

export type NikahEventData = {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  category: string;
  faqs: Array<{ question: string; answer: string }>;
};

export type RelatedNikahEvent = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const highlights = [
  { icon: MapPin, label: "Bhurban Hills", text: "Private lawns with misty mountain views" },
  { icon: Users, label: "Up to 500 guests", text: "Intimate nikah or grand outdoor reception" },
  { icon: Sparkles, label: "Full styling", text: "Floral arches, crystal drapes, gold seating" },
];

const galleryImages = [
  {
    src: "/assets/nikah-hero-night.png",
    alt: "Night nikah stage with floral arch and crystal curtain",
    title: "Evening Stage",
    subtitle: "Crystal drape & gold seating",
    className: "md:col-span-2 md:row-span-2 md:min-h-[520px] min-h-[280px]",
  },
  {
    src: "/assets/nikah-aerial-lawn.png",
    alt: "Aerial view of nikah lawn with fountain and mountain backdrop at dusk",
    title: "Venue Overview",
    subtitle: "Fountain, lawn & terrace views",
    className: "md:col-span-1 md:row-span-1 min-h-[240px]",
  },
  {
    src: "/assets/nikah-ceremony-setup.png",
    alt: "Daytime nikah ceremony setup with guest chairs and floral arch",
    title: "Ceremony Setup",
    subtitle: "Cross-back chairs on the lawn",
    className: "md:col-span-1 md:row-span-1 min-h-[240px]",
  },
  {
    src: "/assets/nikah-stage-close.png",
    alt: "Close-up of tufted gold sofa and floral arch with mountain view",
    title: "Stage Detail",
    subtitle: "Premium floral arch styling",
    className: "md:col-span-1 md:row-span-2 min-h-[320px]",
  },
  {
    src: "/assets/nikah-lawn.png",
    alt: "Guest seating arrangement facing the nikah stage",
    title: "Guest Seating",
    subtitle: "Lantern-lit lawn layout",
    className: "md:col-span-1 md:row-span-1 min-h-[240px]",
  },
  {
    src: "/assets/nikah-catering.png",
    alt: "Wedding dessert and catering display with gold accents",
    title: "Dessert Display",
    subtitle: "Gold platters & candlelight",
    className: "md:col-span-1 md:row-span-1 min-h-[240px]",
  },
  {
    src: "/assets/nikah-buffet.png",
    alt: "Traditional wedding buffet with desserts and warm evening lighting",
    title: "Reception Buffet",
    subtitle: "Curated dining spread",
    className: "md:col-span-2 md:row-span-1 min-h-[260px]",
  },
];

export default function NikahWeddingPage({
  event,
  related,
}: {
  event: NikahEventData;
  related: RelatedNikahEvent[];
}) {
  return (
    <div className="min-h-screen bg-[#faf7f1] text-neutral-900">
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src="/assets/nikah-hero-night.png"
          alt="Night nikah stage with peach floral arch, crystal curtain, and gold seating at Himalaya Villas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <Navbar />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-36 md:pb-24 md:pt-44">
          <p className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95 backdrop-blur-sm">
            <Heart className="h-3.5 w-3.5 text-[#c9a55b]" />
            {event.category}
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.08] text-white md:text-6xl lg:text-7xl">
            Nikah & Wedding
            <br />
            Reception
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            A sacred ceremony and an elegant mountain reception — floral arches, vintage gold seating, and
            hospitality styled for unforgettable family photographs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#inquiry"
              className="rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#b08d45]"
            >
              Request a Quote
            </a>
            <a
              href="#gallery"
              className="rounded-md border border-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-neutral-900"
            >
              View Gallery
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eadfcd] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3 md:py-12">
          {highlights.map((item) => (
            <div key={item.label} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4ecde] text-[#9a7b3a]">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{item.label}</p>
                <p className="mt-1 text-sm text-neutral-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="the-setting" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9a7b3a]">The Setting</p>
            <h2 className="font-display mt-3 text-3xl text-neutral-900 md:text-5xl">A private hilltop lawn for your nikah</h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">{event.longDescription}</p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              The circular white stage sits on open grass, framed by misty Murree hills. Guests arrive to fountain
              views, terrace dining above, and a ceremony space designed for both daylight portraits and evening glow.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(40,30,15,0.18)]">
            <Image
              src="/assets/nikah-stage-close.png"
              alt="Tufted gold sofa and floral arch on the nikah stage"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(40,30,15,0.16)] lg:order-1">
            <Image
              src="/assets/nikah-night-stage.png"
              alt="Night-time nikah stage with crystal curtain and peach floral arch"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="mb-4 inline-flex items-center gap-2 text-[#9a7b3a]">
              <Flower2 className="h-5 w-5" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]">Stage & Decor</span>
            </div>
            <h2 className="font-display text-3xl text-neutral-900 md:text-5xl">Floral arch, crystal drape, gold seating</h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              The nikah stage is built as a photography centrepiece: a dense white-and-peach rose arch, shimmering
              crystal strands, and tufted cream sofas with antique-gold frames. Soft night lighting keeps the setup
              warm without overpowering the mountain sky.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              {[
                "Raised white circular platform on the lawn",
                "Premium floral arch with lush greenery",
                "Crystal bead curtain backdrop",
                "Matching lounge sofa and armchairs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a55b]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9a7b3a]">Guest Experience</p>
            <h2 className="font-display mt-3 text-3xl text-neutral-900 md:text-5xl">Lawn seating facing the ceremony</h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              White cross-back chairs are arranged on the grass toward the stage, with blush florals and glowing
              lanterns along the aisle. The upper terrace remains open for family dining, so the ceremony feels
              intimate while still welcoming a larger guest list.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Layouts can stay compact for a close family nikah or open out across the lawn for a full wedding
              reception — without losing the villa’s private, unhurried atmosphere.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(40,30,15,0.16)]">
            <Image
              src="/assets/nikah-lawn.png"
              alt="White guest chairs on the lawn facing the floral nikah stage"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#1c1914] py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10">
            <Image
              src="/assets/nikah-catering.png"
              alt="Wedding dessert and catering display with gold platters and candles"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-[#c9a55b]">
              <UtensilsCrossed className="h-5 w-5" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]">Reception Dining</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl">Catering styled for a celebration</h2>
            <p className="mt-5 text-base leading-relaxed text-white/80">
              Reception tables are dressed with gold platters, candlelight, and a dessert display that photographs as
              beautifully as it tastes. Menus can follow traditional Pakistani favourites or a mixed international
              spread, with dietary notes handled in advance.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              From welcome drinks to the final sweet course, service stays discreet so family can stay present in the
              moment — not managing the floor.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#f4ecde] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center md:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9a7b3a]">Visual Gallery</p>
            <h2 className="font-display mt-3 text-3xl text-neutral-900 md:text-5xl">Every moment, beautifully captured</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600">
              From the first glance at the lawn to the final dessert course — a complete look at how your nikah and
              reception comes together at Himalaya Villas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(180px,auto)]">
            {galleryImages.map((item) => (
              <article
                key={item.src}
                className={`group relative overflow-hidden rounded-[24px] border border-[#e7dbc6] bg-white shadow-[0_20px_50px_rgba(40,30,15,0.08)] ${item.className}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 transition group-hover:from-black/85" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8c97a]">{item.subtitle}</p>
                  <h3 className="font-display mt-1 text-xl text-white md:text-2xl">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9a7b3a]">What’s Included</p>
              <h2 className="font-display mt-3 text-3xl text-neutral-900 md:text-4xl">A complete nikah-to-reception plan</h2>
              <p className="mt-4 max-w-2xl text-neutral-600">{event.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {event.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-[#eadfcd] bg-[#faf7f1] p-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c9a55b] text-white">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <EventQuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f1] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-neutral-600">Practical details for planning your nikah and reception at Himalaya Villas.</p>
          </div>
          <EventFAQs faqs={event.faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">Related Celebrations</h2>
              <p className="mt-3 text-neutral-600">Continue planning the rest of your wedding week.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/events/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#eadfcd] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 transition group-hover:text-[#9a7b3a]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
