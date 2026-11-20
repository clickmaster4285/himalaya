"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import NavAuth from "@/components/NavAuth";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import LiveWeatherBadge from "@/components/LiveWeatherBadge";

const logo = "/assets/himalaya-logo.png";

interface DropdownChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: DropdownChild[];
}

const navItems: NavItem[] = [
  {
    label: "Accommodation",
    href: "/accommodations",
    children: [
      {
        label: "Apartments",
        href: "/accommodations/apartments",
        description: "Modern living spaces",
      },
      {
        label: "Villas",
        href: "/villas",
        description: "Private luxury retreats",
      },
      {
        label: "Rooms",
        href: "/accommodations/rooms",
        description: "Comfortable stays",
      },
      {
        label: "Suites",
        href: "/accommodations/suites",
        description: "Premium suites",
      },
    ],
  },
  {
    label: "Experience",
    href: "/experience",
    children: [
      {
        label: "Meetings & Events",
        href: "/events",
        description: "Corporate & celebrations",
      },
      {
        label: "Dining",
        href: "/dining",
        description: "Culinary journeys",
      },
      {
        label: "Activities",
        href: "/adventure-games",
        description: "Adventure & leisure",
      },
      {
        label: "Entertainment",
        href: "/events",
        description: "Live & curated",
      },
    ],
  },
  { label: "Virtual Tour", href: "/virtual-tour" },
  { label: "Blogs", href: "/blogs" },
  { label: "Guest Reviews", href: "/#testimonials" },
  { label: "Contact Us", href: "/contact" },
];

interface NavbarProps {
  theme?: "light" | "dark";
}

