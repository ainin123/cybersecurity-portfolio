"use client";

import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

const NET_NODES: { id: number; x: number; y: number; label?: string; central?: boolean }[] = [
  { id: 0,  x: 300, y: 440, central: true },
  { id: 1,  x: 185, y: 275, label: "FIREWALL" },
  { id: 2,  x: 415, y: 275, label: "IDS/IPS"  },
  { id: 3,  x: 145, y: 450, label: "ENDPOINT" },
  { id: 4,  x: 455, y: 450, label: "SIEM"     },
  { id: 5,  x: 215, y: 625, label: "SOC"      },
  { id: 6,  x: 385, y: 625, label: "CLOUD"    },
  { id: 7,  x: 90,  y: 185 },
  { id: 8,  x: 510, y: 185 },
  { id: 9,  x: 65,  y: 555 },
  { id: 10, x: 535, y: 555 },
  { id: 11, x: 155, y: 775 },
  { id: 12, x: 445, y: 775 },
  { id: 13, x: 300, y: 155 },
  { id: 14, x: 300, y: 745 },
];

const NET_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 7], [1, 2], [1, 3],
  [2, 8], [2, 4],
  [3, 7], [3, 9], [3, 5],
  [4, 8], [4, 10], [4, 6],
  [5, 9], [5, 11], [5, 6],
  [6, 10], [6, 12],
  [7, 13], [8, 13],
  [9, 11], [10, 12],
  [11, 14], [12, 14],
];

