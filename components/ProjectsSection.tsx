"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ShieldCheck, Server, Target, Network, Database, Eye, ChevronDown, ChevronUp } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
    icon: Server,
    iconColor: "#38a532",
    domain: "SIEM & NETWORK DEFENSE",
    title: "Wazuh SIEM Solutions, National Centre for Cyber Security (NCCS), National Aerospace, Science and Technology Park (NASTP)",
    problem: "Enterprise networks lack automated, comprehensive real-time security monitoring and response",
    solution:
      "Deployed a full-scale Wazuh SIEM solution at the National Centre for Cyber Security (NCCS) covering threat hunting, malware detection, IDS event correlation, network traffic analysis, asset discovery, and role-based access control, significantly improving the network defence posture.",
    methodology: [
      "Implemented blocking of unauthorized applications and known malicious actors",
      "Configured IDS event detection and malicious domain hunting workflows",
      "Built network traffic analysis, asset discovery, and RBAC policies",
    ],
    findings: [
      "Real-time malware detection and vulnerability scanning across all endpoints",
      "Role-based access control enforced, blocking invalid users from agents",
      "System monitoring dashboards identify security events with zero manual triage",
    ],
    tech: ["Wazuh", "ElasticStack", "Snort", "Sysmon", "Python", "SOAR"],
    result: "Full-Coverage Network Defense Deployed",
    featured: true,
  },
  {
    num: "02",
    icon: Target,
    iconColor: "#38a532",
    domain: "PENETRATION TESTING",
    title: "End-to-End VAPT Engagements",
    problem: "Organizations lack visibility into exploitable vulnerabilities in their network and web assets",
    solution:
      "Executed comprehensive penetration tests across client networks, from reconnaissance using NMAP and Shodan through exploitation and professional deliverable reporting with screen-recorded walkthroughs.",
    methodology: [
      "Reconnaissance via NMAP, Maltego, Shodan, and OSINT techniques",
      "Vulnerability assessment using Nessus, OpenVAS, Nikto, and Acunetix",
      "Exploitation and post-exploitation with Burp Suite and Hydra",
    ],
    findings: [
      "Identified critical web application vulnerabilities across multiple engagements",
      "Produced professional pentest reports with remediation roadmaps",
      "Screen-recorded walkthroughs delivered as professional pentest deliverables",
    ],
    tech: ["NMAP", "Burp Suite", "Nessus", "OpenVAS", "Nikto", "Shodan"],
    result: "Professional Pentest Deliverables",
  },
  {
    num: "03",
    icon: ShieldCheck,
    iconColor: "#38a532",
    domain: "THREAT INTELLIGENCE",
    title: "Threat Intelligence Pipeline",
    problem: "Manual IOC collection and correlation across multiple feeds is slow and error-prone",
    solution:
      "Automated threat intelligence workflows integrating MISP, Yeti, and VirusTotal for IOC enrichment and correlation, dramatically reducing threat response time and improving coverage.",
    methodology: [
      "Integrated MISP and Yeti for structured IOC management and sharing",
      "Automated VirusTotal lookups and cross-feed IOC correlation",
      "Built malicious domain hunting workflows within the SIEM pipeline",
    ],
    findings: [
      "IOC processing time reduced from hours to minutes",
      "Malicious domain hunting integrated directly into SIEM alerting",
      "Threat intelligence enrichment improved alert fidelity significantly",
    ],
    tech: ["MISP", "Yeti", "VirusTotal", "Python", "Wazuh", "ElasticStack"],
    result: "Automated IOC Enrichment & Correlation",
  },
  {
    num: "04",
    icon: Network,
    iconColor: "#38a532",
    domain: "NETWORK SECURITY",
    title: "Network Traffic Analysis System",
    problem: "Unknown threat patterns and insider activity evade signature-based network monitoring",
    solution:
      "Deployed Wireshark, tShark, and Packetbeat for deep network traffic analysis combined with Snort IDS rules to detect anomalous behaviour, lateral movement, and unauthorized connections.",
    methodology: [
      "Configured Packetbeat for continuous network flow monitoring",
      "Built custom Snort rules targeting lateral movement patterns",
      "Integrated tShark captures into ElasticStack for correlation",
    ],
    findings: [
      "Real-time detection of suspicious network connections and lateral movement",
      "Asset discovery and inventory maintained through automated scanning",
      "Network traffic dashboards built in Kibana for SOC analyst workflows",
    ],
    tech: ["Wireshark", "tShark", "Snort", "Packetbeat", "ElasticStack", "NMAP"],
    result: "Real-time Network Threat Visibility",
  },
  {
    num: "05",
    icon: Eye,
    iconColor: "#38a532",
    domain: "MALWARE ANALYSIS",
    title: "Static & Dynamic Malware Analysis",
    problem: "Manual malware triage is slow and requires deep expertise for each sample",
    solution:
      "Established a malware analysis environment using Cuckoo Sandbox for dynamic analysis alongside static analysis tooling to classify and understand malware behaviour, supporting incident response investigations.",
    methodology: [
      "Dynamic analysis via Cuckoo Sandbox: behaviour, network calls, registry changes",
      "Static analysis of PE headers, strings, and import tables",
      "Cross-referenced findings with MISP threat intelligence for attribution",
    ],
    findings: [
      "Accelerated malware triage from hours to minutes per sample",
      "Identified malware families and C2 infrastructure from sandbox outputs",
      "Findings fed back into SIEM detection rules to prevent reinfection",
    ],
    tech: ["Cuckoo Sandbox", "Python", "MISP", "Static Analysis", "Dynamic Analysis"],
    result: "Accelerated Malware Triage Pipeline",
  },
  {
    num: "06",
    icon: Database,
    iconColor: "#38a532",
    domain: "VULNERABILITY MANAGEMENT",
    title: "Enterprise Vulnerability Assessment",
    problem: "Organizations struggle to maintain continuous visibility into their vulnerability exposure",
    solution:
      "Conducted systematic vulnerability assessments using Nessus, OpenVAS, and Acunetix across network infrastructure and web applications, producing prioritized remediation roadmaps.",
    methodology: [
      "Scanned network assets with Nessus and OpenVAS for CVE exposure",
      "Web application scanning with Nikto and Acunetix for OWASP Top 10",
      "Prioritized findings by CVSS score and business impact",
    ],
    findings: [
      "Critical and high-severity vulnerabilities identified and documented",
      "Remediation timelines and technical guidance provided per finding",
      "Re-scans confirmed successful patching and reduced attack surface",
    ],
    tech: ["Nessus", "OpenVAS", "Nikto", "Acunetix", "CVE Research", "Report Writing"],
    result: "Comprehensive Vulnerability Reports Delivered",
  },
];

