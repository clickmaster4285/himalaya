"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    PartyPopper, Gift, Music, Camera, Wine, Cake,
    Dumbbell, Car, Sun, Moon, ClipboardList, Plane, Award,
    Balloon, Confetti, Speaker, Mic, Video, Laptop, Briefcase,
    Smile, ThermometerSun, Globe, Headphones, LayoutTemplate, FileText
} from "lucide-react";

const heroSlides = [
    "/assets/birthday1.webp",
    "/assets/birthday2.webp",
    "/assets/birthday3.webp",
];

const celebrationSpaces = [
    {
        title: "Grand Marquee Ballroom",
        text: "Majestic chandeliers, private dance floor, and capacity for up to 250 guests. Perfect for Sweet 16, 40th, 50th, and 60th jubilees with panoramic terrace view.",
        icon: PartyPopper,
    },
    {
        title: "Sky Garden Lounge",
        text: "Open-air rooftop with city views, retractable awning, fairy lights & cozy firepits. Ideal for summer milestone birthdays and sunset celebrations up to 120 guests.",
        icon: Sparkles,
    },
    {
        title: "The Gold Salon",
        text: "Art deco private dining room with vintage mirrored bar. Bespoke menus and sommelier service. Prestigious for 50th, 70th & retirement birthdays (up to 80 guests).",
        icon: Crown,
    },
];

const birthdayAmenities = [
    {
        title: "Custom Decor & Styling",
        text: "Balloon arches, themed backdrops, centerpieces, and personalized photo walls",
        icon: Gift,
    },
    {
        title: "Premium Sound System",
        text: "Wireless mics, DJ booth connection, indoor/outdoor speakers for speeches and dancing",
        icon: Speaker,
    },
    {
        title: "Party Coordination",
        text: "Dedicated milestone planner from setup to farewell — we handle every detail",
        icon: ClipboardList,
    },
    {
        title: "Gourmet Catering",
        text: "Custom birthday menus, cake cutting service, champagne toast, and late-night snacks",
        icon: Wine,
    },
];

const birthdayPackages = [
    {
        name: "Silver Sparkle",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Private venue access (4 hours)",
            "Themed balloon arch & backdrop",
            "DJ + dance floor lighting",
            "Birthday cake & sparkling toast",
            "Standard AV for speeches",
            "Dedicated party host"
        ],
        icon: Heart,
    },
    {
        name: "Golden Milestone",
        duration: "6 Hours",
        price: "Upon Request",
        features: [
            "6-hour celebration + 1hr setup",
            "Premium open bar (3 hours)",
            "Live musician or photo booth",
            "Gourmet buffet + champagne tower",
            "Venue floral design & memory slideshow",
            "VIP lounge for the celebrant",
            "Sparkler farewell moment"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Platinum Legacy",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "Full venue buyout (8 hours)",
            "Multi-generational experience zone",
            "Professional photographer + video",
            "Family-style feast or chef station",
            "Custom guest book & 'Memory Lane' display",
            "Late-night snack station",
            "Premium champagne & cigar bar"
        ],
        icon: Crown,
    },
];

const birthdayBenefits = [
    "Flexible floor plans for 20 to 250 guests — intimate or grand",
    "Private VIP suite for birthday star and family to relax",
    "Smart LED wall for memory videos and slideshows",
    "In-house pastry chef for custom milestone cakes",
    "Ample parking & valet service for all guests",
    "Wheelchair accessible throughout the venue",
    "Kids' corner and entertainment options available",
    "On-site coordination & preferred vendor recommendations",
];

const celebrationSchedule = [
    { time: "3:00 PM", event: "Venue Setup & Decor Install", desc: "Our team transforms the space with your theme and colors" },
    { time: "4:30 PM", event: "Guest Arrival & Welcome Drinks", desc: "Mocktails, champagne, and passed appetizers" },
    { time: "5:00 PM", event: "Milestone Toast & Cake Cutting", desc: "Celebrant entrance, speeches, and ceremonial cake cutting" },
    { time: "6:30 PM", event: "Dinner Service", desc: "Plated dinner or gourmet buffet stations" },
    { time: "7:30 PM", event: "Live Entertainment / Dancing", desc: "DJ, live band, or cultural performances" },
    { time: "8:30 PM", event: "Sparkler Farewell & Send-off", desc: "Grand exit with sparklers and parting gifts" },
];

