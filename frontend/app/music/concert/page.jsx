"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Music, Mic,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Guitar, Piano, Headphones, Volume2, ListMusic, Award
} from "lucide-react";

const heroSlides = [
    "/assets/concert1.jpg",
    "/assets/concert2.jpg",
    "/assets/concert3.jpg",
    
];

const concertTypes = [
    {
        title: "Classical Recital",
        text: "Solo piano, violin, or cello performances featuring classical masterpieces from Mozart, Beethoven, Chopin, and more.",
        icon: Piano,
    },
    {
        title: "Acoustic Ensemble",
        text: "Intimate acoustic sets with guitar, vocals, violin, and flute — perfect for cocktail hours and dinner parties.",
        icon: Guitar,
    },
    {
        title: "Jazz Evening",
        text: "Smooth jazz trio or quartet performances creating a sophisticated, relaxed ambiance.",
        icon: Headphones,
    },
];

const services = [
    {
        title: "Artist Booking",
        text: "Professional classical and acoustic musicians with extensive performance experience.",
        icon: Mic,
    },
    {
        title: "Sound & Acoustics",
        text: "High-quality sound system, acoustic treatment, and professional sound engineering.",
        icon: Volume2,
    },
    {
        title: "Stage & Ambiance",
        text: "Elegant stage setup with mood lighting, floral arrangements, and intimate seating arrangements.",
        icon: Sparkles,
    },
    {
        title: "Setlist Curation",
        text: "Customized musical program tailored to your event theme and guest preferences.",
        icon: ListMusic,
    },
];

