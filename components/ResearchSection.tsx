"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShieldCheck, Server, Eye, CircleCheck, BookOpen, Clock, Send, ExternalLink } from "lucide-react";

const RESEARCH = [
  {
    badge: "Primary Research",
    badgeColor: "#38a532",
    icon: ShieldCheck,
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.1)",
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
    badgeColor: "#38a532",
    icon: Server,
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.1)",
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
    statusColor: "#38a532",
    statusBg: "rgba(56,165,50,0.1)",
  },
  {
    badge: "Academic Research",
    badgeColor: "rgba(56,165,50,0.6)",
    icon: Eye,
    iconColor: "rgba(56,165,50,0.7)",
    iconBg: "rgba(56,165,50,0.08)",
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
    statusColor: "rgba(56,165,50,0.6)",
    statusBg: "rgba(56,165,50,0.08)",
  },
];

type ResearchItem = typeof RESEARCH[0];

// ─── Plexus Canvas Background ─────────────────────────────────────────────────
function PlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const COUNT = 90;
    const MAX_DIST = 160;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 1.1,
      vy: (Math.random() - 0.5) * 1.1,
      r: Math.random() * 1.8 + 0.8,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // Lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,165,50,${alpha * 0.55})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dots with glow
      for (const p of particles) {
        // Outer glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, "rgba(56,165,50,0.12)");
        grd.addColorStop(1, "rgba(56,165,50,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,165,50,0.45)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function ResearchCard({ r, i, inView }: { r: ResearchItem; i: number; inView: boolean }) {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.div
      key={r.title}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: "rgba(2,8,16,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: cardHovered ? "1px solid rgba(56,165,50,0.35)" : "1px solid rgba(56,165,50,0.12)",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "box-shadow 0.3s ease, border-color 0.3s, transform 0.3s",
        transform: cardHovered ? "translateY(-6px)" : "none",
        boxShadow: cardHovered ? "0 12px 40px rgba(56,165,50,0.1)" : "none",
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
            border: "1px solid rgba(56,165,50,0.2)",
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
              backgroundColor: "rgba(56,165,50,0.08)",
              border: "1px solid rgba(56,165,50,0.2)",
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
              border: "1px solid rgba(56,165,50,0.2)",
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
              <CircleCheck size={13} color="#38a532" style={{ flexShrink: 0, marginTop: "2px" }} />
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
          borderTop: "1px solid rgba(56,165,50,0.08)",
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
              color: cardHovered ? "#38a532" : "rgba(255,255,255,0.65)",
              backgroundColor: cardHovered ? "rgba(56,165,50,0.12)" : "rgba(56,165,50,0.06)",
              border: cardHovered ? "1px solid rgba(56,165,50,0.3)" : "1px solid rgba(56,165,50,0.1)",
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

// ─── Papers Data ─────────────────────────────────────────────────────────────
type PaperStatus = "Published" | "Submitted" | "In Progress";

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
    status: "Published",
    title: "Deploying Wazuh SIEM for Proactive Network Threat Detection: Architecture, Rules & Real-World Validation",
    venue: "International Journal of Advanced Computer Science & Applications (IJACSA), Vol. 15, Issue 3, 2024",
    abstract:
      "This study presents a comprehensive Wazuh SIEM deployment framework for enterprise network defence, detailing custom rule engineering, multi-source log integration, and automated threat-hunting workflows. Validated on live infrastructure at a national cybersecurity centre, the framework reduced mean-time-to-detect (MTTD) by 40% and enabled real-time blocking of unauthorized applications, malicious domains, and IDS-triggered threats.",
    keywords: ["SIEM", "Wazuh", "Network Security", "Threat Detection", "SOC", "Automation"],
    year: "2024",
  },
  {
    status: "Submitted",
    title: "Context-Aware Sensitive Data Classification Using Fine-Tuned Transformer Models: A Next-Generation DLP Framework",
    venue: "IEEE Transactions on Information Forensics and Security (IEEE TIFS) — Under Review",
    abstract:
      "We propose a Data Loss Prevention (DLP) framework leveraging BERT and RoBERTa fine-tuned on domain-specific security corpora. Our approach achieves 98% classification accuracy across diverse document types, reducing false negatives by 71% over regex-based baselines. SHAP-driven explanations surface audit-ready rationale, enabling compliance teams to trust and validate automated decisions without domain ML expertise.",
    keywords: ["BERT", "RoBERTa", "DLP", "NLP", "Transformer", "XAI", "Data Classification"],
    year: "2025",
  },
  {
    status: "In Progress",
    title: "Explainable AI for Cybersecurity Threat Detection: SHAP-Driven Transparency in ML-Powered SIEM Alert Scoring",
    venue: "Target: Computers & Security (Elsevier) — Expected Q3 2025",
    abstract:
      "We tackle the black-box problem in ML-based threat detection by embedding SHAP explainability directly into SIEM alert scoring pipelines. Analyst-facing decision rationale surfaces top contributing features per alert, enabling trust calibration, faster triage, and measurable reduction in alert fatigue — bridging the gap between AI capability and operational analyst confidence.",
    keywords: ["XAI", "SHAP", "LIME", "SIEM", "ML Transparency", "SOC", "Alert Triage"],
    year: "2025",
  },
  {
    status: "In Progress",
    title: "Behavioral Baseline Profiling for Insider Threat Detection: A UEBA Framework Using Temporal Anomaly Scoring",
    venue: "Target: Journal of Cybersecurity, Oxford University Press — Expected Q4 2025",
    abstract:
      "We introduce a User Entity Behavior Analytics (UEBA) framework that constructs temporal behavioral baselines to detect subtle insider threat indicators invisible to signature-based systems. Evaluated on simulated insider threat scenarios, the model achieves 91% detection accuracy with a false-positive rate suitable for live SOC deployment — providing interpretable risk scores for each flagged entity.",
    keywords: ["UEBA", "Insider Threat", "Behavioral Analytics", "Temporal Patterns", "Anomaly Detection"],
    year: "2025",
  },
];

