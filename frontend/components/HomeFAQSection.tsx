"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const homeFaqs = [
  {
    q: "Where is Himalaya Villas and Resort Hotel located?",
    a: "Himalaya Villas and Resort Hotel is located in Bhurban, Murree, Pakistan. Guests can stay at the property while visiting Bhurban and exploring nearby attractions in the Murree region.",
  },
  {
    q: "Is Himalaya Villas and Resort Hotel suitable for families?",
    a: "Yes. We offer different accommodation options for families, including individual rooms, suites, a complete two-bedroom apartment, and private villas with multiple bedrooms.",
  },
  {
    q: "What accommodation options are available?",
    a: "Guests can choose luxury rooms, executive rooms, suites, apartments, and complete villas across our three accommodation collections: Himalaya Apartments, Rakaposhi Villa, and Himalaya Luxury Villas.",
  },
  {
    q: "Can I book a single room without booking an entire villa?",
    a: "Yes. Guests can book individual luxury rooms, executive rooms, and suites, subject to availability.",
  },
  {
    q: "Can I book a complete private villa?",
    a: "Yes. Rakaposhi Villa and Himalaya Luxury Villas offer complete-villa booking options for families and groups who prefer additional space and privacy.",
  },
  {
    q: "How many people can stay in a complete villa?",
    a: "Guest capacity depends on the selected villa and its bedroom configuration. Contact our team with your group size to confirm the available accommodation and sleeping arrangements.",
  },
  {
    q: "Does Himalaya Villas and Resort Hotel offer dining arrangements?",
    a: "Guests can enquire about available dining services and meal arrangements. Breakfast inclusions and additional dining charges should be confirmed when making a reservation.",
  },
  {
    q: "Can I arrange a wedding or private event at the property?",
    a: "Yes. Our property accommodates weddings, nikah ceremonies, family celebrations, corporate gatherings, and other private events, subject to venue availability and event requirements.",
  },
  {
    q: "What is the difference between an individual room and a complete villa booking?",
    a: "An individual room booking provides accommodation in your selected room or suite. A complete villa booking provides exclusive use of the booked villa, including its bedrooms and designated shared living spaces.",
  },
  {
    q: "How can I check accommodation prices and availability?",
    a: "Contact our reservations team with your check-in and check-out dates, number of guests, and preferred accommodation to confirm current rates and availability.",
  },
  {
    q: "Can I view the property before booking?",
    a: "Yes. Visit our Virtual Tour page to explore our accommodation collections, room interiors, and property surroundings before booking.",
  },
  {
    q: "How do I make a reservation?",
    a: "Select your accommodation, provide your travel dates and guest requirements, and contact our team through the website or WhatsApp to confirm your booking.",
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
