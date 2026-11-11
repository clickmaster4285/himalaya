// components/cms/CmsStatsSection.tsx
// ERP "stats": gold figures on the estate's forest-green band by default.
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import type { SectionLayout } from "./cmsContent";

type Data = { heading?: string; description?: string; items: { value: string; label: string }[] };

const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export default function CmsStatsSection({ data, layout }: { data: Data; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  const cols = layout.columns ?? Math.min(data.items.length, 4);
  return (
    <CmsSection layout={layout} defaultPadding="py-12 md:py-16">
      <CmsSectionHeading heading={data.heading} description={data.description} tone={layout.tone} />
      <div className={cn("grid gap-8 text-center", COLS[cols])}>
        {data.items.map((item, i) => (
          <div key={i}>
            <div className={cn("font-display text-4xl md:text-5xl mb-2", layout.tone === "gold" ? "text-white" : "text-[#c9a55b]")}>
              {item.value}
            </div>
            {item.label && <div className={cn("text-xs md:text-sm tracking-[0.2em] uppercase", t.body)}>{item.label}</div>}
          </div>
        ))}
      </div>
    </CmsSection>
  );
}
