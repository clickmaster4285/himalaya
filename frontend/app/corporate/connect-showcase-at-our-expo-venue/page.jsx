"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    LayoutGrid, Wifi, Mic, Video, Laptop, Briefcase,
    PartyPopper, Lightbulb, Speaker, TrendingUp,
    Dumbbell, Car, Sun, Moon, ClipboardList, Plane, Award,
    Gift, Target, PenTool, Smile, ThermometerSun, Globe,
    Headphones, Projector, Navigation, Compass, Footprints,
    ScanLine, BadgeCheck, Store, Ticket, ArrowLeftRight
} from "lucide-react";

const heroSlides = [
    "/assets/exibition2.webp",
    "/assets/exibition1.webp",
    "/assets/exibition3.webp",
];

const expoSpaces = [
    {
        title: "Grand Exhibition Hall",
        text: "Spacious column-free hall with 100+ booth capacity, 20' ceilings, and multiple entry points. Perfect for large-scale trade shows and expos.",
        icon: LayoutGrid,
    },
    {
        title: "Product Showcase Gallery",
        text: "Premium 30-booth gallery with high-traffic flow patterns, ideal for product launches and VIP buyer meet-and-greets.",
        icon: Store,
    },
    {
        title: "Meeting & Boardroom Suite",
        text: "Private 20-person boardroom adjacent to expo floor for B2B negotiations, partnership discussions, and press conferences.",
        icon: Briefcase,
    },
];

const expoAmenities = [
    {
        title: "Booth Infrastructure",
        text: "Standard booth packages (8x8 or 10x10) with power, lighting, and table/chairs included",
        icon: Store,
    },
    {
        title: "Attendee Flow Management",
        text: "Strategic layouts with guided pathways, queuing systems, and crowd control solutions",
        icon: Navigation,
    },
    {
        title: "Badge & Registration System",
        text: "Pre-printed badges, on-site printing, QR scanning, and attendee tracking technology",
        icon: BadgeCheck,
    },
    {
        title: "Load-in / Load-out Support",
        text: "Freight elevators, loading docks, and dedicated move-in/move-out scheduling",
        icon: Truck,
    },
];

// Truck icon as a regular function component (no TypeScript)
function Truck({ className = "" }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </svg>
    );
}

const expoPackages = [
    {
        name: "Small Expo Package",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "20-30 booth exhibition space",
            "Basic power & lighting",
            "Registration desk included",
            "Attendee flow plan",
            "Venue coordinator"
        ],
        icon: Heart,
    },
    {
        name: "Standard Trade Show",
        duration: "10 Hours",
        price: "Upon Request",
        features: [
            "50-70 booth exhibition hall",
            "Premium booth locations included",
            "Badge printing system",
            "Loading dock access",
            "VIP meeting room access",
            "Sponsorship signage options",
            "On-site tech support"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Large Expo Summit",
        duration: "2-3 Days",
        price: "Upon Request",
        features: [
            "100+ booth full hall buyout",
            "Custom booth layout design",
            "Full registration management",
            "Dedicated load-in/load-out crew",
            "4 meeting rooms included",
            "Catering & hospitality suite",
            "Post-event analytics report"
        ],
        icon: Crown,
    },
];

const expoBenefits = [
    "Column-free exhibition hall with flexible booth configurations",
    "Strategic attendee flow management for optimal traffic distribution",
    "Badge printing and QR scanning technology included",
    "Loading docks and freight elevator for easy exhibitor move-in",
    "Dedicated exhibitor lounge and hospitality area",
    "Multiple registration points to minimize queues",
    "Sponsorship signage and branding opportunities",
    "Post-event analytics including attendance and booth traffic data",
];

const technicalSpecs = [
    { category: "Exhibition Space", specs: "12,000 sq ft column-free hall, 20' ceilings" },
    { category: "Booth Capacity", specs: "100+ standard booths (8x8 or 10x10 configurations)" },
    { category: "Power Supply", specs: "Dedicated circuits, 110V/220V available, generator backup" },
    { category: "Registration", specs: "4 registration kiosks, badge printer, QR scanners" },
    { category: "Loading Access", specs: "2 loading docks, freight elevator, roll-up door access" },
];

const expoSchedule = [
    { time: "Day 1 - Setup", event: "Exhibitor Load-in", desc: "Booth construction, product placement, tech rehearsal" },
    { time: "Day 1 - Evening", event: "VIP Preview Night", desc: "Invite-only buyer preview and networking reception" },
    { time: "Day 2 - Morning", event: "General Admission Opens", desc: "Attendee registration, keynote, expo floor opens" },
    { time: "Day 2 - Afternoon", event: "Expo Sessions", desc: "Product demos, workshops, buyer meetings" },
    { time: "Day 3 - Main Day", event: "Full Expo Hours", desc: "Peak attendance, B2B matchmaking, panel discussions" },
    { time: "Day 3 - Evening", event: "Closing & Load-out", desc: "Awards ceremony, exhibitor breakdown, load-out" },
];

const gallery = [
   "/assets/exibition2.webp",
    "/assets/exibition1.webp",
    "/assets/exibition3.webp",
   "/assets/conference1.webp",

];

