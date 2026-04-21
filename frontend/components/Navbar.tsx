"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavAuth from "@/components/NavAuth";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import LiveWeatherBadge from "@/components/LiveWeatherBadge";

const logo = "/assets/himalaya-logo.png";

const navItems = ["Villas", "Experience", "Virtual Tour", "Journal",  "Blogs", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHref = (item: string) => {
    if (item === "Villas") return "/villas";
    if (item === "Experience") return "/experience";
    if (item === "Virtual Tour") return "/experience";
    if (item === "Journal") return "/journal";
    if (item === "Weddings") return "/weddings";
    if (item === "Events") return "/events";
    if (item === "Blogs") return "/blogs";
    if (item === "Contact") return "/contact";
    return `/#${item.toLowerCase().replace(" ", "-")}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 transition-all duration-500 ${
        scrolled
          ? "py-3 md:py-4 bg-foreground/95 backdrop-blur-md shadow-lg"
          : "py-6 md:py-10 bg-transparent"
      }`}
    >
      {/* Mobile hamburger */}
      <button
        className="md:hidden z-50 text-primary-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ color: "hsl(var(--hero-text))" }}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8 text-white">
        {navItems.map((item) => (
          <li key={item}>
            <Link href={getHref(item)} className="nav-link" style={scrolled ? { color: "white" } : undefined}>
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logo center */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1 md:top-2">
        <Link href="/" className="relative flex flex-col items-center">
          <Image
            src={logo}
            alt="Himalaya Villas"
            width={160}
            height={160}
            priority
            className={`object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-500 ${
              scrolled ? "h-10 w-10 md:h-12 md:w-12" : "h-14 w-14 md:h-20 md:w-20"
            }`}
          />
        </Link>
      </div>

      {/* Sign in + Book */}
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="hidden sm:block">
          <LiveWeatherBadge variant="light" />
        </div>
        <div className="hidden md:block">
          <NavAuth variant="hero" />
        </div>
        <a
          href={buildWhatsAppBookingUrl("a private villa tour")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs font-medium tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 inline-block whitespace-nowrap"
        >
          Request Private Tour
        </a>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className="font-sans text-lg font-semibold tracking-[0.12em] text-white/95 uppercase transition-opacity hover:opacity-80"
              style={{ color: "hsl(var(--hero-text))" }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="mt-2" onClick={() => setMobileOpen(false)}>
            <NavAuth variant="hero" />
          </div>
          <a
            href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 text-sm font-medium tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            onClick={() => setMobileOpen(false)}
          >
            Request Private Tour
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
