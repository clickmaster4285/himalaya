"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const images = [
  { src: "/assets/philosophy-2.jpg", alt: "Grand staircase", className: "col-span-1 row-span-1" },
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
          className="text-3xl sm:text-4xl md:text-[48px] italic text-foreground mb-6 md:mb-8 text-center md:text-left leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          Location — Close to Murree Mall Road, Away from the Crowd
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-8 md:mb-12 text-center md:text-left"
        >
          Himalaya Villas &amp; Resort is located in Bhurban, just a short scenic drive from Murree Mall Road, giving you the best of both worlds — quick access to Murree&apos;s markets, viewpoints, and street food, and the peace of a private estate once you&apos;re back at the resort. If you&apos;re searching for the best hotel in Murree near Mall Road but don&apos;t want to compromise on privacy or parking hassle, Bhurban&apos;s quieter setting is often the better choice for families and couples alike.
        </motion.p>

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