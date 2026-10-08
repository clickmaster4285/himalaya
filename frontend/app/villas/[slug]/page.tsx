// app/villas/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { amenityImages, roomsBySlug } from "@/content/villas/villa-content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomDetailClient from "./VillasClient";
import VirtualExperienceSection from "@/components/VirtualExperienceSection";
import { getUsedSectionImages } from "@/components/VillaRoomSeoContent";
import VillaImageGallery from "@/components/VillaImageGallery";
import VillaAmenitiesSection from "@/components/VillaAmenitiesSection";

export async function generateStaticParams() {
  return Object.keys(roomsBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  if (!room) return { title: "Room not found", description: "Villa room details." };

  const title = room.seoTitle ?? `${room.name} — ${room.collection}`;
  const desc = room.metaDescription ?? room.description ?? "Villa room details.";

  return {
    title,
    description: desc,
    openGraph: { title, description: desc, images: room.images },
  };
}

export default async function RoomDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  if (!room) notFound();

  const usedInline = getUsedSectionImages(room);
  const heroImage = room.images[0];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — full-bleed image with overlay */}
      <section className="relative min-h-150 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage || "/assets/villas/placeholder.jpg"}
            alt={room.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex items-center justify-center min-h-150 px-6">
          <div className="text-center text-white max-w-4xl">
            <div className="flex items-center justify-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-px w-8 bg-[#c9a55b]"></span>
              <span>
                {room.collection} · {room.tag}
              </span>
              <span className="h-px w-8 bg-[#c9a55b]"></span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
              {room.h1 ?? room.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {room.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <RoomDetailClient room={room} />

      {/* Leftover images gallery */}
      <VillaImageGallery
        images={room.images}
        roomName={room.name}
        exclude={[...usedInline, heroImage].filter(Boolean) as string[]}
        heading="More Views"
      />
 <VillaAmenitiesSection
          amenities={room.amenities}
          imageByAmenity={amenityImages}
         
        />
      <VirtualExperienceSection />
      <Footer />
    </div>
  );
}