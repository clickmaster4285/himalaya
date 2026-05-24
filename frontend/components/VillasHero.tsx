"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { buildWhatsAppAvailabilityUrl, buildWhatsAppBookingUrl } from "@/lib/whatsapp";

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
          <Image
            src={images[index]}
            alt="Villa background"
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-20 text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          Our Villas
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-white/90">
          Private villas in the Murree Hills — for guests who searched for a hotel in bhurban and chose space, views,
          and an entire estate reserved for their group.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <Link
            href="/book/stay"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 shadow-lg transition hover:bg-white/90"
          >
            Book your stay
          </Link>
          <a
            href={buildWhatsAppAvailabilityUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border-2 border-white/85 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Check availability
          </a>
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border-2 border-white/85 bg-emerald-600/90 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md transition hover:bg-emerald-600"
          >
            WhatsApp us
          </a>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="px-3 py-1.5 rounded-full border border-white/50 text-white/90 text-xs bg-black/20 backdrop-blur transition hover:bg-black/35"
            aria-label="Previous slide"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            className="px-3 py-1.5 rounded-full border border-white/50 text-white/90 text-xs bg-black/20 backdrop-blur transition hover:bg-black/35"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default VillasHero;
