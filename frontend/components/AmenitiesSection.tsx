"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const amenityImages = [
  "/assets/philosophy-4.jpg",
  "/assets/retreat.jpg",
  "/assets/dining.jpg",
  "/assets/outdoor-celebrations.jpg",
  "/assets/gallery-balcony.jpg",

];

const amenities = [
  { 
    title: "Panoramic Himalayan Views", 
    desc: "Breathtaking scenery surrounding the private estate." 
  },
  { 
    title: "Luxury Designer Interiors", 
    desc: "Elegant spaces designed for comfort and sophistication." 
  },
  { 
    title: "Gourmet Dining", 
    desc: "Exceptional culinary experiences for guests and events." 
  },
  { 
    title: "Outdoor Celebration Spaces", 
    desc: "Perfect settings for weddings and private gatherings." 
  },
  { 
    title: "Corporate Retreat Facilities", 
    desc: "Private venue for executive meetings and retreats." 
  },
];

// Navigation Item Component
function NavItem({
  title,
  index,
  total,
  active,
  scrollYProgress,
  onClick,
}: {
  title: string;
  index: number;
  total: number;
  active: boolean;
  scrollYProgress: any;
  onClick: () => void;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fill = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);

  return (
    <li className="border-b border-border/40">
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left py-5 flex items-center gap-4 group"
      >
        <span
          className={`inline-block w-2.5 h-2.5 transition-colors duration-300 ${
            active ? "bg-accent" : "bg-muted-foreground/40"
          }`}
        />
        <span
          className={`text-lg md:text-xl transition-colors duration-300 ${
            active
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground/80"
          }`}
        >
          {title}
        </span>
      </button>
      <div className="relative h-px bg-border/40 -mt-px">
        <motion.div
          style={{ width: active ? fill : "0%" }}
          className="absolute left-0 top-0 h-px bg-accent transition-all duration-300"
        />
      </div>
    </li>
  );
}

const AmenitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track which item is active based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(amenities.length - 1, Math.floor(v * amenities.length));
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative !bg-[#EAE2D7]"
      style={{ height: `${amenities.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full px-8 md:px-16">
          
          {/* Header at top */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[60px] md:text-[60px] italic text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              Refined Amenities
            </motion.h2>
          </div>

          {/* Points on Left, Images on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Points List */}
            <div>
              <ul className="space-y-0">
                {amenities.map((amenity, i) => (
                  <NavItem
                    key={amenity.title}
                    title={amenity.title}
                    index={i}
                    total={amenities.length}
                    active={i === active}
                    scrollYProgress={scrollYProgress}
                    onClick={() => {
                      const el = sectionRef.current;
                      if (!el) return;
                      const top =
                        el.offsetTop +
                        (el.offsetHeight - window.innerHeight) * (i / amenities.length) +
                        10;
                      window.scrollTo({ top, behavior: "smooth" });
                    }}
                  />
                ))}
              </ul>

              {/* Description below points */}
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={amenities[active].title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed"
                  >
                    {amenities[active].desc}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Image - Changes on scroll */}
            <div className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden border border-border p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={amenities[active].title}
                  className="absolute inset-0 p-3"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={amenityImages[active % amenityImages.length]}
                    alt={amenities[active].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;