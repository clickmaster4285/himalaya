'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";

const FrequentlyVisitedPages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const travellers = [
    {
      title: "Families",
      description: "Spacious apartments, complimentary breakfast, and a safe, gated property make us one of the most recommended family hotels in Murree.",
    },
    {
      title: "Couples",
      description: "Private terraces, mountain views, and quiet evenings, away from the crowded hotel strips.",
    },
    {
      title: "Wedding Planners & Event Hosts",
      description: "Cedar forest backdrops and dedicated event teams for weddings and celebrations.",
    },
    {
      title: "Corporate Groups",
      description: "A distraction-free environment for retreats and offsites.",
    },
    {
      title: "Budget-Conscious Travellers",
      description: "While we're positioned as a luxury hotel in Murree, our Executive Rooms starting at PKR 16,500/night make a premium mountain stay realistic even if you started your search looking for cheap hotels in Murree or a 3-star or 4-star hotel in Murree alternative.",
    },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">
            For Every Guest
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-foreground">
            A Stay for Every Traveller
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travellers.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.1 }}
              className="h-full p-6 rounded-xl border border-border bg-card"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm mt-3 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-event-type="book_now_click"
            onClick={(e) =>
              trackAndOpen(e, buildWhatsAppBookingUrl(), {
                button: "book_now",
                cta: "travellers_section",
              })
            }
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Book Your Stay on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FrequentlyVisitedPages;
