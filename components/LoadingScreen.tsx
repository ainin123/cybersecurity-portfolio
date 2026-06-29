"use client";

import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const start = performance.now();
    const duration = 2700;

    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(pct));
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("exit"), 350);
        setTimeout(() => onComplete(), 900);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes ls-scan {
          0%   { transform: translateY(-2px); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes ls-card-in {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes ls-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,165,50,0.55); opacity: 1; }
          50%       { box-shadow: 0 0 0 7px rgba(56,165,50,0);  opacity: 0.65; }
        }
        @keyframes ls-border-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ls-counter-tick {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Root — full viewport, background image */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          backgroundImage: "url('/loading.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          transition: "opacity 0.55s cubic-bezier(0.4,0,0.2,1)",
          opacity: phase === "exit" ? 0 : 1,
          pointerEvents: phase === "exit" ? "none" : "auto",
        }}
      >
        {/* Overlay stack — three layers for depth */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(2,8,16,0.88) 0%, rgba(2,8,16,0.62) 40%, rgba(2,8,16,0.72) 75%, rgba(2,8,16,0.92) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(56,165,50,0.07) 0%, transparent 70%)",
        }} />

        {/* Horizontal scan line sweeping top→bottom */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px", zIndex: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(56,165,50,0.35) 20%, rgba(56,165,50,0.7) 50%, rgba(56,165,50,0.35) 80%, transparent 100%)",
          animation: "ls-scan 3.5s linear infinite",
        }} />

        {/* Full-screen flex centre */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
        }}>

          {/* Glass card */}
          <div style={{
            width: "100%", maxWidth: "420px",
            background: "linear-gradient(145deg, rgba(2,8,16,0.76) 0%, rgba(6,26,13,0.68) 40%, rgba(4,18,10,0.72) 70%, rgba(2,8,16,0.76) 100%)",
            backdropFilter: "blur(36px) saturate(1.5)",
            WebkitBackdropFilter: "blur(36px) saturate(1.5)",
            border: "1px solid rgba(56,165,50,0.22)",
            borderRadius: "18px",
            padding: "36px 32px 28px",
            position: "relative",
            overflow: "hidden",
            animation: "ls-card-in 0.65s cubic-bezier(0.25,0.4,0.25,1) both",
            boxShadow: [
              "0 32px 96px rgba(0,0,0,0.65)",
              "0 0 0 1px rgba(56,165,50,0.05)",
              "inset 0 1.5px 0 rgba(255,255,255,0.07)",
              "inset 0 -1px 0 rgba(0,0,0,0.25)",
              "inset 1px 0 0 rgba(255,255,255,0.03)",
              "inset -1px 0 0 rgba(255,255,255,0.03)",
            ].join(", "),
          }}>

            {/* Crystal top-edge refraction highlight */}
            <div style={{
              position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 40%, rgba(56,165,50,0.35) 60%, transparent)",
            }} />

            {/* Ambient green inner glow (bottom) */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
              background: "linear-gradient(to top, rgba(56,165,50,0.05), transparent)",
              pointerEvents: "none",
            }} />

            {/* Corner brackets */}
            {(["tl","tr","bl","br"] as const).map((c) => (
              <div key={c} style={{
                position: "absolute",
                top:    c.startsWith("t") ? "14px" : undefined,
                bottom: c.startsWith("b") ? "14px" : undefined,
                left:   c.endsWith("l")   ? "14px" : undefined,
                right:  c.endsWith("r")   ? "14px" : undefined,
                width: "14px", height: "14px",
                borderTop:    c.startsWith("t") ? "1.5px solid rgba(56,165,50,0.55)" : undefined,
                borderBottom: c.startsWith("b") ? "1.5px solid rgba(56,165,50,0.55)" : undefined,
                borderLeft:   c.endsWith("l")   ? "1.5px solid rgba(56,165,50,0.55)" : undefined,
                borderRight:  c.endsWith("r")   ? "1.5px solid rgba(56,165,50,0.55)" : undefined,
                borderRadius: c === "tl" ? "3px 0 0 0" : c === "tr" ? "0 3px 0 0" : c === "bl" ? "0 0 0 3px" : "0 0 3px 0",
              }} />
            ))}

            {/* ── Status badge ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px", marginBottom: "26px",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                backgroundColor: "#38a532", display: "inline-block", flexShrink: 0,
                animation: "ls-glow-pulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px", letterSpacing: "0.22em",
                color: "rgba(56,165,50,0.82)", textTransform: "uppercase",
              }}>
                Secure Portal
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(56,165,50,0.12)" }} />
            </div>

            {/* ── Name ── */}
            <h1 style={{
              margin: "0 0 4px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "clamp(24px, 4.5vw, 34px)",
              fontWeight: 800, letterSpacing: "0.2em",
              color: "#FFFFFF", lineHeight: 1.1,
            }}>
              ANIQA AYUB
            </h1>

            {/* ── Decorated rule ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px", margin: "14px 0 16px",
            }}>
              <div style={{
                flex: 1, height: "1px",
                background: "linear-gradient(to right, rgba(56,165,50,0.45), rgba(56,165,50,0.06))",
              }} />
              <span style={{ fontSize: "6px", color: "rgba(56,165,50,0.5)", letterSpacing: "2px" }}>◆ ◆</span>
              <div style={{
                flex: 1, height: "1px",
                background: "linear-gradient(to left, rgba(56,165,50,0.45), rgba(56,165,50,0.06))",
              }} />
            </div>

            {/* ── Role chips ── */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "30px",
            }}>
              {["Cybersecurity Researcher", "SIEM Engineer", "AI Security"].map((role) => (
                <span key={role} style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "10px", letterSpacing: "0.05em",
                  color: "rgba(56,165,50,0.9)",
                  background: "rgba(56,165,50,0.08)",
                  border: "1px solid rgba(56,165,50,0.2)",
                  padding: "3px 10px", borderRadius: "4px",
                }}>
                  {role}
                </span>
              ))}
            </div>

            {/* ── Progress ── */}
            <div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", marginBottom: "8px",
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "9px", letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
                }}>
                  {progress < 100 ? "Initialising" : "Ready"}
                </span>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "13px", fontWeight: 700, color: "#38a532",
                  animation: "ls-counter-tick 0.1s ease",
                }}>
                  {String(progress).padStart(3, "0")}%
                </span>
              </div>

              {/* Bar track */}
              <div style={{
                height: "2px", borderRadius: "100px",
                backgroundColor: "rgba(56,165,50,0.10)",
                overflow: "hidden", position: "relative",
              }}>
                <div style={{
                  height: "100%", width: `${progress}%`,
                  borderRadius: "100px",
                  background: "linear-gradient(to right, rgba(56,165,50,0.4), #38a532)",
                  boxShadow: "0 0 10px rgba(56,165,50,0.65)",
                  transition: "width 0.06s linear",
                }} />
              </div>

              {/* Tick markers */}
              <div style={{
                display: "flex", justifyContent: "space-between", marginTop: "5px",
              }}>
                {[0, 25, 50, 75, 100].map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-geist-mono), monospace", fontSize: "8px",
                    color: progress >= t ? "rgba(56,165,50,0.55)" : "rgba(255,255,255,0.15)",
                    transition: "color 0.3s",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div style={{
              marginTop: "22px", paddingTop: "14px",
              borderTop: "1px solid rgba(56,165,50,0.08)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em",
              }}>
                NCCS · NASTP · ISLAMABAD
              </span>
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "9px", color: "rgba(56,165,50,0.42)", letterSpacing: "0.06em",
              }}>
                v2.4.1
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
