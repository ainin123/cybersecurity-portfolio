"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE = [
  {
    year: "2024",
    title: "Research Associate, National Centre for Cyber Security (NCCS), National Aerospace, Science and Technology Park (NASTP)",
    description:
      "Designing and deploying enterprise security monitoring solutions for national network defence. Leading behavioural analytics, multi-tenant access governance, cloud security deployment, and automated incident response, while delivering product demonstrations and technical briefings to client stakeholders.",
    tech: ["Behavioural Analytics", "Cloud Security", "Automated IR", "Threat Intel", "SOAR", "Deployment Automation"],
  },
  {
    year: "2023",
    title: "Independent Penetration Testing",
    description:
      "Executed real-world end-to-end penetration tests, from reconnaissance and vulnerability assessment through to professional reporting and screen-recorded walkthroughs.",
    tech: ["NMAP", "Burp Suite", "Nessus", "OSINT"],
  },
];

const SKILLS = [
  { label: "SIEM Engineering",      pct: 92 },
  { label: "Threat Intelligence",   pct: 85 },
  { label: "Cloud Security",        pct: 80 },
  { label: "Behavioural Analytics", pct: 78 },
  { label: "Penetration Testing",   pct: 70 },
  { label: "AI Security",           pct: 65 },
];

const PROFILE_ROWS = [
  { k: "CLEARANCE", v: "RESEARCH",       highlight: false },
  { k: "STATION",   v: "NCCS · NASTP",   highlight: false },
  { k: "LOCATION",  v: "ISLAMABAD, PK",  highlight: false },
  { k: "STATUS",    v: "ACTIVE",         highlight: true  },
];

// ── Precomputed hex grid (pointy-top, r = 32, 13 cols × 19 rows) ──────────
const HEX_R  = 32;
const HEX_CW = Math.sqrt(3) * HEX_R; // col width ≈ 55.4
const HEX_RH = 1.5 * HEX_R;          // row step  = 48

