"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Eye, Cloud, Target, Activity } from "lucide-react";

const CURRENT_WORK = [
  {
    icon: ShieldCheck,
    iconColor: "#0ea5e9",
    iconBg: "rgba(14,165,233,0.1)",
    title: "AI-Powered DLP",
    description:
      "Finalizing transformer model fine-tuning for production-ready DLP with BERT and RoBERTa on domain-specific security datasets.",
    status: "ACTIVE",
    statusColor: "#0ea5e9",
    statusBg: "rgba(14,165,233,0.12)",
    progress: 75,
  },
  {
    icon: Eye,
    iconColor: "#7c3aed",
    iconBg: "rgba(124,58,237,0.1)",
    title: "Explainable AI Security",
    description:
      "Implementing SHAP explainability layers for ML threat detection models to surface interpretable decision rationale for analysts.",
    status: "ACTIVE",
    statusColor: "#0ea5e9",
    statusBg: "rgba(14,165,233,0.12)",
    progress: 60,
  },
  {
    icon: Cloud,
    iconColor: "#06b6d4",
    iconBg: "rgba(6,182,212,0.1)",
    title: "Cloud-Based SIEM",
    description:
      "Architecting cloud-native SIEM infrastructure with auto-scaling threat detection capabilities and containerized deployment.",
    status: "IN PROGRESS",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.1)",
    progress: 40,
  },
  {
    icon: Target,
    iconColor: "#0ea5e9",
    iconBg: "rgba(14,165,233,0.1)",
    title: "Threat Intelligence Automation",
    description:
      "Building an automated IOC enrichment and cross-feed correlation pipeline with deduplication and priority scoring.",
    status: "IN PROGRESS",
    statusColor: "#f59e0b",
    statusBg: "rgba(245,158,11,0.1)",
    progress: 50,
  },
  {
    icon: Activity,
    iconColor: "#7c3aed",
    iconBg: "rgba(124,58,237,0.1)",
    title: "UEBA Research",
    description:
      "Researching User Entity Behavior Analytics models for insider threat detection, focusing on temporal behavioral patterns.",
    status: "PLANNING",
    statusColor: "#64748b",
    statusBg: "rgba(100,116,139,0.1)",
    progress: 20,
  },
];

export default function CurrentWorkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="current-work"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#060b18",
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
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,165,233,0.04) 0%, transparent 60%)",
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
              color: "#0ea5e9",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            07 // CURRENT WORK
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
            marginBottom: "60px",
            color: "#e2e8f0",
          }}
        >
          What I&apos;m{" "}
          <span
            style={{
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Working On
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
          {CURRENT_WORK.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(13,20,36,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(14,165,233,0.15)",
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "box-shadow 0.3s ease",
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
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: item.iconBg,
                    border: `1px solid ${item.iconColor}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <item.icon size={20} color={item.iconColor} />
                </div>

                {/* Status with pulsing dot */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    backgroundColor: item.statusBg,
                    border: `1px solid ${item.statusColor}25`,
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: item.statusColor,
                      animation:
                        item.status === "ACTIVE"
                          ? "pulse-dot 1.5s ease-in-out infinite"
                          : "none",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: item.statusColor,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#94a3b8",
                  flex: 1,
                }}
              >
                {item.description}
              </p>

              {/* Progress bar */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Progress
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: item.iconColor,
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {item.progress}%
                  </span>
                </div>
                <div
                  style={{
                    height: "4px",
                    backgroundColor: "rgba(14,165,233,0.1)",
                    borderRadius: "100px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.progress}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      borderRadius: "100px",
                      background: `linear-gradient(to right, ${item.iconColor}, ${item.iconColor}aa)`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
