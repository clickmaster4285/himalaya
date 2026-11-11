// components/cms/CmsLogosSection.tsx
// ERP "logos": partner / press logos (or names) in a muted row.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import { Eyebrow } from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

type Item = { image: string; name: string; url: string };

export default function CmsLogosSection({ data, layout }: { data: { heading?: string; items: Item[] }; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  return (
    <CmsSection layout={layout} defaultPadding="py-12 md:py-16">
      {data.heading && <Eyebrow text={data.heading} tone={layout.tone} className="text-center mb-8" />}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
        {data.items.map((item, i) => {
          const logo = item.image ? (
            <span className="relative block h-10 w-32 md:h-12 md:w-36 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
              <Image src={item.image} alt={item.name || "Partner logo"} fill unoptimized={isExternal(item.image)} sizes="144px" className="object-contain" />
            </span>
          ) : (
            <span className={cn("font-display text-xl md:text-2xl", t.body)}>{item.name}</span>
          );
          return item.url ? (
            <a key={i} href={item.url} {...(isExternal(item.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {logo}
            </a>
          ) : (
            <span key={i}>{logo}</span>
          );
        })}
      </div>
    </CmsSection>
  );
}
