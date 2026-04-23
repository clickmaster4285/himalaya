"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { CheckCircle2, Crown, HelpCircle, Users, Music, Mic, Sparkles, Moon, Star, Heart, Calendar, Clock, MapPin } from "lucide-react";

const heroSlides = [
    "/assets/qawwali-hero-1.jpg",
    "/assets/qawwali-hero-2.jpg",
    "/assets/qawwali-hero-3.jpg",
    "/assets/qawwali-hero-4.jpg",
];

const services = [
    {
        title: "Live Qawwali Performance",
        text: "Professional qawwali artists performing traditional and contemporary Sufi kalam, with full ensemble including harmonium, tabla, and backing vocals.",
        icon: Music,
    },
    {
        title: "Sufi Night Setup",
        text: "Ambient dastar-e-sufi seating with floor cushions, mood lighting, and traditional décor creating an authentic spiritual atmosphere.",
        icon: Sparkles,
    },
    {
        title: "Cultural Experience",
        text: "Complete sensory journey with dhamal space, tea service, and traditional Mehfil-e-Sama ambiance for an unforgettable evening.",
        icon: Heart,
    },
];

const experiences = [
    {
        title: "Traditional Qawwali",
        text: "Classic qawwali renditions of Amir Khusro, Bulleh Shah, and other Sufi poets.",
        icon: Mic,
    },
    {
        title: "Fusion Sufi Night",
        text: "Contemporary blend of qawwali with modern instruments for a unique experience.",
        icon: Star,
    },
    {
        title: "Private Mehfil",
        text: "Intimate gathering with personalized setlist for smaller groups (10-30 guests).",
        icon: Users,
    },
];

const benefits = [
    "Professional qawwal party with 5-8 members",
    "Traditional floor seating (dastar-e-sufi)",
    "Ambient lighting and décor setup",
    "Tea and refreshments service",
    "2-hour performance with breaks",
    "Sound system and microphone setup",
    "Customizable setlist available",
    "Photo-friendly ambiance",
];

const schedule = [
    { time: "7:00 PM", event: "Guest Arrival & Tea Service", desc: "Welcome drinks and traditional setup" },
    { time: "7:30 PM", event: "Opening Kalam", desc: "Hamd & Naat - Sufi invocation" },
    { time: "8:00 PM", event: "First Qawwali Set", desc: "Traditional qawwali classics" },
    { time: "8:45 PM", event: "Break & Refreshments", desc: "Tea, snacks, and social time" },
    { time: "9:15 PM", event: "Second Qawwali Set", desc: "High-energy qawwali and audience engagement" },
    { time: "10:00 PM", event: "Closing & Dhamal", desc: "Spiritual conclusion with dhamal space" },
];

const gallery = [
    "/assets/qawwali-gallery-1.jpg",
    "/assets/qawwali-gallery-2.jpg",
    "/assets/qawwali-gallery-3.jpg",
    "/assets/qawwali-gallery-4.jpg",
];

const faqs = [
    { q: "How long is the qawwali performance?", a: "Standard performance is 2 hours with one break. Extended sessions available on request." },
    { q: "What is the group size for the qawwal party?", a: "Typically 5-8 members including lead vocalist, harmonium player, tabla player, and backing vocals." },
    { q: "Can we request specific qawwali songs?", a: "Yes, we can accommodate a customized setlist based on your preferences and the artists' repertoire." },
    { q: "Is this suitable for corporate events?", a: "Absolutely! Sufi nights are popular for corporate dinners, product launches, and cultural events." },
    { q: "Do you provide sound system?", a: "Yes, professional sound system with microphones and speakers is included." },
    { q: "Can we add dinner with qawwali night?", a: "Yes, we can arrange dinner service before or after the performance as part of a package." },
];

const testimonials = [
    {
        name: "Fatima Ahmed",
        event: "Private Family Mehfil",
        text: "The qawwali night was magical. The artists were exceptional, and the ambiance was perfect. Our guests are still talking about it!",
        rating: 5,
    },
    {
        name: "Omar Hassan",
        event: "Corporate Dinner",
        text: "Professional setup and world-class performance. Added a unique cultural touch to our event.",
        rating: 5,
    },
];

