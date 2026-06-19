"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, BookOpen } from "lucide-react";

const CERTS = [
  {
    icon: Award,
    name: "PM Kamyaab Jawan Program — NAVTTC",
    issuer: "National Vocational & Technical Training Commission",
    status: "Grade A+",
    statusColor: "#38a532",
    statusBg: "rgba(56,165,50,0.1)",
    statusBorder: "rgba(56,165,50,0.2)",
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.1)",
    desc: "Comprehensive cybersecurity certification covering VAPT, Google Hacking, Ethical Hacking, Code Analysis, and Dynamic & Static Malware Analysis.",
  },
  {
    icon: ShieldCheck,
    name: "ISC2 Certified in Cybersecurity — CC",
    issuer: "ISC2",
    status: "In Progress",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.1)",
    statusBorder: "rgba(245,158,11,0.2)",
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.08)",
    desc: "Globally recognized certification covering Security Principles, Access Control Concepts, Network Security, and Security Operations.",
  },
  {
    icon: BookOpen,
    name: "Ethical Hacking Essential — EHE",
    issuer: "Coursera",
    status: "Certified",
    statusColor: "#38a532",
    statusBg: "rgba(56,165,50,0.1)",
    statusBorder: "rgba(56,165,50,0.2)",
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.08)",
    desc: "Hands-on certification focused on Network Attacks, Web Application Attacks & Countermeasures, and ethical hacking methodologies.",
  },
];

export default function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

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
            06 // CERTIFICATIONS
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
            marginBottom: "60px",
            color: "#FFFFFF",
          }}
        >
          Certifications &amp;{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Standards
          </span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "1fr",
          }}
          className="sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -5, boxShadow: "0 8px 32px rgba(56,165,50,0.08)" }}
              style={{
                background: "rgba(2,8,16,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(56,165,50,0.12)",
                borderRadius: "14px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "box-shadow 0.3s ease, transform 0.2s ease",
                cursor: "default",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: cert.iconBg,
                    border: `1px solid rgba(56,165,50,0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <cert.icon size={22} color={cert.iconColor} />
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: cert.statusColor,
                    backgroundColor: cert.statusBg,
                    border: `1px solid ${cert.statusBorder}`,
                    padding: "4px 10px",
                    borderRadius: "100px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {cert.status}
                </span>
              </div>

              {/* Name */}
              <div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "4px",
                  }}
                >
                  {cert.name}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {cert.issuer}
                </p>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

