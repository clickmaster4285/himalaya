'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const ReserveSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-[#F3EEE3] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs font-semibold tracking-widest uppercase text-amber-600"
        >
          Help & Support
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-foreground"
        >
          Need Help Choosing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
        >
          Our concierge team is available 24/7 to help you select the perfect villa for your stay and customize your experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10"
        >
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReserveSection;
