import VillasHero from "@/components/VillasHero";
import VillaConfigurations from "@/components/VillaConfigurations";
import VillasSection from "@/components/VillasSection";
import MomentsSection from "@/components/MomentsSection";
import ReserveSection from "@/components/ReserveSection";
import Footer from "@/components/Footer";

const VillasPage = () => {
  return (
    <div className="min-h-screen">
      <VillasHero />
      <VillaConfigurations />
      <VillasSection />
      <MomentsSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default VillasPage;
