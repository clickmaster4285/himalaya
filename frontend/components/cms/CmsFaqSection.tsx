// components/cms/CmsFaqSection.tsx
// ERP "faq": the site's Radix accordion, styled like FAQSection, plus
// FAQPage structured data (JSON escaped so ERP text can't close the script).
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import CmsFaqAccordion from "./CmsFaqAccordion";
import type { SectionLayout } from "./cmsContent";

type Item = { question: string; answer: string };

export default function CmsFaqSection({
  data,
  layout,
}: {
  data: { eyebrow?: string; heading: string; description?: string; items: Item[] };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <CmsSection layout={{ ...layout, width: layout.width === "full" || layout.width === "superWide" ? "wide" : layout.width }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} description={data.description} tone={layout.tone} align="left" />
        </div>
        <div className={cn("lg:w-2/3", t.heading)}>
          <CmsFaqAccordion items={data.items} onDark={t.onDark} />
        </div>
      </div>
    </CmsSection>
  );
}
