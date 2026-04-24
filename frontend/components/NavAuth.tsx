"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";
import type { SafeUser } from "@/lib/user-public";
import { dashboardPathForRole } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

type Props = {
  /** Light text on hero (home navbar) — auth controls sit on a dark/gold-backed pill for contrast */
  variant?: "hero" | "cream";
};

/** Hero: readable on bright clouds — cocoa glass bar + gold Sign in (matches estate CTA palette) */
const heroAuthBar =
  "flex items-center gap-0.5 rounded-full border border-white/25 bg-[#1a1612]/72 p-1 pl-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md md:gap-1 md:pl-2.5";

export default function NavAuth({ variant = "cream" }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<SafeUser | null | undefined>(undefined);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setUser(d.user ?? null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.refresh();
  }

  const signInTriggerClass =
    variant === "hero"
      ? "rounded-full bg-[#c9a55b] px-3.5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#1c1915] shadow-inner shadow-white/20 ring-1 ring-black/10 transition-colors hover:bg-[#b8944a] md:px-4 md:text-[11px]"
      : "rounded-md px-4 py-2 text-[11px] tracking-[0.28em] uppercase border border-neutral-500/60 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors";

  if (user === undefined) {
    return (
      <div
        className={cn(variant === "hero" ? heroAuthBar : "", "min-h-[2.25rem]")}
        aria-hidden
      >
        <div className="h-8 w-28 animate-pulse rounded-full bg-white/20 md:w-32" />
      </div>
    );
  }

  if (user) {
    const dash = dashboardPathForRole(user.role);
    if (variant === "hero") {
      return (
        <div className={heroAuthBar}>
          <Link
            href={dash}
            className="rounded-full px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f8f1e8] transition-colors hover:bg-white/10 md:text-[11px]"
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d4c4b8] transition-colors hover:bg-white/10 hover:text-white md:text-[11px]"
          >
            Log out
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href={dash}
          className="text-[11px] tracking-[0.28em] uppercase text-neutral-700 hover:text-neutral-900"
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={logout}
          className="text-[11px] tracking-[0.28em] uppercase text-neutral-500 hover:text-neutral-900"
        >
          Log out
        </button>
      </div>
    );
  }

  const signUpClassHero =
    "rounded-full px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#fdf9f6] transition-colors hover:bg-white/12 md:px-3.5 md:text-[11px]";

  const signUpClassCream =
    "text-[11px] tracking-[0.28em] uppercase text-neutral-700 hover:text-neutral-900";

  const handleSwitchToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  if (variant === "hero") {
    return (
      <div className={heroAuthBar}>
        <SignupDialog
          triggerClassName={signUpClassHero}
          open={signupOpen}
          onOpenChange={setSignupOpen}
          onSwitchToLogin={handleSwitchToLogin}
        />
        <LoginDialog
          triggerClassName={signInTriggerClass}
          open={loginOpen}
          onOpenChange={setLoginOpen}
          onSwitchToSignup={handleSwitchToSignup}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <SignupDialog
        triggerClassName={signUpClassCream}
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <LoginDialog
        triggerClassName={signInTriggerClass}
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={handleSwitchToSignup}
      />
    </div>
  );
}
