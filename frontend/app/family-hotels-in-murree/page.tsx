"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import {
  Mountain, Sparkles, Home, Star, Utensils, Briefcase, Clock,
  Phone, Mail, MapPin, ChevronLeft, ChevronRight, Check,
  Sun, Snowflake, Flower2, Facebook, Twitter, Linkedin, ArrowDown, Wifi,
  Car, Coffee, Dumbbell, Heart, TreePine, Wind, Cloud, Bed, Bath,
  Tv, Shield, Users, Calendar, Map, Baby, Gamepad2, Gift, Sparkles as HeartIcon
} from "lucide-react";

/* ============================================================
   FAMILY HOTELS IN MURREE - Comprehensive Landing Page
   All keywords covered: family hotels in murree, best hotel in murree for family,
   murree hotels for couples, best hotel for couples, hotel for couples, honeymoon hotel murree
   ============================================================ */
const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.family-murree-page{
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
.family-murree-page h1,.family-murree-page h2,.family-murree-page h3,.family-murree-page h4{font-family:'Playfair Display',Georgia,serif;}
.family-murree-page a{color:inherit;text-decoration:none;}
.family-murree-page button{font-family:inherit;cursor:pointer;border:0;}

.family-murree-grad-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));}
.family-murree-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.family-murree-grad-hero{background:linear-gradient(135deg,hsl(165 60% 12% / .85),hsl(165 50% 25% / .55));}
.family-murree-grad-romantic{background:linear-gradient(135deg,hsl(340 75% 55%),hsl(320 85% 65%));}
.family-murree-text-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.family-murree-text-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.family-murree-text-romantic{background:linear-gradient(135deg,hsl(340 75% 55%),hsl(320 85% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.family-murree-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.family-murree-shadow-gold{box-shadow:0 15px 40px -10px hsl(38 88% 55% / .5);}
.family-murree-shadow-romantic{box-shadow:0 15px 40px -10px hsl(340 75% 55% / .5);}

.family-murree-card{background:hsl(var(--card));border-radius:24px;}
.family-murree-border{border:1px solid hsl(var(--border));}
.family-murree-muted{color:hsl(var(--muted));}

.family-murree-reveal{opacity:0;transform:translateY(40px);transition:opacity .9s ease-out,transform .9s ease-out;}
.family-murree-reveal.in{opacity:1;transform:translateY(0);}

@keyframes family-murreeKenBurns{0%{transform:scale(1)}100%{transform:scale(1.15)}}
@keyframes family-murreeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes family-murreeScrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
@keyframes family-murreeHeartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.family-murree-ken{animation:family-murreeKenBurns 8s ease-out both;}
.family-murree-float{animation:family-murreeFloat 6s ease-in-out infinite;}
.family-murree-scroll-ind{animation:family-murreeScrollDown 1.5s ease-in-out infinite;}
.family-murree-heartbeat{animation:family-murreeHeartbeat 2s ease-in-out infinite;}

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
    <div ref={ref} className={`family-murree-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ----------------------------- Data ----------------------------- */
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  "https://images.unsplash.com/photo-1512917771078-0b2fe8e0a920?w=1920&q=80",
];

const FAMILY_HOTELS = [
  { 
    name: "Grand Taj Hotel Murree", 
    tag: "FAMILY COMFORT", 
    price: "₨45,000+",
    desc: "Perfect family hotel with spacious rooms, kids play area, and family-friendly amenities",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24a32?w=900&q=80",
    perks: ["Family Suites", "Kids Play Area", "Family Restaurant", "Child Care Services"] 
  },
  { 
    name: "Pearl Continental Hotel Murree", 
    tag: "PREMIUM FAMILY", 
    price: "₨80,000+",
    desc: "Luxury family accommodation with world-class amenities for the entire family",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    perks: ["Connecting Rooms", "Kids Club", "Family Pool", "Babysitting Service"] 
  },
  { 
    name: "Shangrila Resort Hotel Murree", 
    tag: "FAMILY RESORT", 
    price: "₨70,000+",
    desc: "Resort-style family accommodation with extensive recreational facilities",
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80",
    perks: ["Garden Play Area", "Family Activities", "Multi-Cuisine", "Game Room"] 
  },
  { 
    name: "Hotel One Murree", 
    tag: "BUDGET FAMILY", 
    price: "₨25,000+",
    desc: "Affordable family hotel with comfortable rooms and essential amenities",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80",
    perks: ["Family Rooms", "Kids Menu", "Parking", "WiFi"] 
  },
];

const COUPLES_HOTELS = [
  { 
    name: "Pine Boutique Hotel", 
    tag: "ROMANTIC LUXURY", 
    price: "₨50,000+",
    desc: "Intimate boutique hotel perfect for couples with romantic ambiance",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
    perks: ["Romantic Suites", "Candlelit Dinners", "Couples Spa", "Private Balcony"] 
  },
  { 
    name: "Lockwood Hotel Murree", 
    tag: "HERITAGE ROMANCE", 
    price: "₨60,000+",
    desc: "Historic charm meets modern luxury for romantic getaways",
    img: "https://images.unsplash.com/photo-1582719508461-9c81e5d91b9c?w=900&q=80",
    perks: ["Colonial Charm", "Fireplace Suites", "Wine Bar", "Library Lounge"] 
  },
  { 
    name: "Metropolitan Hotel Murree", 
    tag: "URBAN ROMANCE", 
    price: "₨40,000+",
    desc: "Modern luxury hotel with romantic city views and amenities",
    img: "https://images.unsplash.com/photo-1551882239-ba6f5b0d8aa0?w=900&q=80",
    perks: ["City Views", "Rooftop Dining", "Nightlife Access", "Couples Packages"] 
  },
];

const HONEYMOON_PACKAGES = [
  {
    name: "Romantic Mountain Escape",
    price: "₨120,000 for 3 nights",
    includes: ["Luxury Suite", "Candlelit Dinner", "Couples Spa", "Breakfast in Bed", "Airport Transfer"],
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80"
  },
  {
    name: "Honeymoon Paradise Package",
    price: "₨200,000 for 5 nights",
    includes: ["Presidential Suite", "Private Dinners", "Spa Treatments", "Wine & Chocolates", "Romantic Excursions"],
    img: "https://images.unsplash.com/photo-1512917771078-0b2fe8e0a920?w=900&q=80"
  },
  {
    name: "Luxury Love Retreat",
    price: "₨350,000 for 7 nights",
    includes: ["Honeymoon Villa", "Personal Chef", "Butler Service", "Private Tours", "Romantic Setup"],
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80"
  },
];

const FAMILY_AMENITIES = [
  { icon: Baby, title: "Kids Club", desc: "Supervised activities for children" },
  { icon: Gamepad2, title: "Game Room", desc: "Indoor games and entertainment" },
  { icon: Users, title: "Family Suites", desc: "Spacious rooms for families" },
  { icon: Coffee, title: "Family Restaurant", desc: "Kid-friendly dining options" },
  { icon: Car, title: "Family Parking", desc: "Dedicated family parking" },
  { icon: Shield, title: "Child Safety", desc: "Child-proof rooms and safety" },
];

const COUPLES_AMENITIES = [
  { icon: HeartIcon, title: "Romantic Setup", desc: "Flower petals & candles" },
  { icon: Sparkles, title: "Couples Spa", desc: "Private spa treatments" },
  { icon: Utensils, title: "Candlelit Dinner", desc: "Romantic dining experiences" },
  { icon: Gift, title: "Welcome Gifts", desc: "Champagne & chocolates" },
  { icon: Bath, title: "Jacuzzi Suites", desc: "Private hot tub facilities" },
  { icon: Tv, title: "Movie Nights", desc: "In-room entertainment" },
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
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((src, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <img src={src} alt="" className={`h-full w-full object-cover ${idx === i ? "family-murree-ken" : ""}`} />
          <div className="absolute inset-0 family-murree-grad-hero" />
        </div>
      ))}

      {/* Floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, k) => (
          <div
            key={k}
            className="absolute rounded-3xl family-murree-float"
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" style={{ color: "hsl(40 38% 97%)" }}>
        <Reveal>
          <span className="mb-4 inline-block rounded-full px-5 py-2 text-sm font-medium uppercase tracking-widest backdrop-blur-md"
            style={{ border: "1px solid hsl(38 88% 55% / .4)", background: "hsl(38 88% 55% / .1)", color: "hsl(42 95% 65%)" }}>
            Murree · Pakistan · Perfect Getaway
          </span>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="text-5xl font-bold leading-tight md:text-8xl">
            Family Hotels in <span className="family-murree-text-gold">Murree</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
            Best Hotel in Murree for Family & Couples
          </p>
        </Reveal>
        <Reveal delay={450}>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "hsl(40 38% 97% / .85)" }}>
            Discover perfect family hotels and romantic couple accommodations in Murree. From family-friendly resorts to intimate honeymoon hotels, find your ideal mountain retreat.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#family" className="family-murree-grad-gold family-murree-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{ color: "hsl(165 60% 18%)" }}>
              Family Hotels
            </a>
            <a href="#couples" className="family-murree-grad-romantic family-murree-shadow-romantic rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{ color: "hsl(40 38% 97%)" }}>
              Couples Hotels
            </a>
          </div>
        </Reveal>

        {/* Feature cards */}
        <Reveal delay={800}>
          <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Users, title: "Family Friendly", sub: "Perfect for families" },
              { icon: HeartIcon, title: "Romantic Getaways", sub: "Ideal for couples" },
              { icon: Gift, title: "Special Packages", sub: "Honeymoon deals" },
            ].map((f, k) => (
              <div key={k} className="rounded-2xl p-6 backdrop-blur-xl transition hover:-translate-y-2"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <div className="family-murree-grad-gold family-murree-shadow-gold mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(165 60% 18%)" }}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>
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
        <ArrowDown className="h-4 w-4 family-murree-scroll-ind" />
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
      style={{ backgroundImage: `url(${src})`, transform: `translateY(${y * speed}px)`, opacity, zIndex: 0 }} />
    );
}

/* ----------------------------- 1. Family Hotels ----------------------------- */
function FamilyHotels() {
  return (
    <Section id="family">
      <Container>
        <SectionHeader kicker="For Families" title="Best Hotel in Murree for Family" sub="Discover family-friendly accommodations with amenities for all ages" />
        <div className="grid gap-8 md:grid-cols-2">
          {FAMILY_HOTELS.map((h, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="family-murree-card family-murree-shadow-lux group h-full overflow-hidden transition hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={h.img} alt={h.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4">
                    <span className="family-murree-grad-gold rounded-full px-3 py-1 text-xs font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.tag}</span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: "hsl(38 88% 35%)" }}>{h.price}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.name}</h3>
                  <p className="family-murree-muted mb-4">{h.desc}</p>
                  <ul className="mb-6 space-y-2">
                    {h.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <button className="family-murree-grad-emerald w-full rounded-full py-3 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
                    Book Family Room
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 2. Family Amenities ----------------------------- */
function FamilyAmenities() {
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Facilities" title="Family-Friendly Amenities" sub="Comprehensive facilities designed for families with children" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FAMILY_AMENITIES.map((it, k) => (
            <Reveal key={k} delay={k * 100}>
              <div className="family-murree-card family-murree-shadow-lux group h-full p-6 text-center transition hover:-translate-y-2">
                <div className="family-murree-grad-emerald mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ color: "hsl(40 38% 97%)" }}>
                  <it.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-lg font-bold" style={{ color: "hsl(165 60% 18%)" }}>{it.title}</h3>
                <p className="family-murree-muted">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 3. Couples Hotels ----------------------------- */
function CouplesHotels() {
  return (
    <Section id="couples">
      <Container>
        <SectionHeader kicker="For Couples" title={<>Murree Hotels for <span className="family-murree-text-romantic">Couples</span></>} sub="Romantic accommodations perfect for couples and honeymooners" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {COUPLES_HOTELS.map((h, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="family-murree-card family-murree-shadow-lux group h-full overflow-hidden transition hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={h.img} alt={h.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4">
                    <span className="family-murree-grad-romantic rounded-full px-3 py-1 text-xs font-bold" style={{ color: "hsl(40 38% 97%)" }}>{h.tag}</span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: "hsl(340 75% 35%)" }}>{h.price}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.name}</h3>
                  <p className="family-murree-muted mb-4">{h.desc}</p>
                  <ul className="mb-6 space-y-2">
                    {h.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4" style={{ color: "hsl(340 75% 55%)" }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <button className="family-murree-grad-romantic w-full rounded-full py-3 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
                    Book Romantic Stay
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 4. Couples Amenities ----------------------------- */
function CouplesAmenities() {
  return (
    <Section className="family-murree-grad-romantic" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Romance" title="Couples Hotel Amenities" sub="Intimate facilities and services designed for romance" light />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COUPLES_AMENITIES.map((it, k) => (
              <Reveal key={k} delay={k * 100}>
                <div className="group h-full rounded-2xl p-6 text-center backdrop-blur-md transition hover:-translate-y-2"
                  style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .05)" }}>
                  <div className="family-murree-grad-gold mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110 family-murree-heartbeat" style={{ color: "hsl(340 75% 55%)" }}>
                    <it.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{it.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(40 38% 97% / .75)" }}>{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 5. Honeymoon Packages ----------------------------- */
function HoneymoonPackages() {
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Romance" title="Honeymoon Hotel Murree" sub="Exclusive honeymoon packages for newlyweds in Murree" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {HONEYMOON_PACKAGES.map((pkg, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="family-murree-card family-murree-shadow-lux group h-full overflow-hidden transition hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src={pkg.img} alt={pkg.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 family-murree-grad-romantic" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <HeartIcon className="h-8 w-8 mx-auto mb-2 family-murree-heartbeat" style={{ color: "hsl(40 38% 97%)" }} />
                      <p className="text-xl font-bold" style={{ color: "hsl(40 38% 97%)" }}>{pkg.name}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-2xl font-bold" style={{ color: "hsl(340 75% 35%)" }}>{pkg.price}</p>
                  <ul className="mb-6 space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4" style={{ color: "hsl(340 75% 55%)" }} /> {item}
                      </li>
                    ))}
                  </ul>
                  <button className="family-murree-grad-romantic w-full rounded-full py-3 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
                    Book Honeymoon
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 6. Pricing ----------------------------- */
function Pricing() {
  const rows = [
    { tag: "FAMILY", name: "Family Rooms", price: "25,000 – 45,000", best: "Families with children", bg: "hsl(160 60% 92%)", fg: "hsl(160 60% 25%)" },
    { tag: "COUPLES", name: "Couples Suites", price: "40,000 – 60,000", best: "Couples & honeymooners", bg: "hsl(340 75% 92%)", fg: "hsl(340 75% 35%)" },
    { tag: "HONEYMOON", name: "Honeymoon Packages", price: "120,000 – 350,000", best: "Newlyweds", bg: "hsl(320 85% 92%)", fg: "hsl(320 85% 45%)" },
    { tag: "LUXURY", name: "Premium Suites", price: "60,000 – 150,000", best: "Luxury seekers", bg: "hsl(40 90% 90%)", fg: "hsl(38 88% 35%)" },
  ];
  return (
    <Section>
      <ParallaxBg src="https://images.unsplash.com/photo-1512917771078-0b2fe8e0a920?w=1920&q=80" speed={0.3} opacity={0.1} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Rates" title="Family & Couples Pricing" sub="Transparent pricing for all types of accommodations" />
          <Reveal>
            <div className="family-murree-card family-murree-border family-murree-shadow-lux overflow-hidden">
              <table className="w-full">
                <thead className="family-murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
                  <tr>
                    <th className="p-5 text-left text-lg">Package Type</th>
                    <th className="p-5 text-left text-lg">Price (PKR)</th>
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
                      <td className="family-murree-muted hidden p-5 md:table-cell">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="family-murree-muted mt-6 text-center text-sm italic">
            *Prices vary depending on season, weekends, and holidays. Contact hotels for special family and couple packages.
          </p>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 7. Contact ----------------------------- */
function Contact() {
  const contacts = [
    { icon: Phone, label: "Phone", value: "+92 304 567 9000" },
    { icon: Mail, label: "Email", value: "info@himalayavillas.com" },
    { icon: MapPin, label: "Location", value: "Murree, Punjab, Pakistan" },
  ];
  const links = ["Family Hotels", "Couples Hotels", "Honeymoon Packages", "Special Offers", "Terms & Conditions", "Privacy Policy"];
  return (
    <Section>
      <Container>
        <SectionHeader kicker="Reach us" title="Contact for Family & Couple Bookings" sub="Have questions? We're here to help you plan your perfect stay in Murree" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="family-murree-card family-murree-shadow-lux h-full p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Contact Information</h3>
              <div className="space-y-5">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="family-murree-grad-emerald flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(40 38% 97%)" }}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="family-murree-muted text-sm uppercase tracking-widest">{c.label}</p>
                      <p className="font-semibold" style={{ color: "hsl(165 60% 18%)" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="family-murree-card family-murree-shadow-lux h-full p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Quick Links</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-black/5">
                      <Check className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} />
                      <span>{l}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
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
            <h3 className="family-murree-text-gold text-2xl font-bold">Family Hotels in Murree</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Your complete guide to finding perfect family and couple accommodations in Murree with luxury amenities.
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["Family Hotels", "Couples Hotels", "Honeymoon Packages", "Best Hotel for Couples"] },
            { h: "Services", items: ["Family Booking", "Couples Packages", "Honeymoon Planning", "Customer Support"] },
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
              <Wifi className="h-4 w-4" /> Family & Couples Friendly
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-sm" style={{ borderTop: "1px solid hsl(40 38% 97% / .15)", color: "hsl(40 38% 97% / .6)" }}>
          © {new Date().getFullYear()} Family Hotels in Murree. All rights reserved. | Best Hotel in Murree for Family | Murree Hotels for Couples
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function Index() {
  useEffect(() => {
    document.title = "Family Hotels in Murree | Best Hotel in Murree for Family | Murree Hotels for Couples | Honeymoon Hotel Murree";
  }, []);
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="family-murree-page">
        <HeroSlider />
        <FamilyHotels />
        <FamilyAmenities />
        <CouplesHotels />
        <CouplesAmenities />
        <HoneymoonPackages />
        <Pricing />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
