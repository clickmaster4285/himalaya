"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const images = [
  { src: "/assets/journal-1.jpg", alt: "Grand staircase", className: "col-span-1 row-span-1" },
  { src: "/assets/journal-group-new.jpg", alt: "Group at the resort", className: "col-span-1 row-span-1" },
  { src: "/assets/journal-bonfire.jpg", alt: "Bonfire night", className: "col-span-1 row-span-2" },
  { src: "/assets/journal-4.jpg", alt: "Outdoor terrace", className: "col-span-2 row-span-1" },
];

const JournalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 !bg-[#EAE2D7]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-[60px] italic text-foreground mb-6 md:mb-12 text-center md:text-left"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          The Journal
        </motion.h2>

        {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[250px] gap-3 md:gap-4">
          {images.map((img, i) => {
            // Adjust className based on screen size
            let responsiveClassName = img.className;
            
            // On mobile, override complex grid placements to simple spans
            if (img.className.includes("row-span-2")) {
              responsiveClassName = "sm:row-span-2 col-span-1";
            }
            if (img.className.includes("col-span-2")) {
              responsiveClassName = "sm:col-span-2 col-span-1";
            }
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`${responsiveClassName} relative overflow-hidden rounded-sm group`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;