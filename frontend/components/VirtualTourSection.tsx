"use client";

import { useMemo, useState } from "react";
import { Expand, Info } from "lucide-react";

type Props = {
  /** If omitted, uses NEXT_PUBLIC_VIRTUAL_TOUR_URL. */
  tourUrl?: string;
};

export default function VirtualTourSection({ tourUrl }: Props) {
  const src = useMemo(() => tourUrl ?? process.env.NEXT_PUBLIC_VIRTUAL_TOUR_URL ?? "", [tourUrl]);
  const [showHint, setShowHint] = useState(false);

  return (
    <section id="virtual-tour" className="bg-[#0f1412] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">3D Virtual Tour</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl text-white leading-tight">
              Explore the villa in a{" "}
              <span className="italic text-[#c9a55b]">real</span> 3D walkthrough
            </h2>
            <p className="mt-5 text-[12px] md:text-[13px] text-white/70 max-w-2xl leading-relaxed">
              Move room-to-room, look around in 360°, and feel the space before you book.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowHint((p) => !p)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[12px] text-white/85 hover:bg-white/10 transition"
            >
              <Info className="h-4 w-4" />
              How to use
            </button>
            {src ? (
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#c9a55b] px-4 py-2 text-[12px] font-semibold text-black hover:bg-[#d9b565] transition"
              >
                <Expand className="h-4 w-4" />
                Full screen
              </a>
            ) : null}
          </div>
        </div>

        {showHint && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[12px] text-white/75">
            Use your mouse/trackpad to drag, scroll to zoom, and tap hotspots to move between rooms.
          </div>
        )}

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(201,165,91,0.22),transparent_50%),radial-gradient(900px_circle_at_90%_30%,rgba(255,255,255,0.10),transparent_55%)]" />

            <div className="relative p-4 sm:p-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f0d]">
                {src ? (
                  <iframe
                    title="Himalaya Villas 3D tour"
                    src={src}
                    className="absolute inset-0 h-full w-full"
                    allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; autoplay; clipboard-write"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center px-6 text-center">
                    <div>
                      <p className="text-white/90 font-display text-2xl md:text-3xl">3D Tour coming soon</p>
                      <p className="mt-3 text-[12px] text-white/60 max-w-md">
                        Add your tour embed link in{" "}
                        <span className="font-mono">NEXT_PUBLIC_VIRTUAL_TOUR_URL</span> to enable the interactive tour.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Tip: booked dates appear in the stay calendar
                </p>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#c9a55b]" aria-hidden />
                  <span className="text-[12px] text-white/70">Interactive 3D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

