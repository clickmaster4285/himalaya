// components/VillaRoomSeoContent.tsx
import { JsonLd } from "@/components/seo/JsonLd";
import {
  type Room,
  type RoomSeoBlock,
} from "@/content/villas/villa-content";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function SeoBlockView({ block }: { block: RoomSeoBlock }) {
  if (block.type === "paragraph") {
    return <p className="mt-4 leading-relaxed text-[#6b6357]">{block.text}</p>;
  }

  if (block.type === "bullets") {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 leading-relaxed text-[#6b6357]"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a07c1f]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="font-serif text-xl text-[#2b2b2b]">{block.heading}</h3>
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 leading-relaxed text-[#6b6357]">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function VillaRoomSeoContent({ room }: { room: Room }) {
  const content = room.seoContent;

  if (!content) return null;

  const faqJsonLd = {
    id: `hv-jsonld-room-faq-${room.slug}`,
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (content.faqs ?? []).map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  };

  return (
    <>
      {content.faqs && content.faqs.length > 0 && (
        <JsonLd items={[faqJsonLd]} />
      )}
      <section className="bg-[#e9e2d1] pb-16 lg:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-[#eee5d6] bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)] sm:p-10">
            {content.sections.map((section) => (
              <section
                key={section.heading}
                id={slugify(section.heading)}
                className="mt-12 first:mt-0"
              >
                <h2 className="font-serif text-2xl text-[#2b2b2b] leading-snug sm:text-3xl">
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <SeoBlockView key={i} block={block} />
                ))}
              </section>
            ))}

            {content.faqs && content.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="font-serif text-2xl text-[#2b2b2b] leading-snug sm:text-3xl">
                  FAQs
                </h2>
                <div className="mt-6 space-y-4">
                  {content.faqs.map((faq) => (
                    <article
                      key={faq.q}
                      className="rounded-lg border border-[#f0e6d6] bg-[#faf7f1] p-5"
                    >
                      <h3 className="font-serif text-lg text-[#2b2b2b]">
                        {faq.q}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6b6357]">
                        {faq.a}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
