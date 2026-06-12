import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TerminalWidget from "@/components/TerminalWidget";
import ThreatRadar from "@/components/ThreatRadar";
import AttackMap from "@/components/AttackMap";
import MetricsDashboard from "@/components/MetricsDashboard";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import MitreAttack from "@/components/MitreAttack";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import ThreatLandscape from "@/components/ThreatLandscape";
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
      <TerminalWidget />
      <ThreatRadar />
      <AttackMap />
      <MetricsDashboard />
      <AboutSection />
      <SkillsSection />
      <MitreAttack />
      <ResearchSection />
      <ProjectsSection />
      <ThreatLandscape />
      <TimelineSection />
      <CertificationsSection />
      <CurrentWorkSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
