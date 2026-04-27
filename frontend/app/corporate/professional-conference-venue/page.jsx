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
    Headphones, Projector, LayoutTemplate, FileText
} from "lucide-react";

const heroSlides = [
    "/assets/conference1.webp",
    "/assets/conference2.webp",
    "/assets/exibition1.webp",
];

const conferenceSpaces = [
    {
        title: "Plenary Hall",
        text: "Grand auditorium with tiered seating, massive projection screen, and capacity for up to 500 delegates. Perfect for keynotes and main sessions.",
        icon: Presentation,
    },
    {
        title: "Breakout Rooms",
        text: "Four modular seminar rooms seating 50-80 guests each, with movable walls to create larger spaces for workshops and parallel sessions.",
        icon: LayoutTemplate,
    },
    {
        title: "Executive Boardroom",
        text: "Premium 30-seat boardroom with video conferencing, whiteboard walls, and integrated AV for leadership meetings and VIP strategy sessions.",
        icon: Briefcase,
    },
];

const conferenceAmenities = [
    {
        title: "Professional AV",
        text: "4K projectors, motorized screens, wireless mics, and dedicated AV technician",
        icon: Video,
    },
    {
        title: "High-Speed WiFi",
        text: "Enterprise-grade internet with dedicated bandwidth for 500+ concurrent users",
        icon: Wifi,
    },
    {
        title: "Registration Area",
        text: "Welcome desk with branded check-in, badge printing, and coat check service",
        icon: ClipboardList,
    },
    {
        title: "Delegate Hospitality",
        text: "Coffee breaks, lunch service, and hydration stations throughout the venue",
        icon: Coffee,
    },
];

const conferencePackages = [
    {
        name: "Half-Day Seminar",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Plenary Hall or Breakout Room",
            "Basic AV with projector & screen",
            "PA system with 2 wireless mics",
            "Standard seating arrangement",
            "Welcome coffee & water station"
        ],
        icon: Heart,
    },
    {
        name: "Full Conference Day",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "Full Plenary Hall access",
            "2 breakout rooms included",
            "Dedicated AV technician",
            "Registration desk & staff",
            "Morning tea + lunch + afternoon tea",
            "Delegate notepads & pens"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Multi-Day Summit",
        duration: "2-3 Days",
        price: "Upon Request",
        features: [
            "Full venue buyout",
            "All 4 breakout rooms",
            "Executive boardroom access",
            "Full production team",
            "Custom branded environment",
            "Gala dinner arrangement",
            "VIP hospitality suite"
        ],
        icon: Crown,
    },
];

const conferenceBenefits = [
    "Tiered auditorium with unobstructed sightlines to stage",
    "Multiple breakout rooms for parallel sessions and workshops",
    "Dedicated AV technician and event coordinator included",
    "High-speed WiFi capable of streaming and live presentations",
    "On-site catering for coffee breaks, lunches, and receptions",
    "Professional registration area with badge printing",
    "Green room and speaker preparation lounge",
    "Ample parking and easy public transport access",
];

const technicalSpecs = [
    { category: "Plenary Hall Capacity", specs: "500 delegates (theater), 300 (classroom), 400 (banquet)" },
    { category: "AV Equipment", specs: "Dual 12,000 lumen projectors, 20' motorized screens, confidence monitors" },
    { category: "Audio System", specs: "Line array PA, 8 wireless handheld/lavalier mics, assisted listening" },
    { category: "Video Conferencing", specs: "4K PTZ cameras, Cisco/Teams/Zoom integration available" },
    { category: "Breakout Rooms", specs: "4 rooms (50-80 pax each) with 75\" displays and whiteboards" },
];

const conferenceSchedule = [
    { time: "8:00 AM", event: "Registration & Welcome Coffee", desc: "Attendee check-in, badge collection, networking" },
    { time: "9:00 AM", event: "Opening Keynote", desc: "Main session in Plenary Hall" },
    { time: "10:30 AM", event: "Morning Break", desc: "Coffee, tea, and pastries served" },
    { time: "11:00 AM", event: "Breakout Sessions", desc: "Parallel tracks in seminar rooms" },
    { time: "12:30 PM", event: "Networking Lunch", desc: "Buffet lunch served in dining area" },
    { time: "1:30 PM", event: "Afternoon Sessions", desc: "Workshops and panel discussions" },
    { time: "3:00 PM", event: "Afternoon Break", desc: "Coffee and refreshments" },
    { time: "3:30 PM", event: "Closing Keynote", desc: "Final main session & Q&A" },
    { time: "5:00 PM", event: "Networking Reception", desc: "Optional cocktail hour" },
];

const gallery = [
    "/assets/conference1.webp",
    "/assets/conference2.webp",
    "/assets/exibition1.webp",
    "/assets/product-launch2.webp",
];

