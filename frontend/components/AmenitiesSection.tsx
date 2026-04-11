"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const amenityImages = [
  "/assets/amenities-interior-real.jpg",
  "/assets/gallery-interior.jpg",
  "/assets/gallery-sunlight.jpg",
  "/assets/gallery-dining-night.jpg",
  "/assets/gallery-balcony.jpg",
  "/assets/philosophy-interior.jpg",
];

const amenities = [
  { title: "Panoramic Himalayan Views", desc: "Breathtaking scenery surrounding the private estate." },
  { title: "Luxury Designer Interiors", desc: "Elegant spaces designed for comfort and sophistication." },
  { title: "Gourmet Dining", desc: "Exceptional culinary experiences for guests and events." },
  { title: "Outdoor Celebration Spaces", desc: "Perfect settings for weddings and private gatherings." },
  { title: "Corporate Retreat Facilities", desc: "Private venue for executive meetings and retreats." },
];

const AmenitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % amenityImages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-8 md:px-16 !bg-[#EAE2D7]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[60px] md:text-[60px] italic text-foreground mb-16"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          Refined Amenities
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image - rotating */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 relative overflow-hidden border border-border p-3"
          >
            <div className="overflow-hidden relative h-[350px] md:h-[450px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={imgIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Image
                    src={amenityImages[imgIndex]}
                    alt="Luxury amenities"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Amenity List */}
          <div className="lg:col-span-2 space-y-0">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="group cursor-default"
              >
                <div className="py-5 transition-colors duration-300 border-b border-border text-right">
                  <span className="font-body text-lg md:text-xl tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                    {amenity.title}
                  </span>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 font-body">
                    {amenity.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
