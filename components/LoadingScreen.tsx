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
          0%   { top: -2px; opacity: 0; }
          4%   { opacity: 1; }
          96%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ls-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,165,50,0.7); }
          50%       { box-shadow: 0 0 0 9px rgba(56,165,50,0); }
        }
      `}</style>

      {/* ── Root ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          overflow: "hidden",
          backgroundColor: "#020810",
          transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
          opacity: phase === "exit" ? 0 : 1,
          pointerEvents: phase === "exit" ? "none" : "auto",
        }}
      >
        {/* Photo — right half, contained to show full portrait */}
        <div style={{
          position: "absolute",
          top: 0, right: 0,
          width: "52%",
          height: "100%",
          backgroundImage: "url('/mypic.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }} />

        {/* Left-to-right gradient: solid dark → transparent (reveals photo) */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #020810 0%, #020810 36%, rgba(2,8,16,0.93) 46%, rgba(2,8,16,0.60) 58%, rgba(2,8,16,0.18) 75%, transparent 100%)",
        }} />

        {/* Top & bottom vignette over the photo area */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(2,8,16,0.65) 0%, transparent 18%, transparent 78%, rgba(2,8,16,0.80) 100%)",
        }} />

        {/* Subtle green bloom on the left panel */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 45% 60% at 22% 50%, rgba(56,165,50,0.07) 0%, transparent 70%)",
        }} />

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px", zIndex: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(56,165,50,0.25) 20%, rgba(56,165,50,0.55) 50%, rgba(56,165,50,0.25) 80%, transparent 100%)",
          animation: "ls-scan 3.5s linear infinite",
        }} />

        {/* Screen-corner HUD brackets */}
        {(["tl","tr","bl","br"] as const).map((c) => (
          <div key={c} style={{
            position: "absolute",
            top:    c.startsWith("t") ? "28px" : undefined,
            bottom: c.startsWith("b") ? "28px" : undefined,
            left:   c.endsWith("l")   ? "28px" : undefined,
            right:  c.endsWith("r")   ? "28px" : undefined,
            width: "32px", height: "32px", zIndex: 4,
            borderTop:    c.startsWith("t") ? "2px solid rgba(56,165,50,0.5)" : undefined,
            borderBottom: c.startsWith("b") ? "2px solid rgba(56,165,50,0.5)" : undefined,
            borderLeft:   c.endsWith("l")   ? "2px solid rgba(56,165,50,0.5)" : undefined,
            borderRight:  c.endsWith("r")   ? "2px solid rgba(56,165,50,0.5)" : undefined,
            borderRadius:
              c === "tl" ? "4px 0 0 0" : c === "tr" ? "0 4px 0 0" :
              c === "bl" ? "0 0 0 4px" : "0 0 4px 0",
          }} />
        ))}

        {/* ── LEFT PANEL — main content ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, bottom: "120px",
          width: "50%",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 0 0 clamp(32px, 7vw, 96px)",
          animation: "ls-fade-up 0.75s cubic-bezier(0.25,0.4,0.25,1) both",
        }}>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              backgroundColor: "#38a532", display: "inline-block", flexShrink: 0,
              animation: "ls-glow-pulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", letterSpacing: "0.22em",
              color: "rgba(56,165,50,0.9)", textTransform: "uppercase",
            }}>
              Secure Portal
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "clamp(32px, 5vw, 62px)",
            fontWeight: 800, letterSpacing: "0.18em",
            color: "#FFFFFF", lineHeight: 1.08,
            textShadow: "0 2px 32px rgba(0,0,0,0.8)",
          }}>
            ANIQA<br />AYUB
          </h1>

          {/* Rule */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            margin: "20px 0 20px", maxWidth: "340px",
          }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(56,165,50,0.5)", flexShrink: 0 }} />
            <span style={{ fontSize: "7px", color: "rgba(56,165,50,0.5)", letterSpacing: "3px" }}>◆ ◆</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(56,165,50,0.4), transparent)" }} />
          </div>

          {/* Role chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security"].map((role) => (
              <span key={role} style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px", letterSpacing: "0.05em",
                color: "rgba(56,165,50,0.95)",
                display: "inline-block", alignSelf: "flex-start",
                background: "rgba(56,165,50,0.07)",
                border: "1px solid rgba(56,165,50,0.20)",
                padding: "4px 12px", borderRadius: "4px",
              }}>
                {role}
              </span>
            ))}
          </div>

        </div>

        {/* ── BOTTOM — progress bar (full width) ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
          padding: "0 clamp(32px, 7vw, 96px) 40px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "baseline", marginBottom: "10px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.40)", textTransform: "uppercase",
            }}>
              {progress < 100 ? "Initialising" : "Ready"}
            </span>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px", fontWeight: 700, color: "#38a532",
            }}>
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <div style={{
            height: "2px", borderRadius: "100px",
            background: "rgba(255,255,255,0.10)", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${progress}%`, borderRadius: "100px",
              background: "linear-gradient(to right, rgba(56,165,50,0.5), #38a532)",
              boxShadow: "0 0 12px rgba(56,165,50,0.65)",
              transition: "width 0.06s linear",
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            {[0, 25, 50, 75, 100].map((t) => (
              <span key={t} style={{
                fontFamily: "var(--font-geist-mono), monospace", fontSize: "8px",
                color: progress >= t ? "rgba(56,165,50,0.55)" : "rgba(255,255,255,0.18)",
                transition: "color 0.3s",
              }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between", marginTop: "14px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em",
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
    </>
  );
}
