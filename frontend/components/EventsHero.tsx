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
    <section className="relative min-h-[780px] w-full overflow-hidden">
      <EventsHeroSlider alt="Luxury events at Himalaya Villas & Resorts" priority />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <Navbar />

      <section id="events-section" className="relative z-10 w-full px-4 md:px-8 lg:px-10 pt-36 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-7xl">
          <div className="max-w-3xl">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/90">
                <Heart className="h-4 w-4" />
                {badgeText}
              </p>

              <h1 className="mt-5 font-display text-white text-4xl md:text-6xl leading-tight whitespace-nowrap">
                {title}
              </h1>

              <p className="mt-5 max-w-xl text-white/90 text-sm md:text-base leading-relaxed">
                {description}
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <a
                  id={primaryButtonId}
                  href={primaryButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event-type={primaryButtonEventType}
                  onClick={handlePrimaryClick}
                  className="inline-flex items-center justify-center px-2.5 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium tracking-wider uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 whitespace-nowrap rounded-sm"
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
                  className="rounded-md border border-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-neutral-900"
                >
                  {secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}