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
    <section
      ref={ref}
      className="py-20 md:py-28 px-5 sm:px-6 md:px-8"
      style={{ background: "#EAE2D7" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 sm:mb-4"
            style={{ color: "#a07c1f" }}
          >
            Bhurban · Murree
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: "#2b2b2b" }}
          >
            Stay at Our Resort Hotel in Bhurban, Murree
          </motion.h2>

          
        </div>

        {/* Intro paragraphs */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-14 space-y-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed"
            style={{ color: "#6b6357" }}
          >
            Himalaya Villas and Resort Hotel is located in Bhurban, a well-known
            mountain destination in the Murree region. Our location provides a
            relaxing setting for guests who want comfortable accommodation while
            exploring the surrounding hills and nearby attractions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed"
            style={{ color: "#6b6357" }}
          >
            Visitors travelling from Islamabad, Rawalpindi, and other cities can
            plan short stays, family visits, and private gatherings at the
            property.
          </motion.p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[250px] gap-3 md:gap-4">
          {images.map((img, i) => {
            let responsiveClassName = img.className;

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
                transition={{ duration: 0.6, delay: 0.55 + i * 0.12 }}
                className={`${responsiveClassName} relative overflow-hidden rounded-lg group`}
                style={{ border: "1px solid rgba(201, 162, 74, 0.25)" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />

                {/* Soft gold vignette on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(201, 162, 74, 0.15), transparent 60%)",
                  }}
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