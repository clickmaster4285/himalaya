// components/cms/CmsTextSection.tsx
// ERP "text": heading + plain body. Body is rendered as text (never HTML);
// blank lines split it into paragraphs.
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { CmsButtons } from "./CmsButton";
import type { CmsLink, SectionLayout } from "./cmsContent";

type CmsTextData = { eyebrow?: string; heading?: string; body?: string; cta?: CmsLink; secondaryCta?: CmsLink };

export default function CmsTextSection({ data, layout }: { data: CmsTextData; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  const paragraphs = (data.body ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const centered = layout.layout !== "left";

  return (
    <CmsSection layout={{ ...layout, width: layout.width === "wide" ? "default" : layout.width }}>
      <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} tone={layout.tone} align={centered ? "center" : "left"} />
        {paragraphs.map((p, i) => (
          <p key={i} className={`text-sm md:text-base leading-relaxed whitespace-pre-line mt-4 first:mt-0 ${t.body}`}>
            {p}
          </p>
        ))}
        <CmsButtons
          primary={data.cta}
          secondary={data.secondaryCta}
          tone={layout.tone}
          align={centered ? "center" : "start"}
          className="mt-10"
        />
      </div>
    </CmsSection>
  );
}
