"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts";
import { TrendingUp, BookOpen, Shield, Zap, Target } from "lucide-react";

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useScreenWidth() {
  const [width, setWidth] = useState(1280);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

// ─── Accent palette ───────────────────────────────────────────────────────────

const C = {
  green:  "#38a532",
  cyan:   "#00D4FF",
  purple: "#A855F7",
  pink:   "#EC4899",
  amber:  "#F59E0B",
  teal:   "#10B981",
  indigo: "#6366F1",
  orange: "#F97316",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    value: "3+",
    label: "Research Publications",
    subtitle: "Peer-Reviewed Publications",
    color: C.purple,
    trend: "+2 this year",
    Icon: BookOpen,
  },
  {
    value: "15+",
    label: "Security Projects",
    subtitle: "Completed Implementations",
    color: C.cyan,
    trend: "Active pipeline",
    Icon: Shield,
  },
  {
    value: "8+",
    label: "Threat Intel Integrations",
    subtitle: "MISP, AbuseIPDB, YARA",
    color: C.green,
    trend: "Live feeds",
    Icon: Zap,
  },
  {
    value: "98%",
    label: "Model Performance",
    subtitle: "Classification Accuracy",
    color: C.pink,
    trend: "F1 Score: 0.97",
    Icon: Target,
  },
] as const;

const CAPABILITY_DATA = [
  { domain: "SIEM Eng",    Expert: 40, Advanced: 40, Intermediate: 20 },
  { domain: "Threat Intel", Expert: 35, Advanced: 45, Intermediate: 20 },
  { domain: "AI Security", Expert: 50, Advanced: 35, Intermediate: 15 },
  { domain: "ML",          Expert: 45, Advanced: 40, Intermediate: 15 },
  { domain: "Malware",     Expert: 30, Advanced: 45, Intermediate: 25 },
  { domain: "Forensics",   Expert: 25, Advanced: 45, Intermediate: 30 },
  { domain: "Cloud Sec",   Expert: 20, Advanced: 40, Intermediate: 40 },
  { domain: "Research",    Expert: 45, Advanced: 40, Intermediate: 15 },
];

const TECH_ECOSYSTEM = [
  { name: "Python",    value: 20, color: C.green  },
  { name: "ELK Stack", value: 18, color: C.cyan   },
  { name: "Wazuh",     value: 15, color: C.purple },
  { name: "MISP",      value: 12, color: C.pink   },
  { name: "ML / AI",   value: 12, color: C.amber  },
  { name: "YARA",      value: 10, color: C.teal   },
  { name: "NLP",       value: 8,  color: C.indigo },
  { name: "Cloud Sec", value: 5,  color: C.orange },
];

const PROJECT_DISTRIBUTION = [
  { domain: "SIEM Engineering",    count: 5, color: C.green  },
  { domain: "AI Security Research",count: 4, color: C.cyan   },
  { domain: "Threat Intelligence", count: 3, color: C.purple },
  { domain: "Malware Analysis",    count: 2, color: C.pink   },
  { domain: "Cloud Security",      count: 2, color: C.amber  },
  { domain: "Digital Forensics",   count: 1, color: C.teal   },
];

const RESEARCH_IMPACT = [
  { metric: "Papers Published",      value: 3,  color: C.purple },
  { metric: "Datasets Processed",    value: 12, color: C.cyan   },
  { metric: "Models Developed",      value: 8,  color: C.green  },
  { metric: "Detection Rules",       value: 50, color: C.pink   },
  { metric: "Sec. Integrations",     value: 8,  color: C.amber  },
  { metric: "Threat Feeds",          value: 15, color: C.teal   },
];

// ─── Shared panel style ───────────────────────────────────────────────────────

const glass: React.CSSProperties = {
  background: "linear-gradient(135deg, #050816 0%, #080d1c 100%)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 20,
  position: "relative",
  overflow: "hidden",
};

