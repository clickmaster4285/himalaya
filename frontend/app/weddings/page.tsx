"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const slides = [
  {
    img: "/assets/wedding1.jpg",
    tag: "Outdoor Mandap",
    title: "Where Forever Begins",
    sub: "Sunset ceremonies under the open sky",
  },
  {
    img: "/assets/wedding2.jpg",
    tag: "Mehndi Night",
    title: "Colors of Joy",
    sub: "Marigolds, music & memories that glow",
  },
  {
    img: "/assets/wedding3.jpg",
    tag: "Walima Reception",
    title: "An Evening of Elegance",
    sub: "Crystal chandeliers & royal hospitality",
  },
  {
    img: "/assets/wedding4.jpg",
    tag: "Grand Hall",
    title: "Royal Wedding Halls",
    sub: "Where every detail is crafted to perfection",
  },
];

const services = [
  {
    icon: "💍",
    title: "Nikah Ceremony",
    desc: "Intimate, beautifully decorated nikah setups with traditional elegance.",
  },
  {
    icon: "🌸",
    title: "Mehndi Night",
    desc: "Vibrant marigold décor, fairy lights, and joyful celebrations.",
  },
  {
    icon: "👰",
    title: "Barat",
    desc: "Grand entrances, royal stages, and unforgettable photography.",
  },
  {
    icon: "🍽️",
    title: "Walima Dinner",
    desc: "Premium catering with multi-cuisine menus and live stations.",
  },
  {
    icon: "✨",
    title: "Engagement",
    desc: "Romantic, intimate setups for your first official celebration.",
  },
  {
    icon: "📸",
    title: "Photography",
    desc: "Cinematic photo & video coverage of every precious moment.",
  },
];

const gallery = [
  { src: "/assets/wedding1.jpg", label: "Outdoor Mandap" },
  { src: "/assets/wedding2.jpg", label: "Mehndi Setup" },
  { src: "/assets/wedding3.jpg", label: "Walima Hall" },
  { src: "/assets/wedding4.jpg", label: "Grand Stage" },
  { src: "/assets/wedding5.jpg", label: "Nikah Décor" },
  { src: "/assets/wedding6.jpg", label: "Floral Backdrop" },
  { src: "/assets/wedding7.jpg", label: "Fine Dining" },
  { src: "/assets/wedding8.jpg", label: "Bride & Groom" },
];

const packages = [
  {
    name: "Intimate",
    price: "PKR 4.5 Lac",
    guests: "50–100",
    features: [
      "5-hour hall venue",
      "Basic floral décor",
      "Tea & snacks catering",
      "Parking included",
    ],
  },
  {
    name: "Classic",
    price: "PKR 8.5 Lac",
    guests: "100–200",
    features: [
      "8-hour venue access",
      "Professional stage décor",
      "3-course dinner",
      "Photography",
    ],
  },
  {
    name: "Premium",
    price: "PKR 15 Lac",
    guests: "200–300",
    features: [
      "10-hour full hall",
      "Luxury décor + LED",
      "Live music & DJ",
      "Photo + video team",
    ],
  },
  {
    name: "Royal",
    price: "PKR 25 Lac",
    guests: "300–500",
    features: [
      "12-hour full estate",
      "Celebrity host option",
      "VIP lounge areas",
      "Bridal suite + gifts",
    ],
  },
];

const ceremonies = [
  {
    day: "Day 1",
    event: "Mayoun & Dholki",
    venue: "Garden Lawn",
    capacity: "150 guests",
    duration: "4 hours",
  },
  {
    day: "Day 2",
    event: "Mehndi Night",
    venue: "Outdoor Pavilion",
    capacity: "300 guests",
    duration: "6 hours",
  },
  {
    day: "Day 3",
    event: "Barat & Nikah",
    venue: "Grand Hall",
    capacity: "500 guests",
    duration: "8 hours",
  },
  {
    day: "Day 4",
    event: "Walima Reception",
    venue: "Royal Ballroom",
    capacity: "500 guests",
    duration: "6 hours",
  },
];

