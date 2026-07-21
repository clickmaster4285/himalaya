// components/EventsHero.tsx
"use client";

import { Heart } from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";
import Navbar from "@/components/Navbar";
import EventsHeroSlider from "@/components/EventsHeroSlider";

interface EventsHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badgeText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonId?: string;
  secondaryButtonId?: string;
  primaryButtonEventType?: string;
  secondaryButtonEventType?: string;
  primaryButtonCta?: string;
  secondaryButtonCta?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
}

export default function EventsHero({
  title = "Events That Look Premium, Feel Effortless",
  subtitle = "Curated Destination Events",
  description = "Plan your wedding, nikah, corporate retreat, or private celebration with end-to-end support in the heart of the Himalayas.",
  badgeText = "Curated Destination Events",
  primaryButtonText = "Plan Your Event",
  secondaryButtonText = "Book Your Stay",
  primaryButtonId = "plan_your_event",
  secondaryButtonId = "book_your_stay",
  primaryButtonEventType = "plan_event_click",
  secondaryButtonEventType = "book_stay_click",
  primaryButtonCta = "plan_event",
  secondaryButtonCta = "book_stay",
  primaryButtonHref = buildWhatsAppBookingUrl("an event booking"),
  secondaryButtonHref = buildWhatsAppBookingUrl(),
}: EventsHeroProps) {
  
  const handlePrimaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackAndOpen(
      e,
      primaryButtonHref,
      {
        cta: primaryButtonCta,
      }
    );
  };

  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackAndOpen(
      e,
      secondaryButtonHref,
      {
        cta: secondaryButtonCta,
      }
    );
  };

  return (
    <section
  id="events-section"
  className="relative z-10 flex min-h-[780px] items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
>
  <div className="mx-auto max-w-5xl text-center">
    <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white shadow-lg">
      <Heart className="h-4 w-4 text-primary" />
      {badgeText}
    </p>

    <h1
      className="mt-8 font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl  leading-[1.1] tracking-tight"
      style={{ textShadow: "0 8px 30px rgba(0,0,0,.45)" }}
    >
      {title}
    </h1>

    <p
      className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-8 text-white/85"
      style={{ textShadow: "0 2px 12px rgba(0,0,0,.35)" }}
    >
      {description}
    </p>

    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        id={primaryButtonId}
        href={primaryButtonHref}
        target="_blank"
        rel="noopener noreferrer"
        data-event-type={primaryButtonEventType}
        onClick={handlePrimaryClick}
        className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 shadow-xl"
      >
        {primaryButtonText}
      </a>

      <a
        id={secondaryButtonId}
        href={secondaryButtonHref}
        target="_blank"
        rel="noopener noreferrer"
        data-event-type={secondaryButtonEventType}
        onClick={handleSecondaryClick}
        className="inline-flex h-14 items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur-md px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-neutral-900 hover:scale-105"
      >
        {secondaryButtonText}
      </a>
    </div>
  </div>
</section>
  );
}