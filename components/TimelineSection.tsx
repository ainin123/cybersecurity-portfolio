"use client";

import { useRef, useEffect, useState } from "react";
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
  { short: "SIEM Eng",     pct: 92 },
  { short: "Threat Intel", pct: 85 },
  { short: "Cloud Sec",    pct: 80 },
  { short: "Behav Anal",   pct: 78 },
  { short: "Pen Testing",  pct: 70 },
  { short: "AI Security",  pct: 65 },
];

const WHOAMI_ROWS = [
  { k: "Name",     v: "Aniqa Ayub",        hi: false },
  { k: "Role",     v: "Research Associate", hi: false },
  { k: "Org",      v: "NCCS · NASTP",       hi: false },
  { k: "Location", v: "Islamabad, PK",      hi: false },
  { k: "Status",   v: "ACTIVE",             hi: true  },
];

// ── Precomputed hex grid (pointy-top, r = 32, 13 cols × 19 rows) ──────────
const HEX_R  = 32;
const HEX_CW = Math.sqrt(3) * HEX_R;
const HEX_RH = 1.5 * HEX_R;

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

function makeBar(pct: number, width = 16): string {
  const n = Math.round((pct / 100) * width);
  return "█".repeat(n) + "░".repeat(width - n);
}

// ── Terminal card ──────────────────────────────────────────────────────────

