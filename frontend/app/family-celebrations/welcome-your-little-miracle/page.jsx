"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Flower2, Gift, Baby, Utensils, Music, Camera,
    PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Dumbbell, Car, Sun, Moon, ClipboardList, Plane, Award,
    Droplets, Cake, Balloon, Cloud, Smile, ThermometerSun, Globe,
    Headphones, LayoutTemplate, FileText, Rabbit, Stethoscope
} from "lucide-react";

const heroSlides = [
    "/assets/baby-shower1.webp",
    "/assets/gender-reveal1.webp",
    "/assets/floral-baby-shower.webp",
];

const celebrationSpaces = [
    {
        title: "Garden Dream Room",
        text: "Sunlit indoor space with floral wall, pastel drapes, and capacity for up to 60 guests. Perfect for intimate baby showers and afternoon tea celebrations.",
        icon: Flower2,
    },
    {
        title: "Secret Garden Patio",
        text: "Enchanting outdoor area with fairy lights, blooming flowers, and cozy seating. Ideal for spring baby showers and al fresco gender reveal parties.",
        icon: Sun,
    },
    {
        title: "Blush & Blue Salon",
        text: "Elegant private room with neutral decor that transforms to pink or blue. Includes reveal wall, photo backdrop, and seating for 40 family members.",
        icon: Heart,
    },
];

const babyAmenities = [
    {
        title: "Floral & Balloon Decor",
        text: "Custom floral arrangements, balloon arches, and theme-matching centerpieces included",
        icon: Flower2,
    },
    {
        title: "Gender Reveal Setup",
        text: "Confetti cannons, reveal box, smoke bombs, or cake — we arrange your surprise",
        icon: PartyPopper,
    },
    {
        title: "Gift & Dessert Table",
        text: "Styled gift table, diaper cake, cupcake stand, and personalized dessert displays",
        icon: Cake,
    },
    {
        title: "Family Photo Session",
        text: "Professional photographer for candid moments and family portraits included",
        icon: Camera,
    },
];

const babyPackages = [
    {
        name: "Sweet Tea Baby Shower",
        duration: "3 Hours",
        price: "Upon Request",
        features: [
            "Private indoor/outdoor space (3 hours)",
            "Floral centerpieces & pastel decor",
            "Afternoon tea service with desserts",
            "Diaper raffle coordination",
            "Gift opening area with seating",
            "Digital invitation design"
        ],
        icon: Heart,
    },
    {
        name: "Enchanted Garden Reveal",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Full garden patio access (4 hours)",
            "Gender reveal moment coordination",
            "Confetti cannons & reveal props",
            "Grazing table & mocktail bar",
            "Floral arch for photos",
            "On-site coordinator for the reveal",
            "Take-home favors for guests"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Dreamy Celebration",
        duration: "5 Hours",
        price: "Upon Request",
        features: [
            "Full venue buyout (5 hours)",
            "Premium florals & balloon installation",
            "Brunch or lunch buffet service",
            "Professional photographer included",
            "Live acoustic musician",
            "Custom dessert table + cake",
            "Memory guest book & wishing tree"
        ],
        icon: Crown,
    },
];

const babyBenefits = [
    "Soft floral themes and delightful family-focused arrangements",
    "Private mother-to-be suite for relaxation and photos",
    "Gender reveal props and setup included in select packages",
    "Flexible room layouts for games, dining, and gift opening",
    "Kids' corner for siblings of guests",
    "Ample parking with easy stroller access",
    "Premium sound system for music and speeches",
    "Coordination with external vendors (cake, flowers, entertainment)",
];

const celebrationSchedule = [
    { time: "1:00 PM", event: "Venue Setup & Decor", desc: "Floral arrangements, balloon arches, and dessert table styling" },
    { time: "2:00 PM", event: "Guest Arrival & Welcome", desc: "Mocktail welcome, guest book signing, and mingling" },
    { time: "2:30 PM", event: "Games & Activities", desc: "Baby bingo, onesie decorating, advice cards" },
    { time: "3:30 PM", event: "Gift Opening", desc: "Mother-to-be opens gifts with family around" },
    { time: "4:00 PM", event: "Dessert & Social Time", desc: "Cake cutting, cupcakes, and refreshments" },
    { time: "4:30 PM", event: "Family Photos & Farewell", desc: "Group photos with mom-to-be and parting favors" },
];

const gallery = [
    "/assets/baby-shower-floral.webp",
    "/assets/gender-reveal-confetti.webp",
    "/assets/diaper-cake-display.webp",
    "/assets/baby-shower-group.webp",
];

