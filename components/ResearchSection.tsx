"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Server, Eye, CircleCheck } from "lucide-react";

const RESEARCH = [
  {
    badge: "Primary Research",
    badgeColor: "#2596be",
    icon: ShieldCheck,
    iconColor: "#2596be",
    iconBg: "rgba(37,150,190,0.1)",
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
    badgeColor: "#2596be",
    icon: Server,
    iconColor: "#2596be",
    iconBg: "rgba(37,150,190,0.1)",
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
    statusColor: "#2596be",
    statusBg: "rgba(37,150,190,0.1)",
  },
  {
    badge: "Academic Research",
    badgeColor: "rgba(37,150,190,0.6)",
    icon: Eye,
    iconColor: "rgba(37,150,190,0.7)",
    iconBg: "rgba(37,150,190,0.08)",
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
    statusColor: "rgba(37,150,190,0.6)",
    statusBg: "rgba(37,150,190,0.08)",
  },
];

type ResearchItem = typeof RESEARCH[0];

function ResearchCard({ r, i, inView }: { r: ResearchItem; i: number; inView: boolean }) {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.div
      key={r.title}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: "rgba(2,8,16,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: cardHovered ? "1px solid rgba(37,150,190,0.35)" : "1px solid rgba(37,150,190,0.12)",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "box-shadow 0.3s ease, border-color 0.3s, transform 0.3s",
        transform: cardHovered ? "translateY(-6px)" : "none",
        boxShadow: cardHovered ? "0 12px 40px rgba(37,150,190,0.1)" : "none",
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
            border: "1px solid rgba(37,150,190,0.2)",
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
              backgroundColor: "rgba(37,150,190,0.08)",
              border: "1px solid rgba(37,150,190,0.2)",
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
              color: r.statusColor,
              backgroundColor: r.statusBg,
              border: "1px solid rgba(37,150,190,0.2)",
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
          color: "#FFFFFF",
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
          color: "rgba(255,255,255,0.65)",
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
            color: "rgba(255,255,255,0.65)",
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
                color: "rgba(255,255,255,0.65)",
              }}
            >
              <CircleCheck size={13} color="#2596be" style={{ flexShrink: 0, marginTop: "2px" }} />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack — tags pulse on hover */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          paddingTop: "4px",
          borderTop: "1px solid rgba(37,150,190,0.08)",
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
              color: cardHovered ? "#2596be" : "rgba(255,255,255,0.65)",
              backgroundColor: cardHovered ? "rgba(37,150,190,0.12)" : "rgba(37,150,190,0.06)",
              border: cardHovered ? "1px solid rgba(37,150,190,0.3)" : "1px solid rgba(37,150,190,0.1)",
              animation: cardHovered ? "glow-pulse 2s ease-in-out infinite" : "none",
              transition: "color 0.3s, background-color 0.3s, border-color 0.3s",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

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
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(37,150,190,0.03) 0%, transparent 70%)",
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
              color: "#2596be",
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
            color: "#FFFFFF",
          }}
        >
          Research &amp;{" "}
          <span
            style={{
              background: "linear-gradient(to right, #2596be, rgba(37,150,190,0.6))",
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
            <ResearchCard key={r.title} r={r} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
