// components/cms/CmsRichTextSection.tsx
// ERP "richText" / "customContent": sanitized HTML in an editorial column.
import CmsRichText from "./CmsRichText";
import CmsSection, { toneText } from "./CmsSection";
import { DisplayHeading } from "./CmsSectionHeading";
import type { SectionLayout } from "./cmsContent";

export default function CmsRichTextSection({
  data,
  layout,
}: {
  data: { heading?: string; html: string };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  const column = layout.width === "wide" || layout.width === "superWide" || layout.width === "full" ? "max-w-5xl" : "max-w-3xl";
  return (
    <CmsSection layout={layout}>
      <div className={`mx-auto ${column}`}>
        {data.heading && <DisplayHeading text={data.heading} tone={layout.tone} className="text-3xl md:text-5xl mb-8" />}
        <CmsRichText html={data.html} onDark={t.onDark} />
      </div>
    </CmsSection>
  );
}
