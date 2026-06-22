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
  },
  {
    year: "2023",
    title: "Independent Penetration Testing",
    description:
      "Executed real-world end-to-end penetration tests — from reconnaissance and vulnerability assessment through to professional reporting and screen-recorded walkthroughs.",
    tech: ["NMAP", "Burp Suite", "Nessus", "OSINT"],
  },
  {
    year: "2022",
    title: "MS Cyber Security — Air University",
    description:
      "Pursuing a Master's specialising in AI-driven cybersecurity. Coursework covers Network Security, Web App Security, Network Forensics, Blockchain Security, and AI in Cyber Security.",
    tech: ["AI Security", "Network Forensics", "Blockchain", "Web App Security"],
  },
  {
    year: "2019",
    title: "NAVTTC Cyber Security Certification — A+",
    description:
      "Completed government-backed cybersecurity programme covering VAPT, Ethical Hacking, Google Hacking, Code Analysis, and Dynamic & Static Malware Analysis with a Grade A+.",
    tech: ["VAPT", "Ethical Hacking", "Static Analysis", "Dynamic Analysis"],
  },
  {
    year: "2015",
    title: "BS Computer Science — Arid Agriculture University",
    description:
      "Built a strong foundation in programming, systems, networking, and database management — the bedrock for current expertise in security tool development and scripting automation.",
    tech: ["Computer Science", "Networking", "Programming", "Linux"],
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
        background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(56,165,50,0.05), transparent)",
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

        {/* ── Main layout ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap" }}>

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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 48px",
            }}
            className="lg:mb-0"
          >
            {/* Outer decorative rings */}
            {[390, 350, 316].map((size, i) => (
              <div key={size} style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                border: `1px solid rgba(56,165,50,${0.07 - i * 0.02})`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                animation: `spin-slow ${20 + i * 7}s linear infinite`,
              }} />
            ))}

            {/* Dashed ring (reverse spin) */}
            <div style={{
              position: "absolute",
              width: "282px", height: "282px",
              borderRadius: "50%",
              border: "1px dashed rgba(56,165,50,0.18)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              animation: "spin-slow 14s linear infinite reverse",
            }} />

            {/* Image circle */}
            <div style={{
              width: "248px", height: "248px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(56,165,50,0.35)",
              boxShadow: "0 0 48px rgba(56,165,50,0.14), 0 0 100px rgba(56,165,50,0.05)",
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

            {/* Pulsing dot */}
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

          {/* ── RIGHT: Timeline items with individual connectors ── */}
          <div
            style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "22px" }}
            className="lg:pl-8"
          >
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.13, ease: [0.25, 0.4, 0.25, 1] }}
                style={{ display: "flex", alignItems: "flex-start", gap: "0" }}
              >
                {/* Connector line + year badge */}
                <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  {/* Horizontal connector line */}
                  <div style={{
                    width: "36px",
                    height: "1px",
                    background: "linear-gradient(to right, rgba(56,165,50,0.15), rgba(56,165,50,0.5))",
                    flexShrink: 0,
                  }} />

                  {/* Year badge circle */}
                  <div style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "50%",
                    background: "rgba(2,8,16,0.9)",
                    border: "1.5px solid rgba(56,165,50,0.45)",
                    boxShadow: "0 0 18px rgba(56,165,50,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}>
                    <span style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#38a532",
                      letterSpacing: "0.04em",
                    }}>
                      {item.year}
                    </span>
                  </div>

                  {/* Short line from badge to card */}
                  <div style={{
                    width: "20px",
                    height: "1px",
                    background: "rgba(56,165,50,0.35)",
                    flexShrink: 0,
                  }} />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(56,165,50,0.1)" }}
                  style={{
                    flex: 1,
                    background: "rgba(2,8,16,0.75)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(56,165,50,0.12)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    transition: "box-shadow 0.3s, border-color 0.3s",
                  }}
                >
                  <h3 style={{
                    fontSize: "15px", fontWeight: 700,
                    color: "#FFFFFF", marginBottom: "6px", lineHeight: 1.35,
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: "12px", lineHeight: 1.65,
                    color: "rgba(255,255,255,0.58)", marginBottom: "10px",
                  }}>
                    {item.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {item.tech.map((t) => (
                      <span key={t} style={{
                        padding: "2px 7px", borderRadius: "4px",
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

      <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
