"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
          poster="/assets/journal-bonfire.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* Use the public folder path (correct for Next.js) */}
          <source 
            src="/videos/homePage-video.mp4" 
            type="video/mp4" 
          />
        </video>
      ) : (
        <Image
          src="/assets/journal-bonfire.jpg"
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
    </section>
  );
};

export default MomentsSection;