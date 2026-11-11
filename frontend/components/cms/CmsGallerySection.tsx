// components/cms/CmsGallerySection.tsx
// ERP "gallery": image grid with captions, like the estate's Glimpse section.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

type Item = { image: string; caption: string };

export default function CmsGallerySection({
  data,
  layout,
}: {
  data: { eyebrow?: string; heading?: string; description?: string; items: Item[] };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  const cols = layout.columns === 2 ? "sm:grid-cols-2" : layout.columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} description={data.description} tone={layout.tone} />
      <div className={cn("grid grid-cols-1 gap-4 md:gap-6", cols)}>
        {data.items.map((item, i) => (
          <figure key={i} className="group">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <Image
                src={item.image}
                alt={item.caption || data.heading || "Himalaya Villas & Resorts"}
                fill
                unoptimized={isExternal(item.image)}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {item.caption && <figcaption className={cn("mt-3 text-sm italic", t.body)}>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </CmsSection>
  );
}
