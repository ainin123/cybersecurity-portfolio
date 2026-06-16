"use client";

import { useState } from "react";

const CX = 250;
const CY = 250;

function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  };
}

const THREATS = [
  { name: "Malware", angle: 30, r: 160, severity: "CRITICAL", count: "2,847", delay: "0s", color: "#FF4444" },
  { name: "Phishing", angle: 80, r: 100, severity: "HIGH", count: "1,203", delay: "0.3s", color: "#38a532" },
  { name: "Botnets", angle: 140, r: 200, severity: "HIGH", count: "892", delay: "0.6s", color: "#38a532" },
  { name: "Ransomware", angle: 200, r: 130, severity: "CRITICAL", count: "456", delay: "0.9s", color: "#FF4444" },
  { name: "APT Groups", angle: 280, r: 180, severity: "CRITICAL", count: "127", delay: "1.2s", color: "#FF4444" },
  { name: "Insider Threats", angle: 330, r: 80, severity: "MEDIUM", count: "78", delay: "1.5s", color: "rgba(56,165,50,0.6)" },
];

interface TooltipState {
  name: string;
  severity: string;
  count: string;
  x: number;
  y: number;
}

export default function ThreatRadar() {
  const [hovered, setHovered] = useState<TooltipState | null>(null);

  return (
    <section
      id="radar"
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
            THREAT INTELLIGENCE RADAR
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          Active{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Threat Landscape
          </span>
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "60px",
            maxWidth: "560px",
          }}
        >
          Real-time visualization of monitored threat categories and their activity levels
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Radar SVG */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "480px",
            }}
          >
            <svg
              viewBox="0 0 500 500"
              style={{ width: "100%", overflow: "visible" }}
              aria-label="Threat Intelligence Radar"
            >
              {/* Concentric circles */}
              {[60, 120, 180, 240].map((r) => (
                <circle
                  key={r}
                  cx={CX}
                  cy={CY}
                  r={r}
                  fill="none"
                  stroke="rgba(56,165,50,0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Crosshairs */}
              <line x1={CX} y1={CY - 245} x2={CX} y2={CY + 245} stroke="rgba(56,165,50,0.15)" strokeWidth="1" />
              <line x1={CX - 245} y1={CY} x2={CX + 245} y2={CY} stroke="rgba(56,165,50,0.15)" strokeWidth="1" />
              <line x1={CX - 173} y1={CY - 173} x2={CX + 173} y2={CY + 173} stroke="rgba(56,165,50,0.07)" strokeWidth="1" />
              <line x1={CX + 173} y1={CY - 173} x2={CX - 173} y2={CY + 173} stroke="rgba(56,165,50,0.07)" strokeWidth="1" />

              {/* Radar sweep — rotating group */}
              <g
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  animation: "radar-sweep 4s linear infinite",
                }}
              >
                {/* Sweep line */}
                <line
                  x1={CX}
                  y1={CY}
                  x2={CX}
                  y2={CY - 240}
                  stroke="rgba(56,165,50,0.8)"
                  strokeWidth="1.5"
                />
                {/* Sweep arc fill */}
                <path
                  d={`M ${CX} ${CY} L ${CX} ${CY - 240} A 240 240 0 0 1 ${CX + 240 * Math.sin(Math.PI / 6)} ${CY - 240 * Math.cos(Math.PI / 6)} Z`}
                  fill="url(#sweepGradient)"
                  opacity="0.3"
                />
              </g>

              {/* Gradient for sweep */}
              <defs>
                <radialGradient id="sweepGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                  gradientTransform={`translate(${CX} ${CY}) scale(240)`}>
                  <stop offset="0%" stopColor="rgba(56,165,50,0.4)" />
                  <stop offset="100%" stopColor="rgba(56,165,50,0)" />
                </radialGradient>
              </defs>

              {/* Threat nodes */}
              {THREATS.map((threat) => {
                const pos = polarToXY(threat.angle, threat.r);
                return (
                  <g
                    key={threat.name}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered({ name: threat.name, severity: threat.severity, count: threat.count, x: pos.x, y: pos.y })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Outer pulsing ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={14}
                      fill="none"
                      stroke={threat.color}
                      strokeWidth="1.5"
                      opacity="0.5"
                      style={{
                        animation: `attack-pulse 2s ease-in-out infinite`,
                        animationDelay: threat.delay,
                        transformOrigin: `${pos.x}px ${pos.y}px`,
                      }}
                    />
                    {/* Inner circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={5}
                      fill={threat.color}
                      opacity="0.9"
                    />
                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y + 24}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.65)"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {threat.name}
                    </text>
                  </g>
                );
              })}

              {/* Center crosshair */}
              <circle cx={CX} cy={CY} r={8} fill="none" stroke="rgba(56,165,50,0.5)" strokeWidth="1" />
              <circle cx={CX} cy={CY} r={3} fill="#38a532" />
              <line x1={CX - 14} y1={CY} x2={CX + 14} y2={CY} stroke="rgba(56,165,50,0.6)" strokeWidth="1" />
              <line x1={CX} y1={CY - 14} x2={CX} y2={CY + 14} stroke="rgba(56,165,50,0.6)" strokeWidth="1" />

              {/* SCANNING text */}
              <text
                x={CX}
                y={CY + 26}
                textAnchor="middle"
                fill="#38a532"
                fontSize="8"
                fontFamily="monospace"
                letterSpacing="2"
                opacity="0.8"
              >
                SCANNING
              </text>

              {/* Tooltip */}
              {hovered && (
                <g>
                  <rect
                    x={Math.min(hovered.x - 10, 390)}
                    y={hovered.y - 60}
                    width={110}
                    height={52}
                    rx="6"
                    fill="rgba(2,8,16,0.95)"
                    stroke="rgba(56,165,50,0.3)"
                    strokeWidth="1"
                  />
                  <text
                    x={Math.min(hovered.x - 10, 390) + 8}
                    y={hovered.y - 40}
                    fill="#FFFFFF"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {hovered.name}
                  </text>
                  <text
                    x={Math.min(hovered.x - 10, 390) + 8}
                    y={hovered.y - 26}
                    fill={hovered.severity === "CRITICAL" ? "#FF4444" : hovered.severity === "HIGH" ? "#38a532" : "rgba(56,165,50,0.5)"}
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {hovered.severity}
                  </text>
                  <text
                    x={Math.min(hovered.x - 10, 390) + 8}
                    y={hovered.y - 14}
                    fill="rgba(255,255,255,0.65)"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    Events: {hovered.count}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {THREATS.map((threat) => (
              <div
                key={threat.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(2,8,16,0.7)",
                  border: "1px solid rgba(56,165,50,0.1)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: threat.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {threat.name}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: threat.severity === "CRITICAL" ? "#FF4444" : threat.severity === "HIGH" ? "#38a532" : "rgba(56,165,50,0.5)",
                    fontFamily: "var(--font-geist-mono), monospace",
                    marginLeft: "2px",
                  }}
                >
                  {threat.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
