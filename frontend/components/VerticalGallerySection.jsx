"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const VIDEOS = [
  { src: "/videos/landing-page-1.mp4", poster: "/images/landing-page-1.jpg", label: "Resort view one" },
  { src: "/videos/landing-page-2.mp4", poster: "/images/landing-page-2.jpg", label: "Resort view two" },
  { src: "/videos/landing-page-3.mp4", poster: "/images/landing-page-3.jpg", label: "Resort view three" },
  { src: "/videos/landing-page-4.mp4", poster: "/images/landing-page-4.jpg", label: "Resort view four" },
  { src: "/videos/landing-page-5.mp4", poster: "/images/landing-page-5.jpg", label: "Resort view five" },
  { src: "/videos/landing-page-6.mp4", poster: "/images/landing-page-6.jpg", label: "Resort view six" },
];

const VerticalGallerySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const [active, setActive] = useState(null);
  const videoRefs = useRef([]);

  // Auto-start video 0 when section scrolls in
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setActive(0), 500);
    return () => clearTimeout(t);
  }, [isInView]);

  // Sync play/pause whenever `active` changes
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-5 sm:px-6 md:px-8"
      style={{ background: "#EAE2D7" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 sm:mb-4"
            style={{ color: "#a07c1f" }}
          >
            The Gallery
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: "#2b2b2b" }}
          >
            Moments from the Mountains
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "#6b6357" }}
          >
            A quiet collection of scenes — soft light, forest air, and the
            stillness that makes Bhurban feel like home.
          </motion.p>
        </div>

        {/* ── 3 × 2 vertical video grid ──────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {VIDEOS.map((item, i) => {
            const isActive = active === i;

            return (
              <motion.button
                key={item.src}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onTouchStart={() => setActive(i)}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className="group relative aspect-[9/16] w-full overflow-hidden rounded-lg
                           outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  border: "1px solid rgba(201,162,74,0.28)",
                  // @ts-expect-error – CSS var for focus ring colour
                  "--tw-ring-color": "#c9a24a",
                }}
                aria-label={item.label}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  className={`absolute inset-0 h-full w-full object-cover will-change-transform
                              transition-transform ease-out
                              ${isActive ? "scale-105 duration-[6000ms]" : "scale-100 duration-700"}`}
                />

                {/* Gold vignette while active */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500
                              ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(201,162,74,0.28), transparent 60%)",
                  }}
                />

                {/* Caption bar — slides up while active */}
                <span
                  className={`pointer-events-none absolute inset-x-0 bottom-0 px-4 py-3 text-left
                              text-[11px] sm:text-xs tracking-[0.18em] uppercase
                              transition-all duration-500
                              ${isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{
                    color: "#fff8e7",
                    background:
                      "linear-gradient(to top, rgba(43,43,43,0.65), transparent)",
                  }}
                >
                  {item.label}
                </span>

                {/* Live pulse dot while active */}
                <span
                  aria-hidden
                  className={`absolute top-3 right-3 h-2 w-2 rounded-full transition-opacity duration-300
                              ${isActive ? "opacity-100 animate-pulse" : "opacity-0"}`}
                  style={{ background: "#c9a24a" }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalGallerySection;