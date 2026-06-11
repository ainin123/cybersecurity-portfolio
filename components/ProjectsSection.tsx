"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitBranch, Lock, Star, CheckCircle2 } from "lucide-react";

const projects = [
  {
    codename: "OPERATION SHADOWNET",
    title: "APT Campaign Tracker",
    classification: "UNCLASSIFIED",
    status: "ACTIVE",
    critical: false,
    description:
      "Real-time tracking platform for 40+ APT groups. Correlates TTPs across MITRE ATT&CK, visualizes kill chains, and generates automated threat intelligence reports.",
    tags: ["Python", "Elastic", "MITRE ATT&CK", "STIX 2.1", "Neo4j"],
    stars: 847,
    forks: 124,
    links: { github: "#", demo: "#" },
    featured: true,
  },
  {
    codename: "PROJECT GHOST-WRITE",
    title: "C2 Framework",
    classification: "RESTRICTED",
    status: "CLASSIFIED",
    critical: true,
    description:
      "Custom command-and-control framework built for authorized red team operations. Features malleable profiles, encrypted channels, and OPSEC-safe beacon behavior.",
    tags: ["C++", "Go", "Cryptography", "Red Team"],
    stars: 1203,
    forks: 287,
    links: { github: "#" },
    featured: false,
  },
  {
    codename: "SENTINEL-EYE",
    title: "YARA Rule Engine",
    classification: "UNCLASSIFIED",
    status: "STABLE",
    critical: false,
    description:
      "High-performance YARA rule engine with ML-assisted signature generation. Automatically clusters malware families and generates detection rules from behavioral data.",
    tags: ["Python", "YARA", "ML", "VirusTotal API"],
    stars: 523,
    forks: 89,
    links: { github: "#", demo: "#" },
    featured: false,
  },
  {
    codename: "ZERO-PULSE",
    title: "Exploit PoC Database",
    classification: "RESTRICTED",
    status: "ACTIVE",
    critical: true,
    description:
      "Curated collection of 200+ documented proof-of-concept exploits for CVE research. Includes detailed analysis, patch diffing, and remediation guidance.",
    tags: ["C", "Python", "Pwn", "CVE Research"],
    stars: 2100,
    forks: 445,
    links: { github: "#" },
    featured: false,
  },
  {
    codename: "BLOODHOUND++",
    title: "AD Attack Path Analyzer",
    classification: "UNCLASSIFIED",
    status: "BETA",
    critical: false,
    description:
      "Extended BloodHound module with custom attack paths for Azure AD, O365, and hybrid environments. Includes automated attack path exploitation chains.",
    tags: ["Python", "Neo4j", "BloodHound", "Azure AD"],
    stars: 671,
    forks: 102,
    links: { github: "#", demo: "#" },
    featured: false,
  },
  {
    codename: "DECEPTION-NET",
    title: "Honeypot Intelligence Platform",
    classification: "UNCLASSIFIED",
    status: "ACTIVE",
    critical: false,
    description:
      "Distributed honeypot network with 80+ global sensors. Captures attacker TTPs, extracts IOCs, and feeds intelligence into MISP for community sharing.",
    tags: ["Docker", "Python", "MISP", "ELK Stack"],
    stars: 389,
    forks: 67,
    links: { github: "#", demo: "#" },
    featured: false,
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyber-accent font-mono text-xs tracking-widest mb-4">03 // PROJECTS</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            SECURITY
            <br />
            <span className="text-cyber-accent">PROJECTS</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-sm leading-relaxed">
            Open-source tools, research artifacts, and intelligence platforms built to advance the security community.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <ProjectCard p={projects[0]} index={0} inView={inView} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.codename} p={p} index={i + 1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  index,
  inView,
}: {
  p: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      className={`glass-panel border border-white/5 hover:border-cyber-accent/20 transition-colors group ${
        p.featured ? "lg:flex gap-8 p-8" : "p-6"
      }`}
    >
      <div className={p.featured ? "flex-1" : ""}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-cyber-accent font-mono text-xs tracking-widest mb-1">{p.codename}</p>
            <h3 className={`font-mono font-bold text-cyber-text ${p.featured ? "text-xl" : "text-base"}`}>
              {p.title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {p.status === "CLASSIFIED" ? (
              <span className="flex items-center gap-1 text-xs font-mono text-cyber-danger">
                <Lock className="w-3 h-3" /> {p.status}
              </span>
            ) : (
              <span className="text-xs font-mono text-cyber-accent">{p.status}</span>
            )}
            <span className="text-xs font-mono text-cyber-muted border border-white/10 px-2 py-0.5 rounded-sm">
              {p.classification}
            </span>
          </div>
        </div>

        <p className={`text-cyber-muted text-sm leading-relaxed mb-4 ${!p.featured ? "line-clamp-3" : ""}`}>
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded-sm bg-white/4 text-cyber-muted border border-white/8">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={`flex items-center justify-between ${p.featured ? "flex-col items-start justify-center gap-5 min-w-40" : ""}`}>
        <div className={`flex items-center gap-4 text-xs font-mono text-cyber-muted ${p.featured ? "flex-col items-start gap-2 w-full" : ""}`}>
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-cyber-accent" />
            {p.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-cyber-accent" />
            {p.forks} forks
          </span>
        </div>

        <div className={`flex items-center gap-2 ${p.featured ? "w-full" : ""}`}>
          {p.links.github && (
            <a
              href={p.links.github}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm border border-white/15 text-cyber-muted hover:text-cyber-text hover:border-white/30 transition-colors ${p.featured ? "flex-1 justify-center" : ""}`}
            >
              <GitBranch className="w-3 h-3" /> GITHUB
            </a>
          )}
          {p.links.demo && (
            <a
              href={p.links.demo}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm border border-cyber-accent/25 text-cyber-accent hover:bg-cyber-accent/8 transition-colors ${p.featured ? "flex-1 justify-center" : ""}`}
            >
              <ExternalLink className="w-3 h-3" /> DEMO
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
