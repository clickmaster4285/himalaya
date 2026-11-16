"use client";

import Image from "next/image";

type GalleryItem = { src: string; alt: string; label: string; subtitle: string };

const photos: GalleryItem[] = [
  {
    src: "/images/winter-villas/winter-lodge-view.jpeg",
    alt: "Snow-covered lodge and mountain view",
    label: "The Ridge",
    subtitle: "Snow-covered lodge and mountain view",
  },
  {
    src: "/images/winter-villas/lodge-terraces-snow.jpeg",
    alt: "Lodge terraces after snowfall",
    label: "Terraces",
    subtitle: "Lodge terraces after snowfall",
  },
  {
    src: "/images/winter-villas/snowy-lodge-branches.jpeg",
    alt: "Snow-laden branches beside the lodge",
    label: "Branches",
    subtitle: "Snow-laden branches beside the lodge",
  },
  {
    src: "/images/winter-villas/winter-lodge-courtyard.jpeg",
    alt: "Snow-covered lodge courtyard",
    label: "Courtyard",
    subtitle: "Snow-covered lodge courtyard",
  },
];

export default function ArchGallery() {
  const [featured, ...rest] = photos;

  return (
    <section className="bg-[color:var(--frost)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            A Winter Journal
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[color:var(--navy-deep)] md:text-5xl">
            Winter at the Lodge
          </h2>
          <p className="mt-4 text-[color:var(--navy)]/70">
            A snowfall in the mountains, held still in four moments.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-3 md:h-[640px]">
          {/* Featured image (large, left) */}
          <div className="group relative overflow-hidden rounded-2xl shadow-[0_20px_60px_-30px_rgba(15,27,61,0.4)] animate-fade-up md:col-span-2 md:row-span-3">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                quality={90}
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-[color:var(--navy-deep)]/0 to-transparent opacity-70 transition group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-serif text-2xl text-white">{featured.label}</h3>
              <p className="mt-1 text-sm text-white/85">{featured.subtitle}</p>
            </div>
          </div>

          {/* Three thumbnails (right column) */}
          {rest.map((photo, index) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden rounded-2xl shadow-[0_20px_60px_-30px_rgba(15,27,61,0.4)] animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 0.06}s` }}
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={90}
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-[color:var(--navy-deep)]/0 to-transparent opacity-70 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-lg text-white">{photo.label}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/85">{photo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}