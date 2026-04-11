"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export default function VirtualExperienceSection() {
  const tourVideoSrc =
    process.env.NEXT_PUBLIC_VIRTUAL_EXPERIENCE_VIDEO ?? "/assets/virtual-experience-3d.mp4";
  const tourPoster =
    process.env.NEXT_PUBLIC_VIRTUAL_EXPERIENCE_POSTER ?? "/assets/gallery-interior.jpg";
  const [videoOk, setVideoOk] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoInView = useInView(sectionRef, { once: true, margin: "200px" });

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
    if (videoOk) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % images.length), 2200);
    return () => clearInterval(t);
  }, [images.length, videoOk]);

  return (
    <section ref={sectionRef} className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden">
      {videoOk ? (
        <>
          {videoInView ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={tourVideoSrc}
              poster={tourPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setVideoOk(false)}
            />
          ) : (
            <Image
              src={tourPoster}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-black/35" />

          {!playing && (
            <button
              type="button"
              onClick={() => {
                const el = videoRef.current;
                if (!el) return;
                el.muted = false;
                void el.play();
              }}
              className="absolute left-6 bottom-6 z-20 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-left text-white/90 backdrop-blur-sm hover:bg-black/45 transition"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 border border-white/15">
                ▶
              </span>
              <span>
                <span className="block text-[12px] uppercase tracking-[0.22em] text-white/70">
                  3D interior walkthrough
                </span>
                <span className="mt-0.5 block font-display text-[18px] leading-none">
                  Play tour video (HD)
                </span>
              </span>
            </button>
          )}
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <Image
              src={images[index]}
              alt="Virtual experience room"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>
        </AnimatePresence>
      )}

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

