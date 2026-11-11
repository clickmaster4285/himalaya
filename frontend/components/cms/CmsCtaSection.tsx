// components/cms/CmsCtaSection.tsx
// ERP "cta": the ReserveSection band (sand background, centred Cormorant
// heading). ERP buttons link where the ERP says; they never replace the
// site's own booking buttons or tracking.
import CmsSection, { toneText } from "./CmsSection";
import { DisplayHeading, Eyebrow } from "./CmsSectionHeading";
import { CmsButtons } from "./CmsButton";
import type { CmsLink, SectionLayout } from "./cmsContent";

type Data = { eyebrow?: string; heading: string; description?: string; cta?: CmsLink; secondaryCta?: CmsLink };

export default function CmsCtaSection({ data, layout }: { data: Data; layout: SectionLayout }) {
  const t = toneText(layout.tone);
  return (
    <CmsSection layout={{ ...layout, width: "default" }} defaultPadding="py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        {data.eyebrow && <Eyebrow text={data.eyebrow} tone={layout.tone} className="mb-4" />}
        <DisplayHeading text={data.heading} tone={layout.tone} className="text-4xl md:text-5xl lg:text-6xl" />
        {data.description && (
          <p className={`mt-6 text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${t.body}`}>{data.description}</p>
        )}
        <CmsButtons primary={data.cta} secondary={data.secondaryCta} tone={layout.tone} align="center" className="mt-10" />
      </div>
    </CmsSection>
  );
}
