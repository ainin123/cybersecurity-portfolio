"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, BookOpen, Shield, Monitor, Globe, BarChart2 } from "lucide-react";

const COMPLETED = [
  {
    icon: Award,
    name: "NAVTTC Cyber Security Certification (Grade A+)",
    issuer: "National Vocational and Technical Training Commission (NAVTTC)",
    grade: "Grade A+",
    desc: "Government-backed cybersecurity programme under the PM Kamyaab Jawan initiative, covering VAPT, Ethical Hacking, Google Hacking, Code Analysis, and Dynamic and Static Malware Analysis.",
  },
  {
    icon: BookOpen,
    name: "Ethical Hacking Essential (EHE)",
    issuer: "EC-Council / Coursera",
    grade: "Certified",
    desc: "Hands-on certification focused on Network Attacks, Web Application Attacks and Countermeasures, and ethical hacking methodologies.",
  },
];

const IN_PROGRESS = [
  {
    icon: ShieldCheck,
    name: "ISC2 Certified in Cybersecurity (CC)",
    issuer: "ISC2",
    desc: "Globally recognized certification covering Security Principles, Access Control Concepts, Network Security, and Security Operations.",
  },
  {
    icon: Shield,
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    desc: "Advanced ethical hacking certification covering attack phases, threat vectors, and countermeasures aligned with real-world penetration testing.",
  },
  {
    icon: Monitor,
    name: "CompTIA Security+",
    issuer: "CompTIA",
    desc: "Industry-standard certification covering threats, vulnerabilities, architecture, implementation, operations, and compliance.",
  },
  {
    icon: Globe,
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    desc: "Professional programme covering network security, Python automation, Linux, SIEM tools, and incident response workflows.",
  },
  {
    icon: BarChart2,
    name: "CompTIA CySA+ Cybersecurity Analyst",
    issuer: "CompTIA",
    desc: "Advanced analyst certification covering threat and vulnerability management, security operations, and incident response.",
  },
];

function CompletedCard({ cert, index, inView }: { cert: typeof COMPLETED[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, boxShadow: "0 10px 32px rgba(56,165,50,0.12)" }}
      style={{
        background: "rgba(2,8,16,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(56,165,50,0.2)",
        borderRadius: "14px",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "box-shadow 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "16px", bottom: "16px",
        width: "3px", borderRadius: "0 3px 3px 0",
        background: "linear-gradient(to bottom, #38a532, rgba(56,165,50,0.3))",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: "46px", height: "46px", borderRadius: "11px",
          background: "rgba(56,165,50,0.1)",
          border: "1px solid rgba(56,165,50,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <cert.icon size={21} color="#38a532" />
        </div>
        <span style={{
          fontSize: "11px", fontWeight: 700,
          color: "#38a532",
          backgroundColor: "rgba(56,165,50,0.1)",
          border: "1px solid rgba(56,165,50,0.2)",
          borderLeft: "3px solid rgba(56,165,50,0.6)",
          padding: "4px 10px", borderRadius: "3px",
          letterSpacing: "0.05em",
          fontFamily: "var(--font-geist-mono), monospace",
        }}>
          {cert.grade}
        </span>
      </div>

      <div>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px", lineHeight: 1.35 }}>
          {cert.name}
        </h3>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>
          {cert.issuer}
        </p>
      </div>

      <p style={{ fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.6)" }}>
        {cert.desc}
      </p>
    </motion.div>
  );
}

function InProgressCard({ cert, index, inView }: { cert: typeof IN_PROGRESS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: 0.35 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, boxShadow: "0 10px 32px rgba(245,158,11,0.08)" }}
      style={{
        background: "rgba(2,8,16,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(245,158,11,0.15)",
        borderRadius: "14px",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "box-shadow 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "16px", bottom: "16px",
        width: "3px", borderRadius: "0 3px 3px 0",
        background: "linear-gradient(to bottom, #f59e0b, rgba(245,158,11,0.2))",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: "46px", height: "46px", borderRadius: "11px",
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <cert.icon size={21} color="#f59e0b" />
        </div>
        <span style={{
          fontSize: "11px", fontWeight: 700,
          color: "#f59e0b",
          backgroundColor: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderLeft: "3px solid rgba(245,158,11,0.6)",
          padding: "4px 10px", borderRadius: "3px",
          letterSpacing: "0.05em",
          fontFamily: "var(--font-geist-mono), monospace",
        }}>
          In Progress
        </span>
      </div>

      <div>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px", lineHeight: 1.35 }}>
          {cert.name}
        </h3>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>
          {cert.issuer}
        </p>
      </div>

      <p style={{ fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.6)" }}>
        {cert.desc}
      </p>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const visibleInProgress = showAll ? IN_PROGRESS : IN_PROGRESS.slice(0, 4);

  return (
    <section
      id="certifications"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#020810",
      }}
    >
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />

      {/* Subtle glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(56,165,50,0.04), transparent)",
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
            CERTIFICATIONS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, lineHeight: 1.15,
            marginBottom: "60px", color: "#FFFFFF",
          }}
        >
          Certifications &amp;{" "}
          <span style={{
            background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Standards
          </span>
        </motion.h2>

        {/* ── Completed ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "36px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", fontWeight: 700,
              color: "#38a532", letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              Completed
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(56,165,50,0.4), transparent)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 600,
              color: "#38a532",
              backgroundColor: "rgba(56,165,50,0.08)",
              border: "1px solid rgba(56,165,50,0.15)",
              borderLeft: "2px solid rgba(56,165,50,0.5)",
              padding: "2px 8px", borderRadius: "3px",
              fontFamily: "var(--font-geist-mono), monospace",
            }}>
              {COMPLETED.length} Certified
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "18px" }}
          >
            {COMPLETED.map((cert, i) => (
              <CompletedCard key={cert.name} cert={cert} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>

        {/* ── In Progress ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", fontWeight: 700,
              color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              In Progress
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(245,158,11,0.4), transparent)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 600,
              color: "#f59e0b",
              backgroundColor: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.15)",
              borderLeft: "2px solid rgba(245,158,11,0.5)",
              padding: "2px 8px", borderRadius: "3px",
              fontFamily: "var(--font-geist-mono), monospace",
            }}>
              {IN_PROGRESS.length} Pursuing
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "18px" }}
          >
            <AnimatePresence initial={false}>
              {visibleInProgress.map((cert, i) => (
                <InProgressCard key={cert.name} cert={cert} index={i} inView={inView} />
              ))}
            </AnimatePresence>
          </div>

          {/* Animated arrow — show more / show less */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "28px", gap: "6px" }}
          >
            <span style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {showAll ? "Show Less" : `${IN_PROGRESS.length - 4} More`}
            </span>

            <motion.button
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              style={{
                background: "none",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "50%",
                width: "40px", height: "40px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                color: "#f59e0b",
                backgroundColor: "rgba(245,158,11,0.06)",
              }}
            >
              <motion.svg
                width="18" height="18" viewBox="0 0 18 18" fill="none"
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <path d="M4 6.5L9 11.5L14 6.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.button>

            {/* Bouncing dots when collapsed */}
            {!showAll && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", marginTop: "2px" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.7, 0.2], y: [0, 3, 0] }}
                    transition={{ duration: 1.2, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      backgroundColor: "#f59e0b",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
