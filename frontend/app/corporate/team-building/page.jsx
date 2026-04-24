"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
    CheckCircle2, Crown, HelpCircle, Users, Building2, Coffee,
    Sparkles, Star, Heart, Calendar, Clock, MapPin,
    Trees, Utensils, Wifi, Trophy, Briefcase, Mic,
    PartyPopper, Lightbulb, Speaker, Wine, TrendingUp,
    Dumbbell, Car, Sun, Moon, Gamepad, Plane, Award,
    Gift, Target, PenTool, Smile, ThermometerSun, Footprints,
    Compass, Mountain, Sailboat, Bike, Puzzle,
    Handshake, Brain, Zap, ChevronRight, Flame
} from "lucide-react";

const heroSlides = [
    "/assets/team.webp",
    "/assets/conference2.webp",
    "/assets/team-dinner1.webp",
];

const teamSpaces = [
    {
        title: "Adventure Park",
        text: "Expansive outdoor space with ropes course, obstacle challenges, and open fields for 100+ participants. Perfect for high-energy team bonding.",
        icon: Mountain,
    },
    {
        title: "Collaboration Hub",
        text: "Indoor 80-person workshop space with movable furniture, whiteboard walls, and breakout zones for strategy sessions and problem-solving activities.",
        icon: Brain,
    },
    {
        title: "Reflection Lodge",
        text: "Cozy indoor/outdoor hybrid space with campfire pit and lounge seating for 40 guests. Ideal for debriefs, celebrations, and team dinners.",
        icon: Flame,
    },
];

const teamAmenities = [
    {
        title: "Activity Facilitators",
        text: "Professional team building coaches to lead activities and maximize impact",
        icon: Handshake,
    },
    {
        title: "Challenge Course",
        text: "Low and high ropes elements, trust falls, and problem-solving obstacles",
        icon: Puzzle,
    },
    {
        title: "Catering Options",
        text: "BBQ lunches, picnic spreads, or indoor dining – fully customizable",
        icon: Utensils,
    },
    {
        title: "Recovery Zone",
        text: "Relaxation area with refreshments, first aid, and comfortable seating",
        icon: Coffee,
    },
];

const teamPackages = [
    {
        name: "Half-Day Bonding",
        duration: "4 Hours",
        price: "Upon Request",
        features: [
            "Adventure Park or Collaboration Hub",
            "2 facilitated activities",
            "Basic AV for debrief",
            "Light refreshments included",
            "Activity materials provided"
        ],
        icon: Heart,
    },
    {
        name: "Full Day Immersion",
        duration: "8 Hours",
        price: "Upon Request",
        features: [
            "All venue spaces access",
            "4+ facilitated activities",
            "BBQ or buffet lunch included",
            "Professional photographer",
            "Team awards & certificates",
            "Post-event debrief session"
        ],
        icon: Star,
        popular: true,
    },
    {
        name: "Overnight Expedition",
        duration: "2 Days / 1 Night",
        price: "Upon Request",
        features: [
            "Full venue buyout",
            "Custom team challenges",
            "All meals + campfire dinner",
            "Accommodation included",
            "Evening team celebration",
            "Custom team swag kit",
            "Post-retreat action plan"
        ],
        icon: Crown,
    },
];

const teamBenefits = [
    "Custom-designed activities based on your team's goals and dynamics",
    "Professional facilitators with corporate team building expertise",
    "Mix of indoor and outdoor spaces for all-weather programming",
    "Problem-solving challenges that mirror real workplace scenarios",
    "Debrief sessions that drive actionable takeaways",
    "Team celebration space with campfire and dining options",
    "Photography package to capture memorable moments",
    "Flexible schedule to accommodate half-day or multi-day retreats",
];

const activitySpecs = [
    { category: "Team Size", specs: "10-200 participants (optimal: 20-80)" },
    { category: "Activity Types", specs: "Problem-solving, communication, trust-building, creative collaboration" },
    { category: "Outdoor Activities", specs: "Ropes course, scavenger hunt, obstacle course, team sports" },
    { category: "Indoor Activities", specs: "Escape room, strategy games, building challenges, workshops" },
    { category: "Facilitator Ratio", specs: "1 facilitator per 15-20 participants for optimal engagement" },
];

