"use client";

import Image from "next/image";
import { useState } from "react";

const videoSources = ["/assets/homePage-video.mp4", "/assets/homePage-video2.mp4"];
const momentsPoster = "/assets/journal-bonfire.jpg";

const MomentsSection = () => {
  const [activeVideoSrc, setActiveVideoSrc] = useState(videoSources[0]);
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoError = () => {
    if (activeVideoSrc === videoSources[0]) {
      setActiveVideoSrc(videoSources[1]);
      return;
    }

    setVideoFailed(true);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {!videoFailed && activeVideoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={momentsPoster}
          onError={handleVideoError}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={activeVideoSrc} type="video/mp4" />
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
      {/* <div className="relative z-10 flex items-center justify-center h-full text-center px-8">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <button className="btn-outline-hero">
              Explore Experiences
            </button>
          </motion.div>
        </div>
      </div> */}
    </section>
  );
};

export default MomentsSection;