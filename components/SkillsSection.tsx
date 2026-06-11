"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Brain, Cloud, Code } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    icon: Shield,
    title: "Security Technologies",
    color: "#0ea5e9",
    borderColor: "rgba(14,165,233,0.3)",
    bgColor: "rgba(14,165,233,0.08)",
    skills: [
      "Wazuh",
      "Suricata",
      "YARA",
      "Sigma",
      "Sysmon",
      "Threat Intelligence",
      "Malware Analysis",
      "IDS/IPS",
      "SIEM",
      "DLP",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    color: "#7c3aed",
    borderColor: "rgba(124,58,237,0.3)",
    bgColor: "rgba(124,58,237,0.08)",
    skills: [
      "NLP",
      "Transformers",
      "BERT",
      "RoBERTa",
      "Explainable AI",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "#06b6d4",
    borderColor: "rgba(6,182,212,0.3)",
    bgColor: "rgba(6,182,212,0.08)",
    skills: [
      "Docker",
      "Linux",
      "GitHub",
      "CI/CD",
      "Cloud Security",
      "Virtual Environments",
      "Log Management",
      "SOAR",
    ],
  },
  {
    icon: Code,
    title: "Programming",
    color: "#7c3aed",
    borderColor: "rgba(124,58,237,0.3)",
    bgColor: "rgba(124,58,237,0.06)",
    skills: [
      "Python",
      "Bash",
      "Java",
      "JavaScript",
      "SQL",
      "Regex",
      "API Integration",
      "Data Pipelines",
    ],
  },
];

interface SkillCardProps {
  category: (typeof SKILL_CATEGORIES)[0];
  index: number;
  inView: boolean;
}

function SkillCard({ category, index, inView }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
      whileHover={{
        y: -4,
        boxShadow: `0 12px 40px ${category.color}18, 0 0 0 1px ${category.borderColor}`,
      }}
      style={{
        background: "rgba(13,20,36,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid rgba(14,165,233,0.15)`,
        borderRadius: "16px",
        padding: "28px",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
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
            background: category.bgColor,
            border: `1px solid ${category.borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <category.icon size={22} color={category.color} />
        </div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#e2e8f0",
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skill Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {category.skills.map((skill) => (
          <span
            key={skill}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 500,
              color: category.color,
              backgroundColor: category.bgColor,
              border: `1px solid ${category.borderColor}`,
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.03em",
            }}
          >
            {skill}
          </span>
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
        backgroundColor: "#0d1424",
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
              color: "#0ea5e9",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            02 // SKILLS
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
          Technical{" "}
          <span
            style={{
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Expertise
          </span>
        </motion.h2>

        {/* 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "1fr",
          }}
          className="sm:grid-cols-2"
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
