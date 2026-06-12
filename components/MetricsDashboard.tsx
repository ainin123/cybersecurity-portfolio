"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { FlaskConical, Target, FileText, BookOpen, Shield } from "lucide-react";

const METRICS = [
  { icon: FlaskConical, label: "Labs Completed", value: 50, suffix: "+", color: "#00E5FF" },
  { icon: Target, label: "CTFs Solved", value: 25, suffix: "+", color: "#00E5FF" },
  { icon: FileText, label: "Security Reports Written", value: 15, suffix: "+", color: "#00E5FF" },
  { icon: BookOpen, label: "Research Projects", value: 3, suffix: "+", color: "#00E5FF" },
  { icon: Shield, label: "Vulnerabilities Assessed", value: 100, suffix: "+", color: "#00E5FF" },
];

const PROGRESS_BARS = [
  { label: "Threat Detection", pct: 95 },
  { label: "ML Security", pct: 92 },
  { label: "SIEM Engineering", pct: 90 },
  { label: "Incident Response", pct: 85 },
];

function CountUpMetric({ target, suffix, triggered }: { target: number; suffix: string; triggered: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
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

  return <>{count}{suffix}</>;
}

export default function MetricsDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="metrics"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#112240",
      }}
    >
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
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
            SECURITY METRICS
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#CCD6F6",
            marginBottom: "60px",
          }}
        >
          By The{" "}
          <span
            style={{
              background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Numbers
          </span>
        </h2>

        {/* Metric Cards */}
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            marginBottom: "60px",
          }}
        >
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              style={{
                background: "rgba(17,34,64,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(0,229,255,0.12)",
                borderRadius: "14px",
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <metric.icon size={22} color="#00E5FF" />
              </div>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "#00E5FF",
                  lineHeight: 1,
                }}
              >
                <CountUpMetric target={metric.value} suffix={metric.suffix} triggered={inView} />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8892B0",
                  letterSpacing: "0.06em",
                  lineHeight: 1.4,
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div
          style={{
            background: "rgba(17,34,64,0.7)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,229,255,0.12)",
            borderRadius: "16px",
            padding: "36px",
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#00E5FF",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono), monospace",
              marginBottom: "28px",
            }}
          >
            Key Capability Areas
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {PROGRESS_BARS.map((bar, i) => (
              <div key={bar.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#CCD6F6",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {bar.label}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#00E5FF",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {bar.pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    backgroundColor: "rgba(0,229,255,0.08)",
                    borderRadius: "100px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "100px",
                      background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.5))",
                      width: inView ? `${bar.pct}%` : "0%",
                      transition: `width 1.2s ease-out ${0.2 + i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
