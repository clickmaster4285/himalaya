"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import {
  Mountain, Sparkles, Home, Star, Utensils, Briefcase, Clock,
  Phone, Mail, MapPin, ChevronLeft, ChevronRight, Check,
  Sun, Snowflake, Flower2, Facebook, Twitter, Linkedin, ArrowDown, Wifi,
} from "lucide-react";

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

.bh-reveal{opacity:0;transform:translateY(40px);transition:opacity .9s ease-out,transform .9s ease-out;}
.bh-reveal.in{opacity:1;transform:translateY(0);}

@keyframes bhKenBurns{0%{transform:scale(1)}100%{transform:scale(1.15)}}
@keyframes bhFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes bhScrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
.bh-ken{animation:bhKenBurns 8s ease-out both;}
.bh-float{animation:bhFloat 6s ease-in-out infinite;}
.bh-scroll-ind{animation:bhScrollDown 1.5s ease-in-out infinite;}

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
    <div ref={ref} className={`bh-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ----------------------------- Data ----------------------------- */
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
  "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1920&q=80",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1920&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=1920&q=80",
];

const HOTELS = [
  { name: "Pearl Continental", tag: "5 STAR", price: "₨60,000+",
    desc: "Ultimate luxury with golf course, spa, and fine dining",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    perks: ["Golf Course", "Spa & Wellness", "Valley Views"] },
  { name: "Hotel One Bhurban", tag: "3 STAR", price: "₨10,000",
    desc: "Modern comfort at affordable prices",
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80",
    perks: ["Free WiFi", "Restaurant", "Family Friendly"] },
  { name: "Luxury Villas", tag: "LUXURY", price: "₨80,000+",
    desc: "Private villas with complete privacy",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
    perks: ["Multiple Bedrooms", "Kitchen Facilities", "Private Parking"] },
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
          <img src={src} alt="" className={`h-full w-full object-cover ${idx === i ? "bh-ken" : ""}`} />
          <div className="absolute inset-0 bh-grad-hero" />
        </div>
      ))}

      {/* Floating background cards */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, k) => (
          <div
            key={k}
            className="absolute rounded-3xl bh-float"
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
            Bhurban · Murree · Pakistan
          </span>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Hotels in <span className="bh-text-gold">Bhurban</span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
            Ultimate Luxury & Mountain Paradise
          </p>
        </Reveal>
        <Reveal delay={450}>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "hsl(40 38% 97% / .85)" }}>
            Discover the most luxurious hotels, resorts, and villas in Bhurban Pakistan. Your perfect mountain getaway awaits.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#hotels" className="bh-grad-gold bh-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{ color: "hsl(165 60% 18%)" }}>
              Explore Luxury Hotels
            </a>
            <a href="#pricing" className="rounded-full px-8 py-4 text-base font-semibold backdrop-blur-md transition"
              style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)" }}>
              View Special Offers
            </a>
          </div>
        </Reveal>

        {/* Feature cards */}
        <Reveal delay={800}>
          <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Star, title: "5-Star Luxury", sub: "Premium resorts & spas" },
              { icon: Sparkles, title: "Modern Comfort", sub: "Contemporary hotels" },
              { icon: Home, title: "Private Villas", sub: "Exclusive stays" },
            ].map((f, k) => (
              <div key={k} className="rounded-2xl p-6 backdrop-blur-xl transition hover:-translate-y-2"
                style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .1)" }}>
                <div className="bh-grad-gold bh-shadow-gold mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(165 60% 18%)" }}>
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

/* ----------------------------- 1. Why Choose ----------------------------- */
function WhyChoose() {
  const items = [
    { icon: Mountain, title: "Stunning Views", desc: "Breathtaking mountain landscapes and pristine natural beauty" },
    { icon: Sparkles, title: "Luxury Living", desc: "Premium accommodations with world-class amenities" },
    { icon: Home, title: "Peaceful Environment", desc: "Escape the crowds and find your perfect retreat" },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80" speed={0.2} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Discover" title={<>Why Choose <span className="bh-text-emerald">Bhurban?</span></>}
            sub="Experience the perfect blend of luxury and nature in Pakistan's premier mountain destination" />
          <div className="grid gap-8 md:grid-cols-3">
            {items.map((it, k) => (
              <Reveal key={k} delay={k * 150}>
                <div className="bh-card bh-shadow-lux group h-full p-8 text-center transition hover:-translate-y-3">
                  <div className="bh-grad-emerald mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:rotate-6" style={{ color: "hsl(40 38% 97%)" }}>
                    <it.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{it.title}</h3>
                  <p className="bh-muted">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 2. Hotels ----------------------------- */
function Hotels() {
  return (
    <Section id="hotels">
      <Container>
        <SectionHeader kicker="Stay" title="Featured Hotels & Resorts" sub="Discover the best accommodations Bhurban has to offer" />
        <div className="grid gap-8 md:grid-cols-3">
          {HOTELS.map((h, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="bh-card bh-shadow-lux group h-full overflow-hidden transition hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={h.img} alt={h.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="p-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="bh-grad-emerald rounded-full px-3 py-1 text-xs font-bold" style={{ color: "hsl(40 38% 97%)" }}>{h.tag}</span>
                    <span className="text-xl font-bold" style={{ color: "hsl(38 88% 35%)" }}>{h.price}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{h.name}</h3>
                  <p className="bh-muted mb-4">{h.desc}</p>
                  <ul className="mb-6 space-y-2">
                    {h.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4" style={{ color: "hsl(165 55% 32%)" }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <button className="bh-grad-emerald w-full rounded-full py-3 font-semibold transition hover:opacity-90" style={{ color: "hsl(40 38% 97%)" }}>
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

/* ----------------------------- 3. Amenities ----------------------------- */
function Amenities() {
  const items = [
    { icon: Sparkles, title: "Spa & Wellness", desc: "Relax and rejuvenate" },
    { icon: Utensils, title: "Fine Dining", desc: "Exquisite culinary experiences" },
    { icon: Briefcase, title: "Conference Rooms", desc: "Business meeting facilities" },
    { icon: Clock, title: "24/7 Service", desc: "Round the clock assistance" },
  ];
  return (
    <Section className="bh-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Facilities" title={<>Premium <span className="bh-text-gold">Amenities</span></>}
            sub="Experience world-class facilities and services" light />
          <div className="grid gap-6 md:grid-cols-4">
            {items.map((it, k) => (
              <Reveal key={k} delay={k * 100}>
                <div className="group h-full rounded-2xl p-6 text-center backdrop-blur-md transition hover:-translate-y-2"
                  style={{ border: "1px solid hsl(40 38% 97% / .15)", background: "hsl(40 38% 97% / .05)" }}>
                  <div className="bh-grad-gold mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ color: "hsl(165 60% 18%)" }}>
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
    { initials: "AK", name: "Ahmed Khan", quote: "Amazing experience at Pearl Continental! The views were breathtaking and the service was exceptional." },
    { initials: "SM", name: "Sara Malik", quote: "Hotel One Bhurban exceeded our expectations. Perfect for families and very affordable!" },
    { initials: "FA", name: "Fahad Ali", quote: "The luxury villa we rented was perfect for our group. Privacy, comfort, and stunning views!" },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Reviews" title="What Our Guests Say" sub="Real experiences from real travelers" />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((t, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="bh-card bh-shadow-lux h-full p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="bh-grad-emerald flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold" style={{ color: "hsl(40 38% 97%)" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-lg font-bold" style={{ color: "hsl(165 60% 18%)" }}>{t.name}</p>
                    <div className="flex gap-1" style={{ color: "hsl(38 88% 55%)" }}>
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="bh-muted italic">"{t.quote}"</p>
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
    { tag: "BUDGET", name: "Budget Hotels", price: "5,000 – 10,000", best: "Solo travelers, backpackers", bg: "hsl(160 60% 92%)", fg: "hsl(160 60% 25%)" },
    { tag: "VALUE", name: "Mid-range Hotels", price: "10,000 – 20,000", best: "Families, couples", bg: "hsl(200 80% 92%)", fg: "hsl(200 80% 30%)" },
    { tag: "LUXURY", name: "Luxury Hotels", price: "25,000 – 60,000+", best: "Honeymoon, business", bg: "hsl(40 90% 90%)", fg: "hsl(38 88% 35%)" },
    { tag: "PREMIUM", name: "Villas", price: "15,000 – 80,000+", best: "Groups, long stays", bg: "hsl(340 80% 94%)", fg: "hsl(340 70% 40%)" },
  ];
  return (
    <Section id="pricing">
      <ParallaxBg src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" speed={0.3} opacity={0.1} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader kicker="Budget" title={<>Transparent <span className="bh-text-gold">Pricing</span></>}
            sub="Find the perfect accommodation within your budget" />
          <Reveal>
            <div className="bh-card bh-border bh-shadow-lux overflow-hidden">
              <table className="w-full">
                <thead className="bh-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
                  <tr>
                    <th className="p-5 text-left text-lg">Category</th>
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
                      <td className="bh-muted hidden p-5 md:table-cell">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="bh-muted mt-6 text-center text-sm italic">
            *Prices vary depending on season, weekends, and holidays
          </p>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 6. Best Time ----------------------------- */
function BestTime() {
  const items = [
    { icon: Sun, title: "Summer", when: "May – August", desc: "Cool weather, peak tourist season", grad: "linear-gradient(135deg,hsl(38 95% 55%),hsl(20 90% 55%))" },
    { icon: Snowflake, title: "Winter", when: "December – February", desc: "Snowfall and romantic vibes", grad: "linear-gradient(135deg,hsl(200 90% 60%),hsl(220 80% 50%))" },
    { icon: Flower2, title: "Spring & Autumn", when: "Mar–Apr · Sep–Nov", desc: "Ideal for peaceful stays", grad: "linear-gradient(135deg,hsl(330 80% 65%),hsl(350 75% 55%))" },
  ];
  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader kicker="Plan" title="Best Time to Visit" sub="Plan your perfect getaway according to seasons" />
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it, k) => (
            <Reveal key={k} delay={k * 150}>
              <div className="bh-card bh-shadow-lux group h-full p-8 text-center transition hover:-translate-y-2">
                <div className="bh-shadow-lux mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full transition group-hover:scale-110"
                  style={{ background: it.grad, color: "white" }}>
                  <it.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{it.title}</h3>
                <p className="mt-2 font-semibold" style={{ color: "hsl(38 88% 35%)" }}>{it.when}</p>
                <p className="bh-muted mt-3">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl p-6 text-center"
            style={{ border: "1px solid hsl(38 88% 55% / .3)", background: "hsl(38 88% 55% / .1)" }}>
            <strong style={{ color: "hsl(38 88% 35%)" }}>💡 Pro Tip:</strong> For the best deals on Bhurban hotels, avoid peak weekends and holidays.
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------- 7. Booking CTA ----------------------------- */
function BookingCTA() {
  return (
    <Section className="bh-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80" speed={0.35} opacity={0.18} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-6xl">
                Ready for Your <span className="bh-text-gold">Bhurban Adventure?</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: "hsl(40 38% 97% / .85)" }}>
                Book your perfect stay today and experience the luxury and beauty of Bhurban
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button className="bh-grad-gold bh-shadow-gold rounded-full px-8 py-4 font-semibold transition hover:scale-105" style={{ color: "hsl(165 60% 18%)" }}>
                  Book Luxury Hotel
                </button>
                <button className="rounded-full px-8 py-4 font-semibold backdrop-blur-md transition"
                  style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}>
                  Reserve Villa
                </button>
              </div>
            </Reveal>
            <Reveal delay={450}>
              <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6">
                {[{ v: "24/7", l: "Support" }, { v: "100+", l: "Properties" }, { v: "50K+", l: "Happy Guests" }].map((s) => (
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
    { icon: MapPin, label: "Location", value: "Bhurban, Murree, Pakistan" },
  ];
  const links = ["About Bhurban", "Travel Guide", "Special Offers", "Cancellation Policy", "Terms & Conditions", "Privacy Policy"];
  return (
    <Section>
      <Container>
        <SectionHeader kicker="Reach us" title="Get in Touch" sub="Have questions? We're here to help you plan your perfect stay" />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="bh-card bh-shadow-lux h-full p-8">
              <h3 className="mb-6 text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Contact Information</h3>
              <div className="space-y-5">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="bh-grad-emerald flex h-12 w-12 items-center justify-center rounded-xl" style={{ color: "hsl(40 38% 97%)" }}>
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="bh-muted text-sm uppercase tracking-widest">{c.label}</p>
                      <p className="font-semibold" style={{ color: "hsl(165 60% 18%)" }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="bh-card bh-shadow-lux h-full p-8">
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
            <h3 className="bh-text-gold text-2xl font-bold">Hotels Bhurban</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Your trusted partner for luxury accommodations in Bhurban, Pakistan
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["About Us", "Hotels", "Villas", "Special Offers"] },
            { h: "Support", items: ["Contact Us", "FAQ", "Booking Policy", "Terms & Conditions"] },
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
              <Wifi className="h-4 w-4" /> Free WiFi at all properties
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-sm" style={{ borderTop: "1px solid hsl(40 38% 97% / .15)", color: "hsl(40 38% 97% / .6)" }}>
          © {new Date().getFullYear()} Hotels Bhurban. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function Index() {
  useEffect(() => {
    document.title = "Hotels in Bhurban – Luxury Resorts & Villas in Bhurban Pakistan";
  }, []);
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="bh-page">
        <HeroSlider />
        <WhyChoose />
        <Hotels />
        <Amenities />
        <Testimonials />
        <Pricing />
        <BestTime />
        <BookingCTA />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
