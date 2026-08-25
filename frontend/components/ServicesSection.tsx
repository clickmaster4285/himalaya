"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, UtensilsCrossed, Sparkles, PartyPopper, Mountain, Briefcase } from "lucide-react";




const celebrationImg = "/assets/outdoor-celebrations.jpg";
const celebrationImg2 = "/assets/celebration2.jpg";
const celebrationImg3 = "/assets/celebrations3.jpg";

const diningImg = "/assets/philosophy-3.jpg";
const diningImg2 = "/assets/dining.jpg";
const diningImg3 = "/assets/dining2.jpg";


const getawaysImg = "/assets/outdoor-events.jpg";
const getawaysImg2 = "/assets/philosophy-1.jpg";
const getawaysImg3 = "/assets/getaway-apt.jpg";


const momentsImg = "/assets/moments.jpg";
const momentsImg2 = "/assets/moments2.jpg";
const momentsImg3 = "/assets/moments3.jpg";


const activitiesImg = "/assets/philosophy-5.jpg";
const activitiesImg2 = "/assets/dining-outdoor.jpg";
const activitiesImg3 = "/assets/philosophy-2.jpg";


const retreatsImg = "/assets/philosophy-4.jpg";
const retreatsImg2 = "/assets/hero-image.jpg";
const retreatsImg3 = "/assets/retreat.jpg";


const services = [
  {
    number: "01",
    title: "Destination Weddings",
    headline: "Destination Weddings",
    description:
      "Say yes in a setting made for luxury outdoor celebrations, surrounded by cedar forests and mountain air.",
    icon: Heart,
    images: [celebrationImg, celebrationImg2, celebrationImg3],
  },
  {
    number: "02",
    title: "Curated Dining",
    headline: "Curated Dining",
    description:
      "From terrace dinners to long lunches overlooking the Murree hills, our private chefs design menus around your stay or event.",
    icon: UtensilsCrossed,
    images: [diningImg, diningImg2, diningImg3],
  },
  {
    number: "03",
    title: "Private Getaways",
    headline: "Private Getaways",
    description:
      "A reserved, high-end retreat where stillness replaces the noise of the city.",
    icon: Sparkles,
    images: [getawaysImg, getawaysImg2, getawaysImg3],
  },
  {
    number: "04",
    title: "Celebrations & Events",
    headline: "Celebrations & Events",
    description:
      "We sit with you, understand the occasion, and build the entire experience — from décor to the last toast.",
    icon: PartyPopper,
    images: [momentsImg, momentsImg2, momentsImg3],
  },
  {
    number: "05",
    title: "Guided Mountain Activities",
    headline: "Guided Mountain Activities",
    description:
      "Forest walks at dawn, guided trails through cedar groves, and stargazing sessions away from city lights.",
    icon: Mountain,
    images: [activitiesImg, activitiesImg2, activitiesImg3],
  },
  {
    number: "06",
    title: "Corporate Retreats",
    headline: "Corporate Retreats",
    description:
      "A private executive environment away from the city, ideal for teams that need focus and a change of altitude.",
    icon: Briefcase,
    images: [retreatsImg, retreatsImg2, retreatsImg3],
  },
];

const ServiceCard = ({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const Icon = service.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % service.images.length);
    }, 2800 + index * 400);
    return () => clearInterval(timer);
  }, [service.images.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      className="group relative rounded-xl overflow-hidden"
      style={{ background: "hsl(160 15% 15%)" }}
    >
      {/* Rotating Image */}
      <div className="relative h-52 md:h-56 overflow-hidden">
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
              src={service.images[imgIndex]}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, hsl(160 15% 12% / 0.9) 0%, hsl(160 15% 12% / 0.2) 60%, transparent 100%)" }}
        />
        {/* Number badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="text-xs font-mono tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.3)" }}
          >
            {service.number}
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
          {service.headline}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "hsl(0 0% 55%)" }}
        >
          {service.description}
        </p>
        <motion.div
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide pt-2"
          style={{ color: "hsl(var(--primary))" }}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/contact">Learn More →</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-8 md:px-16"
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
            Services & Facilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-3"
            style={{ color: "hsl(0 0% 95%)" }}
          >
            The Mountain as <span className="italic" style={{ color: "hsl(var(--primary))" }}>Your Venue</span>
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(0 0% 60%)" }}
          >
            There&apos;s no grander setting in Pakistan for the moments that matter most. Here&apos;s what makes our resort more than just another name on the list of hotels in Murree, Pakistan.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
