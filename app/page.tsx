import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import CertificationsSection from "@/components/CertificationsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ResearchSection />
      <ProjectsSection />
      <TimelineSection />
      <CertificationsSection />
      <CurrentWorkSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