export default function WeddingsPage() {
  const [slide, setSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".wed-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <Navbar />

      {/* HERO SLIDER */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.img}
              alt={s.title}
              fill
              className={`object-cover transition-transform duration-[3000ms] ${
                i === slide ? "scale-100" : "scale-105"
              }`}
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <div key={slide} className="animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-xs uppercase tracking-[0.3em]">
              {slides[slide].tag}
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-[#c9a55b]">{slides[slide].title}</span>
            </h1>
            <p className="mt-6 text-base md:text-xl max-w-2xl text-white/90 font-light">
              {slides[slide].sub}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a
                href="#packages"
                className="px-8 py-4 rounded-full bg-[#c9a55b] text-white font-semibold hover:bg-[#b8944f] transition shadow-lg"
              >
                View Packages
              </a>
              <a
                href="#gallery"
                className="px-8 py-4 rounded-full border-2 border-white/80 text-white font-semibold hover:bg-white hover:text-neutral-900 transition"
              >
                Explore Gallery
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 md:py-28 px-6 max-w-5xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-[#c9a55b] font-semibold">
          Our Story
        </span>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold text-neutral-900">
          An <span className="text-[#c9a55b]">Elegant Affair</span> Awaits
        </h2>
        <p className="mt-8 text-base md:text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
          From the first mehndi to the final walima toast, we craft weddings that feel deeply personal and look
          breathtakingly beautiful. Royal halls, exquisite décor, premium catering — every detail orchestrated so you
          can simply enjoy the moment.
        </p>
      </section>

      {/* PARALLAX QUOTE */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-white text-center px-6"
        style={{
          backgroundImage: `url(/assets/wedding8.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#c9a55b]/60" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-xl md:text-3xl font-display italic leading-relaxed">
            "Two souls, one journey — celebrated under chandeliers and stars."
          </p>
          <div className="mt-6 w-24 h-px bg-white/60 mx-auto" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a55b] font-semibold">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-neutral-900">
            Every Ceremony, <span className="text-[#c9a55b]">Perfectly Crafted</span>
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-8 rounded-2xl bg-white border border-[#eadfce] hover:border-[#c9a55b] transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{s.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative py-20 md:py-28 px-6 bg-neutral-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/wedding4.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#c9a55b] font-semibold">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">
              A Wedding Beyond Imagination
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                "Award-winning floral & stage design",
                "5-star catering with multi-cuisine menus",
                "Dedicated wedding planner from day one",
                "Bridal suite, valet, and VIP lounges",
              ].map((t) => (
                <li key={t} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#c9a55b] text-white flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/wedding7.jpg"
              alt="Couple"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a55b] font-semibold">
            Gallery
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-neutral-900">
            Moments to <span className="text-[#c9a55b]">Cherish</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((g, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${
                i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={g.src}
                alt={g.label}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition translate-y-3 group-hover:translate-y-0 duration-500">
                <p className="text-xs uppercase tracking-widest text-[#c9a55b]">View</p>
                <p className="font-display text-lg">{g.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section
        id="packages"
        className="py-20 md:py-28 px-6"
        style={{ backgroundColor: "oklch(0.94 0.04 25 / 0.4)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-[#c9a55b] font-semibold">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-neutral-900">
              Wedding <span className="text-[#c9a55b]">Packages</span>
            </h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
              Tailored options for every dream and every guest list.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((p, i) => (
              <div
                key={p.name}
                className={`relative p-6 md:p-8 rounded-2xl bg-white border-2 ${
                  i === 2 ? "border-[#c9a55b] shadow-xl scale-105" : "border-transparent"
                } hover:border-[#c9a55b] transition-all hover:-translate-y-2`}
              >
                {i === 2 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c9a55b] text-white text-xs font-semibold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-neutral-900">{p.name}</h3>
                <p className="mt-2 text-3xl font-bold text-[#c9a55b]">{p.price}</p>
                <p className="mt-1 text-sm text-neutral-500">For {p.guests} guests</p>
                <div className="my-6 h-px bg-[#eadfce]" />
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <span className="text-[#c9a55b] font-bold">✓</span>
                      <span className="text-neutral-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppBookingUrl(`a ${p.name} wedding package`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block text-center px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition"
                >
                  Enquire Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEREMONIES TABLE */}
      <section id="schedule" className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a55b] font-semibold">
            4 Days of Magic
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-neutral-900">
            Ceremonies <span className="text-[#c9a55b]">Schedule</span>
          </h2>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#eadfce] shadow-lg">
          <table className="w-full">
            <thead className="bg-neutral-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-display text-base">Day</th>
                <th className="px-6 py-4 text-left font-display text-base hidden md:table-cell">Event</th>
                <th className="px-6 py-4 text-left font-display text-base hidden md:table-cell">Venue</th>
                <th className="px-6 py-4 text-left font-display text-base hidden md:table-cell">Capacity</th>
                <th className="px-6 py-4 text-left font-display text-base">Duration</th>
              </tr>
            </thead>
            <tbody>
              {ceremonies.map((c, i) => (
                <tr
                  key={c.day}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-[#f6f1ea]/50"
                  } hover:bg-[#c9a55b]/10 transition`}
                >
                  <td className="px-6 py-4 font-bold text-[#c9a55b]">{c.day}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-900">{c.event}</td>
                  <td className="px-6 py-4 text-neutral-600 hidden md:table-cell">{c.venue}</td>
                  <td className="px-6 py-4 text-neutral-600 hidden md:table-cell">{c.capacity}</td>
                  <td className="px-6 py-4 text-neutral-600">{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-20 md:py-28 px-6 text-center text-white"
        style={{
          backgroundImage: `url(/assets/wedding6.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#c9a55b]/80" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold">
            Begin Your <span className="text-white">Forever</span> Story
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/90">
            Share your dream wedding vision and let our team craft an experience beyond your imagination.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={buildWhatsAppBookingUrl("a destination wedding at Himalaya Villas & Resorts")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition shadow-xl"
            >
              Chat on WhatsApp
            </a>
            <a
              href="tel:+923000000000"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-neutral-900 transition"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
