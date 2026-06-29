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
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ls-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,165,50,0.6); opacity: 1; }
          50%       { box-shadow: 0 0 0 8px rgba(56,165,50,0); opacity: 0.6; }
        }
      `}</style>

      {/* Root */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          backgroundImage: "url('/loading.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
          opacity: phase === "exit" ? 0 : 1,
          pointerEvents: phase === "exit" ? "none" : "auto",
        }}
      >
        {/* Overlay: top & bottom dark bands, lighter center so image shows */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(2,8,16,0.90) 0%, rgba(2,8,16,0.42) 30%, rgba(2,8,16,0.42) 68%, rgba(2,8,16,0.94) 100%)",
        }} />
        {/* Radial edge vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 75% 65% at 50% 48%, transparent 25%, rgba(2,8,16,0.60) 100%)",
        }} />
        {/* Subtle green bloom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 40% at 50% 48%, rgba(56,165,50,0.07) 0%, transparent 70%)",
        }} />

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px", zIndex: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(56,165,50,0.3) 20%, rgba(56,165,50,0.65) 50%, rgba(56,165,50,0.3) 80%, transparent 100%)",
          animation: "ls-scan 3.5s linear infinite",
        }} />

        {/* Screen-corner brackets — HUD / targeting frame */}
        {(["tl","tr","bl","br"] as const).map((c) => (
          <div key={c} style={{
            position: "absolute",
            top:    c.startsWith("t") ? "28px" : undefined,
            bottom: c.startsWith("b") ? "28px" : undefined,
            left:   c.endsWith("l")   ? "28px" : undefined,
            right:  c.endsWith("r")   ? "28px" : undefined,
            width: "36px", height: "36px",
            zIndex: 4,
            borderTop:    c.startsWith("t") ? "2px solid rgba(56,165,50,0.55)" : undefined,
            borderBottom: c.startsWith("b") ? "2px solid rgba(56,165,50,0.55)" : undefined,
            borderLeft:   c.endsWith("l")   ? "2px solid rgba(56,165,50,0.55)" : undefined,
            borderRight:  c.endsWith("r")   ? "2px solid rgba(56,165,50,0.55)" : undefined,
            borderRadius:
              c === "tl" ? "4px 0 0 0" :
              c === "tr" ? "0 4px 0 0" :
              c === "bl" ? "0 0 0 4px" : "0 0 4px 0",
          }} />
        ))}

        {/* ── CENTRE CONTENT ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "0 32px",
          animation: "ls-fade-up 0.7s cubic-bezier(0.25,0.4,0.25,1) both",
        }}>

          {/* Status dot + label */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              backgroundColor: "#38a532", display: "inline-block", flexShrink: 0,
              animation: "ls-glow-pulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", letterSpacing: "0.24em",
              color: "rgba(56,165,50,0.85)", textTransform: "uppercase",
            }}>
              Secure Portal
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "clamp(36px, 7vw, 72px)",
            fontWeight: 800, letterSpacing: "0.22em",
            color: "#FFFFFF", lineHeight: 1.05,
            textShadow: "0 0 60px rgba(56,165,50,0.25), 0 4px 32px rgba(0,0,0,0.8)",
          }}>
            ANIQA AYUB
          </h1>

          {/* Decorated rule */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            margin: "20px 0 22px", width: "100%", maxWidth: "420px",
          }}>
            <div style={{
              flex: 1, height: "1px",
              background: "linear-gradient(to right, transparent, rgba(56,165,50,0.5))",
            }} />
            <span style={{ fontSize: "7px", color: "rgba(56,165,50,0.55)", letterSpacing: "3px" }}>◆ ◆</span>
            <div style={{
              flex: 1, height: "1px",
              background: "linear-gradient(to left, transparent, rgba(56,165,50,0.5))",
            }} />
          </div>

          {/* Role chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security"].map((role) => (
              <span key={role} style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px", letterSpacing: "0.06em",
                color: "rgba(56,165,50,0.9)",
                background: "rgba(2,8,16,0.45)",
                border: "1px solid rgba(56,165,50,0.28)",
                padding: "5px 13px", borderRadius: "5px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}>
                {role}
              </span>
            ))}
          </div>

        </div>

        {/* ── BOTTOM: progress bar ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
          padding: "0 48px 40px",
        }}>
          {/* Label row */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: "10px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
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

          {/* Bar */}
          <div style={{
            height: "2px", borderRadius: "100px",
            background: "rgba(56,165,50,0.12)", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              borderRadius: "100px",
              background: "linear-gradient(to right, rgba(56,165,50,0.45), #38a532)",
              boxShadow: "0 0 12px rgba(56,165,50,0.6)",
              transition: "width 0.06s linear",
            }} />
          </div>

          {/* Tick markers */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
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

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: "14px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em",
            }}>
              NCCS · NASTP · ISLAMABAD
            </span>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", color: "rgba(56,165,50,0.4)", letterSpacing: "0.06em",
            }}>
              v2.4.1
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
