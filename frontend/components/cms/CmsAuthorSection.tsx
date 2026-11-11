// components/cms/CmsAuthorSection.tsx
// ERP "author": byline card for articles. Bio goes through the HTML allow-list.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsRichText from "./CmsRichText";
import CmsSection, { toneText } from "./CmsSection";
import { Eyebrow } from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

type Data = { label?: string; name: string; role?: string; image?: string; bioHtml?: string };

export default function CmsAuthorSection({ data, layout }: { data: Data; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  return (
    <CmsSection layout={{ ...layout, width: "narrow" }} defaultPadding="py-12 md:py-16">
      <div className={cn("flex flex-col sm:flex-row gap-6 rounded-sm p-6 md:p-8", t.card)}>
        {data.image && (
          <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
            <Image src={data.image} alt={data.name} fill unoptimized={isExternal(data.image)} sizes="96px" className="object-cover" />
          </span>
        )}
        <div>
          {data.label && <Eyebrow text={data.label} tone={layout.tone} className="mb-2" />}
          <p className={cn("font-display text-2xl md:text-3xl", t.heading)}>{data.name}</p>
          {data.role && <p className={cn("text-sm mt-1", t.body)}>{data.role}</p>}
          {data.bioHtml && <CmsRichText html={data.bioHtml} onDark={t.onDark} className="mt-4" />}
        </div>
      </div>
    </CmsSection>
  );
}
