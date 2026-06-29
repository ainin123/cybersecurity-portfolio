"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, Send, ExternalLink } from "lucide-react";

// ─── Papers Data ──────────────────────────────────────────────────────────────
type PaperStatus = "Submitted" | "In Progress";

const PAPERS: {
  status: PaperStatus;
  title: string;
  venue: string;
  abstract: string;
  keywords: string[];
  year?: string;
  link?: string;
}[] = [
  {
    status: "Submitted",
    title: "A Transformers-based Ensemble Framework for Context-Aware PII Detection in Modern SIEM Systems",
    venue: "Under Review",
    abstract:
      "This paper presents a Transformers-based ensemble approach for detecting Personally Identifiable Information (PII) within Security Information and Event Management (SIEM) log streams. By fine-tuning multiple transformer architectures and combining their outputs through ensemble fusion, the framework achieves high precision across diverse log formats, enabling real-time PII masking within operational SOC environments.",
    keywords: ["Transformers", "PII Detection", "SIEM", "NLP", "Ensemble Learning", "Data Privacy"],
    year: "2025",
  },
  {
    status: "Submitted",
    title: "Anti-Religion Hate Speech Detection Framework Using Machine Learning and Explainable Artificial Intelligence",
    venue: "Under Review",
    abstract:
      "We propose a machine learning framework for detecting anti-religion hate speech across social media platforms, augmented with Explainable AI (XAI) techniques to provide transparent classification rationale. The system achieves high F1-scores across multiple religious target groups while surfacing SHAP-based explanations that support content moderation decisions and audit compliance.",
    keywords: ["Hate Speech Detection", "XAI", "SHAP", "NLP", "Machine Learning", "Content Moderation"],
    year: "2025",
  },
  {
    status: "In Progress",
    title: "Enhancement of SIEM Using AI-based Correlation",
    venue: "In Progress",
    abstract:
      "This work investigates the integration of AI-driven correlation engines within SIEM platforms to reduce alert fatigue and improve threat detection accuracy. By applying machine learning to cross-source event correlation, the system identifies complex attack chains that traditional rule-based correlation misses, significantly reducing false-positive rates in live SOC deployments.",
    keywords: ["SIEM", "AI Correlation", "Alert Fatigue", "SOC", "Threat Detection", "Machine Learning"],
    year: "2025",
  },
];

const STATUS_CONFIG: Record<PaperStatus, { color: string; bg: string; border: string; icon: typeof Send }> = {
  Submitted:     { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)", icon: Send },
  "In Progress": { color: "rgba(56,165,50,0.75)", bg: "rgba(56,165,50,0.06)", border: "rgba(56,165,50,0.18)", icon: Clock },
};

// ─── Paper Card ───────────────────────────────────────────────────────────────
function PaperCard({
  paper,
  index,
}: {
  paper: (typeof PAPERS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cfg = STATUS_CONFIG[paper.status];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -5,
        scale: 1.015,
        boxShadow: `0 18px 52px ${cfg.color}22, 0 4px 20px rgba(0,0,0,0.4)`,
        transition: { duration: 0.35, ease: [0.25, 0.4, 0.25, 1] },
      }}
      style={{
        background: "rgba(2,8,16,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${cfg.border}`, borderRadius: "14px", padding: "28px",
        cursor: "default", willChange: "transform, box-shadow", overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "9px", background: cfg.bg,
            border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={17} color={cfg.color} />
          </div>
          <span style={{
            fontSize: "11px", fontWeight: 700, color: cfg.color, backgroundColor: cfg.bg,
            border: `1px solid ${cfg.border}`, padding: "3px 10px", borderRadius: "100px",
            fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.06em",
          }}>
            {paper.status.toUpperCase()}
          </span>
        </div>
        {paper.year && (
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-geist-mono), monospace" }}>
            {paper.year}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.45, margin: "0 0 12px 0" }}>
        {paper.title}
      </h3>

      {/* Venue */}
      <p style={{
        fontSize: "12px", color: cfg.color, fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.03em", margin: "0 0 4px 0",
      }}>
        {paper.venue}
      </p>

      {/* Description — revealed on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            key="abstract"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)",
              margin: "12px 0 0 0", overflow: "hidden",
            }}
          >
            {paper.abstract}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Keywords + link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {paper.keywords.map((k) => (
            <span key={k} style={{
              padding: "2px 8px", borderRadius: "5px", fontSize: "10px", fontWeight: 500,
              fontFamily: "var(--font-geist-mono), monospace", color: "rgba(255,255,255,0.55)",
              backgroundColor: "rgba(56,165,50,0.06)", border: "1px solid rgba(56,165,50,0.12)",
            }}>
              {k}
            </span>
          ))}
        </div>
        {paper.link && (
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600,
            color: "#38a532", background: "none", border: "none", cursor: "pointer", padding: 0,
          }}>
            Read Paper <ExternalLink size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ResearchSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [active, setActive] = useState<PaperStatus | "All">("All");

  const tabs = (["All", "Submitted", "In Progress"] as const).filter(
    (tab) => tab === "All" || PAPERS.some((p) => p.status === tab)
  );
  const filtered = active === "All" ? PAPERS : PAPERS.filter((p) => p.status === active);

  return (
    <section
      id="research"
      ref={ref}
      style={{ position: "relative", padding: "80px 0", backgroundColor: "#020810" }}
    >
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none", zIndex: 1 }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(2,8,16,0.5) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

        {/* ── Glass container ── */}
        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 24px 80px rgba(56,165,50,0.1), 0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(56,165,50,0.08)",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.68) 35%, rgba(3,15,8,0.70) 65%, rgba(2,8,16,0.72) 100%)",
            backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(56,165,50,0.18)", borderRadius: "24px", padding: "48px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(56,165,50,0.1), inset 0 0 80px rgba(56,165,50,0.03)",
            willChange: "transform, box-shadow",
          }}
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ marginBottom: "8px" }}
          >
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600,
              color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              PUBLICATIONS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: "40px", color: "#FFFFFF" }}
          >
            Research{" "}
            <span style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Papers
            </span>
          </motion.h2>

          {/* Tab buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}
          >
            {tabs.map((tab) => {
              const isActive = active === tab;
              const count = tab === "All" ? PAPERS.length : PAPERS.filter((p) => p.status === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "8px 18px", borderRadius: "8px",
                    border: isActive ? "1px solid rgba(56,165,50,0.5)" : "1px solid rgba(56,165,50,0.15)",
                    backgroundColor: isActive ? "rgba(56,165,50,0.12)" : "rgba(2,8,16,0.5)",
                    color: isActive ? "#38a532" : "rgba(255,255,255,0.55)",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em",
                    transition: "all 0.2s",
                  }}
                >
                  {tab}
                  <span style={{
                    fontSize: "10px", fontWeight: 700,
                    color: isActive ? "#38a532" : "rgba(255,255,255,0.35)",
                    backgroundColor: isActive ? "rgba(56,165,50,0.15)" : "rgba(255,255,255,0.06)",
                    padding: "1px 6px", borderRadius: "100px",
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Paper cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {filtered.map((paper, i) => (
                <PaperCard key={paper.title} paper={paper} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
