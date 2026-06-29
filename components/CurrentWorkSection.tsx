"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Cloud, Target, Activity, CheckCircle2, Circle } from "lucide-react";

const PROJECTS = [
  {
    icon: ShieldCheck,
    status: "ACTIVE",
    statusColor: "#38a532",
    statusBg: "rgba(56,165,50,0.1)",
    statusBorder: "rgba(56,165,50,0.3)",
    title: "AI-Powered Data Loss Prevention",
    subtitle: "Transformer-based sensitive data classification engine",
    description:
      "Finalizing BERT & RoBERTa fine-tuning on domain-specific security corpora for production-ready DLP with context-aware sensitivity detection across 12+ document types.",
    tech: ["BERT", "RoBERTa", "spaCy", "TensorFlow", "Python", "NLP"],
    metrics: [
      { label: "Accuracy", value: "98%" },
      { label: "False Negatives ↓", value: "71%" },
      { label: "Doc Types", value: "12+" },
    ],
    progress: 75,
    progressLabel: "Model Deployment",
    milestones: [
      { label: "Dataset", done: true },
      { label: "Fine-tuning", done: true },
      { label: "Validation", done: true },
      { label: "Production", done: false },
    ],
    accentColor: "#38a532",
  },
  {
    icon: Cloud,
    status: "IN PROGRESS",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.08)",
    statusBorder: "rgba(245,158,11,0.3)",
    title: "Cloud-Native SIEM Infrastructure",
    subtitle: "Auto-scaling containerized threat detection",
    description:
      "Architecting cloud-native SIEM with Docker & Kubernetes for containerized Wazuh deployment featuring auto-scaling threat detection, high availability, and infrastructure-as-code provisioning.",
    tech: ["Docker", "Kubernetes", "Wazuh", "ElasticStack", "Terraform", "AWS"],
    metrics: [
      { label: "Nodes", value: "12" },
      { label: "Throughput", value: "50K/s" },
      { label: "Uptime Target", value: "99.9%" },
    ],
    progress: 40,
    progressLabel: "Auto-scaling Config",
    milestones: [
      { label: "Architecture", done: true },
      { label: "Containers", done: true },
      { label: "Auto-scale", done: false },
      { label: "Deploy", done: false },
    ],
    accentColor: "#f59e0b",
  },
  {
    icon: Target,
    status: "IN PROGRESS",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.08)",
    statusBorder: "rgba(245,158,11,0.3)",
    title: "Threat Intelligence Automation",
    subtitle: "Automated IOC enrichment & correlation pipeline",
    description:
      "Building an automated pipeline integrating MISP & VirusTotal for IOC enrichment, cross-feed deduplication, and priority scoring — cutting analyst response time from hours to minutes.",
    tech: ["MISP", "Python", "VirusTotal API", "Redis", "PostgreSQL", "Celery"],
    metrics: [
      { label: "IOCs Processed", value: "10K+" },
      { label: "Correlation ↑", value: "83%" },
      { label: "Intel Feeds", value: "8" },
    ],
    progress: 50,
    progressLabel: "Priority Scoring",
    milestones: [
      { label: "Pipeline", done: true },
      { label: "Deduplication", done: true },
      { label: "Scoring", done: false },
      { label: "SIEM Link", done: false },
    ],
    accentColor: "#f59e0b",
  },
  {
    icon: Activity,
    status: "RESEARCH",
    statusColor: "#818cf8",
    statusBg: "rgba(129,140,248,0.08)",
    statusBorder: "rgba(129,140,248,0.25)",
    title: "UEBA Insider Threat Detection",
    subtitle: "Temporal behavioral baseline profiling",
    description:
      "Researching User Entity Behavior Analytics models that construct temporal behavioral baselines to surface insider threat indicators invisible to signature-based systems — targeting 91% detection accuracy.",
    tech: ["Python", "Temporal ML", "Behavioral Analytics", "UEBA", "Pandas", "PyTorch"],
    metrics: [
      { label: "Test Scenarios", value: "15" },
      { label: "Detection Rate", value: "91%" },
      { label: "Baseline Window", value: "30d" },
    ],
    progress: 20,
    progressLabel: "Dataset Collection",
    milestones: [
      { label: "Literature", done: true },
      { label: "Dataset", done: false },
      { label: "Model", done: false },
      { label: "Validation", done: false },
    ],
    accentColor: "#818cf8",
  },
];

// ─── Scanning-line effect ─────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      animate={{ y: ["0%", "100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      style={{
        position: "absolute",
        left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(56,165,50,0.15), transparent)",
        pointerEvents: "none",
        zIndex: 1,
        top: 0,
      }}
    />
  );
}

