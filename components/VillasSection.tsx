'use client';

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { villas } from "@/lib/villas";

const categories = ["All", "Presidential", "Family", "Suite"];

const VillaCard = ({ villa, index, isInView }: { villa: (typeof villas)[0]; index: number; isInView: boolean }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="group bg-white rounded-xl shadow-sm overflow-hidden border border-border"
    >
      <Link href={`/villas/${villa.slug}`} className="block">
        <div className="relative h-64 md:h-72 overflow-hidden">
          <img src={villa.image} alt={villa.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute left-4 bottom-4 text-white">
            <p className="text-xs uppercase tracking-widest text-white/85">{villa.category}</p>
            <h3 className="text-2xl font-display font-normal leading-tight">{villa.title}</h3>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{villa.description}</p>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg italic text-foreground font-display">{villa.price}</span>
            <span className="text-neutral-500 group-hover:text-foreground transition-colors duration-300">View details →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const VillasSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredVillas = useMemo(() => {
    if (activeCategory === "All") return villas;
    return villas.filter((villa) => villa.category === activeCategory);
  }, [activeCategory]);

  const displayedVillas = filteredVillas.slice(0, visibleCount);

  return (
    <section ref={sectionRef} className="!bg-[#EAE2D7] py-24 md:py-36 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-foreground italic"
            >
              Our Villas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3 text-muted-foreground text-sm md:text-base font-body"
            >
              Each villa tells its own story
            </motion.p>
          </div>

          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(6);
                }}
                className={`text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-sm border ${
                  activeCategory === category
                    ? "border-foreground bg-foreground text-white"
                    : "border-border bg-white text-foreground hover:bg-foreground/10"
                } transition-all duration-200`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-border mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedVillas.map((villa, index) => (
            <VillaCard key={`${villa.slug}-${index}`} villa={villa} index={index} isInView={isInView} />
          ))}
        </div>

        {filteredVillas.length > visibleCount && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-6 py-3 border border-border text-sm font-semibold uppercase tracking-wider hover:bg-foreground hover:text-white transition-all duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VillasSection;
