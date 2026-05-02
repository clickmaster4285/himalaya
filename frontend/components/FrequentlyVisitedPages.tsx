'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FrequentlyVisitedPages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pages = [
    {
      title: "Himalaya Villas Bhurban Murree Rest House",
      description: "Pakistan's premier luxury rest house - private mountain villas with panoramic Himalayan views and personalized butler service.",
      href: "/himalaya-villas-bhurban-murree-rest-house"
    },
    {
      title: "Luxury Hotel in Murree",
      description: "Experience premium hospitality, scenic mountain views, and world-class amenities in the heart of Murree.",
      href: "/luxury-hotels-in-muree"
    },
    {
      title: "Best Hotels in Murree Pakistan",
      description: "Discover the finest luxury accommodations and premium hospitality experiences in Murree's scenic hills.",
      href: "/best-hotels-murree-pakistan"
    },
    {
      title: "Family Tour Murree",
      description: "Plan the perfect family getaway with our curated experiences and family-friendly villa accommodations.",
      href: "/family-tour-murree-himalaya-villas"
    },
    {
      title: "Wedding Venue Near Islamabad",
      description: "Host your dream wedding in the mountains with breathtaking venues and luxury accommodations.",
      href: "/wedding-venue-near-islamabad"
    },
    {
      title: "Snowfall in Murree",
      description: "Complete snowfall guide with calendar, weather forecast, and winter stay packages.",
      href: "/snowfall-in-murree"
    }
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
            Popular Pages
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-foreground">
            Frequently Visited Pages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.1 }}
            >
              <Link 
                href={page.href}
                className="block h-full p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 group/card border border-border bg-card hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover/card:text-primary">
                  {page.title}
                </h3>
                <p className="text-sm mt-3 leading-relaxed text-muted-foreground">
                  {page.description}
                </p>
                <span className="inline-block mt-4 text-xs uppercase tracking-widest text-primary transition-colors group-hover/card:text-primary/80">
                  Explore →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyVisitedPages;
