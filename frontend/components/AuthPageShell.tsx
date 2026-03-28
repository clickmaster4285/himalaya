import type { ReactNode } from "react";
import { AuthBackdrop } from "@/components/AuthBackdrop";

type Props = {
  headerStart: ReactNode;
  headerEnd: ReactNode;
  children: ReactNode;
};

/** Photo background + dark bar so nav stays readable over the villa image */
export function AuthPageShell({ headerStart, headerEnd, children }: Props) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <AuthBackdrop />
      <header className="relative z-[2] flex items-center justify-between gap-4 border-b border-white/10 bg-[#1a1612]/60 px-6 py-4 backdrop-blur-md">
        {headerStart}
        {headerEnd}
      </header>
      <main className="relative z-[2] flex flex-1 items-center justify-center px-5 py-10 md:px-8">{children}</main>
    </div>
  );
}
