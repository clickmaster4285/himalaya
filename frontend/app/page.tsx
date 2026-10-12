import type { Metadata } from "next";

import { HomeStructuredData } from "@/components/seo/StructuredData";
import Script from "next/script";
import localBusinessSchema from '@/public/himalayavillas-localbusiness-schema.json';
import faqSchema from '@/public/himalayavillas-faq-schema.json';
import { buildHomepageJsonLd } from "@/lib/seo/homepage-schema";
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
import EventsSection from "@/components/EventsSection";
import VirtualTourSection from "@/components/VirtualTourSection";

export const metadata: Metadata = createPageMetadata({
  title: "Himalaya Villas & Resort Hotel in Bhurban, Murree",
  description:
    "Enjoy a comfortable stay at Himalaya Villas and Resort Hotel in Bhurban, Murree. Choose from rooms, suites, apartments and private villas. Book Now!",
  path: "/",
  ogImage: "/assets/gallery-exterior.jpg",
});

export const dynamic = "force-dynamic";

const Index = async () => {
  const homepageSchema = buildHomepageJsonLd();

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
      {/* ✅ New connected graph: LodgingBusiness + WebSite + WebPage + FAQPage */}
      <Script
        id={homepageSchema.id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema.data),
        }}
      />

      <HeroSection />
      <PhilosophySection />
      <LiveWeatherMurree />
      <VillasAccommodations />
      <ServicesSection />
      <AmenitiesSection />
      <MomentsSection />
      <GlimpseSection />
      <JournalSection />

      <EventsSection />
      <WhyChooseSection />
      <TestimonialsSection />

      <VirtualTourSection />
      <FrequentlyVisitedPages />
      <HomeFAQSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default Index;