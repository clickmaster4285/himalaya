"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const HERO_SRC = "/assets/gallery-interior.jpg";

/** Villa interior + warm dark overlay so the cream card pops (Himalaya palette, reference-level contrast). */
export function AuthBackdrop() {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src={HERO_SRC}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Warm brown wash — brand-consistent, not cold grey */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-[#2a2319]/72"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-black/50 via-[#1f1a14]/55 to-[#14110e]/88"
      />
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,rgba(201,165,91,0.08),transparent_55%)]"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,rgba(201,165,91,0.08),transparent_55%)] opacity-90"
        />
      )}
    </>
  );
}
