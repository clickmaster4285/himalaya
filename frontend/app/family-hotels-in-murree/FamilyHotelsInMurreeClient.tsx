"use client";

import { useEffect, useRef, useState, ReactNode, FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "/assets/gallery-exterior.jpg";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`family-murree-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function HeroBookingForm({
  familyName,
  setFamilyName,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  message,
  setMessage,
  onSubmit,
}: {
  familyName: string;
  setFamilyName: (v: string) => void;
  checkIn: string;
  setCheckIn: (v: string) => void;
  checkOut: string;
  setCheckOut: (v: string) => void;
  guests: string;
  setGuests: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="family-murree-hero__card">
      <div className="family-murree-hero__card-head">
        <h2 className="family-murree-hero__card-title">Reserve the Estate</h2>
        <span className="family-murree-hero__badge">Limited Dates</span>
      </div>

      <form onSubmit={onSubmit}>
        <div className="family-murree-hero__field">
          <label className="family-murree-hero__label" htmlFor="hero-family-name">
            Family Name
          </label>
          <input
            id="hero-family-name"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="Khan Family"
            className="family-murree-hero__input"
          />
        </div>

        <div className="family-murree-hero__row">
          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-arrival">
              Arrival
            </label>
            <div className="family-murree-hero__date-wrap">
              <input
                id="hero-arrival"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="family-murree-hero__input"
              />
            </div>
          </div>
          <div className="family-murree-hero__field">
            <label className="family-murree-hero__label" htmlFor="hero-departure">
              Departure
            </label>
            <div className="family-murree-hero__date-wrap">
              <input
                id="hero-departure"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="family-murree-hero__input"
              />
            </div>
          </div>
        </div>

        <div className="family-murree-hero__field">
          <label className="family-murree-hero__label" htmlFor="hero-family-size">
            Family Size
          </label>
          <select
            id="hero-family-size"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="family-murree-hero__select"
          >
            <option value="2-4">2–4 People</option>
            <option value="5-8">5–8 People</option>
            <option value="9-12">9–12 People</option>
            <option value="12+">12+ People</option>
          </select>
        </div>

        <div className="family-murree-hero__field">
          <label className="family-murree-hero__label" htmlFor="hero-requests">
            Special Requests
          </label>
          <textarea
            id="hero-requests"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="e.g. Baby cot, BBQ evening, birthday setup..."
            className="family-murree-hero__textarea"
          />
        </div>

        <button type="submit" className="family-murree-hero__submit">
          Check Availability
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </form>

      <p className="family-murree-hero__form-note">Sends your details directly to our concierge on WhatsApp.</p>
    </div>
  );
}

export function HeroSlider({ whatsappUrl }: { whatsappUrl: string }) {
  const [familyName, setFamilyName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("5-8");
  const [message, setMessage] = useState("");
  const whatsappBase = whatsappUrl.split("?")[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = [
      "Reserve the Estate — Family stay inquiry",
      `Family Name: ${familyName || "-"}`,
      `Arrival: ${checkIn || "-"}`,
      `Departure: ${checkOut || "-"}`,
      `Family Size: ${guests}`,
      `Special Requests: ${message || "-"}`,
    ].join("\n");
    window.open(`${whatsappBase}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const formProps = {
    familyName,
    setFamilyName,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    message,
    setMessage,
    onSubmit: handleSubmit,
  };

  return (
    <section id="book" className="family-murree-hero relative overflow-hidden">
      <header className="relative z-40 flex items-center justify-between px-6 py-5 md:px-10 lg:px-12 xl:px-14">
        <a href="/" className="family-murree-hero__logo font-serif text-xl tracking-tight md:text-[1.35rem]">
          Himalaya <span className="family-murree-hero__logo-accent">Villas</span>
        </a>
        <a href="tel:+923045679000" className="family-murree-hero__phone text-xs font-medium md:text-[13px]">
          +92 304 567 9000
        </a>
      </header>

      <div className="family-murree-hero__body">
      <div className="family-murree-hero__grid">
        <div className="family-murree-hero__left">
          <p className="family-murree-hero__kicker mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]">
            A Private Bhurban Estate
          </p>

          <h1 className="family-murree-hero__headline max-w-[520px] font-serif text-[1.85rem] font-semibold leading-[1.14] sm:text-[2.15rem] lg:text-[2.45rem] xl:text-[2.65rem]">
            Best Family Hotel in Murree —{" "}
            <span className="family-murree-text-accent italic font-normal">A Private Estate That Belongs Only to You</span>
          </h1>

          <p className="family-murree-hero__sub mt-5 max-w-[440px] text-[15px] leading-[1.65]">
            Tired of crowded hotels in Murree? Himalaya Villas is a fully private luxury estate in Bhurban — reserved
            exclusively for one family at a time. No shared spaces. No strangers. Just your family and the Himalayas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="family-murree-hero__cta-primary">
              <span className="text-[9px] leading-none">●</span>
              Book Family Stay in Murree — WhatsApp
            </a>
            <a href="tel:+923045679000" className="family-murree-hero__cta-secondary">
              Call to Book Family Villa
            </a>
          </div>
        </div>

        <div className="family-murree-hero__right">
          <img src={HERO_IMAGE} alt="Himalaya Villas private estate in Bhurban pine forest" />
        </div>
      </div>

      <div className="family-murree-hero__mobile-img lg:hidden">
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(40,38%,97%)] via-transparent to-transparent" />
      </div>

      <div className="family-murree-hero__form-wrap">
        <HeroBookingForm {...formProps} />
      </div>
      </div>
    </section>
  );
}

export function ParallaxBg({ src, speed = 0.3, opacity = 0.15 }: { src: string; speed?: number; opacity?: number }) {
  const y = useScrollY();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${src})`,
        transform: y > 0 ? `translateY(${y * speed}px)` : undefined,
        opacity,
        zIndex: 0,
      }}
    />
  );
}
