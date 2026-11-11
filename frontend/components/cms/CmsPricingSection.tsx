// components/cms/CmsPricingSection.tsx
// ERP "pricing": package cards in the corporate/murree-packages style.
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { CmsButton } from "./CmsButton";
import type { CmsLink, SectionLayout } from "./cmsContent";

type Item = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta?: CmsLink;
  featured: boolean;
};

export default function CmsPricingSection({
  data,
  layout,
}: {
  data: { eyebrow?: string; heading?: string; description?: string; items: Item[] };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  const cols = data.items.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : data.items.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "max-w-md mx-auto";
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} description={data.description} tone={layout.tone} />
      <div className={cn("grid gap-6 md:gap-8 items-stretch", cols)}>
        {data.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "relative flex flex-col rounded-sm p-8",
              t.card,
              item.featured && "border-2 !border-[#c9a55b] shadow-lg",
            )}
          >
            {item.featured && (
              <span className="absolute -top-3 left-8 bg-[#c9a55b] px-3 py-1 text-[10px] font-semibold tracking-[0.25em] uppercase text-white">
                Recommended
              </span>
            )}
            <h3 className={cn("font-display text-2xl md:text-3xl font-normal", t.heading)}>{item.name}</h3>
            {item.price && (
              <p className="mt-4">
                <span className="font-display text-4xl text-[#c9a55b]">{item.price}</span>
                {item.period && <span className={cn("ml-1 text-sm", t.body)}>{item.period}</span>}
              </p>
            )}
            {item.description && <p className={cn("mt-3 text-sm leading-relaxed", t.body)}>{item.description}</p>}
            {item.features.length > 0 && (
              <ul className="mt-6 space-y-3 flex-1">
                {item.features.map((feature, f) => (
                  <li key={f} className={cn("flex items-start gap-2 text-sm", t.body)}>
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a55b]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {item.cta && (
              <div className="mt-8 [&>*]:w-full">
                <CmsButton cta={item.cta} tone={layout.tone} variant={item.featured ? "primary" : "secondary"} />
              </div>
            )}
          </div>
        ))}
      </div>
    </CmsSection>
  );
}
