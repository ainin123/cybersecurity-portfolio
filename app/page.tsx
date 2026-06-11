import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchLabSection from "@/components/ResearchLabSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <MissionSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <ResearchLabSection />
      <PublicationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