const faqs = [
    { q: "What's the maximum capacity for a baby shower?", a: "Our Garden Dream Room accommodates up to 60 guests. The outdoor patio can host up to 50, and the full venue combined can handle 80-100 guests." },
    { q: "Do you provide decorations or can we bring our own?", a: "Both options available! We offer floral and balloon decor packages, or you're welcome to bring your own theme decorations." },
    { q: "How does the gender reveal coordination work?", a: "We work with you to arrange the surprise — whether it's confetti cannons, smoke bombs, a reveal cake, or balloons. Our team handles the logistics so the moment is perfect." },
    { q: "Is there a private space for the mom-to-be?", a: "Yes, we have a dedicated mother-to-be suite where she can relax, touch up, and have quiet moments before or during the event." },
    { q: "Can we bring our own food or cake?", a: "Absolutely. You can bring your own cake and desserts. For full meals, we have catering partners or you can bring your own caterer." },
    { q: "What about games and activities?", a: "We provide game coordination assistance and can supply standard baby shower games (bingo, price is right, etc.) upon request." },
    { q: "Is parking available for guests?", a: "Yes, complimentary on-site parking for 40+ vehicles. Easy access for those carrying gifts and strollers." },
    { q: "Can we have both baby shower and gender reveal together?", a: "Yes! Many families combine both. Our Enchanted Garden package is designed for exactly that — a celebration with a surprise reveal moment." },
];

const testimonials = [
    {
        name: "Sarah Johnson",
        event: "Baby Shower for Baby Girl",
        text: "The Garden Dream Room was absolutely perfect. The floral decor was stunning, and the coordinator made sure everything ran smoothly. Such a special day!",
        rating: 5,
    },
    {
        name: "The Martinez Family",
        event: "Gender Reveal Party",
        text: "The confetti cannon moment was epic! Our families were crying tears of joy. Thank you for making our announcement unforgettable.",
        rating: 5,
    },
    {
        name: "Emily & David Chen",
        event: "Twins Baby Shower",
        text: "We had 55 guests and the space was perfect. The dessert table was beautiful, and everyone loved the photo backdrop. Highly recommend!",
        rating: 5,
    },
];

export default function BabyShowerPage() {
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
                            alt="Baby shower and gender reveal celebration"
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
                        <Baby className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Family | Baby Showers & Gender Reveal</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Welcome Your
                        <br />
                        <span className="text-[#c9a55b]">Little Miracle</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">Host your welcome your little miracle with us. Soft floral themes and delightful family-focused arrangements. Celebrate your baby shower or gender reveal in a dreamy space designed for precious moments.</p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Celebration
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Baby Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Celebration Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Baby Shower & Reveal Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Delightful settings for welcoming your bundle of joy
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
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Baby Celebration Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Floral themes and family-focused details</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {babyAmenities.map((amenity) => {
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
                        <h2 className="font-display text-3xl md:text-4xl">Baby Shower & Reveal Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Sweet packages for expecting families</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {babyPackages.map((pkg) => {
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
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Celebrating New Beginnings</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Soft, dreamy, and totally stress-free</p>
                            <ul className="mt-6 space-y-3">
                                {babyBenefits.map((item) => (
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
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Baby Shower Flow</h3>
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
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Sweet Moments Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Beautiful baby celebrations at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Baby shower gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Happy Families Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">From expecting parents and families</p>
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
                            Baby Celebration FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting your baby shower with us
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Baby Celebration</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry and we'll create a custom proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Partner's Name (optional)"
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
                                <option className="bg-neutral-900">Baby Shower</option>
                                <option className="bg-neutral-900">Gender Reveal Party</option>
                                <option className="bg-neutral-900">Combined Baby Shower + Reveal</option>
                                <option className="bg-neutral-900">Sip & See (Post-Baby)</option>
                                <option className="bg-neutral-900">Baby Sprinkle (Second Baby)</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Number of Guests</option>
                                <option className="bg-neutral-900">10-20 guests (Intimate)</option>
                                <option className="bg-neutral-900">20-40 guests</option>
                                <option className="bg-neutral-900">40-60 guests</option>
                                <option className="bg-neutral-900">60-80 guests</option>
                                <option className="bg-neutral-900">80-100 guests</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Sweet Tea Baby Shower (3 hours)</option>
                                <option className="bg-neutral-900">Enchanted Garden Reveal (4 hours)</option>
                                <option className="bg-neutral-900">Dreamy Celebration (5 hours)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your vision — color theme (pink/blue/neutral), games, catering preferences, gender reveal surprise ideas, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Baby Celebration Proposal
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