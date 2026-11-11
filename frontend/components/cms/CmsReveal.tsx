"use client";
// components/cms/CmsReveal.tsx
// Scroll reveal for ERP sections (settings.motion), using the same Framer
// Motion entrance the site's own sections use. "none" renders a plain div.
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Motion } from "./cmsContent";

const VARIANTS: Record<Exclude<Motion, "none">, { opacity: number; y?: number; x?: number; scale?: number }> = {
  "fade-up": { opacity: 0, y: 30 },
  fade: { opacity: 0 },
  zoom: { opacity: 0, scale: 0.96 },
  "slide-in": { opacity: 0, x: -30 },
};

export default function CmsReveal({
  motion: kind,
  className,
  children,
}: {
  motion: Motion;
  className?: string;
  children: ReactNode;
}) {
  if (kind === "none") return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={VARIANTS[kind]}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
