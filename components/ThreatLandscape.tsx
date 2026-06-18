"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TABS = ["CVEs", "Malware Campaigns", "Threat Actors", "Advisories", "Emerging Vulns"];

type Severity = "CRITICAL" | "HIGH" | "MEDIUM";

interface ThreatItem {
  id: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
  severity: Severity;
}

const DATA: Record<string, ThreatItem[]> = {
  "CVEs": [
    {
      id: "CVE-2024-3094",
      name: "XZ Utils Backdoor",
      description: "Supply chain attack embedding a backdoor into XZ Utils compression library affecting systemd-based Linux systems.",
      date: "Mar 2024",
      tags: ["Linux", "Supply Chain", "systemd"],
      severity: "CRITICAL",
    },
    {
      id: "CVE-2024-21762",
      name: "Fortinet FortiOS RCE",
      description: "Out-of-bounds write vulnerability in FortiOS/FortiProxy allowing unauthenticated remote code execution.",
      date: "Feb 2024",
      tags: ["FortiOS", "Network", "RCE"],
      severity: "CRITICAL",
    },
    {
      id: "CVE-2024-0519",
      name: "Chrome V8 Engine OOB",
      description: "Out-of-bounds memory access in Chrome V8 JavaScript engine exploited in the wild.",
      date: "Jan 2024",
      tags: ["Chrome", "Browser", "V8"],
      severity: "HIGH",
    },
    {
      id: "CVE-2023-44487",
      name: "HTTP/2 Rapid Reset Attack",
      description: "Protocol-level DDoS vulnerability in HTTP/2 enabling record-breaking amplification attacks.",
      date: "Oct 2023",
      tags: ["HTTP/2", "DDoS", "Protocol"],
      severity: "HIGH",
    },
  ],
  "Malware Campaigns": [
    {
      id: "MAL-001",
      name: "LockBit 3.0 Ransomware",
      description: "Advanced ransomware-as-a-service with double extortion, targeting critical infrastructure globally.",
      date: "Ongoing",
      tags: ["Ransomware", "RaaS", "Exfiltration"],
      severity: "CRITICAL",
    },
    {
      id: "MAL-002",
      name: "BlackCat/ALPHV",
      description: "Rust-based ransomware with advanced evasion capabilities, targeting healthcare and financial sectors.",
      date: "Ongoing",
      tags: ["Ransomware", "Rust", "Healthcare"],
      severity: "HIGH",
    },
    {
      id: "MAL-003",
      name: "DarkGate Loader",
      description: "Multi-stage malware loader delivering RATs and info-stealers via phishing campaigns.",
      date: "Q4 2023",
      tags: ["Loader", "RAT", "Phishing"],
      severity: "HIGH",
    },
    {
      id: "MAL-004",
      name: "Qakbot Resurgence",
      description: "Banking trojan resurgence post-infrastructure takedown, adopting new distribution methods.",
      date: "Late 2023",
      tags: ["Banking Trojan", "Botnet", "Email"],
      severity: "MEDIUM",
    },
  ],
  "Threat Actors": [
    {
      id: "APT29",
      name: "APT29 / Cozy Bear",
      description: "Russian SVR-linked group conducting sophisticated espionage against government and tech sectors.",
      date: "Active",
      tags: ["Russia", "Espionage", "SVR"],
      severity: "CRITICAL",
    },
    {
      id: "LAZARUS",
      name: "Lazarus Group",
      description: "North Korean state-sponsored group targeting financial institutions and cryptocurrency platforms.",
      date: "Active",
      tags: ["North Korea", "Crypto", "Financial"],
      severity: "HIGH",
    },
    {
      id: "SCATTERED",
      name: "Scattered Spider",
      description: "Financially-motivated group using social engineering against enterprise targets via helpdesk attacks.",
      date: "Active",
      tags: ["Social Engineering", "MFA Bypass"],
      severity: "HIGH",
    },
    {
      id: "VOLT",
      name: "Volt Typhoon",
      description: "Chinese state-sponsored APT pre-positioning in US critical infrastructure for potential disruption.",
      date: "Active",
      tags: ["China", "Critical Infrastructure", "Living off the Land"],
      severity: "CRITICAL",
    },
  ],
  "Advisories": [
    {
      id: "CISA-KEV",
      name: "CISA KEV Catalog Update",
      description: "CISA Known Exploited Vulnerabilities catalog updated with 15 new actively exploited CVEs.",
      date: "Jan 2024",
      tags: ["CISA", "KEV", "Patching"],
      severity: "CRITICAL",
    },
    {
      id: "NSA-AI",
      name: "NSA AI Security Guidance",
      description: "NSA releases guidance on securing AI systems and protecting against adversarial ML attacks.",
      date: "Nov 2023",
      tags: ["NSA", "AI Security", "Guidance"],
      severity: "HIGH",
    },
    {
      id: "FBI-AA24",
      name: "FBI Flash Alert AA24-038A",
      description: "FBI advisory on ALPHV/BlackCat ransomware targeting critical infrastructure sectors.",
      date: "Feb 2024",
      tags: ["FBI", "Ransomware", "Flash Alert"],
      severity: "HIGH",
    },
    {
      id: "NIST-CSF",
      name: "NIST CSF 2.0 Release",
      description: "NIST releases Cybersecurity Framework 2.0 with expanded governance and supply chain focus.",
      date: "Feb 2024",
      tags: ["NIST", "Framework", "Governance"],
      severity: "MEDIUM",
    },
  ],
  "Emerging Vulns": [
    {
      id: "EMG-001",
      name: "AI-Powered Phishing",
      description: "LLM-generated hyper-personalized phishing campaigns bypassing traditional detection systems.",
      date: "2024",
      tags: ["AI", "Phishing", "LLM"],
      severity: "CRITICAL",
    },
    {
      id: "EMG-002",
      name: "Firmware Supply Chain",
      description: "Attacks targeting UEFI/firmware components in enterprise hardware supply chains.",
      date: "2024",
      tags: ["Firmware", "UEFI", "Supply Chain"],
      severity: "HIGH",
    },
    {
      id: "EMG-003",
      name: "Cloud-Native Malware",
      description: "New malware families designed specifically for cloud environments exploiting IAM misconfigurations.",
      date: "2024",
      tags: ["Cloud", "IAM", "Container"],
      severity: "HIGH",
    },
    {
      id: "EMG-004",
      name: "GenAI Data Exfiltration",
      description: "Novel techniques exploiting generative AI systems to exfiltrate sensitive training data and prompts.",
      date: "2024",
      tags: ["GenAI", "Prompt Injection", "DLP"],
      severity: "MEDIUM",
    },
  ],
};