const faqs = [
    { q: "What is the maximum capacity for a conference?", a: "Our Plenary Hall seats up to 500 delegates theater-style. With breakout rooms included, we can accommodate 700+ attendees across simultaneous sessions." },
    { q: "Is AV equipment and technical support included?", a: "Yes, all packages include professional AV equipment. Our dedicated AV technician is on-site throughout your event to ensure everything runs smoothly." },
    { q: "Do you provide catering for conferences?", a: "Yes, we offer flexible catering options including morning tea, buffet lunch, afternoon break, and networking receptions. Dietary requirements can be accommodated." },
    { q: "Can we livestream our conference?", a: "Absolutely. Our premium packages include professional video conferencing integration for hybrid events. We support Zoom, Teams, Webex, and custom streaming platforms." },
    { q: "Is there parking for attendees and speakers?", a: "Yes, we have complimentary on-site parking for 200 vehicles with designated VIP parking for speakers and organizers." },
    { q: "What is the rental duration?", a: "Standard half-day is 4 hours, full-day is 8 hours (9 AM - 5 PM). Multi-day summits can be customized. Early access for setup is available upon request." },
    { q: "Can we brand the venue?", a: "Yes, we have digital signage throughout the venue. Premium packages include custom step-and-repeat backdrops and lobby branding opportunities." },
    { q: "Is the venue wheelchair accessible?", a: "Yes, fully accessible with ramps, elevator, accessible restrooms, and designated seating areas in the Plenary Hall." },
];

const testimonials = [
    {
        name: "Dr. Emily Watson",
        event: "Medical Conference",
        text: "The Plenary Hall was perfect for our 400-person conference. The AV team was exceptional and the breakout rooms worked seamlessly for our workshops.",
        rating: 5,
    },
    {
        name: "James Okonkwo",
        event: "Tech Summit",
        text: "Professional venue with enterprise-grade WiFi and video conferencing. Our hybrid event reached 2,000 online attendees without a single glitch.",
        rating: 5,
    },
    {
        name: "Lisa Chen",
        event: "Leadership Forum",
        text: "The Executive Boardroom was ideal for our VIP strategy session. The catering was excellent and the staff anticipated every need.",
        rating: 5,
    },
];

export default function ConferenceVenuePage() {
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
                            alt="Conference venue"
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
                        <Presentation className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">MICE | Conferences & Seminars</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Professional
                        <br />
                        Conference Venue
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">Host your professional conference venue with us. Host impactful conferences, seminars, and corporate events in our fully-equipped venue. From keynotes to breakout sessions, we deliver seamless professional experiences.</p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Conference
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Conference Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Conference Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Venue</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Conference & Seminar Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Flexible professional spaces for events of any size
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {conferenceSpaces.map((space) => {
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

            {/* Conference Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Conference Amenities</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Professional infrastructure for seamless events</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {conferenceAmenities.map((amenity) => {
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

            {/* Conference Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Conference Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Flexible options for corporate events</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {conferencePackages.map((pkg) => {
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
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Professional Conference Venue</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Designed for productivity and impact</p>
                            <ul className="mt-6 space-y-3">
                                {conferenceBenefits.map((item) => (
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
                                <Laptop className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Tech Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Technical Specifications</h3>
                            {technicalSpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*Additional equipment and tech support available upon request</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conference Schedule Section */}
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Sample Conference Schedule</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">A typical full-day conference flow</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {conferenceSchedule.map((item, idx) => (
                            <div key={idx} className="flex gap-4 mb-4 last:mb-0 items-start">
                                <div className="w-28 flex-shrink-0">
                                    <span className="text-[#c9a55b] font-semibold text-sm">{item.time}</span>
                                </div>
                                <div className="flex-1 border-l border-white/20 pl-4 pb-4">
                                    <p className="font-semibold text-white">{item.event}</p>
                                    <p className="text-sm text-white/60 mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-white/50 text-xs mt-4">*Timeline fully customizable to your agenda</p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Conference Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Professional events at our venue</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Conference gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Feedback from conference organizers</p>
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

            {/* FAQ Section - 2 columns as requested */}
            <section className="py-16 md:py-20 bg-white text-gray-900">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-gray-900">
                            Conference FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about hosting your conference with us
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Conference</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Submit an inquiry and we'll create a custom proposal</p>

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
                                <option value="" className="bg-neutral-900">Event Type</option>
                                <option className="bg-neutral-900">Corporate Conference</option>
                                <option className="bg-neutral-900">Industry Seminar</option>
                                <option className="bg-neutral-900">Training Workshop</option>
                                <option className="bg-neutral-900">Annual General Meeting</option>
                                <option className="bg-neutral-900">Academic Symposium</option>
                                <option className="bg-neutral-900">Hybrid / Virtual Event</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Expected Attendance</option>
                                <option className="bg-neutral-900">50-100 delegates</option>
                                <option className="bg-neutral-900">100-200 delegates</option>
                                <option className="bg-neutral-900">200-350 delegates</option>
                                <option className="bg-neutral-900">350-500 delegates</option>
                                <option className="bg-neutral-900">500+ delegates</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Half-Day Seminar (4 hours)</option>
                                <option className="bg-neutral-900">Full Conference Day (8 hours)</option>
                                <option className="bg-neutral-900">Multi-Day Summit (2-3 days)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your conference agenda, breakout session needs, catering preferences, AV requirements, and any special requests..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Conference Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our conference specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}