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
      `radial-gradient(400px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(56,165,50,0.06), transparent 70%)`;
  };

  return (
    <section
      id="hero" ref={sectionRef} onMouseMove={handleMouseMove}
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #020810 0%, #030c18 50%, #020810 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Full-screen globe — behind all content ── */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "100vw", height: "100vh",
        zIndex: 1,
        overflow: "hidden",
        clipPath: "inset(0)",
      }}>
        {/* Negative offsets clip away the Kaspersky title bar, logo, and zoom controls */}
        <div style={{
          position: "absolute",
          top: "-48px",
          left: 0,
          right: "-52px",
          bottom: "-100px",
        }}>
          <iframe
            src="https://cybermap.kaspersky.com/en/widget/dynamic/dark"
            frameBorder={0}
            style={{ width: "100%", height: "100%", display: "block" }}
            title="Kaspersky Live Map"
            allowFullScreen
          />
        </div>
      </div>

      {/* ── Left-side gradient so text stays readable over the globe ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: isDesktop ? "58%" : "100%",
        height: "100%",
        background: isDesktop
          ? "linear-gradient(to right, #020810 55%, transparent)"
          : "linear-gradient(to bottom, rgba(2,8,16,0.92) 0%, rgba(2,8,16,0.85) 100%)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3, transition: "background 0.1s" }} />
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      {/* ── Content — left column only, globe shows on the right ── */}
      <div style={{
        position: "relative", zIndex: 4,
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
        paddingTop: isDesktop ? "120px" : "100px",
        paddingBottom: isDesktop ? "80px" : "60px",
        paddingLeft: isDesktop ? "48px" : "24px",
        paddingRight: isDesktop ? "48px" : "24px",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: isDesktop ? "520px" : "100%" }}
        >
          {/* Platform badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "4px",
            border: "1px solid rgba(56,165,50,0.25)",
            backgroundColor: "rgba(56,165,50,0.06)",
            marginBottom: "28px",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#38a532",
              animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#38a532", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              [ THREAT INTELLIGENCE PLATFORM ]
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 800, lineHeight: 1.0,
            marginBottom: "20px", letterSpacing: "-0.02em",
          }}>
            <span style={{ display: "block", color: "#FFFFFF", fontSize: "clamp(52px, 8vw, 88px)" }}>ANIQA</span>
            <span style={{
              display: "block", fontSize: "clamp(52px, 8vw, 88px)",
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>AYUB</span>
          </h1>

          {/* Role pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
            {["Network Security Analyst", "SIEM Engineer", "Penetration Tester"].map((r) => (
              <span key={r} style={{
                padding: "4px 12px", borderRadius: "100px",
                border: "1px solid rgba(56,165,50,0.2)",
                backgroundColor: "rgba(56,165,50,0.06)",
                fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em",
              }}>{r}</span>
            ))}
          </div>

          {/* Bio */}
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: "480px", marginBottom: "28px" }}>
            Research Associate at NCCS, NASTP — deploying enterprise SIEM solutions, executing real-world penetration tests, and advancing network defense through threat intelligence and automation.
          </p>

          {/* Live status */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px",
            padding: "8px 14px", borderRadius: "6px",
            backgroundColor: "rgba(56,165,50,0.04)",
            border: "1px solid rgba(56,165,50,0.12)",
            width: "fit-content",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              backgroundColor: "#38a532",
              animation: "pulse-dot 1.5s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", fontWeight: 600, color: "#38a532", letterSpacing: "0.1em",
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
                background: "linear-gradient(135deg, #38a532, rgba(56,165,50,0.7))",
                color: "#020810", fontWeight: 700, fontSize: "14px",
                textDecoration: "none", boxShadow: "0 0 24px rgba(56,165,50,0.25)",
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
                border: "1px solid rgba(56,165,50,0.4)", color: "#38a532",
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
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 5,
          }}>
          <span style={{
            fontSize: "11px", fontFamily: "var(--font-geist-mono), monospace",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em",
          }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={16} color="rgba(255,255,255,0.4)" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

