"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, AtSign } from "lucide-react";

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ─── Hero Terminal ────────────────────────────────────────────────────────────

const HERO_LINES = [
  { type: "cmd",    text: "$ whoami" },
  { type: "out",    text: "  aniqa-ayub — Cybersecurity Researcher & AI Security Engineer" },
  { type: "blank",  text: "" },
  { type: "cmd",    text: "$ cat specializations.txt" },
  { type: "out",    text: "  → SIEM Engineering with Wazuh" },
  { type: "out",    text: "  → AI-Powered Data Loss Prevention" },
  { type: "out",    text: "  → Threat Intelligence & CTI" },
  { type: "out",    text: "  → Malware Analysis & Reverse Engineering" },
  { type: "blank",  text: "" },
  { type: "cmd",    text: "$ threat-status --live" },
  { type: "out",    text: "  [OK] 47 threat feeds active" },
  { type: "out",    text: "  [OK] 1,247 IOCs tracked" },
  { type: "out",    text: "  [OK] ML detection accuracy: 98.3%" },
  { type: "blank",  text: "" },
  { type: "cursor", text: "$ _" },
];

function HeroTerminal() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= HERO_LINES.length) { setDone(true); return; }
    const line = HERO_LINES[lineIdx];

    if (line.type === "blank") {
      const t = setTimeout(() => {
        setDisplayedLines((p) => [...p, { text: "", type: "blank" }]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setCurrentText("");
      }, 60);
      return () => clearTimeout(t);
    }

    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        setCurrentText(line.text.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 22);
      return () => clearTimeout(t);
    } else {
      const pause = line.type === "cmd" ? 320 : 60;
      const t = setTimeout(() => {
        setDisplayedLines((p) => [...p, { text: line.text, type: line.type }]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
        setCurrentText("");
      }, pause);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  return (
    <div
      style={{
        background: "rgba(10,25,47,0.97)",
        border: "1px solid rgba(0,229,255,0.2)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(0,229,255,0.07), 0 16px 40px rgba(0,0,0,0.5)",
        fontFamily: "var(--font-geist-mono), monospace",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,229,255,0.15)",
          backgroundColor: "rgba(0,229,255,0.04)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "7px" }}>
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#FF5F57", display: "inline-block" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#FFBD2E", display: "inline-block" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#28C840", display: "inline-block" }} />
        </div>
        <span
          style={{
            fontSize: "12px",
            color: "#8892B0",
            letterSpacing: "0.06em",
            flex: 1,
            textAlign: "center",
          }}
        >
          aniqa@cyber-lab:~$
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          padding: "20px 24px 28px",
          fontSize: "13px",
          lineHeight: "1.75",
          minHeight: "340px",
        }}
      >
        {displayedLines.map((line, i) => {
          if (line.type === "blank") return <div key={i} style={{ height: "8px" }} />;
          const isCmd = line.type === "cmd";
          const isOk  = line.text.includes("[OK]");
          return (
            <div
              key={i}
              style={{
                color: isCmd ? "#00E5FF" : isOk ? "rgba(0,229,255,0.75)" : "#8892B0",
                fontWeight: isCmd ? 600 : 400,
                whiteSpace: "pre",
              }}
            >
              {line.text}
            </div>
          );
        })}

        {/* Currently typing line */}
        {!done && lineIdx < HERO_LINES.length && (
          <div
            style={{
              color: HERO_LINES[lineIdx].type === "cmd" ? "#00E5FF" : "#8892B0",
              fontWeight: HERO_LINES[lineIdx].type === "cmd" ? 600 : 400,
              display: "flex",
              alignItems: "center",
              whiteSpace: "pre",
            }}
          >
            <span>{currentText}</span>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "14px",
                backgroundColor: "#00E5FF",
                marginLeft: "1px",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        )}

        {/* Idle cursor after done */}
        {done && (
          <div style={{ color: "#00E5FF", display: "flex", alignItems: "center", marginTop: "4px" }}>
            <span>$ </span>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "14px",
                backgroundColor: "#00E5FF",
                marginLeft: "1px",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          padding: "6px 16px",
          borderTop: "1px solid rgba(0,229,255,0.1)",
          backgroundColor: "rgba(0,229,255,0.02)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10px",
          color: "#475569",
          letterSpacing: "0.06em",
        }}
      >
        <span>SECURE SHELL — TLS 1.3</span>
        <span style={{ color: "rgba(0,229,255,0.5)" }}>● CONNECTED</span>
      </div>
    </div>
  );
}

// ─── Main HeroSection ────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,229,255,0.06), transparent 70%)`;
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        paddingTop: isDesktop ? "120px" : "100px",
        paddingBottom: isDesktop ? "80px" : "60px",
        paddingLeft: isDesktop ? "48px" : "24px",
        paddingRight: isDesktop ? "48px" : "24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.1s",
        }}
      />

      {/* Background grid overlay */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      {/* Radial bg glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,229,255,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Two-column wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Platform badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "4px",
              border: "1px solid rgba(0,229,255,0.25)",
              backgroundColor: "rgba(0,229,255,0.06)",
              marginBottom: "28px",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00E5FF",
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#00E5FF",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              [ THREAT INTELLIGENCE PLATFORM ]
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 800,
              lineHeight: 1.0,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#CCD6F6",
                fontSize: "clamp(52px, 8vw, 88px)",
              }}
            >
              ANIQA
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(52px, 8vw, 88px)",
                background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AYUB
            </span>
          </h1>

          {/* Role pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security Engineer"].map((role) => (
              <span
                key={role}
                style={{
                  padding: "4px 12px",
                  borderRadius: "100px",
                  border: "1px solid rgba(0,229,255,0.2)",
                  backgroundColor: "rgba(0,229,255,0.06)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#8892B0",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {role}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#8892B0",
              maxWidth: "520px",
              marginBottom: "28px",
            }}
          >
            Building enterprise-grade security systems that detect what traditional tools miss.
          </p>

          {/* Live status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "36px",
              padding: "8px 14px",
              borderRadius: "6px",
              backgroundColor: "rgba(0,229,255,0.04)",
              border: "1px solid rgba(0,229,255,0.12)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#00E5FF",
                animation: "pulse-dot 1.5s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                fontWeight: 600,
                color: "#00E5FF",
                letterSpacing: "0.1em",
              }}
            >
              STATUS: MONITORING GLOBAL THREAT LANDSCAPE
            </span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.7))",
                color: "#0A192F",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(0,229,255,0.25)",
              }}
            >
              <Download size={15} />
              Download Resume
            </motion.a>

            <motion.button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "8px",
                border: "1px solid rgba(0,229,255,0.4)",
                color: "#00E5FF",
                fontWeight: 600,
                fontSize: "14px",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <AtSign size={15} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: Terminal ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <HeroTerminal />
        </motion.div>
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#475569",
              letterSpacing: "0.08em",
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={16} color="#475569" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
