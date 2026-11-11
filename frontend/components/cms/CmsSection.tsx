// components/cms/CmsSection.tsx
// Shared shell for every ERP section: Himalaya Villas backgrounds, spacing,
// container widths and reveal animation, driven by the ERP section settings.
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import CmsReveal from "./CmsReveal";
import type { SectionLayout, Tone, Width } from "./cmsContent";

export const TONE_CLASSES: Record<Tone, string> = {
  light: "bg-[#faf7f1] text-[#1a1816]",
  muted: "bg-[#F3EEE3] text-[#1a1816]",
  dark: "bg-[#1b261b] text-white",
  gold: "bg-gradient-to-r from-[#c9a55b] to-[#b8944a] text-white",
};

const WIDTH_CLASSES: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  superWide: "max-w-[90rem]",
  full: "max-w-[96rem]",
};

/** Tone-aware text colours shared by section components. */
export function toneText(tone: Tone) {
  const onDark = tone === "dark" || tone === "gold";
  return {
    onDark,
    heading: onDark ? "text-white" : "text-[#1a1816]",
    body: onDark ? "text-white/80" : "text-[#5c564c]",
    accent: tone === "gold" ? "text-white" : "text-[#c9a55b]",
    border: onDark ? "border-white/15" : "border-[#eadfce]",
    card: tone === "dark" ? "bg-white/5 border border-white/10" : tone === "gold" ? "bg-white/10 border border-white/20" : "bg-white border border-[#eadfce]",
  };
}

type Props = {
  layout: SectionLayout;
  children: ReactNode;
  className?: string;
  /** Default vertical padding when the ERP sets none. */
  defaultPadding?: string;
  /** Skip the inner container (full-bleed sections). */
  bleed?: boolean;
};

export default function CmsSection({ layout, children, className, defaultPadding = "py-16 md:py-24", bleed }: Props) {
  const style = layout.padding
    ? ({ "--cms-pt": `${layout.padding[0]}px`, "--cms-pb": `${layout.padding[1]}px` } as CSSProperties)
    : undefined;
  const padding = layout.padding
    ? "pt-[calc(var(--cms-pt)*0.6)] pb-[calc(var(--cms-pb)*0.6)] md:pt-[var(--cms-pt)] md:pb-[var(--cms-pb)]"
    : defaultPadding;

  return (
    <section className={cn("relative overflow-hidden", TONE_CLASSES[layout.tone], padding, className)} style={style}>
      {bleed ? (
        children
      ) : (
        <CmsReveal motion={layout.motion} className={cn("mx-auto w-full px-6 md:px-12", WIDTH_CLASSES[layout.width])}>
          {children}
        </CmsReveal>
      )}
    </section>
  );
}
