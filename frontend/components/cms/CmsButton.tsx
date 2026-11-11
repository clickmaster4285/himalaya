// components/cms/CmsButton.tsx
// ERP call-to-action links in the site's button styles (ReserveSection /
// hero buttons). Hrefs are already validated by safeHref.
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isExternal, type CmsLink, type Tone } from "./cmsContent";

type Variant = "primary" | "secondary";

function classes(variant: Variant, tone: Tone) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 w-full sm:w-auto text-center";
  const onDark = tone === "dark" || tone === "gold";
  if (variant === "primary") {
    if (tone === "gold") return cn(base, "bg-white text-[#1a1816] hover:bg-[#1b261b] hover:text-white");
    if (onDark) return cn(base, "bg-[#c9a55b] text-white hover:bg-[#b8944a]");
    return cn(base, "bg-foreground text-background hover:bg-[#c9a55b] hover:text-white");
  }
  return onDark
    ? cn(base, "border border-white/70 text-white hover:bg-white hover:text-[#1a1816]")
    : cn(base, "border border-foreground/30 text-foreground hover:bg-foreground hover:text-background");
}

export function CmsButton({ cta, variant = "primary", tone }: { cta: CmsLink; variant?: Variant; tone: Tone }) {
  const className = classes(variant, tone);
  if (isExternal(cta.link) || /^(mailto:|tel:)/i.test(cta.link)) {
    const newTab = isExternal(cta.link);
    return (
      <a href={cta.link} className={className} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {cta.text}
      </a>
    );
  }
  return (
    <Link href={cta.link} className={className}>
      {cta.text}
    </Link>
  );
}

export function CmsButtons({
  primary,
  secondary,
  tone,
  align = "start",
  className,
}: {
  primary?: CmsLink;
  secondary?: CmsLink;
  tone: Tone;
  align?: "start" | "center";
  className?: string;
}) {
  if (!primary && !secondary) return null;
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4",
        align === "center" ? "items-center justify-center" : "items-start",
        className,
      )}
    >
      {primary && <CmsButton cta={primary} tone={tone} />}
      {secondary && <CmsButton cta={secondary} variant="secondary" tone={tone} />}
    </div>
  );
}
