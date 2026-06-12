"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { FlaskConical, Target, FileText, BookOpen, Shield } from "lucide-react";

const METRICS = [
  { icon: FlaskConical, label: "Labs Completed", value: 50, suffix: "+" },
  { icon: Target, label: "CTFs Solved", value: 25, suffix: "+" },
  { icon: FileText, label: "Security Reports Written", value: 15, suffix: "+" },
  { icon: BookOpen, label: "Research Projects", value: 3, suffix: "+" },
  { icon: Shield, label: "Vulnerabilities Assessed", value: 100, suffix: "+" },
];

const RADAR_AXES = [
  { label: "Threat Detection", value: 95 },
  { label: "ML Security", value: 92 },
  { label: "SIEM Engineering", value: 90 },
  { label: "Incident Response", value: 85 },
  { label: "Offensive Security", value: 78 },
];

const AREA_CHART_DATA = [42, 58, 51, 73, 64, 88, 79, 92, 84, 96, 88, 95];

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

function SpiderChart({ triggered }: { triggered: boolean }) {
  const [animPct, setAnimPct] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1400;

  useEffect(() => {
    if (!triggered) return;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const pct = Math.min(elapsed / DURATION, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setAnimPct(eased);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered]);

  const cx = 200;
  const cy = 200;
  const maxR = 155;
  const n = RADAR_AXES.length;

  const getPoint = (axisIndex: number, radius: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * axisIndex) / n;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const polygonPoints = (r: number) =>
    Array.from({ length: n }, (_, i) => getPoint(i, r))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");

  const dataPoints = RADAR_AXES.map((axis, i) => {
    const r = (axis.value / 100) * maxR * animPct;
    return getPoint(i, r);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Area chart path
  const areaWidth = 560;
  const areaHeight = 100;
  const stepX = areaWidth / (AREA_CHART_DATA.length - 1);
  const minVal = Math.min(...AREA_CHART_DATA);
  const maxVal = Math.max(...AREA_CHART_DATA);
  const normalize = (v: number) => areaHeight - ((v - minVal) / (maxVal - minVal)) * areaHeight * 0.85 - 5;

  const areaPathD = AREA_CHART_DATA.map((v, i) => {
    const x = i * stepX;
    const y = normalize(v);
    if (i === 0) return `M ${x} ${y}`;
    const px = (i - 1) * stepX;
    const py = normalize(AREA_CHART_DATA[i - 1]);
    const cpx1 = px + stepX / 3;
    const cpy1 = py;
    const cpx2 = x - stepX / 3;
    const cpy2 = y;
    return `C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${x} ${y}`;
  }).join(" ");

  const areaFillD =
    areaPathD +
    ` L ${(AREA_CHART_DATA.length - 1) * stepX} ${areaHeight} L 0 ${areaHeight} Z`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "32px",
      }}
      className="lg:grid-cols-2"
    >
      {/* Spider Chart */}
      <div
        style={{
          background: "rgba(17,34,64,0.7)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0,229,255,0.12)",
          borderRadius: "16px",
          padding: "28px",
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
            marginBottom: "20px",
          }}
        >
          Capability Radar
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: "320px" }}>
            {/* Grid pentagons */}
            {gridLevels.map((level, li) => (
              <polygon
                key={li}
                points={polygonPoints(maxR * level)}
                fill="none"
                stroke="rgba(0,229,255,0.1)"
                strokeWidth="1"
              />
            ))}
            {/* Axis lines */}
            {RADAR_AXES.map((_, i) => {
              const outer = getPoint(i, maxR);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="rgba(0,229,255,0.1)"
                  strokeWidth="1"
                />
              );
            })}
            {/* Data polygon */}
            <polygon
              points={dataPolygon}
              fill="rgba(0,229,255,0.12)"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Data points */}
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#00E5FF" />
            ))}
            {/* Axis labels */}
            {RADAR_AXES.map((axis, i) => {
              const labelPt = getPoint(i, maxR + 22);
              return (
                <text
                  key={i}
                  x={labelPt.x}
                  y={labelPt.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="#8892B0"
                  fontFamily="var(--font-geist-mono), monospace"
                >
                  {axis.label}
                </text>
              );
            })}
            {/* Value labels at tips */}
            {RADAR_AXES.map((axis, i) => {
              const pt = getPoint(i, maxR * (axis.value / 100) * animPct - 14);
              return (
                <text
                  key={i}
                  x={pt.x}
                  y={pt.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fill="#00E5FF"
                  fontFamily="var(--font-geist-mono), monospace"
                  opacity={animPct > 0.5 ? (animPct - 0.5) * 2 : 0}
                >
                  {axis.value}%
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Area Chart */}
      <div
        style={{
          background: "rgba(17,34,64,0.7)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0,229,255,0.12)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
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
            marginBottom: "8px",
          }}
        >
          Threat Detection Activity
        </h3>
        <div
          style={{
            fontSize: "11px",
            color: "#8892B0",
            fontFamily: "var(--font-geist-mono), monospace",
            marginBottom: "20px",
            letterSpacing: "0.06em",
          }}
        >
          LAST 12 MONTHS — NORMALIZED DETECTION RATE
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <svg viewBox={`0 0 ${areaWidth} ${areaHeight + 20}`} width="100%" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
                <stop offset="100%" stopColor="rgba(0,229,255,0.02)" />
              </linearGradient>
              <clipPath id="areaClip">
                <rect
                  x="0"
                  y="0"
                  width={triggered ? areaWidth : 0}
                  height={areaHeight + 20}
                  style={{ transition: "width 2s ease-out" }}
                />
              </clipPath>
            </defs>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((l, i) => (
              <line
                key={i}
                x1={0}
                y1={normalize(minVal + (maxVal - minVal) * l)}
                x2={areaWidth}
                y2={normalize(minVal + (maxVal - minVal) * l)}
                stroke="rgba(0,229,255,0.06)"
                strokeWidth="1"
              />
            ))}
            <path d={areaFillD} fill="url(#areaGrad)" clipPath="url(#areaClip)" />
            <path
              d={areaPathD}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeLinecap="round"
              clipPath="url(#areaClip)"
            />
            {/* Month labels */}
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
              <text
                key={i}
                x={i * stepX}
                y={areaHeight + 15}
                textAnchor="middle"
                fontSize="9"
                fill="#475569"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {m}
              </text>
            ))}
          </svg>
        </div>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(0,229,255,0.08)",
          }}
        >
          {[
            { label: "Peak: 96%", color: "#00E5FF" },
            { label: "Avg: 76%", color: "#8892B0" },
            { label: "Trend: ↑", color: "rgba(0,229,255,0.7)" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: item.color,
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  color: item.color,
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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

        {/* Spider Chart + Area Chart */}
        <SpiderChart triggered={inView} />
      </div>
    </section>
  );
}
