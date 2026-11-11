// components/cms/CmsTeamSection.tsx
// ERP "team": portrait cards.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

type Item = { name: string; role: string; image: string; bio: string };

export default function CmsTeamSection({
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {data.items.map((item, i) => (
          <div key={i} className={cn("rounded-sm overflow-hidden", t.card)}>
            {item.image && (
              <div className="relative aspect-[4/5] w-full">
                <Image src={item.image} alt={item.name} fill unoptimized={isExternal(item.image)} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className={cn("font-display text-2xl font-normal", t.heading)}>{item.name}</h3>
              {item.role && <p className={cn("text-xs tracking-[0.2em] uppercase mt-1", t.accent)}>{item.role}</p>}
              {item.bio && <p className={cn("text-sm leading-relaxed mt-3", t.body)}>{item.bio}</p>}
            </div>
          </div>
        ))}
      </div>
    </CmsSection>
  );
}