const faqs = [
    { q: "How many booths can the exhibition hall accommodate?", a: "Our Grand Exhibition Hall accommodates 100+ standard booths (8x8 or 10x10 configurations). We also offer a 30-booth Product Showcase Gallery for smaller events." },
    { q: "Is booth setup and furniture included?", a: "Yes, standard booth packages include pipe and drape, 1 table, 2 chairs, power outlet, and basic signage. Custom booth builds are available at additional cost." },
    { q: "Do you provide registration and badge services?", a: "Yes, all packages include registration desk setup. Premium packages include on-site badge printing and QR scanning for attendee tracking." },
    { q: "Is there load-in access for exhibitors?", a: "Yes, we have two loading docks and a freight elevator with roll-up door access. We schedule dedicated load-in/load-out time slots to minimize congestion." },
    { q: "Can we host concurrent sessions or meetings?", a: "Absolutely. We have 4 breakout meeting rooms adjacent to the exhibition floor, perfect for B2B meetings, workshops, or press conferences." },
    { q: "Is WiFi available for exhibitors and attendees?", a: "Yes, enterprise-grade WiFi with dedicated bandwidth for exhibitors. Hardwired internet connections available upon request for critical demos." },
    { q: "Do you provide crowd flow management?", a: "Yes, we work with you to design strategic floor plans that optimize traffic flow. Our team manages entry/exit points, queuing systems, and crowd control." },
    { q: "What security is provided for exhibit materials?", a: "Venue has 24/7 CCTV surveillance, on-site security personnel, and overnight locked storage options for valuable exhibit materials." },
];

const testimonials = [
    {
        name: "Rebecca Martinez",
        event: "Tech Expo 2024",
        text: "The floor plan and attendee flow were perfectly designed. Exhibitors loved the traffic patterns and our B2B matchmaking space was a huge success.",
        rating: 5,
    },
    {
        name: "Thomas Wright",
        event: "Manufacturing Trade Show",
        text: "Load-in was seamless with the loading docks and freight elevator. The venue team coordinated 80 exhibitors without a single bottleneck. Impressive!",
        rating: 5,
    },
    {
        name: "Nina Kapoor",
        event: "Design & Decor Expo",
        text: "The registration system was efficient – no long queues. Post-event analytics gave us valuable insights on attendee behavior and booth traffic.",
        rating: 5,
    },
];

export default function ExpoVenuePage() {
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
                            alt="Exhibition venue"
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
                        <LayoutGrid className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Expos | Trade Meets | Exhibitions</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Connect & Showcase
                        <br />
                        At Our Expo Venue
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">Host your connect & showcase at our expo venue with us. Host impactful exhibitions, trade shows, and industry meets in our structured venue. Strategically designed for smooth attendee flow and maximum exhibitor visibility.</p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Expo
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Expo Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Expo Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Exhibition & Trade Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Flexible configurations for expos of any scale
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {expoSpaces.map((space) => {
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

            {/* Expo Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Expo Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything for a successful trade show</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {expoAmenities.map((amenity) => {
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

            {/* Expo Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Expo Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Tailored solutions for trade shows and exhibitions</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {expoPackages.map((pkg) => {
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
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Premier Expo Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for exhibitors and attendees alike</p>
                            <ul className="mt-6 space-y-3">
                                {expoBenefits.map((item) => (
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
                                <ScanLine className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Tech & Facilities</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Exhibition Specifications</h3>
                            {technicalSpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Custom booth configurations and rigging available upon request</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expo Schedule Section */}
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Sample Expo Timeline</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">A typical 3-day trade show flow</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {expoSchedule.map((item, idx) => (
                            <div key={idx} className="flex gap-4 mb-4 last:mb-0 items-start">
                                <div className="w-36 flex-shrink-0">
                                    <span className="text-[#c9a55b] font-semibold text-sm">{item.time}</span>
                                </div>
                                <div className="flex-1 border-l border-white/20 pl-4 pb-4">
                                    <p className="font-semibold text-white">{item.event}</p>
                                    <p className="text-sm text-white/60 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-white/50 text-xs mt-4">*Timeline fully customizable to your event needs</p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Expo Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Past exhibitions at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Expo gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What Exhibitors Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from trade show organizers</p>
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
                            Expo & Trade Show FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting an exhibition
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Expo</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry for a custom exhibition proposal</p>

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
                                placeholder="Work Email"
                            />
                            <input
                                type="tel"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Phone Number"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expo Type</option>
                                <option className="bg-neutral-900">Trade Show / Industry Expo</option>
                                <option className="bg-neutral-900">Product Launch Exhibition</option>
                                <option className="bg-neutral-900">Art / Design Exhibition</option>
                                <option className="bg-neutral-900">B2B Matchmaking Meet</option>
                                <option className="bg-neutral-900">Consumer Show</option>
                                <option className="bg-neutral-900">Hybrid / Virtual Expo</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Number of Booths</option>
                                <option className="bg-neutral-900">10-20 booths (Small)</option>
                                <option className="bg-neutral-900">20-50 booths (Medium)</option>
                                <option className="bg-neutral-900">50-80 booths (Large)</option>
                                <option className="bg-neutral-900">80-100+ booths (Full Hall)</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Small Expo Package (20-30 booths)</option>
                                <option className="bg-neutral-900">Standard Trade Show (50-70 booths)</option>
                                <option className="bg-neutral-900">Large Expo Summit (100+ booths)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your expo, expected number of exhibitors and attendees, booth preferences, load-in/load-out schedule, and any special requirements..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Expo Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our expo specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}