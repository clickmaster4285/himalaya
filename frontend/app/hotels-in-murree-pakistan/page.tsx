"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import {
  Mountain, Sparkles, Home, Star, Utensils, Briefcase, Clock,
  Phone, Mail, MapPin, ChevronLeft, ChevronRight, Check,
  Sun, Snowflake, Flower2, Facebook, Twitter, Linkedin, ArrowDown, Wifi,
  Car, Coffee, Dumbbell, Heart, TreePine, Wind, Cloud, Bed, Bath,
  Tv, Shield, Users, Calendar, Map
} from "lucide-react";

/* ============================================================
   HOTELS IN MURREE PAKISTAN - Comprehensive Landing Page
   All keywords covered: hotels in murree, hotel rooms in murree, 
   hotels in murree pakistan, best resort in murree, murree resorts,
   5 star hotels in murree mall road, nathia gali hotels
   ============================================================ */
const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.murree-hotels-page{
  --bg:40 38% 97%; --fg:165 35% 12%;
  --card:0 0% 100%; --muted:165 12% 38%;
  --primary:165 60% 18%; --primary-fg:40 38% 97%; --primary-glow:165 55% 32%;
  --accent:38 88% 55%; --accent-glow:42 95% 65%;
  --border:165 15% 86%;
  font-family:'Inter',system-ui,sans-serif;
  color:hsl(var(--fg));
  background:hsl(var(--bg));
  min-height:100vh;
}
.murree-hotels-page h1,.murree-hotels-page h2,.murree-hotels-page h3,.murree-hotels-page h4{font-family:'Playfair Display',Georgia,serif;}
.murree-hotels-page a{color:inherit;text-decoration:none;}
.murree-hotels-page button{font-family:inherit;cursor:pointer;border:0;}

.murree-hotels-grad-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));}
.murree-hotels-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.murree-hotels-grad-hero{background:linear-gradient(135deg,hsl(165 60% 12% / .85),hsl(165 50% 25% / .55));}
.murree-hotels-text-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.murree-hotels-text-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.murree-hotels-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.murree-hotels-shadow-gold{box-shadow:0 15px 40px -10px hsl(38 88% 55% / .5);}

.murree-hotels-card{background:hsl(var(--card));border-radius:24px;}
.murree-hotels-border{border:1px solid hsl(var(--border));}
.murree-hotels-muted{color:hsl(var(--muted));}

.murree-hotels-reveal{opacity:0;transform:translateY(40px);transition:opacity .9s ease-out,transform .9s ease-out;}
.murree-hotels-reveal.in{opacity:1;transform:translateY(0);}

@keyframes murree-hotelsKenBurns{0%{transform:scale(1)}100%{transform:scale(1.15)}}
@keyframes murree-hotelsFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes murree-hotelsScrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
.murree-hotels-ken{animation:murree-hotelsKenBurns 8s ease-out both;}
.murree-hotels-float{animation:murree-hotelsFloat 6s ease-in-out infinite;}
.murree-hotels-scroll-ind{animation:murree-hotelsScrollDown 1.5s ease-in-out infinite;}

html{scroll-behavior:smooth;}
`;

/* ----------------------------- Hooks ----------------------------- */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
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
    <div ref={ref} className={`murree-hotels-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ----------------------------- Data ----------------------------- */
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1920&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
];

const MURREE_HOTELS = [
  { 
    name: "Himalaya Villas Resort", 
    tag: "PREMIUM LUXURY RESORT", 
    price: "₨75,000+",
    desc: "Experience unparalleled luxury at Himalaya Villas Resort, the premier destination in Murree with breathtaking mountain views and world-class amenities",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    perks: ["Mountain Views", "Fine Dining", "Spa & Wellness", "Conference Facilities", "Luxury Villas", "Private Gardens"] 
  },
  { 
    name: "Himalaya Premium Suites", 
    tag: "EXECUTIVE LUXURY", 
    price: "₨60,000+",
    desc: "Spacious premium suites with panoramic mountain views and exclusive amenities for discerning guests",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
    perks: ["Panoramic Views", "Butler Service", "Private Terrace", "Premium Amenities", "Executive Lounge", "Concierge Service"] 
  },
  { 
    name: "Himalaya Mountain Retreat", 
    tag: "NATURE LUXURY", 
    price: "₨50,000+",
    desc: "Secluded mountain retreat surrounded by pristine nature with eco-luxury accommodations and wellness facilities",
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80",
    perks: ["Nature Views", "Eco-Luxury", "Wellness Spa", "Hiking Trails", "Organic Dining", "Yoga Pavilion"] 
  }
];

