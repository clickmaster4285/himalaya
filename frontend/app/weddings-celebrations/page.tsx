import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Wedding Celebrations in Murree & Bhurban | Himalaya Villas",
  description:
    "Plan nikah, mehndi, barat, walima, and engagement celebrations at Himalaya Villas — private mountain estate in Bhurban Murree with full event management.",
  path: "/weddings-celebrations",
  keywords: [
    "wedding celebrations Murree",
    "weddings Bhurban",
    "destination wedding Murree Hills",
    "nikah mehndi walima venue",
    "Himalaya Villas weddings",
  ],
  ogImage: "/assets/wedding8.jpg",
});

const celebrations = [
  {
    title: "Nikah & Wedding in the Hills",
    description: "Sacred nikkah ceremony and reception with mountain terrace views.",
    href: "/weddings/nikkah-and-wedding-celebrations-in-the-hills",
  },
  {
    title: "Nikah Venue Bhurban",
    description: "Intimate outdoor nikah — private estate, 45 minutes from Islamabad.",
    href: "/weddings/nikah",
  },
  {
    title: "Mehndi Celebrations",
    description: "Colourful mehndi nights with stage decor, music, and dining.",
    href: "/weddings/mehndi-celebrations",
  },
  {
    title: "Baraat Celebrations",
    description: "Grand barat arrivals, stage design, and guest hospitality.",
    href: "/weddings/barat-celebrations",
  },
  {
    title: "Walima & Wedding Dinner",
    description: "Elegant walima receptions for families and extended guests.",
    href: "/weddings/walima-and-wedding-dinner",
  },
  {
    title: "Engagement Ceremonies",
    description: "Ring ceremonies and engagement dinners in a refined setting.",
    href: "/weddings/engagement-ceremonies",
  },
  {
    title: "Dholki & Bridal Shower",
    description: "Pre-wedding dholki evenings and bridal shower gatherings.",
    href: "/weddings/dholki-and-bridal-shower",
  },
  {
    title: "All Wedding Services",
    description: "Explore packages, pricing, and the full wedding venue hub.",
    href: "/weddings",
  },
];

const whatsappUrl = buildWhatsAppBookingUrl(
  "a wedding celebration at Himalaya Villas Bhurban Murree",
);

export default function WeddingsCelebrationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Wedding Celebrations at Himalaya Villas",
    description:
      "Plan nikah, mehndi, barat, walima, and engagement celebrations at Himalaya Villas Bhurban Murree.",
    url: absoluteUrl("/weddings-celebrations"),
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <JsonLd items={[{ id: "weddings-celebrations", data: jsonLd }]} />
      <Navbar />

      <section className="relative overflow-hidden bg-[#1b261b] text-white py-24 md:py-32 px-6">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/wedding8.jpg)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#1b261b]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a55b] font-semibold mb-4 flex items-center justify-center gap-2">
            <Heart className="h-4 w-4" aria-hidden />
            Wedding Celebrations
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Destination Weddings & Celebrations in Bhurban Murree
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">
            From nikah and mehndi to barat and walima — host every chapter of your wedding at a private
            Himalayan estate with dedicated coordination, catering, and guest stays.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#b09452] transition"
            >
              WhatsApp wedding inquiry
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/weddings"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition"
            >
              View wedding hub
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a55b] font-semibold mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" aria-hidden />
              Ceremonies we host
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">
              Choose your celebration
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {celebrations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[#e8dfd0] bg-white p-6 md:p-8 shadow-sm hover:border-[#c9a55b]/50 hover:shadow-md transition"
              >
                <h3 className="font-display text-xl text-neutral-900 group-hover:text-[#6b5428] transition">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#8b6914]">
                  View details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
