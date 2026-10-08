// components/VillaRoomSeoContent.tsx
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  type Room,
  type RoomSeoBlock,
} from "@/content/villas/villa-content";
import { amenityImages } from "@/content/villas/villa-content";
import VillaAmenitiesSection from "@/components/VillaAmenitiesSection";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function SeoBlockView({ block }: { block: RoomSeoBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-gray-600 leading-relaxed mb-4">{block.text}</p>
    );
  }

  if (block.type === "bullets") {
    return (
      <ul className="space-y-2 mb-4">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-gray-700">
            <div className="w-6 h-6 rounded-full bg-[#c9a55b] flex items-center justify-center shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="font-display text-xl text-neutral-900 mb-2">
        {block.heading}
      </h4>
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-gray-600 leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function getUsedSectionImages(room: Room): string[] {
  if (!room.seoContent) return [];
  return room.seoContent.sections
    .map((s) => s.image)
    .filter((img): img is string => Boolean(img));
}

export default function VillaRoomSeoContent({ room }: { room: Room }) {
  const content = room.seoContent;

  const faqJsonLd = content?.faqs?.length
    ? {
        id: `hv-jsonld-room-faq-${room.slug}`,
        data: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
      }
    : null;

  return (
    <>
      {faqJsonLd && <JsonLd items={[faqJsonLd]} />}

     
      

      {/* SEO sections */}
      {content?.sections.map((section) => (
        <div
          key={section.heading}
          id={slugify(section.heading)}
          className="mt-14"
        >
          <h3 className="font-display text-2xl text-neutral-900 mb-4">
            {section.heading}
          </h3>

          {section.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-gray-100 mb-6">
              <Image
                src={section.image}
                alt={section.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          )}

          {section.blocks.map((block, i) => (
            <SeoBlockView key={i} block={block} />
          ))}
        </div>
      ))}

      {/* FAQs — bg-gray-50 card style */}
      {content?.faqs && content.faqs.length > 0 && (
        <div className="mt-14">
          <h3 className="font-display text-2xl text-neutral-900 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <article
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <h4 className="font-display text-lg text-neutral-900">
                  {faq.q}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </>
  );
}