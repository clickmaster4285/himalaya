import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string; children: ReactNode };

/** Solid cream card — readable like a POS login panel; no heavy glass blur on the form surface */
export function AuthGlassCard({ className, children }: Props) {
  return (
    <div
      className={cn(
        "relative z-[2] w-full max-w-[460px] rounded-[2rem] border border-[#e8dfd2] bg-[#f7f4ef] p-9 shadow-[0_28px_90px_-16px_rgba(0,0,0,0.55)] md:p-11",
        className
      )}
    >
      {children}
    </div>
  );
}
