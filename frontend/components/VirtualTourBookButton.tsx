
"use client";

import { trackAndOpen } from "@/lib/trackedClick";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";

interface VirtualTourBookButtonProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function VirtualTourBookButton({
  backgroundImage = "/assets/why-villa-garden.jpg",
  title = "Begin Your Journey",
  subtitle = "Today",
  buttonText = "Book Now via WhatsApp",
  buttonLink = "/book",
}: VirtualTourBookButtonProps) {
  return (
    <section  id="virtual_tour" className="relative h-[350px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Begin your journey at Himalaya Villas & Resorts"
        fill
        sizes="100vw"
        className="object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center justify-center lg:justify-start text-center lg:text-left">
        <div>
          <h2 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            {title}
            <br />
            {subtitle}
          </h2>

          <Link
           onClick={(e) =>
        trackAndOpen(e, buildWhatsAppBookingUrl(), {
          pageType: "virtual_tour",
        })
      }
            href={buttonLink}
            className="mt-5 sm:mt-6 md:mt-8 inline-flex items-center rounded-sm justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 border border-white/30 text-white text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-white/20 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}