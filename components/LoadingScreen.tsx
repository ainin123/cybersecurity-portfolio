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
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ls-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,165,50,0.7); }
          50%       { box-shadow: 0 0 0 9px rgba(56,165,50,0); }
        }
      `}</style>

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
        {/* Single light tint — image stays clearly visible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(2,8,16,0.28)",
        }} />

        {/* Bottom gradient — gives progress bar section contrast */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(2,8,16,0.90) 0%, rgba(2,8,16,0.30) 38%, transparent 62%)",
        }} />

        {/* Subtle green bloom at center */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 55% 45% at 50% 46%, rgba(56,165,50,0.06) 0%, transparent 70%)",
        }} />

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          zIndex: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(56,165,50,0.28) 20%, rgba(56,165,50,0.6) 50%, rgba(56,165,50,0.28) 80%, transparent 100%)",
          animation: "ls-scan 3.5s linear infinite",
        }} />

        {/* HUD corner brackets */}
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

        {/* Centre content */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "0 32px",
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
              fontSize: "11px", letterSpacing: "0.24em",
              color: "rgba(56,165,50,0.9)", textTransform: "uppercase",
            }}>
              Secure Portal
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "clamp(38px, 7.5vw, 78px)",
            fontWeight: 800, letterSpacing: "0.22em",
            color: "#FFFFFF", lineHeight: 1.05,
            textShadow: "0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(56,165,50,0.2)",
          }}>
            ANIQA AYUB
          </h1>

          {/* Rule */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            margin: "20px 0 22px", width: "100%", maxWidth: "460px",
          }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(56,165,50,0.5))" }} />
            <span style={{ fontSize: "7px", color: "rgba(56,165,50,0.55)", letterSpacing: "3px" }}>◆ ◆</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(56,165,50,0.5))" }} />
          </div>

          {/* Role chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security"].map((role) => (
              <span key={role} style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px", letterSpacing: "0.05em",
                color: "rgba(56,165,50,0.95)",
                background: "rgba(2,8,16,0.55)",
                border: "1px solid rgba(56,165,50,0.30)",
                padding: "5px 14px", borderRadius: "5px",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}>
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
          padding: "0 48px 40px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: "10px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
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
              height: "100%", width: `${progress}%`,
              borderRadius: "100px",
              background: "linear-gradient(to right, rgba(56,165,50,0.5), #38a532)",
              boxShadow: "0 0 12px rgba(56,165,50,0.7)",
              transition: "width 0.06s linear",
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            {[0, 25, 50, 75, 100].map((t) => (
              <span key={t} style={{
                fontFamily: "var(--font-geist-mono), monospace", fontSize: "8px",
                color: progress >= t ? "rgba(56,165,50,0.6)" : "rgba(255,255,255,0.2)",
                transition: "color 0.3s",
              }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: "14px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em",
            }}>
              NCCS · NASTP · ISLAMABAD
            </span>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px", color: "rgba(56,165,50,0.45)", letterSpacing: "0.06em",
            }}>
              v2.4.1
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
