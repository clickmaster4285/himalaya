"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const homeFaqs = [
  {
    q: "Which is the best hotel in Murree for a family trip?",
    a: "Himalaya Villas & Resort is well suited for families, thanks to our spacious apartments, gated and secure property, complimentary breakfast, and quiet, mountain-facing rooms away from crowded tourist strips.",
  },
  {
    q: "Are there any cheap hotels in Murree with good quality?",
    a: "Yes. While we're a luxury resort overall, our Rakaposhi Single Executive Room starts at PKR 16,500 per night, making it one of the more accessible options for travellers who still want a genuine luxury experience without the highest price tag.",
  },
  {
    q: "Does Himalaya Villas & Resort qualify as a 5-star hotel in Murree?",
    a: "Our Himalaya Luxury Villas collection — with designer interiors, private terraces, panoramic views, and curated dining — is built to match a 5-star experience, even though we operate as a private villa estate rather than a branded hotel chain.",
  },
  {
    q: "How far is Himalaya Villas & Resort from Murree Mall Road?",
    a: "We're located in Bhurban, a short scenic drive from Murree Mall Road — close enough for easy day trips into the market, but private and quiet enough to avoid the tourist crowd.",
  },
  {
    q: "Can I book a whole villa instead of a single room?",
    a: 'Yes. All three of our collections — Himalaya Apartments, Rakaposhi Villa, and Himalaya Luxury Villas — offer a "Complete Villa" option, ideal for large families or group celebrations.',
  },
];

export default function HomeFAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">FAQs</p>
          <h2 className="font-display text-4xl md:text-5xl font-normal leading-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {homeFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`home-faq-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-base md:text-lg font-normal hover:text-primary py-6 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
                  <p>{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
