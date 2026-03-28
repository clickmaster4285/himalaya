import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "amber" | "emerald" | "rose" | "slate";
  /** Rich card: gold accent bar + gradient — use on superadmin overview. */
  premium?: boolean;
  decor?: ReactNode;
};

const toneRing: Record<NonNullable<Props["tone"]>, string> = {
  default: "border-[#ebe4dc]",
  amber: "border-amber-200/90 bg-amber-50/40",
  emerald: "border-emerald-200/90 bg-emerald-50/40",
  rose: "border-rose-200/90 bg-rose-50/40",
  slate: "border-slate-200/90 bg-slate-50/50",
};

export function DashboardStatCard({ label, value, hint, tone = "default", premium, decor }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5",
        premium
          ? "overflow-hidden border-[#e5dcc8]/90 bg-gradient-to-br from-white via-[#fffdfb] to-[#f7f1e8] shadow-[0_12px_40px_-12px_rgba(28,22,16,0.14)] before:pointer-events-none before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-[#d4b87a] before:via-[#c9a55b] before:to-[#8a6f3a]"
          : cn("bg-white shadow-sm shadow-black/[0.03]", tone === "default" ? toneRing.default : toneRing[tone]),
      )}
    >
      <div className={cn("flex items-start justify-between gap-3", premium && "pl-1")}>
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a6f62]">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold tabular-nums tracking-tight text-[#1a1816] md:text-[1.65rem]">
            {value}
          </p>
          {hint && <p className="mt-1 font-sans text-[12px] leading-snug text-[#6b655c]">{hint}</p>}
        </div>
        {decor && (
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c9a55b]/25 bg-[#c9a55b]/10 text-[#7a6129]",
              !premium && "opacity-90",
            )}
            aria-hidden
          >
            {decor}
          </div>
        )}
      </div>
    </div>
  );
}
