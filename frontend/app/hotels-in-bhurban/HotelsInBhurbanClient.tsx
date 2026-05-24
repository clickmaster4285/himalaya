"use client";

import { HOTELS_IN_BHURBAN_FAQS } from "@/lib/seo/hotels-in-bhurban-faqs";
import { useEffect, useRef, useState, ReactNode } from "react";
import {
  Mountain, Sparkles, Home, Star, Utensils, Briefcase, Clock,
  Phone, Mail, MapPin, Check,
  Sun, Snowflake, Flower2, Facebook, Twitter, Linkedin, ArrowDown, Wifi, Users, Heart, Calendar, MessageCircle,
  LogIn, LogOut, ShieldCheck, RotateCcw, Navigation, Quote, ExternalLink, BedDouble,
} from "lucide-react";
import { SITE_CONTACT, telHref, mailtoHref } from "@/lib/site-contact";
import { Coffee, Car, Accessibility, Shirt, ConciergeBell, Baby, ChefHat, Bus, CigaretteOff } from "lucide-react";
import { buildBhurbanInquiryWhatsAppUrl, buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const BHBURBAN_WHATSAPP_URL = buildWhatsAppBookingUrl(
  "a private stay at Himalaya Premium Villas and Resort in Bhurban Murree"
);
const HERO_STATIC_IMAGE = "/assets/hero-bhurban-static.png";

/** Deep link for pricing CTA (pre-filled message). */
const PRICING_WHATSAPP_BOOK_URL =
  "https://wa.me/923045679000?text=I%20want%20to%20book%20a%20private%20stay%20at%20Himalaya%20Premium%20Villas%20and%20Resort%20in%20Bhurban%20Murree";

/* ============================================================
   ALL-IN-ONE PAGE — fonts, design tokens, gradients, animations,
   hero slider, 8 parallax sections and footer all in ONE file.
   ============================================================ */
const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.bh-page{
  --bg:40 38% 97%; --fg:165 35% 12%;
  --card:0 0% 100%; --muted:165 12% 38%;
  --primary:165 60% 18%; --primary-fg:40 38% 97%; --primary-glow:165 55% 32%;
  --accent:38 88% 55%; --accent-glow:42 95% 65%;
  --border:165 15% 86%;
  font-family:'Inter',system-ui,sans-serif;
  color:hsl(var(--fg));
  background:hsl(var(--bg));
  min-height:100vh;
  overflow-x:hidden;
  max-width:100%;
}
.bh-page h1,.bh-page h2,.bh-page h3,.bh-page h4{font-family:'Playfair Display',Georgia,serif;}
.bh-page a{color:inherit;text-decoration:none;}
.bh-page button{font-family:inherit;cursor:pointer;border:0;}

.bh-grad-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));}
.bh-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.bh-grad-hero{background:linear-gradient(135deg,hsl(165 60% 12% / .85),hsl(165 50% 25% / .55));}
.bh-text-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.bh-text-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.bh-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.bh-shadow-gold{box-shadow:0 15px 40px -10px hsl(38 88% 55% / .5);}

.bh-card{background:hsl(var(--card));border-radius:24px;}
.bh-border{border:1px solid hsl(var(--border));}
.bh-muted{color:hsl(var(--muted));}

.bh-reveal{opacity:0;transform:translateY(40px) translateZ(0);transition:opacity .9s ease-out,transform .9s ease-out;}
.bh-reveal.in{opacity:1;transform:translateY(0) translateZ(0);}

@keyframes bhScrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
.bh-scroll-ind{animation:bhScrollDown 1.5s ease-in-out infinite;}

html{scroll-behavior:smooth;}
`;

/* ----------------------------- Hooks ----------------------------- */
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

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
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
    <div ref={ref} className={`bh-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ----------------------------- Data ----------------------------- */
const RESORT_GALLERY_IMAGES = [
  "/assets/gallery-exterior.jpg",
  "/assets/gallery-interior.jpg",
  "/assets/gallery-garden.jpg",
  "/assets/gallery-balcony.jpg",
  "/assets/gallery-dining-night.jpg",
  "/assets/gallery-bbq.jpg",
  "/assets/gallery-sunlight.jpg",
  "/assets/gallery-reflection.jpg",
] as const;

/** SEO alt text per gallery image (not shown on page — img alt only). */
const GALLERY_IMAGE_ALTS: Record<(typeof RESORT_GALLERY_IMAGES)[number], string> = {
  "/assets/gallery-exterior.jpg": "hotels in bhurban murree",
  "/assets/gallery-interior.jpg": "best hotel in bhurban murree",
  "/assets/gallery-garden.jpg": "hotel in bhurban murree",
  "/assets/gallery-balcony.jpg": "bhurban hotel murree",
  "/assets/gallery-dining-night.jpg": "resort in bhurban murree",
  "/assets/gallery-bbq.jpg": "bhurban murree hotels",
  "/assets/gallery-sunlight.jpg": "best hotels in bhurban murree",
  "/assets/gallery-reflection.jpg": "bhurban murree best hotels",
};

/** Hero alt covers keywords 9–10 (not visible on page). */
const HERO_IMAGE_ALT = "villas in bhurban murree, hotels in bhurban pakistan";

function galleryImageAlt(src: string): string {
  return GALLERY_IMAGE_ALTS[src as (typeof RESORT_GALLERY_IMAGES)[number]] ?? "hotels in bhurban murree";
}

/* ----------------------------- Hero Slider ----------------------------- */
const EMPTY_INQUIRY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  checkInDate: "",
  checkOutDate: "",
  numberOfGuests: "2",
  message: "",
};

