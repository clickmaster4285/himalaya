'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";

const ReserveSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section  id="reserve-section" ref={ref} className="relative bg-[#F3EEE3] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs font-semibold tracking-widest uppercase text-amber-600"
        >
          Reserve Your Stay
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-foreground"
        >
          Book Your Stay at Himalaya Villas &amp; Resort
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
        >
          Whether you were searching for top hotels in Murree, luxury hotels in Murree, or simply a low price hotel in Murree with real comfort, Himalaya Villas &amp; Resort brings all of it together — panoramic views, private villas, and genuine hospitality in the heart of Bhurban. Our concierge team is available 24/7 to help you choose the right room and plan your stay.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
         <a
  id="contact_us"
  href={buildWhatsAppBookingUrl()}
  target="_blank"
  rel="noopener noreferrer"
  data-event-type="check_availability_click"
  onClick={(e) =>
    trackAndOpen(
      e,
      buildWhatsAppBookingUrl(),
      {
        button: "check_availability",
        cta: "reserve_section",
      }
    )
  }
  className="inline-flex items-center justify-center rounded-sm border border-border bg-foreground px-6 py-3 text-sm font-medium tracking-wide text-background transition-colors duration-300 hover:bg-foreground/90 w-full sm:w-auto"
>
  Check Availability Now
</a>
         <a
  href={buildWhatsAppBookingUrl()}
  target="_blank"
  rel="noopener noreferrer"
  data-event-type="contact_us_click"
  onClick={(e) =>
    trackAndOpen(
      e,
      buildWhatsAppBookingUrl(),
      {
        button: "contact_us",
        cta: "reserve_section",
      }
    )
  }
  className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background w-full sm:w-auto"
>
  Contact Us on WhatsApp
</a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReserveSection;
