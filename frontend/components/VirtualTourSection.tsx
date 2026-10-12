"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VirtualTourSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-8 md:px-16"
      style={{ background: "hsl(160 15% 12%)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm text-primary tracking-[0.3em] uppercase mb-4"
        
        >
          Virtual Tour
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6"
          style={{ color: "hsl(0 0% 95%)" }}
        >
          Explore Our Property Before Your Stay
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-[2px] mx-auto mb-6"
          style={{ background: "hsl(var(--primary))" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base md:text-lg leading-relaxed mb-4"
          style={{ color: "hsl(0 0% 60%)" }}
        >
          Discover Himalaya Villas and Resort Hotel through our virtual tour.
          View the accommodation collections, room interiors, living spaces,
          and outdoor surroundings to get a better understanding of the
          property before making a reservation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base md:text-lg leading-relaxed"
          style={{ color: "hsl(0 0% 60%)" }}
        >
          Explore Himalaya Apartments, Rakaposhi Villa, and Himalaya Luxury
          Villas to see the available spaces and choose accommodation that
          meets your requirements.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <Link
            href="/virtual-tour"
            className="inline-flex bg-primary items-center gap-2 rounded-md px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300"
          
          >
            Take a Virtual Tour
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualTourSection;