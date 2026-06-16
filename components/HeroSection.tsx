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

// ─── Main HeroSection ────────────────────────────────────────────────────────
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    glowRef.current.style.background =
      `radial-gradient(400px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,229,255,0.06), transparent 70%)`;
  };

  return (
    <section
      id="hero" ref={sectionRef} onMouseMove={handleMouseMove}
      style={{
        position: "relative", minHeight: "100vh", overflow: "hidden",
        paddingTop: isDesktop ? "120px" : "100px",
        paddingBottom: isDesktop ? "80px" : "60px",
        paddingLeft: isDesktop ? "48px" : "24px",
        paddingRight: isDesktop ? "48px" : "24px",
        display: "flex", alignItems: "center",
      }}
    >
      <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, transition: "background 0.1s" }} />
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(0,229,255,0.05) 0%, transparent 65%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: "760px",
        margin: "0 auto",
        width: "100%",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Platform badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "4px",
            border: "1px solid rgba(0,229,255,0.25)",
            backgroundColor: "rgba(0,229,255,0.06)",
            marginBottom: "28px",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#00E5FF",
              animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#00E5FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              [ THREAT INTELLIGENCE PLATFORM ]
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 800, lineHeight: 1.0,
            marginBottom: "20px", letterSpacing: "-0.02em",
          }}>
            <span style={{ display: "block", color: "#CCD6F6", fontSize: "clamp(52px, 8vw, 88px)" }}>ANIQA</span>
            <span style={{
              display: "block", fontSize: "clamp(52px, 8vw, 88px)",
              background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>AYUB</span>
          </h1>

          {/* Role pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security Engineer"].map((r) => (
              <span key={r} style={{
                padding: "4px 12px", borderRadius: "100px",
                border: "1px solid rgba(0,229,255,0.2)",
                backgroundColor: "rgba(0,229,255,0.06)",
                fontSize: "12px", fontWeight: 500, color: "#8892B0",
                fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em",
              }}>{r}</span>
            ))}
          </div>

          {/* Bio */}
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#8892B0", maxWidth: "520px", marginBottom: "28px" }}>
            Building enterprise-grade security systems that detect what traditional tools miss.
          </p>

          {/* Live status */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px",
            padding: "8px 14px", borderRadius: "6px",
            backgroundColor: "rgba(0,229,255,0.04)",
            border: "1px solid rgba(0,229,255,0.12)",
            width: "fit-content",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              backgroundColor: "#00E5FF",
              animation: "pulse-dot 1.5s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", fontWeight: 600, color: "#00E5FF", letterSpacing: "0.1em",
            }}>
              STATUS: MONITORING GLOBAL THREAT LANDSCAPE
            </span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <motion.a href="/resume.pdf" download
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "8px",
                background: "linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.7))",
                color: "#0A192F", fontWeight: 700, fontSize: "14px",
                textDecoration: "none", boxShadow: "0 0 24px rgba(0,229,255,0.25)",
              }}>
              <Download size={15} />
              Download Resume
            </motion.a>
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "8px",
                border: "1px solid rgba(0,229,255,0.4)", color: "#00E5FF",
                fontWeight: 600, fontSize: "14px", background: "transparent",
                cursor: "pointer", transition: "all 0.2s",
              }}>
              <AtSign size={15} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{
            position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 3,
          }}>
          <span style={{
            fontSize: "11px", fontFamily: "var(--font-geist-mono), monospace",
            color: "#475569", letterSpacing: "0.08em",
          }}>
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
