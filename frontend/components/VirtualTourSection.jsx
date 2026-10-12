"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

/* ---------- Image constants (swap with your own) ---------- */
const tourImages = [
  "/assets/virtual-tour-1.jpg",
  "/assets/virtual-tour-2.jpg",
  "/assets/virtual-tour-3.jpg",
  "/assets/virtual-tour-4.jpg",
];

/* ---------- Collections you can explore in the tour ---------- */
const tourCollections = [
  {
    label: "Himalaya Apartments",
    description:
      "Warm apartments with mountain-facing windows and separate living areas.",
    href: "/villas?collection=apartments",
  },
  {
    label: "Rakaposhi Villa",
    description:
      "Executive rooms and full-villa options for groups and families.",
    href: "/villas?collection=rakaposhi",
  },
  {
    label: "Himalaya Luxury Villas",
    description:
      "Flagship residences ranging from cozy attic rooms to complete four-bedroom villas.",
    href: "/villas?collection=luxury",
  },
];

const VirtualTourSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % tourImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-8 md:px-16 overflow-hidden"
      style={{ background: "hsl(160 15% 12%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--primary))" }}
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
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-4"
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
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "hsl(0 0% 60%)" }}
          >
            Explore Himalaya Apartments, Rakaposhi Villa, and Himalaya Luxury
            Villas to see the available spaces and choose accommodation that
            meets your requirements.
          </motion.p>
        </div>

        {/* Featured Tour Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-14 md:mb-16"
          style={{ border: "1px solid hsl(0 0% 100% / 0.08)" }}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={imgIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              >
                <Image
                  src={tourImages[imgIndex]}
                  alt="Himalaya Villas virtual tour preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(160 15% 12% / 0.85) 0%, hsl(160 15% 12% / 0.25) 55%, hsl(160 15% 12% / 0.35) 100%)",
              }}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ background: "hsl(var(--primary) / 0.35)" }}
                />
                <Link
                  href="/virtual-tour"
                  aria-label="Take a virtual tour"
                  className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full backdrop-blur-sm transition-colors duration-300 hover:bg-primary/30"
                  style={{
                    background: "hsl(var(--primary) / 0.18)",
                    border: "1px solid hsl(var(--primary) / 0.55)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <Play className="w-7 h-7 md:w-9 md:h-9 ml-1" fill="currentColor" />
                </Link>
              </motion.div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex items-end justify-between gap-4">
              <div>
                <p
                  className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Virtual Walkthrough
                </p>
                <p
                  className="font-display text-xl md:text-2xl"
                  style={{ color: "hsl(0 0% 95%)" }}
                >
                  A first look at the estate
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16">
          {tourCollections.map((collection, index) => (
            <motion.div
              key={collection.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group rounded-xl p-6 transition-colors duration-300 hover:bg-white/[0.04]"
              style={{
                background: "hsl(160 15% 15% / 0.55)",
                border: "1px solid hsl(0 0% 100% / 0.06)",
              }}
            >
              <p
                className="text-xs font-mono tracking-[0.2em] mb-3"
                style={{ color: "hsl(var(--primary))" }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display text-lg md:text-xl font-normal leading-snug mb-2 transition-colors duration-300 group-hover:text-primary"
                style={{ color: "hsl(0 0% 92%)" }}
              >
                {collection.label}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "hsl(0 0% 58%)" }}
              >
                {collection.description}
              </p>
              <Link
                href={collection.href}
                className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "hsl(var(--primary))" }}
              >
                View Collection
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center"
        >
          <Link
            href="/virtual-tour"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300"
            style={{
              border: "1px solid hsl(var(--primary) / 0.5)",
              background: "hsl(var(--primary) / 0.08)",
              color: "hsl(var(--primary))",
            }}
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