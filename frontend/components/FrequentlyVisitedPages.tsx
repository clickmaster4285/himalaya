'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";

const FrequentlyVisitedPages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groupSizes = [
    {
      title: "Individual Guests & Couples",
      description: "Comfortable rooms and suites for personal stays.",
    },
    {
      title: "Small Families",
      description: "Two-bedroom apartment accommodation with shared living space.",
    },
    {
      title: "Large Families",
      description: "Complete villa options with multiple bedrooms.",
    },
    {
      title: "Group Gatherings",
      description: "Accommodation arrangements for families, friends, and event guests.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-8 md:px-16"
      style={{ background: "#EAE2D7" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#a07c1f" }}
          >
            For Every Guest
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: "#2b2b2b" }}
          >
            Accommodation for Every Group Size
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-[2px] mx-auto mt-6"
            style={{ background: "#c9a24a" }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groupSizes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group rounded-xl p-6 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(31,51,82,0.18)] transition hover:-translate-y-0.5"
              style={{ border: "1px solid #ece5d3" }}
            >
              <p
                className="text-xs font-mono tracking-[0.2em] mb-3"
                style={{ color: "#a07c1f" }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display text-lg md:text-xl font-normal leading-snug mb-2 transition-colors duration-300 group-hover:text-[#a07c1f]"
                style={{ color: "#2b2b2b" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6b6357" }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-event-type="book_now_click"
            onClick={(e) =>
              trackAndOpen(e, buildWhatsAppBookingUrl(), {
                button: "book_now",
                cta: "group_sizes_section",
              })
            }
            className="inline-flex items-center gap-2 rounded-md border border-[#c9a24a] bg-[#fdfaf3] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf]"
          >
            Check Family &amp; Group Availability
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FrequentlyVisitedPages;