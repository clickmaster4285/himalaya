import Link from "next/link";

export type EventCtaButton = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "outline" | "whatsapp";
};

type EventCtaStripProps = {
  title?: string;
  subtitle?: string;
  buttons: EventCtaButton[];
  className?: string;
};

export default function EventCtaStrip({ title, subtitle, buttons, className = "" }: EventCtaStripProps) {
  const btnClass = (variant: EventCtaButton["variant"]) => {
    if (variant === "whatsapp") {
      return "inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700";
    }
    if (variant === "outline") {
      return "inline-flex items-center justify-center rounded-lg border border-[#d4c9b8] bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-[#c9a55b]";
    }
    return "inline-flex items-center justify-center rounded-lg bg-[#c9a55b] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a98741]";
  };

  return (
    <div
      className={`rounded-2xl border border-[#e8dfd2] bg-gradient-to-br from-[#fdfaf6] to-[#f3eee3] px-6 py-8 md:px-8 ${className}`.trim()}
    >
      {title ? (
        <h4 className="font-display text-xl md:text-2xl text-neutral-900 text-center">{title}</h4>
      ) : null}
      {subtitle ? (
        <p className="mt-2 text-center text-sm text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      ) : null}
      <div
        className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 ${
          title || subtitle ? "mt-6" : ""
        }`}
      >
        {buttons.map((btn) => {
          const className = `${btnClass(btn.variant)} text-center`;
          if (btn.external) {
            return (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {btn.label}
              </a>
            );
          }
          return (
            <Link key={btn.label} href={btn.href} className={className}>
              {btn.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
