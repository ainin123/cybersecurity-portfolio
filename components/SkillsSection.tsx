"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Matrix Binary Rain ───────────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const FS = 13;
    const CHARS = "01";
    let COLS = Math.floor(W / FS);
    let drops: number[] = Array.from({ length: COLS }, () => Math.random() * -80);
    let speeds: number[] = Array.from({ length: COLS }, () => 0.3 + Math.random() * 0.5);

    let animId: number;
    let lastTime = 0;
    const INTERVAL = 1000 / 28;

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);
      if (now - lastTime < INTERVAL) return;
      lastTime = now;

      ctx.fillStyle = "rgba(2,8,16,0.055)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px 'Courier New', monospace`;

      for (let i = 0; i < COLS; i++) {
        const y = drops[i] * FS;
        const x = i * FS;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        ctx.fillStyle = "rgba(120,230,120,0.9)";
        ctx.fillText(char, x, y);

        if (drops[i] > 1) {
          ctx.fillStyle = "rgba(56,165,50,0.55)";
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FS);
        }

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      COLS = Math.floor(W / FS);
      drops = Array.from({ length: COLS }, () => Math.random() * -80);
      speeds = Array.from({ length: COLS }, () => 0.3 + Math.random() * 0.5);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
import { Shield, Target, Network, Code, Search } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    icon: Shield,
    title: "SIEM & Network Defense",
    skills: [
      { name: "Wazuh SIEM", pct: 95 },
      { name: "ElasticStack (ELK)", pct: 88 },
      { name: "Snort IDS/IPS", pct: 82 },
      { name: "Packetbeat", pct: 80 },
      { name: "Sysmon", pct: 85 },
      { name: "SOAR Integration", pct: 82 },
    ],
  },
  {
    icon: Target,
    title: "Penetration Testing",
    skills: [
      { name: "NMAP", pct: 90 },
      { name: "Burp Suite", pct: 85 },
      { name: "Burp Intruder", pct: 80 },
      { name: "Nikto", pct: 82 },
      { name: "Acunetix", pct: 78 },
      { name: "Hydra", pct: 75 },
    ],
  },
  {
    icon: Search,
    title: "Threat Intelligence",
    skills: [
      { name: "Wireshark / tShark", pct: 92 },
      { name: "MISP", pct: 85 },
      { name: "Maltego", pct: 80 },
      { name: "Shodan", pct: 82 },
      { name: "Yeti", pct: 75 },
    ],
  },
  {
    icon: Network,
    title: "Vulnerability Assessment",
    skills: [
      { name: "Nessus", pct: 85 },
      { name: "OpenVAS", pct: 82 },
      { name: "Cuckoo Sandbox", pct: 78 },
      { name: "Static Analysis", pct: 80 },
      { name: "Dynamic Analysis", pct: 78 },
      { name: "CVE Research", pct: 86 },
    ],
  },
  {
    icon: Code,
    title: "SOC & Security Operations",
    skills: [
      { name: "SOC Analysis", pct: 90 },
      { name: "Incident Response", pct: 85 },
      { name: "Security Policy Dev.", pct: 82 },
      { name: "Network Forensics", pct: 80 },
      { name: "Scripting & Automation", pct: 88 },
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
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        background: "rgba(2,8,16,0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(56,165,50,0.12)",
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
            background: "rgba(56,165,50,0.1)",
            border: "1px solid rgba(56,165,50,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <category.icon size={22} color="#38a532" />
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
                  color: "#38a532",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {skill.pct}%
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
              <div
                style={{
                  height: "100%",
                  borderRadius: "100px",
                  background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.5))",
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
  const inView = useInView(ref, { once: false, margin: "-80px" });

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
      {/* Matrix binary rain background */}
      <MatrixRain />

      {/* Hacker image — right side */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "50%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <img
          src="/hacker.webp"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            opacity: 0.40,
            filter: "saturate(0.7) brightness(0.6) hue-rotate(10deg)",
          }}
        />
        {/* Left-edge blend */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: "60%", height: "100%",
          background: "linear-gradient(to right, #020810 15%, transparent)",
          pointerEvents: "none",
        }} />
        {/* Top fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "20%",
          background: "linear-gradient(to bottom, #020810, transparent)",
          pointerEvents: "none",
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "20%",
          background: "linear-gradient(to top, #020810, transparent)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Dark overlay to keep cards readable */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "rgba(2,8,16,0.55)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 3,
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
            SECURITY CAPABILITY MATRIX
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
          Technical{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
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

