"use client";

import { usePathname } from "next/navigation";
import { getValidatedUniversalFaqsForPath } from "@/lib/universal-faqs";

export function UniversalFaqBlock() {
  const pathname = usePathname() || "/";
  const faqs = getValidatedUniversalFaqsForPath(pathname, 5);
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-14 md:px-12 md:py-16">
      <script
        id="hv-jsonld-universal-faq"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson).replace(/</g, "\\u003c") }}
      />
      <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">Frequently Asked Questions</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
        Quick travel and booking answers for Bhurban Murree luxury villa stays.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {faqs.map((faq) => (
          <article key={faq.q} className="rounded-lg border border-[#eadfce] bg-white p-5">
            <h3 className="text-base font-semibold text-neutral-900">{faq.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