function FeaturedProject({ project, inView }: { project: typeof PROJECTS[0]; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        background: "rgba(2,8,16,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(56,165,50,0.2)",
        borderRadius: "16px",
        padding: "32px",
        marginBottom: "28px",
        boxShadow: "0 0 40px rgba(56,165,50,0.06)",
      }}
    >
      {/* Domain badge */}
      <div style={{ marginBottom: "16px" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#38a532",
            backgroundColor: "rgba(56,165,50,0.1)",
            border: "1px solid rgba(56,165,50,0.25)",
            padding: "3px 10px",
            borderRadius: "4px",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          {project.domain}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gap: "32px",
          gridTemplateColumns: "1fr",
        }}
        className="lg:grid-cols-2"
      >
        {/* Left: Info */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#38a532",
                backgroundColor: "rgba(56,165,50,0.08)",
                border: "1px solid rgba(56,165,50,0.2)",
                borderLeft: "3px solid rgba(56,165,50,0.55)",
                padding: "3px 10px",
                borderRadius: "3px",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              FEATURED PROJECT
            </span>
          </div>
          <h3
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "10px",
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "12px",
              fontStyle: "italic",
            }}
          >
            {project.problem}
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              marginBottom: "20px",
            }}
          >
            {project.solution}
          </p>

          {/* Impact metric */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(56,165,50,0.1)",
              border: "1px solid rgba(56,165,50,0.2)",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#38a532",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              {project.result}
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 10px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "#38a532",
                  backgroundColor: "rgba(56,165,50,0.08)",
                  border: "1px solid rgba(56,165,50,0.15)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Methodology & Findings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h4
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono), monospace",
                marginBottom: "10px",
              }}
            >
              Methodology
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {project.methodology?.map((m) => (
                <li key={m} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                  <span style={{ color: "#38a532", flexShrink: 0, marginTop: "2px" }}>&#x2192;</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono), monospace",
                marginBottom: "10px",
              }}
            >
              Outcomes
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {project.findings?.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                  <span style={{ color: "rgba(56,165,50,0.6)", flexShrink: 0, marginTop: "2px" }}>&#x25B8;</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [scanState, setScanState] = useState<"idle" | "scanning" | "loaded">("idle");

  const handleMouseEnter = () => {
    setHovered(true);
    setScanState("scanning");
    setTimeout(() => setScanState("loaded"), 900);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setScanState("idle");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "rgba(2,8,16,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: hovered ? "1px solid rgba(56,165,50,0.5)" : "1px solid rgba(56,165,50,0.12)",
        borderRadius: "14px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s",
        cursor: "default",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(56,165,50,0.12)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scan status badge */}
      {scanState !== "idle" && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontSize: "9px",
            fontFamily: "var(--font-geist-mono), monospace",
            color: scanState === "scanning" ? "#f59e0b" : "#38a532",
            backgroundColor:
              scanState === "scanning" ? "rgba(245,158,11,0.1)" : "rgba(56,165,50,0.1)",
            border:
              scanState === "scanning"
                ? "1px solid rgba(245,158,11,0.3)"
                : "1px solid rgba(56,165,50,0.3)",
            padding: "2px 7px",
            borderRadius: "4px",
            letterSpacing: "0.1em",
            zIndex: 5,
          }}
        >
          {scanState === "scanning" ? "SCANNING..." : "CASE STUDY LOADED"}
        </div>
      )}

      {/* Domain badge */}
      <div>
        <span
          style={{
            fontSize: "9px",
            fontWeight: 700,
            color: "rgba(56,165,50,0.7)",
            backgroundColor: "rgba(56,165,50,0.08)",
            border: "1px solid rgba(56,165,50,0.15)",
            padding: "2px 8px",
            borderRadius: "4px",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          {project.domain}
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            background: "rgba(56,165,50,0.1)",
            border: "1px solid rgba(56,165,50,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <project.icon size={20} color="#38a532" />
        </div>
        <ExternalLink size={15} color="rgba(255,255,255,0.4)" />
      </div>

      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.35,
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          fontStyle: "italic",
        }}
      >
        {project.problem}
      </p>

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.65)",
          flex: 1,
        }}
      >
        {project.solution}
      </p>

      {/* Impact metric */}
      <div
        style={{
          padding: "6px 12px",
          borderRadius: "7px",
          backgroundColor: "rgba(56,165,50,0.08)",
          border: "1px solid rgba(56,165,50,0.15)",
          display: "inline-block",
          alignSelf: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "var(--font-geist-mono), monospace",
            color: "#38a532",
          }}
        >
          {project.result}
        </span>
      </div>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: "3px 9px",
              borderRadius: "3px",
              fontSize: "11px",
              fontWeight: 500,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "rgba(255,255,255,0.65)",
              backgroundColor: "rgba(56,165,50,0.06)",
              border: "1px solid rgba(56,165,50,0.12)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* View details */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "12px",
          fontWeight: 500,
          color: "#38a532",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginTop: "4px",
          alignSelf: "flex-start",
        }}
      >
        View Details
        <ArrowRight size={13} />
      </button>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? PROJECTS : PROJECTS.slice(0, 2);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#020810",
      }}
    >
      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#38a532",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            PROJECTS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "60px",
            color: "#FFFFFF",
          }}
        >
          Security{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Case Studies
          </span>
        </motion.h2>

        {/* Responsive grid — 2 visible initially */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "20px" }}
        >
          <AnimatePresence initial={false}>
            {visible.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
        >
          <motion.button
            onClick={() => setShowAll((v) => !v)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 28px", borderRadius: "8px",
              border: "1px solid rgba(56,165,50,0.35)",
              backgroundColor: "rgba(56,165,50,0.06)",
              color: "#38a532", fontWeight: 700, fontSize: "14px",
              cursor: "pointer",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.06em",
              transition: "background-color 0.2s, border-color 0.2s",
            }}
          >
            {showAll ? (
              <><ChevronUp size={16} /> SHOW LESS</>
            ) : (
              <><ChevronDown size={16} /> SHOW MORE ({PROJECTS.length - 2} MORE CASE STUDIES)</>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

