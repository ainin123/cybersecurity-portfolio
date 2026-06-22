"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE = [
  {
    year: "2024",
    title: "Research Associate — NCCS, NASTP",
    description:
      "Developing and deploying enterprise SIEM solutions for national network defence. Integrating threat intelligence, automating critical data protection workflows, and facilitating seamless SOAR integration.",
    tech: ["Wazuh", "ElasticStack", "SOAR", "Threat Intel"],
    color: "#38a532",
  },
  {
    year: "2023",
    title: "Independent Penetration Testing",
    description:
      "Executed real-world end-to-end penetration tests — from reconnaissance and vulnerability assessment through to professional reporting and screen-recorded walkthroughs.",
    tech: ["NMAP", "Burp Suite", "Nessus", "OSINT"],
    color: "#38a532",
  },
  {
    year: "2022",
    title: "MS Cyber Security — Air University",
    description:
      "Pursuing a Master's specialising in AI-driven cybersecurity. Coursework covers Network Security, Web App Security, Network Forensics, Blockchain Security, and AI in Cyber Security as major.",
    tech: ["AI Security", "Network Forensics", "Blockchain", "Web App Security"],
    color: "#38a532",
  },
  {
    year: "2019",
    title: "NAVTTC Cyber Security Certification — A+",
    description:
      "Completed government-backed cybersecurity programme covering VAPT, Ethical Hacking, Google Hacking, Code Analysis, and Dynamic & Static Malware Analysis with a Grade A+.",
    tech: ["VAPT", "Ethical Hacking", "Static Analysis", "Dynamic Analysis"],
    color: "#38a532",
  },
  {
    year: "2015",
    title: "BS Computer Science — Arid Agriculture University",
    description:
      "Built a strong foundation in programming, systems, networking, and database management — the bedrock for current expertise in security tool development and scripting automation.",
    tech: ["Computer Science", "Networking", "Programming", "Linux"],
    color: "#38a532",
  },
];

export default function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="timeline"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#020810",
        overflow: "hidden",
      }}
    >
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(56,165,50,0.04), transparent)",
      }} />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "16px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px", fontWeight: 600,
            color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            05 // JOURNEY
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, lineHeight: 1.15,
            marginBottom: "72px", color: "#FFFFFF",
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

        {/* ── Main layout: Circle + Items ── */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0",
          flexDirection: "column",
        }}
          className="lg:flex-row lg:items-center lg:gap-0"
        >
          {/* ── LEFT: Circle ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              position: "relative",
              flexShrink: 0,
              width: "300px",
              height: "300px",
              margin: "0 auto 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="lg:mb-0 lg:mr-[-24px]"
          >
            {/* Outermost decorative rings */}
            {[380, 340, 310].map((size, i) => (
              <div key={size} style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                border: `1px solid rgba(56,165,50,${0.08 - i * 0.02})`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                animation: `spin-slow ${18 + i * 6}s linear infinite`,
              }} />
            ))}

            {/* Dashed ring */}
            <div style={{
              position: "absolute",
              width: "280px", height: "280px",
              borderRadius: "50%",
              border: "1px dashed rgba(56,165,50,0.2)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              animation: "spin-slow 12s linear infinite reverse",
            }} />

            {/* Image circle */}
            <div style={{
              width: "240px", height: "240px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(56,165,50,0.4)",
              boxShadow: "0 0 40px rgba(56,165,50,0.15), 0 0 80px rgba(56,165,50,0.06)",
              background: "#0a1628",
              position: "relative",
              zIndex: 2,
            }}>
              <img
                src="/cybersecurityanalyst.png"
                alt="Cybersecurity Analyst"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>

            {/* Scanning dot */}
            <div style={{
              position: "absolute",
              width: "10px", height: "10px",
              borderRadius: "50%",
              background: "#38a532",
              boxShadow: "0 0 14px #38a532",
              top: "10px", left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              animation: "pulse-dot 2s ease-in-out infinite",
            }} />
          </motion.div>

          {/* ── RIGHT: Timeline items ── */}
          <div style={{
            flex: 1,
            position: "relative",
            paddingLeft: "0",
          }}
            className="lg:pl-16"
          >
            {/* Vertical connector line (desktop) */}
            <div
              className="hidden lg:block"
              style={{
                position: "absolute",
                left: "48px",
                top: "24px",
                bottom: "24px",
                width: "1px",
                background: "linear-gradient(to bottom, transparent, rgba(56,165,50,0.35) 10%, rgba(56,165,50,0.35) 90%, transparent)",
              }}
            />

            {/* Mobile vertical line */}
            <div
              className="lg:hidden"
              style={{
                position: "absolute",
                left: "20px",
                top: "0", bottom: "0",
                width: "1px",
                background: "linear-gradient(to bottom, transparent, rgba(56,165,50,0.3) 10%, rgba(56,165,50,0.3) 90%, transparent)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                  animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{ position: "relative", paddingLeft: "48px" }}
                  className="lg:pl-20"
                >
                  {/* Mobile dot */}
                  <div className="lg:hidden" style={{
                    position: "absolute",
                    left: "13px", top: "18px",
                    width: "14px", height: "14px",
                    borderRadius: "50%",
                    background: item.color,
                    border: "2px solid #020810",
                    boxShadow: `0 0 12px ${item.color}60`,
                  }} />

                  {/* Desktop connector: dot on line + horizontal bar to card */}
                  <div className="hidden lg:block">
                    {/* Dot on vertical line */}
                    <div style={{
                      position: "absolute",
                      left: "40px", top: "20px",
                      width: "16px", height: "16px",
                      borderRadius: "50%",
                      background: item.color,
                      border: "3px solid #020810",
                      boxShadow: `0 0 16px ${item.color}60`,
                      zIndex: 2,
                    }} />
                    {/* Horizontal connector to card */}
                    <div style={{
                      position: "absolute",
                      left: "55px", top: "27px",
                      width: "24px", height: "1px",
                      background: `rgba(56,165,50,0.4)`,
                    }} />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(56,165,50,0.1)" }}
                    style={{
                      background: "rgba(2,8,16,0.75)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(56,165,50,0.12)",
                      borderRadius: "14px",
                      padding: "22px 24px",
                      transition: "box-shadow 0.3s, border-color 0.3s",
                    }}
                  >
                    {/* Year badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      marginBottom: "12px",
                    }}>
                      <span style={{
                        display: "inline-block",
                        padding: "4px 14px",
                        borderRadius: "100px",
                        backgroundColor: "rgba(56,165,50,0.1)",
                        border: "1px solid rgba(56,165,50,0.3)",
                        fontSize: "13px", fontWeight: 800,
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "#38a532",
                        letterSpacing: "0.08em",
                      }}>
                        {item.year}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: "16px", fontWeight: 700,
                      color: "#FFFFFF", marginBottom: "8px", lineHeight: 1.35,
                    }}>
                      {item.title}
                    </h3>

                    <p style={{
                      fontSize: "13px", lineHeight: 1.7,
                      color: "rgba(255,255,255,0.62)", marginBottom: "14px",
                    }}>
                      {item.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {item.tech.map((t) => (
                        <span key={t} style={{
                          padding: "2px 8px", borderRadius: "5px",
                          fontSize: "10px", fontWeight: 500,
                          fontFamily: "var(--font-geist-mono), monospace",
                          color: "#38a532",
                          backgroundColor: "rgba(56,165,50,0.08)",
                          border: "1px solid rgba(56,165,50,0.15)",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