const Navbar = ({ theme = "dark" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const isLight = theme === "light";
  const textColor = isLight ? "text-gray-700" : "text-white";
  const mobileTextColor = isLight ? "text-black/95" : "text-white/95";
  const mobileHoverColor = isLight ? "hover:text-black" : "hover:text-white";
  const backdropColor = isLight
    ? "bg-white/95 backdrop-blur-md shadow-lg"
    : "bg-foreground/95 backdrop-blur-md shadow-lg";
  const transparentBg = "bg-transparent";
  const mobileOverlayBg = isLight
    ? "bg-white/95 backdrop-blur-xl"
    : "bg-black/95 backdrop-blur-xl";
  const dividerColor = isLight ? "bg-black/20" : "bg-white/20";

  // Near-opaque dropdown: backdrop-blur doesn't apply when nested inside the
  // (blurred) scrolled navbar, so translucency let page content bleed through.
  const dropdownBg = isLight
    ? "bg-white/95 backdrop-blur-2xl border border-black/10 shadow-2xl shadow-black/10"
    : "bg-foreground/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/40";
  const dropdownItemHover = isLight
    ? "hover:bg-white/70"
    : "hover:bg-white/10";
  const dropdownText = isLight ? "text-gray-800" : "text-white/90";
  const dropdownMuted = isLight ? "text-gray-500" : "text-white/50";
  const viewAllBg = isLight
    ? "bg-black/5 hover:bg-black/10 text-gray-800"
    : "bg-white/10 hover:bg-white/15 text-white";

  useEffect(() => {
    let wasScrolled: boolean | null = null;
    const onScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled === wasScrolled) return;
      wasScrolled = isScrolled;
      setScrolled(isScrolled);
      // Close any open dropdown when the navbar switches between transparent/solid
      setActiveDropdown(null);
    };
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 transition-all duration-500 ${
          scrolled || mobileOpen
            ? `py-2 md:py-3 ${backdropColor}`
            : `py-3 sm:py-4 md:py-5 ${transparentBg}`
        }`}
      >
        {/* Mobile & Tablet hamburger */}
        <button
          className={`lg:hidden z-50 focus:outline-none active:scale-95 transition-transform flex-shrink-0 ${textColor}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7">
          {/* Logo FIRST — acts as Home */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95 mr-1 xl:mr-2"
          >
            <Image
              src={logo}
              unoptimized
              alt="Himalaya Villas & Resorts"
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

          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() =>
                item.children && handleDropdownEnter(item.label)
              }
              onMouseLeave={() => item.children && handleDropdownLeave()}
            >
              {item.children ? (
                <>
                  <div className={`flex items-center gap-1 ${textColor}`}>
                    {/* Parent label navigates to the parent page */}
                    <Link
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="nav-link text-sm xl:text-base whitespace-nowrap transition-opacity hover:opacity-80"
                    >
                      {item.label}
                    </Link>
                    {/* Chevron toggles the dropdown (touch / keyboard) */}
                    <button
                      type="button"
                      className="transition-opacity hover:opacity-80"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      aria-label={`Show ${item.label} menu`}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Transparent professional dropdown */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 origin-top ${
                      activeDropdown === item.label
                        ? "opacity-100 visible translate-y-0 scale-100"
                        : "opacity-0 invisible -translate-y-2 scale-95 pointer-events-none"
                    }`}
                  >
                    <div
                      className={`w-[300px] rounded-2xl overflow-hidden ${dropdownBg}`}
                    >
                      {/* Dropdown header */}
                      <div
                        className={`px-5 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${dropdownMuted}`}
                      >
                        {item.label}
                      </div>

                      {/* Text-only items */}
                      <div className="px-2 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${dropdownItemHover}`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="flex flex-col min-w-0">
                              <span
                                className={`text-sm font-medium leading-tight ${dropdownText}`}
                              >
                                {child.label}
                              </span>
                              {child.description && (
                                <span
                                  className={`text-[11px] leading-tight mt-0.5 ${dropdownMuted}`}
                                >
                                  {child.description}
                                </span>
                              )}
                            </span>
                            <ChevronRight
                              className={`h-3.5 w-3.5 flex-shrink-0 ml-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 ${dropdownMuted}`}
                            />
                          </Link>
                        ))}
                      </div>

                      {/* View All root link */}
                      <Link
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`group flex items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${viewAllBg}`}
                      >
                        <span>View All {item.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`nav-link text-sm xl:text-base whitespace-nowrap transition-opacity hover:opacity-80 ${textColor}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Tablet / Mobile: Logo centered — acts as Home */}
        <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src={logo}
              unoptimized
              alt="Himalaya Villas & Resorts"
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

        {/* Right side buttons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          <div className="hidden sm:block">
            <LiveWeatherBadge variant={isLight ? "dark" : "light"} />
          </div>

          <div className="hidden sm:block">
            <NavAuth variant={isLight ? "dark" : "hero"} />
          </div>

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

      {/* Mobile & Tablet Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 ${mobileOverlayBg} flex flex-col items-center justify-center gap-4 sm:gap-5 lg:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <button
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${textColor} p-2`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <div className="flex flex-col items-start gap-3 sm:gap-4 w-full px-4 max-h-[80vh] overflow-y-auto">
          {/* Logo / Home entry */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            aria-label="Go to homepage"
            className="flex items-center gap-3 mb-1 transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src={logo}
              unoptimized
              alt="Himalaya Villas & Resorts"
              width={120}
              height={120}
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
            />
            <span
              className={`font-sans text-base sm:text-lg font-semibold tracking-[0.12em] ${mobileTextColor} uppercase`}
            >
              Home
            </span>
          </Link>

          {navItems.map((item) => (
            <div key={item.label} className="w-full">
              {item.children ? (
                <>
                  <div
                    className={`flex items-center justify-between w-full font-sans text-base sm:text-lg md:text-xl font-semibold tracking-[0.12em] ${mobileTextColor} uppercase py-1`}
                  >
                    {/* Parent label navigates to the parent page */}
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`transition-all ${mobileHoverColor}`}
                    >
                      {item.label}
                    </Link>
                    {/* Chevron expands the submenu */}
                    <button
                      type="button"
                      className={`p-2 -mr-2 transition-all ${mobileHoverColor}`}
                      onClick={() => toggleMobileExpand(item.label)}
                      aria-label={`Show ${item.label} menu`}
                      aria-expanded={mobileExpanded === item.label}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileExpanded === item.label
                        ? "max-h-[500px] opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-1 pl-4 border-l border-current/20">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`flex flex-col py-2 text-sm sm:text-base font-medium tracking-wide ${mobileTextColor} opacity-80 hover:opacity-100 transition-opacity`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span>{child.label}</span>
                          {child.description && (
                            <span className="text-[11px] opacity-60 mt-0.5">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}

                      {/* View All in mobile */}
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 py-2 mt-1 text-xs font-semibold uppercase tracking-wider ${mobileTextColor} opacity-70 hover:opacity-100 transition-opacity`}
                      >
                        View All {item.label}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`font-sans text-base sm:text-lg md:text-xl font-semibold tracking-[0.12em] ${mobileTextColor} uppercase transition-all ${mobileHoverColor} hover:scale-105 active:scale-95 py-1 inline-block`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className={`w-10 sm:w-12 h-px ${dividerColor} my-1 sm:my-2`} />

          <div onClick={() => setMobileOpen(false)}>
            <NavAuth variant={isLight ? "dark" : "hero"} />
          </div>

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