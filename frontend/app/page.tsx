import type { Metadata } from "next";
import { HomeStructuredData } from "@/components/seo/StructuredData";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import LiveWeatherMurree from "@/components/LiveWeatherMurree";
import VillasSection from "@/components/VillasSection";
import ServicesSection from "@/components/ServicesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import MomentsSection from "@/components/MomentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GlimpseSection from "@/components/GlimpseSection";
import JournalSection from "@/components/JournalSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ReserveSection from "@/components/ReserveSection";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { getPublishedVillas } from "@/lib/villas-fetch";

export const metadata: Metadata = createPageMetadata({
  title: "Himalaya Villas and Resort | Private Luxury Estate Bhurban",
  description:
    "Private luxury estate in Bhurban for exclusive stays, destination weddings, and curated mountain experiences.",
  path: "/",
  ogImage: "/assets/gallery-exterior.jpg",
});

export const dynamic = "force-dynamic";

const Index = async () => {
  const villas = await getPublishedVillas();

  return (
    <div className="min-h-screen">
      <HomeStructuredData />
      <h1 className="sr-only">Himalaya Villas and Resort in Bhurban</h1>
      <HeroSection />
      <PhilosophySection />
      <LiveWeatherMurree />
      <VillasSection initialVillas={villas} />
      <ServicesSection />
      <AmenitiesSection />
      <MomentsSection />
      <GlimpseSection />
      <JournalSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default Index;