const gallery = [
    "/assets/birthday-party1.webp",
    "/assets/birthday-cake.webp",
    "/assets/birthday-dancefloor.webp",
    "/assets/birthday-decor.webp",
];

const faqs = [
    { q: "What is the maximum capacity for a birthday celebration?", a: "Our Grand Marquee Ballroom accommodates up to 250 guests seated. With the Sky Garden and Salon combined, we can host up to 400 guests for larger milestone events." },
    { q: "Do you provide catering and cake?", a: "Yes! We offer customizable catering menus and can arrange a custom milestone cake through our in-house pastry chef. Dietary restrictions gladly accommodated." },
    { q: "Can we bring our own decor or vendors?", a: "Absolutely. You're welcome to bring your own decor, photographer, or DJ. Our coordinator will ensure everything integrates seamlessly." },
    { q: "Is there parking for guests?", a: "Yes, we have complimentary on-site parking for 150 vehicles, with designated VIP parking for the celebrant and family." },
    { q: "What's included in the rental time?", a: "Standard packages include setup time, event duration, and cleanup. Early access for decorating can be arranged upon request." },
    { q: "Can we have a themed birthday party (e.g., Gatsby, Masquerade)?", a: "Yes, themed parties are our specialty! Our team can help with decor, entertainment, and styling to match your vision perfectly." },
    { q: "Is the venue child-friendly?", a: "Yes, we welcome all ages. We can arrange a kids' activity corner, face painting, or child-friendly menu options." },
    { q: "How far in advance should we book?", a: "We recommend booking 3-6 months ahead for popular milestone dates (spring and summer weekends)." },
];

const testimonials = [
    {
        name: "Sophia Martinez",
        event: "30th Birthday Celebration",
        text: "The Sky Garden Lounge was magical for my 30th. The team handled every detail — from decor to the late-night tacos. My guests are still talking about it!",
        rating: 5,
    },
    {
        name: "Robert Chen",
        event: "50th Birthday Gala",
        text: "Flawless execution. The Golden Milestone package exceeded our expectations. The live band, gourmet dinner, and champagne tower made it unforgettable.",
        rating: 5,
    },
    {
        name: "Margaret O'Brien",
        event: "80th Birthday Family Reunion",
        text: "Our family came from 4 different states. The venue staff made my mother feel like royalty. The memory slideshow was so emotional and perfect.",
        rating: 5,
    },
];

