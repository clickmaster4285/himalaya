"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const images = [
  "/assets/villa-alpine-real.jpg",
  "/assets/villa-presidential-real.jpg",
  "/assets/villa-honeymoon-real.jpg",
  "/assets/villa-exterior.jpg",
];

const VillasHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img src={images[index]} alt="Villa background" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20 text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          Our Villas
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-white/90">
          Each villa is a masterpiece of design and comfort, offering unparalleled views of the Himalayas and personalized luxury experiences.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="px-4 py-2 rounded-full border border-white/70 text-white bg-black/25 backdrop-blur transition hover:bg-black/40"
          >
            Previous
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            className="px-4 py-2 rounded-full border border-white/70 text-white bg-black/25 backdrop-blur transition hover:bg-black/40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default VillasHero;
