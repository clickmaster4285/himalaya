"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Presentation, Wifi, Mic, Video, Laptop, Briefcase,
    PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Dumbbell, Car, Sun, Moon, ClipboardList, Plane, Award,
    Gift, Target, PenTool, Smile, ThermometerSun, Globe,
    Headphones, Projector, LayoutTemplate, FileText,
    Medal, Trophy, GraduationCap, BookOpen, Shield, Handshake,
    Flower2, Camera, Music, Utensils, Cake, Mic2, Quote
} from "lucide-react";

const heroSlides = [
    "/assets/retirement1.webp",
    "/assets/retirement2.webp",
    "/assets/retirement3.webp",
];

const retirementSpaces = [
    {
        title: "Elegant Banquet Hall",
        text: "Sophisticated indoor space with warm lighting and premium finishes, ideal for formal retirement dinners and award ceremonies for up to 120 guests.",
        icon: Crown,
    },
    {
        title: "Mountain View Terrace",
        text: "Scenic outdoor terrace with panoramic Himalayan views, perfect for daytime retirement gatherings and afternoon tea celebrations.",
        icon: Sun,
    },
    {
        title: "Private Dining Room",
        text: "Intimate 30-seat space with personalized service, ideal for small family-style retirement honors and close colleague gatherings.",
        icon: Handshake,
    },
];

const retirementAmenities = [
    {
        title: "Custom Tribute Setup",
        text: "Personalized photo montage, achievement display, and tribute video projection setup",
        icon: Award,
    },
    {
        title: "Professional Photography",
        text: "Documentary-style coverage of speeches, award presentations, and group photos",
        icon: Camera,
    },
    {
        title: "Custom Catering",
        text: "Formal dinner, lunch buffet, or high tea - tailored to the honoree's preferences",
        icon: Utensils,
    },
    {
        title: "Award Presentation",
        text: "Podium, microphone, and stage setup for speeches and recognition ceremonies",
        icon: Mic2,
    },
];

const retirementPackages = [
    {
        name: "Retirement Luncheon",
        duration: "3 Hours",
        price: "Upon Request",
        features: [
            "Private dining room or terrace",
            "Custom buffet or set menu lunch",
            "Tribute slideshow setup",
            "Sound system for speeches",
            "Farewell gift for honoree"
        ],
        icon: Heart,
    },
    {
        name: "Honor & Legacy Dinner",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Elegant Banquet Hall access",
            "Formal 3-course dinner",
            "Custom tribute video screening",
            "Professional photographer (3 hours)",
            "Memory book for guests to sign",
            "Award presentation ceremony"
        ],
        icon: Medal,
        popular: true,
    },
    {
        name: "Legacy Celebration Weekend",
        duration: "2 Days",
        price: "Upon Request",
        features: [
            "Full venue buyout",
            "Overnight villa accommodation",
            "Welcome dinner + retirement gala",
            "Full event photography & video",
            "Custom commemorative video",
            "Guest accommodation available",
            "Family & colleague gathering space"
        ],
        icon: Trophy,
    },
];

const retirementBenefits = [
    "Elegant, dignified settings befitting a career celebration",
    "Flexible spaces from intimate to grand (20-120 guests)",
    "Custom tribute videos and slideshow capabilities",
    "Professional AV for speeches and presentations",
    "Dedicated event coordinator throughout the celebration",
    "Custom catering honoring the retiree's preferences",
    "Photography packages to capture every moment",
    "Accommodation available for out-of-town family and colleagues",
];

const tributeIdeas = [
    { idea: "Legacy Video Montage", desc: "Compilation of career highlights, colleague messages, and family tributes" },
    { idea: "Memory Wall Display", desc: "Photo timeline of the honoree's professional journey" },
    { idea: "Colleague Toast Session", desc: "Structured time for team members to share stories and appreciation" },
    { idea: "Commemorative Gift Presentation", desc: "Custom award or gift from the organization" },
    { idea: "Retirement Time Capsule", desc: "Colleagues contribute messages to be opened at a future date" },
    { idea: "Legacy Panel Discussion", desc: "Honoree shares wisdom with current team members" },
];