function TerminalCard({ inView }: { inView: boolean }) {
  const [cmd1, setCmd1]               = useState("");
  const [showOutput1, setShowOutput1] = useState(false);
  const [showPrompt2, setShowPrompt2] = useState(false);
  const [cmd2, setCmd2]               = useState("");
  const [shownSkills, setShownSkills] = useState(0);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  const [cursorOn, setCursorOn]       = useState(true);

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  // typing animation sequence
  useEffect(() => {
    if (!inView) {
      setCmd1(""); setShowOutput1(false); setShowPrompt2(false);
      setCmd2(""); setShownSkills(0); setShowFinalPrompt(false);
      return;
    }

    const ids: ReturnType<typeof setTimeout>[] = [];
    const q = (fn: () => void, ms: number) => { ids.push(setTimeout(fn, ms)); };

    const C1 = "whoami";
    const C2 = "./skills.sh";
    let t = 450;

    for (let i = 1; i <= C1.length; i++) {
      const s = C1.slice(0, i);
      q(() => setCmd1(s), t);
      t += 65;
    }
    t += 380;
    q(() => setShowOutput1(true), t);
    t += 900;
    q(() => setShowPrompt2(true), t);
    t += 220;
    for (let i = 1; i <= C2.length; i++) {
      const s = C2.slice(0, i);
      q(() => setCmd2(s), t);
      t += 60;
    }
    t += 380;
    for (let i = 1; i <= SKILLS.length; i++) {
      const n = i;
      q(() => setShownSkills(n), t);
      t += 210;
    }
    t += 340;
    q(() => setShowFinalPrompt(true), t);

    return () => ids.forEach(clearTimeout);
  }, [inView]);

  const Prompt = () => (
    <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px" }}>
      <span style={{ color: "rgba(56,165,50,0.80)" }}>aniqa</span>
      <span style={{ color: "rgba(255,255,255,0.30)" }}>@</span>
      <span style={{ color: "rgba(56,165,50,0.65)" }}>nccs</span>
      <span style={{ color: "rgba(255,255,255,0.30)" }}>:~$</span>
      <span style={{ color: "rgba(255,255,255,0.20)" }}>{" "}</span>
    </span>
  );

  const Cursor = () => (
    <span style={{ color: "#38a532", opacity: cursorOn ? 1 : 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px" }}>█</span>
  );

  const SEP = "─".repeat(34);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, filter: "blur(16px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ flexShrink: 0, width: "340px", maxWidth: "100%", margin: "0 auto 40px" }}
    >
      {/* Window chrome */}
      <div style={{
        background: "#080e08",
        border: "1px solid rgba(56,165,50,0.18)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(56,165,50,0.07), 0 24px 64px rgba(0,0,0,0.65)",
      }}>
        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "7px",
          padding: "11px 14px",
          background: "rgba(56,165,50,0.04)",
          borderBottom: "1px solid rgba(56,165,50,0.10)",
        }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
            <div key={i} style={{
              width: "11px", height: "11px", borderRadius: "50%",
              backgroundColor: c, opacity: 0.75,
            }} />
          ))}
          <span style={{
            flex: 1, textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "10px", color: "rgba(255,255,255,0.26)", letterSpacing: "0.08em",
          }}>
            bash — aniqa@nccs:~
          </span>
        </div>

        {/* Body */}
        <div style={{
          padding: "18px 16px 22px",
          minHeight: "390px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "12px",
          lineHeight: 1.75,
        }}>

          {/* ── Command 1: whoami ── */}
          <div>
            <Prompt />
            <span style={{ color: "#e8e8e8" }}>{cmd1}</span>
            {!showOutput1 && <Cursor />}
          </div>

          {showOutput1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ marginTop: "4px", marginBottom: "12px", paddingLeft: "1px" }}>
                <div style={{ color: "rgba(56,165,50,0.28)", marginBottom: "5px", letterSpacing: "0" }}>{SEP}</div>
                {WHOAMI_ROWS.map(({ k, v, hi }) => (
                  <div key={k} style={{ display: "flex", gap: "6px", lineHeight: 1.7 }}>
                    <span style={{ color: "rgba(255,255,255,0.32)", minWidth: "62px" }}>{k}</span>
                    <span style={{ color: "rgba(56,165,50,0.35)" }}>›</span>
                    <span style={{
                      color: hi ? "#38a532" : "rgba(255,255,255,0.75)",
                      fontWeight: hi ? 700 : 400,
                      display: "flex", alignItems: "center", gap: "5px",
                    }}>
                      {hi && (
                        <span style={{
                          display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
                          backgroundColor: "#38a532", boxShadow: "0 0 7px rgba(56,165,50,0.9)",
                          flexShrink: 0,
                        }} />
                      )}
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Command 2: ./skills.sh ── */}
              {showPrompt2 && (
                <>
                  <div>
                    <Prompt />
                    <span style={{ color: "#e8e8e8" }}>{cmd2}</span>
                    {shownSkills === 0 && <Cursor />}
                  </div>

                  {shownSkills > 0 && (
                    <div style={{ marginTop: "4px", paddingLeft: "1px" }}>
                      <div style={{ color: "rgba(56,165,50,0.28)", marginBottom: "5px" }}>{SEP}</div>
                      {SKILLS.slice(0, shownSkills).map((s) => (
                        <motion.div
                          key={s.short}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}
                        >
                          <span style={{
                            color: "rgba(255,255,255,0.42)", fontSize: "11px",
                            minWidth: "82px", letterSpacing: "0.01em",
                          }}>
                            {s.short}
                          </span>
                          <span style={{
                            color: "#38a532", fontSize: "11px",
                            letterSpacing: "1.5px",
                            textShadow: "0 0 8px rgba(56,165,50,0.6)",
                          }}>
                            {makeBar(s.pct)}
                          </span>
                          <span style={{ color: "rgba(56,165,50,0.60)", fontSize: "10px" }}>
                            {s.pct}%
                          </span>
                        </motion.div>
                      ))}

                      {showFinalPrompt && (
                        <div style={{ marginTop: "10px" }}>
                          <Prompt />
                          <Cursor />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

        </div>
      </div>

      <div style={{ marginTop: "12px", textAlign: "center" }}>
        <span style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "9px", color: "rgba(56,165,50,0.38)", letterSpacing: "0.16em", textTransform: "uppercase",
        }}>
          terminal · nccs secure session
        </span>
      </div>
    </motion.div>
  );
}

// ── Timeline item ──────────────────────────────────────────────────────────

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
      {/* ── Hex grid background ── */}
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
            <polygon key={i} points={pts} fill="none" stroke="rgba(56,165,50,0.09)" strokeWidth="0.8" />
          ))}
          <defs>
            <radialGradient id="hex-glow" cx="65%" cy="42%" r="55%">
              <stop offset="0%"   stopColor="rgba(56,165,50,0.07)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="740" height="920" fill="url(#hex-glow)" />
        </svg>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "55%", height: "100%",
          background: "linear-gradient(to right, #070709 15%, transparent)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "22%",
          background: "linear-gradient(to bottom, #070709, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "22%",
          background: "linear-gradient(to top, #070709, transparent)",
        }} />
      </div>

      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(7,7,9,0.45)", zIndex: 0, pointerEvents: "none" }} />
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none", zIndex: 1 }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(56,165,50,0.06), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 24px 80px rgba(56,165,50,0.1), 0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(56,165,50,0.08)",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.68) 35%, rgba(3,15,8,0.70) 65%, rgba(2,8,16,0.72) 100%)",
            backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
            borderRadius: "24px",
            padding: "clamp(20px, 5vw, 48px)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(56,165,50,0.1), inset 0 0 80px rgba(56,165,50,0.03)",
            willChange: "transform, box-shadow",
          }}
        >
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

          <div style={{ display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>

            {/* ── LEFT: Animated terminal ── */}
            <TerminalCard inView={inView} />

            {/* ── RIGHT: Timeline entries ── */}
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
