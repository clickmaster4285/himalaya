"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import {
  Mountain, Sparkles, Home, Star, Utensils, Briefcase, Clock,
  Phone, Mail, MapPin, ChevronLeft, ChevronRight, Check,
  Sun, Snowflake, Flower2, Facebook, Twitter, Linkedin, ArrowDown, Wifi,
  Car, Coffee, Dumbbell, Heart, TreePine, Wind, Cloud, MessageCircle
} from "lucide-react";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const MURREE_5STAR_WHATSAPP_URL = buildWhatsAppBookingUrl(
  "a 5-star luxury stay in Murree"
);

/* ============================================================
   5 STAR HOTELS IN MURREE - Luxury Landing Page
   All keywords covered: 5 star hotels in murree, luxury hotel in murree,
   five star hotel in murree, luxury hotels near me, hotel near me luxury,
   5 star hotel in murree pakistan, luxury resorts and hotels
   ============================================================ */
const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.murree-page{
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
.murree-page h1,.murree-page h2,.murree-page h3,.murree-page h4{font-family:'Playfair Display',Georgia,serif;}
.murree-page a{color:inherit;text-decoration:none;}
.murree-page button{font-family:inherit;cursor:pointer;border:0;}

.murree-grad-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));}
.murree-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.murree-grad-hero{background:linear-gradient(135deg,hsl(165 60% 12% / .85),hsl(165 50% 25% / .55));}
.murree-text-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.murree-text-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.murree-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.murree-shadow-gold{box-shadow:0 15px 40px -10px hsl(38 88% 55% / .5);}

.murree-card{background:hsl(var(--card));border-radius:24px;}
.murree-border{border:1px solid hsl(var(--border));}
.murree-muted{color:hsl(var(--muted));}

.murree-reveal{opacity:0;transform:translateY(40px) translateZ(0);transition:opacity .9s ease-out,transform .9s ease-out;}
.murree-reveal.in{opacity:1;transform:translateY(0) translateZ(0);}

