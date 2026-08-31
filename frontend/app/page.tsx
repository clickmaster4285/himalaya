import type { Metadata } from "next";
import { HomeStructuredData } from "@/components/seo/StructuredData";
import Script from "next/script";
import localBusinessSchema from '@/public/himalayavillas-localbusiness-schema.json';
import faqSchema from '@/public/himalayavillas-faq-schema.json';
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import LiveWeatherMurree from "@/components/LiveWeatherMurree";
import VillasAccommodations from "@/components/VillasAccommodations";
import ServicesSection from "@/components/ServicesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import MomentsSection from "@/components/MomentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GlimpseSection from "@/components/GlimpseSection";
import JournalSection from "@/components/JournalSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import FrequentlyVisitedPages from "@/components/FrequentlyVisitedPages";
import HomeFAQSection from "@/components/HomeFAQSection";
import ReserveSection from "@/components/ReserveSection";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hotels in Murree - Himalaya Villas & Resort, Bhurban",
  description:
    "Looking for luxury hotels in Murree? Himalaya Villas & Resort offers private villas, stunning views & top hospitality. Book now!",
  path: "/",
  ogImage: "/assets/gallery-exterior.jpg",
});

export const dynamic = "force-dynamic";

const Index = async () => {
  return (
    <div className="min-h-screen">
      <HomeStructuredData />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
 
      <HeroSection />
      <PhilosophySection />
      <LiveWeatherMurree />
      <VillasAccommodations/>
      <ServicesSection />
      <AmenitiesSection />
      <MomentsSection />
      <GlimpseSection />
      <JournalSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FrequentlyVisitedPages />
      <HomeFAQSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default Index;
