"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavAuth from "@/components/NavAuth";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import LiveWeatherBadge from "@/components/LiveWeatherBadge";

const logo = "/assets/himalaya-logo.png";

const items = [
  { label: "Villas", href: "/villas" },
  { label: "Experience", href: "/experience" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export default function DetailNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  return (
    <>
      <nav className={`w-full bg-[#F6F1EA] transition-all duration-300 ${
        scrolled ? "shadow-md sticky top-0 z-50" : ""
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-5 md:py-6 flex items-center justify-between relative">
          
          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden z-50 text-neutral-800 focus:outline-none active:scale-95 transition-transform"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[10px] lg:text-[11px] tracking-[0.28em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo - Centered on all screens */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <Image 
                src={logo} 
                alt="Himalaya Villas" 
                width={48} 
                height={48} 
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto">
            {/* Weather Badge - hidden on very small screens */}
            <div className="hidden sm:block">
              <LiveWeatherBadge variant="dark" />
            </div>
            
            {/* NavAuth - hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
              <NavAuth variant="cream" />
            </div>
            
            {/* Book Now Button */}
            <a
              href={buildWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.28em] uppercase border border-neutral-500/60 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors whitespace-nowrap"
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F6F1EA] flex flex-col items-center justify-center gap-6 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-neutral-800 p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Mobile Navigation Items */}
        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full px-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-base sm:text-lg font-medium tracking-[0.2em] text-neutral-800 uppercase transition-all hover:text-neutral-600 hover:scale-105 active:scale-95"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Divider */}
          <div className="w-12 h-px bg-neutral-300 my-2" />
          
          {/* Mobile NavAuth */}
          <div onClick={() => setMobileOpen(false)}>
            <NavAuth variant="cream" />
          </div>
          
          {/* Mobile Book Button */}
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-2.5 text-xs font-medium tracking-[0.28em] uppercase border border-neutral-500/60 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Book Now
          </a>
        </div>
      </div>
    </>
  );
}