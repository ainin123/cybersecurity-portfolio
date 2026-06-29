"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

import ParticleBackground from "./ParticleBackground";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import MitreAttack from "./MitreAttack";
import ResearchSection from "./ResearchSection";
import ProjectsSection from "./ProjectsSection";
import TimelineSection from "./TimelineSection";
import CertificationsSection from "./CertificationsSection";
import CurrentWorkSection from "./CurrentWorkSection";
import ContactSection from "./ContactSection";
import BlogSection from "./BlogSection";
import Footer from "./Footer";

export default function AppShell() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Render main content below the loading overlay so it's ready when revealed */}
      <main style={{ position: "relative", visibility: loading ? "hidden" : "visible" }}>
        <ParticleBackground />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <SkillsSection />
        <CertificationsSection />
        <ResearchSection />
        <ProjectsSection />
        <CurrentWorkSection />
        <MitreAttack />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
