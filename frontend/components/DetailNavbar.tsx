"use client";

import Link from "next/link";
import NavAuth from "@/components/NavAuth";

const logo = "/assets/himalaya-logo.png";

const items = [
  { label: "Villas", href: "/villas" },
  { label: "Experience", href: "/experience" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export default function DetailNavbar() {
  return (
    <nav className="w-full bg-[#F6F1EA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between relative">
        <ul className="hidden md:flex items-center gap-7">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[11px] tracking-[0.28em] uppercase text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="Himalaya Villas" className="h-12 w-12 object-contain" />
        </div>

        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <NavAuth variant="cream" />
          <Link
            href="/book"
            className="px-5 py-2 text-[11px] tracking-[0.28em] uppercase border border-neutral-500/60 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

