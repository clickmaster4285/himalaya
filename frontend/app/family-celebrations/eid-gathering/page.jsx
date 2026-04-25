"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Moon, Gift, Utensils, Home, TreePalm, Music,
    PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Dumbbell, Car, Sun, ClipboardList, Plane, Award,
    Sofa, Flame, Globe, Headphones, LayoutTemplate, FileText,
    UsersRound, Tent, Sprout, ChefHat, Camera
} from "lucide-react";

const heroSlides = [
    "/assets/eid1.webp",
    "/assets/family-reunion1.webp",
    "/assets/villa-celebration.webp",
];

const celebrationSpaces = [
    {
        title: "Grand Villa Estate",
        text: "Sprawling 6-bedroom villa with private garden, outdoor majlis, and capacity for up to 150 guests. Perfect for extended family gatherings and Eid feasts.",
        icon: Home,
    },
    {
        title: "Garden Courtyard",
        text: "Lush outdoor space with shaded seating, twinkling lights, and traditional floor cushions. Ideal for sunset iftars and morning Eid prayers with family.",
        icon: TreePalm,
    },
    {
        title: "Indoor Majlis Hall",
        text: "Elegant air-conditioned hall with Arabic seating, projector screen, and private catering kitchen. Hosts up to 80 guests for formal family reunions.",
        icon: Sofa,
    },
];

const reunionAmenities = [
    {
        title: "Full-Villa Coordination",
        text: "Dedicated event manager handles setup, catering, and clean-up — you enjoy family time",
        icon: Users,
    },
    {
        title: "Traditional Catering",
        text: "Authentic Eid feasts, lamb ouzi, mixed grills, desserts, and kids' meal options",
        icon: ChefHat,
    },
    {
        title: "Private Majlis Setup",
        text: "Arabic floor seating, cushions, low tables, and traditional decor included",
        icon: Tent,
    },
    {
        title: "Kids Activity Zone",
        text: "Supervised play area with face painting, crafts, and bouncy castle for little ones",
        icon: PartyPopper,
    },
];

