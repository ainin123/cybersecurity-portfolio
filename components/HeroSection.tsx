"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, GitBranch, AtSign, ChevronDown, Activity, Shield, Cpu, Target } from "lucide-react";

const STATS = [
  { label: "Security Projects", value: "25+", icon: Shield },
  { label: "Security Integrations", value: "5+", icon: Target },
  { label: "ML Model Accuracy", value: "98%", icon: Cpu },
  { label: "AI-Powered DLP Research", value: "Active", icon: Activity },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(14,165,233,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 65%)",
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
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(14,165,233,0.25)",
                backgroundColor: "rgba(14,165,233,0.08)",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#0ea5e9",
                  animation: "pulse-dot 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#0ea5e9",
                  letterSpacing: "0.04em",
                }}
              >
                Available for Security Consulting &amp; Research
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 800,
                lineHeight: 1.0,
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#e2e8f0",
                  fontSize: "clamp(52px, 8vw, 88px)",
                }}
              >
                ANIQA
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(52px, 8vw, 88px)",
                  background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AYUB
              </span>
            </h1>

            {/* Title */}
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#64748b",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Cybersecurity Researcher &nbsp;|&nbsp; SIEM Engineer &nbsp;|&nbsp; AI Security Solutions Developer
            </p>

            {/* Tagline */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#94a3b8",
                maxWidth: "520px",
                marginBottom: "40px",
              }}
            >
              Bridging AI and cybersecurity — building intelligent SIEM systems,
              AI-powered DLP frameworks, and threat intelligence engines that
              detect what traditional tools miss.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1px",
                border: "1px solid rgba(14,165,233,0.15)",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "36px",
                backgroundColor: "rgba(14,165,233,0.08)",
              }}
              className="sm:grid-cols-4"
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "16px 14px",
                    backgroundColor: "rgba(13,20,36,0.8)",
                    textAlign: "center",
                    borderRight:
                      i < STATS.length - 1
                        ? "1px solid rgba(14,165,233,0.1)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "#0ea5e9",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      letterSpacing: "0.06em",
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
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
                  background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(14,165,233,0.3)",
                }}
              >
                <Download size={15} />
                Download Resume
              </motion.a>

              <motion.a
                href="https://github.com/aniqa-ayub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, borderColor: "#0ea5e9" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "8px",
                  border: "1px solid rgba(14,165,233,0.3)",
                  color: "#94a3b8",
                  fontWeight: 500,
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <GitBranch size={15} />
                GitHub
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/aniqa-ayub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, borderColor: "#0ea5e9" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "8px",
                  border: "1px solid rgba(14,165,233,0.3)",
                  color: "#94a3b8",
                  fontWeight: 500,
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <AtSign size={15} />
                LinkedIn
              </motion.a>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.03, borderColor: "#0ea5e9" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "8px",
                  border: "1px solid rgba(14,165,233,0.3)",
                  color: "#94a3b8",
                  fontWeight: 500,
                  fontSize: "14px",
                  background: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <AtSign size={15} />
                Contact Me
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Threat Intelligence Dashboard */}
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
                maxWidth: "420px",
                background: "rgba(13,20,36,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(14,165,233,0.2)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow:
                  "0 0 60px rgba(14,165,233,0.08), 0 24px 48px rgba(0,0,0,0.4)",
              }}
            >
              {/* Dashboard Header */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid rgba(14,165,233,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(14,165,233,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#0ea5e9",
                      animation: "pulse-dot 1.5s ease-in-out infinite",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#0ea5e9",
                      letterSpacing: "0.1em",
                    }}
                  >
                    THREAT INTELLIGENCE DASHBOARD
                  </span>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#ef4444", "#f59e0b", "#0ea5e9"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: c,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div style={{ padding: "16px 18px" }}>
                {[
                  {
                    label: "Threats Detected",
                    value: "1,247",
                    delta: "+12%",
                    color: "#0ea5e9",
                  },
                  {
                    label: "ML Accuracy",
                    value: "98.3%",
                    delta: "↑ 0.4%",
                    color: "#06b6d4",
                  },
                  {
                    label: "False Positives",
                    value: "1.7%",
                    delta: "↓ 62%",
                    color: "#7c3aed",
                  },
                  {
                    label: "SIEM Events/hr",
                    value: "84.2K",
                    delta: "Live",
                    color: "#0ea5e9",
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(14,165,233,0.07)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {metric.label}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          fontFamily: "var(--font-geist-mono), monospace",
                          color: metric.color,
                        }}
                      >
                        {metric.value}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#64748b",
                          backgroundColor: "rgba(14,165,233,0.08)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {metric.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Bar Chart */}
              <div style={{ padding: "4px 18px 16px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
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
                  {[35, 60, 45, 80, 55, 90, 72].map((h, i) => (
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
                            ? "linear-gradient(to top, #0ea5e9, #06b6d4)"
                            : "rgba(14,165,233,0.25)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Status Row */}
              <div
                style={{
                  padding: "12px 18px",
                  borderTop: "1px solid rgba(14,165,233,0.1)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  backgroundColor: "rgba(14,165,233,0.03)",
                }}
              >
                {[
                  { label: "AI Models Active", ok: true },
                  { label: "SIEM Connected", ok: true },
                  { label: "Threat Feeds: 47", ok: true },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#0ea5e9",
                        animation: "pulse-dot 2s ease-in-out infinite",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#64748b",
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {s.label}
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
