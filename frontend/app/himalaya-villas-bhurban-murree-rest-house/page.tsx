"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroVilla from "@/public/assets/hero-villa.jpg";
import villaInterior from "@/public/assets/villa-interior.jpg";
import villaTerrace from "@/public/assets/villa-terrace.jpg";
import villaSuite from "@/public/assets/villa-suite.jpg";
import { BedDouble, Check, ConciergeBell, UtensilsCrossed } from "lucide-react";

const galleryImages = [
  heroVilla,
  villaInterior,
  villaTerrace,
  villaSuite,
];

export default function HimalayaVillasBhurbanMurreeRestHouse() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.9, delay: 0.15 });
      gsap.from(".hero-tagline", { opacity: 0, y: 14, duration: 1, delay: 0.7 });
      gsap.from(".hero-rule", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.85,
      });

      // Parallax hero image
      gsap.to(".hero-image", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal animations for sections
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      // Staggered cards
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        const children = el.querySelectorAll(".stagger-item");
        gsap.from(children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <div ref={rootRef} className="text-[#1b1b1b] min-h-screen">
        {/* HERO */}
        <header
          ref={heroRef}
          className="relative isolate overflow-hidden h-[88vh] min-h-[600px]"
        >
          <Image
            src={heroVilla}
            alt="Himalaya Villas Bhurban - Luxury mountain villa with panoramic views"
            fill
            priority
            className="hero-image object-cover scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-4xl text-center text-white">
              <p className="hero-eyebrow text-sm  tracking-widest  mb-4">
                Luxury Mountain Retreat
              </p>

              <h1 className="text-4xl md:text-7xl font-display leading-tight">
                Himalaya Villas
                <span className="block text-2xl md:text-7xl font-light mt-2 text-[#c9a55b]">
                  Bhurban, Murree Hills
                </span>
              </h1>

              <p className="hero-tagline mt-6 text-lg text-white/85 max-w-2xl mx-auto">
                Private luxury villas nestled in the pine forests of Murree Hills — 
                where Himalayan views meet world-class hospitality
              </p>

              {/* <div className="hero-rule mx-auto mt-8 h-px w-24 bg-[#c9a55b]" /> */}

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/923045679000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#c9a55b] hover:bg-[#b8944a] text-[#1b1b1b] font-semibold px-10 py-4 rounded-sm transition-colors"
                >
                  Book on WhatsApp
                </a>
                <a
                  href="#packages"
                  className="inline-block border border-white/40 hover:border-white text-white font-semibold px-10 py-4 rounded-sm transition-colors"
                >
                  View Packages
                </a>
              </div>

              <div className="mt-12 flex justify-center gap-12 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-light text-[#c9a55b]">45</div>
                  <div className="text-white/60">Minutes from Islamabad</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-[#c9a55b]">6,500</div>
                  <div className="text-white/60">Feet Above Sea Level</div>
                </div>
                <div className="text-center">
  <div className="text-2xl font-light text-[#c9a55b]">24/7</div>
  <div className="text-white/60">Guest Support</div>
</div>
              </div>
            </div>
          </div>
        </header>

        {/* GALLERY */}
        {/* <section className="py-24 bg-[#fbf7ee]">
          <div className="max-w-7xl mx-auto px-6" data-reveal>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
                Gallery
              </p>
              <h2 className="text-3xl md:text-4xl font-display text-[#1b1b1b]">
                Experience the Luxury
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-[280px]">
                    <Image
                      src={img}
                      alt={`Himalaya Villas gallery ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* WHY CHOOSE US */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6" data-reveal>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-4xl font-display text-[#1b1b1b]">
                The Himalaya Villas Difference
              </h2>
            </div>

            <div data-stagger className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: "🔒",
                  title: "Complete Privacy",
                  description: "Exclusive villa ownership with no shared spaces"
                },
                {
                  icon: "🍽️",
                  title: "Halal Certified",
                  description: "100% Halal kitchen with premium dining"
                },
                {
                  icon: "🏔️",
                  title: "Panoramic Views",
                  description: "Unobstructed Himalayan mountain vistas"
                },
                {
                  icon: "✨",
                  title: "White Glove Service",
                  description: "Dedicated villa host & concierge service"
                }
              ].map((feature, i) => (
                <div key={i} className="stagger-item text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1b1b1b] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTY OVERVIEW */}
        <section className="py-24 bg-[#fbf7ee] border-y border-[#e5dfcf]">
          <div className="max-w-7xl mx-auto px-6" data-reveal>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
                  Overview
                </p>
                <h2 className="text-3xl md:text-4xl font-display text-[#1b1b1b] mb-6">
                  A Mountain Sanctuary
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Himalaya Villas is a premium luxury villa property located in Bhurban, 
                    Murree Hills, Pakistan — at an elevation that delivers cool mountain air, 
                    unobstructed Himalayan views, and natural pine forest surroundings year-round.
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-[#1b1b1b]">Check-In:</span> 3:00 PM &nbsp;|&nbsp; 
                    <span className="font-semibold text-[#1b1b1b]"> Check-Out:</span> 12:00 PM &nbsp;|&nbsp;
                    <span className="font-semibold text-[#1b1b1b]"> Minimum Stay:</span> 2 nights
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Elevation", value: "6,500+ feet" },
                  { label: "Setting", value: "Pine forest" },
                  { label: "Region", value: "Murree Hills" },
                  { label: "Food", value: "100% Halal" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-[#c9a55b] pl-4">
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-[#1b1b1b] font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>










 {/* AMENITIES */}
<section className="relative overflow-hidden py-28 bg-[#faf7f2]">
  {/* Decorative Background */}
  <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c9a55b]/10 blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <p className="text-sm uppercase tracking-[0.35em] text-[#b8944a] mb-3">
        Amenities
      </p>

      <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b]">
        Villa Features & Services
      </h2>

      <p className="mt-5 max-w-2xl mx-auto text-gray-600 leading-relaxed">
        Every stay is thoughtfully designed to deliver exceptional comfort,
        personalized hospitality, and unforgettable mountain experiences.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {[
        {
          title: "Accommodation",
          icon: BedDouble,
          items: [
            "Private villas with dedicated entrance",
            "Floor-to-ceiling mountain view windows",
            "Premium beds with luxury linen",
            "Modern self-catering kitchen",
            "Fireplace & central heating",
          ],
        },
        {
          title: "Dining",
          icon: UtensilsCrossed,
          items: [
            "Private in-villa dining",
            "Pakistani & Continental cuisine",
            "Private BBQ terrace",
            "Fresh breakfast & afternoon tea",
            "100% Halal certified kitchen",
          ],
        },
        {
          title: "Services",
          icon: ConciergeBell,
          items: [
            "Dedicated villa host",
            "24/7 concierge assistance",
            "Guided mountain walks",
            "Private bonfire evenings",
            "Airport transfer service",
          ],
        },
      ].map((category, i) => {
        const Icon = category.icon;

        return (
          <div
            key={i}
            className="rounded-3xl border border-[#e8dfcf] bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#c9a55b] hover:shadow-xl"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8f2e4]">
              <Icon className="h-8 w-8 text-[#b8944a]" />
            </div>

            <h3 className="mb-6 text-2xl font-display text-[#1b1b1b]">
              {category.title}
            </h3>

            <ul className="space-y-4">
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8f2e4]">
                    <Check className="h-3.5 w-3.5 text-[#c9a55b]" />
                  </div>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
</section>













{/* PACKAGES */}
{/* <section id="packages" className="py-24 bg-[#fbf7ee] border-y border-[#e5dfcf] relative overflow-hidden">

  <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 bg-gradient-to-l from-[#c9a55b] to-transparent pointer-events-none"></div>
  
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
      <p className="text-sm uppercase tracking-[0.3em] text-[#a68b3b] mb-4 font-medium">
        Packages
      </p>
      <h2 className="text-4xl md:text-5xl font-display text-[#1b1b1b] mb-3">
        Choose Your Experience
      </h2>
     
      <p className="text-[#4a4a4a] mt-4 max-w-md mx-auto">
        Curated experiences designed for every occasion
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          name: "Family Mountain Escape",
          guests: "4-8 Guests",
          price: "PKR 80,000 - 150,000",
          duration: "2-3 Nights",
          features: ["Breakfast & Dinner", "Villa Host Service", "Kids Activities", "Private BBQ Terrace"],
          popular: false,
          icon: "👨‍👩‍👧‍👦"
        },
        {
          name: "Honeymoon Sanctuary",
          guests: "2 Guests",
          price: "PKR 65,000 - 95,000",
          duration: "2 Nights",
          features: ["Suite with Views", "Romantic Dinner", "Private Bonfire", "Champagne Welcome"],
          popular: true,
          icon: "🛖"
        },
        {
          name: "Corporate Retreat",
          guests: "10-50 Guests",
          price: "PKR 180,000+",
          duration: "2+ Nights",
          features: ["Conference Room", "All Meals", "Team Activities", "AV Equipment"],
          popular: false,
          icon: "🏔️"
        }
      ].map((pkg, i) => (
        <div
          key={i}
          className={`relative bg-white rounded-2xl overflow-hidden ${
            pkg.popular 
              ? "shadow-2xl border-2 border-[#c9a55b] scale-105" 
              : "shadow-lg border border-[#e5dfcf]"
          }`}
        >
         
          {pkg.popular && (
            <div className="absolute top-0 right-0 z-10">
              <div className="bg-[#c9a55b] text-[#1b1b1b] text-xs font-bold px-6 py-2 rotate-45 translate-x-8 translate-y-0 w-40 text-center">
                MOST POPULAR
              </div>
            </div>
          )}

        
          <div className="p-8 pt-10">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{pkg.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-[#1b1b1b]">
                  {pkg.name}
                </h3>
              </div>
            </div>

           
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {pkg.guests}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {pkg.duration}
              </span>
            </div>

            
            <div className="my-4">
              <span className="text-3xl font-bold text-[#c9a55b]">
                {pkg.price}
              </span>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#e5dfcf] to-transparent my-4"></div>

  
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-700">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fbf7ee] text-[#c9a55b] mr-3 text-xs font-bold flex-shrink-0">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

       
            <a
              href="https://wa.me/923045679000"
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full rounded-xl py-4 px-6 font-semibold text-center ${
                pkg.popular
                  ? "bg-[#c9a55b] hover:bg-[#b8944a] text-[#1b1b1b]"
                  : "bg-[#1b1b1b] hover:bg-[#2a2a2a] text-white"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Book Now
              </span>
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section> */}

















        {/* FAQ */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6" data-reveal>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-display text-[#1b1b1b]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How far is Himalaya Villas from Islamabad?",
                  a: "Approximately 45-60 minutes by road from central Islamabad via M-1 Motorway and Murree road."
                },
                {
                  q: "Is the food fully Halal?",
                  a: "Yes. All food preparation at Himalaya Villas is 100% Halal across all dining services."
                },
                {
                  q: "Can you accommodate corporate retreats?",
                  a: "Yes. We offer conference setup, AV equipment, group dining, and confidential private surroundings."
                }
              ].map((faq, i) => (
                <div key={i} className="border-l-2 border-[#c9a55b] pl-6">
                  <h3 className="text-lg font-semibold text-[#1b1b1b] mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
       <section
  className="relative overflow-hidden py-28 bg-cover bg-center bg-no-repeat text-white"
  style={{ backgroundImage: `url(${villaTerrace.src})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70" />


  <div className="relative max-w-4xl mx-auto px-6 text-center">
    <p className="text-sm uppercase tracking-[0.35em] text-[#d4b46a] mb-4">
      Book Your Stay
    </p>

    <h2 className="text-4xl md:text-6xl font-display leading-tight mb-6">
      Ready to Escape to the Mountains?
    </h2>

    <p className="text-white/80 text-lg leading-8 max-w-2xl mx-auto mb-10">
      Tell us your dates, group size, and occasion. We'll confirm availability
      quickly and help you plan an unforgettable mountain getaway.
    </p>

    <div className="flex flex-col sm:flex-row gap-5 justify-center">
      <a
        href="https://wa.me/923045679000"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl bg-[#c9a55b] px-10 py-4 font-semibold text-[#1b1b1b] transition-all duration-300 hover:bg-[#b8944a] hover:shadow-[0_10px_30px_rgba(201,165,91,0.4)]"
      >
        WhatsApp Now
      </a>

      <a
        href="/contact"
        className="rounded-xl border border-white/30 bg-white/10 px-10 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20"
      >
        Contact Form
      </a>
    </div>

    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
      <span>✓ Instant Response</span>
      <span>✓ Best Rate Guarantee</span>
      <span>✓ 24/7 Support</span>
    </div>
  </div>
</section>

        <Footer />
      </div>
    </>
  );
}