// ─── Custom Tooltips ──────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function CapabilityTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0a0f1e", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 10, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <p style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8, fontFamily: "monospace", letterSpacing: "0.06em" }}>{label}</p>
      {[...payload].reverse().map((p: any) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.fill, flexShrink: 0 }} />
          <span style={{ color: "#e2e8f0", fontSize: 12, fontFamily: "monospace" }}>
            {p.name}: <strong style={{ color: p.fill }}>{p.value}%</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: entry } = payload[0];
  return (
    <div style={{ background: "#0a0f1e", border: `1px solid ${entry.color}40`, borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <p style={{ color: entry.color, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{name}</p>
      <p style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}>{value}% usage share</p>
    </div>
  );
}

function HBarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const color = payload[0].payload.color as string;
  return (
    <div style={{ background: "#0a0f1e", border: `1px solid ${color}30`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <p style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4, fontFamily: "monospace" }}>{label}</p>
      <p style={{ color, fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>{payload[0].value} Projects</p>
    </div>
  );
}

function ImpactTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const color = payload[0].payload.color as string;
  return (
    <div style={{ background: "#0a0f1e", border: `1px solid ${color}30`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <p style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4, fontFamily: "monospace" }}>{label}</p>
      <p style={{ color, fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>{payload[0].value}</p>
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPICard({ kpi, index }: { kpi: typeof KPI_CARDS[number]; index: number }) {
  const { Icon, color, value, label, subtitle, trend } = kpi;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        ...glass,
        flex: 1,
        border: `1px solid ${hovered ? color + "50" : color + "22"}`,
        boxShadow: hovered ? `0 0 28px ${color}18, 0 8px 24px rgba(0,0,0,0.3)` : "0 4px 12px rgba(0,0,0,0.15)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
        padding: "18px 20px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + trend row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `${color}16`,
          border: `1px solid ${color}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "box-shadow 0.3s ease",
          boxShadow: hovered ? `0 0 14px ${color}35` : "none",
        }}>
          <Icon size={16} color={color} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TrendingUp size={9} color={C.teal} />
          <span style={{ fontSize: 9, color: C.teal, fontFamily: "monospace", letterSpacing: "0.05em" }}>
            {trend}
          </span>
        </div>
      </div>

      {/* Value */}
      <div style={{
        fontSize: "clamp(28px, 2.8vw, 34px)",
        fontWeight: 800,
        color,
        fontFamily: "var(--font-geist-mono), monospace",
        lineHeight: 1,
        marginBottom: 6,
        letterSpacing: "-0.02em",
        textShadow: hovered ? `0 0 18px ${color}55` : "none",
        transition: "text-shadow 0.3s ease",
      }}>
        {value}
      </div>

      {/* Label */}
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", marginBottom: 3, lineHeight: 1.3 }}>
        {label}
      </div>

      {/* Subtitle */}
      <div style={{ fontSize: 9, color: "#475569", fontFamily: "monospace", letterSpacing: "0.05em", lineHeight: 1.4 }}>
        {subtitle}
      </div>

      {/* Bottom glow line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        transform: `scaleX(${hovered ? 1 : 0})`,
        transition: "transform 0.4s ease",
        transformOrigin: "center",
      }} />
    </motion.div>
  );
}

// ─── Panel header ─────────────────────────────────────────────────────────────

function PanelHeader({ accent, label, title }: { accent: string; label: string; title: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{
        fontSize: 10, color: accent,
        fontFamily: "monospace", letterSpacing: "0.18em",
        textTransform: "uppercase" as const, marginBottom: 4,
      }}>
        {label}
      </p>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2 }}>{title}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MetricsDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mounted, setMounted] = useState(false);
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1080;

  useEffect(() => { setMounted(true); }, []);

  const topGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : isTablet ? "220px 1fr" : "260px 1fr",
    gap: 20,
    marginBottom: 20,
    alignItems: "start",
  };

  const bottomGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: 20,
  };

  const axisStyle = { fill: "#475569", fontSize: 10, fontFamily: "monospace" as const };
  const gridStyle = { stroke: "rgba(255,255,255,0.05)", strokeDasharray: "3 3" };

  return (
    <section
      id="metrics"
      ref={ref}
      style={{ position: "relative", padding: "100px 0", background: "#F8FAFC" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 44 }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11, fontWeight: 600,
            color: C.purple, letterSpacing: "0.2em", textTransform: "uppercase",
            display: "block", marginBottom: 8,
          }}>
            EXECUTIVE ANALYTICS
          </span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800,
            color: "#0f172a", marginBottom: 8, lineHeight: 1.1,
          }}>
            Security Intelligence{" "}
            <span style={{
              background: `linear-gradient(to right, ${C.purple}, ${C.cyan})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Dashboard
            </span>
          </h2>
          <p style={{
            fontSize: 13, color: "#64748b",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.04em",
          }}>
            Capability Analytics · Research Impact · Project Distribution · Technology Ecosystem
          </p>
        </motion.div>

        {/* ── Top row ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.6 }}
          style={topGrid}
        >
          {/* KPI Column */}
          <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: "wrap", gap: 14 }}>
            {KPI_CARDS.map((kpi, i) => (
              <div key={kpi.label} style={{ flex: isMobile ? "1 1 calc(50% - 7px)" : "1 1 0" }}>
                <KPICard kpi={kpi} index={i} />
              </div>
            ))}
          </div>

          {/* Charts Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Capability Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.55 }}
              style={glass}
            >
              <PanelHeader accent={C.cyan} label="CAPABILITY DISTRIBUTION" title="Competency Level Analysis" />
              {mounted ? (
                <ResponsiveContainer width="100%" height={248}>
                  <BarChart data={CAPABILITY_DATA} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
                    <CartesianGrid {...gridStyle} vertical={false} />
                    <XAxis
                      dataKey="domain"
                      tick={axisStyle}
                      axisLine={{ stroke: "rgba(255,255,255,0.07)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={axisStyle}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      content={<CapabilityTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: 12 }}
                      formatter={(value: string) => (
                        <span style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}>{value}</span>
                      )}
                    />
                    <ReferenceLine
                      y={70}
                      stroke={`${C.amber}55`}
                      strokeDasharray="5 5"
                      label={{ value: "Senior Threshold", position: "insideTopRight", fill: C.amber, fontSize: 9 }}
                    />
                    <Bar dataKey="Intermediate" stackId="a" fill={C.indigo} />
                    <Bar dataKey="Advanced"     stackId="a" fill={C.cyan}   />
                    <Bar dataKey="Expert"       stackId="a" fill={C.green}  radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: 248, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 32, height: 32, border: `2px solid ${C.cyan}30`, borderTopColor: C.cyan, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                </div>
              )}
            </motion.div>

            {/* Technology Ecosystem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36, duration: 0.55 }}
              style={glass}
            >
              <PanelHeader accent={C.purple} label="TECHNOLOGY ECOSYSTEM" title="Technology Usage Breakdown" />
              {mounted ? (
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  {/* Donut */}
                  <div style={{ flexShrink: 0 }}>
                    <PieChart width={188} height={188}>
                      <Pie
                        data={TECH_ECOSYSTEM}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={84}
                        paddingAngle={3}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                      >
                        {TECH_ECOSYSTEM.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </div>
                  {/* Legend */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", flex: 1, minWidth: 160 }}>
                    {TECH_ECOSYSTEM.map((item) => (
                      <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: item.color,
                          boxShadow: `0 0 6px ${item.color}80`,
                          flexShrink: 0,
                        }} />
                        <div>
                          <div style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: 10, color: item.color, fontFamily: "monospace" }}>{item.value}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ height: 188, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 32, height: 32, border: `2px solid ${C.purple}30`, borderTopColor: C.purple, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                </div>
              )}
            </motion.div>

          </div>
        </motion.div>

        {/* ── Bottom row ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.44, duration: 0.6 }}
          style={bottomGrid}
        >

          {/* Project Distribution */}
          <div style={glass}>
            <PanelHeader accent={C.green} label="PORTFOLIO ANALYTICS" title="Project Distribution by Domain" />
            {mounted ? (
              <ResponsiveContainer width="100%" height={224}>
                <BarChart
                  layout="vertical"
                  data={PROJECT_DISTRIBUTION}
                  margin={{ top: 0, right: 44, bottom: 0, left: 16 }}
                >
                  <CartesianGrid {...gridStyle} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={axisStyle}
                    axisLine={{ stroke: "rgba(255,255,255,0.07)" }}
                    tickLine={false}
                    domain={[0, 6]}
                    allowDecimals={false}
                  />
                  <YAxis
                    dataKey="domain"
                    type="category"
                    width={138}
                    tick={{ ...axisStyle, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<HBarTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={20}>
                    {PROJECT_DISTRIBUTION.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="count"
                      position="right"
                      style={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 224, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 32, height: 32, border: `2px solid ${C.green}30`, borderTopColor: C.green, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              </div>
            )}
          </div>

          {/* Research Impact */}
          <div style={glass}>
            <PanelHeader accent={C.pink} label="RESEARCH ANALYTICS" title="Research Impact Metrics" />
            {mounted ? (
              <ResponsiveContainer width="100%" height={224}>
                <BarChart
                  data={RESEARCH_IMPACT}
                  margin={{ top: 8, right: 8, bottom: 32, left: -18 }}
                >
                  <CartesianGrid {...gridStyle} vertical={false} />
                  <XAxis
                    dataKey="metric"
                    tick={{ ...axisStyle, fill: "#64748b" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.07)" }}
                    tickLine={false}
                    interval={0}
                    angle={-22}
                    textAnchor="end"
                    height={48}
                  />
                  <YAxis
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<ImpactTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={38}>
                    {RESEARCH_IMPACT.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 224, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 32, height: 32, border: `2px solid ${C.pink}30`, borderTopColor: C.pink, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              </div>
            )}
          </div>

        </motion.div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