const retirementSchedule = [
    { time: "6:00 PM", event: "Guest Arrival", desc: "Welcome drinks and registration" },
    { time: "6:30 PM", event: "Opening Remarks", desc: "Host welcomes guests and introduces the honoree" },
    { time: "7:00 PM", event: "Tribute Video", desc: "Career highlights and colleague messages" },
    { time: "7:30 PM", event: "Speeches & Toasts", desc: "Colleagues, friends, and family share memories" },
    { time: "8:00 PM", event: "Dinner Service", desc: "Formal dinner or buffet" },
    { time: "9:00 PM", event: "Award Presentation", desc: "Recognition of service and achievements" },
    { time: "9:30 PM", event: "Final Toast", desc: "Closing remarks and farewell toast" },
    { time: "10:00 PM", event: "Departure", desc: "Farewell and gift distribution" },
];

const gallery = [
    "/assets/retirement1.webp",
    "/assets/retirement2.webp",
    "/assets/retirement3.webp",
    "/assets/retirement4.webp",
];

const faqs = [
    { q: "What types of retirement events can you host?", a: "We host retirement dinners, luncheons, afternoon teas, cocktail receptions, and multi-day celebrations. Each event is customized to honor the retiree's career and personality." },
    { q: "How many guests can attend a retirement celebration?", a: "Retirement events can range from intimate family gatherings of 20 people to larger celebrations of up to 120 guests, depending on the space selected." },
    { q: "Can we include a tribute video or slideshow?", a: "Absolutely. Our AV setup includes large screens and projection capabilities for tribute videos, career highlight slideshows, and photo montages." },
    { q: "Do you provide catering for retirement events?", a: "Yes, all packages include catering from formal sit-down dinners to buffet lunches or high tea. Menu can be customized to the honoree's preferences." },
    { q: "Can out-of-town guests stay overnight?", a: "Yes, we have villa accommodation available for family members and colleagues traveling from out of town. Multi-day packages include accommodation." },
    { q: "Can we have a combined retirement + family celebration?", a: "Yes, many clients combine retirement honors with family gatherings. We can create a blended schedule that honors both the professional legacy and family moment." },
    { q: "Do you provide decorations for retirement events?", a: "Yes, we offer custom decoration packages including floral arrangements, themed backdrops, and personalized signage celebrating the honoree." },
    { q: "What is included in the professional photography?", a: "Our photography packages include candid coverage, group portraits, award presentation moments, and family photos. Edited digital photos delivered within 7 days." },
    { q: "Can we invite the honoree's former colleagues?", a: "Yes, we can accommodate guests from multiple organizations. Our registration area can manage name tags and welcome materials for all attendees." },
    { q: "Is there AV support for speeches?", a: "Yes, we provide wireless microphones, podium, sound system, and an on-site technician to ensure all speeches and presentations run smoothly." },
];

const testimonials = [
    {
        name: "David Thompson",
        event: "CEO Retirement Gala",
        text: "The team created a truly dignified celebration for our retiring CEO. The tribute video setup was flawless, and the catering was exceptional. Our guest of honor felt genuinely honored.",
        rating: 5,
    },
    {
        name: "Ayesha Malik",
        event: "Colleague Retirement Dinner",
        text: "We hosted a 60-person retirement dinner for a beloved team member. The private dining room was perfect, and the staff anticipated every need. A beautiful evening.",
        rating: 5,
    },
    {
        name: "Robert Chen",
        event: "Legacy Weekend Celebration",
        text: "The two-day retirement celebration exceeded all expectations. The venue, the food, the tribute arrangements, and the accommodation made it a weekend no one will forget.",
        rating: 5,
    },
];

