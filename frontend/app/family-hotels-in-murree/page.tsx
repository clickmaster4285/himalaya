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
   FAMILY HOTELS IN MURREE - Himalaya Premium Villas
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

/* ----------------------------- Hero Section ----------------------------- */
function Hero() {
  const scrollY = useScrollY();
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80" 
          alt="" 
          className="h-full w-full object-cover family-murree-ken"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
        <div className="absolute inset-0 family-murree-grad-hero" />
      </div>

      <div className="relative z-10 flex h-full items-center px-6" style={{ color: "hsl(40 38% 97%)" }}>
        <div className="w-full lg:w-1/2">
          <Reveal>
            <h1 className="text-5xl font-bold leading-tight md:text-8xl mb-6">
              Family Hotels in <span className="family-murree-text-gold">Murree</span>
            </h1>
            <h2 className="text-3xl font-light italic md:text-4xl mb-4" style={{ color: "hsl(42 95% 75%)" }}>
              Himalaya Premium Villas, Where Families Belong
            </h2>
          </Reveal>
          
          <Reveal delay={300}>
            <p className="mx-auto mt-6 max-w-3xl text-xl md:text-2xl font-light" style={{ color: "hsl(40 38% 97% / .9)" }}>
              A private luxury estate in the Murree Hills — exclusively yours, completely private, and designed to give your family the mountain escape they truly deserve.
            </p>
          </Reveal>
          
          <Reveal delay={450}>
            <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl italic" style={{ color: "hsl(42 95% 75%)" }}>
              No shared spaces. No strangers. Just your family, the Himalayan views, and memories that last a lifetime.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button className="family-murree-grad-gold family-murree-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
                style={{ color: "hsl(165 60% 18%)" }}>
                Book Your Family Estate
              </button>
              <button className="border-2 border-white/20 backdrop-blur-md rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
                style={{ color: "hsl(40 38% 97%)" }}>
                Explore Family Stays
              </button>
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

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1" style={{ color: "hsl(40 38% 97% / .7)" }}>
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 family-murree-scroll-ind" />
      </div>
    </section>
  );
}

