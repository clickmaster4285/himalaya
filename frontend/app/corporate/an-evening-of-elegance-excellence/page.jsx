"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Sparkles, Star,
    Heart, Calendar, Clock, MapPin, Gift, Award,
    ChefHat, Utensils, Mic, Wine, Diamond, PartyPopper,
    Speaker, Lightbulb, Music, Camera, Tv, Zap
} from "lucide-react";

const heroSlides = [
    "/assets/award1.webp",
    "/assets/award2.webp",
    "/assets/award3.webp",
];

const diningSpaces = [
    {
        title: "Grand Ballroom",
        text: "Opulent column-free ballroom with crystal chandeliers, elevated stage, and seated capacity for up to 350 guests. Perfect for award galas and formal dinners.",
        icon: Crown,
    },
    {
        title: "The Conservatory",
        text: "Elegant glass-enclosed space with garden views, seating for 120 guests. Ideal for VIP receptions and intimate award ceremonies.",
        icon: Wine,
    },
    {
        title: "Presidential Suite",
        text: "Private 50-seat dining room with dedicated butler service, perfect for honoree dinners and exclusive pre-gala receptions.",
        icon: Diamond,
    },
];

const diningAmenities = [
    {
        title: "Gourmet Catering",
        text: "Multi-course plated dinners, wine pairings, and custom menu design by executive chefs",
        icon: ChefHat,
    },
    {
        title: "Award Presentation",
        text: "Professional stage with podium, teleprompter, and dramatic award reveal lighting",
        icon: Award,
    },
    {
        title: "Red Carpet Experience",
        text: "Step-and-repeat backdrop, professional photography, and paparazzi-style lighting",
        icon: Camera,
    },
    {
        title: "Live Entertainment",
        text: "Stage for live band, orchestra, or DJ with full sound and dance floor lighting",
        icon: Music,
    },
];

const diningPackages = [
    {
        name: "Silver Gala",
        duration: "5 Hours",
        price: "Upon Request",
        features: [
            "Grand Ballroom access",
            "3-course plated dinner",
            "Basic stage & sound system",
            "Award presentation setup",
            "Venue coordinator"
        ],
        icon: Heart,
    },
    {
        name: "Gold Gala Experience",
        duration: "6 Hours",
        price: "Upon Request",
        features: [
            "Full ballroom with dance floor",
            "4-course chef's tasting menu",
            "Premium sound & lighting",
            "Red carpet photo moment",
            "Live band stage setup",
            "Dedicated event manager",
            "Champagne toast included"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Platinum Awards Night",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "Full venue buyout",
            "5-course gourmet dinner with wine pairings",
            "Full production team",
            "Red carpet with paparazzi",
            "Professional emcee",
            "Live 10-piece orchestra",
            "Post-gala afterparty",
            "VIP green room for honorees"
        ],
        icon: Crown,
    },
];

const diningBenefits = [
    "Elegant column-free ballroom with crystal chandeliers",
    "Custom menu design by award-winning executive chefs",
    "Professional stage with dramatic award presentation lighting",
    "Red carpet step-and-repeat with professional photography",
    "Dedicated event manager and protocol coordinator",
    "VIP green room and honoree hospitality suite",
    "Full sound system with wireless microphones",
    "Dance floor with professional lighting and DJ booth",
];

const technicalSpecs = [
    { category: "Seating Capacity", specs: "350 guests (banquet), 500 guests (reception style)" },
    { category: "Stage & AV", specs: "24' x 16' elevated stage, podium, teleprompter, wireless mics" },
    { category: "Lighting", specs: "Dimmable chandeliers, spotlights, wash lights, dance floor effects" },
    { category: "Catering", specs: "On-site commercial kitchen, custom menus, dietary accommodations" },
    { category: "Dining Setup", specs: "Round tables of 8-10, linens, china, glassware, centerpieces included" },
];

const galaSchedule = [
    { time: "6:00 PM", event: "Red Carpet Arrivals", desc: "Guests arrive, photography, champagne reception" },
    { time: "7:00 PM", event: "Seated Dinner", desc: "First course served, welcome remarks" },
    { time: "8:00 PM", event: "Award Ceremony", desc: "Presentations, honoree speeches, video tributes" },
    { time: "9:00 PM", event: "Dessert & Toast", desc: "Champagne toast, celebratory remarks" },
    { time: "9:30 PM", event: "Live Entertainment", desc: "Band performance or DJ and dancing" },
    { time: "11:00 PM", event: "Grand Finale", desc: "Last call, guest departures" },
];

const gallery = [
    "/assets/award1.webp",
    "/assets/award2.webp",
    "/assets/award3.webp",
    "/assets/retreat1.webp",
];