const MALL_ROAD_HOTELS = [
  { name: "Himalaya Villas Resort", price: "₨75,000+", desc: "Premium luxury resort near Mall Road with panoramic mountain views" },
  { name: "Himalaya Mall Road Suites", price: "₨55,000+", desc: "Modern luxury suites with easy access to Mall Road shopping and dining" },
  { name: "Himalaya Downtown Residence", price: "₨40,000+", desc: "Contemporary accommodation in the heart of Murree's commercial district" },
];

const NATHIA_GALI_HOTELS = [
  { name: "Himalaya Villas Resort", price: "₨75,000+", desc: "Luxury mountain resort with spectacular views and premium amenities" },
  { name: "Himalaya Nathia Extension", price: "₨60,000+", desc: "Premium extension with access to Nathia Gali trails and scenic beauty" },
  { name: "Himalaya Hillside Cottages", price: "₨45,000+", desc: "Cozy luxury cottages nestled in the hills near Nathia Gali" },
];

const ROOM_TYPES = [
  { icon: Bed, title: "Standard Rooms", desc: "Comfortable rooms with essential amenities", price: "₨15,000-30,000" },
  { icon: Home, title: "Executive Suites", desc: "Spacious suites with living areas", price: "₨30,000-60,000" },
  { icon: Star, title: "Presidential Suites", desc: "Luxury suites with premium services", price: "₨60,000-150,000" },
  { icon: Users, title: "Family Rooms", desc: "Large rooms for families and groups", price: "₨20,000-50,000" },
];

