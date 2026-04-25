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
  title: "Himalaya Premium Villas | Book Your Stay",
  description:
    "Book your stay at Himalaya Premium Villas in Bhurban for exclusive luxury and unforgettable experiences.",
  path: "/book-now",
  ogImage: "/assets/gallery-exterior.jpg",
});

export const dynamic = "force-dynamic";

const BookNowPage = async () => {
  const villas = await getPublishedVillas();

  return (
    <div className="min-h-screen">
      <HomeStructuredData />
      <h1 className="sr-only">Book Your Stay at Himalaya Premium Villas</h1>
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

export default BookNowPage;