const teamSchedule = [
    { time: "9:00 AM", event: "Arrival & Welcome", desc: "Team check-in, coffee, and opening circle" },
    { time: "9:30 AM", event: "Icebreakers & Warm-up", desc: "Energy-boosting activities to build rapport" },
    { time: "10:30 AM", event: "Core Challenge 1", desc: "Problem-solving activity (indoor or outdoor)" },
    { time: "12:30 PM", event: "Team Lunch", desc: "BBQ or picnic-style group meal" },
    { time: "1:30 PM", event: "Core Challenge 2", desc: "Communication & trust-building activity" },
    { time: "3:30 PM", event: "Reflection & Debrief", desc: "Guided discussion and key takeaways" },
    { time: "4:30 PM", event: "Celebration", desc: "Team awards and closing circle" },
    { time: "5:30 PM", event: "Departure / Campfire", desc: "Optional dinner and campfire gathering" },
];

const gallery = [
    "/assets/team.webp",
    "/assets/conference2.webp",
    "/assets/team-dinner1.webp",
    "/assets/exibition1.webp",
];

const faqs = [
    { q: "What is the ideal team size for a retreat?", a: "We can accommodate teams of 10-200 participants. For the best experience, we recommend 20-80 participants for optimal facilitator-to-team ratio." },
    { q: "Are activities suitable for all fitness levels?", a: "Yes! We offer a range of activities from low-impact problem-solving to high-energy physical challenges. All activities can be modified for accessibility and comfort levels." },
    { q: "Do you provide facilitators?", a: "Yes, all packages include professional facilitators trained in corporate team building, communication exercises, and psychological safety protocols." },
    { q: "What happens if it rains?", a: "We have versatile indoor spaces (Collaboration Hub and Reflection Lodge) so activities continue seamlessly. We'll adjust the schedule to prioritize indoor programming." },
    { q: "Can you customize activities for our team's goals?", a: "Absolutely. We'll meet with you beforehand to understand your team's specific challenges, goals, and dynamics to design a meaningful experience." },
    { q: "Is food and accommodation included?", a: "Half-day includes refreshments. Full-day includes lunch. Overnight package includes all meals and accommodation. Dietary restrictions are accommodated." },
    { q: "What should team members wear?", a: "Comfortable, weather-appropriate clothing and closed-toe shoes. We recommend layers for outdoor activities and clothes that can get a little dirty!" },
    { q: "How far in advance should we book?", a: "We recommend 4-6 weeks for custom program design. Last-minute bookings (2 weeks) are possible with limited customization." },
];

const testimonials = [
    {
        name: "Michael Torres",
        event: "Sales Team Offsite",
        text: "Our team came back transformed. The activities were fun but meaningful – we actually solved real collaboration issues we'd been struggling with for months.",
        rating: 5,
    },
    {
        name: "Sarah Chen",
        event: "Engineering Department Retreat",
        text: "The facilitators were outstanding. They adapted activities on the fly when our group dynamics shifted. Best team investment we've made.",
        rating: 5,
    },
    {
        name: "David O'Brien",
        event: "Leadership Team Building",
        text: "The reflection lodge and campfire debrief was the highlight. We had honest conversations that never happen in the office. Truly transformative.",
        rating: 5,
    },
];

