// components/cms/CmsSectionHeading.tsx
// Himalaya Villas section header: gold tracked eyebrow, Cormorant display
// heading with an italic gold tail, optional supporting text.
import { cn } from "@/lib/utils";
import type { Tone } from "./cmsContent";
import { toneText } from "./CmsSection";

/** "Private Villas in Bhurban" → head "Private Villas", tail "in Bhurban". */
export function splitHeading(heading: string): { head: string; tail: string } {
  const words = heading.trim().split(/\s+/).filter(Boolean);
  if (words.length < 4) return { head: words.join(" "), tail: "" };
  return { head: words.slice(0, -2).join(" "), tail: words.slice(-2).join(" ") };
}

export function DisplayHeading({
  text,
  tone,
  as: Tag = "h2",
  className,
}: {
  text: string;
  tone: Tone;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const { head, tail } = splitHeading(text);
  const t = toneText(tone);
  return (
    <Tag className={cn("font-display font-normal leading-tight", t.heading, className)}>
      {head}
      {tail && (
        <>
          {" "}
          <span className={cn("italic", t.accent)}>{tail}</span>
        </>
      )}
    </Tag>
  );
}

export function Eyebrow({ text, tone, className }: { text: string; tone: Tone; className?: string }) {
  return (
    <p className={cn("text-xs md:text-sm font-semibold tracking-[0.3em] uppercase", toneText(tone).accent, className)}>
      {text}
    </p>
  );
}

export default function CmsSectionHeading({
  eyebrow,
  heading,
  description,
  tone,
  align = "center",
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  tone: Tone;
  align?: "center" | "left";
}) {
  if (!eyebrow && !heading && !description) return null;
  const t = toneText(tone);
  return (
    <div className={cn("mb-10 md:mb-14", align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl")}>
      {eyebrow && <Eyebrow text={eyebrow} tone={tone} className="mb-4" />}
      {heading && <DisplayHeading text={heading} tone={tone} className="text-4xl md:text-5xl lg:text-6xl" />}
      {description && (
        <p className={cn("mt-5 text-sm md:text-base leading-relaxed", t.body, align === "center" && "mx-auto max-w-2xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