const faqs = [
    { q: "What is the maximum seated capacity for a gala dinner?", a: "Our Grand Ballroom seats up to 350 guests for a plated dinner. The Conservatory seats 120, and we can accommodate up to 500 guests for reception-style events." },
    { q: "Do you provide catering and bar services?", a: "Yes, we have on-site executive chefs who create custom multi-course menus. We offer full bar service with premium wine pairings, champagne toasts, and signature cocktails." },
    { q: "Can we honor special guests or award recipients?", a: "Absolutely. We provide VIP green rooms, honoree hospitality suites, and can arrange red carpet moments, dedicated seating, and personalized tributes during the ceremony." },
    { q: "Is AV equipment included for presentations?", a: "Yes, all packages include stage, podium, wireless microphones, and projection screens. Premium packages add teleprompters, video playback, and dramatic award lighting." },
    { q: "How far in advance should we book?", a: "We recommend booking 3-6 months in advance for galas, especially during peak season (September-December and April-June). Weekend dates fill quickly." },
];

const testimonials = [
    {
        name: "Jennifer Williams",
        event: "Annual Charity Gala",
        text: "The Grand Ballroom was breathtaking. Our guests are still talking about the red carpet entrance and the incredible 5-course dinner. Flawless execution!",
        rating: 5,
    },
    {
        name: "Robert Harrington",
        event: "Industry Awards Night",
        text: "From protocol to production, everything was perfect. The team handled VIP arrangements seamlessly and the stage presence was world-class.",
        rating: 5,
    },
    {
        name: "Amira Khan",
        event: "Nonprofit Benefit Dinner",
        text: "The elegance and attention to detail made our fundraiser unforgettable. The chef accommodated all dietary needs and the service was impeccable.",
        rating: 5,
    },
];

export default function GalaDinnerVenuePage() {
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
                            alt="Gala dinner venue"
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-1000 ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                {/* Balanced dark overlay - 50% instead of 60% for better image visibility */}
                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

                {/* Soft gradient at bottom for extra text contrast without losing image detail */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />

                <Navbar />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/20 backdrop-blur-sm px-4 py-1.5 mb-5">
                        <Diamond className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Award Dinners & Gala Nights</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        An Evening of
                        <br />
                        Elegance & Excellence
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">Host your an evening of elegance & excellence with us. Host an unforgettable award gala or formal dinner in our luxurious venue. From red carpet arrivals to champagne toasts, we handle every elegant detail.</p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Gala
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Gala Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Dining Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Dining & Ceremony Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Elegant settings for formal evenings and award presentations
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {diningSpaces.map((space) => {
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

            {/* Dining Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Gala Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything for a flawless formal evening</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {diningAmenities.map((amenity) => {
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

            {/* Gala Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Gala Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Tailored experiences for unforgettable award evenings</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {diningPackages.map((pkg) => {
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

            {/* Benefits & Tech Specs Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Luxury Award Gala Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Where elegance meets excellence</p>
                            <ul className="mt-6 space-y-3">
                                {diningBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technical Specs */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Utensils className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Event Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Technical & Dining Specifications</h3>
                            {technicalSpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Custom menu design and protocol planning included</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gala Evening Flow Section */}
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Gala Evening Flow</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">A sample timeline for a formal awards night</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {galaSchedule.map((item, idx) => (
                            <div key={idx} className="flex gap-4 mb-6 last:mb-0 items-start">
                                <div className="w-28 flex-shrink-0">
                                    <span className="text-[#c9a55b] font-semibold text-sm">{item.time}</span>
                                </div>
                                <div className="flex-1 border-l border-white/20 pl-4 pb-6">
                                    <p className="font-semibold text-white">{item.event}</p>
                                    <p className="text-sm text-white/60 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-white/50 text-xs mt-4">*Timeline fully customizable to your program needs</p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Gala Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Memorable evenings at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Gala gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from memorable gala evenings</p>
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
                            Gala & Awards FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting a formal evening
                        </p>
                    </div>

                    {/* 2-column grid - matching original design */}
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Gala Evening</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry for a custom gala proposal</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Organization / Company"
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
                                <option className="bg-neutral-900">Annual Awards Gala</option>
                                <option className="bg-neutral-900">Charity Benefit Dinner</option>
                                <option className="bg-neutral-900">Industry Recognition Night</option>
                                <option className="bg-neutral-900">Nonprofit Fundraising Gala</option>
                                <option className="bg-neutral-900">Corporate Anniversary Dinner</option>
                                <option className="bg-neutral-900">VIP Honoree Reception</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Venue Space</option>
                                <option className="bg-neutral-900">Grand Ballroom (up to 350 seated)</option>
                                <option className="bg-neutral-900">The Conservatory (up to 120 seated)</option>
                                <option className="bg-neutral-900">Presidential Suite (up to 50 seated)</option>
                                <option className="bg-neutral-900">Full Venue Buyout</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Silver Gala (5 hours)</option>
                                <option className="bg-neutral-900">Gold Gala Experience (6 hours)</option>
                                <option className="bg-neutral-900">Platinum Awards Night (8 hours)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your gala, expected guest count, honoree details, dietary needs, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Gala Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our gala specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}