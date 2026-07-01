"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MomentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/journal-bonfire.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/homePage-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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