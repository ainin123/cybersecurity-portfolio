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

function TimelineItem({
  item,
  index,
  inView,
}: {
  item: (typeof TIMELINE)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.18,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{ display: "flex", alignItems: "flex-start", gap: "0" }}
    >
      {/* Connector line + year badge */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "32px",
          height: "1px",
          background: "linear-gradient(to right, rgba(56,165,50,0.15), rgba(56,165,50,0.5))",
        }} />

        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(2,8,16,0.9)",
          border: "1.5px solid rgba(56,165,50,0.45)",
          boxShadow: "0 0 18px rgba(56,165,50,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
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

        <div style={{
          width: "20px",
          height: "1px",
          background: "rgba(56,165,50,0.35)",
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
  );
}

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

      {/* Radial glow behind the photo */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(56,165,50,0.06), transparent)",
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

        {/* ── Main layout: photo left, items right ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
          flexWrap: "wrap",
        }}>

          {/* ── LEFT: Photo — slides in from left edge ── */}
          <motion.div
            initial={{ opacity: 0, x: -120, filter: "blur(16px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              flexShrink: 0,
              width: "340px",
              margin: "0 auto 40px",
            }}
            className="lg:mb-0"
          >
            {/* Green border accent line on left */}
            <div style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}>
              {/* Top-left corner accent */}
              <div style={{
                position: "absolute",
                top: "-8px", left: "-8px",
                width: "32px", height: "32px",
                borderTop: "2px solid #38a532",
                borderLeft: "2px solid #38a532",
                borderRadius: "2px",
                zIndex: 2,
              }} />
              {/* Bottom-right corner accent */}
              <div style={{
                position: "absolute",
                bottom: "-8px", right: "-8px",
                width: "32px", height: "32px",
                borderBottom: "2px solid #38a532",
                borderRight: "2px solid #38a532",
                borderRadius: "2px",
                zIndex: 2,
              }} />

              {/* Photo */}
              <div style={{
                width: "340px",
                height: "420px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 0 60px rgba(56,165,50,0.12), 0 20px 60px rgba(0,0,0,0.5)",
                border: "1px solid rgba(56,165,50,0.2)",
                position: "relative",
              }}>
                <img
                  src="/mypic.png"
                  alt="Aniqa Ayub"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
                {/* Bottom gradient fade */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "40%",
                  background: "linear-gradient(to top, #020810 0%, transparent 100%)",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Name label below photo */}
              <div style={{
                marginTop: "14px",
                textAlign: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#38a532",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}>
                  Aniqa Ayub
                </span>
                <div style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  marginTop: "3px",
                  letterSpacing: "0.08em",
                }}>
                  Network Security Analyst
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Timeline items — appear one by one ── */}
          <div style={{
            flex: 1,
            minWidth: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} inView={inView} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
