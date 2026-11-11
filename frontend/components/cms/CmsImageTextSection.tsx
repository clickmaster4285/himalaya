// components/cms/CmsImageTextSection.tsx
// ERP "imageText" (text beside an image) and "image" (image only).
import Image from "next/image";
import { cn } from "@/lib/utils";
import CmsRichText from "./CmsRichText";
import CmsSection, { toneText } from "./CmsSection";
import { DisplayHeading, Eyebrow } from "./CmsSectionHeading";
import { CmsButtons } from "./CmsButton";
import { isExternal, type CmsLink, type SectionLayout } from "./cmsContent";

type Data = {
  eyebrow?: string;
  heading?: string;
  bodyHtml?: string;
  image?: string;
  alt?: string;
  caption?: string;
  cta?: CmsLink;
  imagePosition?: "left" | "right";
};

export default function CmsImageTextSection({ data, layout }: { data: Data; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  const hasText = !!(data.heading || data.bodyHtml || data.eyebrow);

  const figure = data.image && (
    <figure>
      <div className={cn("relative w-full overflow-hidden rounded-sm", hasText ? "aspect-[4/3]" : "aspect-[16/9]")}>
        <Image
          src={data.image}
          alt={data.alt || data.heading || data.caption || ""}
          fill
          unoptimized={isExternal(data.image)}
          sizes={hasText ? "(min-width: 768px) 45vw, 90vw" : "(min-width: 1280px) 80rem, 95vw"}
          className="object-cover"
        />
      </div>
      {data.caption && <figcaption className={cn("text-sm mt-3 italic", t.body)}>{data.caption}</figcaption>}
    </figure>
  );

  if (!hasText) {
    return (
      <CmsSection layout={layout}>
        <div className="mx-auto max-w-6xl">{figure}</div>
      </CmsSection>
    );
  }

  return (
    <CmsSection layout={layout}>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className={cn(data.imagePosition === "left" && "md:order-2")}>
          {data.eyebrow && <Eyebrow text={data.eyebrow} tone={layout.tone} className="mb-4" />}
          {data.heading && <DisplayHeading text={data.heading} tone={layout.tone} className="text-4xl md:text-5xl mb-6" />}
          {data.bodyHtml && <CmsRichText html={data.bodyHtml} onDark={t.onDark} />}
          <CmsButtons primary={data.cta} tone={layout.tone} className="mt-8" />
        </div>
        {figure}
      </div>
    </CmsSection>
  );
}
