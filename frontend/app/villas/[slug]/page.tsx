// app/villas/[slug]/page.tsx
import { notFound } from "next/navigation";
import { roomsBySlug } from "@/content/villas/villa-content";
import RoomDetailClient from "./VillasClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import VirtualExperienceSection from "@/components/VirtualExperienceSection";

// Generate static params for all rooms
export async function generateStaticParams() {
  return Object.keys(roomsBySlug).map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each room
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  
  if (!room) {
    return {
      title: "Room not found",
      description: "Villa room details.",
    };
  }

  const title = `${room.name} — ${room.collection}`;
  const desc = room.description ?? "Villa room details.";

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: room.images,   // Updated to use the new images array
    },
  };
}

export default async function RoomDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  
  if (!room) {
    notFound();
  }

  return (
    <>
      <Navbar  theme="light"/>
<section  id="villa-details-section">
      <RoomDetailClient room={room} />

      <VirtualExperienceSection />

      </section>
      <Footer />
    </>
  );
}