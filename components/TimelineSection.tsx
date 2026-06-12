"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE = [
  {
    period: "2024 — Present",
    title: "AI-Powered DLP Research",
    description:
      "Began deep research into transformer-based DLP frameworks using BERT and RoBERTa models. Achieved 98% classification accuracy on sensitive document categorization, outperforming traditional regex-based approaches.",
    tech: ["BERT", "RoBERTa", "TensorFlow", "DLP", "NLP"],
    color: "#00E5FF",
  },
  {
    period: "2024",
    title: "Threat Intelligence Integration",
    description:
      "Built automated threat intel pipelines integrating MISP, VirusTotal, and custom YARA rules. Developed enrichment workflows that correlate IOCs across multiple feed sources for comprehensive threat coverage.",
    tech: ["MISP", "VirusTotal", "YARA", "Python", "Redis"],
    color: "rgba(0,229,255,0.7)",
  },
  {
    period: "2023 — 2024",
    title: "AI-Enhanced SIEM Development",
    description:
      "Deployed Wazuh with ML-powered alert scoring and anomaly detection, reducing false positives significantly. Developed custom decoders, rules, and a behavioral baseline system for user entity analytics.",
    tech: ["Wazuh", "Suricata", "SIGMA", "ML", "ELK"],
    color: "rgba(0,229,255,0.5)",
  },
  {
    period: "2023",
    title: "Cloud Security Research",
    description:
      "Explored cloud-native security architectures, container security with Docker, and SOAR automation workflows. Investigated zero-trust network models and their application to hybrid cloud environments.",
    tech: ["Docker", "Cloud Security", "SOAR", "Zero Trust", "CI/CD"],
    color: "#00E5FF",
  },
  {
    period: "2022 — Present",
    title: "Advanced AI Security Research",
    description:
      "Pursuing explainable AI for cybersecurity, UEBA (User Entity Behavior Analytics) research, and advanced ML security models. Focus on making AI-driven security decisions interpretable and trustworthy for analysts.",
    tech: ["XAI", "SHAP", "LIME", "UEBA", "Security ML"],
    color: "rgba(0,229,255,0.7)",
  },
];

export default function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="timeline"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#0A192F",
      }}
    >
      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none",
        }}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "16px" }}
        >
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
            05 // JOURNEY
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "70px",
            color: "#CCD6F6",
          }}
        >
          Professional{" "}
          <span
            style={{
              background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Timeline
          </span>
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Center vertical line (desktop) */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(0,229,255,0.3) 10%, rgba(0,229,255,0.3) 90%, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Left line (mobile) */}
          <div
            className="lg:hidden"
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(0,229,255,0.3) 10%, rgba(0,229,255,0.3) 90%, transparent)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                  style={{
                    position: "relative",
                    paddingLeft: "48px",
                  }}
                  className="lg:pl-0"
                >
                  {/* Mobile dot */}
                  <div
                    className="lg:hidden"
                    style={{
                      position: "absolute",
                      left: "13px",
                      top: "24px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: item.color,
                      border: "2px solid #0A192F",
                      boxShadow: `0 0 12px ${item.color}60`,
                    }}
                  />

                  {/* Desktop layout: alternating */}
                  <div
                    className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
                    style={{
                      display: "none",
                    }}
                  />

                  {/* Unified card (works for both) */}
                  <div
                    className="lg:grid lg:gap-8 lg:items-center"
                    style={{
                      display: "grid",
                      gap: "0",
                    }}
                  >
                    {/* Desktop: alternate side */}
                    <div
                      className="hidden lg:block"
                      style={{
                        position: "relative",
                        gridColumn: isLeft ? "1" : "2",
                        gridRow: "1",
                      }}
                    >
                      {/* Dot on center line */}
                      <div
                        style={{
                          position: "absolute",
                          top: "24px",
                          [isLeft ? "right" : "left"]: "-28px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: item.color,
                          border: "3px solid #0A192F",
                          boxShadow: `0 0 16px ${item.color}50`,
                          transform: "translateX(50%)",
                          zIndex: 2,
                        }}
                      />
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="lg:col-span-1"
                      style={{
                        background: "rgba(17,34,64,0.7)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: `1px solid rgba(0,229,255,0.12)`,
                        borderRadius: "14px",
                        padding: "24px",
                        transition: "box-shadow 0.3s ease",
                      }}
                    >
                      {/* Year badge */}
                      <div
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "100px",
                          backgroundColor: `rgba(0,229,255,0.1)`,
                          border: `1px solid rgba(0,229,255,0.2)`,
                          fontSize: "11px",
                          fontWeight: 600,
                          fontFamily: "var(--font-geist-mono), monospace",
                          color: item.color,
                          marginBottom: "12px",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.period}
                      </div>

                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#CCD6F6",
                          marginBottom: "10px",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.7,
                          color: "#8892B0",
                          marginBottom: "16px",
                        }}
                      >
                        {item.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: "3px 8px",
                              borderRadius: "5px",
                              fontSize: "10px",
                              fontWeight: 500,
                              fontFamily: "var(--font-geist-mono), monospace",
                              color: item.color,
                              backgroundColor: `rgba(0,229,255,0.08)`,
                              border: `1px solid rgba(0,229,255,0.15)`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
