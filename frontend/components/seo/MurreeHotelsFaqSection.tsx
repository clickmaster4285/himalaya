"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { MurreeHotelsFaq } from "@/lib/seo/murree-hotels-seo-content";

type Variant = "homepage" | "luxury" | "best-hotels";

type MurreeHotelsFaqSectionProps = {
  title: string;
  subtitle?: string;
  faqs: MurreeHotelsFaq[];
  variant?: Variant;
};

export default function MurreeHotelsFaqSection({
  title,
  subtitle,
  faqs,
  variant = "homepage",
}: MurreeHotelsFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (variant === "best-hotels") {
    return (
      <section className="py-12 md:py-16 px-6 max-w-4xl mx-auto border-t border-[#eadfce]">
        <div className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900">{title}</h2>
          {subtitle ? <p className="mt-4 text-neutral-600 leading-relaxed">{subtitle}</p> : null}
        </div>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <article
              key={faq.q}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#eadfce]"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{faq.q}</h3>
              <p className="text-neutral-700 leading-relaxed">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (variant === "homepage") {
    return (
      <section className="bg-[hsl(160,15%,12%)] py-24 px-6 md:px-12 lg:px-24 text-[hsl(0,0%,95%)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[hsl(var(--primary))]">
            Frequently Asked Questions
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-normal leading-tight mb-4">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-[hsl(0,0%,70%)] leading-relaxed mb-10 max-w-3xl">{subtitle}</p>
          ) : null}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="border border-[hsl(160,15%,20%)] rounded-md overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[hsl(160,15%,10%)] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-[15px] leading-snug pr-4">{faq.q}</span>
                    <span className="shrink-0 text-[hsl(var(--primary))]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="px-5 pb-5 text-[hsl(0,0%,75%)] text-sm leading-relaxed border-t border-[hsl(160,15%,20%)] pt-4">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white px-6 border-t border-[#e5e1d8]">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 text-[#8b8878] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
            <span className="h-[1px] w-6 bg-[#8b8878]" />
            <span>Additional FAQs</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#1b261b]">{title}</h2>
          {subtitle ? (
            <p className="mt-4 text-[#8b8878] text-[15px] leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
        <div className="space-y-0 border-t border-[#e5e1d8]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="border-b border-[#e5e1d8]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-bold text-[#1b261b] pr-8 leading-snug">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-6 h-6 border border-[#e5e1d8] bg-[#fcfbf8] flex items-center justify-center text-neutral-400">
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[14px] text-[#8b8878] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
