import Link from "next/link";
import { buildWhatsAppAvailabilityUrl, buildWhatsAppBookingUrl } from "@/lib/whatsapp";

type VillasCtaGroupProps = {
  /** light = cream page, dark = hero/video overlay, banner = gold strip */
  variant?: "light" | "dark" | "banner";
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function VillasCtaGroup({
  variant = "light",
  title,
  subtitle,
  className = "",
}: VillasCtaGroupProps) {
  const whatsappBook = buildWhatsAppBookingUrl();
  const whatsappAvailability = buildWhatsAppAvailabilityUrl();

  const isDark = variant === "dark";
  const isBanner = variant === "banner";

  const wrapper = isBanner
    ? "rounded-2xl border border-[#d4c9b8] bg-gradient-to-br from-[#f8f3ea] to-[#efe6d6] px-6 py-10 md:px-10 md:py-12 text-center"
    : isDark
      ? ""
      : "rounded-xl border border-[#e8dfd2] bg-[#fdfaf6] px-5 py-8 md:px-8 md:py-10 text-center";

  const titleClass = isDark
    ? "font-display text-xl md:text-2xl text-white"
    : "font-display text-2xl md:text-3xl text-neutral-900";

  const subClass = isDark
    ? "mt-2 text-sm text-white/85 max-w-xl mx-auto"
    : "mt-2 text-sm text-neutral-600 max-w-xl mx-auto";

  const primaryBtn = isDark
    ? "inline-flex items-center justify-center rounded-md bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 shadow-lg transition hover:bg-white/90"
    : isBanner
      ? "inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md transition hover:bg-neutral-800"
      : "inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-neutral-800";

  const secondaryBtn = isDark
    ? "inline-flex items-center justify-center rounded-md border-2 border-white/80 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/20"
    : "inline-flex items-center justify-center rounded-xl border border-[#d4c9b8] bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:bg-[#f8f3ea]";

  const tertiaryBtn = isDark
    ? secondaryBtn
    : "inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-emerald-700";

  return (
    <div className={`${wrapper} ${className}`.trim()}>
      {title ? <p className={titleClass}>{title}</p> : null}
      {subtitle ? <p className={subClass}>{subtitle}</p> : null}
      <div
        className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 ${
          title || subtitle ? "mt-6" : ""
        }`}
      >
        <Link href="/book/stay" className={primaryBtn}>
          Book your stay
        </Link>
        <a href={whatsappAvailability} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
          Check availability
        </a>
        <a href={whatsappBook} target="_blank" rel="noopener noreferrer" className={tertiaryBtn}>
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