export default function TeamBuildingPage() {
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
                            alt="Team building retreat"
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
                        <Users className="h-3.5 w-3.5 text-[#c9a55b]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#c9a55b] font-semibold">Teams | Building Stronger Connections</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-3xl drop-shadow-md">
                        Build Stronger
                        <br />
                        Teams Together
                    </h1>

                    <p className="mt-5 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed drop-shadow-sm">
                        Take your team out of the office and into experiences that build trust,
                        improve communication, and create lasting bonds through fun and meaningful activities.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#book" className="inline-block rounded-md bg-[#c9a55b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#a98741] transition text-center shadow-md">
                            Plan Your Retreat
                        </a>
                        <a href="#packages" className="inline-block rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition text-center shadow-md">
                            View Team Packages
                        </a>
                    </div>
                </div>
            </section>

            {/* Team Spaces Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a55b] font-semibold">Our Spaces</p>
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mt-2">Activity & Retreat Spaces</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
                            Versatile environments for every type of team experience
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {teamSpaces.map((space) => {
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

            {/* Team Amenities Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">What's Included</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Everything for a seamless team experience</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {teamAmenities.map((amenity) => {
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

            {/* Team Packages Section */}
            <section id="packages" className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Retreat Packages</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">Flexible experiences for every team and budget</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {teamPackages.map((pkg) => {
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

            {/* Benefits & Activity Specs Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Benefits */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Star className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Why Choose Us</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Meaningful Team Experiences</h2>
                            <p className="mt-3 text-sm md:text-base text-neutral-600">Activities that drive real workplace results</p>
                            <ul className="mt-6 space-y-3">
                                {teamBenefits.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#c9a55b] flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Activity Specs */}
                        <div className="bg-[#fbf7ee] rounded-2xl p-6 border border-[#e8dfcf]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b]/10 px-4 py-1.5 mb-4">
                                <Compass className="h-3.5 w-3.5 text-[#c9a55b]" />
                                <span className="text-[10px] uppercase tracking-wider text-[#c9a55b] font-semibold">Activity Specs</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Program Specifications</h3>
                            {activitySpecs.map((spec) => (
                                <div key={spec.category} className="mb-4 last:mb-0">
                                    <p className="font-semibold text-[#c9a55b] text-base">{spec.category}</p>
                                    <p className="text-sm text-neutral-600 mt-1">{spec.specs}</p>
                                </div>
                            ))}
                            <p className="mt-4 text-xs text-neutral-500 italic">*All activities are fully customizable to your team's goals</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Schedule Section */}
            <section className="py-16 md:py-20 bg-[#0f172a] text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl">Sample Retreat Schedule</h2>
                        <p className="mt-3 text-sm md:text-base text-white/80">A typical full-day team building flow</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {teamSchedule.map((item, idx) => (
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
                    <p className="text-center text-white/50 text-xs mt-4">*Schedule fully customizable to your team's needs and goals</p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Retreat Gallery</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Moments of connection and growth</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {gallery.map((img, idx) => (
                            <div key={idx} className="relative h-52 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm group">
                                <Image src={img} alt="Team building gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 bg-[#fbf7ee]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-neutral-900">Team Success Stories</h2>
                        <p className="mt-3 text-sm md:text-base text-neutral-600">Real results from real teams</p>
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
                            Team Retreat FAQs
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600">
                            Everything you need to know about planning your team retreat
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
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center sm:text-left">Plan Your Team Retreat</h2>
                        <p className="mt-2 text-xs sm:text-sm text-white/80 text-center sm:text-left">Tell us about your team and we'll design a custom experience</p>

                        <form className="mt-5 sm:mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Full Name"
                            />
                            <input
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15"
                                placeholder="Company / Team Name"
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
                                <option value="" className="bg-neutral-900">Team Size</option>
                                <option className="bg-neutral-900">5-15 (Small Team)</option>
                                <option className="bg-neutral-900">15-30</option>
                                <option className="bg-neutral-900">30-50</option>
                                <option className="bg-neutral-900">50-100</option>
                                <option className="bg-neutral-900">100-200</option>
                            </select>
                            <input
                                type="date"
                                className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15 [color-scheme:dark]"
                            />
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Retreat Goals</option>
                                <option className="bg-neutral-900">Communication & Trust</option>
                                <option className="bg-neutral-900">Problem-Solving & Innovation</option>
                                <option className="bg-neutral-900">Conflict Resolution</option>
                                <option className="bg-neutral-900">New Team Integration</option>
                                <option className="bg-neutral-900">Morale & Celebration</option>
                                <option className="bg-neutral-900">Leadership Development</option>
                            </select>
                            <select className="col-span-1 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition focus:bg-white/15">
                                <option value="" className="bg-neutral-900">Select Package</option>
                                <option className="bg-neutral-900">Half-Day Bonding (4 hours)</option>
                                <option className="bg-neutral-900">Full Day Immersion (8 hours)</option>
                                <option className="bg-neutral-900">Overnight Expedition (2 days / 1 night)</option>
                            </select>
                            <textarea
                                rows={4}
                                className="col-span-1 sm:col-span-2 rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#c9a55b] transition placeholder:text-white/60 focus:bg-white/15 resize-vertical"
                                placeholder="Tell us about your team, any specific challenges you'd like to address, dietary restrictions, accessibility needs, and activity preferences..."
                            />
                            <button
                                type="submit"
                                className="col-span-1 sm:col-span-2 rounded-lg bg-[#c9a55b] px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#a98741] active:scale-95 w-full sm:w-auto sm:min-w-[200px] mx-auto"
                            >
                                Request Team Retreat Proposal
                            </button>
                        </form>

                        <p className="mt-4 text-[10px] sm:text-xs text-white/50 text-center">
                            Our team building specialists will respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}