const HEX_GRID: string[] = Array.from({ length: 13 * 19 }, (_, idx) => {
  const row = Math.floor(idx / 13);
  const col = idx % 13;
  const cx  = col * HEX_CW + (row % 2 === 1 ? HEX_CW / 2 : 0);
  const cy  = row * HEX_RH;
  return Array.from({ length: 6 }, (__, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + HEX_R * Math.cos(a)).toFixed(1)},${(cy + HEX_R * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
});

// ── Sub-components ─────────────────────────────────────────────────────────

function SkillBar({
  label, pct, animate, delay,
}: { label: string; pct: number; animate: boolean; delay: number }) {
  return (
    <div style={{ marginBottom: "11px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "9px", letterSpacing: "0.10em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.50)",
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "9px", color: "rgba(56,165,50,0.80)",
        }}>
          {pct}%
        </span>
      </div>
      <div style={{
        height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{ duration: 1.3, delay, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            height: "100%", borderRadius: "100px",
            background: "linear-gradient(to right, rgba(56,165,50,0.45), #38a532)",
            boxShadow: "0 0 8px rgba(56,165,50,0.55)",
          }}
        />
      </div>
    </div>
  );
}

function OperatorCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100, filter: "blur(16px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ flexShrink: 0, width: "300px", maxWidth: "100%", margin: "0 auto 40px" }}
    >
      <div style={{ position: "relative" }}>
        {/* HUD corner accents */}
        {(["tl", "br"] as const).map((c) => (
          <div key={c} style={{
            position: "absolute",
            top:    c === "tl" ? "-10px" : undefined,
            bottom: c === "br" ? "-10px" : undefined,
            left:   c === "tl" ? "-10px" : undefined,
            right:  c === "br" ? "-10px" : undefined,
            width: "22px", height: "22px",
            borderTop:    c === "tl" ? "2px solid rgba(56,165,50,0.7)" : undefined,
            borderLeft:   c === "tl" ? "2px solid rgba(56,165,50,0.7)" : undefined,
            borderBottom: c === "br" ? "2px solid rgba(56,165,50,0.7)" : undefined,
            borderRight:  c === "br" ? "2px solid rgba(56,165,50,0.7)" : undefined,
            borderRadius: c === "tl" ? "2px 0 0 0" : "0 0 2px 0",
            zIndex: 2,
          }} />
        ))}

        {/* Card body */}
        <div style={{
          background: "rgba(2,8,16,0.88)",
          border: "1px solid rgba(56,165,50,0.14)",
          borderRadius: "14px",
          padding: "26px 22px",
          boxShadow: "0 0 60px rgba(56,165,50,0.07), 0 24px 64px rgba(0,0,0,0.55)",
        }}>

          {/* ── Avatar ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "22px" }}>
            <div style={{ position: "relative", width: "76px", height: "76px", marginBottom: "14px" }}>
              {/* Outer pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.30, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: "-18px", borderRadius: "50%",
                  border: "1px solid rgba(56,165,50,0.28)",
                }}
              />
              {/* Inner pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.08, 0.55] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
                style={{
                  position: "absolute", inset: "-9px", borderRadius: "50%",
                  border: "1px solid rgba(56,165,50,0.42)",
                }}
              />
              {/* Avatar circle */}
              <div style={{
                width: "76px", height: "76px", borderRadius: "50%",
                background: "radial-gradient(circle at 38% 32%, rgba(56,165,50,0.18), rgba(2,8,16,0.96))",
                border: "1.5px solid rgba(56,165,50,0.50)",
                boxShadow: "0 0 28px rgba(56,165,50,0.18), inset 0 0 20px rgba(56,165,50,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "24px", fontWeight: 800, color: "#38a532", letterSpacing: "0.04em",
                }}>
                  AA
                </span>
              </div>
            </div>

            <div style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px", fontWeight: 700, color: "#38a532",
              letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "center",
            }}>
              Aniqa Ayub
            </div>
            <div style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", color: "rgba(255,255,255,0.42)",
              letterSpacing: "0.08em", textAlign: "center", marginTop: "4px",
            }}>
              Cybersecurity Researcher
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(56,165,50,0.10)", marginBottom: "18px" }} />

          {/* ── Profile metadata ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "8px", letterSpacing: "0.20em", color: "rgba(56,165,50,0.55)",
              textTransform: "uppercase", marginBottom: "12px",
            }}>
              Operator Profile
            </div>
            {PROFILE_ROWS.map(({ k, v, highlight }) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "7px",
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "9px", color: "rgba(255,255,255,0.32)", letterSpacing: "0.08em",
                }}>
                  {k}
                </span>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "9px", letterSpacing: "0.06em",
                  color: highlight ? "#38a532" : "rgba(255,255,255,0.68)",
                  fontWeight: highlight ? 700 : 500,
                }}>
                  {highlight && (
                    <span style={{
                      display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
                      backgroundColor: "#38a532",
                      boxShadow: "0 0 6px rgba(56,165,50,0.9)",
                      marginRight: "6px", verticalAlign: "middle",
                    }} />
                  )}
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(56,165,50,0.10)", marginBottom: "18px" }} />

          {/* ── Competency skill bars ── */}
          <div>
            <div style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "8px", letterSpacing: "0.20em", color: "rgba(56,165,50,0.55)",
              textTransform: "uppercase", marginBottom: "14px",
            }}>
              Competency Index
            </div>
            {SKILLS.map((s, i) => (
              <SkillBar
                key={s.label}
                label={s.label}
                pct={s.pct}
                animate={inView}
                delay={0.55 + i * 0.11}
              />
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  item, index, inView,
}: { item: (typeof TIMELINE)[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.18, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ display: "flex", alignItems: "flex-start", gap: "0" }}
    >
      {/* Connector + year badge */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "32px", height: "1px",
          background: "linear-gradient(to right, rgba(56,165,50,0.15), rgba(56,165,50,0.5))",
        }} />
        <div style={{
          width: "60px", height: "60px", borderRadius: "50%",
          background: "rgba(2,8,16,0.9)", border: "1.5px solid rgba(56,165,50,0.45)",
          boxShadow: "0 0 18px rgba(56,165,50,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px",
            fontWeight: 800, color: "#38a532", letterSpacing: "0.04em",
          }}>
            {item.year}
          </span>
        </div>
        <div style={{ width: "20px", height: "1px", background: "rgba(56,165,50,0.35)" }} />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(56,165,50,0.1)" }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          flex: 1,
          background: "rgba(2,8,16,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(56,165,50,0.12)", borderRadius: "12px", padding: "16px 20px",
          willChange: "transform, box-shadow",
        }}
      >
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "6px", lineHeight: 1.35 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.58)", marginBottom: "10px" }}>
          {item.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {item.tech.map((t) => (
            <span key={t} style={{
              padding: "2px 7px", borderRadius: "4px", fontSize: "10px", fontWeight: 500,
              fontFamily: "var(--font-geist-mono), monospace", color: "#38a532",
              backgroundColor: "rgba(56,165,50,0.08)", border: "1px solid rgba(56,165,50,0.15)",
            }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────

export default function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="timeline"
      ref={ref}
      style={{ position: "relative", padding: "80px 0", backgroundColor: "#070709", overflow: "hidden" }}
    >
      {/* ── Hex grid background (right side) ── */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "62%", height: "100%",
        zIndex: 0, overflow: "hidden", pointerEvents: "none",
      }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 740 920"
          preserveAspectRatio="xMidYMid slice"
          style={{ display: "block" }}
        >
          {HEX_GRID.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="rgba(56,165,50,0.09)"
              strokeWidth="0.8"
            />
          ))}
          {/* Radial glow overlay within SVG */}
          <defs>
            <radialGradient id="hex-glow" cx="65%" cy="42%" r="55%">
              <stop offset="0%"   stopColor="rgba(56,165,50,0.07)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="740" height="920" fill="url(#hex-glow)" />
        </svg>

        {/* Fade into left panel */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "55%", height: "100%",
          background: "linear-gradient(to right, #070709 15%, transparent)",
        }} />
        {/* Top/bottom fades */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "22%",
          background: "linear-gradient(to bottom, #070709, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "22%",
          background: "linear-gradient(to top, #070709, transparent)",
        }} />
      </div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0, backgroundColor: "rgba(7,7,9,0.45)", zIndex: 0, pointerEvents: "none",
      }} />

      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none", zIndex: 1 }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(56,165,50,0.06), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

        {/* ── Glassmorphism container ── */}
        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 24px 80px rgba(56,165,50,0.1), 0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(56,165,50,0.08)",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.68) 35%, rgba(3,15,8,0.70) 65%, rgba(2,8,16,0.72) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderRadius: "24px",
            padding: "clamp(20px, 5vw, 48px)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(56,165,50,0.1), inset 0 0 80px rgba(56,165,50,0.03)",
            willChange: "transform, box-shadow",
          }}
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ marginBottom: "16px" }}
          >
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600,
              color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              JOURNEY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15,
              marginBottom: "56px", color: "#FFFFFF",
            }}
          >
            Professional{" "}
            <span style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Timeline
            </span>
          </motion.h2>

          {/* ── Main layout ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>

            {/* ── LEFT: Operator Profile Card ── */}
            <OperatorCard inView={inView} />

            {/* ── RIGHT: Timeline items ── */}
            <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}>
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} inView={inView} />
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
