"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Home,
  Calendar,
  Shield,
  ExternalLink,
} from "lucide-react";
import { submitInquiry } from "@/lib/submit-inquiry-client";
import { SITE_CONTACT, telHref } from "@/lib/site-contact";
import {
  ARTICLE_SCHEMA,
  AUTHOR,
  BOOKING_CHANNELS,
  BREADCRUMB_SCHEMA,
  FAQ_SCHEMA,
  FAQS,
  RATE_ROWS,
  SEASON_ROWS,
  TERMINOLOGY_ROWS,
  VETTING_POINTS,
  WHATSAPP_CLOSING,
  WHATSAPP_INLINE,
} from "./content";

const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap');

.hh-page{
  --bg:40 38% 97%; --fg:165 35% 12%;
  --card:0 0% 100%; --muted:165 12% 38%;
  --primary:165 60% 18%; --border:165 15% 86%;
  --accent:38 88% 55%;
  font-family:'Inter',system-ui,sans-serif;
  color:hsl(var(--fg));
  background:hsl(var(--bg));
  min-height:100vh;
}
.hh-page h1,.hh-page h2,.hh-page h3,.hh-page h4{font-family:'Playfair Display',Georgia,serif;}
.hh-page a{color:inherit;}
.hh-page button{font-family:inherit;cursor:pointer;border:0;}
.hh-grad-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));}
.hh-grad-emerald{background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));}
.hh-grad-hero{background:linear-gradient(135deg,hsl(165 60% 10% / .92),hsl(165 45% 22% / .75));}
.hh-text-gold{background:linear-gradient(135deg,hsl(38 88% 55%),hsl(42 95% 65%));-webkit-background-clip:text;background-clip:text;color:transparent;}
.hh-shadow-lux{box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);}
.hh-shadow-gold{box-shadow:0 15px 40px -10px hsl(38 88% 55% / .5);}
.hh-card{background:hsl(var(--card));border-radius:20px;border:1px solid hsl(var(--border));}
.hh-muted{color:hsl(var(--muted));}
.hh-prose p{margin-bottom:1.25rem;line-height:1.8;}
.hh-prose p:last-child{margin-bottom:0;}
.hh-prose a,.hh-link{color:hsl(165 60% 22%);text-decoration:underline;text-underline-offset:3px;}
.hh-prose a:hover,.hh-link:hover{color:hsl(165 60% 14%);}
.hh-table{width:100%;border-collapse:collapse;font-size:0.9375rem;}
.hh-table th,.hh-table td{border:1px solid hsl(var(--border));padding:0.75rem 1rem;text-align:left;vertical-align:top;}
.hh-table thead th{background:hsl(165 60% 18%);color:white;font-weight:600;}
.hh-table tbody tr:nth-child(even){background:hsl(40 30% 96%);}
.hh-faq-item{padding:1.25rem 0;border-bottom:1px solid hsl(var(--border));}
.hh-faq-item:last-child{border-bottom:0;}
.hh-reveal{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease;}
.hh-reveal.in{opacity:1;transform:translateY(0);}
@keyframes hhKenBurns{0%{transform:scale(1)}100%{transform:scale(1.12)}}
.hh-ken{animation:hhKenBurns 10s ease-out both;}
html{scroll-behavior:smooth;}
`;

const HERO_IMAGES = [
  "/assets/gallery-garden.jpg",
  "/assets/gallery-exterior.jpg",
  "/assets/gallery-balcony.jpg",
  "/assets/gallery-interior.jpg",
] as const;

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  checkInDate: "",
  checkOutDate: "",
  numberOfGuests: "4",
  message: "",
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`hh-reveal ${className}`}
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
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Reveal>
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-bold leading-tight md:text-4xl">{title}</h2>
        </Reveal>
        <div className="mt-7">{children}</div>
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
      source: "holiday-homes-murree-hero",
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
            alt="Holiday homes in Murree — cedar villa exterior in Bhurban hills"
            className={`h-full w-full object-cover ${idx === slide ? "hh-ken" : ""}`}
          />
          <div className="absolute inset-0 hh-grad-hero" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col gap-8 px-4 py-10 lg:min-h-screen lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-16">
        <div className="flex-1 text-white">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
              Bhurban · Murree · Pakistan
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-[3.1rem] lg:leading-[1.12]">
              <span className="hh-text-gold">Holiday Homes in Murree:</span>
              <span className="mt-2 block text-2xl font-semibold text-white/95 sm:text-3xl md:text-[2rem]">
                What They Cost, Where to Find Them, and How to Book
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              A self-contained house, cottage or villa rented in full — with
              kitchen, lounge and private entrance. This guide covers rental
              areas, 2026 rates, and how to book safely.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#rates"
                className="hh-grad-gold hh-shadow-gold rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-105"
                style={{ color: "hsl(165 60% 18%)" }}
              >
                View Rental Rates
              </a>
              <a
                href="#areas"
                className="rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/20"
              >
                Area Guide
              </a>
            </div>
          </Reveal>
        </div>

        <div className="w-full shrink-0 lg:w-[380px] xl:w-[420px]">
          <Reveal delay={450}>
            <div className="hh-shadow-lux overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md">
              <div className="hh-grad-emerald px-6 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">
                  Enquire About a Holiday Home
                </p>
                <p className="mt-1 text-lg font-bold">
                  Group size, dates &amp; whole-property availability
                </p>
              </div>
              <div className="p-5 md:p-6">
                {submitStatus === "success" ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center text-sm text-emerald-800">
                    <p className="font-semibold">Thank you — enquiry received!</p>
                    <p className="mt-2">We will reply shortly with availability.</p>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-4 text-sm font-semibold text-emerald-700 underline"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="fullName" className="mb-1 block text-xs font-bold text-gray-700">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        required
                        value={form.fullName}
                        onChange={onChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-xs font-bold text-gray-700">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={onChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1 block text-xs font-bold text-gray-700">
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
                        <label htmlFor="checkInDate" className="mb-1 block text-xs font-bold text-gray-700">
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
                        <label htmlFor="checkOutDate" className="mb-1 block text-xs font-bold text-gray-700">
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
                      <label htmlFor="numberOfGuests" className="mb-1 block text-xs font-bold text-gray-700">
                        Group size
                      </label>
                      <select
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={form.numberOfGuests}
                        onChange={onChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {[2, 4, 6, 8, 10, 12].map((n) => (
                          <option key={n} value={String(n)}>
                            {n} guests
                          </option>
                        ))}
                        <option value="12+">12+ guests</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1 block text-xs font-bold text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={2}
                        value={form.message}
                        onChange={onChange}
                        placeholder="Bedrooms needed, area preference, households travelling…"
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
                      {submitting ? "Sending…" : "Check Holiday Home Availability"}
                    </button>
                    <a
                      href={WHATSAPP_INLINE}
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
        <a href="#intro" className="flex flex-col items-center gap-1 text-white/70 hover:text-white">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function AuthorBar() {
  return (
    <div className="border-b border-gray-200 bg-white py-4">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2 px-4 text-sm hh-muted md:px-6">
        <span>
          By <strong className="text-gray-800">{AUTHOR.name}</strong>
          <span className="hidden sm:inline"> — {AUTHOR.role}</span>
        </span>
        <span className="hidden h-4 w-px bg-gray-300 sm:block" />
        <span>Published 29 July 2026</span>
        <span className="hidden h-4 w-px bg-gray-300 sm:block" />
        <span>Last reviewed: {AUTHOR.lastReviewed}</span>
      </div>
    </div>
  );
}

function TableWrap({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        {children}
      </div>
    </Reveal>
  );
}

export default function HolidayHomesMurreeClient() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <style>{PAGE_STYLES}</style>
      <main className="hh-page">
        <HeroSection />
        <AuthorBar />

        <section id="intro" className="py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Reveal>
              <div className="hh-prose text-[17px] hh-muted">
                <p>
                  A <strong>holiday home in Murree</strong> is a self-contained
                  house, cottage or villa rented in full for a short stay — usually
                  two to five nights — with its own kitchen, sitting room and
                  private entrance. You get the whole building. There is no
                  reception desk, no corridor of other guests, and no fixed dinner
                  service. For families and groups this is the difference between a
                  holiday and a logistics exercise; for anyone travelling alone it
                  is usually more house than they need.
                </p>
                <p>
                  One point of confusion is worth clearing up straight away,
                  because it sends a lot of people to the wrong page. Search
                  &ldquo;Holiday Homes Murree&rdquo; and a good share of the
                  results are for a residential plot scheme of that name on the
                  Murree Expressway, sold on instalment plans to investors. That
                  is a real-estate product. It has nothing to do with booking a
                  place to stay next weekend. If you are looking to{" "}
                  <strong>rent rather than buy</strong>, the sections below cover
                  the rental market: where the homes are, what they cost, and how
                  to avoid the ones that will ruin a trip.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Section
          id="terminology"
          eyebrow="Know the terms"
          title="Holiday Home, Guest House, or Cottage — the Words Mean Different Things Here"
        >
          <Reveal>
            <p className="mb-6 text-[17px] leading-relaxed hh-muted">
              Pakistani listing sites use these terms loosely, and the difference
              matters a great deal once you arrive. What you are actually choosing
              between is how much of a building you control.
            </p>
          </Reveal>
          <TableWrap>
            <table className="hh-table">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">What you get</th>
                  <th scope="col">Typical size</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {TERMINOLOGY_ROWS.map((row) => (
                  <tr key={row.type}>
                    <td className="font-medium">
                      {row.type === "Guest house" ? (
                        <Link href="/guest-house-murree" className="hh-link">
                          Guest house
                        </Link>
                      ) : (
                        row.type
                      )}
                    </td>
                    <td>{row.what}</td>
                    <td>{row.size}</td>
                    <td>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <Reveal delay={100}>
            <p className="mt-6 text-[17px] leading-relaxed hh-muted">
              The practical test is simple. If a listing quotes a per-person rate,
              or mentions &ldquo;rooms available&rdquo;, it is a guest house
              whatever it calls itself. A genuine holiday home is priced for the
              whole property, per night.
            </p>
          </Reveal>
        </Section>

        <Section
          id="areas"
          eyebrow="Location guide"
          title="Where the Holiday Homes Are: An Area-by-Area Guide"
        >
          <Reveal>
            <p className="mb-8 text-[17px] leading-relaxed hh-muted">
              &ldquo;Murree&rdquo; is used loosely to describe roughly forty
              kilometres of ridge running north-east from the Expressway exit up
              towards the Galyat. Where you stay within that stretch changes the
              trip more than the house itself does.
            </p>
          </Reveal>
          <div className="space-y-6">
            {[
              {
                title: "Bhurban",
                body: (
                  <>
                    Nine kilometres below Murree town at around 1,900 metres,{" "}
                    <Link href="/hotels-in-bhurban" className="hh-link">
                      Bhurban
                    </Link>{" "}
                    is the quietest of the developed pockets and the one where
                    most of the better-built private houses sit. Cedar and pine
                    cover the slopes; the ridge looks east across the Jhelum valley
                    towards the Kashmir foothills. It is close enough to Murree for
                    a day trip and far enough that the Mall Road crowds never reach
                    you. Road access is good year-round. This is where the
                    market&apos;s upper end concentrates.
                  </>
                ),
              },
              {
                title: "Kashmir Point and Pindi Point",
                body: "The old colonial heart of Murree town, on the ridge above the Mall. Views are the reason to be here — Kashmir Point looks out over the Neelum valley on a clear day. The trade-off is that you are inside the town, which in July and during snowfall weekends means traffic that does not move. Parking is genuinely difficult. Older cottage stock, some of it beautiful, much of it poorly insulated.",
              },
              {
                title: "Patriata (New Murree)",
                body: "Fifteen kilometres south-east and higher, at about 2,200 metres. Thinner development, more forest, the chairlift and cable car. Snow arrives earlier and stays longer. Fewer quality rentals, but the ones that exist are properly remote.",
              },
              {
                title: "Kuldana, Sunny Bank and Jhika Gali",
                body: "The practical middle. Residential pockets near enough to Murree town for a school-run-length drive, generally cheaper, generally less scenic. This is where most of the sub-25,000-rupee stock sits, and where quality varies most wildly from house to house.",
              },
              {
                title: "Towards the Galyat — Ayubia, Nathia Gali, Thandiani",
                body: (
                  <>
                    Technically past Murree and administratively in Khyber
                    Pakhtunkhwa, but people book them on the same trip. Higher,
                    colder, greener, and considerably less developed. The{" "}
                    <Link
                      href="/blogs/thing-to-do-bhurban-murree"
                      className="hh-link"
                    >
                      Pipeline Track
                    </Link>{" "}
                    between Ayubia and Dunga Gali is the best half-day walk in the
                    region. Worth knowing that the drive from Murree town is an hour
                    and a half in summer traffic, not the forty minutes the map
                    suggests.
                  </>
                ),
              },
            ].map((area) => (
              <Reveal key={area.title}>
                <div className="hh-card p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-700" />
                    <h3 className="text-xl font-bold">{area.title}</h3>
                  </div>
                  <p className="text-[15px] leading-relaxed hh-muted">{area.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="mt-8 hh-card border-l-4 border-l-amber-500 p-6">
              <h3 className="mb-3 text-lg font-bold">If you are driving from Islamabad</h3>
              <p className="text-[15px] leading-relaxed hh-muted">
                The Murree Expressway gets you to the Expressway exit in about an
                hour in clear conditions. Everything after that depends on the
                season: the last stretch to Bhurban is quick, the climb into Murree
                town in peak season is not. Between late December and February,
                check whether the district administration has issued a tyre-chain
                advisory before setting off — see{" "}
                <a
                  href="https://www.pmd.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hh-link inline-flex items-center gap-1"
                >
                  PMD weather <ExternalLink className="h-3.5 w-3.5" />
                </a>{" "}
                and{" "}
                <Link href="/snowfall-in-murree" className="hh-link">
                  Murree snowfall and road conditions
                </Link>
                . Traffic is regularly halted at Satra Meel or Kuldana when the
                town reaches capacity.
              </p>
            </div>
          </Reveal>
        </Section>

        <Section
          id="rates"
          eyebrow="2026 pricing"
          title="What a Holiday Home in Murree Actually Costs"
        >
          <Reveal>
            <p className="mb-6 text-[17px] leading-relaxed hh-muted">
              Nightly rates in Murree swing more than in almost any other Pakistani
              destination — the same house can triple in price between March and
              Eid. Rates below are indicative market ranges for the{" "}
              <strong>whole property per night</strong>, not per room, as observed
              across direct bookings and listing platforms through 2025 and the
              first half of 2026.
            </p>
          </Reveal>
          <TableWrap>
            <table className="hh-table">
              <thead>
                <tr>
                  <th scope="col">Property size</th>
                  <th scope="col">Off-peak weekday</th>
                  <th scope="col">In-season weekend</th>
                  <th scope="col">Peak — Eid, snowfall, mid-summer</th>
                </tr>
              </thead>
              <tbody>
                {RATE_ROWS.map((row) => (
                  <tr key={row.size}>
                    <td className="font-medium">{row.size}</td>
                    <td>{row.offPeak}</td>
                    <td>{row.season}</td>
                    <td>{row.peak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <p className="mt-3 text-sm italic hh-muted">
            Indicative ranges for the whole property per night. Last reviewed{" "}
            {AUTHOR.lastReviewed}.
          </p>
          <Reveal delay={100}>
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-bold">What moves the price</h3>
              <ul className="space-y-3 text-[15px] leading-relaxed hh-muted">
                <li>
                  <strong className="text-gray-900">The calendar</strong> — Eid-ul-Fitr,
                  Eid-ul-Azha, the first heavy snowfall and the July–August school
                  holidays are the four spikes. A house at 30,000 in March is often
                  80,000 across an Eid weekend.
                </li>
                <li>
                  <strong className="text-gray-900">Whether the snow has arrived</strong> —
                  Murree pricing is reactive. Rates move within days of the first
                  real snowfall.
                </li>
                <li>
                  <strong className="text-gray-900">Night count</strong> — Most owners
                  impose a two-night minimum on weekends and Eid. Midweek in October
                  or May is the best value in the Murree calendar.
                </li>
                <li>
                  <strong className="text-gray-900">Heating</strong> — Properly heated
                  houses with working gas or electric backup command a real premium
                  from November to March.
                </li>
                <li>
                  <strong className="text-gray-900">Booking channel</strong> — Platform
                  listings carry a service fee of roughly twelve to eighteen per cent.
                  Booking direct usually removes it.
                </li>
              </ul>
            </div>
          </Reveal>
        </Section>

        <Section
          id="vetting"
          eyebrow="Before you pay"
          title="What Separates a Good Holiday Home Here From a Bad One"
        >
          <Reveal>
            <p className="mb-8 text-[17px] leading-relaxed hh-muted">
              Photographs of a Murree house tell you almost nothing about whether
              you will enjoy staying in it. Everything that determines that is
              infrastructure, and none of it is photogenic. These are the questions
              worth asking before you pay a deposit — and if an owner cannot answer
              them clearly, that is your answer.
            </p>
          </Reveal>
          <div className="space-y-5">
            {VETTING_POINTS.map((point, idx) => (
              <Reveal key={point.title} delay={idx * 40}>
                <div className="hh-card p-6">
                  <h3 className="mb-2 text-lg font-bold">{point.title}</h3>
                  <p className="text-[15px] leading-relaxed hh-muted">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="booking"
          eyebrow="How to book"
          title="How to Book a Holiday Home in Murree"
        >
          <Reveal>
            <p className="mb-6 text-[17px] hh-muted">
              Four channels, with genuinely different trade-offs.
            </p>
          </Reveal>
          <TableWrap>
            <table className="hh-table">
              <thead>
                <tr>
                  <th scope="col">Channel</th>
                  <th scope="col">Strengths</th>
                  <th scope="col">Watch for</th>
                </tr>
              </thead>
              <tbody>
                {BOOKING_CHANNELS.map((row) => (
                  <tr key={row.channel}>
                    <td className="font-medium">{row.channel}</td>
                    <td>{row.strengths}</td>
                    <td>{row.watch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <Reveal delay={100}>
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-bold">Before you transfer money</h3>
              <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-relaxed hh-muted">
                <li>
                  Ask for a short live video walkthrough on WhatsApp. A genuine owner
                  will do this without hesitation.
                </li>
                <li>
                  Get the exact location — a pin, not &ldquo;near Bhurban&rdquo;.
                </li>
                <li>
                  Get the cancellation and refund policy in writing, in the same chat
                  thread.
                </li>
                <li>
                  Pay a partial deposit rather than the full amount, and pay to a
                  business account where possible.
                </li>
                <li>
                  Confirm the check-in contact&apos;s phone number and, if arriving in
                  winter, confirm road conditions on the morning of travel.
                </li>
              </ol>
            </div>
          </Reveal>
        </Section>

        <Section id="seasons" eyebrow="Timing" title="When to Go">
          <TableWrap>
            <table className="hh-table">
              <thead>
                <tr>
                  <th scope="col">Season</th>
                  <th scope="col">Conditions</th>
                  <th scope="col">What it is good for</th>
                </tr>
              </thead>
              <tbody>
                {SEASON_ROWS.map((row) => (
                  <tr key={row.season}>
                    <td className="font-medium">{row.season}</td>
                    <td>{row.conditions}</td>
                    <td>{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Section>

        <Section
          id="who-not"
          eyebrow="Honest advice"
          title="Who Should Not Rent a Holiday Home in Murree"
        >
          <Reveal>
            <p className="mb-6 text-[17px] hh-muted">
              It is worth being direct about this, because a badly matched booking
              is a wasted trip.
            </p>
            <ul className="space-y-4 text-[15px] leading-relaxed hh-muted">
              <li>
                <strong className="text-gray-900">Solo travellers and couples on a budget.</strong>{" "}
                You will pay for a whole house you cannot fill. A{" "}
                <Link href="/hotel-rooms-in-murree" className="hh-link">
                  room in a well-run guest house
                </Link>{" "}
                on Kashmir Point costs a fraction of it and puts you closer to the
                town.
              </li>
              <li>
                <strong className="text-gray-900">Anyone staying one night.</strong>{" "}
                Between the drive, check-in and check-out, a single night in a
                self-catering house is mostly logistics. Take a hotel room.
              </li>
              <li>
                <strong className="text-gray-900">Groups who want to be walked to dinner.</strong>{" "}
                If you want restaurants at the door and no cooking, stay on or near
                the Mall.
              </li>
              <li>
                <strong className="text-gray-900">Anyone travelling in January without checking road conditions first.</strong>{" "}
                This is not a formality in this region.
              </li>
            </ul>
          </Reveal>
        </Section>

        <section
          id="estate"
          className="py-14 md:py-20"
          style={{ background: "hsl(165 60% 18%)" }}
        >
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Reveal>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Whole-property model
              </p>
              <h2 className="text-2xl font-bold text-white md:text-4xl">
                Renting the Whole Estate: A Different Model
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/85">
                <p>
                  There is one variation on the holiday-home model in the Murree hills
                  that is worth describing separately, because it solves a problem the
                  ordinary rental market cannot.
                </p>
                <p>
                  Large family groups run into the same wall every time. Book one house
                  and half the group sleeps on floors. Book several houses and everyone
                  is scattered. Book a hotel and you are in a corridor with strangers.
                </p>
                <p>
                  Himalaya Villas, in Mohra Iswal near Kashmiri Bazar in Bhurban, is
                  built around that specific problem. The estate comprises{" "}
                  <Link href="/villas" className="text-amber-200 underline underline-offset-4 hover:text-amber-100">
                    twelve private cedar villas
                  </Link>{" "}
                  on one hillside, and it books to a single group at a time. There is no
                  shared occupancy — when a group takes the estate, the café, the
                  bonfire terrace, the barbecue area, the children&apos;s play area and
                  the trail access belong to that group for the duration.
                </p>
                <p>
                  That structure carries an obvious constraint worth stating plainly:
                  because the estate takes one group at a time, the calendar is genuinely
                  limited, and Eid and snowfall weekends are usually committed months in
                  advance.
                </p>
                <p>
                  On the infrastructure questions set out earlier — heating, water
                  storage, generator backup, road access in snow, staffing — a property
                  built as an estate rather than converted from a private house tends to
                  answer them better.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white">Checking availability</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                  The estate takes bookings directly rather than through a platform.
                  Enquiries go to WhatsApp on {SITE_CONTACT.phoneDisplay}, and the
                  fastest way to get a straight answer is to send group size, dates, and
                  the number of households travelling. For rates and{" "}
                  <Link href="/book/stay" className="text-amber-200 underline underline-offset-4">
                    checking availability
                  </Link>
                  , message directly — if the dates are taken, you will be told so.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={WHATSAPP_INLINE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hh-grad-gold hh-shadow-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold transition hover:scale-105"
                    style={{ color: "hsl(165 60% 18%)" }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Enquiry
                  </a>
                  <Link
                    href="/villas"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <Home className="h-5 w-5" />
                    View Villas
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-8 text-[15px] leading-relaxed text-white/70">
                For most trips, the honest answer is that the right holiday home in
                Murree is simply the one that matches the size of your group and the
                season you are travelling in. Get the infrastructure questions answered
                before you pay, book two nights rather than one, and go in October if
                you possibly can.
              </p>
            </Reveal>
          </div>
        </section>

        <Section id="faq" eyebrow="FAQ" title="Frequently Asked Questions About Holiday Homes in Murree">
          <div>
            {FAQS.map((item, idx) => (
              <Reveal key={item.q} delay={idx * 30}>
                <article className="hh-faq-item">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{item.q}</h3>
                  <p className="text-[15px] leading-relaxed hh-muted">{item.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <section className="border-t border-gray-200 bg-white py-10">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
                  AK
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                    About the author
                  </p>
                  <p className="mt-1 text-xl font-bold">{AUTHOR.name}</p>
                  <p className="text-sm hh-muted">{AUTHOR.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed hh-muted">{AUTHOR.bio}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="hh-grad-emerald py-12 text-white">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Reveal>
              <h2 className="text-center text-2xl font-bold md:text-3xl">
                Enquire about a holiday home or whole estate in Bhurban
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-white/80">
                Send group size, dates, and number of households — we reply with
                availability and rates for your dates.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={WHATSAPP_CLOSING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hh-grad-gold hh-shadow-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold transition hover:scale-105"
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
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-semibold backdrop-blur-sm transition hover:bg-white/20"
                >
                  Contact Page
                </Link>
              </div>
              <div className="mt-10 rounded-xl border border-white/20 bg-white/5 p-6 text-sm text-white/85">
                <p className="font-semibold text-white">{SITE_CONTACT.businessName}</p>
                <p className="mt-2">{SITE_CONTACT.addressLines.join(", ")}</p>
                <p className="mt-2">
                  <a href={telHref()} className="underline underline-offset-4">
                    {SITE_CONTACT.phoneDisplay}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${SITE_CONTACT.emails.bookings}`}
                    className="underline underline-offset-4"
                  >
                    {SITE_CONTACT.emails.bookings}
                  </a>
                </p>
                <a
                  href={SITE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-amber-200 underline underline-offset-4"
                >
                  <MapPin className="h-4 w-4" />
                  Directions on Google Maps
                </a>
              </div>
            </Reveal>
          </div>
        </footer>
      </main>
    </>
  );
}
