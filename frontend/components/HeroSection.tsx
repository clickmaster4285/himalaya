const heroVideo = "/assets/hero-video.mp4";
import Navbar from "./Navbar";
import BookingWidget from "./BookingWidget";
import { ArrowRight } from "lucide-react";

const heroPills = [
  "Designed for elite gatherings",
  "Ultra-private luxury estate",
  "Limited bookings per month",
] as const;

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-overlay pointer-events-none absolute inset-0 z-10" />
      {/* Extra bottom weight so copy + booking bar sit on a consistently dark band */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[min(58vh,520px)] bg-gradient-to-t from-black/80 via-black/45 to-transparent"
        aria-hidden
      />

      <Navbar />

      <div className="relative z-20 flex h-full flex-col justify-end px-4 pb-10 pt-24 sm:px-8 sm:pb-14 md:px-12 md:pb-20 lg:px-16 lg:pb-24">
        <div className="flex w-full max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12 xl:mx-auto">
          <div className="max-w-xl lg:max-w-2xl">
            <ul
              className="hero-pills mb-6 grid list-none gap-2 animate-fade-up sm:mb-8 sm:max-w-2xl sm:grid-cols-3 sm:gap-3"
              role="list"
            >
              {heroPills.map((label) => (
                <li key={label}>
                  <span className="flex min-h-[2.75rem] items-center justify-center rounded-full border border-white/20 bg-black/35 px-3 py-2 text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-white/95 shadow-sm backdrop-blur-md sm:min-h-0 sm:px-3 sm:py-2.5 sm:text-[11px] sm:tracking-[0.16em]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <h1
              className="hero-headline font-display animate-fade-up text-4xl font-normal leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
              style={{
                textShadow: "0 2px 3px rgb(0 0 0 / 0.35), 0 12px 40px rgb(0 0 0 / 0.45)",
              }}
            >
              Himalaya Premium Villas
            </h1>

            <p
              className="mt-5 max-w-xl animate-fade-up-delay text-[15px] font-light leading-[1.65] text-white/92 md:text-base md:leading-relaxed"
              style={{
                textShadow: "0 1px 2px rgb(0 0 0 / 0.5), 0 8px 24px rgb(0 0 0 / 0.35)",
              }}
            >
              Himalaya Premium Villas is not a hotel. It is a private luxury estate crafted for those who demand
              exclusivity, privacy, and elevated experiences in the hills of Bhurban.
            </p>

            <div className="mt-8 flex flex-col gap-3 animate-fade-up-delay-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="/book/stay"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-neutral-900"
              >
                Check availability
                <ArrowRight className="h-4 w-4 transition-transform text-white group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href="https://wa.me/923045679000?text=I%20would%20like%20to%20request%20a%20private%20tour"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border-2 border-white/85 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md backdrop-blur-sm transition hover:bg-white/15"
              >
                Request private tour
              </a>
            </div>
          </div>

          <div className="w-full min-w-0 shrink-0 animate-fade-up-delay-2 md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
