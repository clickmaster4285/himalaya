import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MurreeHotelRelatedLinks from "@/components/seo/MurreeHotelRelatedLinks";
import type { MurreeHotelClusterPage } from "@/lib/seo/murree-hotel-cluster-links";

type Props = {
  page: MurreeHotelClusterPage;
  children: React.ReactNode;
};

export default function MurreeHotelPageChrome({ page, children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <MurreeHotelRelatedLinks page={page} />
      <Footer />
    </>
  );
}
