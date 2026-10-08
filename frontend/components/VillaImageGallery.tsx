// components/VillaImageGallery.tsx
import Image from "next/image";

interface VillaImageGalleryProps {
  images: string[];
  roomName: string;
  /** Images already shown elsewhere on the page (inline sections, hero, thumbnails). */
  exclude?: string[];
  /** Optional heading override. */
  heading?: string;
}

export default function VillaImageGallery({
  images,
  roomName,
  exclude = [],
  heading = "Gallery",
}: VillaImageGalleryProps) {
  const excludeSet = new Set(exclude);
  const remaining = images.filter((src) => !excludeSet.has(src));

  if (remaining.length === 0) return null;

  return (
    <section className="bg-[#e9e2d1] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-[#2b2b2b] leading-snug sm:text-3xl">
          {heading}
        </h2>
        <div className="mt-3 h-px w-16 bg-[#c9a24a]" />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {remaining.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-square overflow-hidden rounded-lg border border-[#eee5d6] bg-white"
            >
              <Image
                src={src}
                alt={`${roomName} — view ${i + 1}`}
                fill
                className="object-cover transition duration-300 hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}