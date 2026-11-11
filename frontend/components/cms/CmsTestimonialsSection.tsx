// components/cms/CmsTestimonialsSection.tsx
// ERP "testimonials": guest quotes in Cormorant italic with gold stars.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

type Item = { quote: string; name: string; role: string; image: string };

export default function CmsTestimonialsSection({ data, layout }: { data: { eyebrow?: string; heading?: string; items: Item[] }; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  const cols = data.items.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : data.items.length === 2 ? "md:grid-cols-2" : "max-w-3xl mx-auto";
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} tone={layout.tone} />
      <div className={cn("grid gap-6 md:gap-8", cols)}>
        {data.items.map((item, i) => (
          <figure key={i} className={cn("rounded-sm p-6 md:p-8 flex flex-col", t.card)}>
            <span className="font-display text-6xl leading-none text-[#c9a55b] h-8 mb-2" aria-hidden>
              &ldquo;
            </span>
            <blockquote className={cn("font-display italic text-xl leading-relaxed flex-1", t.heading)}>
              {item.quote}
            </blockquote>
            {(item.name || item.role) && (
              <figcaption className="mt-6 flex items-center gap-4">
                {item.image && (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.name} fill unoptimized={isExternal(item.image)} sizes="48px" className="object-cover" />
                  </span>
                )}
                <span>
                  {item.name && <span className={cn("block font-semibold text-sm", t.heading)}>{item.name}</span>}
                  {item.role && <span className={cn("block text-xs tracking-wide", t.body)}>{item.role}</span>}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </CmsSection>
  );
}
