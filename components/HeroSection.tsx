"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ChevronDown, AtSign, Shield, Activity, Target, Cpu, BookOpen } from "lucide-react";

const METRICS = [
  { label: "Threats Monitored", value: 10000, suffix: "+", display: "10,000+" },
  { label: "Security Labs", value: 50, suffix: "+", display: "50+" },
  { label: "CTF Challenges", value: 25, suffix: "+", display: "25+" },
  { label: "Projects Delivered", value: 25, suffix: "+", display: "25+" },
  { label: "Research Publications", value: 3, suffix: "+", display: "3+" },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  const display = target >= 1000
    ? count >= 1000 ? `${(count / 1000).toFixed(0)},${String(count % 1000).padStart(3, "0")}` : count.toLocaleString()
    : count;

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const barData = [35, 60, 45, 80, 55, 90, 72];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background grid overlay */}
      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,229,255,0.06) 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 24px 60px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Platform label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "4px",
                border: "1px solid rgba(0,229,255,0.25)",
                backgroundColor: "rgba(0,229,255,0.06)",
                marginBottom: "28px",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#00E5FF",
                  animation: "pulse-dot 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#00E5FF",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                [ THREAT INTELLIGENCE PLATFORM ]
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 800,
                lineHeight: 1.0,
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#CCD6F6",
                  fontSize: "clamp(52px, 8vw, 88px)",
                }}
              >
                ANIQA
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(52px, 8vw, 88px)",
                  background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AYUB
              </span>
            </h1>

            {/* Role badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {["Cybersecurity Researcher", "SIEM Engineer", "AI Security"].map((role) => (
                <span
                  key={role}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "100px",
                    border: "1px solid rgba(0,229,255,0.2)",
                    backgroundColor: "rgba(0,229,255,0.06)",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#8892B0",
                    fontFamily: "var(--font-geist-mono), monospace",
                    letterSpacing: "0.04em",
                  }}
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#8892B0",
                maxWidth: "520px",
                marginBottom: "28px",
              }}
            >
              Building enterprise-grade security systems that detect what traditional tools miss.
            </p>

            {/* Live status bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "36px",
                padding: "8px 14px",
                borderRadius: "6px",
                backgroundColor: "rgba(0,229,255,0.04)",
                border: "1px solid rgba(0,229,255,0.12)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#00E5FF",
                  animation: "pulse-dot 1.5s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#00E5FF",
                  letterSpacing: "0.1em",
                }}
              >
                STATUS: MONITORING GLOBAL THREAT LANDSCAPE
              </span>
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.7))",
                  color: "#0A192F",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(0,229,255,0.25)",
                }}
              >
                <Download size={15} />
                Download Resume
              </motion.a>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,229,255,0.4)",
                  color: "#00E5FF",
                  fontWeight: 600,
                  fontSize: "14px",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <AtSign size={15} />
                Contact Me
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Security Overview Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{
                width: "100%",
                maxWidth: "440px",
                background: "rgba(17,34,64,0.8)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(0,229,255,0.2)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 0 60px rgba(0,229,255,0.08), 0 24px 48px rgba(0,0,0,0.4)",
              }}
            >
              {/* Dashboard Header */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid rgba(0,229,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(0,229,255,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#00E5FF",
                      animation: "pulse-dot 1.5s ease-in-out infinite",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#00E5FF",
                      letterSpacing: "0.1em",
                    }}
                  >
                    SECURITY OVERVIEW
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#00E5FF",
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#00E5FF",
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.08em",
                    }}
                  >
                    LIVE
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div
                style={{
                  padding: "20px 18px 16px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {METRICS.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      padding: "14px 12px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(0,229,255,0.04)",
                      border: "1px solid rgba(0,229,255,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#00E5FF",
                        marginBottom: "4px",
                        lineHeight: 1,
                      }}
                    >
                      <CountUp target={metric.value} suffix={metric.suffix} />
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#8892B0",
                        letterSpacing: "0.06em",
                        lineHeight: 1.3,
                      }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5th metric full width */}
              <div style={{ padding: "0 18px 16px" }}>
                <div
                  style={{
                    padding: "14px 12px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0,229,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.1)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "#00E5FF",
                      marginBottom: "4px",
                      lineHeight: 1,
                    }}
                  >
                    <CountUp target={METRICS[4].value} suffix={METRICS[4].suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#8892B0",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {METRICS[4].label}
                  </div>
                </div>
              </div>

              {/* Mini Bar Chart */}
              <div style={{ padding: "4px 18px 16px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#8892B0",
                    fontFamily: "var(--font-geist-mono), monospace",
                    marginBottom: "8px",
                    letterSpacing: "0.08em",
                  }}
                >
                  THREAT ACTIVITY — LAST 7 DAYS
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    height: "48px",
                  }}
                >
                  {barData.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      style={{
                        flex: 1,
                        borderRadius: "3px 3px 0 0",
                        background:
                          i === 5
                            ? "linear-gradient(to top, #00E5FF, rgba(0,229,255,0.5))"
                            : "rgba(0,229,255,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Status Row */}
              <div
                style={{
                  padding: "12px 18px",
                  borderTop: "1px solid rgba(0,229,255,0.1)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  backgroundColor: "rgba(0,229,255,0.03)",
                }}
              >
                {[
                  "AI Models Active",
                  "SIEM Connected",
                  "Threat Feeds: 47",
                ].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#00E5FF",
                        animation: "pulse-dot 2s ease-in-out infinite",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#8892B0",
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#475569",
              letterSpacing: "0.08em",
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={16} color="#475569" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
