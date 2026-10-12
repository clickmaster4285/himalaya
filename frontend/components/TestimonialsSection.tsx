'use client';

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-8"
      style={{ background: "#EAE2D7" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <p
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 sm:mb-4"
            style={{ color: "#a07c1f" }}
          >
            Guest Reviews
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: "#2b2b2b" }}
          >
            What Our Guests Say
          </h2>
          <div
            className="w-14 sm:w-16 h-[2px] mx-auto mt-5 sm:mt-6"
            style={{ background: "#c9a24a" }}
          />
          <p
            className="mt-5 sm:mt-6 text-sm md:text-base leading-relaxed"
            style={{ color: "#6b6357" }}
          >
            Learn about the experiences of guests who have stayed at Himalaya
            Villas and Resort Hotel. Explore genuine reviews and feedback about
            our accommodation, hospitality, and property surroundings to help
            you make an informed decision.
          </p>
        </motion.div>

        {/* Two videos side by side, with caption below on mobile / beside on desktop */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:flex-row lg:justify-center lg:items-center lg:gap-12">
          {/* Videos group */}
          <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5">
            {/* Video 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: "9 / 16",
                  width: "clamp(140px, 22vw, 220px)",
                  border: "1px solid rgba(201, 162, 74, 0.35)",
                }}
              >
                <TestimonialVideo
                  src="/videos/testimonial-video.mp4"
                  isInView={isInView}
                  delay={200}
                />
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="flex-shrink-0"
            >
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: "9 / 16",
                  width: "clamp(140px, 22vw, 220px)",
                  border: "1px solid rgba(201, 162, 74, 0.35)",
                }}
              >
                <TestimonialVideo
                  src="/videos/testimonial-video2.mp4"
                  isInView={isInView}
                  delay={320}
                />
              </div>
            </motion.div>
          </div>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-center lg:text-left lg:max-w-md"
          >
            <p
              className="font-display text-xl sm:text-2xl md:text-3xl italic leading-relaxed"
              style={{ color: "#2b2b2b" }}
            >
              &ldquo;The perfect escape from the city. The private villas
              offer unmatched tranquility.&rdquo;
            </p>

            <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-[#c9a24a] bg-[#fdfaf3] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf]"
              >
                Book Now
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/** Vertical video: autoplay muted in view, with a tap-to-unmute button. */
function TestimonialVideo({
  src,
  isInView,
  delay = 0,
}: {
  src: string;
  isInView: boolean;
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      // Stagger starts so the two videos don't fire their audio at the exact same moment
      const timeout = setTimeout(() => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            /* Autoplay blocked — silently ignore */
          });
        }
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      video.pause();
    }
  }, [isInView, delay]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-1 sm:py-1.5 text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.12em] backdrop-blur-sm transition hover:brightness-110"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          color: "#fdfaf3",
          border: "1px solid rgba(201, 162, 74, 0.55)",
        }}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Sound
          </>
        ) : (
          <>
            <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            On
          </>
        )}
      </button>
    </>
  );
}

export default TestimonialsSection;