export default function QawwaliPage() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Slider */}
            <section className="relative min-h-[720px] overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, idx) => (
                        <Image
                            key={slide}
                            src={slide}
                            alt="Sufi Qawwali evening setup"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-32 sm:pt-36 pb-16 sm:pb-20 md:pt-44">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                            <Music className="h-3.5 w-3.5 text-[#c9a55b]" />
                            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Sufi Nights</span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                            Live Sufi &amp;
                            <br />
                            Qawwali Evenings
                        </h1>
                        <p className="mt-4 sm:mt-5 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                            Experience the soulful magic of traditional qawwali and Sufi music. Perfect for intimate gatherings,
                            cultural events, weddings, and spiritual evenings under the stars.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <a href="#book" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c9a55b] px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition">
                                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                Book Sufi Night
                            </a>
                            <a href="#schedule" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition backdrop-blur-sm">
                                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                View Schedule
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
                        <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-8 sm:mb-10 text-center">
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">The Experience</p>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">Sufi Qawwali Experience</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
                            Immerse yourself in the spiritual journey of Sufi music
                        </p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <article key={service.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition group">
                                    <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2.5 text-[#9a7b3a] group-hover:bg-[#c9a55b] group-hover:text-white transition">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">{service.title}</h3>
                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">{service.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Experience Types */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Choose Your Experience</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Tailored qawwali experiences for every occasion</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {experiences.map((exp) => {
                            const Icon = exp.icon;
                            return (
                                <div key={exp.title} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 sm:p-6 text-center hover:shadow-md transition">
                                    <div className="mb-4 inline-flex rounded-full bg-[#c9a55b]/10 p-3 text-[#c9a55b] mx-auto">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">{exp.title}</h3>
                                    <p className="mt-2 text-xs sm:text-sm text-neutral-600">{exp.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 px-3 sm:px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">What's Included</span>
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Complete Sufi Night Package</h2>
                            <p className="mt-4 text-sm sm:text-base text-white/80">Everything you need for an unforgettable qawwali evening</p>
                            <ul className="mt-6 space-y-3">
                                {benefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl border border-white/20">
                            <Image src="/assets/qawwali-performance.jpg" alt="Qawwali performance" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            <section id="schedule" className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Event Schedule</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Typical evening flow for a qawwali night</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {schedule.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-4 border-b border-[#e8dfcf] last:border-0">
                                <div className="sm:w-32">
                                    <span className="inline-block bg-[#c9a55b]/10 text-[#c9a55b] font-semibold px-3 py-1 rounded-full text-xs sm:text-sm text-center">
                                        {item.time}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-base sm:text-lg text-neutral-900">{item.event}</h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Moments from Sufi Nights</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Glimpses of our magical qawwali evenings</p>
                    </div>
                    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-40 sm:h-48 md:h-52 overflow-hidden rounded-xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Sufi night gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">What Guests Say</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Memories from our Sufi evenings</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 sm:p-6">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#c9a55b] text-[#c9a55b]" />
                                    ))}
                                </div>
                                <p className="text-sm sm:text-base text-neutral-700 italic">"{t.text}"</p>
                                <div className="mt-4">
                                    <p className="font-semibold text-neutral-900">{t.name}</p>
                                    <p className="text-xs text-neutral-500">{t.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                        <p className="mt-3 text-sm sm:text-base text-white/80">Everything you need to know about qawwali evenings</p>
                    </div>
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6 hover:bg-white/10 transition">
                                <div className="mb-3 inline-flex rounded-full bg-white/10 p-2">
                                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold">{f.q}</h3>
                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-neutral-900 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-5 sm:p-6 md:p-10">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Book Your Sufi Night</h2>
                            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80">Fill out the form and we'll get back to you within 24 hours</p>
                        </div>
                        <form className="mt-6 grid gap-4 md:grid-cols-2">
                            <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Full Name" />
                            <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Phone Number" />
                            <input type="email" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Email Address" />
                            <input type="date" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition" />
                            <select className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition md:col-span-2">
                                <option value="">Select Experience Type</option>
                                <option>Traditional Qawwali Night (2 hours)</option>
                                <option>Fusion Sufi Night</option>
                                <option>Private Mehfil (Intimate)</option>
                                <option>Corporate Sufi Evening</option>
                            </select>
                            <select className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition md:col-span-2">
                                <option value="">Expected Guest Count</option>
                                <option>10-30 guests (Intimate)</option>
                                <option>30-60 guests</option>
                                <option>60-100 guests</option>
                                <option>100+ guests</option>
                            </select>
                            <textarea rows={4} className="md:col-span-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Tell us about your event, preferred dates, and any special requests (e.g., specific qawwali songs)..." />
                            <button type="submit" className="md:col-span-2 rounded-lg bg-[#c9a55b] px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741]">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}