import Navbar from "./Navbar";
import BookingWidget from "./BookingWidget";
import HeroMedia from "./HeroMedia";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const heroPills = [
  "Designed for elite gatherings",
  "Ultra-private luxury estate",
  "Limited bookings per month",
] as const;

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroMedia />
      </div>

      <div className="hero-overlay pointer-events-none absolute inset-0 z-10" />
      
      {/* Extra bottom weight - responsive height */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/45 to-transparent"
        style={{ height: "min(58vh, 520px)" }}
        aria-hidden
      />

      <Navbar />

      <div className="relative z-20 flex h-full flex-col justify-end px-4 pb-8 pt-24 sm:px-6 sm:pb-10 md:px-8 md:pb-14 lg:px-12 lg:pb-20 xl:px-16 xl:pb-24">
        <div className="flex w-full max-w-[1400px] flex-col gap-8 sm:gap-10 md:flex-row md:items-end md:justify-between md:gap-12 xl:mx-auto">
          
          {/* Left Content */}
          <div className="max-w-xl lg:max-w-2xl">
            {/* Pills - Responsive grid */}
            <ul
              className="hero-pills mb-5 sm:mb-6 md:mb-8 grid list-none gap-2 animate-fade-up sm:grid-cols-3 sm:gap-3"
              role="list"
            >
              {heroPills.map((label) => (
                <li key={label}>
                  <span className="flex min-h-[2.5rem] sm:min-h-[2.75rem] items-center justify-center rounded-full border border-white/20 bg-black/35 px-2.5 sm:px-3 py-2 text-center text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.16em] text-white/95 shadow-sm backdrop-blur-md">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Heading - Responsive font sizes */}
            <h1
              className="hero-headline font-display animate-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-normal leading-[1.15] sm:leading-[1.1] md:leading-[1.08] text-white"
              style={{
                textShadow: "0 2px 3px rgb(0 0 0 / 0.35), 0 12px 40px rgb(0 0 0 / 0.45)",
              }}
            >
              Himalaya Villas and Resort
            </h1>

            {/* Description - Responsive text size */}
            <p
              className="mt-4 sm:mt-5 max-w-xl animate-fade-up-delay text-[13px] sm:text-[14px] md:text-[15px] lg:text-base font-light leading-[1.6] sm:leading-[1.65] text-white/92"
              style={{
                textShadow: "0 1px 2px rgb(0 0 0 / 0.5), 0 8px 24px rgb(0 0 0 / 0.35)",
              }}
            >
              Himalaya Villas and Resort is not a hotel. It is a private luxury estate crafted for those who demand
              exclusivity, privacy, and elevated experiences in the hills of Bhurban.
            </p>

            {/* Buttons - Responsive layout */}
            <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up-delay-2">
              <a
                href={buildWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white shadow-lg transition hover:bg-neutral-900 w-full sm:w-auto"
              >
                Check availability
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform text-white group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href={buildWhatsAppBookingUrl("a private villa tour")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border-2 border-white/85 bg-white/5 px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white shadow-md backdrop-blur-sm transition hover:bg-white/15 w-full sm:w-auto"
              >
                Request private tour
              </a>
              <a href="/book-now">Book Now</a>
            </div>
          </div>

          {/* Booking Widget - Responsive width */}
          <div className="w-full min-w-0 shrink-0 animate-fade-up-delay-2 md:max-w-md lg:max-w-lg xl:max-w-xl mt-4 sm:mt-6 md:mt-0">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;