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
    name: "Pearl Continental Hotel Murree", 
    tag: "5 STAR LUXURY", 
    price: "₨80,000+",
    desc: "Premier luxury hotel with panoramic mountain views and world-class amenities in the heart of Murree",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    perks: ["Mountain Views", "Fine Dining", "Spa & Wellness", "Conference Facilities"] 
  },
  { 
    name: "Shangrila Resort Hotel Murree", 
    tag: "PREMIUM RESORT", 
    price: "₨70,000+",
    desc: "Elegant resort offering luxury accommodations with breathtaking valley views",
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80",
    perks: ["Garden Views", "Multi-Cuisine Restaurant", "Indoor Pool", "Event Spaces"] 
  },
  { 
    name: "Lockwood Hotel Murree", 
    tag: "HERITAGE CHARM", 
    price: "₨60,000+",
    desc: "Historic luxury hotel combining colonial charm with modern comforts",
    img: "https://images.unsplash.com/photo-1582719508461-9c81e5d91b9c?w=900&q=80",
    perks: ["Colonial Architecture", "Heritage Rooms", "British Bar", "Library Lounge"] 
  },
  { 
    name: "Pine Boutique Hotel", 
    tag: "BOUTIQUE LUXURY", 
    price: "₨50,000+",
    desc: "Intimate boutique hotel with personalized service and elegant design",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80",
    perks: ["Boutique Design", "Personalized Service", "Rooftop Restaurant", "Mountain Terrace"] 
  },
  { 
    name: "Grand Taj Hotel Murree", 
    tag: "FAMILY COMFORT", 
    price: "₨45,000+",
    desc: "Modern luxury hotel with exceptional comfort and hospitality for families",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24a32?w=900&q=80",
    perks: ["Modern Rooms", "Business Center", "Family Suites", "Kids Play Area"] 
  },
  { 
    name: "Metropolitan Hotel Murree", 
    tag: "MALL ROAD LOCATION", 
    price: "₨40,000+",
    desc: "Contemporary luxury hotel in the center of Murree Mall Road",
    img: "https://images.unsplash.com/photo-1551882239-ba6f5b0d8aa0?w=900&q=80",
    perks: ["Mall Road Location", "City Views", "Shopping Access", "Nightlife"] 
  }
];

const MALL_ROAD_HOTELS = [
  { name: "Metropolitan Hotel Murree", price: "₨40,000+", desc: "Prime location on Mall Road with city views" },
  { name: "Hotel One Mall Road", price: "₨25,000+", desc: "Modern comfort in the heart of shopping district" },
  { name: "Green Retreat Hotel", price: "₨20,000+", desc: "Cozy hotel with easy access to shopping" },
];

const NATHIA_GALI_HOTELS = [
  { name: "Elites Hotel Nathia Gali", price: "₨35,000+", desc: "Luxury resort with mountain views" },
  { name: "Hills End Hotel", price: "₨30,000+", desc: "Premium accommodation in Nathia Gali" },
  { name: "Pine Hills Nathia Gali", price: "₨25,000+", desc: "Comfortable stay with scenic beauty" },
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" style={{ color: "hsl(40 38% 97%)" }}>
        <Reveal>
          <span className="mb-4 inline-block rounded-full px-5 py-2 text-sm font-medium uppercase tracking-widest backdrop-blur-md"
            style={{ border: "1px solid hsl(38 88% 55% / .4)", background: "hsl(38 88% 55% / .1)", color: "hsl(42 95% 65%)" }}>
            Murree · Pakistan · Queen of Hills
          </span>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="text-5xl font-bold leading-tight md:text-8xl">
            Hotels in <span className="murree-hotels-text-gold">Murree Pakistan</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
            Discover the Best Resort in Murree
          </p>
        </Reveal>
        <Reveal delay={450}>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "hsl(40 38% 97% / .85)" }}>
            Find perfect hotel rooms in Murree with luxury amenities, breathtaking mountain views, and exceptional hospitality. Your gateway to Murree resorts and mountain paradise.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#hotels" className="murree-hotels-grad-gold murree-hotels-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{ color: "hsl(165 60% 18%)" }}>
              Explore Hotels
            </a>
            <a href="#booking" className="rounded-full px-8 py-4 text-base font-semibold backdrop-blur-md transition"
              style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)" }}>
              Book Rooms
            </a>
          </div>
        </Reveal>

        {/* Feature cards */}
        <Reveal delay={800}>
          <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Star, title: "Luxury Hotels", sub: "5-star accommodations" },
              { icon: Mountain, title: "Mountain Views", sub: "Breathtaking scenery" },
              { icon: Home, title: "Comfortable Rooms", sub: "Premium hotel rooms" },
            ].map((f, k) => (
              <div key={k} className="rounded-2xl p-6 backdrop-blur-xl transition hover:-translate-y-2"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <div className="murree-hotels-grad-gold murree-hotels-shadow-gold mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(165 60% 18%)" }}>
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

