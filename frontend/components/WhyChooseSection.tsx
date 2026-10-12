"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mountain, Building2, PartyPopper, Heart, Sparkles, Settings } from "lucide-react";


const bgImages = [
  "/assets/why-villa-private.jpg",
  "/assets/why-villa-garden.jpg",
  "/assets/why-villa-view.jpg",
  "/assets/why-villa-lounge.jpg",
];

const features = [
  {
    icon: Building2,
    title: "Multiple Accommodation Options",
    description:
      "Choose from rooms, suites, apartments, and complete villas based on your preferred stay arrangement.",
  },
  {
    icon: Heart,
    title: "Privacy for Families & Groups",
    description:
      "Book a complete villa with multiple bedrooms and shared living areas for your family or group.",
  },
  {
    icon: Mountain,
    title: "Mountain Setting in Bhurban",
    description:
      "Enjoy a stay surrounded by the scenic hills of Bhurban, with access to attractions across the Murree region.",
  },
  {
    icon: PartyPopper,
    title: "Accommodation & Events at One Property",
    description:
      "Arrange private stays, family gatherings, weddings, and corporate events without needing separate locations for accommodation and celebrations.",
  },
  {
    icon: Sparkles,
    title: "Ideal for Destination Weddings",
    description:
      "A mountain backdrop that turns a wedding into a memory nobody forgets.",
  },
  {
    icon: Settings,
    title: "Professional Event Management",
    description:
      "End-to-end coordination, from décor to catering.",
  },
];

const WhyChooseSection = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden">
      {/* Animated background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={bgImages[bgIndex]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/85" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body mb-4 text-primary/70">
           Why Choose Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal italic text-primary-foreground">
           Why Choose Himalaya Villas
            <br />
          and Resort Hotel?
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-primary-foreground/70">
         Finding the right hotel or resort in Murree means choosing a property that suits your accommodation needs, guest requirements, and travel plans. We offer different ways to stay, from individual room bookings to complete private villas, along with spaces for family gatherings and special events.
   </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                className="group text-center px-4"
              >
                {/* Icon */}
                <motion.div
                  className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center border border-primary/20 bg-primary/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon
                    className="w-6 h-6 text-primary"
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="font-display text-lg md:text-xl font-medium mb-3 text-primary-foreground">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed text-primary-foreground/60">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="mt-6 mx-auto h-px w-0 group-hover:w-12 transition-all duration-700 bg-primary"
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA — Book Your Stay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-md border border-[#c9a24a] bg-[#fdfaf3] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2b2b2b] transition hover:bg-[#f5efdf]"
          >
            Book Your Stay
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;