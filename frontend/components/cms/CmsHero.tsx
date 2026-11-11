// components/cms/CmsHero.tsx
// ERP "hero" in the Himalaya Villas hero style: full-bleed photograph under
// the transparent site Navbar (layout "background"/default), a cream text +
// image split (layout "split"), or a forest-green band when there is no image.
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsReveal from "./CmsReveal";
import { CmsButtons } from "./CmsButton";
import { DisplayHeading, Eyebrow } from "./CmsSectionHeading";
import { isExternal, type CmsLink, type SectionLayout } from "./cmsContent";

export type CmsHeroData = {
  eyebrow?: string;
  heading: string;
  description?: string;
  meta?: string;
  image?: string;
  alt?: string;
  cta?: CmsLink;
  secondaryCta?: CmsLink;
};

/** True when the hero renders with light text on a dark/photo background. */
export function heroIsDark(layout: SectionLayout, hasImage: boolean) {
  return !(layout.layout === "split" && hasImage);
}

export default function CmsHero({ data, layout }: { data: CmsHeroData; layout: SectionLayout }) {
  if (layout.layout === "split" && data.image) return <SplitHero data={data} layout={layout} />;

  const hasImage = !!data.image;
  return (
    <section
      className={cn(
        "relative isolate flex items-center overflow-hidden",
        hasImage ? "min-h-[70vh] md:min-h-[85vh] bg-[#1b261b]" : "bg-[#1b261b] min-h-[55vh]",
      )}
    >
      {hasImage && (
        <>
          <Image
            src={data.image!}
            alt={data.alt || data.heading}
            fill
            priority
            unoptimized={isExternal(data.image!)}
            sizes="100vw"
            className="object-cover -z-20"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        </>
      )}
      <CmsReveal motion={layout.motion} className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          {data.eyebrow && <Eyebrow text={data.eyebrow} tone="dark" className="mb-5" />}
          <DisplayHeading as="h1" text={data.heading} tone="dark" className="text-5xl md:text-6xl lg:text-7xl" />
          {data.description && (
            <p className="mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">{data.description}</p>
          )}
          <CmsButtons primary={data.cta} secondary={data.secondaryCta} tone="dark" className="mt-10" />
          {data.meta && <p className="mt-8 text-xs tracking-[0.25em] uppercase text-white/60">{data.meta}</p>}
        </div>
      </CmsReveal>
    </section>
  );
}

function SplitHero({ data, layout }: { data: CmsHeroData; layout: SectionLayout }) {
  return (
    <section className="relative bg-[#faf7f1] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <CmsReveal motion={layout.motion} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            {data.eyebrow && <Eyebrow text={data.eyebrow} tone="light" className="mb-5" />}
            <DisplayHeading as="h1" text={data.heading} tone="light" className="text-5xl md:text-6xl" />
            {data.description && (
              <p className="mt-6 text-base md:text-lg text-[#5c564c] leading-relaxed max-w-xl">{data.description}</p>
            )}
            {data.meta && <p className="mt-6 text-xs tracking-[0.25em] uppercase text-[#8b8878]">{data.meta}</p>}
            <CmsButtons primary={data.cta} secondary={data.secondaryCta} tone="light" className="mt-10" />
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src={data.image!}
              alt={data.alt || data.heading}
              fill
              priority
              unoptimized={isExternal(data.image!)}
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </CmsReveal>
    </section>
  );
}
