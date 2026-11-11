// components/cms/CmsBentoSection.tsx
// ERP "bento": mixed-size tiles; image tiles get the hero overlay treatment.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

type Item = { title: string; description: string; span: string; image: string };

// "2x2" → spans two columns and two rows on desktop.
const SPANS: Record<string, string> = {
  "2x2": "md:col-span-2 md:row-span-2",
  "2x1": "md:col-span-2",
  "1x2": "md:row-span-2",
  "3x1": "md:col-span-3",
};

export default function CmsBentoSection({ data, layout }: { data: { heading?: string; items: Item[] }; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading heading={data.heading} tone={layout.tone} />
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(14rem,auto)] gap-4 md:gap-5">
        {data.items.map((item, i) => (
          <div key={i} className={cn("relative isolate overflow-hidden rounded-sm p-6 md:p-8 flex flex-col justify-end", SPANS[item.span], item.image ? "text-white" : t.card)}>
            {item.image && (
              <>
                <Image src={item.image} alt={item.title} fill unoptimized={isExternal(item.image)} sizes="(min-width: 768px) 60vw, 90vw" className="object-cover -z-10" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              </>
            )}
            <div className="relative">
              <h3 className={cn("font-display text-2xl md:text-3xl font-normal", item.image ? "text-white" : t.heading)}>{item.title}</h3>
              {item.description && (
                <p className={cn("mt-2 text-sm leading-relaxed", item.image ? "text-white/80" : t.body)}>{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </CmsSection>
  );
}