const packages = [
    {
        name: "Intimate Hour",
        duration: "1 Hour",
        price: "Upon Request",
        features: [
            "Solo artist performance",
            "12-15 pieces",
            "Basic sound setup",
            "Perfect for private dinners"
        ],
        icon: Heart,
    },
    {
        name: "Evening Concert",
        duration: "2 Hours",
        price: "Upon Request",
        features: [
            "Duo or trio ensemble",
            "25-30 pieces",
            "Full sound system",
            "Stage lighting",
            "Break interval with refreshments"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Gala Performance",
        duration: "3+ Hours",
        price: "Upon Request",
        features: [
            "Full ensemble (4-6 artists)",
            "Custom setlist",
            "Premium sound & lighting",
            "Professional MC",
            "Meet & greet with artists",
            "Recording option available"
        ],
        icon: Crown,
    },
];

const benefits = [
    "Professional classically trained musicians",
    "Custom setlist for your event theme",
    "High-quality sound reinforcement",
    "Elegant stage and ambiance design",
    "Flexible indoor or outdoor setup",
    "Option for live recording",
    "Meet and greet with artists available",
    "Perfect for corporate events, weddings, and private parties",
];

const repertoire = [
    { category: "Classical", pieces: "Beethoven, Mozart, Chopin, Bach, Vivaldi, Debussy" },
    { category: "Jazz", pieces: "Standards, Smooth Jazz, Bossa Nova, Latin Jazz" },
    { category: "Acoustic Pop", pieces: "Contemporary hits, Unplugged versions, Soft rock" },
    { category: "Film & Broadway", pieces: "Movie soundtracks, Musical theater classics" },
    { category: "World Music", pieces: "Folk, Traditional, Ambient, Fusion" },
];

const schedule = [
    { time: "Pre-Event", event: "Sound Check & Setup", desc: "Artists arrive for sound check and stage preparation" },
    { time: "0:00 - 0:15", event: "Opening Set", desc: "Welcome music as guests arrive and settle in" },
    { time: "0:15 - 0:45", event: "First Performance Set", desc: "Main performance program begins" },
    { time: "0:45 - 1:00", event: "Intermission", desc: "Break with refreshments (for longer concerts)" },
    { time: "1:00 - 1:45", event: "Second Performance Set", desc: "Continued program with varied repertoire" },
    { time: "1:45 - 2:00", event: "Closing & Encore", desc: "Finale pieces and optional artist interaction" },
];

const gallery = [
    "/assets/concert-gallery-1.jpg",
    "/assets/concert-gallery-2.jpg",
    "/assets/concert-gallery-3.jpg",
    "/assets/concert-gallery-4.jpg",
];

const faqs = [
    { q: "What types of music can be arranged?", a: "We offer classical, jazz, acoustic pop, film scores, world music, and custom repertoire based on your preferences." },
    { q: "How many musicians will perform?", a: "Options range from solo artists to full ensembles of 6+ musicians, depending on your event size and budget." },
    { q: "Can we request specific songs?", a: "Absolutely! We work with you to create a custom setlist that matches your event theme and guest preferences." },
    { q: "Do you provide sound equipment?", a: "Yes, professional sound system, microphones, and speakers are included. For larger venues, we can arrange additional equipment." },
    { q: "Is this suitable for outdoor events?", a: "Yes, we can perform outdoors weather permitting. We'll discuss setup requirements based on your venue." },
    { q: "How far in advance should we book?", a: "We recommend booking 4-6 weeks in advance to secure preferred artists and dates." },
    { q: "Can we combine this with dinner service?", a: "Yes, we can coordinate with catering for seamless dinner and music flow." },
    { q: "Do you provide recorded music for breaks?", a: "Yes, curated background music can be provided during breaks or pre-event." },
];

const testimonials = [
    {
        name: "Sarah & David Khan",
        event: "Wedding Reception",
        text: "The string quartet was absolutely breathtaking. Our guests couldn't stop raving about the music. It made our evening truly magical.",
        rating: 5,
    },
    {
        name: "Imran Ali",
        event: "Corporate Gala",
        text: "Professional from start to finish. The jazz trio created the perfect atmosphere for our high-profile client dinner.",
        rating: 5,
    },
    {
        name: "Ayesha Malik",
        event: "Private Birthday Celebration",
        text: "The classical pianist was incredible. Such a unique and elegant touch to our celebration. Highly recommend!",
        rating: 5,
    },
];

export default function ConcertPage() {
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
                            alt="Private concert setup"
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
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 mb-4 sm:mb-5">
                            <Music className="h-3.5 w-3.5 text-[#c9a55b]" />
                            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Live Music Experiences</span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                            Private Musical
                            <br />
                            Concerts
                        </h1>
                        <p className="mt-4 sm:mt-5 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                            Exclusive classical and acoustic performances for private guests.
                            Create an unforgettable evening with world-class musicians in an intimate setting.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <a href="#book" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c9a55b] px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition">
                                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                Book a Concert
                            </a>
                            <a href="#packages" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition backdrop-blur-sm">
                                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                View Packages
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

            {/* Concert Types Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-8 sm:mb-10 text-center">
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Choose Your Style</p>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 mt-2">Concert Experiences</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
                            Select from a variety of musical genres and ensemble sizes
                        </p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {concertTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <article key={type.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition group">
                                    <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2.5 text-[#9a7b3a] group-hover:bg-[#c9a55b] group-hover:text-white transition">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">{type.title}</h3>
                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">{type.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">What We Provide</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">End-to-end concert production</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 text-center hover:shadow-md transition">
                                    <div className="mb-4 inline-flex rounded-full bg-[#c9a55b]/10 p-3 text-[#c9a55b] mx-auto">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{service.title}</h3>
                                    <p className="mt-2 text-xs sm:text-sm text-neutral-600">{service.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section id="packages" className="py-12 sm:py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Concert Packages</h2>
                        <p className="mt-3 text-sm sm:text-base text-white/80">Choose the perfect musical experience for your event</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {packages.map((pkg) => {
                            const Icon = pkg.icon;
                            return (
                                <div key={pkg.name} className={`rounded-2xl border p-5 sm:p-6 transition relative ${pkg.popular ? 'border-[#c9a55b] bg-white/10' : 'border-white/15 bg-white/5'} hover:bg-white/10`}>
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-[#c9a55b] text-white text-[9px] sm:text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="mb-4 inline-flex rounded-full bg-white/10 p-2.5">
                                        <Icon className="h-5 w-5 text-[#c9a55b]" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold">{pkg.name}</h3>
                                    <p className="text-xs sm:text-sm text-white/70 mt-1">{pkg.duration}</p>
                                    <p className="text-lg sm:text-xl font-bold text-[#c9a55b] mt-3">{pkg.price}</p>
                                    <ul className="mt-4 space-y-2">
                                        {pkg.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-[#c9a55b] mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits & Repertoire Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-3 sm:px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl text-neutral-900">Premium Concert Experience</h2>
                            <p className="mt-3 text-sm sm:text-base text-neutral-600">Everything included for a flawless performance</p>
                            <ul className="mt-6 space-y-3">
                                {benefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Repertoire */}
                        <div className="bg-[#faf7f0] rounded-2xl p-5 sm:p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-3 sm:px-4 py-1.5 mb-4">
                                <ListMusic className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Sample Repertoire</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4">Musical Selections</h3>
                            {repertoire.map((cat) => (
                                <div key={cat.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-sm sm:text-base">{cat.category}</p>
                                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">{cat.pieces}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Custom setlists available upon request</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Schedule Section */}
            <section id="schedule" className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Event Flow</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Typical timeline for a private concert</p>
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
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Concert Gallery</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">Memorable performances from past events</p>
                    </div>
                    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-40 sm:h-48 md:h-52 overflow-hidden rounded-xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Concert gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f0]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">Guest Testimonials</h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-600">What our clients say about their concert experience</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-white p-5 sm:p-6">
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
                        <p className="mt-3 text-sm sm:text-base text-white/80">Everything you need to know about private concerts</p>
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
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Book Your Concert</h2>
                            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80">Fill out the form and we'll create your perfect musical evening</p>
                        </div>
                        <form className="mt-6 grid gap-4 md:grid-cols-2">
                            <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Full Name" />
                            <input className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Phone Number" />
                            <input type="email" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Email Address" />
                            <input type="date" className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition" />
                            <select className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition md:col-span-2">
                                <option value="">Select Concert Type</option>
                                <option>Classical Recital (Solo)</option>
                                <option>Acoustic Ensemble (Duo/Trio)</option>
                                <option>Jazz Evening (Trio/Quartet)</option>
                                <option>Custom Program</option>
                            </select>
                            <select className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition md:col-span-2">
                                <option value="">Expected Guest Count</option>
                                <option>10-30 guests (Intimate)</option>
                                <option>30-60 guests</option>
                                <option>60-100 guests</option>
                                <option>100-200 guests</option>
                                <option>200+ guests</option>
                            </select>
                            <select className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition md:col-span-2">
                                <option value="">Preferred Duration</option>
                                <option>1 Hour (Intimate Hour)</option>
                                <option>2 Hours (Evening Concert)</option>
                                <option>3+ Hours (Gala Performance)</option>
                            </select>
                            <textarea rows={4} className="md:col-span-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60" placeholder="Tell us about your event, preferred musical style, any specific pieces you'd like to request, and special requirements..." />
                            <button type="submit" className="md:col-span-2 rounded-lg bg-[#c9a55b] px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741]">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}