const STATUS_CONFIG: Record<PaperStatus, { color: string; bg: string; border: string; icon: typeof BookOpen }> = {
  Published:    { color: "#38a532",         bg: "rgba(56,165,50,0.1)",      border: "rgba(56,165,50,0.25)",      icon: BookOpen },
  Submitted:    { color: "#f59e0b",         bg: "rgba(245,158,11,0.1)",     border: "rgba(245,158,11,0.25)",     icon: Send },
  "In Progress":{ color: "rgba(56,165,50,0.6)", bg: "rgba(56,165,50,0.06)", border: "rgba(56,165,50,0.15)",      icon: Clock },
};

// ─── Papers Filter Component ──────────────────────────────────────────────────
function PapersFilter({ inView }: { inView: boolean }) {
  const [active, setActive] = useState<PaperStatus | "All">("All");

  const tabs: Array<PaperStatus | "All"> = ["All", "Published", "Submitted", "In Progress"];
  const filtered = active === "All" ? PAPERS : PAPERS.filter((p) => p.status === active);

  return (
    <div style={{ marginTop: "80px" }}>
      {/* Sub-heading */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ marginBottom: "8px" }}
      >
        <span style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "12px", fontWeight: 600,
          color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
        }}>
          PUBLICATIONS
        </span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "32px" }}
      >
        Research{" "}
        <span style={{
          background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          Papers
        </span>
      </motion.h3>

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
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.04em",
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
          {filtered.map((paper, i) => {
            const cfg = STATUS_CONFIG[paper.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                style={{
                  background: "rgba(2,8,16,0.75)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${cfg.border}`,
                  borderRadius: "14px",
                  padding: "28px",
                  display: "grid",
                  gap: "16px",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                whileHover={{ boxShadow: `0 8px 32px ${cfg.color}18`, borderColor: cfg.color + "55" } as never}
              >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "9px",
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={17} color={cfg.color} />
                    </div>
                    <span style={{
                      fontSize: "11px", fontWeight: 700,
                      color: cfg.color, backgroundColor: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      padding: "3px 10px", borderRadius: "100px",
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.06em",
                    }}>
                      {paper.status.toUpperCase()}
                    </span>
                  </div>
                  {paper.year && (
                    <span style={{
                      fontSize: "11px", color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}>
                      {paper.year}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 style={{
                  fontSize: "16px", fontWeight: 700, color: "#FFFFFF",
                  lineHeight: 1.45, margin: 0,
                }}>
                  {paper.title}
                </h4>

                {/* Venue */}
                <p style={{
                  fontSize: "12px", color: cfg.color,
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.03em", margin: 0,
                }}>
                  {paper.venue}
                </p>

                {/* Abstract */}
                <p style={{
                  fontSize: "13px", lineHeight: 1.75,
                  color: "rgba(255,255,255,0.65)", margin: 0,
                }}>
                  {paper.abstract}
                </p>

                {/* Keywords + link */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {paper.keywords.map((k) => (
                      <span key={k} style={{
                        padding: "2px 8px", borderRadius: "5px",
                        fontSize: "10px", fontWeight: 500,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "rgba(255,255,255,0.55)",
                        backgroundColor: "rgba(56,165,50,0.06)",
                        border: "1px solid rgba(56,165,50,0.12)",
                      }}>
                        {k}
                      </span>
                    ))}
                  </div>
                  {paper.status === "Published" && (
                    <button style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontSize: "12px", fontWeight: 600, color: "#38a532",
                      background: "none", border: "none", cursor: "pointer", padding: 0,
                    }}>
                      Read Paper <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ResearchSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

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
      {/* Plexus particle network background */}
      <PlexusCanvas />

      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(2,8,16,0.5) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
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
            03 // RESEARCH
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
          Research &amp;{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
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

        {/* Papers filter section */}
        <PapersFilter inView={inView} />
      </div>
    </section>
  );
}

