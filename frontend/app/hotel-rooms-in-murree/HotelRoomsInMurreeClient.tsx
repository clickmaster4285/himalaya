"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Calendar,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
  Snowflake,
  Sun,
  Users,
  Shield,
  Clock,
  CreditCard,
  Eye,
  Car,
  Zap,
  Thermometer,
  Droplets,
  Mail,
} from "lucide-react";
import { submitInquiry } from "@/lib/submit-inquiry-client";
import { SITE_CONTACT, telHref } from "@/lib/site-contact";

const WHATSAPP_PILLAR_URL =
  "https://wa.me/923045679000?utm_source=website&utm_medium=pillar&utm_campaign=hotel_rooms_murree";

const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.hrm-page{
  --bg:40 38% 97%; --fg:165 35% 12%;
  --card:0 0% 100%; --muted:165 12% 38%;
  --primary:165 60% 18%; --primary-fg:40 38% 97%;
  --accent:38 88% 55%; --border:165 15% 86%;
  font-family:'Inter',system-ui,sans-serif;
  color:hsl(var(--fg));
  background:hsl(var(--bg));
  min-height:100vh;
}
.hrm-page h1,.hrm-page h2,.hrm-page h3,.hrm-page h4{font-family:'Playfair Display',Georgia,serif;}
.hrm-page a{color:inherit;}
.hrm-page button{font-family:inherit;cursor:pointer;border:0;}

.hrm-grad-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));}
.hrm-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.hrm-grad-hero{background:linear-gradient(135deg,hsl(165 60% 10% / .92),hsl(165 45% 22% / .75));}
.hrm-text-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.hrm-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.hrm-shadow-gold{box-shadow:0 15px 40px -10px hsl(38 88% 55% / .5);}
.hrm-card{background:hsl(var(--card));border-radius:20px;border:1px solid hsl(var(--border));}
.hrm-muted{color:hsl(var(--muted));}
.hrm-prose p{margin-bottom:1.25rem;line-height:1.75;}
.hrm-prose p:last-child{margin-bottom:0;}
.hrm-prose a{color:hsl(165 60% 22%);text-decoration:underline;text-underline-offset:3px;}
.hrm-prose a:hover{color:hsl(165 60% 14%);}

.hrm-reveal{opacity:0;transform:translateY(32px);transition:opacity .8s ease,transform .8s ease;}
.hrm-reveal.in{opacity:1;transform:translateY(0);}

@keyframes hrmKenBurns{0%{transform:scale(1)}100%{transform:scale(1.12)}}
.hrm-ken{animation:hrmKenBurns 10s ease-out both;}

