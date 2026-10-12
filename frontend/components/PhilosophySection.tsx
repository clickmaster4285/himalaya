"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const philosophyImages = [
  "/assets/philosophy-1.jpg",
  "/assets/philosophy-2.jpg",
  "/assets/philosophy-3.jpg",
  "/assets/philosophy-4.jpg",
  "/assets/philosophy-5.jpg",
  // "/assets/gallery-interior.jpg",
  // "/assets/philosophy-interior.jpg",
];

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imgIndex, setImgIndex] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % philosophyImages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrollingDown(currentY > lastScrollY.current);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="bg-background py-24 md:py-36 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Text Content */}
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-primary"
          >
            Luxury Hotels in Murree
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] text-foreground"
          >
          Experience Comfort and Hospitality in Bhurban, Murree
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`w-full h-[2px] bg-primary ${scrollingDown ? "origin-left" : "origin-right"}`}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg"
          >
Himalaya Villas and Resort Hotel combines comfortable accommodation, mountain surroundings, and spaces for private gatherings. Our resort hotel welcomes guests for personal stays, family trips, business visits, and special occasions, with different booking options available at one property.
         
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg"
          >

         From individual rooms and apartments to complete private villas, guests can choose the space and privacy they need. We also accommodate weddings, family celebrations, and corporate gatherings, bringing accommodation and event arrangements together in Bhurban.
          </motion.p>

         

<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, delay: 0.85 }}
  className="grid gap-8 pt-4 sm:grid-cols-1 md:grid-cols-3 md:gap-6"
>
  <div className="space-y-2 border-t border-primary/20 pt-6">
    <h3 className="font-display text-xl font-normal text-foreground">Comfortable Accommodation</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      Choose from furnished rooms, spacious suites, apartments, and complete villas suited to different guest requirements.
    </p>
  </div>
  <div className="space-y-2 border-t border-primary/20 pt-6">
    <h3 className="font-display text-xl font-normal text-foreground">Private Family &amp; Group Stays</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      Enjoy multiple bedrooms, shared living areas, and the privacy of complete villa accommodation.
    </p>
  </div>
  <div className="space-y-2 border-t border-primary/20 pt-6">
    <h3 className="font-display text-xl font-normal text-foreground">Weddings &amp; Special Events</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      Arrange wedding ceremonies, family celebrations, and corporate gatherings with accommodation options for your guests.
    </p>
  </div>
</motion.div>
        </div>

        {/* Right: Rotating Images */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="overflow-hidden rounded-sm shadow-2xl relative h-[500px] md:h-[600px] lg:h-[650px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={imgIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <Image
                  src={philosophyImages[imgIndex]}
                  alt="Himalaya Villas & Resorts luxury experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Decorative accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-sm -z-10"
          />
        </motion.div>
      </div>

    {/* Centered Button */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, delay: 1 }}
  className="flex justify-center mt-16 md:mt-20"
>
  <Link
    href="/villas"
    className="inline-flex items-center gap-2 rounded-md border border-[#c9a24a] bg-[#fdfaf3] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf]"
  >
   Discover Our Property
    <span aria-hidden>→</span>
  </Link>
</motion.div>
    </section>
  );
};

export default PhilosophySection;