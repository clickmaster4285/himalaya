"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Head from "next/head";
import {
  Mountain, Sparkles, Home, Star, Utensils, Briefcase, Clock,
  Phone, Mail, MapPin, ChevronLeft, ChevronRight, Check,
  Sun, Snowflake, Flower2, Facebook, Twitter, Linkedin, ArrowDown, Wifi, Users, Heart, Calendar,
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
      <div className="relative z-10 flex h-full items-center px-6" style={{ color: "hsl(40 38% 97%)" }}>
        <div className="w-full lg:w-1/2">
          <Reveal>
            <span className="mb-4 inline-block rounded-full px-5 py-2 text-sm font-medium uppercase tracking-widest backdrop-blur-md"
              style={{ border: "1px solid hsl(38 88% 55% / .4)", background: "hsl(38 88% 55% / .1)", color: "hsl(42 95% 65%)" }}>
              Bhurban · Murree · Pakistan
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-6xl font-bold leading-tight md:text-8xl">
              <span className="bh-text-gold">Hotels in Bhurban</span>
              <br />
              <span className="text-5xl md:text-7xl">Discover Himalaya Premium Villas</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-2xl font-light italic md:text-3xl" style={{ color: "hsl(42 95% 75%)" }}>
              Not just a stay — a private luxury estate nestled in the heart of the Himalayan foothills. Welcome to Bhurban's most exclusive retreat.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "hsl(40 38% 97% / .85)" }}>
              Forget ordinary hotels. Himalaya Premium Villas offers something Bhurban has never seen before — a fully private luxury estate where every detail is designed around you.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="bh-grad-gold bh-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
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
        
        {/* CTA Form on Right Side */}
        <div className="hidden lg:block lg:w-1/3">
          <Reveal delay={800}>
            <div className="bg-white/95 backdrop-blur-lg rounded-lg shadow-lg p-12">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Your full name"
                    className="w-full px-4 py-6 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-6 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="+92 300 0000000"
                    className="w-full px-4 py-6 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">Check-in Date</label>
                    <input
                      type="date"
                      id="checkInDate"
                      className="px-4 py-6 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOutDate" className="block text-gray-700 text-sm font-bold mb-2">Check-out Date</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      className="w-full px-4 py-6 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="numberOfGuests" className="block text-gray-700 text-sm font-bold mb-2">Number of Guests</label>
                  <select
                    id="numberOfGuests"
                    className="w-full px-4 py-6 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-6 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white w-full rounded-lg px-4 py-6 text-lg font-semibold transition-transform hover:scale-105 shadow-md"
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

/* ----------------------------- 1. Introduction ----------------------------- */
function Introduction() {
  return (
    <Section id="introduction" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80" speed={0.2} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-5xl mb-6 text-center" style={{ color: "hsl(165 60% 18%)" }}>
                Looking for the Best Hotels in Bhurban? <span className="bh-text-emerald">Think Beyond a Hotel.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="prose prose-lg max-w-none" style={{ color: "hsl(165 12% 38%)" }}>
                <p className="mb-6 text-lg leading-relaxed">
                  Bhurban has long been one of Pakistan's most beloved mountain escapes — a place where the air is crisp, the pine forests stretch endlessly, and the Himalayan peaks seem close enough to touch. Every year, thousands of travellers arrive searching for the perfect stay: somewhere beautiful, somewhere peaceful, somewhere that actually matches the grandeur of the landscape around it.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  But here's the truth that most hotels in Bhurban won't tell you: a standard hotel room — no matter how nicely decorated — was never designed to give you the Bhurban experience you actually came for. Shared lobbies fill up. Corridors echo with strangers. Dining rooms operate on fixed schedules. And the moment you step out of your room, the privacy you were hoping for disappears.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  This is exactly why Himalaya Premium Villas was created.
                </p>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 my-8 bh-shadow-lux">
                  <p className="text-xl font-semibold text-center mb-4" style={{ color: "hsl(165 60% 18%)" }}>
                    Not a hotel. Not a resort. A fully private luxury estate — set high in the Himalayan foothills of Bhurban, Murree — built for guests who know what they want and refuse to compromise on it.
                  </p>
                  <p className="text-lg text-center" style={{ color: "hsl(165 12% 38%)" }}>
                    Here, the entire estate is yours. From the moment you arrive to the moment you leave, every space, every amenity, and every service exists for you and your guests alone. No check-in queues. No shared facilities. No strangers. Just pure, uninterrupted luxury in one of Pakistan's most breathtaking natural settings.
                  </p>
                </div>
                <p className="text-lg leading-relaxed">
                  Whether you are planning a family retreat, a romantic escape, a destination wedding, or a high-level corporate gathering, Himalaya Premium Villas redefines what a stay in Bhurban can truly feel like.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 2. Why We Stand Apart ----------------------------- */
function WhyStandApart() {
  const features = [
    { 
      icon: Home, 
      title: "A Private Estate — Not a Hotel", 
      desc: "We operate with limited monthly bookings so that every guest receives the full estate exclusively. No shared spaces, no strangers, no noise from adjacent rooms. When you book, the entire estate is yours."
    },
    { 
      icon: Mountain, 
      title: "Panoramic Himalayan Views", 
      desc: "Every window, terrace, and outdoor space at Himalaya Premium Villas has been positioned to frame the most spectacular Himalayan vistas. Wake up every morning to a view that reminds you why you came to Bhurban in the first place."
    },
    { 
      icon: Utensils, 
      title: "Curated In-Villa Dining", 
      desc: "Forget fixed menus and restaurant queues. Dining at Himalaya Premium Villas is a bespoke experience — from intimate candlelit in-villa meals to open-air barbecue evenings under the mountain sky, every meal is crafted around your preferences and schedule."
    },
    { 
      icon: Heart, 
      title: "Destination Weddings & Corporate Retreats", 
      desc: "Dreaming of a royal destination wedding in Bhurban? Planning an executive retreat away from the city? Himalaya Premium Villas provides a breathtaking backdrop, world-class event infrastructure, and a dedicated team committed to making every occasion flawless and unforgettable."
    },
    { 
      icon: Sparkles, 
      title: "Absolute Privacy, Always", 
      desc: "Privacy is not an upgrade at Himalaya Premium Villas — it is the foundation. No lobbies. No shared pools. No random guests wandering past. From arrival to departure, the entire estate belongs to you and those you choose to bring."
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
          title={<>Why Himalaya Premium Villas <span className="bh-text-emerald">Stands Above</span> Every Hotel in Bhurban</>}
          sub="There are places to stay in Bhurban, and then there is Himalaya Premium Villas. The difference is not just in the quality of the rooms — it is in the entire philosophy of how a stay should feel." 
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
    }
  ];

  return (
    <Section id="ideal-for" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80" speed={0.25} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Perfect For" 
            title={<>Who Is Himalaya Premium Villas <span className="bh-text-emerald">Perfect For?</span></>}
            sub="Himalaya Premium Villas is crafted for guests who value quality over quantity — those who know the difference between a stay and an experience." 
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
      <ParallaxBg src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80" speed={0.3} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Estate Features" 
            title={<>Inside <span className="bh-text-gold">Himalaya Premium Villas</span></>}
            sub="Every detail of this estate has been thoughtfully curated to deliver an experience that no hotel in Bhurban can match." 
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

/* ----------------------------- 5. Bhurban Destination ----------------------------- */
function BhurbanDestination() {
  const seasons = [
    { 
      icon: Sun, 
      title: "Summer", 
      when: "May – August", 
      desc: "Cool, refreshing weather — perfect for outdoor gatherings and long estate stays",
      grad: "linear-gradient(135deg,hsl(38 95% 55%),hsl(20 90% 55%))"
    },
    { 
      icon: Flower2, 
      title: "Autumn", 
      when: "September – November", 
      desc: "Golden foliage and peaceful, crowd-free ambiance",
      grad: "linear-gradient(135deg,hsl(330 80% 65%),hsl(350 75% 55%))"
    },
    { 
      icon: Snowflake, 
      title: "Winter", 
      when: "December – February", 
      desc: "Snowfall transforms Bhurban into a magical winter escape",
      grad: "linear-gradient(135deg,hsl(200 90% 60%),hsl(220 80% 50%))"
    },
    { 
      icon: Flower2, 
      title: "Spring", 
      when: "March – April", 
      desc: "Blooming landscapes and crisp mountain air",
      grad: "linear-gradient(135deg,hsl(120 70% 55%),hsl(140 65% 45%))"
    }
  ];

  return (
    <Section id="bhurban-destination" style={{ background: "hsl(40 40% 92%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" speed={0.3} opacity={0.08} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="Location" 
            title={<>Why Bhurban Is Pakistan's <span className="bh-text-emerald">Premier Mountain Destination</span></>}
            sub="Bhurban, nestled in the Murree Hills at over 7,000 feet, is one of Pakistan's most cherished mountain retreats — known for its lush pine forests, cool climate, and stunning Himalayan vistas. Whatever the season, Bhurban offers an unmatched natural setting, and Himalaya Premium Villas puts you right at the heart of it." 
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
      <ParallaxBg src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80" speed={0.35} opacity={0.18} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-6xl">
                Ready to Experience the <span className="bh-text-gold">Finest Stay in Bhurban?</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-3xl text-lg" style={{ color: "hsl(40 38% 97% / .85)" }}>
                Forget ordinary hotels. Himalaya Premium Villas offers something Bhurban has never seen before — a fully private luxury estate where every detail is designed around you. Limited bookings are available each month. Secure your exclusive stay before it's gone.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="#contact" className="bh-grad-gold bh-shadow-gold rounded-full px-8 py-4 font-semibold transition hover:scale-105" style={{ color: "hsl(165 60% 18%)" }}>
                  Reserve Your Stay Now
                </a>
                <a href="#contact" className="rounded-full px-8 py-4 font-semibold backdrop-blur-md transition"
                  style={{ border: "2px solid hsl(40 38% 97% / .4)", background: "hsl(40 38% 97% / .1)", color: "hsl(40 38% 97%)" }}>
                  Contact Us
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
          <SectionHeader kicker="Rates" title="Hotel Pricing in Bhurban" sub="Transparent pricing for all categories of hotels" />
          <Reveal>
            <div className="bh-card bh-border bh-shadow-lux overflow-hidden">
              <table className="w-full">
                <thead className="bh-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
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
                      <td className="bh-muted hidden p-5 md:table-cell">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="bh-muted mt-6 text-center text-sm italic">
            *Prices vary depending on season, weekends, and holidays. Contact hotels for special packages and discounts.
          </p>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 7. FAQ ----------------------------- */
function FAQ() {
  const faqs = [
    {
      q: "What makes Himalaya Premium Villas different from other hotels in Bhurban?",
      a: "Himalaya Premium Villas is not a hotel — it is a fully private luxury estate in Bhurban, the most prestigious enclave of the Murree Hills. Unlike any hotel in Bhurban, the entire estate is reserved exclusively for one booking at a time, ensuring complete privacy, bespoke service, and a level of luxury that shared hotel environments simply cannot offer."
    },
    {
      q: "Where exactly is Himalaya Premium Villas located?",
      a: "The estate is located in Bhurban, Murree, Pakistan — approximately 50 kilometres from Islamabad. Bhurban is widely regarded as the most exclusive and scenic enclave within the greater Murree Hills region."
    },
    {
      q: "Is Himalaya Premium Villas suitable for destination weddings?",
      a: "Absolutely. The estate is one of the most sought-after destination wedding venues in the Bhurban region. With panoramic Himalayan views, dedicated event infrastructure, and a full planning and concierge team, it is designed to host extraordinary weddings and celebrations."
    },
    {
      q: "What is the best time to visit Bhurban?",
      a: "The Bhurban region is beautiful year-round. Summer (May–August) offers cool weather and lush greenery; winter (December–February) brings snowfall and magical landscapes; autumn and spring offer quieter, equally stunning experiences. Himalaya Premium Villas is available for exclusive bookings across all seasons."
    },
    {
      q: "Can corporate groups book Himalaya Premium Villas for retreats?",
      a: "Yes. The estate is fully equipped to host executive corporate retreats, strategy sessions, and leadership off-sites. With high-speed connectivity, private meeting spaces, bespoke catering, and an inspiring natural environment, it offers a setting that no hotel conference room in Bhurban can match."
    }
  ];

  return (
    <Section id="faq" style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
                kicker="Frequently Asked Questions" 
                title={<>Hotels in Bhurban — <span className="bh-text-emerald">FAQ</span></>}
                sub="Get answers to common questions about Himalaya Premium Villas and luxury accommodation in Bhurban" 
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
            <h3 className="bh-text-gold text-2xl font-bold">Himalaya Premium Villas</h3>
            <p className="mt-3 text-sm" style={{ color: "hsl(40 38% 97% / .7)" }}>
              Not just a stay — a private luxury estate nestled in the heart of the Himalayan foothills. Experience Bhurban's most exclusive retreat.
            </p>
          </div>
          {[
            { h: "Quick Links", items: ["About Himalaya Premium Villas", "Private Estate Experience", "Destination Weddings", "Corporate Retreats"] },
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
              <p>📞 +92 304 567 9000</p>
              <p>📧 info@himalayavillas.com</p>
              <p>📍 Bhurban, Murree, Pakistan</p>
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
          © {new Date().getFullYear()} Himalaya Premium Villas. All rights reserved. | Private Luxury Estate in Bhurban | Hotels in Bhurban
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function Index() {
  return (
    <>
      <Head>
        <title>Hotels in Bhurban — Himalaya Premium Villas | Private Luxury Estate</title>
        <meta name="description" content="Looking for the best hotels in Bhurban? Discover Himalaya Premium Villas — a private luxury estate offering exclusive stays, destination weddings, and corporate retreats in the Himalayan foothills of Murree." />
        <meta name="keywords" content="Hotels in Bhurban" />
        <meta property="og:title" content="Hotels in Bhurban — Himalaya Premium Villas | Private Luxury Estate" />
        <meta property="og:description" content="Looking for the best hotels in Bhurban? Discover Himalaya Premium Villas — a private luxury estate offering exclusive stays, destination weddings, and corporate retreats in the Himalayan foothills of Murree." />
        <meta property="og:url" content="/hotels-in-bhurban" />
      </Head>
      <style>{PAGE_STYLES}</style>
      <main className="bh-page">
        <HeroSlider />
        <Introduction />
        <WhyStandApart />
        <IdealFor />
        <TheEstate />
        <BhurbanDestination />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