// ─── Corner decoration ────────────────────────────────────────────────────────
function CornerDeco({ pos, color }: { pos: "tl" | "tr" | "bl" | "br"; color: string }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: "14px", height: "14px",
    borderColor: color,
    borderStyle: "solid",
    opacity: 0.5,
    ...(pos === "tl" && { top: "8px", left: "8px", borderWidth: "1px 0 0 1px", borderRadius: "2px 0 0 0" }),
    ...(pos === "tr" && { top: "8px", right: "8px", borderWidth: "1px 1px 0 0", borderRadius: "0 2px 0 0" }),
    ...(pos === "bl" && { bottom: "8px", left: "8px", borderWidth: "0 0 1px 1px", borderRadius: "0 0 0 2px" }),
    ...(pos === "br" && { bottom: "8px", right: "8px", borderWidth: "0 1px 1px 0", borderRadius: "0 0 2px 0" }),
  };
  return <div style={style} />;
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isActive = project.status === "ACTIVE";
  const accent = project.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay: 0.15 + index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? `linear-gradient(135deg, rgba(2,8,16,0.92), rgba(${accent === "#38a532" ? "56,165,50" : accent === "#f59e0b" ? "245,158,11" : "129,140,248"},0.04))`
          : "rgba(2,8,16,0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: hovered
          ? `1px solid ${accent}60`
          : `1px solid ${accent === "#38a532" ? "rgba(56,165,50,0.15)" : accent === "#f59e0b" ? "rgba(245,158,11,0.12)" : "rgba(129,140,248,0.12)"}`,
        borderRadius: "18px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        transition: "box-shadow 0.4s ease, border-color 0.3s, background 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px ${accent}18, 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 ${accent}20`
          : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Corner decorations */}
      <CornerDeco pos="tl" color={accent} />
      <CornerDeco pos="tr" color={accent} />
      <CornerDeco pos="bl" color={accent} />
      <CornerDeco pos="br" color={accent} />

      {/* Radial glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "18px",
          background: `radial-gradient(circle at 30% 20%, ${accent}08, transparent 60%)`,
        }} />
      )}

      {/* ── Header row ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        {/* Icon */}
        <motion.div
          animate={hovered ? { scale: 1.1, rotate: 3 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "52px", height: "52px",
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${accent}18, ${accent}08)`,
            border: `1px solid ${accent}35`,
            boxShadow: hovered ? `0 0 20px ${accent}25` : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "box-shadow 0.3s",
          }}
        >
          <project.icon size={22} color={accent} />
        </motion.div>

        {/* Status badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "5px",
          padding: "5px 12px", borderRadius: "100px",
          backgroundColor: project.statusBg,
          border: `1px solid ${project.statusBorder}`,
        }}>
          <motion.span
            animate={isActive ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "5px", height: "5px", borderRadius: "50%",
              backgroundColor: project.statusColor, flexShrink: 0,
              boxShadow: isActive ? `0 0 6px ${project.statusColor}` : "none",
            }}
          />
          <span style={{
            fontSize: "9px", fontWeight: 700,
            fontFamily: "var(--font-geist-mono), monospace",
            color: project.statusColor, letterSpacing: "0.1em",
          }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* ── Title ── */}
      <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#FFFFFF", marginBottom: "4px", lineHeight: 1.3 }}>
        {project.title}
      </h3>
      <p style={{
        fontSize: "11px", color: accent, fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.05em", marginBottom: "14px", opacity: 0.8,
      }}>
        {project.subtitle}
      </p>

      {/* ── Description ── */}
      <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "20px" }}>
        {project.description}
      </p>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: `linear-gradient(to right, ${accent}25, transparent)`, marginBottom: "16px" }} />

      {/* ── Tech stack ── */}
      <div style={{ marginBottom: "20px" }}>
        <span style={{
          fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.35)",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "8px",
        }}>
          Stack
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              padding: "3px 8px", borderRadius: "5px",
              fontSize: "10px", fontWeight: 500,
              fontFamily: "var(--font-geist-mono), monospace",
              color: hovered ? accent : "rgba(255,255,255,0.55)",
              backgroundColor: hovered ? `${accent}12` : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered ? accent + "30" : "rgba(255,255,255,0.08)"}`,
              transition: "all 0.3s",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Metrics ── */}
      <div style={{ marginBottom: "20px" }}>
        <span style={{
          fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.35)",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "10px",
        }}>
          Key Metrics
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {project.metrics.map((m) => (
            <div key={m.label} style={{
              background: `${accent}08`,
              border: `1px solid ${accent}18`,
              borderRadius: "8px", padding: "8px 6px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "16px", fontWeight: 800,
                color: accent, fontFamily: "var(--font-geist-mono), monospace",
                lineHeight: 1, marginBottom: "4px",
              }}>
                {m.value}
              </div>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{
            fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            {project.progressLabel}
          </span>
          <span style={{
            fontSize: "12px", fontWeight: 800,
            color: accent, fontFamily: "var(--font-geist-mono), monospace",
          }}>
            {project.progress}%
          </span>
        </div>
        <div style={{
          height: "6px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "100px",
          overflow: "hidden",
          border: `1px solid ${accent}15`,
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${project.progress}%` } : {}}
            transition={{ duration: 1.4, delay: 0.4 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              height: "100%",
              borderRadius: "100px",
              background: `linear-gradient(to right, ${accent}, ${accent}80)`,
              boxShadow: `0 0 8px ${accent}60`,
              position: "relative",
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, delay: 1.2 + index * 0.1, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)",
                borderRadius: "100px",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${accent}20, transparent)`, marginBottom: "16px" }} />

      {/* ── Milestones ── */}
      <div>
        <span style={{
          fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.35)",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "10px",
        }}>
          Milestones
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          {project.milestones.map((ms, mi) => (
            <div key={ms.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                {ms.done ? (
                  <CheckCircle2 size={14} color={accent} style={{ filter: `drop-shadow(0 0 4px ${accent})` }} />
                ) : (
                  <Circle size={14} color="rgba(255,255,255,0.2)" />
                )}
                <span style={{
                  fontSize: "8px", color: ms.done ? accent : "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  whiteSpace: "nowrap", letterSpacing: "0.04em",
                }}>
                  {ms.label}
                </span>
              </div>
              {mi < project.milestones.length - 1 && (
                <div style={{
                  flex: 1, height: "1px", margin: "0 4px", marginBottom: "14px",
                  background: ms.done ? `linear-gradient(to right, ${accent}60, ${project.milestones[mi + 1].done ? accent + "60" : "rgba(255,255,255,0.1)"})` : "rgba(255,255,255,0.1)",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Animated dot particle field ──────────────────────────────────────────────
function DotField() {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {dots.map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.04, 0.14, 0.04], scale: [1, 1.4, 1] }}
          transition={{ duration: 3 + (i % 5), delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "3px", height: "3px",
            borderRadius: "50%",
            background: "#38a532",
            left: `${(i * 37 + 5) % 95}%`,
            top: `${(i * 53 + 8) % 90}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function CurrentWorkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <section
      id="current-work"
      ref={ref}
      style={{
        position: "relative",
        padding: "110px 0",
        backgroundColor: "#020810",
        overflow: "hidden",
      }}
    >
      {/* Backgrounds */}
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none", zIndex: 0 }} />
      <DotField />
      <ScanLine />

      {/* Top radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(56,165,50,0.05), transparent 70%)",
      }} />
      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "200px", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at center, rgba(56,165,50,0.04), transparent 70%)",
      }} />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "16px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px", fontWeight: 600,
            color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            CURRENT WORK
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, lineHeight: 1.15,
            color: "#FFFFFF", marginBottom: "16px",
          }}
        >
          What I&apos;m{" "}
          <span style={{
            background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Building Now
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "15px", lineHeight: 1.75,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "680px", marginBottom: "16px",
          }}
        >
          Actively engineering AI-driven cybersecurity solutions across Data Loss Prevention, Explainable AI Security, Threat Intelligence Automation, Cloud-Native SIEM, and User Behavior Analytics.
        </motion.p>

        {/* Live status strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.24, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "20px",
            padding: "8px 16px", borderRadius: "8px",
            border: "1px solid rgba(56,165,50,0.15)",
            backgroundColor: "rgba(56,165,50,0.04)",
            marginBottom: "56px", flexWrap: "wrap",
          }}
        >
          {[
            { label: "Active Projects", val: "2", color: "#38a532" },
            { label: "In Progress", val: "2", color: "#f59e0b" },
            { label: "Research Phase", val: "1", color: "#818cf8" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                backgroundColor: stat.color,
                boxShadow: `0 0 6px ${stat.color}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px", fontWeight: 700,
                color: stat.color,
              }}>
                {stat.val}
              </span>
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px", color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.06em",
              }}>
                {stat.label.toUpperCase()}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "24px" }}
        >
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Animated show more / less arrow ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "36px", gap: "6px" }}
        >
          <span style={{
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono), monospace",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {showAll ? "Show Less" : `${PROJECTS.length - 3} More Projects`}
          </span>

          <motion.button
            onClick={() => setShowAll((v) => !v)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            style={{
              background: "none",
              border: "1px solid rgba(56,165,50,0.3)",
              borderRadius: "50%",
              width: "40px", height: "40px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "rgba(56,165,50,0.06)",
            }}
          >
            <motion.svg
              width="18" height="18" viewBox="0 0 18 18" fill="none"
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <path d="M4 6.5L9 11.5L14 6.5" stroke="#38a532" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>

          {!showAll && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", marginTop: "2px" }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.7, 0.2], y: [0, 3, 0] }}
                  transition={{ duration: 1.2, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    backgroundColor: "#38a532",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
