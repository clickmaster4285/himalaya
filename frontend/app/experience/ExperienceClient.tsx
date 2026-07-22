// app/experience/ExperienceClient.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dawnImg from "@/public/assets/experience-dawn.jpg";
import arrivalImg from "@/public/assets/experience-arrival.jpg";
import hearthImg from "@/public/assets/experience-hearth.jpg";
import morningImg from "@/public/assets/experience-morning.jpg";
import nightImg from "@/public/assets/experience-night.jpg";
import nightImg2 from "@/public/assets/experience4.jpg";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";

// Image mapping for client-side use
const imageMap = {
  "@/public/assets/experience-arrival.jpg": arrivalImg,
  "@/public/assets/experience4.jpg": nightImg2,
  "@/public/assets/experience-morning.jpg": morningImg,
  "@/public/assets/experience-night.jpg": nightImg,
};

interface Chapter {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}

interface ExperienceClientProps {
  chapters: Chapter[];
}

export default function ExperienceClient({ chapters }: ExperienceClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // -------- HERO --------
      const heroTl = gsap.timeline({ delay: 0.15 });
      heroTl
        .from(".hero-mask", { yPercent: 100, duration: 1.4, ease: "expo.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 18, duration: 0.9, ease: "power3.out" }, "-=0.9")
        .from(
          ".hero-word",
          { opacity: 0, y: 60, rotateX: 40, duration: 1.1, stagger: 0.08, ease: "power4.out" },
          "-=0.7",
        )
        .from(".hero-rule", { scaleX: 0, transformOrigin: "left", duration: 1, ease: "power3.out" }, "-=0.4")
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .from(".hero-scroll", { opacity: 0, y: 12, duration: 0.7, ease: "power2.out" }, "-=0.4");

      gsap.to(".hero-bg", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -25,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // -------- INVITATION (intro split text) --------
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((line) => {
        gsap.from(line, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: line, start: "top 88%" },
        });
      });

      // -------- CHAPTERS (pinned image, sliding text) --------
      gsap.utils.toArray<HTMLElement>(".chapter").forEach((section) => {
        const img = section.querySelector<HTMLElement>(".chapter-img");
        const numeral = section.querySelector<HTMLElement>(".chapter-numeral");
        const eyebrow = section.querySelector<HTMLElement>(".chapter-eyebrow");
        const title = section.querySelector<HTMLElement>(".chapter-title");
        const body = section.querySelector<HTMLElement>(".chapter-body");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
        gsap.from([numeral, eyebrow, title, body].filter(Boolean), {
          opacity: 0,
          y: 40,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        });
      });

      // -------- MARQUEE --------
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      // -------- COUNTERS --------
      gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
        const target = Number(el.dataset.to || "0");
        const decimals = Number(el.dataset.decimals || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      });

      // -------- CTA --------
      gsap.from(".cta-inner > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta", start: "top 75%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-cream text-ink overflow-x-hidden">
    
  <Navbar />
      {/* ============ HERO ============ */}
      <section  id="experience-section" className="hero relative isolate h-screen min-h-[640px] overflow-hidden">
        <div className="hero-bg absolute inset-0 h-full w-full">
          <Image
            src={dawnImg}
            alt="Misty Himalayan dawn over Bhurban"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="overflow-hidden">
            <p className="hero-eyebrow text-eyebrow ">
              A Stay in Bhurban Murree
            </p>
          </div>

          <h1 className="hero-title mt-8 font-display  text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95]">
            <span className="overflow-hidden inline-block">
              <span className="hero-word inline-block">The</span>
            </span>{" "}
            <span className="overflow-hidden inline-block">
              <span className="hero-word inline-block font-serif-italic" >
                Himalaya
              </span>
            </span>
            <br />
            <span className="overflow-hidden inline-block">
              <span className="hero-word inline-block">Experience</span>
            </span>
          </h1>

          <div className="hero-rule mt-10 h-px w-24 " />

          <p className="hero-sub mt-10 max-w-xl text-base md:text-lg font-light leading-relaxed text-white/85">
            Not a hotel. A chapter you walk through —
            <br className="hidden md:inline" />
            from the first bend in the road to the last star above the pines.
          </p>

          <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/70">Begin</span>
            <span className="block h-12 w-px bg-white/40 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* sliding curtain mask */}
        <div className="hero-mask absolute inset-0  z-20 pointer-events-none" />
      </section>

      {/* ============ INVITATION ============ */}
 <section className="relative   overflow-hidden">
  {/* Subtle background accent */}
  <div className="absolute inset-0 " />
  
  <div className="mx-auto max-w-3xl px-6 pt-18 text-center relative">
    {/* Decorative element */}
  
    
    {/* <div className="overflow-hidden">
      <p className="reveal-line text-primary text-eyebrow tracking-[0.25em]">An Invitation</p>
    </div>
     */}
    <div className="mt-10 space-y-4 font-display  text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-ink">
      <div className="overflow-hidden">
        <p className="reveal-line">Some places you visit.</p>
      </div>
      <div className="overflow-hidden">
        <p className="reveal-line">
          This one, <span className="font-serif-italic text-primary">you step into.</span>
        </p>
      </div>
    </div>
    
    <div className="gold-rule mx-auto mt-12 w-16" />
    
    <div className="overflow-hidden mt-10">
      <p className="reveal-line text-ink-soft text-base md:text-lg leading-relaxed mx-auto max-w-xl">
        Below is the rhythm of a single stay at our villas in Bhurban — told the way it actually
        unfolds, hour by quiet hour.
      </p>
    </div>
    
    {/* Additional content */}
    <div className="mt-12 space-y-6 text-left max-w-2xl mx-auto">
  
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="overflow-hidden">
          <div className="reveal-line text-center">
            <span className="block font-display  text-4xl text-primary">4</span>
            <span className="block text-[10px] tracking-[0.15em] uppercase text-ink-soft/60 mt-1">Private Villas</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="reveal-line text-center">
            <span className="block font-display  text-4xl text-primary">Infinity</span>
            <span className="block text-[10px] tracking-[0.15em] uppercase text-ink-soft/60 mt-1">Mountain Views</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="reveal-line text-center">
            <span className="block font-display  text-4xl text-primary">24/7</span>
            <span className="block text-[10px] tracking-[0.15em] uppercase text-ink-soft/60 mt-1">Butler Service</span>
          </div>
        </div>
      </div>


          {/* <div className="overflow-hidden">
        <p className="reveal-line text-ink-soft/80 text-sm md:text-base leading-relaxed border-l-2 border-primary pl-6">
          No check-in queues. No generic lobbies. Just the scent of pine, 
          the crackle of a fireplace, and a valley that stretches below 
          you like a forgotten world.
        </p>
      </div> */}
      
      <div className="overflow-hidden mt-24">
        <p className="reveal-line text-xs tracking-[0.2em] uppercase text-ink-soft/50 text-center">
          — A stay that becomes a story —
        </p>
      </div>
    </div>
  </div>
</section>

      {/* ============ CHAPTERS ============ */}
      {chapters.map((c, i) => (
        <section
          key={i}
          className={`chapter relative py-14 md:py-26 ${i % 2 === 1 ? "bg-cream-deep/60" : ""}`}
        >
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative overflow-hidden">
                <div className="absolute -inset-3 border border-rule pointer-events-none z-10" aria-hidden />
                <div className="overflow-hidden aspect-[4/5] md:aspect-[5/6]">
                  <div className="chapter-img relative h-full w-full">
                    <Image
                      src={imageMap[c.image as keyof typeof imageMap] || c.image}
                      alt=""
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="chapter-numeral font-serif-italic text-7xl md:text-8xl text-primary leading-none ">
                {c.n}
              </p>
              <p className="chapter-eyebrow text-primary mt-6">{c.eyebrow}</p>
              <h2 className="chapter-title mt-5 font-display  text-3xl md:text-5xl leading-[1.1] text-ink">
                {c.title}
              </h2>
              <div className="gold-rule mt-6" />
              <p className="chapter-body mt-7 text-ink-soft text-lg leading-relaxed">{c.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* ============ MARQUEE ============ */}
      <section className="relative py-20 border-y border-rule  overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap gap-16 will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-16 shrink-0">
              {["Pine air", "Firelit nights", "Valley breakfasts", "Starlit terraces", "Hand-knotted quiet"].map(
                (w, j) => (
                  <span key={j} className="flex items-center gap-16">
                    <span className="font-serif-italic text-5xl md:text-7xl text-ink/80">{w}</span>
                    <span className="text-primary text-3xl">✦</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ NUMBERS ============ */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-eyebrow">By the Numbers</p>
            <h2 className="mt-5 font-display  text-3xl md:text-5xl text-ink leading-[1.1]">
              The quiet math of a stay
            </h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
            {[
              { to: 2300, suffix: "m", label: "Elevation above sea" },
              { to: 0, suffix: "", label: "Shared walls", note: "Zero. Truly." },
              { to: 4, suffix: "+", label: "Private balconies" },
              { to: 24, suffix: "/7", label: "On-call butler" },
            ].map((s, i) => (
              <div key={i} className="border-t border-rule pt-8">
                <p className="font-display  text-5xl md:text-6xl text-primary leading-none">
                  {s.note ? (
                    <span>{s.note}</span>
                  ) : (
                    <>
                      <span className="counter" data-to={s.to}>0</span>
                      <span>{s.suffix}</span>
                    </>
                  )}
                </p>
                <p className="mt-4 text-eyebrow text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section
        className="cta relative isolate py-36 md:py-48 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={hearthImg}
            alt="Starry night sky over Bhurban"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/70" />
        </div>
        
        <div className="cta-inner relative z-10 mx-auto max-w-2xl px-6 text-center text-white">
          <p className="text-eyebrow text-primary" >
            Your Chapter
          </p>
          <h2 className="mt-6 font-display  text-4xl md:text-6xl leading-[1.05]">
            The villa is ready.
            <br />
            <span className="italic text-primary" >
              Step in.
            </span>
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-[var(--gold)]" />
          <p className="mt-8 text-white/85 text-lg  leading-relaxed">
            Tell us when. We will light the fire and brew the first pot of tea.
          </p>
   
   
 <a
  id="reserve_your_stay"
  href={buildWhatsAppBookingUrl()}
  target="_blank"
  rel="noopener noreferrer"
  data-event-type="experience_reserve_stay_click"
  onClick={(e) =>
    trackAndOpen(e, buildWhatsAppBookingUrl(), {
      pageType: "experience",
    })
  }
  className="mt-12 rounded-sm inline-flex items-center justify-center gap-3 bg-primary px-10 py-4 text-sm tracking-[0.22em] uppercase font-medium hover:bg-primary/80 transition-colors duration-500"
>
  Reserve your stay
</a>


          <p className="mt-6 text-xs tracking-[0.2em] uppercase text-white/60">
            WhatsApp +92 304 567 9000
          </p>
        </div>
      </section>

       <Footer />
    </div>
  );
}