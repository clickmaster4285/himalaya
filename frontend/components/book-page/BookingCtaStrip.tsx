import Link from "next/link";

export type BookingCtaButton = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "gold" | "dark" | "outline" | "whatsapp";
};

type BookingCtaStripProps = {
  title?: string;
  subtitle?: string;
  buttons: BookingCtaButton[];
  dark?: boolean;
  className?: string;
};

export default function BookingCtaStrip({
  title,
  subtitle,
  buttons,
  dark = false,
  className = "",
}: BookingCtaStripProps) {
  const btnClass = (variant: BookingCtaButton["variant"]) => {
    if (variant === "whatsapp") {
      return "inline-flex items-center justify-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors";
    }
    if (variant === "gold") {
      return "inline-flex items-center justify-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest bg-[#c9a55b] text-[#1b261b] hover:bg-[#ebd59f] transition-colors";
    }
    if (variant === "outline") {
      return dark
        ? "inline-flex items-center justify-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest border border-white/25 text-white hover:border-white transition-colors"
        : "inline-flex items-center justify-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest border border-[#dfd5c5] text-[#1b261b] hover:border-[#1b261b] transition-colors";
    }
    return dark
      ? "inline-flex items-center justify-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest bg-[#c9a55b] text-[#1b261b] hover:bg-[#ebd59f] transition-colors"
      : "inline-flex items-center justify-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest bg-[#1b261b] text-white hover:bg-black transition-colors";
  };

  const wrap = dark
    ? "rounded-sm border border-white/10 bg-[#212d21] px-6 py-8 md:px-10"
    : "rounded-sm border border-[#eae3d5] bg-[#fdfaf6] px-6 py-8 md:px-10";

  const titleClass = dark ? "font-display text-xl md:text-2xl text-white" : "font-display text-xl md:text-2xl text-[#1b261b]";
  const subClass = dark ? "mt-2 text-center text-[13px] text-white/65 max-w-2xl mx-auto" : "mt-2 text-center text-[13px] text-neutral-600 max-w-2xl mx-auto";

  return (
    <div className={`${wrap} ${className}`.trim()}>
      {title ? <p className={`${titleClass} text-center`}>{title}</p> : null}
      {subtitle ? <p className={subClass}>{subtitle}</p> : null}
      <div
        className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 ${
          title || subtitle ? "mt-6" : ""
        }`}
      >
        {buttons.map((btn) => {
          const cls = `${btnClass(btn.variant)} text-center w-full sm:w-auto`;
          if (btn.external) {
            return (
              <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {btn.label}
              </a>
            );
          }
          return (
            <Link key={btn.label} href={btn.href} className={cls}>
              {btn.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