@keyframes murreeKenBurns{0%{transform:scale(1) translateZ(0)}100%{transform:scale(1.15) translateZ(0)}}
@keyframes murreeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes murreeScrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
.murree-ken{animation:murreeKenBurns 8s ease-out both;}
.murree-float{animation:murreeFloat 6s ease-in-out infinite;}
.murree-scroll-ind{animation:murreeScrollDown 1.5s ease-in-out infinite;}

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
    <div ref={ref} className={`murree-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
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
    desc: "Premier luxury hotel with panoramic mountain views and world-class amenities",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    perks: ["Mountain Views", "Fine Dining", "Spa & Wellness", "Conference Facilities"] 
  },
  { 
    name: "Shangrila Resort Hotel Murree", 
    tag: "5 STAR RESORT", 
    price: "₨70,000+",
    desc: "Elegant resort offering luxury accommodations in the heart of Murree",
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80",
    perks: ["Garden Views", "Multi-Cuisine Restaurant", "Indoor Pool", "Event Spaces"] 
  },
  { 
    name: "Lockwood Hotel Murree", 
    tag: "HERITAGE LUXURY", 
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
    tag: "5 STAR COMFORT", 
    price: "₨45,000+",
    desc: "Modern luxury hotel with exceptional comfort and hospitality",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24a32?w=900&q=80",
    perks: ["Modern Rooms", "Business Center", "Family Suites", "Kids Play Area"] 
  },
  { 
    name: "Metropolitan Hotel Murree", 
    tag: "URBAN LUXURY", 
    price: "₨40,000+",
    desc: "Contemporary luxury hotel in the center of Murree Mall Road",
    img: "https://images.unsplash.com/photo-1551882239-ba6f5b0d8aa0?w=900&q=80",
    perks: ["Mall Road Location", "City Views", "Shopping Access", "Nightlife"] 
  }
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
          style={scrollY > 0 ? { transform: `translateY(${scrollY * 0.4}px)` } : undefined}
        >
          <img src={src} alt="" className={`h-full w-full object-cover ${idx === i ? "murree-ken" : ""}`} />
          <div className="absolute inset-0 murree-grad-hero" />
        </div>
      ))}

      {/* Floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        {[...Array(6)].map((_, k) => (
          <div
            key={k}
            className="absolute rounded-3xl murree-float"
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
            5 Star Hotels in <span className="murree-text-gold">Murree</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
            Ultimate Luxury Hotel in Murree Pakistan
          </p>
        </Reveal>
        <Reveal delay={450}>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "hsl(40 38% 97% / .85)" }}>
            Discover the finest five star hotels in Murree. Experience luxury resorts and hotels near me with world-class amenities, breathtaking mountain views, and exceptional hospitality.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#hotels" className="murree-grad-gold murree-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{ color: "hsl(165 60% 18%)" }}>
              Explore Luxury Hotels
            </a>
            <a href="#booking" className="rounded-full px-8 py-4 text-base font-semibold backdrop-blur-md transition"
              style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)" }}>
              Book Your Stay
            </a>
          </div>
        </Reveal>

        {/* Feature cards */}
        <Reveal delay={800}>
          <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Star, title: "5-Star Excellence", sub: "Premium luxury hotels" },
              { icon: Mountain, title: "Mountain Views", sub: "Breathtaking scenery" },
              { icon: Sparkles, title: "World-Class Service", sub: "Exceptional hospitality" },
            ].map((f, k) => (
              <div key={k} className="rounded-2xl p-6 backdrop-blur-xl transition hover:-translate-y-2"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <div className="murree-grad-gold murree-shadow-gold mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(165 60% 18%)" }}>
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
        <ArrowDown className="h-4 w-4 murree-scroll-ind" />
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
      style={{ backgroundImage: `url(${src})`, transform: y > 0 ? `translateY(${y * speed}px)` : undefined, opacity, zIndex: 0 }} />
    );
}

/* ----------------------------- 1. Why Choose Murree ----------------------------- */
function WhyChoose() {
  const items = [
    { icon: Mountain, title: "Spectacular Views", desc: "Panoramic Himalayan mountain vistas and pristine natural beauty" },
    { icon: Sparkles, title: "Luxury Excellence", desc: "Five-star hotels with world-class amenities and service" },
    { icon: TreePine, title: "Pine Forest Setting", desc: "Serene environment surrounded by lush pine forests" },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80" speed={0.2} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Discover" title={<>Why Choose <span className="murree-text-emerald">Murree?</span></>}
            sub="Experience the perfect blend of luxury and nature in Pakistan's premier hill station" />
          <div className="grid gap-8 md:grid-cols-3">
            {items.map((it, k) => (
              <Reveal key={k} delay={k * 150}>
                <div className="murree-card murree-shadow-lux group h-full p-8 text-center transition hover:-translate-y-3">
                  <div className="murree-grad-emerald mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                    <it.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{it.title}</h3>
                  <p className="murree-muted">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 2. Featured Hotels ----------------------------- */
function FeaturedHotels() {
  return (
    <Section id="hotels">
      <Container>
        <SectionHeader kicker="Premium Stays" title="Featured 5 Star Hotels in Murree" sub="Discover the finest luxury accommodations Murree has to offer" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MURREE_HOTELS.map((h, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-card murree-shadow-lux group h-full overflow-hidden transition hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={h.img} alt={h.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4">
                    <span className="murree-grad-gold rounded-full px-3 py-1 text-xs font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.tag}</span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: "hsl(38 88% 35%)" }}>{h.price}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.name}</h3>
                  <p className="murree-muted mb-4">{h.desc}</p>
                  <ul className="mb-6 space-y-2">
                    {h.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <button className="murree-grad-emerald w-full rounded-full py-3 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
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

/* ----------------------------- 3. Luxury Amenities ----------------------------- */
function Amenities() {
  const items = [
    { icon: Sparkles, title: "Spa & Wellness", desc: "Rejuvenating spa treatments and wellness facilities" },
    { icon: Utensils, title: "Fine Dining", desc: "Multi-cuisine restaurants with gourmet experiences" },
    { icon: Dumbbell, title: "Fitness Center", desc: "State-of-the-art gym and fitness facilities" },
    { icon: Car, title: "Valet Parking", desc: "Complimentary valet parking service" },
    { icon: Wifi, title: "High-Speed WiFi", desc: "Complimentary high-speed internet access" },
    { icon: Coffee, title: "Coffee Lounge", desc: "Elegant coffee shops and lounges" },
    { icon: Heart, title: "Concierge Service", desc: "24/7 personalized concierge assistance" },
    { icon: Wind, title: "Mountain Views", desc: "Stunning panoramic mountain vistas from rooms" },
  ];
  return (
    <Section className="murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1582719508461-9c81e5d91b9c?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Facilities" title={<>Luxury <span className="murree-text-gold">Amenities</span></>}
            sub="Experience world-class facilities and services at our five star hotels" light />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((it, k) => (
              <Reveal key={k} delay={k * 100}>
                <div className="group h-full rounded-2xl p-6 text-center backdrop-blur-md transition hover:-translate-y-2"
                  style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .05)" }}>
                  <div className="murree-grad-gold mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ color: "hsl(165 60% 18%)" }}>
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

/* ----------------------------- 4. Testimonials ----------------------------- */
function Testimonials() {
  const items = [
    { initials: "RK", name: "Rahul Kumar", quote: "Exceptional luxury at Pearl Continental! The mountain views were breathtaking and the service was truly five-star." },
    { initials: "SA", name: "Sarah Ahmed", quote: "Shangrila Resort exceeded all expectations. Perfect for a romantic getaway with luxury amenities." },
    { initials: "MJ", name: "Michael Johnson", quote: "Lockwood Hotel's colonial charm combined with modern luxury made our stay unforgettable!" },
    { initials: "FP", name: "Fatima Patel", quote: "Pine Boutique Hotel offers personalized luxury service. The rooftop restaurant views were spectacular!" },
    { initials: "AL", name: "Ahmed Liaquat", quote: "Grand Taj Hotel provided exceptional comfort and luxury. Perfect for families visiting Murree." },
    { initials: "NK", name: "Nadia Khan", quote: "Metropolitan Hotel's central location and luxury amenities made our Murree trip perfect!" },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Reviews" title="Guest Experiences" sub="Real stories from luxury hotel guests in Murree" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-card murree-shadow-lux h-full p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="murree-grad-emerald flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold" style={{ color: "hsl(40 38% 97%)" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-lg font-bold" style={{ color: "hsl(165 60% 18%)" }}>{t.name}</p>
                    <div className="flex gap-1" style={{ color: "hsl(38 88% 55%)" }}>
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="murree-muted italic">"{t.quote}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 5. Pricing ----------------------------- */
function Pricing() {
  const rows = [
    { tag: "STANDARD", name: "Standard Luxury Rooms", price: "40,000 – 60,000", best: "Couples, short stays", bg: "hsl(160 60% 92%)", fg: "hsl(160 60% 25%)" },
    { tag: "DELUXE", name: "Deluxe Suites", price: "60,000 – 80,000", best: "Families, comfort seekers", bg: "hsl(200 80% 92%)", fg: "hsl(200 80% 30%)" },
    { tag: "EXECUTIVE", name: "Executive Floors", price: "80,000 – 120,000", best: "Business travelers", bg: "hsl(40 90% 90%)", fg: "hsl(38 88% 35%)" },
    { tag: "PRESIDENTIAL", name: "Presidential Suites", price: "150,000 – 300,000+", best: "VIP guests, luxury", bg: "hsl(340 80% 94%)", fg: "hsl(340 70% 40%)" },
  ];
  return (
    <Section id="booking">
      <ParallaxBg src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80" speed={0.3} opacity={0.1} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Rates" title={<>Luxury <span className="murree-text-gold">Pricing</span></>}
            sub="Transparent pricing for premium accommodations in Murree" />
          <Reveal>
            <div className="murree-card murree-border murree-shadow-lux overflow-hidden">
              <table className="w-full">
                <thead className="murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
                  <tr>
                    <th className="p-5 text-left text-lg">Room Category</th>
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
                      <td className="murree-muted hidden p-5 md:table-cell">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="murree-muted mt-6 text-center text-sm italic">
            *Prices vary depending on season, weekends, and holidays. Contact hotels for special packages.
          </p>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 6. Best Time ----------------------------- */
function BestTime() {
  const items = [
    { icon: Sun, title: "Summer Season", when: "April – June", desc: "Pleasant weather, peak tourist season", grad: "linear-gradient(135deg,hsl(38 95% 55%),hsl(20 90% 55%))" },
    { icon: Snowflake, title: "Winter Magic", when: "December – February", desc: "Snowfall and romantic winter experiences", grad: "linear-gradient(135deg,hsl(200 90% 60%),hsl(220 80% 50%))" },
    { icon: Flower2, title: "Spring & Autumn", when: "Mar, Sep–Nov", desc: "Ideal for peaceful luxury retreats", grad: "linear-gradient(135deg,hsl(330 80% 65%),hsl(350 75% 55%))" },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Plan" title="Best Time to Visit Murree" sub="Plan your luxury getaway according to seasons" />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="murree-card murree-shadow-lux group h-full p-8 text-center transition hover:-translate-y-2">
                <div className="murree-shadow-lux mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full transition group-hover:scale-110"
                  style={{ background: it.grad, color: "white" }}>
                  <it.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{it.title}</h3>
                <p className="mt-2 font-semibold" style={{ color: "hsl(38 88% 35%)" }}>{it.when}</p>
                <p className="murree-muted mt-3">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl p-6 text-center"
            style={{ border: "1px solid hsl(38 88% 55% / .3)", background: "hsl(38 88% 55% / .1)" }}>
            <strong style={{ color: "hsl(38 88% 35%)" }}>💡 Luxury Tip:</strong> For the best luxury hotel experience in Murree, book during spring or autumn for perfect weather and premium availability.
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------- 7. Booking CTA ----------------------------- */
function BookingCTA() {
  return (
    <Section className="murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80" speed={0.35} opacity={0.18} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-6xl">
                Ready for <span className="murree-text-gold">Luxury in Murree?</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: "hsl(40 38% 97% / .85)" }}>
                Book your perfect 5 star hotel today and experience the ultimate luxury in the Queen of Hills
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="tel:+923045679000" className="murree-grad-gold murree-shadow-gold rounded-full px-8 py-4 font-semibold transition hover:scale-105" style={{ color: "hsl(165 60% 18%)" }}>
                  Call to Book
                </a>
                <a href="mailto:info@himalayavillas.com" className="rounded-full px-8 py-4 font-semibold backdrop-blur-md transition"
                  style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}>
                  Email Inquiry
                </a>
              </div>
            </Reveal>
            <Reveal delay={450}>
              <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6">
                {[{ v: "50+", l: "5-Star Hotels" }, { v: "100K+", l: "Happy Guests" }, { v: "24/7", l: "Luxury Service" }].map((s) => (
                  <div key={s.l} className="rounded-2xl p-6 backdrop-blur-md"
                    style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                    <p className="text-4xl font-bold md:text-5xl" style={{ color: "hsl(42 95% 75%)" }}>{s.v}</p>
                    <p className="mt-1 text-sm uppercase tracking-widest" style={{ color: "hsl(40 38% 97% / .75)" }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 8. Contact ----------------------------- */
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
        <SectionHeader kicker="Reach us" title="Contact for Luxury Bookings" sub="Have questions? We're here to help you plan your perfect luxury stay in Murree" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="murree-card murree-shadow-lux h-full p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Contact Information</h3>
              <div className="space-y-5">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="murree-grad-emerald flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(40 38% 97%)" }}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="murree-muted text-sm uppercase tracking-widest">{c.label}</p>
                      <p className="font-semibold" style={{ color: "hsl(165 60% 18%)" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="murree-card murree-shadow-lux h-full p-8">
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
            <h3 className="murree-text-gold text-2xl font-bold">5 Star Hotels Murree</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Your premier destination for luxury accommodations in Murree, Pakistan - Queen of Hills
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["About Murree", "5 Star Hotels", "Luxury Resorts", "Special Offers"] },
            { h: "Services", items: ["Hotel Booking", "Concierge", "Travel Guide", "Customer Support"] },
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
              <Wifi className="h-4 w-4" /> Free WiFi at all luxury hotels
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-sm" style={{ borderTop: "1px solid hsl(40 38% 97% / .15)", color: "hsl(40 38% 97% / .6)" }}>
          © {new Date().getFullYear()} 5 Star Hotels Murree. All rights reserved. | Luxury Hotel in Murree Pakistan
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Section CTA ----------------------------- */
function SectionCTA() {
  return (
    <div className="py-8 md:py-12 px-6">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl murree-shadow-lux" style={{ background: "hsl(165 60% 18%)", color: "hsl(40 38% 97%)" }}>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full" style={{ background: "hsl(165 55% 25%)", opacity: 0.5, filter: "blur(40px)" }} />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full" style={{ background: "hsl(38 88% 55%)", opacity: 0.15, filter: "blur(40px)" }} />
            
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-10 lg:p-12">
              <div className="text-center md:text-left max-w-xl">
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">Ready to secure your luxury stay?</h3>
                <p className="text-base" style={{ color: "hsl(40 38% 97% / 0.85)" }}>
                  Speak directly with our concierge team to customize your 5-star experience.
                </p>
              </div>
              
              <div className="flex shrink-0 flex-col gap-3 w-full sm:flex-row sm:w-auto">
                <a
                  href={MURREE_5STAR_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full murree-grad-gold px-6 py-3 font-bold text-base transition-transform hover:scale-105 murree-shadow-gold w-full sm:w-auto"
                  style={{ color: "hsl(165 60% 18%)" }}
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
                <a
                  href="tel:+923045679000"
                  className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-base transition hover:bg-white/10 w-full sm:w-auto"
                  style={{ border: "2px solid hsl(38 88% 55%)", color: "hsl(38 88% 55%)" }}
                >
                  <Phone className="h-5 w-5" />
                  Call Now
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
export default function Index() {
  useEffect(() => {
    document.title = "5 Star Hotels in Murree | Luxury Hotel in Murree Pakistan | Five Star Hotel Murree";
  }, []);
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="murree-page">
        <HeroSlider />
        <WhyChoose />
        <SectionCTA />
        <FeaturedHotels />
        <SectionCTA />
        <Amenities />
        <SectionCTA />
        <Testimonials />
        <SectionCTA />
        <Pricing />
        <SectionCTA />
        <BestTime />
        <SectionCTA />
        <BookingCTA />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
