"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONTACT } from "@/lib/site-contact";
import { buildWeddingVenueWhatsAppUrl } from "@/lib/whatsapp";
import type { WeddingPageConfig } from "@/lib/seo/wedding-venue-seo-content";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  MapPin,
  Minus,
  Mountain,
  Plus,
  Sparkles,
} from "lucide-react";

type WeddingVenueClusterClientProps = {
  config: WeddingPageConfig;
};

function buildSchemas(config: WeddingPageConfig) {
  const origin = "https://himalayavillas.com";
  const pageUrl = `${origin}${config.path}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      {
        "@type": "ListItem",
        position: 2,
        name: config.schema.breadcrumbName,
        item: pageUrl,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const event: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: config.schema.eventName,
    description: config.meta.description,
    url: pageUrl,
    eventAttendanceMode:
      config.schema.eventType === "MixedEventAttendanceMode"
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Himalaya Villas",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bhurban",
        addressLocality: "Murree",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Himalaya Villas",
      url: origin,
      telephone: SITE_CONTACT.phoneDisplay,
    },
  };

  if (config.schema.eventType && config.schema.eventType !== "MixedEventAttendanceMode") {
    event.additionalType = config.schema.eventType;
  }

  const scripts: Record<string, unknown>[] = [breadcrumb, faq, event];

  if (config.schema.includeLodging) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: "Himalaya Villas",
      description:
        "Luxury private wedding venue and marriage hall in Bhurban, Murree Hills, Pakistan.",
      url: origin,
      telephone: SITE_CONTACT.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bhurban",
        addressLocality: "Murree",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      priceRange: "PKR 150,000 - PKR 1,400,000",
    });
  }

  if (config.schema.includeOffers && config.tables?.[0]) {
    const offerTable = config.tables[0];
    offerTable.rows.forEach((row) => {
      const priceMatch = row[3]?.match(/PKR\s*([\d,]+)/);
      if (priceMatch) {
        scripts.push({
          "@context": "https://schema.org",
          "@type": "Offer",
          name: row[0],
          description: row[4] || row[0],
          price: priceMatch[1].replace(/,/g, ""),
          priceCurrency: "PKR",
          url: pageUrl,
          seller: { "@type": "Organization", name: "Himalaya Villas" },
        });
      }
    });
  }

  return scripts;
}

function CtaBox({ cta }: { cta: WeddingPageConfig["ctas"][0] }) {
  return (
    <div className="rounded-2xl border border-[#c9a55b]/30 bg-[#1b261b] p-6 md:p-8 shadow-xl">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-2">
        {cta.eyebrow}
      </p>
      <h3 className="font-display text-xl md:text-2xl text-white mb-2">{cta.title}</h3>
      <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6">{cta.subtitle}</p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <a
          href={buildWeddingVenueWhatsAppUrl(cta.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#c9a55b] text-[#1b261b] px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#ebd59f] transition-colors"
        >
          WhatsApp {SITE_CONTACT.phoneDisplay}
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:border-white/50 transition-colors"
        >
          Contact form
        </Link>
        <Link
          href="/wedding-packages-murree-prices"
          className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:border-white/50 transition-colors"
        >
          View packages
        </Link>
      </div>
    </div>
  );
}

export default function WeddingVenueClusterClient({ config }: WeddingVenueClusterClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const schemas = buildSchemas(config);

  return (
    <div className="min-h-screen bg-[#F6F1EA] selection:bg-[#c9a55b] selection:text-white">
      {schemas.map((schema) => (
        <script
          key={JSON.stringify(schema).slice(0, 40)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
          <Image
            src={config.heroImage}
            alt={config.meta.h1ImageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-20 text-white text-left">
            <p className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="h-[1px] w-8 bg-[#c9a55b]" />
              {config.hero.eyebrow}
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {config.hero.h1}{" "}
              {config.hero.h1Accent ? (
                <span className="block mt-2 text-white/95 italic font-light text-2xl md:text-3xl">
                  {config.hero.h1Accent}
                </span>
              ) : null}
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/90 max-w-2xl font-light leading-relaxed">
              {config.hero.subtitle}
            </p>
            {config.hero.stats ? (
              <div className="mt-8 flex flex-wrap gap-6 md:gap-10">
                {config.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[#c9a55b] font-display text-xl md:text-2xl">{stat.value}</p>
                    <p className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Quick facts */}
        {config.quickFacts ? (
          <section className="py-12 px-6 max-w-5xl mx-auto -mt-16 relative z-20">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#eadfce] shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#c9a55b]" />
                <h2 className="font-display text-xl md:text-2xl font-bold text-neutral-900">
                  Venue at a Glance
                </h2>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {config.quickFacts.map((fact) => (
                  <div key={fact.label} className="border-l-2 border-[#c9a55b] pl-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      {fact.label}
                    </dt>
                    <dd className="text-neutral-800 text-sm md:text-base mt-1 leading-snug">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}

        {/* Intro */}
        {config.intro ? (
          <section className="py-12 md:py-16 px-6 max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
              {config.intro.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {/* First CTA */}
        {config.ctas[0] ? (
          <section className="py-8 px-6 max-w-4xl mx-auto">
            <CtaBox cta={config.ctas[0]} />
          </section>
        ) : null}

        {/* Content sections */}
        {config.sections.map((section, sectionIndex) => (
          <section
            key={section.title}
            className={`py-12 md:py-20 px-6 ${sectionIndex % 2 === 1 ? "bg-white" : ""}`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                {section.title}
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
              {section.subsections?.map((sub) => (
                <div key={sub.heading} className="mt-10">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{sub.heading}</h3>
                  {sub.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)} className="text-neutral-600 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                  {sub.bullets ? (
                    <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                      {sub.bullets.map((b) => (
                        <li key={b.slice(0, 40)}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {sub.link ? (
                    <Link
                      href={sub.link.href}
                      className="inline-flex items-center gap-2 mt-4 text-[#c9a55b] font-medium hover:underline"
                    >
                      {sub.link.label}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : null}
                </div>
              ))}
              {section.link ? (
                <Link
                  href={section.link.href}
                  className="inline-flex items-center gap-2 mt-6 text-[#c9a55b] font-medium hover:underline"
                >
                  {section.link.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : null}
            </div>
          </section>
        ))}

        {/* Venue spaces */}
        {config.venueSpaces ? (
          <section className="py-16 md:py-24 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Mountain className="w-10 h-10 text-[#c9a55b] mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900">
                  Wedding & Event Spaces
                </h2>
              </div>
              <div className="space-y-8">
                {config.venueSpaces.map((space) => (
                  <article
                    key={space.title}
                    className="bg-[#fcfbf8] p-8 md:p-10 rounded-2xl border border-[#eadfce]"
                  >
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">{space.title}</h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">{space.description}</p>
                    <ul className="space-y-2">
                      {space.bullets.map((b) => (
                        <li
                          key={b.slice(0, 40)}
                          className="flex items-start gap-2 text-neutral-700 text-sm md:text-base"
                        >
                          <span className="text-[#c9a55b] mt-1">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Tables */}
        {config.tables?.map((table) => (
          <section key={table.title} className="py-16 md:py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900">
                  {table.title}
                </h2>
                {table.description ? (
                  <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">{table.description}</p>
                ) : null}
              </div>
              <div className="overflow-x-auto rounded-2xl shadow-xl border border-[#eadfce]">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-[#eadfce]">
                      {table.headers.map((h, i) => (
                        <th
                          key={h}
                          className={`p-4 md:p-5 text-sm font-semibold uppercase tracking-wider ${
                            i === table.highlightColumn
                              ? "text-[#c9a55b] bg-[#c9a55b]/10"
                              : "text-neutral-600"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm md:text-base">
                    {table.rows.map((row) => (
                      <tr
                        key={row[0]}
                        className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50"
                      >
                        {row.map((cell, i) => (
                          <td
                            key={`${row[0]}-${i}`}
                            className={`p-4 md:p-5 ${
                              i === table.highlightColumn
                                ? "font-semibold text-[#1b261b] bg-[#c9a55b]/5"
                                : "text-neutral-600"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {table.note ? (
                <p className="mt-4 text-xs text-neutral-500 italic text-center">{table.note}</p>
              ) : null}
            </div>
          </section>
        ))}

        {/* Mid CTA */}
        {config.ctas[1] ? (
          <section className="py-12 px-6 max-w-4xl mx-auto">
            <CtaBox cta={config.ctas[1]} />
          </section>
        ) : null}

        {/* Cluster links (pillar only) */}
        {config.clusterLinks ? (
          <section className="py-16 md:py-24 px-6 bg-[#1b261b] text-white">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Heart className="w-4 h-4" />
                Wedding Occasions
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-10">
                {config.clusterSectionTitle ?? "Explore Wedding Occasions"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.clusterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:border-[#c9a55b]/40 hover:bg-white/10 transition-all"
                  >
                    <h3 className="font-display text-xl text-[#c9a55b] group-hover:text-[#ebd59f] transition-colors flex items-center gap-2">
                      {link.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="mt-3 text-white/70 text-sm leading-relaxed">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto border-t border-[#eadfce]">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a55b] mb-2">FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-0 border border-[#eadfce] rounded-xl overflow-hidden bg-white">
            {config.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="border-b border-[#eadfce] last:border-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left hover:bg-neutral-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-neutral-900 pr-4">{faq.q}</span>
                    <span className="shrink-0 text-[#c9a55b]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="px-5 pb-5 text-neutral-600 leading-relaxed border-t border-[#eadfce] pt-4">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA + pillar back link */}
        <section className="py-12 md:py-16 px-6 max-w-4xl mx-auto space-y-8">
          {config.ctas[2] ? <CtaBox cta={config.ctas[2]} /> : config.ctas[config.ctas.length - 1] ? (
            <CtaBox cta={config.ctas[config.ctas.length - 1]} />
          ) : null}
          {config.pillarBackLink ? (
            <div className="text-center">
              <Link
                href={config.pillarBackLink.href}
                className="inline-flex items-center gap-2 text-[#c9a55b] font-medium hover:underline"
              >
                <MapPin className="w-4 h-4" />
                {config.pillarBackLink.label}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : null}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/contact" className="text-neutral-600 hover:text-[#c9a55b]">
              Contact
            </Link>
            <span className="text-neutral-300">·</span>
            <Link href="/weddings" className="text-neutral-600 hover:text-[#c9a55b]">
              All weddings
            </Link>
            <span className="text-neutral-300">·</span>
            <Link href="/book/wedding" className="text-neutral-600 hover:text-[#c9a55b]">
              Book wedding
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
