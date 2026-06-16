"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useBreakpoint() {
  const [cols, setCols] = useState<{ skills: number; impact: number }>({ skills: 2, impact: 2 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols({
        skills: w >= 1024 ? 4 : w >= 640 ? 4 : 2,
        impact: w >= 640 ? 4 : 2,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { label: "SIEM Engineering",       pct: 92, years: "3+ yrs", color: "#00E5FF", desc: "Wazuh, Splunk, ELK" },
  { label: "Threat Intelligence",    pct: 88, years: "2+ yrs", color: "#A855F7", desc: "MISP, YARA, IOCs" },
  { label: "AI Security",            pct: 94, years: "2+ yrs", color: "#EC4899", desc: "BERT, RoBERTa, XAI" },
  { label: "Digital Forensics",      pct: 78, years: "2+ yrs", color: "#F59E0B", desc: "Memory, Disk Analysis" },
  { label: "Malware Analysis",       pct: 82, years: "2+ yrs", color: "#10B981", desc: "Static & Dynamic" },
  { label: "Cloud Security",         pct: 75, years: "1+ yrs", color: "#F97316", desc: "AWS, IAM, CSPM" },
  { label: "Research & Publication", pct: 85, years: "3+ yrs", color: "#6366F1", desc: "3 Papers, In Progress" },
  { label: "Machine Learning",       pct: 90, years: "2+ yrs", color: "#14B8A6", desc: "TF, Scikit-learn, NLP" },
];

const IMPACT_STATS = [
  { label: "Research Papers",  value: 3,   suffix: "+", color: "#00E5FF" },
  { label: "CVEs Analyzed",    value: 100, suffix: "+", color: "#A855F7" },
  { label: "Detection Rules",  value: 50,  suffix: "+", color: "#EC4899" },
  { label: "ML Models Built",  value: 8,   suffix: "+", color: "#10B981" },
];

const CIRCUMFERENCE = 2 * Math.PI * 54;

// ─── Count-up helper ─────────────────────────────────────────────────────────

function CountUp({ target, suffix, triggered }: { target: number; suffix: string; triggered: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const steps = 60;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 40);
    return () => clearInterval(timer);
  }, [triggered, target]);
  return <>{count}{suffix}</>;
}

// ─── Single donut card ───────────────────────────────────────────────────────

function DonutCard({ skill, index, animated }: { skill: (typeof SKILLS)[number]; index: number; animated: boolean }) {
  const offset = animated ? CIRCUMFERENCE * (1 - skill.pct / 100) : CIRCUMFERENCE;

  return (
    <div
      style={{
        background: "rgba(26,10,55,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${skill.color}28`,
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${skill.color}25`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}55`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}28`;
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Glow filter */}
        <defs>
          <filter id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        {/* Progress arc */}
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke={skill.color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          filter={`url(#glow-${index})`}
          style={{ transition: `stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) ${index * 0.15}s` }}
        />
        {/* Center percentage */}
        <text x="60" y="56" textAnchor="middle" dominantBaseline="middle"
          fontSize="20" fontWeight="700" fontFamily="var(--font-geist-mono), monospace" fill="#E2E8F0">
          {skill.pct}
        </text>
        <text x="60" y="72" textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-geist-mono), monospace" fill="#94A3B8">
          %
        </text>
      </svg>

      <div style={{
        fontSize: "12px", fontWeight: 700, color: "#E2E8F0",
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.06em", lineHeight: 1.3,
      }}>
        {skill.label}
      </div>

      <span style={{
        padding: "2px 10px", borderRadius: "100px",
        border: `1px solid ${skill.color}40`,
        backgroundColor: `${skill.color}12`,
        fontSize: "10px", color: skill.color,
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.04em",
      }}>
        {skill.years}
      </span>

      <div style={{ fontSize: "11px", color: "#94A3B8", letterSpacing: "0.03em" }}>
        {skill.desc}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MetricsDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [animated, setAnimated] = useState(false);
  const { skills: skillsCols, impact: impactCols } = useBreakpoint();

  useEffect(() => {
    if (inView) setAnimated(true);
  }, [inView]);

  return (
    <section
      id="metrics"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#12082A",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none" }}
      />

      {/* Purple radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,85,247,0.08), transparent)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 40% 40% at 80% 60%, rgba(0,229,255,0.04), transparent)",
      }} />

      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 24px", position: "relative", zIndex: 1,
      }}>
        {/* Section heading */}
        <div style={{ marginBottom: "8px" }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px", fontWeight: 600,
            color: "#A855F7", letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            EXECUTIVE DASHBOARD
          </span>
        </div>

        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800,
          color: "#E2E8F0", marginBottom: "8px",
        }}>
          SECURITY INTELLIGENCE{" "}
          <span style={{
            background: "linear-gradient(to right, #A855F7, #EC4899, #00E5FF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            DASHBOARD
          </span>
        </h2>

        <p style={{
          fontSize: "14px", color: "#94A3B8",
          fontFamily: "var(--font-geist-mono), monospace",
          marginBottom: "56px", letterSpacing: "0.04em",
        }}>
          Capability Assessment &amp; Research Impact Metrics
        </p>

        {/* Donut grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${skillsCols}, 1fr)`,
          gap: "20px", marginBottom: "60px",
        }}>
          {SKILLS.map((skill, i) => (
            <DonutCard key={skill.label} skill={skill} index={i} animated={animated} />
          ))}
        </div>

        {/* Research Impact */}
        <div style={{ marginBottom: "16px" }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px", fontWeight: 600,
            color: "#A855F7", letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            RESEARCH IMPACT
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${impactCols}, 1fr)`,
          gap: "16px",
        }}>
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(26,10,55,0.85)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${stat.color}28`,
                borderRadius: "14px",
                padding: "28px 20px",
                textAlign: "center",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${stat.color}20`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${stat.color}55`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = `${stat.color}28`;
              }}
            >
              <div style={{
                fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800,
                fontFamily: "var(--font-geist-mono), monospace",
                color: stat.color, lineHeight: 1, marginBottom: "8px",
              }}>
                <CountUp target={stat.value} suffix={stat.suffix} triggered={animated} />
              </div>
              <div style={{ fontSize: "12px", color: "#94A3B8", letterSpacing: "0.06em", lineHeight: 1.4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