const BINARY_ROWS = [
  { text: "01001000 01000101 01001100", x: 22,  y: 80  },
  { text: "10110011 11001010 01110001", x: 55,  y: 830 },
  { text: "11001010 01110001 10101010", x: 340, y: 112 },
  { text: "01010101 10101010 11110000", x: 310, y: 812 },
];

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
        {/* ── Network topology visualization — right panel ── */}
        <div style={{
          position: "absolute",
          top: 0, right: 0,
          width: isMobile ? "100%" : "52%",
          height: "100%",
          overflow: "hidden",
        }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 900"
            preserveAspectRatio="xMidYMid slice"
            style={{ display: "block" }}
          >
            <defs>
              <radialGradient id="ls-net-bg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#0d1f0d" />
                <stop offset="100%" stopColor="#020810" />
              </radialGradient>
              <filter id="ls-node-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="ls-center-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            <rect width="600" height="900" fill="url(#ls-net-bg)" />

            {/* Grid dots */}
            {Array.from({ length: 150 }, (_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              return (
                <circle
                  key={`g-${i}`}
                  cx={col * 60 + 30}
                  cy={row * 60 + 30}
                  r="1.2"
                  fill="rgba(56,165,50,0.10)"
                />
              );
            })}

            {/* Edges */}
            {NET_EDGES.map(([a, b], i) => {
              const na = NET_NODES[a], nb = NET_NODES[b];
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y}
                  x2={nb.x} y2={nb.y}
                  stroke="rgba(56,165,50,0.20)"
                  strokeWidth="1"
                  strokeDasharray={i % 4 === 0 ? "4 7" : undefined}
                />
              );
            })}

            {/* Animated data packets */}
            {NET_EDGES.slice(0, 12).map(([a, b], i) => {
              const na = NET_NODES[a], nb = NET_NODES[b];
              return (
                <circle key={i} r="2.5" fill="#38a532" filter="url(#ls-node-glow)">
                  <animateMotion
                    dur={`${2.4 + i * 0.62}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.42}s`}
                    path={`M ${na.x} ${na.y} L ${nb.x} ${nb.y}`}
                  />
                </circle>
              );
            })}

            {/* Nodes */}
            {NET_NODES.map((n) => (
              <g key={n.id}>
                {n.central ? (
                  <>
                    {/* Outer pulse ring */}
                    <circle cx={n.x} cy={n.y} r="42" fill="none" stroke="rgba(56,165,50,0.08)" strokeWidth="1">
                      <animate attributeName="r"       values="42;62;42" dur="3.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="3.6s" repeatCount="indefinite" />
                    </circle>
                    {/* Inner pulse ring */}
                    <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="rgba(56,165,50,0.20)" strokeWidth="1">
                      <animate attributeName="r"       values="30;42;30" dur="3.6s" repeatCount="indefinite" begin="0.65s" />
                      <animate attributeName="opacity" values="0.7;0.1;0.7" dur="3.6s" repeatCount="indefinite" begin="0.65s" />
                    </circle>
                    {/* Core */}
                    <circle
                      cx={n.x} cy={n.y} r="18"
                      fill="rgba(56,165,50,0.12)"
                      stroke="rgba(56,165,50,0.60)"
                      strokeWidth="1.5"
                      filter="url(#ls-center-glow)"
                    />
                    {/* Shield body */}
                    <path
                      d={`M ${n.x} ${n.y-11} L ${n.x+8} ${n.y-7} L ${n.x+8} ${n.y+1} Q ${n.x+8} ${n.y+10} ${n.x} ${n.y+13} Q ${n.x-8} ${n.y+10} ${n.x-8} ${n.y+1} L ${n.x-8} ${n.y-7} Z`}
                      fill="rgba(56,165,50,0.75)"
                      stroke="rgba(56,165,50,0.95)"
                      strokeWidth="1"
                      filter="url(#ls-center-glow)"
                    />
                    {/* Checkmark */}
                    <path
                      d={`M ${n.x-3.5} ${n.y+2} L ${n.x-0.5} ${n.y+5} L ${n.x+4.5} ${n.y-3}`}
                      fill="none"
                      stroke="#020810"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Label */}
                    <text
                      x={n.x} y={n.y + 30}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="7"
                      fill="rgba(56,165,50,0.60)"
                      letterSpacing="3"
                    >
                      SECURE CORE
                    </text>
                  </>
                ) : (
                  <>
                    <circle
                      cx={n.x} cy={n.y} r="7"
                      fill="rgba(56,165,50,0.07)"
                      stroke="rgba(56,165,50,0.35)"
                      strokeWidth="1"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur={`${2.2 + (n.id % 4) * 0.4}s`}
                        repeatCount="indefinite"
                        begin={`${n.id * 0.28}s`}
                      />
                    </circle>
                    <circle cx={n.x} cy={n.y} r="2.5" fill="rgba(56,165,50,0.85)" />
                    {n.label && (
                      <text
                        x={n.x} y={n.y - 14}
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize="7"
                        fill="rgba(56,165,50,0.48)"
                        letterSpacing="1"
                      >
                        {n.label}
                      </text>
                    )}
                  </>
                )}
              </g>
            ))}

            {/* Floating binary strings */}
            {BINARY_ROWS.map((row, i) => (
              <text
                key={i}
                x={row.x}
                y={row.y}
                fontFamily="monospace"
                fontSize="8"
                fill="rgba(56,165,50,0.15)"
                letterSpacing="2"
              >
                {row.text}
                <animate attributeName="opacity" values="0.08;0.22;0.08" dur={`${4.5 + i * 1.1}s`} repeatCount="indefinite" />
              </text>
            ))}
          </svg>
        </div>

        {/* Overlay: heavier on mobile so text stays readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: isMobile
            ? "rgba(2,8,16,0.82)"
            : "linear-gradient(to right, #020810 0%, #020810 36%, rgba(2,8,16,0.93) 46%, rgba(2,8,16,0.60) 58%, rgba(2,8,16,0.18) 75%, transparent 100%)",
        }} />

        {/* Top & bottom vignette */}
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
          width: isMobile ? "100%" : "50%",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
          padding: isMobile ? "0 clamp(24px, 8vw, 48px)" : "0 0 0 clamp(32px, 7vw, 96px)",
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
            margin: "20px 0 20px", maxWidth: isMobile ? "260px" : "340px",
          }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(56,165,50,0.5)", flexShrink: 0 }} />
            <span style={{ fontSize: "7px", color: "rgba(56,165,50,0.5)", letterSpacing: "3px" }}>◆ ◆</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(56,165,50,0.4), transparent)" }} />
          </div>

          {/* Role chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: "7px", alignItems: isMobile ? "center" : "flex-start" }}>
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security"].map((role) => (
              <span key={role} style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px", letterSpacing: "0.05em",
                color: "rgba(56,165,50,0.95)",
                display: "inline-block", alignSelf: isMobile ? "center" : "flex-start",
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
