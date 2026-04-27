"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Mic,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    BookOpen, PenTool, Quote, Feather, Coffee, Award, Globe,
    Wifi, ParkingCircle, Lamp, Armchair
} from "lucide-react";

const heroSlides = [
    "/assets/mushira.webp",
    "/assets/qawwali2.jpg",
    "/assets/mushira3.webp",
];

const venueSpaces = [
    {
        title: "Intimate Poetry Lounge",
        text: "Cozy indoor space with traditional floor seating and podium, perfect for 20-50 guests. Ideal for private mushaira gatherings.",
        icon: Armchair,
    },
    {
        title: "Grand Literary Hall",
        text: "Elegant hall with stage, theatrical lighting, and tiered seating for up to 150 guests. Features exceptional acoustics for poetry recitation.",
        icon: Lamp,
    },
    {
        title: "Outdoor Garden Majlis",
        text: "Picturesque garden setting with traditional charpoys and ambient lighting. Perfect for sunset poetry sessions and literary festivals.",
        icon: Globe,
    },
];

const venueAmenities = [
    {
        title: "Poet's Podium",
        text: "Elegant stage with traditional podium, microphone, and seating for 2-3 poets",
        icon: Award,
    },
    {
        title: "Traditional Setup",
        text: "Floor seating (dastar), cushions, and classic literary ambiance",
        icon: Coffee,
    },
    {
        title: "Sound System",
        text: "Professional audio with wireless mics for clear poetry recitation",
        icon: Mic,
    },
    {
        title: "Guest Amenities",
        text: "Complimentary WiFi, parking, coat check, and refreshment area",
        icon: Wifi,
    },
];

