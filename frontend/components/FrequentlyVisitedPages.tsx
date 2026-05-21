'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FrequentlyVisitedPages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pages = [
    {
      title: "Things to Do in Murree 2026",
      description:
        "Complete Murree activities guide — Kashmir Point at dawn, Mall Road, Patriata, Nathiagali day trips, and why every experience is better from Himalaya Villas Bhurban.",
      href: "/things-to-do-in-murree",
    },
    {
      title: "Murree in Winter — Snow Activities",
      description:
        "Private snow walks, bonfire evenings, sledging, and Patriata in snow — the winter guide from Himalaya Villas Bhurban without the Expressway queue.",
      href: "/things-to-do-in-murree-in-winter",
    },
    {
      title: "Family Things to Do in Murree",
      description:
        "Kid-friendly guide — Patriata, Ayubia, Sozo, horse riding, and private villa grounds. Family packages from PKR 80,000 at Himalaya Villas Bhurban.",
      href: "/family-things-to-do-murree",
    },
    {
      title: "Best Restaurants in Murree",
      description:
        "Dining guide — Mall Road street food, PC Bhurban, and in-villa chef meals on a private mountain terrace at Himalaya Villas.",
      href: "/best-restaurants-murree",
    },
    {
      title: "Places to Visit Near Murree",
      description:
        "Day trips to Nathiagali, Ayubia, Patriata, and the Galliyat — one Bhurban base, no hotel changes between destinations.",
      href: "/places-to-visit-near-murree",
    },
    {
      title: "Outdoor Activities in Murree",
      description:
        "Miranjani hike, forest trails from the gate, Bhurban golf, jeep safaris — adventure base at Himalaya Villas Bhurban.",
      href: "/outdoor-activities-murree",
    },
    {
      title: "Murree for Couples",
      description:
        "Kashmir Point at dawn, private bonfire, terrace dining — romantic guide from Himalaya Villas with couples packages from PKR 55,000.",
      href: "/things-to-do-in-murree-for-couples",
    },
    {
      title: "Murree at Night",
      description:
        "Mall Road evenings, terrace stargazing, private bonfire — the after-dark guide most day-trippers never experience from Bhurban.",
      href: "/things-to-do-in-murree-at-night",
    },
    {
      title: "Murree 3-Day Itinerary",
      description:
        "Day-by-day plan from Himalaya Villas — Murree town, Miranjani, Patriata, packing list, and timing that avoids the Expressway rush.",
      href: "/murree-3-day-itinerary",
    },
    {
      title: "Things to Do in Bhurban",
      description:
        "Golf, forest trails from the gate, terrace views — why Bhurban beats Murree town as your base for the full hills.",
      href: "/things-to-do-bhurban-murree",
    },
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
