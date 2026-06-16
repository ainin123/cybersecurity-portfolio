"use client";

import { useState, useEffect } from "react";
import CyberTerminalLanding from "./CyberTerminalLanding";
import FloatingTerminalNav from "./FloatingTerminalNav";

import ParticleBackground from "./ParticleBackground";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import MetricsDashboard from "./MetricsDashboard";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import MitreAttack from "./MitreAttack";
import ResearchSection from "./ResearchSection";
import ProjectsSection from "./ProjectsSection";
import ThreatLandscape from "./ThreatLandscape";
import TimelineSection from "./TimelineSection";
import CertificationsSection from "./CertificationsSection";
import CurrentWorkSection from "./CurrentWorkSection";
import GitHubSection from "./GitHubSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function AppShell() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    setShowTerminal(false);
    setTargetSection(sectionId);
  };

  const handleReturnToTerminal = () => {
    setShowTerminal(true);
    setTargetSection(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!showTerminal && targetSection) {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setTargetSection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showTerminal, targetSection]);

  if (showTerminal) {
    return <CyberTerminalLanding onNavigate={handleNavigate} />;
  }

  return (
    <main style={{ position: "relative" }}>
      <ParticleBackground />
      <Navigation />
      <HeroSection />
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
      <FloatingTerminalNav onReturn={handleReturnToTerminal} />
    </main>
  );
}
