"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight, ShieldCheck, Server, Target, Network, Database, Eye } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
    icon: ShieldCheck,
    iconColor: "#0ea5e9",
    title: "AI-Powered DLP System",
    problem: "Traditional DLP tools miss context-sensitive data leaks",
    solution:
      "Built a transformer-based NLP pipeline using BERT and RoBERTa that classifies sensitive documents with 98% accuracy — far outperforming regex-based alternatives.",
    tech: ["Python", "BERT", "RoBERTa", "TensorFlow", "NLP", "DLP"],
    result: "98% Classification Accuracy",
    featured: true,
  },
  {
    num: "02",
    icon: Server,
    iconColor: "#06b6d4",
    title: "Wazuh SIEM Customization",
    problem: "High false-positive rates in open-source SIEM environments",
    solution:
      "Developed custom Wazuh detection rules, decoders, and integrated ML-based alert scoring to dramatically reduce noise while improving threat detection coverage.",
    tech: ["Wazuh", "Python", "SIGMA", "ML", "JSON"],
    result: "62% Reduction in False Positives",
  },
  {
    num: "03",
    icon: Target,
    iconColor: "#7c3aed",
    title: "Threat Intelligence Engine",
    problem: "Manual IOC collection is slow and error-prone",
    solution:
      "Automated IOC aggregation pipeline integrating MISP, VirusTotal, and custom YARA rules with enrichment and correlation capabilities.",
    tech: ["Python", "MISP", "VirusTotal API", "YARA", "Redis"],
    result: "47 Threat Feeds Integrated",
  },
  {
    num: "04",
    icon: Network,
    iconColor: "#0ea5e9",
    title: "Network Traffic Analyzer",
    problem: "Unknown threat patterns evade signature-based IDS",
    solution:
      "Combined Suricata IDS with ML anomaly detection models trained on behavioral baselines to identify zero-day and insider threat activity.",
    tech: ["Suricata", "Python", "ML", "ELK", "Zeek"],
    result: "Real-time Anomaly Detection",
  },
  {
    num: "05",
    icon: Database,
    iconColor: "#06b6d4",
    title: "Security Log Analytics Platform",
    problem: "Security logs lack intelligent correlation and insight",
    solution:
      "Built an ELK-based analytics platform enhanced with AI correlation layers to surface high-fidelity alerts from millions of daily log events.",
    tech: ["ELK Stack", "Python", "AI", "Kafka", "Kibana"],
    result: "10M+ Events Processed Daily",
  },
  {
    num: "06",
    icon: Eye,
    iconColor: "#7c3aed",
    title: "Malware Classification System",
    problem: "Manual malware triage is slow and inconsistent",
    solution:
      "Developed an ML-based static analysis classifier that extracts features from PE headers, strings, and imports to categorize malware families automatically.",
    tech: ["Python", "Scikit-learn", "PE Analysis", "YARA", "Sandbox"],
    result: "94% Classification Accuracy",
  },
];

function FeaturedProject({ project, inView }: { project: typeof PROJECTS[0]; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      style={{
        background: "rgba(13,20,36,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(14,165,233,0.2)",
        borderRadius: "16px",
        padding: "32px",
        marginBottom: "28px",
        boxShadow: "0 0 40px rgba(14,165,233,0.06)",
      }}
    >
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
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                fontWeight: 700,
                color: "#0ea5e9",
                letterSpacing: "0.15em",
              }}
            >
              {project.num}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#0ea5e9",
                backgroundColor: "rgba(14,165,233,0.12)",
                border: "1px solid rgba(14,165,233,0.25)",
                padding: "3px 10px",
                borderRadius: "100px",
                letterSpacing: "0.08em",
              }}
            >
              FEATURED PROJECT
            </span>
          </div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#e2e8f0",
              marginBottom: "12px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              marginBottom: "12px",
              fontStyle: "italic",
            }}
          >
            Problem: {project.problem}
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#94a3b8",
              marginBottom: "24px",
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
              backgroundColor: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.2)",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#0ea5e9",
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
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "#0ea5e9",
                  backgroundColor: "rgba(14,165,233,0.08)",
                  border: "1px solid rgba(14,165,233,0.15)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Architecture diagram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 380 200"
            style={{ width: "100%", maxWidth: "380px" }}
            aria-label="DLP Architecture Diagram"
          >
            {/* Nodes */}
            {[
              { x: 20, y: 80, w: 70, label: "Data Sources", color: "#64748b" },
              { x: 110, y: 80, w: 70, label: "NLP Engine", color: "#0ea5e9" },
              { x: 200, y: 80, w: 70, label: "Classifier", color: "#06b6d4" },
              { x: 290, y: 80, w: 70, label: "Policy Engine", color: "#7c3aed" },
            ].map((node) => (
              <g key={node.label}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={36}
                  rx={6}
                  fill={`${node.color}18`}
                  stroke={node.color}
                  strokeWidth={1}
                  strokeOpacity={0.5}
                />
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 22}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize={9}
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
              </g>
            ))}

            {/* Arrows */}
            {[90, 180, 270].map((x) => (
              <g key={x}>
                <line
                  x1={x}
                  y1={98}
                  x2={x + 20}
                  y2={98}
                  stroke="rgba(14,165,233,0.4)"
                  strokeWidth={1.5}
                  markerEnd="url(#arrow)"
                />
              </g>
            ))}

            {/* Alert / Block outputs */}
            <g>
              <line
                x1={360}
                y1={88}
                x2={360}
                y2={138}
                stroke="rgba(239,68,68,0.4)"
                strokeWidth={1.5}
              />
              <rect
                x={325}
                y={138}
                width={70}
                height={28}
                rx={5}
                fill="rgba(239,68,68,0.1)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth={1}
              />
              <text
                x={360}
                y={156}
                textAnchor="middle"
                fill="#ef4444"
                fontSize={9}
                fontFamily="monospace"
              >
                Alert / Block
              </text>
            </g>

            <defs>
              <marker
                id="arrow"
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(14,165,233,0.6)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#0d1424",
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#0ea5e9",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            04 // PROJECTS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "60px",
            color: "#e2e8f0",
          }}
        >
          Security{" "}
          <span
            style={{
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Case Studies
          </span>
        </motion.h2>

        {/* Featured project */}
        <FeaturedProject project={PROJECTS[0]} inView={inView} />

        {/* 2-col grid for remaining */}
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "1fr",
          }}
          className="sm:grid-cols-2"
        >
          {PROJECTS.slice(1).map((project, i) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(13,20,36,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(14,165,233,0.15)",
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                transition: "box-shadow 0.3s",
                cursor: "default",
              }}
            >
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
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: `${project.iconColor}18`,
                      border: `1px solid ${project.iconColor}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <project.icon size={18} color={project.iconColor} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#64748b",
                    }}
                  >
                    {project.num}
                  </span>
                </div>
                <ExternalLink size={15} color="#475569" />
              </div>

              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  fontStyle: "italic",
                }}
              >
                {project.problem}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#94a3b8",
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
                  backgroundColor: `${project.iconColor}10`,
                  border: `1px solid ${project.iconColor}20`,
                  display: "inline-block",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    fontFamily: "var(--font-geist-mono), monospace",
                    color: project.iconColor,
                  }}
                >
                  {project.result}
                </span>
              </div>

              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "5px",
                      fontSize: "10px",
                      fontWeight: 500,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "#64748b",
                      backgroundColor: "rgba(14,165,233,0.06)",
                      border: "1px solid rgba(14,165,233,0.1)",
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
                  color: "#0ea5e9",
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
          ))}
        </div>
      </div>
    </section>
  );
}
