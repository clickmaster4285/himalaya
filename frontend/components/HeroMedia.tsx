"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const heroVideo = "/assets/hero-video.mp4";
const defaultPoster =
  process.env.NEXT_PUBLIC_HERO_VIDEO_POSTER ?? "/assets/villa-exterior.jpg";

/**
 * LCP-friendly hero: optimized still loads first (AVIF/WebP via next/image), video fades in when ready.
 */
export default function HeroMedia() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <Image
        src={defaultPoster}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-700",
          videoReady ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-hidden
      />
      <video
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          videoReady ? "opacity-100" : "opacity-0",
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={defaultPoster}
        onCanPlay={() => setVideoReady(true)}
        onPlaying={() => setVideoReady(true)}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </>
  );
}
