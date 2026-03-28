"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function VirtualExperienceSection() {
  const images = useMemo(
    () => [
      "/assets/gallery-interior.jpg",
      "/assets/gallery-dining-night.jpg",
      "/assets/gallery-sunlight.jpg",
      "/assets/gallery-balcony.jpg",
    ],
    [],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % images.length), 2200);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <img
            src={images[index]}
            alt="Virtual experience room"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 text-center">
        <h2
          className="font-display text-4xl md:text-6xl lg:text-7xl font-normal italic text-white"
          style={{ textShadow: "0 18px 55px rgba(0,0,0,0.55)" }}
        >
          Virtual Experience
        </h2>
      </div>
    </section>
  );
}

