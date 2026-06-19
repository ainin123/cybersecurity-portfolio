"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE = [
  {
    period: "02/2024 — Present",
    title: "Research Associate — NCCS, NASTP",
    description:
      "Developing and deploying enterprise-grade SIEM solutions for network defence at the National Centre for Cyber Security. Enhancing SIEM capabilities through threat intelligence integration, cloud environment deployments, and automating critical data protection workflows. Facilitating seamless SOAR and SIEM integration for national-level infrastructure.",
    tech: ["Wazuh", "ElasticStack", "SOAR", "Threat Intel", "Automation"],
    color: "#38a532",
  },
  {
    period: "08/2023 — Present",
    title: "Independent Penetration Testing Projects",
    description:
      "Sourced real-world penetration testing opportunities within professional networks. Executed end-to-end penetration tests — from reconnaissance and vulnerability assessment to detailed reporting. Produced screen-recorded walkthroughs mirroring professional pentest deliverables. Strengthened expertise in ethical hacking, vulnerability analysis, and secure system design.",
    tech: ["NMAP", "Burp Suite", "Wireshark", "OSINT", "Report Writing"],
    color: "rgba(56,165,50,0.7)",
  },
  {
    period: "2022 — 2025",
    title: "MS Cyber Security — Air University, Islamabad",
    description:
      "Pursuing a Master's in Cyber Security with AI as a major specialization. Coursework covers Network Security (labs & theory), Data Security, Software Security, Blockchain Security, Vulnerability Assessment & Reverse Engineering, Web Application Security, Network Forensics, and Cyber Security Using AI.",
    tech: ["Network Security", "AI in CyberSec", "Web App Security", "Forensics", "Blockchain"],
    color: "rgba(56,165,50,0.5)",
  },
  {
    period: "2015 — 2019",
    title: "BS Computer Science — Arid Agriculture University, Rawalpindi",
    description:
      "Completed a Bachelor's in Computer Science, building a strong foundation in programming, systems, networks, and database management. This academic background directly supports current expertise in scripting, automation, and security tool development.",
    tech: ["Computer Science", "Networking", "Programming", "Databases", "Linux"],
    color: "#38a532",
  },
  {
    period: "Ongoing",
    title: "Certifications & Continuous Learning",
    description:
      "Actively pursuing ISC2 Certified in Cybersecurity (CC). Completed NAVTTC Cyber Security Certification (A+) covering VAPT, ethical hacking, and malware analysis, and the Ethical Hacking Essential (EHE) certification via Coursera focused on network and web application attack countermeasures.",
    tech: ["ISC2 CC", "NAVTTC", "EHE Coursera", "VAPT", "Ethical Hacking"],
    color: "rgba(56,165,50,0.7)",
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
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#38a532",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            05 // JOURNEY
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "70px",
            color: "#FFFFFF",
          }}
        >
          Professional{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
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
                "linear-gradient(to bottom, transparent, rgba(56,165,50,0.3) 10%, rgba(56,165,50,0.3) 90%, transparent)",
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
                "linear-gradient(to bottom, transparent, rgba(56,165,50,0.3) 10%, rgba(56,165,50,0.3) 90%, transparent)",
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
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, filter: "blur(8px)" }}
                  animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
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
                        background: "rgba(2,8,16,0.7)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: `1px solid rgba(56,165,50,0.12)`,
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
                          backgroundColor: `rgba(56,165,50,0.1)`,
                          border: `1px solid rgba(56,165,50,0.2)`,
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
                          color: "#FFFFFF",
                          marginBottom: "10px",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.65)",
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
                              backgroundColor: `rgba(56,165,50,0.08)`,
                              border: `1px solid rgba(56,165,50,0.15)`,
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

