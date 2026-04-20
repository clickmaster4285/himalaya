import { getValidatedUniversalFaqs } from "@/lib/universal-faqs";

export function UniversalFaqBlock() {
  const faqs = getValidatedUniversalFaqs(12);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-14 md:px-12 md:py-16">
      <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">Frequently Asked Questions</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
        Quick travel and booking answers for Bhurban Murree luxury villa stays.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
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