export default function MilestoneBirthdaysPage() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[720px] overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, idx) => (
                        <Image
                            key={slide}
                            src={slide}
                            alt="Milestone birthday celebration"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />

                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <PartyPopper className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Popular Milestone Birthdays</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Celebrate Your
                        <br />
                        <span className="text-[#c9a55b]">Milestone Moment</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                        Turning 18, 30, 50, or 80? Host your unforgettable birthday celebration in our premium venue.
                        From intimate dinners to grand galas, we deliver joy, elegance, and lasting memories.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Party
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Birthday Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Celebration Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Birthday Celebration Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Flexible spaces for milestone celebrations of any size
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {celebrationSpaces.map((space) => {
                            const Icon = space.icon;
                            return (
                                <article key={space.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 shadow-sm hover:shadow-md transition group">
                                    <div className="mb-4 inline-flex rounded-full bg-[#f5ead7] p-2.5 text-[#9a7b3a] group-hover:bg-[#c9a55b] group-hover:text-white transition">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-900">{space.title}</h3>
                                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{space.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Birthday Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Birthday Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for a stress‑free celebration</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {birthdayAmenities.map((amenity) => {
                            const Icon = amenity.icon;
                            return (
                                <div key={amenity.title} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-6 text-center hover:shadow-md transition">
                                    <div className="mb-4 inline-flex rounded-full bg-[#c9a55b]/10 p-3 text-[#c9a55b] mx-auto">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900">{amenity.title}</h3>
                                    <p className="mt-2 text-sm text-neutral-600">{amenity.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Birthday Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Milestone Birthday Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Curated experiences for every decade</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {birthdayPackages.map((pkg) => {
                            const Icon = pkg.icon;
                            return (
                                <div key={pkg.name} className={`rounded-2xl border p-6 transition relative ${pkg.popular ? 'border-[#c9a55b] bg-white/10' : 'border-white/15 bg-white/5'} hover:bg-white/10`}>
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-[#c9a55b] text-white text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="mb-4 inline-flex rounded-full bg-white/10 p-2.5">
                                        <Icon className="h-5 w-5 text-[#c9a55b]" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                                    <p className="text-sm text-white/70 mt-1">{pkg.duration}</p>
                                    <p className="text-xl font-bold text-[#c9a55b] mt-3">{pkg.price}</p>
                                    <ul className="mt-4 space-y-2">
                                        {pkg.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                                                <CheckCircle2 className="h-4 w-4 text-[#c9a55b] mt-0.5 flex-shrink-0" />
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

            {/* Benefits & Schedule Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premium Birthday Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for joy, comfort, and unforgettable moments</p>
                            <ul className="mt-6 space-y-3">
                                {birthdayBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Celebration Schedule */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Clock className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Sample Timeline</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Birthday Celebration Schedule</h3>
                            {celebrationSchedule.map((item) => (
                                <div key={item.time} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{item.time}</p>
                                    <p className="text-sm text-neutral-800 font-medium">{item.event}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Timeline fully customizable to your vision</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Milestone Memories</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Real birthday celebrations at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Birthday gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What Our Clients Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from birthday heroes and families</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-white p-6">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#c9a55b] text-[#c9a55b]" />
                                    ))}
                                </div>
                                <p className="text-sm text-neutral-700 italic">"{t.text}"</p>
                                <div className="mt-4">
                                    <p className="font-semibold text-neutral-900">{t.name}</p>
                                    <p className="text-xs text-neutral-500">{t.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - 2 columns */}
            <section className="py-16 md:py-20 bg-white text-gray-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Birthday FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting your milestone with us
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:bg-gray-100 transition"
                            >
                                <div className="mb-3 inline-flex rounded-full bg-gray-100 p-2">
                                    <HelpCircle className="h-5 w-5 text-gray-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {f.q}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {f.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-neutral-900 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 p-4 sm:p-6 md:p-8 lg:p-10">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Milestone Birthday</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry and we'll create a custom proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Celebrant Name"
                            />
                            <input
                                type="email"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Email Address"
                            />
                            <input
                                type="tel"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Phone Number"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Milestone Age</option>
                                <option className="bg-neutral-900">18th Birthday</option>
                                <option className="bg-neutral-900">21st Birthday</option>
                                <option className="bg-neutral-900">30th Birthday</option>
                                <option className="bg-neutral-900">40th Birthday</option>
                                <option className="bg-neutral-900">50th Birthday</option>
                                <option className="bg-neutral-900">60th Birthday</option>
                                <option className="bg-neutral-900">70th Birthday</option>
                                <option className="bg-neutral-900">80th+ Birthday</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Guests</option>
                                <option className="bg-neutral-900">20-50 guests</option>
                                <option className="bg-neutral-900">50-100 guests</option>
                                <option className="bg-neutral-900">100-150 guests</option>
                                <option className="bg-neutral-900">150-200 guests</option>
                                <option className="bg-neutral-900">200-250 guests</option>
                                <option className="bg-neutral-900">250+ guests</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Silver Sparkle (4 hours)</option>
                                <option className="bg-neutral-900">Golden Milestone (6 hours)</option>
                                <option className="bg-neutral-900">Platinum Legacy (8 hours)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your vision — theme, color scheme, entertainment preferences, dietary needs, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Birthday Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our celebration specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}