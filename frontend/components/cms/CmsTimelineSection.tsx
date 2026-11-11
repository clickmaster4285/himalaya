// components/cms/CmsTimelineSection.tsx
// ERP "timeline": a vertical gold-rule timeline (itineraries, estate history).
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import type { SectionLayout } from "./cmsContent";

type Item = { date: string; title: string; description: string };

export default function CmsTimelineSection({
  data,
  layout,
}: {
  data: { heading?: string; description?: string; items: Item[] };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading heading={data.heading} description={data.description} tone={layout.tone} />
      <ol className="relative mx-auto max-w-3xl border-l border-[#c9a55b]/50 pl-8 space-y-10">
        {data.items.map((item, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-[#c9a55b] ring-4 ring-[#c9a55b]/20" aria-hidden />
            {item.date && <p className={cn("text-xs font-semibold tracking-[0.25em] uppercase mb-2", t.accent)}>{item.date}</p>}
            <h3 className={cn("font-display text-2xl md:text-3xl font-normal", t.heading)}>{item.title}</h3>
            {item.description && <p className={cn("text-sm md:text-base leading-relaxed mt-2", t.body)}>{item.description}</p>}
          </li>
        ))}
      </ol>
    </CmsSection>
  );
}
