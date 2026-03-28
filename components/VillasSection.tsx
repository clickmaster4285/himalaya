"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Villa } from "@/lib/villa-types";

const categories = ["All", "Presidential", "Family", "Suite"] as const;

const VillaCard = ({ villa, index, isInView }: { villa: Villa; index: number; isInView: boolean }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm"
    >
      <Link href={`/villas/${villa.slug}`} className="block">
        <div className="relative h-64 overflow-hidden md:h-72">
          <img
            src={villa.image}
            alt={villa.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs uppercase tracking-widest text-white/85">{villa.category}</p>
            <h3 className="font-display text-2xl font-normal leading-tight">{villa.title}</h3>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{villa.description}</p>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="font-display text-lg italic text-foreground">{villa.price}</span>
            <span className="text-neutral-500 transition-colors duration-300 group-hover:text-foreground">
              View details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const VillasSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [villas, setVillas] = useState<Villa[]>([]);

  useEffect(() => {
    fetch("/api/villas")
      .then((r) => r.json())
      .then((d) => setVillas(Array.isArray(d.villas) ? d.villas : []))
      .catch(() => setVillas([]));
  }, []);

  const filteredVillas = useMemo(() => {
    if (activeCategory === "All") return villas;
    return villas.filter((villa) => villa.category === activeCategory);
  }, [activeCategory, villas]);

  const displayedVillas = filteredVillas.slice(0, visibleCount);

  return (
    <section ref={sectionRef} className="!bg-[#EAE2D7] overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl font-normal italic text-foreground md:text-6xl lg:text-7xl"
            >
              Our Villas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3 font-body text-sm text-muted-foreground md:text-base"
            >
              Each villa tells its own story — curated from the estate catalog
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(6);
                }}
                className={`rounded-sm border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === category
                    ? "border-foreground bg-foreground text-white"
                    : "border-border bg-white text-foreground hover:bg-foreground/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12 h-px w-full bg-border" />

        {villas.length === 0 ? (
          <p className="text-center font-sans text-sm text-muted-foreground">Loading villas…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {displayedVillas.map((villa, index) => (
                <VillaCard key={villa.slug} villa={villa} index={index} isInView={isInView} />
              ))}
            </div>

            {filteredVillas.length > visibleCount && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-foreground hover:text-white"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VillasSection;
