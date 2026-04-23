"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavAuth from "@/components/NavAuth";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import LiveWeatherBadge from "@/components/LiveWeatherBadge";

const logo = "/assets/himalaya-logo.png";

const navItems = ["Villas", "Experience", "Virtual Tour", "Journal", "Events", "Blogs", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [mobileOpen]);

  const getHref = (item: string) => {
    if (item === "Villas") return "/villas";
    if (item === "Experience") return "/experience";
    if (item === "Virtual Tour") return "/experience#virtual-tour";
    if (item === "Journal") return "/journal";
     if (item === "Weddings") return "/weddings";
    if (item === "Events") return "/events";
    if (item === "Blogs") return "/blogs";
    if (item === "Contact") return "/contact";
    return `/#${item.toLowerCase().replace(" ", "-")}`;
  };

  // Close menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "py-2 md:py-3 bg-foreground/95 backdrop-blur-md shadow-lg"
            : "py-3 sm:py-4 md:py-5 bg-transparent"
        }`}
      >
        {/* Mobile & Tablet hamburger - visible on tablet too */}
        <button
          className="lg:hidden z-50 text-white focus:outline-none active:scale-95 transition-transform flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>

        {/* Desktop nav - visible only on large screens (lg and above) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className="nav-link text-sm xl:text-base whitespace-nowrap transition-opacity hover:opacity-80 text-white"
            >
              {item}
            </Link>
          ))}
          
          {/* Logo after Contact */}
          <Link href="/" className="flex items-center justify-center ml-2 xl:ml-4 flex-shrink-0">
            <Image
              src={logo}
              alt="Himalaya Villas"
              width={160}
              height={160}
              priority
              className={`object-contain transition-all duration-500 ${
                scrolled
                  ? "h-8 w-8 xl:h-10 xl:w-10"
                  : "h-10 w-10 xl:h-12 xl:w-12"
              }`}
            />
          </Link>
        </div>

        {/* Tablet: Logo centered (visible on md to lg) */}
        <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src={logo}
              alt="Himalaya Villas"
              width={160}
              height={160}
              priority
              className={`object-contain transition-all duration-500 ${
                scrolled || mobileOpen
                  ? "h-7 w-7 sm:h-8 sm:w-8"
                  : "h-8 w-8 sm:h-10 sm:w-10"
              }`}
            />
          </Link>
        </div>

        {/* Right side buttons - responsive for all screens */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          {/* Weather badge - visible on tablet and desktop */}
          <div className="hidden sm:block">
            <LiveWeatherBadge variant="light" />
          </div>
          
          {/* NavAuth - visible on tablet and desktop */}
          <div className="hidden sm:block">
            <NavAuth variant="hero" />
          </div>
          
          {/* Book button - responsive sizing */}
          <a
            href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-2.5 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 whitespace-nowrap rounded-sm"
          >
            <span className="hidden xs:inline">Request Private Tour</span>
            <span className="xs:hidden">Book Now</span>
          </a>
        </div>
      </nav>

      {/* Mobile & Tablet Menu Overlay - visible on lg and below */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 sm:gap-5 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Close button at top right */}
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        {/* Navigation items */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 w-full px-4">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              className="font-sans text-base sm:text-lg md:text-xl font-semibold tracking-[0.12em] text-white/95 uppercase transition-all hover:text-white hover:scale-105 active:scale-95"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          
          {/* Show logo in mobile menu */}
          <div className="my-3 sm:my-4">
            <Image
              src={logo}
              alt="Himalaya Villas"
              width={50}
              height={50}
              className="opacity-80 sm:w-[60px] sm:h-[60px]"
            />
          </div>
          
          {/* Divider */}
          <div className="w-10 sm:w-12 h-px bg-white/20 my-1 sm:my-2" />
          
          {/* Mobile NavAuth */}
          <div onClick={() => setMobileOpen(false)}>
            <NavAuth variant="hero" />
          </div>
          
          {/* Mobile Book Button */}
          <a
            href={buildWhatsAppBookingUrl("a private villa tour")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-auto min-w-[180px] sm:min-w-[200px] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-sm text-center"
            onClick={() => setMobileOpen(false)}
          >
            Request Private Tour
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;