const venuePackages = [
    {
        name: "Intimate Mehfil",
        duration: "3 Hours",
        price: "Upon Request",
        features: [
            "Poetry Lounge (up to 50 guests)",
            "Basic sound system",
            "Traditional floor seating",
            "Tea & refreshments",
            "Event coordinator on-site"
        ],
        icon: Heart,
    },
    {
        name: "Grand Mushaira",
        duration: "5 Hours",
        price: "Upon Request",
        features: [
            "Literary Hall (up to 150 guests)",
            "Premium sound & lighting",
            "Full stage with podium",
            "Green room for poets",
            "Parking for guests",
            "Catering coordination available"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Literary Festival",
        duration: "Full Day",
        price: "Upon Request",
        features: [
            "All venue spaces",
            "Multiple session setup",
            "Book display area",
            "Full AV & recording",
            "Poet hospitality suite",
            "Marketing support"
        ],
        icon: Crown,
    },
];

const venueBenefits = [
    "Acoustically optimized for poetry and speech",
    "Traditional and contemporary setup options",
    "Professional sound system included",
    "Flexible indoor and outdoor spaces",
    "Dedicated event coordinator",
    "Green room for poets",
    "Ample on-site parking",
    "Perfect for mushaira, book launches, and literary events",
];

const literaryFeatures = [
    { category: "Seating Options", specs: "Traditional floor seating, chairs, or combination" },
    { category: "Stage Setup", specs: "Podium, poet seating, floral arrangements" },
    { category: "AV Equipment", specs: "Wireless mics, speakers, recording option" },
    { category: "Lighting", specs: "Stage spotlights, ambient, and reading lamps" },
    { category: "Hospitality", specs: "Tea service, refreshment area, poet green room" },
];

const sampleSchedule = [
    { time: "Pre-Event", event: "Venue Access", desc: "Early access for setup and poet sound check" },
    { time: "Hour 1", event: "Guest Arrival", desc: "Welcome tea and informal poetry discussions" },
    { time: "Hour 2", event: "First Session", desc: "Featured poets present classical works" },
    { time: "Hour 3", event: "Tea Break", desc: "Refreshments and poetry networking" },
    { time: "Hour 4", event: "Second Session", desc: "Contemporary poetry and open mic" },
    { time: "Hour 5", event: "Closing", desc: "Poet felicitations and event end" },
];

const gallery = [
    "/assets/mushira-gallery.jpg",
    "/assets/mushira3.webp",
    "/assets/mushira.webp",
    "/assets/qawali-gallery1.png",
];

const faqs = [
    { q: "What is the venue capacity?", a: "Our Poetry Lounge holds up to 50 guests. The Grand Literary Hall accommodates up to 150 guests. For festivals, we can host 200+ using all spaces." },
    { q: "Is sound equipment included?", a: "Yes, professional sound system with wireless microphones is included in all venue packages." },
    { q: "Can we bring our own caterer?", a: "Yes, you may bring your own caterer. We have a prep kitchen and preferred vendor list available." },
    { q: "Is parking available?", a: "Yes, complimentary on-site parking for up to 30 vehicles with additional nearby parking." },
    { q: "What are the rental hours?", a: "Standard rentals are 3-5 hours. Full day buyout (10 AM - 10 PM) available for festivals." },
    { q: "Do you provide poets?", a: "We can recommend poets from our roster, or you're welcome to book your own. Poet green room included." },
    { q: "Can we host an open mic?", a: "Absolutely! We can coordinate open mic segments with your event flow." },
    { q: "Is the venue wheelchair accessible?", a: "Yes, fully accessible with ramps and designated seating areas." },
];

const testimonials = [
    {
        name: "Dr. Fatima Hasan",
        event: "Cultural Festival",
        text: "The Literary Hall was perfect for our mushaira. Beautiful ambiance, excellent acoustics, and wonderful support staff.",
        rating: 5,
    },
    {
        name: "Ahmed Raza",
        event: "Private Family Gathering",
        text: "The Poetry Lounge created an intimate and authentic atmosphere. Our family poetry evening was magical.",
        rating: 5,
    },
    {
        name: "Sara Mahmood",
        event: "Literary Society Event",
        text: "Professional venue with traditional charm. The team went above and beyond to make our event memorable.",
        rating: 5,
    },
];

export default function MushairaVenuePage() {
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
                            alt="Mushaira venue"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <BookOpen className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Venue for Mushaira</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl">
                        Reserve Our
                        <br />
                        Literary Venue
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">Host your reserve our literary venue with us. Host your mushaira, poetry reading, or literary festival in our dedicated venue. We provide authentic ambiance, professional sound, and elegant spaces for unforgettable literary evenings.</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center">
                            Check Availability
                        </a>
                        <a href="#venue-spaces" className="inline-block rounded-md border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition backdrop-blur-sm text-center">
                            View Venue Spaces
                        </a>
                    </div>
                </div>
            </section>

            {/* Venue Spaces Section */}
            <section id="venue-spaces" className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Literary Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Choose the perfect setting for your poetry gathering
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {venueSpaces.map((space) => {
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

            {/* Venue Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Venue Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything included with your venue rental</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {venueAmenities.map((amenity) => {
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

            {/* Venue Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Venue Rental Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Choose the perfect rental option for your literary event</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {venuePackages.map((pkg) => {
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

            {/* Benefits & Literary Features Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Our Venue</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premium Literary Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Everything you need for an authentic mushaira</p>
                            <ul className="mt-6 space-y-3">
                                {venueBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Literary Features */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Feather className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Venue Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Literary Event Features</h3>
                            {literaryFeatures.map((feature) => (
                                <div key={feature.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{feature.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{feature.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Additional arrangements available upon request</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sample Schedule Section */}
            <section id="schedule" className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Sample Event Schedule</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Typical flow for a venue rental</p>
                    </div>
                    <div className="space-y-3">
                        {sampleSchedule.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-3 border-b border-[#e8dfcf] last:border-0">
                                <div className="sm:w-32">
                                    <span className="inline-block bg-[#c9a55b]/10 text-[#c9a55b] font-semibold px-3 py-1 rounded-full text-xs text-center">
                                        {item.time}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-base text-neutral-900">{item.event}</h3>
                                    <p className="text-xs text-neutral-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4" />
                            Flexible timing available based on your needs
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Venue Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Experience the ambiance of our literary spaces</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <img
                                    src={img}
                                    alt="Mushaira venue gallery"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
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
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from events at our venue</p>
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
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Venue FAQs</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Everything you need to know about booking our literary venue</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-6 hover:bg-white/10 transition">
                                <div className="mb-3 inline-flex rounded-full bg-white/10 p-2">
                                    <HelpCircle className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold">{f.q}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/80">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="book" className="py-12 sm:py-16 md:py-20 bg-neutral-900 text-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 p-4 sm:p-6 md:p-8 lg:p-10">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Reserve the Venue</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Check availability for your preferred date</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Phone Number"
                            />
                            <input
                                type="email"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Email Address"
                            />
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Venue Space</option>
                                <option className="bg-neutral-900">Intimate Poetry Lounge (up to 50 guests)</option>
                                <option className="bg-neutral-900">Grand Literary Hall (up to 150 guests)</option>
                                <option className="bg-neutral-900">Outdoor Garden Majlis (up to 100 guests)</option>
                                <option className="bg-neutral-900">Full Venue Buyout</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Rental Package</option>
                                <option className="bg-neutral-900">Intimate Mehfil (3 hours)</option>
                                <option className="bg-neutral-900">Grand Mushaira (5 hours)</option>
                                <option className="bg-neutral-900">Literary Festival (Full day)</option>
                            </select>
                            <select className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Guest Count</option>
                                <option className="bg-neutral-900">20-50 guests (Intimate)</option>
                                <option className="bg-neutral-900">50-100 guests</option>
                                <option className="bg-neutral-900">100-150 guests</option>
                                <option className="bg-neutral-900">150+ guests (Full buyout)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your event, preferred date flexibility, poet requirements, catering needs, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Send Venue Inquiry
                            </button>
                        </form>
                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            We'll respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}