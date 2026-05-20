'use client';

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildWhatsAppAvailabilityUrl, buildWhatsAppBookingUrl } from "@/lib/whatsapp";

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
          Our concierge team is available 24/7 to help you choose villas in bhurban murree — suites or the full estate —
          and tailor dining, events, and travel from Islamabad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/book/stay"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-neutral-800"
          >
            Book your stay
          </Link>
          <a
            href={buildWhatsAppAvailabilityUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-border bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:bg-neutral-50"
          >
            Check availability
          </a>
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-700"
          >
            WhatsApp us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:bg-foreground hover:text-background"
          >
            Contact us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReserveSection;