const reunionPackages = [
    {
        name: "Eid Morning Gathering",
        duration: "4 Hours (Morning)",
        price: "Upon Request",
        features: [
            "Villa & garden access (4 hours)",
            "Traditional breakfast spread",
            "Arabic coffee & dates station",
            "Outdoor seating with shading",
            "Kids' activity corner",
            "Photographer for family portraits"
        ],
        icon: Sun,
    },
    {
        name: "Grand Eid Feast",
        duration: "6 Hours",
        price: "Upon Request",
        features: [
            "Full villa buyout (6 hours)",
            "Lunch buffet for 100 guests",
            "Live carving station (lamb ouzi)",
            "Dedicated event coordinator",
            "Henna artist & traditional music",
            "Family photo booth with props",
            "Eid gift bags for children"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Multi-Day Family Reunion",
        duration: "2-3 Days",
        price: "Upon Request",
        features: [
            "Weekend villa stay for 20+ family members",
            "Daily breakfast & one feast dinner",
            "BBQ night with live grilling",
            "Game night & movie screening",
            "Pool access & outdoor activities",
            "Fully equipped kitchen access",
            "Concierge for local excursions"
        ],
        icon: Crown,
    },
];

const reunionBenefits = [
    "Spacious 6-bedroom villa with 5,000 sq ft of indoor/outdoor space",
    "Private swimming pool & kids' splash area",
    "Fully equipped kitchen for catering or self-cooking",
    "Dedicated family reunion coordinator from planning to farewell",
    "Ample parking for 30+ cars and valet available",
    "Prayer space with qibla direction and prayer mats",
    "Smart TV, WiFi, and sound system throughout",
    "Flexible indoor/outdoor seating for all weather conditions",
];

const reunionSchedule = [
    { time: "8:00 AM", event: "Venue Preparation", desc: "Decor setup, seating arrangement, and catering preparation" },
    { time: "9:30 AM", event: "Family Arrival & Welcome", desc: "Arabic coffee, dates, and warm family greetings" },
    { time: "10:00 AM", event: "Eid Prayers (in garden)", desc: "Outdoor prayer area with Imam arrangement" },
    { time: "11:00 AM", event: "Family Photos & Mingling", desc: "Professional photographer captures group portraits" },
    { time: "12:30 PM", event: "Grand Eid Feast", desc: "Buffet lunch with traditional dishes and desserts" },
    { time: "2:30 PM", event: "Entertainment & Games", desc: "Henna, face painting, family competitions" },
    { time: "4:00 PM", event: "Gift Exchange & Farewell", desc: "Eid gifts distribution and warm goodbyes" },
];

const gallery = [
    "/assets/eid-feast.webp",
    "/assets/family-reunion-group.webp",
    "/assets/villa-garden.webp",
    "/assets/eid-decor.webp",
];

const faqs = [
    { q: "What's the maximum capacity for an Eid gathering?", a: "Our Grand Villa Estate accommodates up to 150 guests for seated dining, and up to 200 for standing receptions. The garden and indoor hall can be used simultaneously." },
    { q: "Do you provide catering or can we bring our own?", a: "Both options available! We have in-house traditional catering, or you're welcome to bring your own caterer or cook family recipes in our fully equipped kitchen." },
    { q: "Is there a prayer space at the venue?", a: "Yes, we have a dedicated indoor prayer room with qibla direction, prayer mats, and copies of the Quran available for guests." },
    { q: "Can we have separate areas for men and women?", a: "Absolutely. The villa layout includes separate majlis areas that can be arranged for gender-segregated gatherings if preferred." },
    { q: "Is the venue child-friendly?", a: "Yes! We offer a kids' activity zone with supervision, playground equipment, and child-safe amenities throughout the villa." },
    { q: "What about overnight stays?", a: "Our multi-day package includes overnight accommodation for up to 20 family members across 6 bedrooms. Additional rooms can be arranged." },
    { q: "Is there parking available?", a: "Yes, complimentary on-site parking for 30+ vehicles, plus overflow parking nearby. Valet service available upon request." },
    { q: "Can we bring our own decor or entertainment?", a: "Yes, you're welcome to bring personal decor, DJ, or live entertainment. Our coordinator will help integrate everything seamlessly." },
];

const testimonials = [
    {
        name: "Fatima Al Hashimi",
        event: "Eid Al Fitr Family Gathering",
        text: "The villa was perfect for our family of 45. The coordinator handled everything from the lamb ouzi to the kids' corner. Truly a stress-free Eid!",
        rating: 5,
    },
    {
        name: "Ahmed & Sara Khan",
        event: "Multi-Generational Reunion",
        text: "We booked the 3-day package for 20 family members. The pool, BBQ night, and game room kept everyone entertained. Will definitely return.",
        rating: 5,
    },
    {
        name: "Umm Khalid",
        event: "Eid Morning Gathering",
        text: "The outdoor majlis setting was beautiful. Traditional breakfast and coffee service made everyone feel at home. Highly recommended for large families.",
        rating: 5,
    },
];

export default function EidFamilyReunionsPage() {
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
                            alt="Eid gathering and family reunion"
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
                        <Moon className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Festive | Eid Gatherings & Family Reunions</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Celebrate Eid
                        <br />
                        <span className="text-[#c9a55b]">With Your Whole Family</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                        Large family experiences with full-villa coordination. From Eid feasts to multi-generational reunions,
                        our private estate brings everyone together in comfort and style.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Gathering
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Reunion Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Celebration Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Eid & Family Reunion Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Private villa estate designed for memorable family moments
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

            {/* Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Full-Villa Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything for a stress-free family celebration</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {reunionAmenities.map((amenity) => {
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

            {/* Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Eid & Reunion Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Flexible options for every family size</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {reunionPackages.map((pkg) => {
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
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Full-Villa Family Experience</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for togetherness and celebration</p>
                            <ul className="mt-6 space-y-3">
                                {reunionBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Schedule */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Clock className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Sample Timeline</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Eid Day Schedule</h3>
                            {reunionSchedule.map((item) => (
                                <div key={item.time} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{item.time}</p>
                                    <p className="text-sm text-neutral-800 font-medium">{item.event}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Timeline fully customizable to your family's traditions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Family Moments Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Memories from past Eid celebrations and reunions</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Family gathering gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What Families Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from our happy guests</p>
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

            {/* FAQ Section */}
            <section className="py-16 md:py-20 bg-white text-gray-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Family Gathering FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting your family with us
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Family Gathering</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry and we'll create a custom proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Family Name / Group Name"
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
                                <option value="" className="bg-neutral-900">Event Type</option>
                                <option className="bg-neutral-900">Eid Al Fitr Gathering</option>
                                <option className="bg-neutral-900">Eid Al Adha Celebration</option>
                                <option className="bg-neutral-900">Family Reunion</option>
                                <option className="bg-neutral-900">Multi-Generational Getaway</option>
                                <option className="bg-neutral-900">Weekend Family Retreat</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Number of Guests</option>
                                <option className="bg-neutral-900">20-50 guests</option>
                                <option className="bg-neutral-900">50-80 guests</option>
                                <option className="bg-neutral-900">80-120 guests</option>
                                <option className="bg-neutral-900">120-150 guests</option>
                                <option className="bg-neutral-900">150+ guests</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Eid Morning Gathering (4 hours)</option>
                                <option className="bg-neutral-900">Grand Eid Feast (6 hours)</option>
                                <option className="bg-neutral-900">Multi-Day Family Reunion (2-3 days)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your family gathering — special traditions, dietary needs, entertainment requests, overnight stay requirements..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Family Gathering Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our family event specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}