"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  CirclePlus,
  ClipboardList,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Package,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  calendar: CalendarDays,
  plus: CirclePlus,
  inbox: ClipboardList,
  layout: LayoutDashboard,
  users: Users,
  building: Building2,
  box: Package,
  money: ReceiptText,
} as const;

export type DashIcon = keyof typeof ICON_MAP;

export type DashLink = { href: string; label: string; icon: DashIcon };

type Props = {
  title: string;
  links: DashLink[];
  children: React.ReactNode;
};

const navSpring = { type: "spring" as const, stiffness: 420, damping: 32 };

function NavLinks({
  links,
  pathname,
  onNavigate,
  layoutId,
  reduceMotion,
}: {
  links: DashLink[];
  pathname: string;
  onNavigate?: () => void;
  layoutId: string;
  reduceMotion: boolean | null;
}) {
  return (
    <nav className="flex flex-col gap-1.5 px-3">
      {links.map((l, i) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        const Icon = ICON_MAP[l.icon];
        return (
          <motion.div
            key={l.href}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.05 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={l.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3 font-sans text-[14px] font-medium tracking-wide transition-colors duration-200",
                active ? "text-[#fdf9f3]" : "text-[#b8a99a] hover:text-[#f0ebe4]",
              )}
            >
              {active && !reduceMotion && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#c9a55b]/22 via-white/[0.09] to-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-[#c9a55b]/35"
                  transition={navSpring}
                />
              )}
              {active && reduceMotion && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#c9a55b]/22 via-white/[0.09] to-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-[#c9a55b]/35" />
              )}
              <motion.span
                className={cn(
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                  active
                    ? "bg-[#c9a55b]/30 text-[#f5e6c8] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)]"
                    : "bg-white/[0.06] text-[#9a8a7a] group-hover:bg-white/10 group-hover:text-[#d4c4b8]",
                )}
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </motion.span>
              <span className="relative z-10">{l.label}</span>
            </Link>
          </motion.div>
        );
      })}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 0.2 + links.length * 0.05, duration: 0.4 }}
        className="mt-8 border-t border-white/[0.08] pt-6"
      >
        <Link
          href="/"
          onClick={onNavigate}
          className="group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 font-sans text-[13px] font-medium text-[#8f8074] transition-all duration-200 hover:bg-white/[0.06] hover:text-[#e8dfd0]"
        >
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-[#a89888] group-hover:bg-white/10 group-hover:text-[#d4c4b8]"
            whileHover={reduceMotion ? undefined : { x: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          </motion.span>
          Back to website
        </Link>
      </motion.div>
    </nav>
  );
}

/** Himalaya estate palette: refined cocoa sidebar with motion */
export default function DashboardShell({ title, links, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMobile = () => setOpen(false);

  return (
    <div className="min-h-dvh bg-[#fdf9f6]">
      <div className="flex min-h-dvh flex-col md:flex-row">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-[#1f1a15] bg-gradient-to-r from-[#1c1814] via-[#252018] to-[#1c1814] px-4 py-3.5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)] md:hidden">
          <div>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b87a]">Himalaya Villas & Resorts</p>
            <p className="font-display text-lg font-semibold leading-tight text-[#faf6f0]">{title}</p>
          </div>
          <motion.button
            type="button"
            className="rounded-xl p-2.5 text-[#e8dfd0] hover:bg-white/10"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </header>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-b border-[#1f1a15] bg-gradient-to-b from-[#252018] to-[#1c1814] md:hidden"
            >
              <div className="px-2 py-5">
                <NavLinks links={links} pathname={pathname} onNavigate={closeMobile} layoutId="dash-nav-mobile" reduceMotion={reduceMotion} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <aside className="relative hidden w-[280px] shrink-0 flex-col md:flex">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#c9a55b]/25 to-transparent" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2a231c] via-[#1f1b17] to-[#181410]" aria-hidden />
          <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-[#c9a55b]/[0.07] to-transparent" aria-hidden />

          <div className="relative z-10 flex flex-1 flex-col border-r border-[#3d342c]/80">
            <div className="px-7 pb-4 pt-10">
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4b87a]">Himalaya Villas & Resorts</p>
                <h1 className="font-display mt-2.5 text-[1.4rem] font-semibold leading-snug tracking-tight text-[#fdf9f3]">{title}</h1>
                <p className="mt-2 font-sans text-[12px] font-medium leading-relaxed text-[#9a8b7c]">Estate dashboard</p>
              </motion.div>
              <motion.div
                className="mt-6 h-0.5 w-14 origin-left rounded-full bg-gradient-to-r from-[#c9a55b] via-[#d4b87a] to-transparent"
                initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="relative z-10 mt-1 flex-1 overflow-y-auto pb-10 [scrollbar-width:thin] [scrollbar-color:rgba(201,165,91,0.35)_transparent]">
              <NavLinks links={links} pathname={pathname} layoutId="dash-nav-desktop" reduceMotion={reduceMotion} />
            </div>
          </div>
        </aside>

        <motion.main
          className="min-h-0 flex-1 overflow-auto px-5 py-8 md:px-10 md:py-10"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
