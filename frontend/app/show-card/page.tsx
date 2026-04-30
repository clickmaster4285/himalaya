import HimalayaVillasCard from "@/components/HimalayaVillasCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShowCardPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <Navbar />
      
      <div className="py-12 px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1b261b] mb-4">
            Himalaya Villas Card Demo
          </h1>
          <p className="text-gray-600">
            Click on the card below to expand and see the complete content
          </p>
        </div>
        
        <HimalayaVillasCard />
      </div>
      
      <Footer />
    </div>
  );
}
