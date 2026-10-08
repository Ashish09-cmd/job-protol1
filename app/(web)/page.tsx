import HeroSection from "@/components/clients-page/home/HeroSection";
import Howworks from "@/components/clients-page/home/HowWorks";
import PlacementPratners from "@/components/clients-page/home/PlacementPartners";
import VacencySection from "@/components/clients-page/home/VacencySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VacencySection />
      <PlacementPratners/>
      <Howworks/>
    </>
  );
}
