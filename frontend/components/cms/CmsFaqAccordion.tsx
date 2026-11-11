"use client";
// components/cms/CmsFaqAccordion.tsx — client accordion for CmsFaqSection.
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function CmsFaqAccordion({
  items,
  onDark,
}: {
  items: { question: string; answer: string }[];
  onDark: boolean;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className={onDark ? "border-white/15" : "border-[#eadfce]"}>
          <AccordionTrigger className="text-left text-base lg:text-lg font-normal hover:no-underline hover:text-[#c9a55b] py-6 transition-colors">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className={cn("text-sm lg:text-base leading-relaxed pb-6 whitespace-pre-line", onDark ? "text-white/70" : "text-[#5c564c]")}>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
