"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Villa } from "@/lib/villa-types";
import { VILLA_BLOG_POSTS } from "@/lib/villa-blog-posts";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease },
  };
}

export default function BlogsPageClient({ villas }: { villas: Villa[] }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const asideRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
  const asideInView = useInView(asideRef, { once: true, margin: "-60px" });

  const [featured, ...rest] = VILLA_BLOG_POSTS;
  const dur = reduceMotion ? 0 : 0.55;

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[#e8dfd0]/80 bg-[#0f0e0c] px-6 pb-20 pt-14 md:px-12 md:pb-28 md:pt-20 lg:px-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#c9a55b]/15 blur-[100px]"
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [1, 1.08, 1],
                    opacity: [0.35, 0.5, 0.35],
                  }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#8b6914]/20 blur-[120px]"
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [1.05, 1, 1.05],
                    opacity: [0.25, 0.4, 0.25],
                  }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a55b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <motion.div
            initial={false}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: dur, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9a55b] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9a55b]" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e8dcc4]">
              Journal · Villas · Hills
            </span>
          </motion.div>

          <motion.h1
            initial={false}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur + 0.1, delay: 0.08, ease }}
            className="mt-8 max-w-4xl font-display text-4xl font-normal leading-[1.08] tracking-tight text-white md:text-6xl lg:text-[4.25rem]"
          >
            Stories from the
            <span className="block bg-gradient-to-r from-[#f0e6d4] via-[#c9a55b] to-[#e8d4a8] bg-clip-text text-transparent">
              estate &amp; the peaks
            </span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, delay: 0.18, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
          >
            Guides, inspiration, and quiet notes on villa life — written for guests who care about space, light, and the
            Bhurban air.
          </motion.p>

          <motion.div
            initial={false}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="mt-12 h-px max-w-md origin-left bg-gradient-to-r from-[#c9a55b] via-[#c9a55b]/40 to-transparent"
          />
        </div>
      </section>

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-20 lg:px-20">
        {/* Featured */}
        <div ref={gridRef} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b6914]">Featured</p>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease }}
            >
            <Link
              href={
                featured.relatedVillaSlug
                  ? `/villas/${encodeURIComponent(featured.relatedVillaSlug)}`
                  : "/villas"
              }
              className="group mt-4 block overflow-hidden rounded-2xl border border-[#e5d9c4] bg-white shadow-[0_24px_80px_-24px_rgba(26,22,18,0.35)] transition-shadow duration-500 hover:shadow-[0_32px_100px_-28px_rgba(201,165,91,0.25)]"
            >
              <div className="relative aspect-[21/10] overflow-hidden md:aspect-[2.2/1]">
                <motion.img
                  src={featured.coverImage}
                  alt=""
                  className="h-full w-full object-cover"
                  whileHover={reduceMotion ? {} : { scale: 1.04 }}
                  transition={{ duration: 0.7, ease }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                    {new Date(featured.date).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {featured.readMinutes} min
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-medium leading-tight text-white md:text-4xl md:leading-[1.15]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a55b] transition group-hover:gap-3">
                    {featured.relatedVillaSlug ? "Open villa" : "Explore villas"}
                    <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
            </motion.div>

            {/* Grid */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {rest.map((post, i) => {
                const href = post.relatedVillaSlug
                  ? `/villas/${encodeURIComponent(post.relatedVillaSlug)}`
                  : "/villas";
                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.06 * i, ease }}
                  >
                    <Link
                      href={href}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e5d9c4] bg-[#faf8f4] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a55b]/50 hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <motion.img
                          src={post.coverImage}
                          alt=""
                          className="h-full w-full object-cover"
                          whileHover={reduceMotion ? {} : { scale: 1.06 }}
                          transition={{ duration: 0.55, ease }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                          {new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })} ·{" "}
                          {post.readMinutes} min
                        </p>
                        <h3 className="mt-2 font-display text-lg font-medium leading-snug text-neutral-900 group-hover:text-[#6b5428] md:text-xl">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-800">
                          Read
                          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <motion.aside
            ref={asideRef}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 28 }}
            animate={asideInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-[#dccfb8] bg-gradient-to-b from-white to-[#f5f0e8] p-1 shadow-[0_20px_60px_-20px_rgba(40,32,24,0.2)]">
              <div
                className="rounded-[14px] px-5 py-7 md:px-7 md:py-9"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,246,238,0.98) 50%, rgba(245,236,220,0.5) 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9a55b]/20 text-lg">✦</span>
                  <div>
                    <h2 className="font-display text-xl text-neutral-900 md:text-2xl">Villa spotlights</h2>
                    <p className="text-[11px] uppercase tracking-wider text-neutral-500">Live from the collection</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                  Tap through every residence — each one crafted for views, comfort, and calm.
                </p>

                <ul className="mt-8 max-h-[min(520px,58vh)] space-y-1 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:thin]">
                  {villas.length === 0 ? (
                    <li className="py-8 text-center text-sm text-neutral-500">Loading villas…</li>
                  ) : (
                    villas.map((v, i) => (
                      <motion.li
                        key={v.slug}
                        initial={{ opacity: 0, x: 12 }}
                        animate={asideInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: reduceMotion ? 0 : 0.04 * i, duration: 0.4 }}
                      >
                        <Link
                          href={`/villas/${v.slug}`}
                          className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-white/90"
                        >
                          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-[#eadfce] shadow-sm">
                            <img src={v.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="pointer-events-none absolute inset-0 bg-[#c9a55b]/0 transition-colors group-hover:bg-[#c9a55b]/10" />
                          </div>
                          <div className="min-w-0 flex-1 py-0.5">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#8b6914]">{v.category}</p>
                            <p className="font-display text-[15px] leading-tight text-neutral-900 transition-colors group-hover:text-[#6b5428]">
                              {v.title}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-[11px] text-neutral-500">{v.description}</p>
                          </div>
                        </Link>
                      </motion.li>
                    ))
                  )}
                </ul>

                <motion.div whileHover={reduceMotion ? {} : { scale: 1.02 }} whileTap={reduceMotion ? {} : { scale: 0.98 }}>
                  <Link
                    href="/villas"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg transition hover:bg-neutral-800"
                  >
                    All villas
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease }}
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#dccfb8] bg-gradient-to-r from-[#faf6ef] via-white to-[#f8f2ea] px-8 py-10 text-center md:flex-row md:text-left"
        >
          <div>
            <p className="font-display text-2xl text-neutral-900 md:text-3xl">Ready to pick your villa?</p>
            <p className="mt-2 max-w-lg text-sm text-neutral-600">
              Browse the full estate, compare categories, and book your dates when you are ready.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link
              href="/villas"
              className="rounded-xl bg-neutral-900 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              View villas
            </Link>
            <Link
              href="/book"
              className="rounded-xl border-2 border-neutral-800 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              Book a stay
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
