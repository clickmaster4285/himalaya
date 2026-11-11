// components/cms/CmsFeaturesSection.tsx
// ERP "features", "services", "benefits", "process" and "cards": the card
// grid used across the estate's landing pages (white cards on cream, gold
// icon/number, Cormorant titles). Process steps get numbered gold badges.
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

export type CmsFeatureItem = {
  icon?: string;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  linkLabel?: string;
};

type Data = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: CmsFeatureItem[];
  variant: "cards" | "numbered" | "icons";
};

const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

// Emoji / short glyph icons only; anything longer is an icon *name* we can't render.
const isGlyph = (icon: string) => [...icon].length <= 3;

function ItemLink({ item, className }: { item: CmsFeatureItem; className: string }) {
  if (!item.url) return null;
  const label = `${item.linkLabel || "Learn more"} ›`;
  return isExternal(item.url) ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
  ) : (
    <Link href={item.url} className={className}>{label}</Link>
  );
}

export default function CmsFeaturesSection({ data, layout }: { data: Data; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  const cols = layout.columns ?? Math.min(Math.max(data.items.length, 1), data.variant === "numbered" ? 4 : 3);

  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} description={data.description} tone={layout.tone} />
      <div className={cn("grid gap-6 md:gap-8", COLUMNS[cols])}>
        {data.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "group rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg",
              t.card,
              data.variant === "numbered" && "text-center",
            )}
          >
            {item.image && (
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized={isExternal(item.image)}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6 md:p-8">
              {data.variant === "numbered" ? (
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a55b] font-display text-2xl text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
              ) : (
                item.icon &&
                isGlyph(item.icon) && (
                  <div className="mb-4 text-3xl leading-none" aria-hidden>
                    {item.icon}
                  </div>
                )
              )}
              <h3 className={cn("font-display text-2xl md:text-[1.7rem] font-normal leading-snug mb-3", t.heading)}>{item.title}</h3>
              {item.description && <p className={cn("text-sm leading-relaxed", t.body)}>{item.description}</p>}
              <ItemLink
                item={item}
                className={cn("inline-block mt-5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors", t.accent, "hover:opacity-70")}
              />
            </div>
          </div>
        ))}
      </div>
    </CmsSection>
  );
}