function HeroSlider() {
  const [form, setForm] = useState(EMPTY_INQUIRY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [successNote, setSuccessNote] = useState("");

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitError("");
    }
  };

  const submitInquiry = async () => {
    const payload = { ...form, source: "hotels-in-bhurban-hero" };
    setSuccessNote("");

    const res = await fetch("/api/bhurban-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      emailSent?: boolean;
      saved?: boolean;
      emailPending?: boolean;
      guestEmailSent?: boolean;
      staffEmailSent?: boolean;
    };

    if (!res.ok) {
      setSubmitStatus("error");
      setSubmitError(
        data.error ??
          "Could not send your message. Please use WhatsApp below — we will reply quickly."
      );
      return;
    }

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submitted",
      });
    }

    setSubmitStatus("success");
    const email = form.email.trim();
    if (data.saved && (data.guestEmailSent || data.emailPending || data.emailSent)) {
      setSuccessNote(
        `Thank you! Your inquiry is saved. A confirmation email was sent to ${email}. We will reply shortly.`
      );
    } else if (data.saved) {
      setSuccessNote(
        "Thank you — your inquiry is saved. We could not send email right now; our team will contact you soon."
      );
    } else {
      setSuccessNote("Thank you — we received your inquiry.");
    }
    setForm(EMPTY_INQUIRY_FORM);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (submitting) return;
    setSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");
    void submitInquiry()
      .catch(() => {
        setSubmitStatus("error");
        setSubmitError("Could not send. Tap WhatsApp below to send your details instantly.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="relative min-h-[100dvh] w-full lg:h-screen lg:overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_STATIC_IMAGE}
          alt={HERO_IMAGE_ALT}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bh-grad-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col gap-8 px-2 py-8 pb-24 lg:h-full lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-6 lg:pb-10 lg:py-10" style={{ color: "hsl(40 38% 97%)" }}>
        <div className="w-full shrink-0 lg:w-1/2">
          <Reveal>
            <h1 className="text-3xl font-bold leading-snug sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bh-text-gold">Hotels in Bhurban Murree</span>
              <span className="text-white"> | Himalaya Premium Villas and Resort</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
              The best hotel in Bhurban Murree for groups who want the full estate — luxury villa hospitality in the heart of the Murree Hills, reserved exclusively for you.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "hsl(40 38% 97% / .85)" }}>
              The <strong>best hotel in Bhurban Murree</strong> for your group — a <strong>luxury bhurban murree hotel</strong> estate where you book the full property. Forget crowded lobbies; every detail here is designed around you alone.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BHBURBAN_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bh-grad-gold bh-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
                style={{ color: "hsl(165 60% 18%)" }}
              >
                Book Now
              </a>
              <a href="#estate" className="rounded-full px-8 py-4 text-base font-semibold backdrop-blur-md transition"
                style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)" }}>
                Explore the Villas
              </a>
            </div>
          </Reveal>
        </div>
        
        {/* CTA Form — full width on mobile, right column on lg */}
        <div className="mt-2 w-full shrink-0 lg:mt-0 lg:w-1/3">
          <Reveal delay={800}>
            <div className="max-h-none overflow-visible bg-white/95 backdrop-blur-lg rounded-lg shadow-lg px-2 py-3 lg:mt-2 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:px-6 lg:py-6">
              <h3 className="mb-3 text-lg font-bold text-gray-800 lg:mb-6 lg:text-2xl">Send Us a Message & Book Your Bhurban Murree Hotel</h3>
              {submitStatus === "success" ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-800 lg:p-6 lg:text-base">
                  <p className="font-semibold">Thank you — inquiry received!</p>
                  <p className="mt-2">
                    {successNote ||
                      "We will reply to your email shortly. For urgent bookings, WhatsApp us anytime."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitStatus("idle");
                      setSuccessNote("");
                    }}
                    className="mt-4 text-sm font-semibold text-emerald-700 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form
                onSubmit={onFormSubmit}
                action="#"
                noValidate={false}
                className="space-y-2.5 lg:space-y-4"
              >
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={onFormChange}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onFormChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={onFormChange}
                    placeholder="+92 300 0000000"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="checkInDate" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Check-in Date</label>
                    <input
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={form.checkInDate}
                      onChange={onFormChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOutDate" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Check-out Date</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={form.checkOutDate}
                      onChange={onFormChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="numberOfGuests" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Number of Guests</label>
                  <select
                    id="numberOfGuests"
                    name="numberOfGuests"
                    value={form.numberOfGuests}
                    onChange={onFormChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={onFormChange}
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                {submitStatus === "error" && submitError ? (
                  <div className="space-y-3" role="alert">
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {submitError}
                    </p>
                    <a
                      href={buildBhurbanInquiryWhatsAppUrl(form)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Send via WhatsApp instead
                    </a>
                  </div>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 lg:py-4 lg:text-lg"
                >
                  {submitting ? "Sending…" : "Book Your Luxury Stay in Bhurban Murree"}
                </button>
              </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1" style={{ color: "hsl(40 38% 97% / .7)" }}>
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 bh-scroll-ind" />
      </div>
    </section>
  );
}

/* ----------------------------- Helpers ----------------------------- */
function Section({ id, children, className = "", style }: { id?: string; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <section id={id} className={`relative overflow-hidden py-24 md:py-32 ${className}`} style={style}>{children}</section>;
}

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6">{children}</div>;
}

function SectionHeader({ kicker, title, sub, light = false }: { kicker?: string; title: ReactNode; sub: string; light?: boolean }) {
  return (
    <Reveal>
      <div className="mx-auto mb-16 max-w-3xl text-center">
        {kicker && (
          <span className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{ background: light ? "hsl(38 88% 55% / .2)" : "hsl(38 88% 55% / .15)", color: light ? "hsl(42 95% 75%)" : "hsl(165 60% 18%)" }}>
            {kicker}
          </span>
        )}
        <h2 className="text-4xl font-bold md:text-5xl" style={{ color: light ? "hsl(40 38% 97%)" : "hsl(165 60% 18%)" }}>{title}</h2>
        <p className="mt-4 text-lg" style={{ color: light ? "hsl(40 38% 97% / .8)" : "hsl(165 12% 38%)" }}>{sub}</p>
      </div>
    </Reveal>
  );
}

function ParallaxBg({ src, speed = 0.3, opacity = 0.15 }: { src: string; speed?: number; opacity?: number }) {
  const y = useScrollY();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${src})`, transform: y > 0 ? `translateY(${y * speed}px)` : undefined, opacity, zIndex: 0 }} />
    );
}

/* ----------------------------- 1. Introduction ----------------------------- */
function Introduction() {
  return (
    <Section id="introduction" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="/assets/gallery-exterior.jpg" speed={0.2} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-5xl mb-6 text-center" style={{ color: "hsl(165 60% 18%)" }}>
                Looking for the Best Hotel in Bhurban Murree? <span className="bh-text-emerald">Bhurban Murree Hotels Don&apos;t Compare to This</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-center text-lg leading-relaxed bh-muted max-w-3xl mx-auto">
                Travellers comparing <strong>hotels in Bhurban Murree</strong> and <strong>bhurban murree hotels</strong> quickly discover that a private estate delivers what shared properties cannot — complete privacy, mountain views on every terrace, and service built around your group alone.
              </p>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- Amenities ----------------------------- */
function Amenities() {
  const amenitiesList = [
    { name: "Free Wi-Fi", icon: Wifi, available: true },
    { name: "Free breakfast", icon: Coffee, available: true },
    { name: "Free parking", icon: Car, available: true },
    { name: "Accessible", icon: Accessibility, available: true },
    { name: "Air-conditioned", icon: Snowflake, available: true },
    { name: "Laundry service", icon: Shirt, available: true },
    { name: "Room service", icon: ConciergeBell, available: true },
    { name: "Kid-friendly", icon: Baby, available: true },
    { name: "Restaurant", icon: Utensils, available: true },
    { name: "Kitchen in all rooms", icon: ChefHat, available: true },
    { name: "Airport shuttle", icon: Bus, available: true },
    { name: "Smoke-free", icon: CigaretteOff, available: true },
  ];

  return (
    <Section id="amenities" style={{ background: "hsl(40 40% 92%)", paddingTop: "0" }}>
      <Container>
        <Reveal>
          <p className="mb-8 text-center text-base bh-muted max-w-3xl mx-auto">
            Whether you are weighing a chain <strong>resort in Bhurban Murree</strong> or a private stay, these are the amenities guests expect from a top <strong>bhurban hotel murree</strong> experience — delivered here as standard across the entire estate.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {amenitiesList.map((item, k) => (
            <Reveal key={k} delay={k * 50} className="min-w-0">
              <div className={`bh-card bh-border flex min-w-0 w-full items-center gap-3 p-3 transition-transform hover:-translate-y-1 sm:gap-4 sm:p-4 ${!item.available ? "opacity-60" : "bh-shadow-lux bg-white"}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12 ${item.available ? "bh-grad-emerald text-white" : "bg-gray-200 text-gray-500"}`}>
                  <item.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <span className={`min-w-0 flex-1 text-sm font-semibold leading-snug sm:text-base ${item.available ? "text-gray-800" : "text-gray-500 line-through"}`}>
                  {item.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 2. Why We Stand Apart ----------------------------- */
function WhyStandApart() {
  const features = [
    { 
      icon: Home, 
      title: "The Best Hotel in Bhurban Murree", 
      desc: "We operate with limited monthly bookings so that every guest receives the full estate exclusively — the best hotel experience in Bhurban Murree without shared spaces, strangers, or noise from adjacent rooms. When you book, the entire estate is yours."
    },
    { 
      icon: Mountain, 
      title: "Panoramic Himalayan Views", 
      desc: "Every window, terrace, and outdoor space at Himalaya Premium Villas and Resort has been positioned to frame the most spectacular Himalayan vistas. Wake up every morning to a view that reminds you why you came to Bhurban Murree in the first place."
    },
    { 
      icon: Utensils, 
      title: "Curated In-Villa Dining", 
      desc: "Forget fixed menus and restaurant queues. Dining at Himalaya Premium Villas and Resort is a bespoke experience — from intimate candlelit in-villa meals to open-air barbecue evenings under the mountain sky, every meal is crafted around your preferences and schedule."
    },
    { 
      icon: Heart, 
      title: "Destination Weddings & Corporate Retreats", 
      desc: "Dreaming of a royal destination wedding in Bhurban Murree? Planning an executive retreat away from the city? Himalaya Premium Villas and Resort provides a breathtaking backdrop, world-class event infrastructure, and a dedicated team committed to making every occasion flawless and unforgettable."
    },
    { 
      icon: Sparkles, 
      title: "Absolute Privacy, Always", 
      desc: "Privacy is not an upgrade at Himalaya Premium Villas and Resort — it is the foundation. No lobbies. No shared pools. No random guests wandering past. From arrival to departure, the entire estate belongs to you and those you choose to bring."
    },
    { 
      icon: Clock, 
      title: "24/7 Dedicated Concierge", 
      desc: "Our team is available around the clock to handle every detail — whether that means arranging a special dining setup, coordinating event logistics, or simply ensuring your stay flows exactly as you imagined it."
    }
  ];

  return (
    <Section id="stand-apart">
      <Container>
        <SectionHeader 
          kicker="What Makes Us Different" 
          title={<>What Makes the Best Hotels in Bhurban Murree <span className="bh-text-emerald">Truly Different</span></>}
          sub="Among the best hotels in Bhurban Murree travellers research, Himalaya Premium Villas and Resort leads with exclusive full-estate stays — the entire property is yours, with hotel-grade service and villa-level privacy." 
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, k) => (
            <Reveal key={k} delay={k * 100}>
              <div className="bh-card bh-shadow-lux group h-full p-8 transition hover:-translate-y-3">
                <div className="bh-grad-emerald mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{feature.title}</h3>
                <p className="bh-muted leading-relaxed">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 3. Ideal For ----------------------------- */
function IdealFor() {
  const guestTypes = [
    { 
      icon: Users, 
      title: "Families", 
      desc: "seeking meaningful time together in a luxurious, private mountain setting without distractions"
    },
    { 
      icon: Heart, 
      title: "Couples", 
      desc: "celebrating honeymoons, anniversaries, or simply a romantic escape in the Himalayan foothills"
    },
    { 
      icon: Briefcase, 
      title: "Corporate Groups", 
      desc: "looking for an exclusive off-site retreat and high-level strategy sessions in a stunning natural environment"
    },
    { 
      icon: Sparkles, 
      title: "Wedding Parties", 
      desc: "planning a grand, unforgettable destination wedding in Bhurban with a world-class backdrop"
    },
    { 
      icon: Home, 
      title: "Friend Groups", 
      desc: "who want an entire luxury estate to themselves — no sharing, no compromises, just pure enjoyment"
    },
    {
      icon: Mountain,
      title: "Nature Lovers",
      desc: "who come for pine forests, fresh mountain air, and Himalayan views — with five-star comfort waiting at the villa"
    },
  ];

  return (
    <Section id="ideal-for" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="/assets/gallery-dining-night.jpg" speed={0.25} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Perfect For" 
            title={<>Who Is Himalaya Premium Villas and Resort <span className="bh-text-emerald">Perfect For?</span></>}
            sub="Himalaya Premium Villas and Resort is crafted for guests who value quality over quantity — those who know the difference between a stay and an experience." 
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guestTypes.map((type, k) => (
              <Reveal key={k} delay={k * 150}>
                <div className="bh-card bh-shadow-lux group h-full p-8 text-center transition hover:-translate-y-3">
                  <div className="bh-grad-emerald mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                    <type.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{type.title}</h3>
                  <p className="bh-muted leading-relaxed">{type.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 4. The Estate ----------------------------- */
function TheEstate() {
  const estateFeatures = [
    "Multiple elegantly furnished bedrooms with premium linens and mountain views",
    "Expansive living and dining areas designed for large gatherings and intimate moments alike",
    "Fully equipped private kitchen for in-house dining and custom catering",
    "Landscaped outdoor spaces with panoramic Himalayan views",
    "Private parking within the secured estate grounds",
    "24/7 dedicated concierge and on-site support team",
    "Full event and banquet setup capability for weddings and corporate functions",
    "High-speed connectivity throughout the property"
  ];

  return (
    <Section id="estate" className="bh-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="/assets/murree-forest-pines.jpg" speed={0.3} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Estate Features" 
            title={<>Inside <span className="bh-text-gold">Himalaya Premium Villas and Resort</span></>}
            sub="Every detail exceeds what guests expect from typical bhurban hotels and chain stays — a private estate where the mountain, not the lobby, defines your experience." 
            light 
          />
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <div className="bh-card bh-shadow-lux backdrop-blur-md p-10" 
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <ul className="space-y-4">
                  {estateFeatures.map((feature, k) => (
                    <Reveal key={k} delay={k * 100}>
                      <li className="flex items-start gap-4">
                        <div className="bh-grad-gold flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 mt-1" 
                          style={{ color: "hsl(165 60% 18%)" }}>
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-lg">{feature}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 5. Animated Gallery (Jiffz) ----------------------------- */
function AnimatedGallery() {
  const localImages = [...RESORT_GALLERY_IMAGES];
  const topRow = [...localImages.slice(0, 4), ...localImages.slice(0, 4)];
  const bottomRow = [...localImages.slice(4, 8), ...localImages.slice(4, 8)];

  return (
    <Section id="gallery" style={{ overflow: "hidden", background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
          kicker="Visual Journey" 
          title={<>Moments at <span className="bh-text-emerald">Himalaya Villas</span></>}
          sub="See why families searching for the best hotels in Bhurban Murree choose a private estate over crowded lobbies — every corner of Himalaya Premium Villas and Resort is yours to explore." 
        />
      </Container>
      
      <div className="relative mt-10 flex w-full flex-col gap-6 overflow-hidden pb-10">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bhScrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes bhScrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .bh-scroller-left {
            display: flex;
            width: max-content;
            animation: bhScrollLeft 40s linear infinite;
          }
          .bh-scroller-right {
            display: flex;
            width: max-content;
            animation: bhScrollRight 40s linear infinite;
          }
          .bh-scroller-left:hover, .bh-scroller-right:hover {
            animation-play-state: paused;
          }
        `}} />
        
        {/* Top Row - Scrolls Left */}
        <div className="bh-scroller-left gap-6 px-3">
          {topRow.map((src, k) => (
            <div key={k} className="group relative h-[250px] w-[350px] shrink-0 overflow-hidden rounded-3xl md:h-[320px] md:w-[450px] bh-shadow-lux">
              <img src={src} alt={galleryImageAlt(src)} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Bottom Row - Scrolls Right */}
        <div className="bh-scroller-right gap-6 px-3">
          {bottomRow.map((src, k) => (
            <div key={k} className="group relative h-[250px] w-[350px] shrink-0 overflow-hidden rounded-3xl md:h-[320px] md:w-[450px] bh-shadow-lux">
              <img src={src} alt={galleryImageAlt(src)} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------- 6. Bhurban Destination ----------------------------- */
function BhurbanDestination() {
  const seasons = [
    { 
      icon: Sun, 
      title: "Summer", 
      when: "May – August", 
      desc: "Cool weather — ideal for a resort in Bhurban stay with long outdoor evenings on your private terrace",
      grad: "linear-gradient(135deg,hsl(38 95% 55%),hsl(20 90% 55%))"
    },
    { 
      icon: Flower2, 
      title: "Autumn", 
      when: "September – November", 
      desc: "Golden foliage — quieter than peak season at most bhurban best hotels",
      grad: "linear-gradient(135deg,hsl(330 80% 65%),hsl(350 75% 55%))"
    },
    { 
      icon: Snowflake, 
      title: "Winter", 
      when: "December – February", 
      desc: "Snowfall — the top reason guests book villas in Bhurban Murree in winter",
      grad: "linear-gradient(135deg,hsl(200 90% 60%),hsl(220 80% 50%))"
    },
    { 
      icon: Flower2, 
      title: "Spring", 
      when: "March – April", 
      desc: "Blooming hills — perfect shoulder season for hotels in Bhurban Pakistan getaways",
      grad: "linear-gradient(135deg,hsl(120 70% 55%),hsl(140 65% 45%))"
    }
  ];

  return (
    <Section id="bhurban-destination" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="/assets/gallery-interior.jpg" speed={0.3} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Location" 
            title={<>Experience Bhurban Murree Through <span className="bh-text-emerald">Every Season</span></>}
            sub="Bhurban Murree sits among the most sought-after hotels in Bhurban Murree Pakistan destinations — pine forest, cool air, and Himalayan views year-round. Whatever the season, Himalaya Premium Villas and Resort places you at the centre of it, minutes above Murree town." 
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {seasons.map((season, k) => (
              <Reveal key={k} delay={k * 150}>
                <div className="bh-card bh-shadow-lux group h-full p-8 text-center transition hover:-translate-y-2">
                  <div className="bh-shadow-lux mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full transition group-hover:scale-110"
                    style={{ background: season.grad, color: "white" }}>
                    <season.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{season.title}</h3>
                  <p className="mt-2 font-semibold" style={{ color: "hsl(38 88% 35%)" }}>{season.when}</p>
                  <p className="bh-muted mt-3">{season.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 6. Final CTA ----------------------------- */
function FinalCTA() {
  return (
    <Section id="final-cta" className="bh-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="/assets/murree-sunrise-mountains.jpg" speed={0.35} opacity={0.18} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-6xl">
                Ready to Experience the <span className="bh-text-gold">Finest Stay in Bhurban Murree?</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-3xl text-lg" style={{ color: "hsl(40 38% 97% / .85)" }}>
                Compared with typical bhurban murree best hotels and shared resorts, Himalaya Premium Villas and Resort is a fully private luxury estate — every detail designed around your group. Limited monthly bookings; secure your exclusive stay before peak season fills.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={BHBURBAN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bh-grad-gold bh-shadow-gold rounded-full px-8 py-4 font-semibold transition hover:scale-105"
                  style={{ color: "hsl(165 60% 18%)" }}
                >
                  Book Now
                </a>
                <a
                  href={BHBURBAN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-8 py-4 font-semibold backdrop-blur-md transition"
                  style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}
                >
                  WhatsApp Us
                </a>
              </div>
            </Reveal>
            <Reveal delay={450}>
              <div className="mx-auto mt-16 max-w-2xl rounded-2xl p-8 text-center backdrop-blur-md"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>+92 304 567 9000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>info@himalayavillas.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>Bhurban, Murree, Pakistan</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}



/* ----------------------------- 6. Pricing ----------------------------- */
function Pricing() {
  return (
    <Section id="booking" className="py-14 md:py-20" style={{ background: "hsl(40 38% 97%)" }}>
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <Reveal>
            <div
              className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center bh-shadow-lux md:p-12"
              style={{ border: "2px solid hsl(165 55% 32% / 0.35)" }}
            >
              <h3 className="text-3xl font-bold md:text-4xl" style={{ color: "hsl(165 60% 18%)" }}>
                Book Your Private Stay in Bhurban
              </h3>
              <p
                className="mt-6 text-4xl font-bold tracking-tight md:text-5xl"
                style={{ color: "hsl(165 60% 18%)" }}
              >
                PKR 40,000 / night
              </p>
              <p className="mt-3 text-lg bh-muted">
                Entire property · Up to 12 guests
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "hsl(165 12% 38%)" }}>
                That&apos;s just PKR 3,300 per person for a luxury private estate
              </p>
              <a
                href={PRICING_WHATSAPP_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-emerald-700"
              >
                Book via WhatsApp
                <span aria-hidden className="font-normal">
                  →
                </span>
              </a>
              <div className="mt-6">
                <a
                  href={telHref()}
                  className="text-base font-semibold hover:underline"
                  style={{ color: "hsl(165 55% 28%)" }}
                >
                  Call Us — {SITE_CONTACT.phoneDisplay}
                </a>
              </div>
              <p className="mt-6 text-sm font-semibold text-red-600 md:text-base">
                Limited bookings per month — check availability now
              </p>
              <div
                className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t pt-8 text-sm md:text-base"
                style={{ borderColor: "hsl(165 15% 90%)" }}
              >
                <span className="bh-muted whitespace-nowrap">⭐ 5.0 Rated</span>
                <span className="hidden text-neutral-300 sm:inline" aria-hidden>
                  |
                </span>
                <span className="bh-muted whitespace-nowrap">✓ Direct Booking</span>
                <span className="hidden text-neutral-300 sm:inline" aria-hidden>
                  |
                </span>
                <span className="bh-muted whitespace-nowrap">✓ No Hidden Fees</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- Plan your stay (essentials + directions + reviews) ----------------------------- */
const STAY_ESSENTIALS = [
  {
    icon: LogIn,
    title: "Check-in",
    detail: "From 2:00 PM",
    note: "Early arrival? Message us on WhatsApp — we will try to accommodate.",
  },
  {
    icon: LogOut,
    title: "Check-out",
    detail: "By 11:00 AM",
    note: "Late check-out on request, subject to availability.",
  },
  {
    icon: Users,
    title: "Room capacity",
    detail: "2–12+ guests",
    note: "Suites, family villas & full estate — capacity confirmed at booking.",
  },
  {
    icon: Wifi,
    title: "Amenities",
    detail: "Wi-Fi · breakfast · parking",
    note: "Kitchen, room service, kid-friendly & smoke-free estate.",
  },
  {
    icon: ShieldCheck,
    title: "Booking confidence",
    detail: "Book direct · best rate",
    note: "WhatsApp confirmation, no hidden fees, dedicated concierge.",
  },
  {
    icon: RotateCcw,
    title: "Cancellation",
    detail: "Flexible policy",
    note: "Free reschedule on most dates; peak-season terms shared before you pay.",
  },
] as const;

const DIRECTION_ROUTES = [
  {
    from: "Islamabad",
    time: "~1 hr 45 min",
    via: "Murree Expressway → Bhurban Road",
    maps: "https://www.google.com/maps/dir/Islamabad/Himalaya+Villas+Bhurban",
  },
  {
    from: "Rawalpindi / Saddar",
    time: "~2 hrs",
    via: "Murree Rd → Expressway → Bhurban",
    maps: "https://www.google.com/maps/dir/Rawalpindi/Himalaya+Villas+Bhurban",
  },
  {
    from: "Murree Mall Road",
    time: "~25 min",
    via: "Kashmir Rd → Bhurban",
    maps: "https://www.google.com/maps/dir/Murree/Himalaya+Villas+Bhurban",
  },
  {
    from: "PC Bhurban / Chinar Golf",
    time: "~8 min",
    via: "Bhurban main road",
    maps: SITE_CONTACT.googleMapsUrl,
  },
  {
    from: "Patriata / New Murree",
    time: "~40 min",
    via: "Murree Hills scenic route",
    maps: "https://www.google.com/maps/dir/Patriata+Chair+Lift/Himalaya+Villas+Bhurban",
  },
  {
    from: "Kashmir Point",
    time: "~30 min",
    via: "Murree → Bhurban",
    maps: "https://www.google.com/maps/dir/Kashmir+Point+Murree/Himalaya+Villas+Bhurban",
  },
] as const;

const GUEST_REVIEWS = [
  { quote: "Beautiful scenic views", tag: "Mountain views" },
  { quote: "Luxury interiors", tag: "Villa stay" },
  { quote: "Peaceful environment", tag: "Weekend escape" },
  { quote: "Family friendly", tag: "Family trip" },
  { quote: "Excellent hospitality", tag: "Direct booking" },
] as const;

function PlanYourStaySection() {
  return (
    <Section id="plan-your-stay" style={{ background: "hsl(0 0% 100%)" }}>
      <ParallaxBg src="/assets/gallery-balcony.jpg" speed={0.15} opacity={0.06} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader
            kicker="Plan your stay"
            title={
              <>
                Everything before you <span className="bh-text-emerald">arrive in Bhurban Murree</span>
              </>
            }
            sub="Check-in, capacity, amenities, booking peace of mind — plus directions from Islamabad and nearby Murree spots."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAY_ESSENTIALS.map((item, k) => (
              <Reveal key={item.title} delay={k * 60}>
                <div className="bh-card bh-border bh-shadow-lux h-full p-6">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bh-grad-emerald text-white"
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: "hsl(165 60% 18%)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base font-semibold bh-text-emerald">{item.detail}</p>
                  <p className="mt-2 text-sm leading-relaxed bh-muted">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div
              className="mt-10 bh-card bh-border bh-shadow-lux overflow-hidden"
              id="contact-visibility"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10" style={{ background: "hsl(165 60% 18%)", color: "hsl(40 38% 97%)" }}>
                  <h3 className="text-2xl font-bold">Contact visibility</h3>
                  <p className="mt-2 text-sm" style={{ color: "hsl(40 38% 97% / .8)" }}>
                    Reach us anytime before or during your stay — same details on WhatsApp, phone, and email.
                  </p>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li className="flex items-center gap-3">
                      <Phone className="h-5 w-5 shrink-0" style={{ color: "hsl(42 95% 65%)" }} />
                      <a href={telHref()} className="font-semibold hover:underline">
                        {SITE_CONTACT.phoneDisplay}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5 shrink-0" style={{ color: "hsl(42 95% 65%)" }} />
                      <a href={mailtoHref("bookings")} className="hover:underline">
                        {SITE_CONTACT.emails.bookings}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "hsl(42 95% 65%)" }} />
                      <span>{SITE_CONTACT.addressLines.join(", ")}</span>
                    </li>
                  </ul>
                  <a
                    href={BHBURBAN_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bh-grad-gold px-5 py-2.5 text-sm font-bold bh-shadow-gold"
                    style={{ color: "hsl(165 60% 18%)" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp concierge
                  </a>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-6 w-6" style={{ color: "hsl(165 60% 18%)" }} />
                    <h3 className="text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>
                      Directions to Himalaya Villas
                    </h3>
                  </div>
                  <p className="mt-2 text-sm bh-muted">
                    From Islamabad, take the Murree Expressway toward Bhurban Murree. Open Google Maps for live traffic.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {DIRECTION_ROUTES.map((route, k) => (
                      <li
                        key={route.from}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-3 bh-border"
                        style={{ background: k === 0 ? "hsl(38 88% 55% / .08)" : "hsl(40 40% 97%)" }}
                      >
                        <div>
                          <span className="font-semibold" style={{ color: "hsl(165 60% 18%)" }}>
                            {route.from}
                          </span>
                          <span className="ml-2 text-xs bh-muted">· {route.via}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold bh-text-emerald">{route.time}</span>
                          <a
                            href={route.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
                            style={{ color: "hsl(165 60% 18%)" }}
                          >
                            Maps
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={SITE_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline"
                    style={{ color: "hsl(165 60% 18%)" }}
                  >
                    <MapPin className="h-4 w-4" />
                    Open Himalaya Villas on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-12" id="guest-reviews">
              <div className="mb-8 text-center">
                <span
                  className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
                  style={{ background: "hsl(38 88% 55% / .15)", color: "hsl(165 60% 18%)" }}
                >
                  Guest voices
                </span>
                <h3 className="text-3xl font-bold md:text-4xl" style={{ color: "hsl(165 60% 18%)" }}>
                  Reviews by people who stayed
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-base bh-muted">
                  Short notes from recent guests — what they loved about the estate.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {GUEST_REVIEWS.map((review, k) => (
                  <Reveal key={review.quote} delay={k * 80}>
                    <div className="bh-card bh-border bh-shadow-lux flex h-full flex-col p-5 text-center">
                      <Quote className="mx-auto h-6 w-6 opacity-40" style={{ color: "hsl(38 88% 55%)" }} />
                      <div className="my-3 flex justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-current"
                            style={{ color: "hsl(38 88% 55%)" }}
                          />
                        ))}
                      </div>
                      <p className="text-base font-semibold leading-snug" style={{ color: "hsl(165 60% 18%)" }}>
                        &ldquo;{review.quote}&rdquo;
                      </p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wider bh-muted">{review.tag}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 text-center">
                <a
                  href="#amenities"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "hsl(165 60% 18%)" }}
                >
                  <BedDouble className="h-4 w-4" />
                  View full amenities list
                </a>
              </p>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- Keyword guide (distributed SEO) ----------------------------- */
const KEYWORD_GUIDE_TOPICS = [
  {
    phrase: "hotels in bhurban murree",
    copy:
      "Most hotels in bhurban murree sell rooms; few sell exclusivity. When you compare hotels in bhurban murree online, filter for entire-property bookings — that is where Himalaya Premium Villas and Resort sits.",
  },
  {
    phrase: "best hotel in bhurban murree",
    copy:
      "The best hotel in bhurban murree for families is often a private estate, not a tower block. Guests who want the best hotel in bhurban murree experience book direct for the full villa and in-villa dining.",
  },
  {
    phrase: "luxury villa bhurban murree",
    copy:
      "A luxury villa in Bhurban Murree should feel like a private estate, not a shared building. This luxury villa in Bhurban Murree gives your group the full property, staffed dining, and mountain terraces without hotel corridors.",
  },
  {
    phrase: "bhurban hotel murree",
    copy:
      "A bhurban hotel murree stay should mean mountain air and privacy. This bhurban hotel murree estate places you in pine forest with terraces facing the ridge — not a town-view room.",
  },
  {
    phrase: "resort in bhurban murree",
    copy:
      "Any resort in bhurban murree on a shared campus still has other guests at breakfast. This resort in bhurban murree model reserves the estate for your party only, with meals served in-villa.",
  },
  {
    phrase: "bhurban murree hotels",
    copy:
      "Standard bhurban murree hotels charge per room and share facilities. Among bhurban murree hotels, private-villa estates give groups one bill, one space, and one concierge for the whole stay.",
  },
  {
    phrase: "best hotels in bhurban murree",
    copy:
      "Lists of the best hotels in bhurban murree rarely mention full-property hire. The best hotels in bhurban murree for space-seeking families are private villas with staff included.",
  },
  {
    phrase: "bhurban murree best hotels",
    copy:
      "Travel blogs ranking bhurban murree best hotels focus on star ratings. True bhurban murree best hotels for privacy are estates where your group alone occupies every room and terrace.",
  },
  {
    phrase: "villas in bhurban murree",
    copy:
      "Serviced flats marketed as villas in bhurban murree still share building access. These villas in bhurban murree are a staffed private estate with dining, events, and mountain views included.",
  },
  {
    phrase: "hotels in bhurban pakistan",
    copy:
      "Hotels in bhurban pakistan range from budget lodges to five-star towers. Premium hotels in bhurban pakistan for exclusivity mean booking a private estate above Murree town.",
  },
] as const;

const CTA_KEYWORD_SNIPPETS = [
  "Comparing the best hotel in Bhurban Murree with bhurban murree hotels? Book the estate direct on WhatsApp.",
  "Need a bhurban hotel murree stay with full privacy? Skip shared resort in Bhurban Murree lobbies — reserve the villa.",
  "Comparing the best hotels in Bhurban Murree with bhurban murree hotels? See why groups choose the private estate.",
  "Tired of bhurban murree best hotels with crowded dining? Entire property in Bhurban Murree is yours.",
  "Looking at villas in Bhurban Murree or hotels in bhurban pakistan listings? One booking covers everyone.",
  "Still browsing hotels in bhurban murree? The best hotel in bhurban murree for groups is often a private villa estate.",
  "Weighing a resort in Bhurban Murree against bhurban murree hotels? Get in-villa dining and zero shared corridors.",
  "Planning villas in bhurban murree or hotels in bhurban pakistan? WhatsApp us for dates and a custom quote.",
] as const;

function BhurbanKeywordGuide() {
  return (
    <Section id="bhurban-stay-guide" style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader
          kicker="Stay planning"
          title={<>Your Bhurban Murree accommodation <span className="bh-text-emerald">questions answered</span></>}
          sub="Straight answers for the searches travellers run before they book — hotels, resorts, and private villas in the Murree Hills."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {KEYWORD_GUIDE_TOPICS.map((item, k) => (
            <Reveal key={item.phrase} delay={k * 60}>
              <div className="bh-card bh-shadow-lux h-full p-6 md:p-8">
                <h4 className="mb-3 text-lg font-bold capitalize" style={{ color: "hsl(165 60% 18%)" }}>
                  {item.phrase}
                </h4>
                <p className="bh-muted text-sm leading-relaxed md:text-base">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 7. FAQ ----------------------------- */
function FAQ() {
  const faqs = HOTELS_IN_BHURBAN_FAQS;

  return (
    <Section id="faq" style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
                kicker="Frequently Asked Questions" 
                title={<>Hotels in Bhurban — <span className="bh-text-emerald">FAQ</span></>}
                sub="Answers for guests researching hotels in Bhurban Murree, luxury villas, and the best hotel in Bhurban Murree for their dates" 
              />
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, k) => (
                <Reveal key={k} delay={k * 150}>
                  <div className="bh-card bh-shadow-lux p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold flex-shrink-0">
                        <span className="text-sm font-bold">Q</span>
                      </div>
                      <h3 className="text-xl font-bold leading-relaxed" style={{ color: "hsl(165 60% 18%)" }}>{faq.q}</h3>
                    </div>
                    <div className="pl-12">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-white font-bold flex-shrink-0">
                        <span className="text-sm font-bold">A</span>
                      </div>
                      <p className="mt-2 text-lg leading-relaxed bh-muted">{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
    </Section>
  );
}

/* ----------------------------- Footer ----------------------------- */
function Footer() {
  return (
    <footer style={{ background: "hsl(165 60% 12%)", color: "hsl(40 38% 97%)" }}>
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-4">
          <div>
            <h3 className="bh-text-gold text-2xl font-bold">Himalaya Premium Villas and Resort</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Not just a stay — a private luxury estate nestled in the heart of the Himalayan foothills. Experience Bhurban Murree&apos;s most exclusive retreat.
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["About Himalaya Premium Villas and Resort", "Private Estate Experience", "Destination Weddings", "Corporate Retreats"] },
            { h: "Support", items: ["Reserve Your Estate", "Contact Concierge", "Travel Guide", "Privacy Policy"] },
          ].map((c) => (
            <div key={c.h}>
              <h4 className="mb-4 text-lg font-bold">{c.h}</h4>
              <ul className="space-y-2 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
                {c.items.map((i) => <li key={i}><a href="#" className="hover:opacity-100" style={{ opacity: .85 }}>{i}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-lg font-bold">Contact Information</h4>
            <div className="space-y-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" style={{ color: "hsl(42 95% 65%)" }} />
                <a href={telHref()} className="hover:underline">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" style={{ color: "hsl(42 95% 65%)" }} />
                <a href={mailtoHref("info")} className="hover:underline">
                  {SITE_CONTACT.emails.info}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "hsl(42 95% 65%)" }} />
                <span>Bhurban, Murree, Pakistan</span>
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Linkedin].map((Icon, k) => (
                <a key={k} href="#" aria-label="Social link"
                  className="flex h-11 w-11 items-center justify-center rounded-full transition"
                  style={{ border: "1px solid hsl(40 38% 97% / .2)" }}>
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-sm" style={{ borderTop: "1px solid hsl(40 38% 97% / .15)", color: "hsl(40 38% 97% / .6)" }}>
          &copy; {new Date().getFullYear()} Himalaya Premium Villas and Resort. All rights reserved. | Private Luxury Estate in Bhurban Murree | Hotels in Bhurban Murree
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Section CTA ----------------------------- */
function SectionCTA({ variant = 0 }: { variant?: number }) {
  const snippet = CTA_KEYWORD_SNIPPETS[variant % CTA_KEYWORD_SNIPPETS.length];
  return (
    <div className="px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bh-shadow-lux" style={{ background: "hsl(165 60% 18%)", color: "hsl(40 38% 97%)" }}>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full" style={{ background: "hsl(165 55% 25%)", opacity: 0.5, filter: "blur(40px)" }} />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full" style={{ background: "hsl(38 88% 55%)", opacity: 0.15, filter: "blur(40px)" }} />
            
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-10 lg:p-12">
              <div className="text-center md:text-left max-w-xl">
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">Ready to Book the Best Private Villa Hotel in Bhurban Murree?</h3>
                <p className="text-base" style={{ color: "hsl(40 38% 97% / 0.85)" }}>
                  {snippet}
                </p>
              </div>
              
              <div className="flex shrink-0 flex-col gap-3 w-full sm:flex-row sm:w-auto">
                <a
                  href={BHBURBAN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bh-grad-gold px-6 py-3 font-bold text-base transition-transform hover:scale-105 bh-shadow-gold w-full sm:w-auto"
                  style={{ color: "hsl(165 60% 18%)" }}
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
                <a
                  href="tel:+923045679000"
                  className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-base backdrop-blur-md transition-colors hover:bg-white/20 w-full sm:w-auto"
                  style={{ border: "2px solid hsl(40 38% 97% / 0.4)", background: "hsl(40 38% 97% / 0.1)" }}
                >
                  <Phone className="h-5 w-5" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function HotelsInBhurbanClient() {
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="bh-page">
        <HeroSlider />
        <Pricing />
        <Introduction />
        <Amenities />
        <SectionCTA variant={0} />
        <WhyStandApart />
        <SectionCTA variant={1} />
        <IdealFor />
        <SectionCTA variant={2} />
        <TheEstate />
        <SectionCTA variant={3} />
        <AnimatedGallery />
        <SectionCTA variant={4} />
        <BhurbanDestination />
        <SectionCTA variant={5} />
        <PlanYourStaySection />
        <BhurbanKeywordGuide />
        <SectionCTA variant={6} />
        <FAQ />
        <SectionCTA variant={7} />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
