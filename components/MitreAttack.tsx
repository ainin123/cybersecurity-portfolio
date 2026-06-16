"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const TACTICS = [
  {
    id: "TA0043",
    name: "Reconnaissance",
    count: 4,
    proficiency: 88,
    techniques: ["T1595 - Active Scanning", "T1589 - Gather Victim Identity", "T1598 - Phishing for Info", "T1596 - Search Open Technical"],
  },
  {
    id: "TA0001",
    name: "Initial Access",
    count: 6,
    proficiency: 92,
    techniques: ["T1566 - Phishing", "T1190 - Exploit Public App", "T1133 - External Remote", "T1200 - Hardware Additions", "T1091 - Removable Media", "T1195 - Supply Chain"],
  },
  {
    id: "TA0003",
    name: "Persistence",
    count: 5,
    proficiency: 85,
    techniques: ["T1547 - Boot Autostart", "T1053 - Scheduled Task", "T1136 - Create Account", "T1543 - Create System Process", "T1505 - Server Software"],
  },
  {
    id: "TA0004",
    name: "Privilege Escalation",
    count: 4,
    proficiency: 80,
    techniques: ["T1548 - Abuse Elevation Control", "T1134 - Access Token Manip", "T1068 - Exploitation for PE", "T1055 - Process Injection"],
  },
  {
    id: "TA0005",
    name: "Defense Evasion",
    count: 7,
    proficiency: 90,
    techniques: ["T1562 - Impair Defenses", "T1070 - Indicator Removal", "T1036 - Masquerading", "T1112 - Modify Registry", "T1027 - Obfuscated Files", "T1055 - Process Injection", "T1218 - Signed Binary Proxy"],
  },
  {
    id: "TA0006",
    name: "Credential Access",
    count: 5,
    proficiency: 87,
    techniques: ["T1110 - Brute Force", "T1555 - Credentials from Stores", "T1212 - Exploitation for CA", "T1187 - Forced Authentication", "T1056 - Input Capture"],
  },
  {
    id: "TA0007",
    name: "Discovery",
    count: 6,
    proficiency: 93,
    techniques: ["T1087 - Account Discovery", "T1010 - Application Window", "T1217 - Browser Bookmark", "T1580 - Cloud Infrastructure", "T1083 - File and Directory", "T1046 - Network Service Scan"],
  },
  {
    id: "TA0008",
    name: "Lateral Movement",
    count: 3,
    proficiency: 75,
    techniques: ["T1210 - Exploitation of Remote", "T1534 - Internal Spearphishing", "T1021 - Remote Services"],
  },
  {
    id: "TA0009",
    name: "Collection",
    count: 4,
    proficiency: 82,
    techniques: ["T1560 - Archive Collected Data", "T1123 - Audio Capture", "T1119 - Automated Collection", "T1185 - Browser Session Hijack"],
  },
  {
    id: "TA0010",
    name: "Exfiltration",
    count: 3,
    proficiency: 78,
    techniques: ["T1048 - Exfiltration Over Alt Protocol", "T1041 - Exfiltration Over C2", "T1567 - Exfiltration Over Web"],
  },
];

export default function MitreAttack() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scanIndex, setScanIndex] = useState<number>(-1);
  const [scanDone, setScanDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scanStarted = useRef(false);

  // Sequential scan animation when section enters view
  useEffect(() => {
    if (!inView || scanStarted.current) return;
    scanStarted.current = true;
    let idx = 0;
    const interval = setInterval(() => {
      setScanIndex(idx);
      idx++;
      if (idx >= TACTICS.length) {
        clearInterval(interval);
        setTimeout(() => {
          setScanIndex(-1);
          setScanDone(true);
        }, 300);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="mitre"
      ref={ref}
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
              color: "#2596be",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            MITRE ATT&amp;CK COVERAGE
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
          Attack{" "}
          <span
            style={{
              background: "linear-gradient(to right, #2596be, rgba(37,150,190,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Framework Coverage
          </span>
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "48px",
          }}
        >
          Mapped techniques across the attack lifecycle
        </p>

        {/* Kill chain flow */}
        <div
          style={{
            overflowX: "auto",
            marginBottom: "48px",
            paddingBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              minWidth: "max-content",
              padding: "4px 0",
            }}
          >
            {TACTICS.map((tactic, i) => (
              <div key={tactic.id} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    backgroundColor: hoveredId === tactic.id ? "rgba(37,150,190,0.15)" : "rgba(2,8,16,0.8)",
                    border: "1px solid rgba(37,150,190,0.2)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={() => setHoveredId(tactic.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    style={{
                      fontSize: "9px",
                      color: "#2596be",
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.08em",
                      marginBottom: "2px",
                    }}
                  >
                    {tactic.id}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tactic.name}
                  </div>
                </div>
                {i < TACTICS.length - 1 && (
                  <div
                    style={{
                      width: "20px",
                      height: "1px",
                      backgroundColor: "rgba(37,150,190,0.3)",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "-3px",
                        width: "0",
                        height: "0",
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                        borderLeft: "6px solid rgba(37,150,190,0.3)",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tactic Cards Grid */}
        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {TACTICS.map((tactic, i) => {
            const isHovered = hoveredId === tactic.id;
            const isScanning = scanIndex === i;
            const highlight = isScanning || isHovered;
            return (
              <div
                key={tactic.id}
                onMouseEnter={() => setHoveredId(tactic.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: isScanning
                    ? "rgba(37,150,190,0.08)"
                    : "rgba(2,8,16,0.7)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: highlight ? "1px solid rgba(37,150,190,0.4)" : "1px solid rgba(37,150,190,0.12)",
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "default",
                  transition: "all 0.2s ease",
                  transform: isHovered ? "translateY(-4px)" : "none",
                  boxShadow: highlight ? "0 8px 32px rgba(37,150,190,0.1)" : "none",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#2596be",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tactic.id}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "100px",
                      backgroundColor: "rgba(37,150,190,0.1)",
                      border: "1px solid rgba(37,150,190,0.2)",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#2596be",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {tactic.count} techniques
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  {tactic.name}
                </h3>

                {/* Techniques */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "14px" }}>
                  {(isHovered ? tactic.techniques : tactic.techniques.slice(0, 3)).map((tech) => (
                    <div
                      key={tech}
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "var(--font-geist-mono), monospace",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <span style={{ color: "rgba(37,150,190,0.5)", flexShrink: 0 }}>▸</span>
                      {tech}
                    </div>
                  ))}
                  {!isHovered && tactic.techniques.length > 3 && (
                    <span style={{ fontSize: "10px", color: "rgba(37,150,190,0.5)", fontFamily: "monospace" }}>
                      +{tactic.techniques.length - 3} more...
                    </span>
                  )}
                </div>

                {/* Proficiency bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
                      Proficiency
                    </span>
                    <span style={{ fontSize: "10px", color: "#2596be", fontFamily: "monospace", fontWeight: 700 }}>
                      {tactic.proficiency}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      backgroundColor: "rgba(37,150,190,0.08)",
                      borderRadius: "100px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: scanDone || isHovered ? `${tactic.proficiency}%` : isScanning ? "100%" : "0%",
                        borderRadius: "100px",
                        background: "linear-gradient(to right, #2596be, rgba(37,150,190,0.5))",
                        transition: scanDone ? `width 0.8s ease-out ${i * 0.05}s` : "width 0.15s ease-out",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
