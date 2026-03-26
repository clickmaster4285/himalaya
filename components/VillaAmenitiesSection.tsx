"use client";

import { useMemo, useState } from "react";

type Props = {
  title?: string;
  amenities: string[];
  className?: string;
  imageByAmenity?: Record<string, string>;
  defaultImage?: string;
};

const normalizeKey = (value: string) => value.trim().toLowerCase();

const builtInAmenityImages: Record<string, string> = {
  "private pool": "/assets/why-villa-private.jpg",
  "butler service": "/assets/services-events-real.jpg",
  "premium toiletries": "/assets/amenities-interior-real.jpg",
  "mountain views": "/assets/why-villa-view.jpg",
  fireplace: "/assets/journal-bonfire.jpg",
  "gourmet kitchen": "/assets/gallery-dining-night.jpg",
};

export default function VillaAmenitiesSection({
  title = "Amenities",
  amenities,
  className,
  imageByAmenity,
  defaultImage = "/assets/amenities-interior-real.jpg",
}: Props) {
  const items = useMemo(() => amenities.filter(Boolean), [amenities]);
  const images = useMemo(() => {
    const external = Object.fromEntries(
      Object.entries(imageByAmenity ?? {}).map(([k, v]) => [normalizeKey(k), v]),
    );
    return { ...builtInAmenityImages, ...external };
  }, [imageByAmenity]);

  const initialActive = items[0] ?? "";
  const [active, setActive] = useState(initialActive);

  const activeImage =
    images[normalizeKey(active)] ||
    images[normalizeKey(items[0] ?? "")] ||
    defaultImage;

  if (items.length === 0) return null;

  return (
    <section className={className}>
      <div className="bg-[#1E2421] text-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-20 lg:px-28">
          <h2 className="font-display text-5xl md:text-6xl italic mb-10">
            {title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 border border-white/15 p-6 md:p-8">
              <div className="space-y-0">
                {items.map((item) => {
                  const isActive = normalizeKey(item) === normalizeKey(active);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setActive(item)}
                      className="w-full text-left py-4 border-b border-white/10 flex items-center justify-between gap-4 group"
                    >
                      <span
                        className={[
                          "text-sm md:text-base tracking-wide transition-colors",
                          isActive ? "text-[#C9A55B]" : "text-white/80 group-hover:text-white",
                        ].join(" ")}
                      >
                        {item}
                      </span>
                      <span
                        className={[
                          "transition-opacity",
                          isActive ? "opacity-100 text-[#C9A55B]" : "opacity-0 group-hover:opacity-60",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 border border-white/15 p-3 md:p-4">
              <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={active ? `${active} image` : "Amenity image"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

