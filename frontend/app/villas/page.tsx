import VillasHero from "@/components/VillasHero";
import VillasSection from "@/components/VillasSection";
import MomentsSection from "@/components/MomentsSection";
import ReserveSection from "@/components/ReserveSection";
import Footer from "@/components/Footer";

const VillasPage = () => {
  return (
    <div className="min-h-screen">
      <VillasHero />
      <VillasSection />
      <MomentsSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default VillasPage;
