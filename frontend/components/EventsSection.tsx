"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Users, Briefcase } from "lucide-react";

/* ---------- Image constants (swap with your own) ---------- */
const weddingImg1 = "/assets/nikah-night-stage.png";
const weddingImg2 = "/assets/nikah-night-stage.png";
const weddingImg3 = "/assets/nikah-night-stage.png";

const familyImg1 = "/assets/outdoor-celebrations.jpg";
const familyImg2 = "/assets/outdoor-celebrations.jpg";
const familyImg3 = "/assets/outdoor-celebrations.jpg";

const corporateImg1 = "/images/articles/article-image11.jpg";
const corporateImg2 = "/images/articles/article-image11.jpg";
const corporateImg3 = "/images/articles/article-image11.jpg";

/* ---------- Event data ---------- */
const eventCategories = [
  {
    number: "01",
    title: "Weddings & Nikah Ceremonies",
    headline: "Weddings & Nikah Ceremonies",
    description:
      "Celebrate nikah, mehndi, valima, and wedding events with suitable venue arrangements and accommodation options for family and guests.",
    icon: Heart,
    images: [weddingImg1, weddingImg2, weddingImg3],
  },
  {
    number: "02",
    title: "Family Gatherings & Celebrations",
    headline: "Family Gatherings & Celebrations",
    description:
      "Plan birthdays, anniversaries, family reunions, and private celebrations in a comfortable setting surrounded by the Bhurban hills.",
    icon: Users,
    images: [familyImg1, familyImg2, familyImg3],
  },
  {
    number: "03",
    title: "Corporate Meetings & Retreats",
    headline: "Corporate Meetings & Retreats",
    description:
      "Arrange corporate gatherings, business retreats, and team events with accommodation options for attendees.",
    icon: Briefcase,
    images: [corporateImg1, corporateImg2, corporateImg3],
  },
];

/* ---------- Single event card ---------- */
const EventCard = ({
  event,
  index,
  isInView,
}: {
  event: typeof eventCategories[0];
  index: number;
  isInView: boolean;
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const Icon = event.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % event.images.length);
    }, 3000 + index * 400);
    return () => clearInterval(timer);
  }, [event.images.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
      className="group relative rounded-xl overflow-hidden"
      style={{ background: "hsl(160 15% 15%)" }}
    >
      {/* Rotating Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={imgIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={event.images[imgIndex]}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(160 15% 12% / 0.9) 0%, hsl(160 15% 12% / 0.2) 60%, transparent 100%)",
          }}
        />
        {/* Number badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="text-xs font-mono tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{
              background: "hsl(var(--primary) / 0.15)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.3)",
            }}
          >
            {event.number}
          </span>
        </div>
        {/* Icon */}
        <motion.div
          className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm"
          style={{ background: "hsl(0 0% 100% / 0.08)", color: "hsl(0 0% 95%)" }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon size={18} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3
          className="font-display text-xl md:text-2xl font-normal leading-snug transition-colors duration-300 group-hover:text-primary"
          style={{ color: "hsl(0 0% 92%)" }}
        >
          {event.headline}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "hsl(0 0% 58%)" }}
        >
          {event.description}
        </p>
        <motion.div
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide pt-2"
          style={{ color: "hsl(var(--primary))" }}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/events">Learn More →</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ---------- Section ---------- */
const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-8 md:px-16 overflow-hidden"
      style={{ background: "hsl(160 15% 12%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--primary))" }}
          >
            Weddings &amp; Private Events
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6"
            style={{ color: "hsl(0 0% 95%)" }}
          >
            Weddings and Private Events in Bhurban, Murree
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-[2px] mx-auto mb-6"
            style={{ background: "hsl(var(--primary))" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-4"
            style={{ color: "hsl(0 0% 60%)" }}
          >
            Bring family, friends, and colleagues together at Himalaya Villas
            and Resort Hotel. Our property offers a mountain setting for
            weddings, family celebrations, and corporate gatherings, with
            accommodation available for guests attending your event.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "hsl(0 0% 60%)" }}
          >
            Discuss your preferred dates, number of guests, venue arrangements,
            and dining requirements with our team to plan an event that suits
            your occasion.
          </motion.p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {eventCategories.map((event, index) => (
            <EventCard
              key={event.title}
              event={event}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA — two buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14 md:mt-20"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-white/[0.06]"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.25)",
              color: "hsl(0 0% 92%)",
            }}
          >
            Explore Our Events
            <span aria-hidden>→</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2  bg-primary rounded-md px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300"
           
          >
            Request an Event Quote
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;