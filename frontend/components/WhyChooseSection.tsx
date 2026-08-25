"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mountain, Building2, PartyPopper, ShieldCheck, BedDouble, Heart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";


const bgImages = [
  "/assets/why-villa-private.jpg",
  "/assets/why-villa-garden.jpg",
  "/assets/why-villa-view.jpg",
  "/assets/why-villa-lounge.jpg",
];

const features = [
{
  icon: Mountain,
  title: "Panoramic Mountain Views",
  description:
    "Every corner of the estate looks out over the Murree hills, creating a peaceful, unforgettable retreat.",
},
{
  icon: Building2,
  title: "Luxury Villa Architecture",
  description:
    "Elegant interiors, premium finishes, and spacious layouts designed for real comfort, not just decoration.",
},
{
  icon: PartyPopper,
  title: "Large Outdoor Event Space",
  description:
    "Expansive lawns and open terraces, perfect for weddings, celebrations, and family gatherings.",
},
  {
    icon: ShieldCheck,
    title: "Private & Secure Estate",
    description: "A gated property with complete privacy, so your stay is genuinely exclusive.",
  },
  {
    icon: Heart,
    title: "Ideal for Destination Weddings",
    description: "A mountain backdrop that turns a wedding into a memory nobody forgets.",
     link: "/wedding-venue-near-islamabad",
  },
  {
    icon: Settings,
    title: "Professional Event Management",
    description: "End-to-end coordination, from décor to catering.",
  },
];

const WhyChooseSection = () => {

  const router = useRouter();


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
            The Difference
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal italic text-primary-foreground">
            Why Guests Choose
            <br />
            Himalaya Villas &amp; Resort
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-primary-foreground/70">
            When travellers search for the best hotel in Murree, they&apos;re usually comparing three things — privacy, view, and service. Here&apos;s where we stand out.
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
                 onClick={() => feature.link && router.push(feature.link)}
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
      </div>
    </section>
  );
};

export default WhyChooseSection;