/* ----------------------------- 1. Featured Hotels ----------------------------- */
function FeaturedHotels() {
  return (
    <Section id="hotels">
      <Container>
        <SectionHeader kicker="Premium Stays" title="Hotels in Murree Pakistan" sub="Discover the finest accommodations in the Queen of Hills" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MURREE_HOTELS.map((h, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-hotels-card murree-hotels-shadow-lux group h-full overflow-hidden transition hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={h.img} alt={h.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4">
                    <span className="murree-hotels-grad-gold rounded-full px-3 py-1 text-xs font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.tag}</span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: "hsl(38 88% 35%)" }}>{h.price}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.name}</h3>
                  <p className="murree-hotels-muted mb-4">{h.desc}</p>
                  <ul className="mb-6 space-y-2">
                    {h.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <button className="murree-hotels-grad-emerald w-full rounded-full py-3 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
                    Book Now
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

/* ----------------------------- 2. Hotel Rooms ----------------------------- */
function HotelRooms() {
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Accommodations" title="Hotel Rooms in Murree" sub="Find the perfect room type for your stay in Murree" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {ROOM_TYPES.map((room, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-hotels-card murree-hotels-shadow-lux group h-full p-8 text-center transition hover:-translate-y-2">
                <div className="murree-hotels-grad-emerald mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                  <room.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{room.title}</h3>
                <p className="murree-hotels-muted mb-4">{room.desc}</p>
                <p className="font-semibold" style={{ color: "hsl(38 88% 35%)" }}>{room.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 3. Best Resort ----------------------------- */
function BestResort() {
  return (
    <Section className="murree-hotels-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1582719508461-9c81e5d91b9c?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Excellence" title={<>Best Resort in <span className="murree-hotels-text-gold">Murree</span></>}
            sub="Experience luxury at its finest with premium resort facilities" light />
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl p-8 backdrop-blur-md"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <h3 className="mb-6 text-3xl font-bold">Shangrila Resort Hotel Murree</h3>
                <p className="mb-6 text-lg" style={{ color: "hsl(40 38% 97% / .9)" }}>
                  Experience the ultimate luxury at Shangrila Resort, the best resort in Murree. Nestled in the hills with breathtaking valley views, world-class amenities, and exceptional service.
                </p>
                <div className="space-y-4">
                  {[
                    "Infinity pool with mountain views",
                    "Multi-cuisine fine dining restaurant",
                    "Luxury spa and wellness center",
                    "Conference and event facilities",
                    "24/7 room service and concierge"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5" style={{ color: "hsl(42 95% 75%)" }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-2xl font-bold" style={{ color: "hsl(42 95% 75%)" }}>From ₨70,000/night</p>
                  <button className="mt-4 murree-hotels-grad-gold murree-hotels-shadow-gold rounded-full px-8 py-3 font-semibold transition hover:scale-105" style={{ color: "hsl(165 60% 18%)" }}>
                    Book Resort
                  </button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80" alt="Shangrila Resort" className="h-full w-full object-cover" />
                <div className="absolute inset-0 murree-hotels-grad-hero" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center gap-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" style={{ color: "hsl(42 95% 75%)" }} />)}
                    </div>
                    <p className="text-xl font-bold">Award-Winning Luxury Resort</p>
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

/* ----------------------------- 4. Murree Resorts ----------------------------- */
function MurreeResorts() {
  const resorts = [
    { name: "Shangrila Resort", tag: "Luxury", price: "₨70,000+", rating: 5 },
    { name: "Pine Hills Resort", tag: "Premium", price: "₨45,000+", rating: 4 },
    { name: "Green Valley Resort", tag: "Comfort", price: "₨30,000+", rating: 4 },
    { name: "Mountain View Resort", tag: "Budget", price: "₨20,000+", rating: 3 },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Collection" title="Murree Resorts" sub="Explore the finest resorts in Murree with world-class amenities" />
        <div className="grid gap-6 md:grid-cols-2">
          {resorts.map((resort, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-hotels-card murree-hotels-shadow-lux p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{resort.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {[...Array(resort.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: "hsl(38 88% 55%)" }} />)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="murree-hotels-grad-emerald rounded-full px-3 py-1 text-xs font-bold" style={{ color: "hsl(40 38% 97%)" }}>{resort.tag}</span>
                    <p className="mt-2 font-bold" style={{ color: "hsl(38 88% 35%)" }}>{resort.price}</p>
                  </div>
                </div>
                <p className="murree-hotels-muted">Experience luxury and comfort at {resort.name} with premium amenities and exceptional service.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 5. Mall Road Hotels ----------------------------- */
function MallRoadHotels() {
  return (
    <Section>
      <Container>
        <SectionHeader kicker="Prime Location" title="5 Star Hotels in Murree Mall Road" sub="Stay in the heart of Murree's shopping and entertainment district" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MALL_ROAD_HOTELS.map((hotel, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-hotels-card murree-hotels-shadow-lux h-full p-6 transition hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{hotel.name}</h3>
                  <span className="text-lg font-bold" style={{ color: "hsl(38 88% 35%)" }}>{hotel.price}</span>
                </div>
                <p className="murree-hotels-muted mb-4">{hotel.desc}</p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} />
                  <span className="murree-hotels-muted">Mall Road, Murree</span>
                </div>
                <button className="mt-4 murree-hotels-grad-emerald w-full rounded-full py-2 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
                  View Details
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="mt-12 rounded-2xl p-6 text-center"
            style={{ border: "1px solid hsl(38 88% 55% / .3)", background: "hsl(38 88% 55% / .1)" }}>
            <p className="text-lg" style={{ color: "hsl(165 60% 18%)" }}>
              <strong>Mall Road Advantage:</strong> Stay in the center of Murree with easy access to shopping, dining, and entertainment venues.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------- 6. Nathia Gali Hotels ----------------------------- */
function NathiaGaliHotels() {
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Nearby Destination" title="Nathia Gali Hotels" sub="Explore luxury accommodations in the nearby beautiful hill station" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NATHIA_GALI_HOTELS.map((hotel, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-hotels-card murree-hotels-shadow-lux h-full p-6 transition hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{hotel.name}</h3>
                  <span className="text-lg font-bold" style={{ color: "hsl(38 88% 35%)" }}>{hotel.price}</span>
                </div>
                <p className="murree-hotels-muted mb-4">{hotel.desc}</p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} />
                  <span className="murree-hotels-muted">Nathia Gali (15km from Murree)</span>
                </div>
                <button className="mt-4 murree-hotels-grad-emerald w-full rounded-full py-2 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
                  Book Now
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="mt-12 rounded-2xl p-6 text-center"
            style={{ border: "1px solid hsl(38 88% 55% / .3)", background: "hsl(38 88% 55% / .1)" }}>
            <p className="text-lg" style={{ color: "hsl(165 60% 18%)" }}>
              <strong>Nathia Gali Experience:</strong> Just 15km from Murree, offering pristine natural beauty and serene mountain environment.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------- 7. Amenities ----------------------------- */
function Amenities() {
  const items = [
    { icon: Wifi, title: "High-Speed WiFi", desc: "Complimentary internet access" },
    { icon: Utensils, title: "Fine Dining", desc: "Multi-cuisine restaurants" },
    { icon: Dumbbell, title: "Fitness Center", desc: "Modern gym facilities" },
    { icon: Car, title: "Valet Parking", desc: "Complimentary parking service" },
    { icon: Coffee, title: "Coffee Lounge", desc: "Elegant coffee shops" },
    { icon: Heart, title: "Concierge Service", desc: "24/7 personalized assistance" },
    { icon: Tv, title: "Entertainment", desc: "Smart TVs with streaming" },
    { icon: Shield, title: "Security", desc: "24/7 security service" },
  ];
  return (
    <Section className="murree-hotels-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Facilities" title="Luxury Amenities" sub="World-class facilities and services at Murree hotels" light />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((it, k) => (
              <Reveal key={k} delay={k * 100}>
                <div className="group h-full rounded-2xl p-6 text-center backdrop-blur-md transition hover:-translate-y-2"
                  style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .05)" }}>
                  <div className="murree-hotels-grad-gold mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ color: "hsl(165 60% 18%)" }}>
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

/* ----------------------------- 8. Pricing ----------------------------- */
function Pricing() {
  const rows = [
    { tag: "BUDGET", name: "Budget Hotels", price: "10,000 – 20,000", best: "Backpackers, solo travelers", bg: "hsl(160 60% 92%)", fg: "hsl(160 60% 25%)" },
    { tag: "MID-RANGE", name: "Mid-Range Hotels", price: "20,000 – 40,000", best: "Families, couples", bg: "hsl(200 80% 92%)", fg: "hsl(200 80% 30%)" },
    { tag: "LUXURY", name: "Luxury Hotels", price: "40,000 – 80,000", best: "Business, luxury seekers", bg: "hsl(40 90% 90%)", fg: "hsl(38 88% 35%)" },
    { tag: "PREMIUM", name: "5-Star Hotels", price: "80,000 – 150,000+", best: "VIP guests, honeymoon", bg: "hsl(340 80% 94%)", fg: "hsl(340 70% 40%)" },
  ];
  return (
    <Section id="booking">
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

/* ----------------------------- 9. Contact ----------------------------- */
function Contact() {
  const contacts = [
    { icon: Phone, label: "Phone", value: "+92 304 567 9000" },
    { icon: Mail, label: "Email", value: "info@himalayavillas.com" },
    { icon: MapPin, label: "Location", value: "Murree, Punjab, Pakistan" },
  ];
  const links = ["About Murree Hotels", "Travel Guide", "Special Packages", "Cancellation Policy", "Terms & Conditions", "Privacy Policy"];
  return (
    <Section>
      <Container>
        <SectionHeader kicker="Reach us" title="Contact for Hotel Bookings" sub="Have questions? We're here to help you plan your perfect stay in Murree" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="murree-hotels-card murree-hotels-shadow-lux h-full p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Contact Information</h3>
              <div className="space-y-5">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="murree-hotels-grad-emerald flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(40 38% 97%)" }}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="murree-hotels-muted text-sm uppercase tracking-widest">{c.label}</p>
                      <p className="font-semibold" style={{ color: "hsl(165 60% 18%)" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="murree-hotels-card murree-hotels-shadow-lux h-full p-8">
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
            <h3 className="murree-hotels-text-gold text-2xl font-bold">Hotels in Murree Pakistan</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Your complete guide to finding the perfect hotel rooms in Murree with luxury amenities and mountain views.
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["Hotels in Murree", "Murree Resorts", "Mall Road Hotels", "Best Resort"] },
            { h: "Services", items: ["Hotel Booking", "Room Reservations", "Travel Guide", "Customer Support"] },
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
          © {new Date().getFullYear()} Hotels in Murree Pakistan. All rights reserved. | Hotel Rooms in Murree | Best Resort in Murree
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function Index() {
  useEffect(() => {
    document.title = "Hotels in Murree Pakistan | Hotel Rooms in Murree | Best Resort in Murree | Murree Resorts";
  }, []);
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="murree-hotels-page">
        <HeroSlider />
        <FeaturedHotels />
        <HotelRooms />
        <BestResort />
        <MurreeResorts />
        <MallRoadHotels />
        <NathiaGaliHotels />
        <Amenities />
        <Pricing />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
