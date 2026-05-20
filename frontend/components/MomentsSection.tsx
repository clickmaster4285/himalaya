"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const momentsVideo = "/assets/moments-video.mp4";
const momentsPoster = "/assets/journal-bonfire.jpg";

const MomentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const loadVideo = useInView(ref, { once: true, margin: "180px" });

  return (
    <section ref={ref} className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {loadVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={momentsPoster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={momentsVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={momentsPoster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(220 20% 10% / 0.3) 0%, hsl(220 20% 10% / 0.5) 50%, hsl(220 20% 10% / 0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl lg:text-8xl font-normal italic leading-tight whitespace-nowrap"
            style={{ color: "hsl(0 0% 100% / 0.95)" }}
          >
            Moments Elevated by Nature
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.88)" }}
          >
            The setting guests remember from bhurban best hotels lists — cedar forest, cool air, and Himalayan light —
            experienced here with the estate entirely yours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/experience"
              className="btn-outline-hero inline-flex items-center justify-center min-w-[200px]"
            >
              Explore experiences
            </Link>
            <Link
              href="/book/stay"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 shadow-lg transition hover:bg-white/90 min-w-[200px]"
            >
              Book your stay
            </Link>
            <a
              href={buildWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md transition hover:bg-emerald-700 min-w-[200px]"
            >
              WhatsApp us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MomentsSection;
