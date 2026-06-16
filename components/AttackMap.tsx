"use client";

import { useState, useEffect, useRef } from "react";

const CITIES = [
  { name: "New York", x: 220, y: 195 },
  { name: "London", x: 480, y: 160 },
  { name: "Moscow", x: 580, y: 145 },
  { name: "Beijing", x: 760, y: 185 },
  { name: "Tokyo", x: 830, y: 195 },
  { name: "Dubai", x: 615, y: 230 },
  { name: "Mumbai", x: 665, y: 240 },
  { name: "Singapore", x: 755, y: 275 },
  { name: "Sydney", x: 845, y: 360 },
  { name: "São Paulo", x: 285, y: 320 },
  { name: "Lagos", x: 490, y: 265 },
  { name: "Cairo", x: 555, y: 215 },
  { name: "Toronto", x: 210, y: 180 },
  { name: "Paris", x: 490, y: 168 },
  { name: "Seoul", x: 815, y: 188 },
];

const ATTACK_PAIRS = [
  [2, 0], [3, 1], [4, 1], [6, 5], [2, 7], [0, 3],
  [12, 1], [2, 8], [5, 9], [3, 10], [1, 4], [11, 0],
  [2, 6], [14, 1], [7, 12],
];

interface ActiveLine {
  src: number;
  dst: number;
  progress: number;
  id: number;
}

export default function AttackMap() {
  const [activeLines, setActiveLines] = useState<ActiveLine[]>([]);
  const [attackCount, setAttackCount] = useState(1247);
  const counterRef = useRef(0);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      const pair = ATTACK_PAIRS[Math.floor(Math.random() * ATTACK_PAIRS.length)];
      const newLine: ActiveLine = { src: pair[0], dst: pair[1], progress: 0, id: id++ };
      setActiveLines((prev) => [...prev.slice(-5), newLine]);
      setAttackCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setActiveLines((prev) =>
        prev
          .map((l) => ({ ...l, progress: Math.min(l.progress + 0.04, 1) }))
          .filter((l) => l.progress < 1)
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [activeLines]);

  return (
    <section
      id="attack-map"
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#020810",
      }}
    >
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: "16px" }}>
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
            GLOBAL CYBER ATTACK MAP
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          Global{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Threat Activity
          </span>
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "40px",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Simulated threat activity — real-time visualization
        </p>

        {/* Map container */}
        <div
          style={{
            background: "rgba(2,8,16,0.7)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(56,165,50,0.12)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "32px",
          }}
        >
          <svg
            viewBox="0 0 1000 500"
            style={{ width: "100%", display: "block" }}
            aria-label="Global Cyber Attack Map"
          >
            {/* Ocean background */}
            <rect x="0" y="0" width="1000" height="500" fill="#020810" />

            {/* Grid lines */}
            {[100, 200, 300, 400].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(56,165,50,0.04)" strokeWidth="1" />
            ))}
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(56,165,50,0.04)" strokeWidth="1" />
            ))}

            {/* Continents */}
            {/* North America */}
            <path
              d="M 100,90 L 240,82 L 280,110 L 265,185 L 220,240 L 158,230 L 100,185 Z"
              fill="rgba(56,165,50,0.06)"
              stroke="rgba(56,165,50,0.2)"
              strokeWidth="1"
            />
            {/* South America */}
            <path
              d="M 190,245 L 305,243 L 330,350 L 275,400 L 225,375 L 190,300 Z"
              fill="rgba(56,165,50,0.06)"
              stroke="rgba(56,165,50,0.2)"
              strokeWidth="1"
            />
            {/* Europe */}
            <path
              d="M 440,82 L 575,76 L 588,152 L 515,168 L 440,150 Z"
              fill="rgba(56,165,50,0.06)"
              stroke="rgba(56,165,50,0.2)"
              strokeWidth="1"
            />
            {/* Africa */}
            <path
              d="M 450,160 L 600,158 L 615,305 L 548,382 L 462,348 L 428,248 Z"
              fill="rgba(56,165,50,0.06)"
              stroke="rgba(56,165,50,0.2)"
              strokeWidth="1"
            />
            {/* Asia */}
            <path
              d="M 575,72 L 900,64 L 930,192 L 862,272 L 752,252 L 640,215 L 578,170 Z"
              fill="rgba(56,165,50,0.06)"
              stroke="rgba(56,165,50,0.2)"
              strokeWidth="1"
            />
            {/* Australia */}
            <path
              d="M 782,302 L 892,293 L 908,390 L 820,402 L 775,368 Z"
              fill="rgba(56,165,50,0.06)"
              stroke="rgba(56,165,50,0.2)"
              strokeWidth="1"
            />

            {/* Attack lines */}
            {activeLines.map((line) => {
              const src = CITIES[line.src];
              const dst = CITIES[line.dst];
              const p = line.progress;
              const cx = src.x + (dst.x - src.x) * p;
              const cy = src.y + (dst.y - src.y) * p - Math.sin(p * Math.PI) * 40;
              const opacity = p < 0.5 ? p * 2 : (1 - p) * 2;
              return (
                <g key={line.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="#FF4444"
                    opacity={opacity * 0.9}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="none"
                    stroke="#FF4444"
                    strokeWidth="1"
                    opacity={opacity * 0.4}
                  />
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={cx}
                    y2={cy}
                    stroke="rgba(255,68,68,0.4)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    opacity={opacity}
                  />
                </g>
              );
            })}

            {/* City dots */}
            {CITIES.map((city) => (
              <g key={city.name}>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={5}
                  fill="rgba(56,165,50,0.15)"
                  stroke="rgba(56,165,50,0.6)"
                  strokeWidth="1"
                  style={{ animation: "attack-pulse 3s ease-in-out infinite" }}
                />
                <circle cx={city.x} cy={city.y} r={2} fill="#38a532" />
                <text
                  x={city.x + 8}
                  y={city.y + 3}
                  fill="rgba(255,255,255,0.65)"
                  fontSize="7"
                  fontFamily="monospace"
                >
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Bottom panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              background: "rgba(2,8,16,0.7)",
              border: "1px solid rgba(56,165,50,0.12)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                fontFamily: "var(--font-geist-mono), monospace",
                color: "#FF4444",
                marginBottom: "6px",
              }}
            >
              {attackCount.toLocaleString()}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em" }}>
              ACTIVE THREATS
            </div>
          </div>

          <div
            style={{
              padding: "20px 24px",
              background: "rgba(2,8,16,0.7)",
              border: "1px solid rgba(56,165,50,0.12)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                fontFamily: "var(--font-geist-mono), monospace",
                color: "#38a532",
                marginBottom: "6px",
              }}
            >
              47
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em" }}>
              COUNTRIES TARGETED
            </div>
          </div>

          <div
            style={{
              padding: "20px 24px",
              background: "rgba(2,8,16,0.7)",
              border: "1px solid rgba(56,165,50,0.12)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}
            >
              ATTACK VECTORS
            </div>
            {["Phishing", "Ransomware", "APT", "Zero-Day", "Supply Chain"].map((v) => (
              <div
                key={v}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: "#38a532",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
