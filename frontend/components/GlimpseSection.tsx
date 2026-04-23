"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const glimpses = [
  { src: "/assets/gallery-interior.jpg", label: "The Lounge", subtitle: "Where comfort meets the clouds" },
  { src: "/assets/gallery-balcony.jpg", label: "The Terrace", subtitle: "Morning views that silence the mind" },
  { src: "/assets/gallery-sunlight.jpg", label: "Golden Hour", subtitle: "When the mountains paint themselves" },
  { src: "/assets/gallery-exterior.jpg", label: "The Villa", subtitle: "Built to belong to the hillside" },
  { src: "/assets/gallery-reflection.jpg", label: "Reflections", subtitle: "Every window tells a story" },
  { src: "/assets/gallery-garden.jpg", label: "The Garden", subtitle: "Nature, curated but never tamed" },
  { src: "/assets/gallery-dining-night.jpg", label: "Night Dining", subtitle: "Stars above, stories below" },
  { src: "/assets/gallery-bbq.jpg", label: "Live Grill", subtitle: "Fire, flavour, and mountain air" },
];

const GlimpseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardInteraction = (index: number) => {
    if (isMobile) {
      // On mobile: toggle - if clicking same card, do nothing or close?
      // Here it will set the clicked card as active
      setActiveIndex(index);
    } else {
      // On desktop: hover
      setActiveIndex(index);
    }
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-20"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground font-body mb-3 sm:mb-4">
            A Journey of Senses
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal italic text-foreground">
            Glimpses of the Retreat
          </h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-xs sm:text-sm md:text-base font-body max-w-lg mx-auto px-4">
            Every corner holds a moment worth remembering
          </p>
          {/* Mobile instruction */}
          {isMobile && (
            <p className="mt-4 text-xs text-muted-foreground/70 animate-pulse">
              Tap on any image to explore
            </p>
          )}
        </motion.div>

        {/* Expandable Cards - Same layout for all screen sizes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex gap-1.5 sm:gap-2 md:gap-3 h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px] xl:h-[580px]"
        >
          {glimpses.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                className="relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer min-w-0"
                animate={{
                  flex: isActive ? 4 : 0.5,
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => handleCardInteraction(i)}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setActiveIndex(i);
                  }
                }}
                onTouchStart={() => {
                  if (isMobile) {
                    handleCardInteraction(i);
                  }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, hsl(220 20% 8% / 0.8) 0%, transparent 50%)"
                      : "hsl(220 20% 8% / 0.45)",
                  }}
                />

                {/* Collapsed Label - Vertical text for non-active cards */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className="font-display text-xs sm:text-sm md:text-base lg:text-lg font-normal tracking-wider whitespace-nowrap"
                        style={{
                          color: "hsl(0 0% 100% / 0.9)",
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Content - Shown only for active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8"
                    >
                      <h3
                        className="font-display text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal italic"
                        style={{ color: "hsl(0 0% 100% / 0.95)" }}
                      >
                        {item.label}
                      </h3>
                      <p
                        className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm lg:text-base font-body"
                        style={{ color: "hsl(0 0% 100% / 0.7)" }}
                      >
                        {item.subtitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default GlimpseSection;