html{scroll-behavior:smooth;}
`;

const HERO_IMAGES = [
  "/assets/gallery-exterior.jpg",
  "/assets/gallery-balcony.jpg",
  "/assets/gallery-interior.jpg",
  "/assets/gallery-garden.jpg",
] as const;

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  checkInDate: "",
  checkOutDate: "",
  numberOfGuests: "2",
  message: "",
};

const CHECKLIST = [
  {
    icon: Thermometer,
    title: "Heating, specifically",
    text: "Ask what kind — central, gas, or portable electric — and whether it runs all night. This is the single biggest comfort variable from October to March.",
  },
  {
    icon: Droplets,
    title: "Hot water hours",
    text: "Many properties run geysers on schedules. Confirm 24-hour hot water if that matters to you.",
  },
  {
    icon: Zap,
    title: "Backup power",
    text: "Load-shedding reaches Murree. A generator or UPS covering rooms (not just the lobby) separates the professional properties from the rest.",
  },
  {
    icon: Eye,
    title: "The actual view",
    text: "Ask for a current photo taken from the room's window — not the property's marketing gallery. \"Valley view\" is Murree's most elastic phrase.",
  },
  {
    icon: Car,
    title: "Parking",
    text: "On Mall Road, confirm whether parking exists, whether it is on-site, and whether it is charged. In snow season, ask whether the access road is drivable without chains.",
  },
  {
    icon: Bed,
    title: "Bed configuration in writing",
    text: "Especially for family rooms — confirm the number and size of beds on WhatsApp so there is a record.",
  },
  {
    icon: Shield,
    title: "Cancellation terms",
    text: "Weather changes Murree plans. Know the refund policy before paying, and prefer properties that state it in writing.",
  },
  {
    icon: Clock,
    title: "Check-in and check-out times",
    text: "Standard is 2 p.m. / 12 p.m., but early check-in on a weekend is rarely honoured unless agreed in advance.",
  },
  {
    icon: CreditCard,
    title: "Total price including taxes",
    text: "Ask for the final figure with all taxes and service charges. Quoted-versus-billed gaps are a recurring complaint in Murree reviews.",
  },
];

const RATE_ROWS = [
  {
    tier: "Budget guesthouses — Mall Road back streets, Lower Topa",
    offPeak: "PKR 4,000–8,000",
    season: "PKR 8,000–15,000",
    peak: "PKR 15,000–25,000",
  },
  {
    tier: "Mid-range hotels — Jhika Gali, Kuldana, upper Mall Road",
    offPeak: "PKR 10,000–18,000",
    season: "PKR 18,000–30,000",
    peak: "PKR 30,000–50,000",
  },
  {
    tier: "Premium hotels — Bhurban, top Mall Road properties",
    offPeak: "PKR 25,000–45,000",
    season: "PKR 40,000–70,000",
    peak: "PKR 60,000–100,000+",
  },
  {
    tier: "Private luxury villas — Bhurban estates (whole-villa rates)",
    offPeak: "PKR 45,000–80,000",
    season: "PKR 70,000–120,000",
    peak: "PKR 100,000–180,000+",
  },
];

const FAQS = [
  {
    q: "How much does a hotel room cost in Murree per night?",
    a: "In 2026, budget hotel rooms in Murree run PKR 4,000–8,000 on off-peak weekdays, mid-range rooms PKR 10,000–18,000, and premium rooms in Bhurban PKR 25,000–45,000. On peak dates — Eid weekends, snowfall weekends, and summer holidays — these rates rise 60 to 150 percent, with premium rooms crossing PKR 100,000 per night.",
  },
  {
    q: "Which area of Murree is best for booking a hotel room?",
    a: "Mall Road suits travellers who want to walk to the bazaar and food street. Jhika Gali and Kuldana offer newer rooms and easier parking a short drive away. Bhurban, about 9 km from Murree town, is the premium area — quieter, greener, and home to Murree's luxury hotels and private villa estates.",
  },
  {
    q: "Do hotel rooms in Murree have heating?",
    a: "Not uniformly. Premium properties have central or gas heating; many budget and mid-range rooms rely on portable electric heaters supplied on request. Between October and March, confirm the heating type in writing before booking — it is the single biggest comfort difference between rooms at the same price.",
  },
  {
    q: "When are hotel rooms in Murree cheapest?",
    a: "Late September through November and February through mid-May, on weekdays. Rates in these shoulder-season windows run 40–60 percent below summer, and properties are far more open to negotiation on two-night midweek stays.",
  },
  {
    q: "Should I book a Murree hotel room in advance or walk in?",
    a: "Book ahead for any peak date — Eid weeks, summer weekends, and forecast snowfall — ideally two to four weeks in advance. Walk-ins work well midweek in the off-season, when they are also the strongest position for negotiating a lower rate.",
  },
  {
    q: "What is the best hotel room option for a large family in Murree?",
    a: "For groups of six or more, compare multi-room hotel bookings against a whole private villa. Two to three premium hotel rooms on a peak weekend can cost PKR 120,000–200,000 per night while still splitting the family across a shared building; a private villa at a similar total keeps everyone under one roof with private living space.",
  },
  {
    q: "Are there private villas in Murree instead of hotel rooms?",
    a: "Yes — mainly in Bhurban. The area hosts private villa estates alongside its hotels, including single-group estates such as Himalaya Villas, where a booking reserves the entire property and its grounds for one group at a time rather than a room in a shared building.",
  },
  {
    q: "Is it safe to pay a hotel booking advance on WhatsApp in Murree?",
    a: "It is standard practice for Murree's direct-booking market, but protect yourself: get the dates, room, bed configuration, total price, and cancellation terms confirmed in the chat before sending money, pay to a business account where possible, and keep the conversation as your booking record.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Hotel Rooms in Murree: The Complete 2026 Guide to Types, Rates & Booking",
  description:
    "A complete guide to hotel rooms in Murree — room types, realistic rates by area and season, what to verify before booking, and when a private villa makes more sense.",
  author: {
    "@type": "Person",
    name: "Amjad Khan",
    jobTitle: "Travel writer covering the Murree Hills",
  },
  datePublished: "2026-07-01",
  dateModified: "2026-07-23",
  publisher: {
    "@type": "Organization",
    name: "Himalaya Villas & Resorts",
    url: "https://himalayavillas.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://himalayavillas.com/hotel-rooms-in-murree",
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`hrm-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${dark ? "hrm-grad-emerald text-white" : ""}`}
      style={dark ? undefined : { background: "hsl(var(--bg))" }}
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Reveal>
          {eyebrow ? (
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-amber-300" : "text-amber-600"}`}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={`text-3xl font-bold leading-tight md:text-4xl ${dark ? "text-white" : ""}`}
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const id = setInterval(
      () => setSlide((p) => (p + 1) % HERO_IMAGES.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitError("");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const result = await submitInquiry({
      ...form,
      source: "hotel-rooms-in-murree-hero",
    });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitStatus("error");
      setSubmitError(result.error);
      return;
    }
    setSubmitStatus("success");
    setForm(EMPTY_FORM);
  };

  return (
    <section className="relative min-h-[100dvh] w-full lg:min-h-screen">
      {HERO_IMAGES.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === slide ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={src}
            alt="Hotel rooms and mountain views in Murree Hills"
            className={`h-full w-full object-cover ${idx === slide ? "hrm-ken" : ""}`}
          />
          <div className="absolute inset-0 hrm-grad-hero" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col gap-8 px-4 py-10 lg:min-h-screen lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-16">
        <div className="flex-1 text-white">
          <Reveal>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                2026 Guide
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-200">
                Updated July 2026
              </span>
            </div>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-200/90">
              Murree Accommodation
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              <span className="hrm-text-gold">Hotel Rooms in Murree:</span>
              <span className="mt-2 block text-2xl font-semibold text-white/95 sm:text-3xl md:text-4xl">
                The Complete 2026 Guide to Types, Rates &amp; Booking
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Realistic rates, room types that actually mean something, and the
              nine questions every traveller should ask before paying a deposit
              — written for families coming from Islamabad, Lahore, Karachi, and
              overseas.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#rates"
                className="hrm-grad-gold hrm-shadow-gold rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105"
                style={{ color: "hsl(165 60% 18%)" }}
              >
                View 2026 Rates
              </a>
              <a
                href="#checklist"
                className="rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/20"
              >
                Pre-Booking Checklist
              </a>
            </div>
          </Reveal>
        </div>

        <div className="w-full shrink-0 lg:w-[380px] xl:w-[420px]">
          <Reveal delay={450}>
            <div className="hrm-shadow-lux overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md">
              <div className="hrm-grad-emerald px-6 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">
                  Check Availability
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Planning Murree hotel rooms or a private villa?
                </h2>
              </div>
              <div className="p-5 md:p-6">
                {submitStatus === "success" ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center text-sm text-emerald-800">
                    <p className="font-semibold">Thank you — inquiry received!</p>
                    <p className="mt-2">
                      Our team will reply shortly. For urgent bookings, WhatsApp
                      us anytime.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-4 text-sm font-semibold text-emerald-700 underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-3">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-1 block text-xs font-bold text-gray-700"
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        required
                        value={form.fullName}
                        onChange={onChange}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-xs font-bold text-gray-700"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={onChange}
                        placeholder="your.email@example.com"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block text-xs font-bold text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="+92 300 0000000"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="checkInDate"
                          className="mb-1 block text-xs font-bold text-gray-700"
                        >
                          Check-in
                        </label>
                        <input
                          id="checkInDate"
                          name="checkInDate"
                          type="date"
                          value={form.checkInDate}
                          onChange={onChange}
                          className="w-full rounded-lg border border-gray-300 px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="checkOutDate"
                          className="mb-1 block text-xs font-bold text-gray-700"
                        >
                          Check-out
                        </label>
                        <input
                          id="checkOutDate"
                          name="checkOutDate"
                          type="date"
                          value={form.checkOutDate}
                          onChange={onChange}
                          className="w-full rounded-lg border border-gray-300 px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="numberOfGuests"
                        className="mb-1 block text-xs font-bold text-gray-700"
                      >
                        Guests
                      </label>
                      <select
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={form.numberOfGuests}
                        onChange={onChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6+">6+ Guests</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1 block text-xs font-bold text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={2}
                        value={form.message}
                        onChange={onChange}
                        placeholder="Room type, area preference, group size…"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    {submitStatus === "error" && submitError ? (
                      <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {submitError}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-emerald-700 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Get Rates & Availability"}
                    </button>
                    <a
                      href={WHATSAPP_PILLAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Instead
                    </a>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
        <a
          href="#intro"
          className="flex flex-col items-center gap-1 text-white/70 transition hover:text-white"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function AuthorByline() {
  return (
    <div className="border-b border-gray-200 bg-white py-4">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2 px-4 text-sm hrm-muted md:px-6">
        <span>
          By{" "}
          <strong className="text-gray-800">Amjad Khan</strong>
          <span className="hidden sm:inline">
            {" "}
            — travel writer covering the Murree Hills
          </span>
        </span>
        <span className="hidden h-4 w-px bg-gray-300 sm:block" />
        <span>Published July 2026</span>
        <span className="hidden h-4 w-px bg-gray-300 sm:block" />
        <span>Last updated 23 July 2026</span>
      </div>
    </div>
  );
}

function LocationCard({
  title,
  children,
  href,
  linkLabel,
}: {
  title: string;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <Reveal>
      <div className="hrm-card hrm-shadow-lux p-6 md:p-8">
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-700" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="hrm-prose hrm-muted text-[15px]">{children}</div>
        {href && linkLabel ? (
          <Link
            href={href}
            className="mt-4 inline-flex text-sm font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
          >
            {linkLabel} →
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}

function RoomTypeCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="hrm-card p-6">
        <div className="mb-3 flex items-center gap-2">
          <Bed className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-[15px] leading-relaxed hrm-muted">{children}</p>
      </div>
    </Reveal>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Frequently Asked Questions About Hotel Rooms in Murree">
      <div className="space-y-3">
        {FAQS.map((item, idx) => (
          <Reveal key={item.q} delay={idx * 50}>
            <div className="hrm-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open === idx}
              >
                <span className="font-semibold text-gray-900">{item.q}</span>
                <ChevronDown
                  className={`mt-1 h-5 w-5 shrink-0 text-emerald-700 transition ${open === idx ? "rotate-180" : ""}`}
                />
              </button>
              {open === idx ? (
                <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                  <p className="text-[15px] leading-relaxed hrm-muted">{item.a}</p>
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function PageFooter() {
  return (
    <footer className="hrm-grad-emerald py-12 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="text-2xl font-bold md:text-3xl">
          Ready to compare hotel rooms vs. a private villa?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Message Himalaya Villas for open villa-weeks, group rates, and photos
          of the specific villas you would stay in.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={WHATSAPP_PILLAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hrm-grad-gold hrm-shadow-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold transition hover:scale-105"
            style={{ color: "hsl(165 60% 18%)" }}
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp {SITE_CONTACT.phoneDisplay}
          </a>
          <a
            href={telHref()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold backdrop-blur-sm transition hover:bg-white/20"
          >
            <Phone className="h-5 w-5" />
            Call Us
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold backdrop-blur-sm transition hover:bg-white/20"
          >
            Visit Himalaya Villas
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <a
            href={`mailto:${SITE_CONTACT.emails.info}`}
            className="inline-flex items-center gap-1 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            {SITE_CONTACT.emails.info}
          </a>
          <span>{SITE_CONTACT.addressLines.join(", ")}</span>
        </div>
      </div>
    </footer>
  );
}

export default function HotelRoomsInMurreeClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />
      <style>{PAGE_STYLES}</style>
      <main className="hrm-page">
        <HeroSection />
        <AuthorByline />

        <section id="intro" className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Reveal>
              <div className="hrm-prose text-[17px] hrm-muted">
                <p>
                  Murree has more hotel rooms per kilometre than any other hill
                  station in Pakistan — and less consistency between them than
                  almost anywhere else. Two rooms advertised at the same rate,
                  three hundred metres apart, can differ in everything that
                  matters: whether the heating works in January, whether the
                  &ldquo;valley view&rdquo; is a valley or a car park, whether
                  hot water arrives before 9 a.m., and whether the mattress was
                  replaced this decade.
                </p>
                <p>
                  This guide exists to close that gap. It covers where
                  Murree&apos;s hotel rooms are actually located and how location
                  changes what you get, what each room category really means when
                  a Murree hotel uses it, what rooms genuinely cost across the
                  year, and the specific things worth verifying before you pay a
                  deposit. It ends with an honest look at when a hotel room is
                  the right call — and when it isn&apos;t.
                </p>
                <p>
                  Everything here is written for travellers coming up from{" "}
                  <strong>Islamabad, Rawalpindi, Lahore, and Karachi</strong>,
                  and for overseas Pakistanis planning a mountain trip from
                  abroad. Rates are quoted in PKR and reflect what properties
                  actually charge, not what rate cards claim. For a broader view
                  of the market, see our{" "}
                  <Link href="/best-hotels-murree-pakistan">
                    best hotels in Murree Pakistan
                  </Link>{" "}
                  guide.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Section
          id="locations"
          eyebrow="Location Guide"
          title="Where Hotel Rooms in Murree Are Located — and Why It Changes Everything"
        >
          <Reveal>
            <p className="mb-8 text-[17px] leading-relaxed hrm-muted">
              Murree is not one place. It is a ridgeline of distinct localities,
              and the same budget buys a very different room depending on which
              one you choose. Before comparing rooms, decide which Murree you
              are booking. See also our{" "}
              <Link href="/best-hotels-murree-pakistan">
                Murree hotel room rates
              </Link>{" "}
              hub for area-by-area comparisons.
            </p>
          </Reveal>
          <div className="space-y-6">
            <LocationCard title="Mall Road and the Town Centre">
              <p>
                The densest concentration of hotel rooms in Murree sits on and
                around Mall Road. This is where you stay if you want to step out
                of your room into the bazaar, the food street, and the evening
                crowd. The trade-offs are real: rooms are older and smaller on
                average, parking is scarce and often paid, noise carries late into
                the night in season, and &ldquo;view rooms&rdquo; frequently face
                other buildings. Expect to pay a premium for location rather than
                for the room itself.
              </p>
            </LocationCard>
            <LocationCard title="Jhika Gali and Kuldana">
              <p>
                A short drive above the town centre, Jhika Gali and Kuldana offer
                newer builds, easier parking, and genuinely better views for the
                same money. Many of Murree&apos;s mid-range hotels built in the
                last decade are here. The compromise is that you will drive or
                take a taxi to Mall Road rather than walk.
              </p>
            </LocationCard>
            <LocationCard
              title="Bhurban"
              href="/hotels-in-bhurban"
              linkLabel="Hotels in Bhurban guide"
            >
              <p>
                Roughly 9 kilometres from Murree town, Bhurban is where
                Murree&apos;s premium accommodation concentrates. The area is
                quieter, greener, and higher-end by design — this is where{" "}
                <Link href="/luxury-hotels-in-murree">
                  Pearl Continental Bhurban anchors the market
                </Link>{" "}
                and where most of the area&apos;s{" "}
                <Link href="/luxury-hotels-in-murree">
                  luxury hotel rooms in Murree
                </Link>
                , golf-adjacent hotels, and private villa estates sit. Rooms in
                Bhurban are larger, newer, and more expensive, and guests here are
                typically staying two to three nights rather than one.
              </p>
            </LocationCard>
            <LocationCard title="Patriata (New Murree) and Angoori Road">
              <p>
                Further out, Patriata and the Angoori Road belt serve travellers
                who want the chairlift, pine forest, and distance from the crowds.
                Hotel stock here is thinner and more variable — some excellent
                small properties, some very basic ones — so photographs and recent
                reviews matter more than anywhere else in Murree.
              </p>
            </LocationCard>
          </div>
        </Section>

        <Section
          id="room-types"
          eyebrow="Room Categories"
          title="Types of Hotel Rooms in Murree — What the Categories Actually Mean"
        >
          <Reveal>
            <p className="mb-8 text-[17px] leading-relaxed hrm-muted">
              Murree hotels borrow international room categories, but the words
              do not always mean what they mean elsewhere. Here is how to
              translate them.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <RoomTypeCard title="Standard Rooms">
              The entry category almost everywhere in Murree: one double bed, an
              attached bathroom, a TV, and — critically variable — some form of
              heating. In budget properties &ldquo;standard&rdquo; can mean a
              small interior-facing room with an electric heater provided on
              request. Always confirm the heating arrangement in writing between
              October and March; a gas or central heating system is meaningfully
              different from a single portable heater in a stone-cold room.
            </RoomTypeCard>
            <RoomTypeCard title="Deluxe and Executive Rooms">
              In practice, &ldquo;deluxe&rdquo; in Murree usually signals one or
              more of: a view-facing window, a larger floorplate, newer furniture,
              or a bathtub instead of a shower. &ldquo;Executive&rdquo; typically
              adds a sitting area. Neither label is regulated, so ask the
              specific question: what does the deluxe room have that the standard
              room does not? A hotel with a real answer is a hotel worth booking.
            </RoomTypeCard>
            <RoomTypeCard title="Family Rooms and Connecting Rooms">
              Family travel dominates Murree&apos;s market, and family rooms are
              the most in-demand category on Eid weekends and through the summer
              holidays. A genuine family room has two double beds or a double
              plus singles in one room; connecting rooms are rarer and worth
              requesting explicitly. If you are travelling with more than five
              people, ask whether the hotel offers a family suite — and compare
              that price against a private villa, because at six or more guests
              the economics often flip.
            </RoomTypeCard>
            <RoomTypeCard title="Honeymoon and Premium Suites">
              Suites at Murree&apos;s upper end add a separate lounge, better
              linen, and — in Bhurban especially — balconies with genuine forest
              or valley views. This is the segment where the gap between a good
              hotel suite and a private villa narrows in price but stays wide in
              experience: the suite shares corridors, dining rooms, and lobbies
              with every other guest in the building.
            </RoomTypeCard>
          </div>
        </Section>

        <Section
          id="rates"
          eyebrow="2026 Pricing"
          title="Hotel Room Rates in Murree: What Rooms Actually Cost in 2026"
        >
          <Reveal>
            <p className="mb-4 text-[17px] leading-relaxed hrm-muted">
              Rates in Murree move more with the calendar than with the room. The
              same deluxe room can triple in price between a February weekday and
              an Eid weekend. The table below reflects realistic booked rates —
              not rack rates — across the market&apos;s main tiers.
            </p>
            <p className="mb-8 text-sm hrm-muted">
              Treat these as planning ranges. Individual properties move above
              and below them constantly, and the far right column is where
              negotiation and advance booking make the biggest difference. For
              premium options, see{" "}
              <Link href="/luxury-hotels-in-murree">
                luxury hotels in Murree
              </Link>
              .
            </p>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="hrm-grad-emerald text-white">
                    <th className="px-4 py-3 font-semibold">Tier &amp; typical location</th>
                    <th className="px-4 py-3 font-semibold">Off-peak weekday</th>
                    <th className="px-4 py-3 font-semibold">Season weekend</th>
                    <th className="px-4 py-3 font-semibold">Peak (Eid / snow / summer)</th>
                  </tr>
                </thead>
                <tbody>
                  {RATE_ROWS.map((row, idx) => (
                    <tr
                      key={row.tier}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {row.tier}
                      </td>
                      <td className="px-4 py-3 hrm-muted">{row.offPeak}</td>
                      <td className="px-4 py-3 hrm-muted">{row.season}</td>
                      <td className="px-4 py-3 hrm-muted">{row.peak}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed hrm-muted">
              <p>
                <strong className="text-gray-900">
                  Three pricing behaviours
                </strong>{" "}
                are worth knowing before you book. First, Murree operates an
                unofficial weekend economy: Friday and Saturday nights carry a
                premium of 40 to 80 percent over the same room on a Tuesday.
                Second, snowfall announcements move prices within hours — the
                first confirmed snow of the season can double walk-in rates on
                Mall Road by evening. Third, quoted rates on the phone are
                opening positions in the off-season; a polite ask for a better
                rate on a two-night midweek stay succeeds more often than not
                between September and November and again in February and March.
              </p>
            </div>
          </Reveal>
        </Section>

        <Section
          id="seasons"
          eyebrow="Timing"
          title="High Season vs Off-Season: When to Book a Hotel Room in Murree"
        >
          <Reveal>
            <div className="hrm-prose text-[17px] hrm-muted">
              <p>
                Murree effectively has three peak windows: the summer school
                holidays from June through August, both Eid weeks, and snowfall
                weekends between late December and February. In these windows,
                book two to four weeks ahead for mid-range rooms and further out
                for premium properties — the best rooms in Bhurban are routinely
                gone ten days before an Eid weekend.
              </p>
              <p>
                The counter-programming opportunity is the shoulder season. Late
                September through November delivers clear mountain air, empty
                viewpoints, and rates 40 to 60 percent below summer — arguably
                the best value-per-rupee window in the entire year. March to
                mid-May is similar, with the added draw of post-winter greenery.
                If your dates are flexible, the shoulder season buys you a
                premium room for a mid-range budget.
              </p>
              <p>
                For snowfall-specific planning, see our{" "}
                <Link href="/snowfall-in-murree">snowfall in Murree</Link> guide.
                Summer holiday travellers should book early — walk-in availability
                on peak Saturdays is the worst in the market.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Sun, label: "Summer Peak", sub: "Jun – Aug" },
              { icon: Calendar, label: "Eid Weeks", sub: "Both Eids" },
              { icon: Snowflake, label: "Snow Weekends", sub: "Dec – Feb" },
            ].map(({ icon: Icon, label, sub }) => (
              <Reveal key={label}>
                <div className="hrm-card flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                    <Icon className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm hrm-muted">{sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="checklist"
          eyebrow="Before You Pay"
          title="Nine Things to Verify Before Booking Any Hotel Room in Murree"
        >
          <Reveal>
            <p className="mb-8 text-[17px] leading-relaxed hrm-muted">
              Murree&apos;s review pages tell a consistent story: most bad stays
              trace back to a small set of avoidable surprises. Run through this
              list before paying any deposit — a serious property will answer
              every question without hesitation.
            </p>
          </Reveal>
          <ul className="space-y-4">
            {CHECKLIST.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 40}>
                <li className="hrm-card flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <item.icon className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed hrm-muted">
                      {item.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section
          id="booking"
          eyebrow="How to Book"
          title="How to Book: OTAs, WhatsApp, and Walk-Ins Compared"
        >
          <Reveal>
            <div className="hrm-prose text-[17px] hrm-muted">
              <p>
                Murree&apos;s booking market runs on three channels, and each has
                a distinct use case.
              </p>
              <p>
                <strong>Online travel agencies</strong> — Booking.com, Agoda,
                and Airbnb — are strongest for comparison and for the protection
                of a written booking record. Review scores on these platforms are
                the fastest way to filter Murree&apos;s enormous, uneven room
                supply, and free-cancellation rates hedge against weather. Their
                weakness is coverage: many of Murree&apos;s better small
                properties and nearly all of its private villas either list
                partially or take their best inventory direct.
              </p>
              <p>
                <strong>Direct WhatsApp booking</strong> is how much of
                Murree&apos;s premium segment actually transacts. It gets you a
                human who can answer the nine questions above, negotiate midweek
                rates, and hold a specific room rather than a room category. The
                discipline is to get everything in writing inside the chat —
                dates, room, beds, total price, and cancellation terms — before
                sending any advance.
              </p>
              <p>
                <strong>Walk-in booking</strong> still works in the off-season
                and midweek, when it is also the strongest negotiating position
                you will ever hold in Murree. It fails badly on peak weekends,
                when travellers without bookings pay the highest prices in the
                market for the last and worst rooms. If your trip touches an Eid
                weekend, summer Saturday, or forecast snowfall: book ahead,
                always.
              </p>
            </div>
          </Reveal>
        </Section>

        <Section
          id="families"
          eyebrow="Groups & Families"
          title="Booking for Families and Large Groups"
        >
          <Reveal>
            <div className="hrm-prose text-[17px] hrm-muted">
              <p>
                Groups are where Murree&apos;s hotel model starts to strain. A
                family of eight needs two to three hotel rooms, which means
                splitting across floors, coordinating meal times in a shared
                dining room, and paying two to three room rates plus service
                charges. On a peak weekend in the premium tier, that arithmetic
                reaches PKR 120,000 to 200,000 per night for accommodation that
                still isn&apos;t private.
              </p>
              <p>
                This is the point in planning where it is worth comparing{" "}
                <Link href="/holiday-homes-murree" className="text-emerald-700 underline underline-offset-4">
                  renting a whole holiday home instead
                </Link>
                . A private villa priced at the top of the
                hotel-suite range sleeps the entire group under one roof, with its
                own lounge, kitchen access, and outdoor space — and, in estate
                settings, grounds that no one outside your group is using. For
                multi-generational trips, the difference is less about luxury and
                more about logistics: one booking, one building, no corridors. See
                our{" "}
                <Link href="/family-hotels-in-murree">
                  family hotels in Murree
                </Link>{" "}
                guide for group planning tips.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <Users className="h-10 w-10 shrink-0 text-emerald-700" />
              <p className="text-[15px] leading-relaxed text-emerald-900">
                <strong>Rule of thumb:</strong> at six or more guests, compare
                multi-room hotel math against a whole-villa rate before you
                commit. The total cost often lands in the same range — the
                experience is not comparable.
              </p>
            </div>
          </Reveal>
        </Section>

        <section
          id="villa-alternative"
          className="py-16 md:py-24"
          style={{ background: "hsl(165 60% 18%)" }}
        >
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Alternative Worth Comparing
              </p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                When a Hotel Room Isn&apos;t the Right Answer: The Private Villa
                Alternative
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/85">
                <p>
                  Everything above assumes the standard model: you book a room,
                  and you share the building. For most one-night trips and most
                  couples, that model works fine. But there is a category of trip
                  it structurally cannot serve — the family gathering that wants
                  to stay up late together, the group of friends who want a
                  bonfire without an audience, the couple who would rather not
                  cross a lobby at all.
                </p>
                <p>
                  This is the gap the private estate model fills, and in Murree it
                  is concentrated in Bhurban. Himalaya Villas, a cedar estate of
                  twelve private villas near Kashmiri Bazar in Bhurban, operates on
                  a model no hotel in Murree offers: the estate hosts one group at
                  a time. When you book, the villas, the café, the bonfire terrace,
                  the BBQ areas, the children&apos;s play area, and the hiking
                  trails are yours alone — there are no other guests to share them
                  with, because none are admitted.
                </p>
                <p>
                  In practical terms, that means the questions this guide teaches
                  you to ask are already answered. Heating, hot water, and backup
                  power run to residential standards because the villas are
                  residences. The views are the Murree Hills&apos; cedar forest
                  because the estate sits inside it. And the booking itself is a
                  single WhatsApp conversation — dates, group size, confirmation —
                  rather than a spreadsheet of room allocations.
                </p>
                <p>
                  It is not the right choice for every trip. A solo traveller or a
                  couple on a one-night Mall Road visit will be better served by a
                  well-chosen hotel room, and this guide is built to help them
                  choose it. But if your Murree plan involves your whole family,
                  your whole friend group, or an occasion worth protecting from
                  strangers, compare the whole-estate rate against the multi-room
                  hotel arithmetic before you book.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={WHATSAPP_PILLAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hrm-grad-gold hrm-shadow-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold transition hover:scale-105"
                  style={{ color: "hsl(165 60% 18%)" }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Check Availability on WhatsApp
                </a>
                <Link
                  href="/hotels-in-bhurban"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Explore Bhurban Villas
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Message Himalaya Villas at {SITE_CONTACT.phoneDisplay} — the team
                responds with open villa-weeks, rates for your group size, and
                photographs of the specific villas you would be staying in.
              </p>
            </Reveal>
          </div>
        </section>

        <FAQSection />
        <PageFooter />
      </main>
    </>
  );
}
