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
  { label: "SIEM Engineering",       pct: 92, years: "3+ yrs", color: "#00E5FF",              desc: "Wazuh, Splunk, ELK" },
  { label: "Threat Intelligence",    pct: 88, years: "2+ yrs", color: "rgba(0,229,255,0.75)", desc: "MISP, YARA, IOCs" },
  { label: "AI Security",            pct: 94, years: "2+ yrs", color: "#00E5FF",              desc: "BERT, RoBERTa, XAI" },
  { label: "Digital Forensics",      pct: 78, years: "2+ yrs", color: "rgba(0,229,255,0.7)",  desc: "Memory, Disk Analysis" },
  { label: "Malware Analysis",       pct: 82, years: "2+ yrs", color: "#00E5FF",              desc: "Static & Dynamic" },
  { label: "Cloud Security",         pct: 75, years: "1+ yrs", color: "rgba(0,229,255,0.65)", desc: "AWS, IAM, CSPM" },
  { label: "Research & Publication", pct: 85, years: "3+ yrs", color: "#00E5FF",              desc: "3 Papers, In Progress" },
  { label: "Machine Learning",       pct: 90, years: "2+ yrs", color: "rgba(0,229,255,0.8)",  desc: "TF, Scikit-learn, NLP" },
];

const IMPACT_STATS = [
  { label: "Research Papers",    value: 3,   suffix: "+" },
  { label: "CVEs Analyzed",      value: 100, suffix: "+" },
  { label: "Detection Rules",    value: 50,  suffix: "+" },
  { label: "ML Models Built",    value: 8,   suffix: "+" },
];

const CIRCUMFERENCE = 2 * Math.PI * 54;

// ─── Count-up helper ─────────────────────────────────────────────────────────

function CountUp({
  target,
  suffix,
  triggered,
}: {
  target: number;
  suffix: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const steps = 60;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [triggered, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// ─── Single donut card ───────────────────────────────────────────────────────

function DonutCard({
  skill,
  index,
  animated,
}: {
  skill: (typeof SKILLS)[number];
  index: number;
  animated: boolean;
}) {
  const offset = animated
    ? CIRCUMFERENCE * (1 - skill.pct / 100)
    : CIRCUMFERENCE;

  return (
    <div
      style={{
        background: "rgba(17,34,64,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(0,229,255,0.12)",
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
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,229,255,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="rgba(0,229,255,0.08)"
          strokeWidth="12"
        />
        {/* Progress arc */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={skill.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{
            transition: `stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) ${index * 0.15}s`,
          }}
        />
        {/* Center percentage */}
        <text
          x="60"
          y="56"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="700"
          fontFamily="var(--font-geist-mono), monospace"
          fill="#CCD6F6"
        >
          {skill.pct}
        </text>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fontFamily="var(--font-geist-mono), monospace"
          fill="#8892B0"
        >
          %
        </text>
      </svg>

      <div
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#CCD6F6",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.06em",
          lineHeight: 1.3,
        }}
      >
        {skill.label}
      </div>

      <span
        style={{
          padding: "2px 10px",
          borderRadius: "100px",
          border: "1px solid rgba(0,229,255,0.2)",
          backgroundColor: "rgba(0,229,255,0.06)",
          fontSize: "10px",
          color: "#00E5FF",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.04em",
        }}
      >
        {skill.years}
      </span>

      <div style={{ fontSize: "11px", color: "#8892B0", letterSpacing: "0.03em" }}>
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
        backgroundColor: "#0D2137",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.04), transparent)",
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
        {/* Section heading */}
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#00E5FF",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            EXECUTIVE DASHBOARD
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#CCD6F6",
            marginBottom: "8px",
          }}
        >
          SECURITY INTELLIGENCE{" "}
          <span
            style={{
              background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DASHBOARD
          </span>
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#8892B0",
            fontFamily: "var(--font-geist-mono), monospace",
            marginBottom: "56px",
            letterSpacing: "0.04em",
          }}
        >
          Capability Assessment &amp; Research Impact Metrics
        </p>

        {/* Donut grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${skillsCols}, 1fr)`,
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          {SKILLS.map((skill, i) => (
            <DonutCard key={skill.label} skill={skill} index={i} animated={animated} />
          ))}
        </div>

        {/* Research Impact */}
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#00E5FF",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            RESEARCH IMPACT
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${impactCols}, 1fr)`,
            gap: "16px",
          }}
        >
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(17,34,64,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(0,229,255,0.12)",
                borderRadius: "14px",
                padding: "28px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(36px, 5vw, 52px)",
                  fontWeight: 800,
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "#00E5FF",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} triggered={animated} />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8892B0",
                  letterSpacing: "0.06em",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