const SEVERITY_STYLE: Record<Severity, { color: string; bg: string; border: string }> = {
  CRITICAL: { color: "#FF4444", bg: "rgba(255,68,68,0.12)", border: "rgba(255,68,68,0.3)" },
  HIGH: { color: "#38a532", bg: "rgba(56,165,50,0.1)", border: "rgba(56,165,50,0.25)" },
  MEDIUM: { color: "rgba(56,165,50,0.6)", bg: "rgba(56,165,50,0.06)", border: "rgba(56,165,50,0.15)" },
};

const BLUR_FADE_EASE = [0.25, 0.4, 0.25, 1] as const;

export default function ThreatLandscape() {
  const [activeTab, setActiveTab] = useState("CVEs");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="threat-landscape"
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
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0, ease: BLUR_FADE_EASE }}
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
            CURRENT THREAT LANDSCAPE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: BLUR_FADE_EASE }}
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          Intelligence{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Feed
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.14, ease: BLUR_FADE_EASE }}
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "40px",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Intelligence Feed â€” Updated Continuously
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: BLUR_FADE_EASE }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: "36px",
            padding: "4px",
            background: "rgba(2,8,16,0.5)",
            borderRadius: "10px",
            border: "1px solid rgba(56,165,50,0.1)",
            width: "fit-content",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                borderRadius: "7px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
                backgroundColor: activeTab === tab ? "rgba(56,165,50,0.15)" : "transparent",
                color: activeTab === tab ? "#38a532" : "rgba(255,255,255,0.65)",
                borderBottom: activeTab === tab ? "1px solid rgba(56,165,50,0.4)" : "1px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {DATA[activeTab]?.map((item, index) => {
            const sv = SEVERITY_STYLE[item.severity];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 + index * 0.07,
                  ease: BLUR_FADE_EASE,
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(56,165,50,0.12)",
                }}
                style={{
                  background: "rgba(2,8,16,0.7)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(56,165,50,0.12)",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  borderLeft: `3px solid ${sv.color}`,
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.65)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: sv.color,
                      backgroundColor: sv.bg,
                      border: `1px solid ${sv.border}`,
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                    }}
                  >
                    {item.severity}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </h3>

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

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.65)",
                        backgroundColor: "rgba(56,165,50,0.06)",
                        border: "1px solid rgba(56,165,50,0.1)",
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date */}
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-geist-mono), monospace",
                    borderTop: "1px solid rgba(56,165,50,0.08)",
                    paddingTop: "10px",
                  }}
                >
                  {item.date}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

