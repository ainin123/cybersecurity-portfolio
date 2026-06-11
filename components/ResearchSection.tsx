"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Server, Eye, CircleCheck } from "lucide-react";

const RESEARCH = [
  {
    badge: "Primary Research",
    badgeColor: "#0ea5e9",
    icon: ShieldCheck,
    iconColor: "#0ea5e9",
    iconBg: "rgba(14,165,233,0.1)",
    title: "AI-Powered Data Loss Prevention Framework",
    description:
      "Developed a novel DLP framework using transformer-based NLP (BERT, RoBERTa) to classify sensitive data with 98% accuracy. Outperforms traditional regex-based approaches by detecting context-aware sensitivity across document types.",
    contributions: [
      "Context-aware classification of sensitive content",
      "Transformer fine-tuning on security datasets",
      "Explainable outputs for compliance teams",
    ],
    tech: ["Python", "BERT", "RoBERTa", "TensorFlow", "NLP", "DLP"],
    status: "In Progress",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.1)",
  },
  {
    badge: "Engineering Research",
    badgeColor: "#06b6d4",
    icon: Server,
    iconColor: "#06b6d4",
    iconBg: "rgba(6,182,212,0.1)",
    title: "AI-Driven SIEM Enhancement",
    description:
      "Integrating ML models into open-source SIEM (Wazuh) to reduce false positives through intelligent alert correlation and anomaly detection using behavioral baselines. Building adaptive threat scoring systems.",
    contributions: [
      "Wazuh rule optimization and custom decoders",
      "ML-based alert scoring and prioritization",
      "Threat feed integration pipeline",
      "UEBA foundations and behavioral baselines",
    ],
    tech: ["Wazuh", "Python", "ML", "Suricata", "SIGMA", "Threat Intel"],
    status: "Active",
    statusColor: "#0ea5e9",
    statusBg: "rgba(14,165,233,0.1)",
  },
  {
    badge: "Academic Research",
    badgeColor: "#7c3aed",
    icon: Eye,
    iconColor: "#7c3aed",
    iconBg: "rgba(124,58,237,0.1)",
    title: "Explainable AI for Cybersecurity",
    description:
      "Investigating XAI techniques to make AI security decisions interpretable for security analysts, addressing the black-box problem in ML-based threat detection and enabling trust calibration in automated systems.",
    contributions: [
      "SHAP/LIME applied to security models",
      "Analyst-friendly explanation interfaces",
      "Trust calibration research methodology",
    ],
    tech: ["XAI", "SHAP", "LIME", "Python", "Security ML"],
    status: "Research Phase",
    statusColor: "#7c3aed",
    statusBg: "rgba(124,58,237,0.1)",
  },
];

export default function ResearchSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="research"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#060b18",
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
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(124,58,237,0.04) 0%, transparent 70%)",
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
            03 // RESEARCH
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
          Research &amp;{" "}
          <span
            style={{
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Innovation
          </span>
        </motion.h2>

        {/* Research Cards */}
        <div
          style={{
            display: "grid",
            gap: "28px",
            gridTemplateColumns: "1fr",
          }}
          className="lg:grid-cols-3"
        >
          {RESEARCH.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              whileHover={{ y: -6 }}
              style={{
                background: "rgba(13,20,36,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(14,165,233,0.15)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: r.iconBg,
                    border: `1px solid ${r.iconColor}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <r.icon size={24} color={r.iconColor} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: r.badgeColor,
                      backgroundColor: `${r.badgeColor}15`,
                      border: `1px solid ${r.badgeColor}30`,
                      padding: "3px 8px",
                      borderRadius: "100px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {r.badge}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: r.status === "Active" ? "#0ea5e9" : r.statusColor,
                      backgroundColor: r.statusBg,
                      border: `1px solid ${r.statusColor}30`,
                      padding: "3px 8px",
                      borderRadius: "100px",
                    }}
                  >
                    {r.status}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#e2e8f0",
                  lineHeight: 1.35,
                }}
              >
                {r.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                }}
              >
                {r.description}
              </p>

              {/* Key Contributions */}
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748b",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Key Contributions
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {r.contributions.map((c) => (
                    <li
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#94a3b8",
                      }}
                    >
                      <CircleCheck size={13} color="#0ea5e9" style={{ flexShrink: 0, marginTop: "2px" }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  paddingTop: "4px",
                  borderTop: "1px solid rgba(14,165,233,0.1)",
                }}
              >
                {r.tech.map((t) => (
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
                      border: "1px solid rgba(14,165,233,0.12)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