function ParallaxBg({ src, speed = 0.3, opacity = 0.15 }: { src: string; speed?: number; opacity?: number }) {
  const y = useScrollY();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${src})`, transform: `translateY(${y * speed}px)`, opacity, zIndex: 0 }} />
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
      <div className="mx-auto mb-16 max-w-4xl text-center">
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

/* ----------------------------- Introduction Section ----------------------------- */
function Introduction() {
  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="SEO FOUNDATION" 
          title="Looking for the Best Family Hotels in Murree? Your Family Deserves More Than a Hotel." 
          sub="Every family that travels to Murree carries the same hope: a few days — or a week — where everyone is together, relaxed, and genuinely happy."
        />
        <Reveal>
          <div className="family-murree-card family-murree-shadow-lux p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: "hsl(165 35% 12%)" }}>
                Where the kids are excited, the parents are at peace, and the setting is beautiful enough to make the whole trip feel special. That is the promise of a family holiday in the Murree Hills.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: "hsl(165 35% 12%)" }}>
                But here is what most family hotels in Murree cannot tell you: the experience of sharing a hotel with hundreds of other guests — navigating busy corridors, waiting for the elevator, competing for space in a crowded restaurant, managing children in shared pools surrounded by strangers — quietly chips away at exactly the kind of peace you came to find.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: "hsl(165 35% 12%)" }}>
                Families deserve better. And Himalaya Premium Villas was built to deliver it.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: "hsl(165 35% 12%)" }}>
                Located in Bhurban — the most prestigious and scenic enclave within the greater Murree Hills region — Himalaya Premium Villas is not a family hotel. It is a private luxury estate, reserved exclusively for one family at a time. When you book, the entire property is yours. Every bedroom, every living space, every terrace, every outdoor area — all of it, shared only with the people you brought.
              </p>
              
              <p className="text-xl md:text-2xl font-semibold text-center mt-8 family-murree-text-emerald">
                For families who want their Murree trip to be truly unforgettable, this is where the search ends.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------- 2. Why Perfect for Families ----------------------------- */
function WhyPerfectForFamilies() {
  const features = [
    {
      icon: Home,
      title: "The Entire Estate — Just Your Family",
      description: "No other guests. No shared corridors or lobbies. No strangers by the pool. When you book Himalaya Premium Villas, the full estate belongs exclusively to your family."
    },
    {
      icon: Bed,
      title: "Multiple Bedrooms for the Whole Family",
      description: "Say goodbye to cramped hotel rooms and expensive connecting room setups. The estate features multiple spacious, elegantly furnished bedrooms — enough space for grandparents, parents, and children alike."
    },
    {
      icon: Utensils,
      title: "Eat Together, Your Way",
      description: "Families do not eat on hotel restaurant schedules. At Himalaya Premium Villas, the fully equipped private kitchen and bespoke in-villa dining mean your family eats what you want, when you want."
    },
    {
      icon: Mountain,
      title: "Himalayan Views the Kids Will Never Forget",
      description: "Children who grow up seeing the Himalayas from their breakfast table carry that with them forever. The estate's panoramic views are a living backdrop to every family moment."
    },
    {
      icon: TreePine,
      title: "Private Outdoor Spaces to Roam",
      description: "Let the children run, explore, and play freely across the estate's landscaped private grounds — no traffic, no crowded hotel gardens, no strangers."
    },
    {
      icon: Clock,
      title: "Your Schedule, Not the Hotel's",
      description: "Checkout times, restaurant hours, pool schedules — family hotels in Murree run on their timetable. At Himalaya Premium Villas, your family sets the pace."
    }
  ];

  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
          kicker="FAMILY PERFECTION" 
          title="Why Himalaya Premium Villas is the Ultimate Family Stay in Murree" 
          sub="Family travel has unique demands — space, safety, flexibility, and the freedom to move at your own pace" 
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, k) => (
            <Reveal key={k} delay={k * 100}>
              <div className="family-murree-card family-murree-shadow-lux group h-full p-6 transition hover:-translate-y-2">
                <div className="family-murree-grad-emerald mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ color: "hsl(40 38% 97%)" }}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{feature.title}</h3>
                <p className="family-murree-muted leading-relaxed">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 3. Family Moments ----------------------------- */
function FamilyMoments() {
  const moments = [
    {
      title: "Morning Breakfasts with a View",
      description: "The whole family gathered around the table, hot parathas in front of you, and the entire Himalayan range stretching across the horizon. No dining hall buzz. No other tables. Just your family and that view.",
      icon: Coffee
    },
    {
      title: "Evening Barbecues Under the Stars",
      description: "As the Murree Hills cool down and the stars come out, your family gathers on the private terrace for an outdoor barbecue. No hotel buffet can replicate the warmth of a private evening like this.",
      icon: Sparkles
    },
    {
      title: "Children Playing Freely Outdoors",
      description: "Kids running across the private grounds, exploring the gardens, breathing mountain air — without parents worrying about strangers or traffic. The kind of freedom children deserve.",
      icon: Baby
    },
    {
      title: "Family Gatherings in Grand Living Spaces",
      description: "Extended families — grandparents, uncles, aunties, cousins — all together in one grand private space, with enough room for everyone. No hotel lounge can hold your whole family the way this estate can.",
      icon: Users
    },
    {
      title: "Snow Days in Winter",
      description: "When Bhurban gets its winter snowfall, the estate transforms. Children stepping out to their first snowfall, families huddled by the fireplace — moments that become family stories told for years.",
      icon: Snowflake
    },
    {
      title: "Multigenerational Milestones",
      description: "Birthdays, anniversaries, Eid celebrations, family reunions — the estate is the perfect setting for multigenerational milestones that deserve more than a hotel function room can offer.",
      icon: Gift
    }
  ];

  return (
    <Section>
      <ParallaxBg src="https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80" speed={0.3} opacity={0.1} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="UNFORGETTABLE MEMORIES" 
            title="The Family Moments That Only Happen Here" 
            sub="Some experiences are only possible when the space around you is truly your own" 
          />
          <div className="grid gap-8 md:grid-cols-2">
            {moments.map((moment, k) => (
              <Reveal key={k} delay={k * 150}>
                <div className="family-murree-card family-murree-shadow-lux group h-full p-8 transition hover:-translate-y-2">
                  <div className="flex items-start gap-4">
                    <div className="family-murree-grad-gold flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ color: "hsl(165 60% 18%)" }}>
                      <moment.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-3 text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{moment.title}</h3>
                      <p className="family-murree-muted leading-relaxed">{moment.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 4. Estate Facilities ----------------------------- */
function EstateFacilities() {
  const facilities = [
    "Multiple luxuriously furnished bedrooms — spacious enough for large and extended families",
    "Grand family living and dining areas with generous seating for everyone together",
    "Fully equipped private kitchen — cook family meals or arrange custom in-villa catering",
    "Expansive private outdoor grounds — safe, open, and beautifully landscaped for children to enjoy",
    "Panoramic terraces with unobstructed Himalayan and Murree Hills views",
    "Secured private parking within the estate — no parking hassles in busy Murree",
    "High-speed Wi-Fi throughout — because even on holiday, families need to stay connected",
    "24/7 dedicated concierge team — always available to cater to your family's needs",
    "Full event setup capability for family celebrations, milestones, and gatherings"
  ];

  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
          kicker="COMPLETE FACILITIES" 
          title="Everything Your Family Needs — All in One Private Estate" 
          sub="Himalaya Premium Villas provides every facility a family could need — thoughtfully designed, spaciously laid out, and entirely private" 
        />
        <Reveal>
          <div className="family-murree-card family-murree-shadow-lux p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {facilities.map((facility, k) => (
                <div key={k} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(165 55% 32%)" }} />
                  <p className="text-base leading-relaxed">{facility}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "hsl(165 15% 86%)" }}>
              <p className="text-center text-lg font-medium" style={{ color: "hsl(165 60% 18%)" }}>
                Whether your family is five people or fifty, Himalaya Premium Villas scales to your needs — providing the space, the privacy, and the service that turns a good trip into an extraordinary one.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------- 5. Couples Section ----------------------------- */
function CouplesSection() {
  return (
    <Section className="family-murree-grad-romantic" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <SectionHeader 
            kicker="ROMANTIC ESCAPES" 
            title="The Best Hotel in Murree for Couples — A Private Estate Just for Two" 
            sub="Himalaya Premium Villas is equally extraordinary for couples — whether you are newlyweds on your honeymoon, celebrating an anniversary, or simply carving out time together" 
            light 
          />
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Most hotels marketed as romantic in Murree offer a decorated room, a candlelit dinner in a shared restaurant, and a view that a hundred other guests are looking at simultaneously. That is not intimacy. That is a stage set for romance, not the real thing.
                </p>
                <p className="text-lg leading-relaxed">
                  At Himalaya Premium Villas, a couple's stay means the entire estate is yours. A candlelit dinner on a private terrace overlooking the Himalayas. Morning tea in total silence, with nothing but mountain air and birdsong around you. Evenings spent exactly as you choose — no noise from neighbouring rooms, no hotel schedules to follow, no world intruding on yours.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  For couples who want a Murree stay that is genuinely romantic — not just marketed as such — there is no better address in the Murree Hills.
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl p-6 backdrop-blur-md" style={{ background: "hsl(40 38% 97% / .1)", border: "1px solid hsl(40 38% 97% / .2)" }}>
                    <h4 className="mb-2 text-xl font-bold">Honeymoon in the Himalayas</h4>
                    <p className="text-base opacity-90">Begin your marriage with complete privacy, panoramic mountain views, and bespoke experiences curated entirely around you and your partner.</p>
                  </div>
                  <div className="rounded-2xl p-6 backdrop-blur-md" style={{ background: "hsl(40 38% 97% / .1)", border: "1px solid hsl(40 38% 97% / .2)" }}>
                    <h4 className="mb-2 text-xl font-bold">Bespoke Romantic Dining</h4>
                    <p className="text-base opacity-90">Private candlelit dinners on the terrace, custom menus, and an evening setting that no restaurant in Murree can replicate.</p>
                  </div>
                  <div className="rounded-2xl p-6 backdrop-blur-md" style={{ background: "hsl(40 38% 97% / .1)", border: "1px solid hsl(40 38% 97% / .2)" }}>
                    <h4 className="mb-2 text-xl font-bold">Anniversary & Special Celebrations</h4>
                    <p className="text-base opacity-90">Mark the milestones that matter with a stay that matches their significance — a private estate, Himalayan views, and a team dedicated to making your celebration absolutely perfect.</p>
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

/* ----------------------------- 6. Location Section ----------------------------- */
function LocationSection() {
  const seasons = [
    {
      icon: Sun,
      name: "Summer (May – August)",
      description: "Peak family season — cool weather, lush greenery, and perfect conditions for children to enjoy the outdoors"
    },
    {
      icon: Flower2,
      name: "Autumn (September – November)",
      description: "Golden foliage, peaceful atmosphere — ideal for families seeking a quieter, more relaxed escape"
    },
    {
      icon: Snowflake,
      name: "Winter (December – February)",
      description: "Snowfall in Bhurban creates a magical winter wonderland — a once-in-a-lifetime experience for children seeing snow for the first time"
    },
    {
      icon: Wind,
      name: "Spring (March – April)",
      description: "Blooming wildflowers and fresh mountain air — one of the most beautiful and underrated seasons in the Murree Hills"
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader 
          kicker="PRESTIGIOUS LOCATION" 
          title="Bhurban, Murree — Pakistan's Most Prestigious Mountain Address for Families" 
          sub="Within the wider Murree Hills region, Bhurban stands apart. Quieter than Murree's busy main ridge, more elevated, and far more exclusive" 
        />
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Located just 50 kilometres from Islamabad and easily accessible from Lahore and Rawalpindi, Bhurban offers the full beauty of the Murree Hills without the crowds and congestion that come with the town centre. The Himalayan views are wider. The pine forests are denser. The air is cooler and cleaner. And at Himalaya Premium Villas, you experience all of it from the privacy of your own estate.
              </p>
              <div className="family-murree-card family-murree-shadow-lux p-6">
                <h4 className="mb-4 text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Why Bhurban is Perfect</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(165 55% 32%)" }} />
                    <span>More elevated than Murree town centre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(165 55% 32%)" }} />
                    <span>Quieter and more exclusive atmosphere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(165 55% 32%)" }} />
                    <span>Better Himalayan views and cleaner air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(165 55% 32%)" }} />
                    <span>50km from Islamabad with easy access</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-6">
              <h4 className="text-2xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>Best Time to Visit</h4>
              <div className="space-y-4">
                {seasons.map((season, k) => (
                  <div key={k} className="family-murree-card family-murree-border p-4 transition hover:-translate-y-1">
                    <div className="flex items-start gap-3">
                      <div className="family-murree-grad-emerald flex h-10 w-10 items-center justify-center rounded-xl" style={{ color: "hsl(40 38% 97%)" }}>
                        <season.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="mb-1 font-semibold" style={{ color: "hsl(165 60% 18%)" }}>{season.name}</h5>
                        <p className="family-murree-muted text-sm">{season.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 7. FAQ Section ----------------------------- */
function FAQSection() {
  const faqs = [
    {
      question: "What is the best family hotel in Murree?",
      answer: "For families who want genuine privacy, space, and luxury, Himalaya Premium Villas in Bhurban is the finest option in the Murree Hills region. Unlike standard family hotels in Murree, the entire estate is reserved exclusively for one family at a time — providing multiple bedrooms, private outdoor spaces, bespoke dining, and complete privacy that no hotel can match."
    },
    {
      question: "Is Himalaya Premium Villas suitable for large families and extended family groups?",
      answer: "Absolutely. The estate is designed to comfortably accommodate large families and extended family groups. With multiple bedrooms, grand shared living spaces, a fully equipped private kitchen, and expansive outdoor grounds, Himalaya Premium Villas is the ideal setting for multigenerational family stays and family reunions in Murree."
    },
    {
      question: "Is Himalaya Premium Villas good for couples and honeymoon stays in Murree?",
      answer: "Yes. Himalaya Premium Villas is one of the most romantic and private settings in the Murree Hills — perfect for honeymoons, anniversaries, and couples seeking a truly intimate mountain escape. With the entire estate reserved exclusively for your stay, bespoke dining experiences, and panoramic Himalayan views, it offers a level of romance and privacy that no hotel in Murree can provide."
    },
    {
      question: "Where exactly is Himalaya Premium Villas located in Murree?",
      answer: "Himalaya Premium Villas is located in Bhurban — the most prestigious and scenic enclave within the Murree Hills region of Pakistan. Bhurban is approximately 50 kilometres from Islamabad and is widely regarded as the most exclusive address in the greater Murree area."
    },
    {
      question: "What is the best time for a family trip to Murree?",
      answer: "The Murree Hills are beautiful year-round, but summer (May–August) is most popular season for family trips — offering cool weather and lush mountain greenery. Winter (December–February) is magical for families with children who want to experience snowfall in Bhurban. Spring and autumn offer quieter, equally stunning experiences for families who prefer to avoid peak season crowds."
    },
    {
      question: "Can we celebrate a family event or milestone at Himalaya Premium Villas?",
      answer: "Yes. The estate is fully equipped to host family celebrations — from birthday parties and anniversary dinners to Eid gatherings and family reunions. With a dedicated event setup team, bespoke catering options, and one of the most beautiful natural settings in the Murree Hills, Himalaya Premium Villas turns every family milestone into an extraordinary memory."
    }
  ];

  return (
    <Section style={{ background: "hsl(40 40% 92%)" }}>
      <Container>
        <SectionHeader 
          kicker="FREQUENTLY ASKED QUESTIONS" 
          title="Family Hotels in Murree" 
          sub="Everything you need to know about Himalaya Premium Villas and your family stay in the Murree Hills" 
        />
        <div className="space-y-6">
          {faqs.map((faq, k) => (
            <Reveal key={k} delay={k * 100}>
              <div className="family-murree-card family-murree-shadow-lux p-6">
                <h3 className="mb-3 text-xl font-bold" style={{ color: "hsl(165 60% 18%)" }}>{faq.question}</h3>
                <p className="family-murree-muted leading-relaxed">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- 8. Pricing Section ----------------------------- */
function PricingSection() {
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
            <div className="family-murree-card family-murree-border family-murree-shadow-lux overflow-hidden">
              <table className="w-full">
                <thead className="family-murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
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
                      <td className="family-murree-muted hidden p-5 md:table-cell">{r.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="family-murree-muted mt-6 text-center text-sm italic">
            *Prices vary depending on season, weekends, and holidays. Contact hotels for special packages and discounts.
          </p>
        </Container>
      </div>
    </Section>
  );
}

/* ----------------------------- 9. Final CTA ----------------------------- */
function FinalCTA() {
  return (
    <Section id="contact" className="family-murree-grad-emerald" style={{ color: "hsl(40 38% 97%)" }}>
      <ParallaxBg src="https://images.unsplash.com/photo-1571003123894-1f05e4d68b79?w=1920&q=80" speed={0.25} opacity={0.15} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl font-bold md:text-5xl mb-6">
                Give Your Family the Murree Trip They Will Never Stop Talking About
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Stop settling for hotel rooms when your family deserves an entire private estate. Himalaya Premium Villas offers families something the Murree Hills have never seen before — complete exclusivity, breathtaking Himalayan views, and the kind of space and freedom that transforms a holiday into a memory that stays with your family forever.
              </p>
              <div className="mb-8">
                <p className="text-lg font-medium mb-4">
                  Bookings are strictly limited each month to preserve the exclusivity and quality of every stay. Reserve your family's private estate today.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a 
                  href="tel:+923045679000" 
                  className="family-murree-grad-gold family-murree-shadow-gold rounded-full px-8 py-4 text-base font-semibold transition-transform hover:scale-105 inline-flex items-center gap-2"
                  style={{ color: "hsl(165 60% 18%)" }}
                >
                  <Phone className="h-5 w-5" />
                  +92 304 567 9000
                </a>
                <a 
                  href="mailto:info@himalayavillas.com" 
                  className="rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105 inline-flex items-center gap-2 border-2"
                  style={{ borderColor: "hsl(42 95% 65%)", color: "hsl(42 95% 65%)" }}
                >
                  <Mail className="h-5 w-5" />
                  info@himalayavillas.com
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5" />
                Bhurban, Murree, Pakistan
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
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
      <main className="family-murree-page">
        <Hero />
        <Introduction />
        <WhyPerfectForFamilies />
        <FamilyMoments />
        <EstateFacilities />
        <CouplesSection />
        <LocationSection />
        <FAQSection />
        <PricingSection />
        <FinalCTA />
      </main>
    </>
  );
}