export default function RetirementCelebrationsPage() {
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
                            alt="Retirement celebration venue"
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
                        <Medal className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Honor | Retirement Celebrations</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Dignified Events
                        <br />
                        Honoring Professional Journeys
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                        Celebrate a lifetime of achievement with elegance and respect. From intimate family dinners
                        to grand organizational galas, we create retirement events that honor the legacy.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan a Retirement Celebration
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Retirement Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Retirement Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Retirement Celebration Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Dignified settings for honoring career achievements
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {retirementSpaces.map((space) => {
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

            {/* Tribute Ideas Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Tribute & Recognition Ideas</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Meaningful ways to honor the retiree</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tributeIdeas.map((tribute, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-[#fefcf8] p-5 hover:shadow-md transition">
                                <div className="mb-3 inline-flex rounded-full bg-[#c9a55b]/10 p-2 text-[#c9a55b]">
                                    <Quote className="h-4 w-4" />
                                </div>
                                <h3 className="text-base font-semibold text-neutral-900">{tribute.idea}</h3>
                                <p className="mt-1 text-xs text-neutral-600">{tribute.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Retirement Amenities Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Retirement Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything for a dignified celebration</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {retirementAmenities.map((amenity) => {
                            const Icon = amenity.icon;
                            return (
                                <div key={amenity.title} className="rounded-2xl border border-[#e8dfcf] bg-white p-6 text-center hover:shadow-md transition">
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

            {/* Retirement Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Retirement Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Honoring careers with elegance</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {retirementPackages.map((pkg) => {
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

            {/* Benefits & Sample Schedule Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Shield className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Honoring a Legacy</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for dignity and respect</p>
                            <ul className="mt-6 space-y-3">
                                {retirementBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sample Schedule */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Clock className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Sample Timeline</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Retirement Dinner Flow</h3>
                            <div className="space-y-3">
                                {retirementSchedule.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <div className="w-20 flex-shrink-0">
                                            <span className="text-[#c9a55b] font-semibold text-xs">{item.time}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-neutral-900 text-sm">{item.event}</p>
                                            <p className="text-xs text-neutral-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-neutral-500 italic">*Timeline fully customizable to your needs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Retirement Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Dignified celebrations at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Retirement gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What Our Clients Say</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from retirement celebrations</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-2xl border border-[#e8dfcf] bg-[#fbf7ee] p-6">
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
            <section className="py-16 md:py-20 bg-[#fbf7ee] text-gray-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Retirement FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting a retirement celebration
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {faqs.map((f, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition"
                            >
                                <div className="mb-3 inline-flex rounded-full bg-[#c9a55b]/10 p-2">
                                    <HelpCircle className="h-5 w-5 text-[#c9a55b]" />
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan a Retirement Celebration</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Honor a lifetime of achievement with dignity and grace</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Organization Name"
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
                                <option className="bg-neutral-900">Retirement Luncheon</option>
                                <option className="bg-neutral-900">Retirement Dinner</option>
                                <option className="bg-neutral-900">Afternoon Tea</option>
                                <option className="bg-neutral-900">Legacy Weekend</option>
                                <option className="bg-neutral-900">Cocktail Reception</option>
                                <option className="bg-neutral-900">Custom Celebration</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Guests</option>
                                <option className="bg-neutral-900">20-30 guests</option>
                                <option className="bg-neutral-900">30-50 guests</option>
                                <option className="bg-neutral-900">50-80 guests</option>
                                <option className="bg-neutral-900">80-120 guests</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package Interest</option>
                                <option className="bg-neutral-900">Retirement Luncheon (3 hours)</option>
                                <option className="bg-neutral-900">Honor & Legacy Dinner (4 hours)</option>
                                <option className="bg-neutral-900">Legacy Celebration Weekend (2 days)</option>
                                <option className="bg-neutral-900">Custom Package</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about the honoree, their career, number of years, special achievements, and any specific tribute ideas or cultural traditions you'd like to include..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Retirement Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our events team will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}