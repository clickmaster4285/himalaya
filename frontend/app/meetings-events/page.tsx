import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { ArrowRight, Briefcase, Calendar, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Meetings & Events Venue Bhurban Murree | Corporate & Social",
  description:
    "Host corporate meetings, conferences, retreats, and private events at Himalaya Villas Bhurban — meeting spaces, mountain views, catering, and guest accommodation.",
  path: "/meetings-events",
  keywords: [
    "meetings events Murree",
    "corporate events Bhurban",
    "conference venue Murree Hills",
    "meeting hall Bhurban",
    "offsite retreat Pakistan",
  ],
  ogImage: "/assets/conference1.webp",
});

const offerings = [
  {
    title: "Corporate retreats & offsites",
    description: "Team building, strategy sessions, and multi-day retreats with villa stays.",
    href: "/corporate-retreats",
    icon: Users,
  },
  {
    title: "Conferences & seminars",
    description: "Professional AV, seating layouts, and full-day delegate catering.",
    href: "/corporate/professional-conference-venue",
    icon: Briefcase,
  },
  {
    title: "Book a meeting",
    description: "Reserve meeting space and on-site hospitality for your next visit.",
    href: "/book/meetings",
    icon: Calendar,
  },
  {
    title: "All events & experiences",
    description: "Weddings, galas, family gatherings, and curated estate experiences.",
    href: "/events",
    icon: Sparkles,
  },
];

const whatsappUrl = buildWhatsAppBookingUrl(
  "a meeting or corporate event at Himalaya Villas Bhurban Murree",
);

export default function MeetingsEventsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Meetings & Events at Himalaya Villas",
    description:
      "Corporate meetings, conferences, and private events at Himalaya Villas Bhurban Murree.",
    url: absoluteUrl("/meetings-events"),
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <JsonLd items={[{ id: "meetings-events", data: jsonLd }]} />
      <Navbar />

      <section className="relative overflow-hidden bg-[#1b261b] text-white py-24 md:py-32 px-6">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/conference1.webp)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b261b] via-[#1b261b]/90 to-[#1b261b]/75" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a55b] font-semibold mb-4">
            Meetings & Events
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Meetings & Events in the Murree Hills
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
            A private Bhurban estate for board meetings, corporate retreats, conferences, and
            celebrations — with mountain views, on-site dining, and luxury villa accommodation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#b09452] transition"
            >
              Plan your event
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/book/meetings"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition"
            >
              Book a meeting
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-neutral-900 text-center mb-12">
            What we host
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex gap-5 rounded-2xl border border-[#e8dfd0] bg-white p-6 md:p-8 shadow-sm hover:border-[#c9a55b]/50 hover:shadow-md transition"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c9a55b]/15 text-[#8b6914]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-neutral-900 group-hover:text-[#6b5428] transition">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#8b6914]">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#f5f0e8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl text-neutral-900 mb-4">
            Need a custom proposal?
          </h2>
          <p className="text-neutral-600 mb-8">
            Share your date, delegate count, and agenda — our team will confirm availability and send a
            tailored package within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[#8b6914] font-semibold underline underline-offset-4 hover:text-[#6b5428]"
          >
            Contact the events team
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
