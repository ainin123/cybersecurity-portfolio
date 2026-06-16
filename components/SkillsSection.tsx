"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Target, Cloud, Code, Brain } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    icon: Shield,
    title: "Defensive Security",
    skills: [
      { name: "Wazuh SIEM", pct: 92 },
      { name: "Threat Hunting", pct: 88 },
      { name: "Detection Engineering", pct: 90 },
      { name: "Incident Response", pct: 85 },
      { name: "Log Analysis", pct: 93 },
      { name: "SIGMA Rules", pct: 87 },
    ],
  },
  {
    icon: Target,
    title: "Offensive Security",
    skills: [
      { name: "Nmap", pct: 85 },
      { name: "Burp Suite", pct: 80 },
      { name: "Metasploit", pct: 75 },
      { name: "Web Security Testing", pct: 82 },
      { name: "Vulnerability Assessment", pct: 88 },
      { name: "OSINT", pct: 86 },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    skills: [
      { name: "AWS Security", pct: 78 },
      { name: "IAM Policies", pct: 82 },
      { name: "Cloud Monitoring", pct: 80 },
      { name: "Security Architecture", pct: 85 },
      { name: "Container Security", pct: 76 },
    ],
  },
  {
    icon: Code,
    title: "Programming & Automation",
    skills: [
      { name: "Python", pct: 95 },
      { name: "JavaScript", pct: 80 },
      { name: "TypeScript", pct: 75 },
      { name: "Bash", pct: 88 },
      { name: "SQL", pct: 82 },
      { name: "API Development", pct: 84 },
    ],
  },
  {
    icon: Brain,
    title: "AI & ML Security",
    skills: [
      { name: "BERT/RoBERTa", pct: 92 },
      { name: "TensorFlow", pct: 85 },
      { name: "Scikit-learn", pct: 90 },
      { name: "XAI (SHAP/LIME)", pct: 88 },
      { name: "NLP Pipelines", pct: 91 },
    ],
  },
];

interface SkillCardProps {
  category: typeof SKILL_CATEGORIES[0];
  index: number;
  inView: boolean;
}

function SkillCard({ category, index, inView }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      style={{
        background: "rgba(2,8,16,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(37,150,190,0.12)",
        borderRadius: "16px",
        padding: "28px",
        transition: "box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: "rgba(37,150,190,0.1)",
            border: "1px solid rgba(37,150,190,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <category.icon size={22} color="#2596be" />
        </div>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skill bars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {category.skills.map((skill, i) => (
          <div key={skill.name}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {skill.name}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#2596be",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {skill.pct}%
              </span>
            </div>
            <div
              style={{
                height: "4px",
                backgroundColor: "rgba(37,150,190,0.08)",
                borderRadius: "100px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "100px",
                  background: "linear-gradient(to right, #2596be, rgba(37,150,190,0.5))",
                  width: inView ? `${skill.pct}%` : "0%",
                  transition: `width 1s ease-out ${0.3 + index * 0.1 + i * 0.06}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
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
              color: "#2596be",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            SECURITY CAPABILITY MATRIX
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
          Technical{" "}
          <span
            style={{
              background: "linear-gradient(to right, #2596be, rgba(37,150,190,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Expertise
          </span>
        </motion.h2>

        {/* Responsive grid */}
        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
