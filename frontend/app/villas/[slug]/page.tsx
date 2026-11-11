// app/villas/[slug]/page.tsx
import type { Metadata } from "next";
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
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { RelatedGuides } from "@/components/seo/RelatedGuides";
import { featuredGuides, guideHubPath } from "@/lib/guides";
import type { Room } from "@/content/villas/villa-content";
import { withEditedPageSeo } from "@/lib/erp-edits";

export async function generateStaticParams() {
  return Object.keys(roomsBySlug).map((slug) => ({ slug }));
}

function villaDocumentTitle(room: Room): string {
  const beds = room.details.find((item) => /^beds?$/i.test(item.label))?.value ?? "private stay";
  const guests = room.details.find((item) => /guest/i.test(item.label))?.value ?? "";
  const sleeps = guests.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const sleepPart = sleeps ? `, sleeps ${sleeps}` : "";
  const shared = Object.values(roomsBySlug).filter((other) => other.name === room.name).length > 1;
  const name = shared ? `${room.name}, ${room.collection}` : room.name;
  return `${name} – ${beds}${sleepPart} | Himalaya Villas & Resorts`;
}

async function baseMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  if (!room) return { title: "Room not found | Himalaya Villas Bhurban", description: "Villa details." };

  const title = villaDocumentTitle(room);
  const description = room.metaDescription ?? room.description ?? "A villa stay at Himalaya Villas, Bhurban.";

  return createPageMetadata({
    title,
    description,
    path: `/villas/${slug}`,
    appendSiteBrand: false,
    ogImage: room.images[0],
  });
}

/** Route metadata with any SEO fields published from ERP Page Editing overlaid. */
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  return withEditedPageSeo(`/villas/${slug}`, await baseMetadata(props));
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
      <RelatedGuides
        heading="Before you book"
        guides={featuredGuides(["stays", "getting-here", "weather-and-seasons"], slug)}
        hub={{ href: guideHubPath("getting-here"), title: "Getting Here" }}
      />
      <Footer />
    </div>
  );
}