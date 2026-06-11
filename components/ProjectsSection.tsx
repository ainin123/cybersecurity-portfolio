"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  GitBranch,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

const projects = [
  {
    codename: "OPERATION SHADOWNET",
    title: "APT Campaign Tracker",
    classification: "UNCLASSIFIED",
    status: "ACTIVE",
    statusColor: "#00ff88",
    severity: "CRITICAL",
    description:
      "Real-time tracking platform for 40+ APT groups. Correlates TTPs across MITRE ATT&CK, visualizes kill chains, and generates automated threat intelligence reports.",
    tags: ["Python", "Elastic", "MITRE ATT&CK", "STIX 2.1", "Neo4j"],
    metrics: { stars: 847, forks: 124, cves: 0 },
    links: { github: "#", demo: "#" },
    highlight: true,
    color: "#00d4ff",
  },
  {
    codename: "PROJECT GHOST-WRITE",
    title: "C2 Framework",
    classification: "RESTRICTED",
    status: "CLASSIFIED",
    statusColor: "#ff3860",
    severity: "HIGH",
    description:
      "Custom command-and-control framework built for authorized red team operations. Features malleable profiles, encrypted channels, and OPSEC-safe beacon behavior.",
    tags: ["C++", "Go", "Cryptography", "Red Team"],
    metrics: { stars: 1203, forks: 287, cves: 0 },
    links: { github: "#" },
    highlight: false,
    color: "#7c3aed",
  },
  {
    codename: "SENTINEL-EYE",
    title: "YARA Rule Engine",
    classification: "UNCLASSIFIED",
    status: "STABLE",
    statusColor: "#00d4ff",
    severity: "MEDIUM",
    description:
      "High-performance YARA rule engine with ML-assisted signature generation. Automatically clusters malware families and generates detection rules from behavioral data.",
    tags: ["Python", "YARA", "ML", "VirusTotal API"],
    metrics: { stars: 523, forks: 89, cves: 0 },
    links: { github: "#", demo: "#" },
    highlight: false,
    color: "#00ff88",
  },
  {
    codename: "ZERO-PULSE",
    title: "Exploit PoC Database",
    classification: "RESTRICTED",
    status: "ACTIVE",
    statusColor: "#ff8c00",
    severity: "CRITICAL",
    description:
      "Curated collection of 200+ documented proof-of-concept exploits for CVE research. Includes detailed analysis, patch diffing, and remediation guidance for each vulnerability.",
    tags: ["C", "Python", "Pwn", "CVE Research"],
    metrics: { stars: 2100, forks: 445, cves: 23 },
    links: { github: "#" },
    highlight: false,
    color: "#ff3860",
  },
  {
    codename: "BLOODHOUND++",
    title: "AD Attack Path Analyzer",
    classification: "UNCLASSIFIED",
    status: "BETA",
    statusColor: "#ffd700",
    severity: "HIGH",
    description:
      "Extended BloodHound module with custom attack paths for Azure AD, O365, and hybrid environments. Includes automated attack path exploitation chains.",
    tags: ["Python", "Neo4j", "BloodHound", "Azure AD"],
    metrics: { stars: 671, forks: 102, cves: 0 },
    links: { github: "#", demo: "#" },
    highlight: false,
    color: "#ff8c00",
  },
  {
    codename: "DECEPTION-NET",
    title: "Honeypot Intelligence Platform",
    classification: "UNCLASSIFIED",
    status: "ACTIVE",
    statusColor: "#00ff88",
    severity: "LOW",
    description:
      "Distributed honeypot network with 80+ global sensors. Captures attacker TTPs, extracts IOCs, and feeds intelligence into MISP for community sharing.",
    tags: ["Docker", "Python", "MISP", "ELK Stack"],
    metrics: { stars: 389, forks: 67, cves: 0 },
    links: { github: "#", demo: "#" },
    highlight: false,
    color: "#7c3aed",
  },
];

const sevColor: Record<string, string> = {
  CRITICAL: "#ff3860",
  HIGH: "#ff8c00",
  MEDIUM: "#ffd700",
  LOW: "#00ff88",
};

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyber-primary font-mono text-xs tracking-widest">
              03 //
            </span>
            <span className="h-px flex-1 max-w-16 bg-cyber-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            SECURITY
            <br />
            <span className="text-cyber-primary">PROJECTS</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-base leading-relaxed">
            Open-source tools, research artifacts, and intelligence platforms
            built to advance the security community.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6"
        >
          <ProjectCard project={projects[0]} index={0} inView={inView} featured />
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.codename} project={p} index={i + 1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
  inView,
  featured,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass-panel border group transition-all duration-300 ${
        featured ? "lg:flex gap-8 p-8" : "p-6"
      }`}
      style={{ borderColor: `${p.color}25` }}
    >
      <div className={featured ? "flex-1" : ""}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-mono font-bold tracking-widest"
                style={{ color: p.color }}
              >
                {p.codename}
              </span>
              {p.status === "CLASSIFIED" && (
                <Lock
                  className="w-3 h-3"
                  style={{ color: p.statusColor }}
                />
              )}
            </div>
            <h3
              className={`font-mono font-bold text-cyber-text ${
                featured ? "text-xl" : "text-base"
              }`}
            >
              {p.title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span
              className="px-2 py-0.5 rounded text-xs font-mono font-bold"
              style={{
                color: p.statusColor,
                background: `${p.statusColor}15`,
                border: `1px solid ${p.statusColor}30`,
              }}
            >
              {p.status}
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs font-mono"
              style={{
                color: sevColor[p.severity],
                background: `${sevColor[p.severity]}10`,
                border: `1px solid ${sevColor[p.severity]}20`,
              }}
            >
              {p.severity}
            </span>
          </div>
        </div>

        {/* Classification */}
        <div className="flex items-center gap-1.5 mb-4">
          <span
            className="text-xs font-mono text-cyber-muted border border-cyber-muted/20 px-2 py-0.5 rounded"
          >
            {p.classification}
          </span>
          {p.metrics.cves > 0 && (
            <span className="text-xs font-mono text-cyber-accent border border-cyber-accent/20 px-2 py-0.5 rounded">
              {p.metrics.cves} CVEs
            </span>
          )}
        </div>

        <p
          className={`text-cyber-muted text-sm leading-relaxed mb-5 ${
            !featured ? "line-clamp-3" : ""
          }`}
        >
          {p.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-cyber-muted border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-between ${
          featured ? "flex-col items-start justify-center gap-5 min-w-[180px]" : ""
        }`}
      >
        <div
          className={`flex items-center gap-4 text-xs font-mono text-cyber-muted ${
            featured ? "flex-col items-start gap-3 w-full" : ""
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-cyber-yellow" />
            {p.metrics.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-cyber-green" />
            {p.metrics.forks} forks
          </span>
          {featured && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-cyber-primary" />
              Last updated today
            </span>
          )}
        </div>

        <div
          className={`flex items-center gap-2 ${featured ? "w-full" : ""}`}
        >
          {p.links.github && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={p.links.github}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded border border-white/20 text-cyber-muted hover:text-cyber-text hover:border-white/40 transition-all ${
                featured ? "flex-1 justify-center" : ""
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              GITHUB
            </motion.a>
          )}
          {p.links.demo && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={p.links.demo}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded transition-all ${
                featured ? "flex-1 justify-center" : ""
              }`}
              style={{
                background: `${p.color}15`,
                border: `1px solid ${p.color}30`,
                color: p.color,
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              DEMO
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
