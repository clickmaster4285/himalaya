"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { faqData } from "@/lib/faq-data";

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[hsl(160,15%,12%)] text-[hsl(0,0%,95%)] relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
        
        {/* Categories Sidebar */}
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="sticky top-32">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[hsl(var(--primary))]">
              Frequently Asked Questions
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-normal leading-tight mb-8">
              What to Expect at <span className="italic text-[hsl(var(--primary))]">Himalaya Villas</span>
            </h2>
            <div className="space-y-2 hidden lg:block">
              {faqData.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 text-sm font-medium tracking-wide ${
                    activeCategory === index
                      ? "bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)] border"
                      : "text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] hover:bg-[hsl(0,0%,15%)] border border-transparent"
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </div>
            {/* Mobile / Tablet dropdown */}
            <div className="lg:hidden mt-6 relative">
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(Number(e.target.value))}
                className="w-full bg-[hsl(160,15%,10%)] border border-[hsl(160,15%,20%)] text-[hsl(0,0%,95%)] rounded-md px-4 py-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
              >
                {faqData.map((section, index) => (
                  <option key={index} value={index}>{section.category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Questions Accordion */}
        <div className="w-full lg:w-2/3">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-display mb-6 border-b border-[hsl(160,15%,20%)] pb-4 text-[hsl(var(--primary))]">
              {faqData[activeCategory].category}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqData[activeCategory].questions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-[hsl(160,15%,20%)]">
                  <AccordionTrigger className="text-left text-base lg:text-lg font-normal hover:text-[hsl(var(--primary))] py-6 transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(0,0%,60%)] text-sm lg:text-base leading-relaxed pb-6">
                    <p>{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
