"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Eye, Cloud, Target, Activity } from "lucide-react";

const CURRENT_WORK = [
  {
    icon: ShieldCheck,
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.1)",
    title: "AI-Powered DLP",
    description:
      "Finalizing transformer model fine-tuning for production-ready DLP with BERT and RoBERTa on domain-specific security datasets.",
    status: "ACTIVE",
    statusColor: "#38a532",
    statusBg: "rgba(56,165,50,0.12)",
    progress: 75,
  },
  {
    icon: Eye,
    iconColor: "rgba(56,165,50,0.7)",
    iconBg: "rgba(56,165,50,0.08)",
    title: "Explainable AI Security",
    description:
      "Implementing SHAP explainability layers for ML threat detection models to surface interpretable decision rationale for analysts.",
    status: "ACTIVE",
    statusColor: "#38a532",
    statusBg: "rgba(56,165,50,0.12)",
    progress: 60,
  },
  {
    icon: Cloud,
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.08)",
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
    iconColor: "#38a532",
    iconBg: "rgba(56,165,50,0.1)",
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
    iconColor: "rgba(56,165,50,0.5)",
    iconBg: "rgba(56,165,50,0.06)",
    title: "UEBA Research",
    description:
      "Researching User Entity Behavior Analytics models for insider threat detection, focusing on temporal behavioral patterns.",
    status: "PLANNING",
    statusColor: "rgba(255,255,255,0.65)",
    statusBg: "rgba(255,255,255,0.1)",
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
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,165,50,0.03) 0%, transparent 60%)",
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
              color: "#38a532",
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
            color: "#FFFFFF",
          }}
        >
          What I&apos;m{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
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
                background: "rgba(2,8,16,0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(56,165,50,0.12)",
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
                    border: `1px solid rgba(56,165,50,0.2)`,
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
                    border: `1px solid rgba(56,165,50,0.15)`,
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
                  color: "#FFFFFF",
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.65)",
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
                      color: "rgba(255,255,255,0.65)",
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
                    backgroundColor: "rgba(56,165,50,0.08)",
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
                      background: `linear-gradient(to right, #38a532, rgba(56,165,50,0.5))`,
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
