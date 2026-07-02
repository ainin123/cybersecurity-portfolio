"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const EDUCATION = [
  {
    year: "2025",
    icon: GraduationCap,
    title: "MS Cyber Security",
    institution: "Air University, Islamabad",
    description:
      "Completed a Master's specialising in AI-driven cybersecurity. Coursework covered Network Security, Web App Security, Network Forensics, Blockchain Security, and AI in Cyber Security.",
    tech: ["AI Security", "Network Forensics", "Blockchain", "Web App Security"],
    accentColor: "#38a532",
  },
  {
    year: "2022",
    icon: Award,
    title: "Cyber Security Certification (Grade A+)",
    institution: "National University of Modern Languages (NUML), Islamabad",
    description:
      "Completed a government-backed cybersecurity programme covering VAPT, Ethical Hacking, Google Hacking, Code Analysis, and Dynamic and Static Malware Analysis.",
    tech: ["VAPT", "Ethical Hacking", "Static Analysis", "Dynamic Analysis"],
    accentColor: "#38a532",
  },
  {
    year: "2019",
    icon: BookOpen,
    title: "BS Computer Science",
    institution: "PMAS Arid Agriculture University, Rawalpindi",
    description:
      "Built a strong foundation in programming, systems, networking, and database management, forming the bedrock for current expertise in security tool development and scripting automation.",
    tech: ["Computer Science", "Networking", "Programming", "Linux"],
    accentColor: "#38a532",
  },
];

function EducationCard({
  item,
  index,
  inView,
}: {
  item: (typeof EDUCATION)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(56,165,50,0.1)" }}
      style={{
        background: "rgba(2,8,16,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(56,165,50,0.15)",
        borderLeft: "3px solid rgba(56,165,50,0.5)",
        borderRadius: "12px",
        padding: "28px 28px 28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Year badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: "48px", height: "48px",
          borderRadius: "10px",
          background: "rgba(56,165,50,0.1)",
          border: "1px solid rgba(56,165,50,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <item.icon size={22} color="#38a532" />
        </div>
        <span style={{
          fontSize: "12px", fontWeight: 800,
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#38a532",
          backgroundColor: "rgba(56,165,50,0.08)",
          borderLeft: "2px solid rgba(56,165,50,0.5)",
          padding: "4px 10px",
          letterSpacing: "0.06em",
          borderRadius: "0 3px 3px 0",
        }}>
          {item.year}
        </span>
      </div>

      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", marginBottom: "5px", lineHeight: 1.35 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "12px", color: "#38a532", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.03em" }}>
          {item.institution}
        </p>
      </div>

      <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
        {item.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {item.tech.map((t) => (
          <span key={t} style={{
            padding: "3px 9px",
            borderRadius: "3px",
            fontSize: "11px", fontWeight: 500,
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
  );
}

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      style={{ position: "relative", padding: "100px 0", backgroundColor: "#070709", overflow: "hidden" }}
    >
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 40% 60% at 100% 50%, rgba(56,165,50,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "16px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600,
            color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            EDUCATION &amp; TRAINING
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15,
            marginBottom: "56px", color: "#FFFFFF",
          }}
        >
          Academic{" "}
          <span style={{
            background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Background
          </span>
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "24px" }}
        >
          {EDUCATION.map((item, i) => (
            <EducationCard key={item.year} item={item} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