/* ----------------------------- Hero Slider ----------------------------- */
function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollY = useScrollY();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (d: number) => setI((p) => (p + d + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-x-hidden lg:h-screen lg:overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((src, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <img src={src} alt="" className={`h-full w-full object-cover ${idx === i ? "murree-hotels-ken" : ""}`} />
          <div className="absolute inset-0 murree-hotels-grad-hero" />
        </div>
      ))}

      {/* Floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, k) => (
          <div
            key={k}
            className="absolute rounded-3xl murree-hotels-float"
            style={{
              width: 120 + k * 30, height: 120 + k * 30,
              top: `${10 + k * 12}%`, left: `${5 + k * 14}%`,
              background: "hsl(38 88% 55% / 0.06)",
              border: "1px solid hsl(38 88% 55% / 0.2)",
              backdropFilter: "blur(4px)",
              animationDelay: `${k * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col gap-8 px-2 py-8 pb-24 lg:h-full lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-6 lg:pb-10 lg:py-10" style={{ color: "hsl(40 38% 97%)" }}>
        <div className="w-full shrink-0 lg:w-1/2">
          <Reveal>
            <span className="mb-4 inline-block rounded-full px-5 py-2 text-sm font-medium uppercase tracking-widest backdrop-blur-md"
              style={{ border: "1px solid hsl(38 88% 55% / .4)", background: "hsl(38 88% 55% / .1)", color: "hsl(42 95% 65%)" }}>
              Murree · Pakistan · Queen of Hills
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-8xl">
              <span className="murree-hotels-text-gold">Hotels in Murree Pakistan</span> — <span className="text-3xl sm:text-4xl md:text-6xl">Discover Himalaya Premium Villas</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
              Pakistan's most exclusive private luxury estate — perched high in the Murree Hills, crafted for those who demand more than a hotel can ever offer.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <p className="mt-4 text-xl font-semibold md:text-2xl" style={{ color: "hsl(42 95% 75%)" }}>
              Panoramic Himalayan views. Absolute privacy. A stay unlike anything else in Murree.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="murree-hotels-grad-gold murree-hotels-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
                style={{ color: "hsl(165 60% 18%)" }}>
                Reserve Your Private Estate
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
              <h3 className="mb-3 text-lg font-bold text-gray-800 lg:mb-6 lg:text-2xl">Send us a Message</h3>
              <form className="space-y-2.5 lg:space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
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
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOutDate" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Check-out Date</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="numberOfGuests" className="block text-gray-700 text-xs font-bold mb-1 lg:text-sm lg:mb-2">Number of Guests</label>
                  <select
                    id="numberOfGuests"
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
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:px-4 lg:py-4 lg:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105 lg:py-4 lg:text-lg"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => go(-1)} aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 backdrop-blur-md transition md:left-8"
        style={{ border: "1px solid hsl(40 38% 97% / .3)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}>
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={() => go(1)} aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 backdrop-blur-md transition md:right-8"
        style={{ border: "1px solid hsl(40 38% 97% / .3)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}>
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
            className="h-2 rounded-full transition-all"
            style={{
              width: k === i ? 40 : 8,
              background: k === i ? "hsl(38 88% 55%)" : "hsl(40 38% 97% / .4)",
            }} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1" style={{ color: "hsl(40 38% 97% / .7)" }}>
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 murree-hotels-scroll-ind" />
      </div>
    </section>
  );
}

/* ----------------------------- Helpers ----------------------------- */
function Section({ id, children, className = "", style }: { id?: string; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <section id={id} className={`relative overflow-hidden py-24 md:py-32 ${className}`} style={style}>{children}</section>;
}

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

function SectionHeader({ kicker, title, sub, light = false }: { kicker?: string; title: ReactNode; sub: string; light?: boolean }) {
  return (
    <Reveal>
      <div className="mx-auto mb-16 max-w-3xl text-center">
        {kicker && (
          <span className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{ background: light ? "rgba(251, 191, 36, 0.2)" : "rgba(251, 191, 36, 0.15)", color: light ? "#fbbf24" : "#14532d" }}>
            {kicker}
          </span>
        )}
        <h2 className="text-4xl font-bold md:text-5xl" style={{ color: light ? "#f5f5f4" : "#14532d" }}>{title}</h2>
        <p className="mt-4 text-lg" style={{ color: light ? "rgba(245, 245, 244, 0.8)" : "#166534" }}>{sub}</p>
      </div>
    </Reveal>
  );
}

function ParallaxBg({ src, speed = 0.3, opacity = 0.15 }: { src: string; speed?: number; opacity?: number }) {
  const y = useScrollY();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${src})`, transform: `translateY(${y * speed}px)`, opacity, zIndex: 0 }} />
    );
}

/* ----------------------------- 1. Introduction ----------------------------- */
function Introduction() {
  return (
    <Section id="introduction" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80" speed={0.2} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-5xl mb-6 text-center" style={{ color: "hsl(165 60% 18%)" }}>
                The Best Hotels in Murree, Pakistan — <span className="murree-hotels-text-emerald">And Why One Estate Stands Above Them All</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="prose prose-lg max-w-none" style={{ color: "hsl(165 12% 38%)" }}>
                <p className="mb-6 text-lg leading-relaxed">
                  Murree has been the crown jewel of Pakistan's mountain tourism for over a century. Nestled in the sub-Himalayan ranges at an elevation of over 7,500 feet, it draws millions of visitors every year — families, honeymooners, corporate travellers, and anyone who feels the pull of cool mountain air, pine-scented forests, and some of the most dramatic natural scenery in South Asia.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  The demand for quality hotels in Murree, Pakistan has never been greater. And yet, for travellers who truly understand luxury, the question is not which hotel to book — it is whether a hotel is the right choice at all.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  Standard hotels in Murree, no matter how decorated, share a fundamental limitation: they are built for volume. Hundreds of guests. Shared facilities. Corridors full of strangers. Fixed menus. Rigid schedules. The moment you step outside your room, the escape you came for begins to dissolve.
                </p>
                <p className="mb-6 text-lg leading-relaxed font-semibold">
                  Himalaya Premium Villas was built on a completely different premise.
                </p>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 my-8 murree-hotels-shadow-lux">
                  <p className="text-xl font-semibold text-center mb-4" style={{ color: "hsl(165 60% 18%)" }}>
                    This is not a hotel. It is a fully private luxury estate located in Bhurban — the most prestigious enclave within the greater Murree Hills region — where the entire property is reserved exclusively for you. No shared lobbies. No other guests. No compromises. Just a world-class private estate set against the backdrop of the Himalayas, designed to deliver the kind of experience that simply cannot be replicated in any hotel in Murree, Pakistan.
                  </p>
                  <p className="text-lg text-center font-semibold" style={{ color: "hsl(165 60% 18%)" }}>
                    If you are searching for the finest accommodation the Murree region has to offer, your search ends here.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 2. What Makes It Different ----------------------------- */
function WhyPerfectForFamilies() {
  const features = [
    { 
      icon: Home, 
      title: "Entire Estate — Exclusively Yours", 
      desc: "Unlike any hotel in Murree Pakistan, Himalaya Premium Villas accepts strictly limited bookings each month. When you arrive, the entire estate belongs to you and your guests — every room, every terrace, every outdoor space. No strangers. No shared amenities. Pure exclusivity."
    },
    { 
      icon: Mountain, 
      title: "Unobstructed Himalayan Views", 
      desc: "Positioned at elevation in Bhurban, the estate commands sweeping, unobstructed panoramic views of the Himalayan range. Every sunrise here is a moment you will carry with you. Every evening, the mountains put on a display no hotel room window can frame quite the same way."
    },
    { 
      icon: Utensils, 
      title: "Bespoke In-Villa Dining", 
      desc: "Forget crowded hotel restaurants and fixed breakfast hours. At Himalaya Premium Villas, every meal is an experience crafted entirely around your preferences — from private candlelit dinners to open-air barbecue evenings under a sky full of stars above the Murree Hills."
    },
    { 
      icon: Star, 
      title: "Destination Weddings & Elite Events", 
      desc: "The estate is one of the most sought-after venues for destination weddings and corporate retreats in the Murree Pakistan region. A majestic natural backdrop, world-class event infrastructure, and a dedicated planning team ensure every occasion exceeds expectations."
    },
    { 
      icon: Shield, 
      title: "Privacy as a Standard — Not an Upgrade", 
      desc: "At Himalaya Premium Villas, privacy is not a premium add-on — it is the foundation of every stay. From the secured estate entrance to the private outdoor terraces, every inch of the property is designed to keep your world exactly where you want it: completely your own."
    },
    { 
      icon: Phone, 
      title: "24/7 Dedicated Concierge Team", 
      desc: "Our team is available around the clock — not to manage hundreds of guests, but to focus entirely on you. Whether it is a special dining arrangement, a last-minute event detail, or simply ensuring your day flows perfectly, we are here for everything."
    }
  ];

  return (
    <Section id="why-perfect-for-families">
      <Container>
        <SectionHeader 
          kicker="What Makes It Different" 
          title={<>Why Himalaya Premium Villas <span className="murree-hotels-text-emerald">Redefines Luxury Hotels</span> in Murree Pakistan</>}
          sub="When every detail of your stay matters — when you want more than four walls and a view — Himalaya Premium Villas delivers an experience that sets a new standard for accommodation in the Murree Hills." 
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-hotels-card murree-hotels-shadow-lux group h-full p-8 transition hover:-translate-y-2">
                <div className="murree-hotels-grad-emerald mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{feature.title}</h3>
                <p className="murree-hotels-muted leading-relaxed">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 3. Estate Detail for Families ----------------------------- */
function EstateDetail() {
  const estateFeatures = [
    "Multiple luxuriously furnished bedrooms — spacious enough for grandparents, parents, and children alike, all under one roof with room to breathe",
    "Grand family living and dining areas — spacious enough for large families, intimate enough for couples",
    "Fully equipped private kitchen — cook family meals or arrange custom in-villa catering for special family occasions",
    "Expansive private outdoor grounds — safe, open, and beautifully landscaped for children to enjoy freely",
    "Panoramic terraces with unobstructed Himalayan and Murree Hills views — perfect for family gatherings and evening relaxation",
    "Secured private parking within the estate — no parking hassles in busy Murree",
    "High-speed Wi-Fi throughout the property — because even on holiday, families need to stay connected and entertained",
    "24/7 on-site concierge and dedicated support team — always available to cater to your family's needs",
    "Full event setup capability for family celebrations, milestones, and gatherings — from birthdays to Eid celebrations"
  ];

  return (
    <section id="estate" className="murree-hotels-grad-emerald" style={{ color: "#f5f5f4" }}>
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="mx-auto w-full max-w-6xl px-6">
          <Container>
            <Reveal>
              <h2 className="text-4xl font-bold md:text-5xl mb-6 text-center" style={{ color: "hsl(40 38% 97%)" }}>
                Inside the Estate — <span className="text-yellow-300">Everything a Luxury Stay Should Be</span>
              </h2>
              <p className="text-xl text-center mb-12 max-w-4xl mx-auto" style={{ color: "hsl(40 38% 85%)" }}>
                Himalaya Premium Villas is not just a place to sleep. It is a complete private world — every element curated to the highest standard, every space designed to make the most of its extraordinary natural setting in the Murree Hills of Pakistan.
              </p>
            </Reveal>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                "Multiple premium bedrooms with luxurious linens, thoughtful interiors, and mountain-facing windows",
                "Grand living and dining areas — spacious enough for large families, intimate enough for couples",
                "Fully equipped private kitchen and in-house catering capability for bespoke dining experiences",
                "Expansive landscaped outdoor terraces with panoramic Himalayan and Murree Hills views",
                "Dedicated event and banquet setup for weddings, ceremonies, and corporate functions",
                "Secured private parking within the estate grounds",
                "High-speed Wi-Fi throughout the property",
                "24/7 on-site concierge and dedicated support team"
              ].map((feature, index) => (
                <Reveal key={index} delay={index * 100}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-gray-900" />
                      </div>
                      <p className="text-lg leading-relaxed" style={{ color: "hsl(40 38% 95%)" }}>
                        {feature}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={800}>
              <div className="mt-12 bg-yellow-400/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30">
                <p className="text-xl font-semibold text-center" style={{ color: "hsl(40 38% 97%)" }}>
                  Every detail — from the quality of the linens to the placement of the outdoor seating — has been considered with one goal in mind: to give you an experience that no standard hotel in Murree, Pakistan can come close to matching.
                </p>
              </div>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 4. Ideal Guests ----------------------------- */
function IdealGuests() {
  const guestTypes = [
    { 
      icon: Users, 
      title: "Families", 
      desc: "who want meaningful time together in a private, luxurious mountain setting — away from crowded hotels and tourist rush"
    },
    { 
      icon: Heart, 
      title: "Couples", 
      desc: "planning honeymoons, anniversaries, or a romantic escape in the Murree Hills with total privacy"
    },
    { 
      icon: Briefcase, 
      title: "Corporate Leaders & Teams", 
      desc: "seeking an elite off-site retreat, strategy session, or executive gathering in an inspiring natural environment"
    },
    { 
      icon: Sparkles, 
      title: "Wedding Parties", 
      desc: "looking for a grand destination wedding venue in Murree Pakistan — with a Himalayan backdrop that no hotel ballroom can replicate"
    },
    { 
      icon: Home, 
      title: "Friend Groups", 
      desc: "who want an entire estate to themselves — shared with the people they choose, and no one else"
    },
    { 
      icon: Star, 
      title: "High-Profile Guests", 
      desc: "requiring discretion, complete privacy, and a level of service that standard hotels in Murree simply cannot provide"
    }
  ];

  return (
    <Section id="ideal-guests" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" speed={0.25} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Who Chooses Himalaya Premium Villas" 
            title={<>Who Chooses Himalaya Premium Villas <span className="murree-hotels-text-emerald">Over a Hotel in Murree?</span></>}
            sub="Travellers who value quality over quantity. Those who understand the difference between a stay and an experience. Guests who know exactly what they want — and will not settle for less." 
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guestTypes.map((type, k) => (
              <Reveal key={k} delay={k * 150}>
                <div className="murree-hotels-card murree-hotels-shadow-lux group h-full p-8 transition hover:-translate-y-2">
                  <div className="murree-hotels-grad-emerald mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                    <type.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{type.title}</h3>
                  <p className="murree-hotels-muted leading-relaxed">{type.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 5. Murree & Bhurban Location ----------------------------- */
function MurreeBhurbanLocation() {
  const seasons = [
    { 
      icon: Sun, 
      title: "Summer", 
      when: "May – August", 
      desc: "Cool, refreshing weather — perfect for outdoor gatherings and extended private estate stays",
      grad: "linear-gradient(135deg,hsl(38 95% 55%),hsl(20 90% 55%))"
    },
    { 
      icon: Flower2, 
      title: "Autumn", 
      when: "September – November", 
      desc: "Golden foliage across the Murree Hills. Peaceful, crowd-free, and ideal for intimate retreats and corporate off-sites.",
      grad: "linear-gradient(135deg,hsl(330 80% 65%),hsl(350 75% 55%))"
    },
    { 
      icon: Snowflake, 
      title: "Winter", 
      when: "December – February", 
      desc: "Snowfall transforms the estate into a magical winter landscape. A truly unforgettable setting for cosy private stays.",
      grad: "linear-gradient(135deg,hsl(200 90% 60%),hsl(220 80% 50%))"
    },
    { 
      icon: Flower2, 
      title: "Spring", 
      when: "March – April", 
      desc: "Blooming wildflowers and crisp mountain air. One of the most beautiful times to experience the Murree Hills at their finest.",
      grad: "linear-gradient(135deg,hsl(120 70% 55%),hsl(140 65% 45%))"
    }
  ];

  return (
    <Section id="murree-bhurban-location" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" speed={0.3} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
                kicker="Location" 
                title={<>Murree Pakistan — A Destination of <span className="murree-hotels-text-emerald">Unmatched Natural Beauty</span></>}
                sub="The Murree Hills region of Pakistan is one of South Asia's most iconic mountain destinations. Located just 50 kilometres from Islamabad, Murree rises through dense cedar and pine forests to an elevation of over 7,500 feet — offering a year-round escape from the heat and pace of the plains below." 
              />
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 my-8 murree-hotels-shadow-lux">
                <p className="text-lg font-semibold leading-relaxed mb-4" style={{ color: "hsl(165 60% 18%)" }}>
                  Within the wider Murree region, Bhurban stands out as its most prestigious enclave — quieter, more elevated, and more exclusive than Murree's busy main ridge. It is here, in Bhurban, that Himalaya Premium Villas is located — placing you at the very best address the Murree Pakistan region has to offer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {seasons.map((season, k) => (
                  <Reveal key={k} delay={k * 150}>
                    <div className="murree-hotels-card murree-hotels-shadow-lux group h-full p-8 text-center transition hover:-translate-y-2">
                      <div className="murree-hotels-shadow-lux mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full transition group-hover:scale-110"
                        style={{ background: season.grad, color: "white" }}>
                        <season.icon className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{season.title}</h3>
                      <p className="mt-2 font-semibold" style={{ color: "hsl(38 88% 35%)" }}>{season.when}</p>
                      <p className="murree-hotels-muted mt-3">{season.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 6. FAQ (SEO Rich Snippets) ----------------------------- */
function FAQ() {
  const faqs = [
    {
      q: "What makes Himalaya Premium Villas different from other hotels in Murree Pakistan?",
      a: "Himalaya Premium Villas is not a hotel — it is a fully private luxury estate in Bhurban, the most prestigious enclave of the Murree Hills. Unlike any hotel in Murree Pakistan, the entire estate is reserved exclusively for one booking at a time, ensuring complete privacy, bespoke service, and a level of luxury that shared hotel environments simply cannot offer."
    },
    {
      q: "Where exactly is Himalaya Premium Villas located?",
      a: "The estate is located in Bhurban, Murree, Pakistan — approximately 50 kilometres from Islamabad. Bhurban is widely regarded as the most exclusive and scenic enclave within the greater Murree Hills region."
    },
    {
      q: "Is Himalaya Premium Villas suitable for destination weddings?",
      a: "Absolutely. The estate is one of the most sought-after destination wedding venues in the Murree Pakistan region. With panoramic Himalayan views, dedicated event infrastructure, and a full planning and concierge team, it is designed to host extraordinary weddings and celebrations."
    },
    {
      q: "What is the best time to visit Murree Pakistan?",
      a: "The Murree Hills region is beautiful year-round. Summer (May–August) offers cool weather and lush greenery; winter (December–February) brings snowfall and magical landscapes; autumn and spring offer quieter, equally stunning experiences. Himalaya Premium Villas is available for exclusive bookings across all seasons."
    },
    {
      q: "Can corporate groups book Himalaya Premium Villas for retreats?",
      a: "Yes. The estate is fully equipped to host executive corporate retreats, strategy sessions, and leadership off-sites. With high-speed connectivity, private meeting spaces, bespoke catering, and an inspiring natural environment, it offers a setting that no hotel conference room in Murree can match."
    }
  ];

  return (
    <Section id="faq" style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
                kicker="Frequently Asked Questions" 
                title={<>Hotels in Murree Pakistan — <span className="murree-hotels-text-emerald">SEO Rich Snippets</span></>}
                sub="Get answers to common questions about Himalaya Premium Villas and luxury accommodation in Murree" 
              />
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, k) => (
                <Reveal key={k} delay={k * 150}>
                  <div className="murree-hotels-card murree-hotels-shadow-lux p-8">
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
                      <p className="text-lg leading-relaxed" style={{ color: "hsl(165 12% 38%)" }}>{faq.a}</p>
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

/* ----------------------------- 7. Pricing ----------------------------- */
function Pricing() {
  const rows = [
    { tag: "BUDGET", name: "Budget Hotels", price: "10,000 – 20,000", best: "Backpackers, solo travelers", bg: "hsl(160 60% 92%)", fg: "hsl(160 60% 25%)" },
    { tag: "MID-RANGE", name: "Mid-Range Hotels", price: "20,000 – 40,000", best: "Families, couples", bg: "hsl(200 80% 92%)", fg: "hsl(200 80% 30%)" },
    { tag: "LUXURY", name: "Luxury Hotels", price: "40,000 – 80,000", best: "Business, luxury seekers", bg: "hsl(40 90% 90%)", fg: "hsl(38 88% 35%)" },
    { tag: "PREMIUM", name: "5-Star Hotels", price: "80,000 – 150,000+", best: "VIP guests, honeymoon", bg: "hsl(340 80% 94%)", fg: "hsl(340 70% 40%)" },
  ];
  return (
    <Section id="pricing">
      <ParallaxBg src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" speed={0.3} opacity={0.1} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Rates" title="Hotel Pricing in Murree" sub="Transparent pricing for all categories of hotels" />
          <Reveal>
            <div className="murree-hotels-card murree-hotels-border murree-hotels-shadow-lux overflow-hidden">
              <table className="w-full">
                <thead className="murree-hotels-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
                  <tr>
                    <th className="p-5 text-left text-lg">Hotel Category</th>
                    <th className="p-5 text-left text-lg">Price (PKR/night)</th>
                    <th className="hidden p-5 text-left text-lg md:table-cell">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, k) => (
                    <tr key={k} style={{ borderTop: "1px solid hsl(165 15% 86%)" }}>
                      <td className="p-5">
                        <span className="mr-3 inline-block rounded-full px-3 py-1 text-xs font-bold"
                          style={{ background: r.bg, color: r.fg }}>{r.tag}</span>
                        <span className="font-semibold" style={{ color: "hsl(165 60% 18%)" }}>{r.name}</span>
                      </td>
                      <td className="p-5">{r.price}</td>
                      <td className="murree-hotels-muted hidden p-5 md:table-cell">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="murree-hotels-muted mt-6 text-center text-sm italic">
            *Prices vary depending on season, weekends, and holidays. Contact hotels for special packages and discounts.
          </p>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 8. Final CTA ----------------------------- */
function FinalCTA() {
  return (
    <Section id="final-cta" className="murree-hotels-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80" speed={0.35} opacity={0.18} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-6xl">
                Ready to Experience the <span className="murree-hotels-text-gold">Finest Stay in Murree, Pakistan?</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-3xl text-lg" style={{ color: "hsl(40 38% 97% / .85)" }}>
                Stop searching for hotels in Murree Pakistan. Himalaya Premium Villas offers something the Murree Hills have never seen before — a fully private luxury estate where every detail, every space, and every moment is designed exclusively around you.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mx-auto mt-5 max-w-3xl text-lg" style={{ color: "hsl(40 38% 97% / .85)" }}>
                Bookings are strictly limited each month to preserve the exclusivity of your experience. Secure your private estate before availability is gone.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="#contact" className="murree-hotels-grad-gold murree-hotels-shadow-gold rounded-full px-8 py-4 font-semibold transition hover:scale-105" style={{ color: "hsl(165 60% 18%)" }}>
                  Reserve Your Stay Now
                </a>
                <a href="#contact" className="rounded-full px-8 py-4 font-semibold backdrop-blur-md transition"
                  style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}>
                  Contact Us
                </a>
              </div>
            </Reveal>
            <Reveal delay={600}>
              <div className="mx-auto mt-16 max-w-2xl rounded-2xl p-8 text-center backdrop-blur-md"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" style={{ color: "hsl(42 95% 75%)" }} />
                    <span>+92 304 567 9000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" style={{ color: "hsl(42 95% 75%)" }} />
                    <span>info@himalayavillas.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" style={{ color: "hsl(42 95% 75%)" }} />
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


/* ----------------------------- 9. Contact Form ----------------------------- */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '1',
      message: ''
    });
    
    alert('Thank you for your inquiry! We will contact you soon.');
  };

  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Get in Touch" title="Contact Himalaya Villas Resort" sub="Book your luxury stay or inquire about our services" />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <Reveal className="flex-1">
            <div className="murree-hotels-card murree-hotels-shadow-lux h-full p-6 lg:p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px] touch-manipulation"
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px] touch-manipulation"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px] touch-manipulation"
                    placeholder="+92 300 0000000"
                    autoComplete="tel"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Check-in Date</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px] touch-manipulation"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px] touch-manipulation"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px] touch-manipulation"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: "hsl(165 60% 18%)" }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none touch-manipulation"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white w-full rounded-lg px-4 py-4 text-lg font-semibold transition-transform hover:scale-105 shadow-md min-h-[56px] hover:bg-emerald-700 active:scale-95 touch-manipulation"
                  disabled={!formData.name || !formData.email}
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </Reveal>
          <Reveal delay={200} className="flex-1 lg:max-w-md">
            <div className="murree-hotels-card murree-hotels-shadow-lux h-full p-6 lg:p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "+92 304 567 9000" },
                  { icon: Mail, label: "Email", value: "info@himalayavillas.com" },
                  { icon: MapPin, label: "Location", value: "Murree, Punjab, Pakistan" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="murree-hotels-grad-emerald flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0" style={{ color: "hsl(40 38% 97%)" }}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="murree-hotels-muted text-sm uppercase tracking-widest">{c.label}</p>
                      <p className="font-semibold break-words" style={{ color: "hsl(165 60% 18%)" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h4 className="mb-4 text-lg font-bold" style={{ color: "hsl(165 60% 18%)" }}>Operating Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- Gallery Section ----------------------------- */
function Gallery() {
  const galleryImages = [
    { src: "/assets/gallery-exterior.jpg", alt: "Resort Exterior" },
    { src: "/assets/gallery-interior.jpg", alt: "Luxury Interior" },
    { src: "/assets/gallery-garden.jpg", alt: "Beautiful Gardens" },
    { src: "/assets/gallery-balcony.jpg", alt: "Mountain View Balcony" },
    { src: "/assets/gallery-dining-night.jpg", alt: "Fine Dining" },
    { src: "/assets/gallery-bbq.jpg", alt: "BBQ Area" },
    { src: "/assets/gallery-sunlight.jpg", alt: "Sunlight View" },
    { src: "/assets/gallery-reflection.jpg", alt: "Pool Reflection" },
  ];

  return (
    <Section>
      <Container>
        <SectionHeader kicker="Visual Tour" title="Resort Gallery" sub="Explore the beauty and luxury of Himalaya Villas Resort" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-2xl murree-hotels-shadow-lux transition hover:-translate-y-2">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-full transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 11. Call to Action ----------------------------- */
function CallToAction() {
  return (
    <Section className="murree-hotels-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-6xl mb-6">
                Ready to Experience <span className="murree-hotels-text-gold">Luxury</span>?
              </h2>
              <p className="text-xl md:text-2xl mb-8" style={{ color: "hsl(40 38% 97% / .9)" }}>
                Book your stay at Himalaya Villas Resort and create unforgettable memories in the mountains of Murree
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contact" className="murree-hotels-grad-gold murree-hotels-shadow-gold rounded-full px-8 py-4 text-lg font-semibold transition-transform hover:scale-105"
                  style={{ color: "hsl(165 60% 18%)" }}>
                  Book Now
                </a>
                <a href="tel:+923045679000" className="rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-md transition"
                  style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)" }}>
                  Call +92 304 567 9000
                </a>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Star, title: "5-Star Luxury", desc: "Experience world-class amenities" },
                  { icon: Mountain, title: "Mountain Views", desc: "Breathtaking scenic beauty" },
                  { icon: Heart, title: "Exceptional Service", desc: "Personalized hospitality" },
                ].map((feature, index) => (
                  <Reveal key={index} delay={index * 150}>
                    <div className="text-center">
                      <div className="murree-hotels-grad-gold murree-hotels-shadow-gold mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ color: "hsl(165 60% 18%)" }}>
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p style={{ color: "hsl(40 38% 97% / .8)" }}>{feature.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}
function Footer() {
  return (
    <footer style={{ background: "hsl(165 60% 12%)", color: "hsl(40 38% 97%)" }}>
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-4">
          <div>
            <h3 className="murree-hotels-text-gold text-2xl font-bold">Himalaya Villas Resort</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Experience unparalleled luxury at Himalaya Villas Resort, the premier destination in Murree with breathtaking mountain views and world-class amenities.
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["Himalaya Villas Resort", "Luxury Villas", "Mountain Views", "Contact Us"] },
            { h: "Services", items: ["Villa Booking", "Luxury Stays", "Travel Guide", "Customer Support"] },
          ].map((c) => (
            <div key={c.h}>
              <h4 className="mb-4 text-lg font-bold">{c.h}</h4>
              <ul className="space-y-2 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
                {c.items.map((i) => <li key={i}><a href="#" className="hover:opacity-100" style={{ opacity: .85 }}>{i}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-lg font-bold">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin].map((Icon, k) => (
                <a key={k} href="#" aria-label="Social link"
                  className="flex h-11 w-11 items-center justify-center rounded-full transition"
                  style={{ border: "1px solid hsl(40 38% 97% / .2)" }}>
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              <Wifi className="h-4 w-4" /> Free WiFi at all hotels
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-sm" style={{ borderTop: "1px solid hsl(40 38% 97% / .15)", color: "hsl(40 38% 97% / .6)" }}>
          © {new Date().getFullYear()} Himalaya Villas Resort. All rights reserved. | Luxury Villas in Murree | Premium Resort Experience
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function Index() {
  useEffect(() => {
    document.title = "Family Hotels in Murree — Himalaya Premium Villas, Where Families Belong";
  }, []);
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="murree-hotels-page">
        <HeroSlider />
        <Introduction />
        <WhyPerfectForFamilies />
        <EstateDetail />
        <IdealGuests />
        <MurreeBhurbanLocation />
        <FAQ />
        <Pricing />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
