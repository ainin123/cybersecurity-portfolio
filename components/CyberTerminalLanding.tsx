"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const BOOT_LINES = [
  "[BOOTING CYBER THREAT INTELLIGENCE PLATFORM v2.4.1...]",
  "> Initializing Threat Monitoring Engine............. [OK]",
  "> Loading Security Research Database............... [OK]",
  "> Establishing Secure Connection (TLS 1.3)......... [OK]",
  "> Authenticating Analyst Profile................... [OK]",
  "> Synchronizing Threat Feeds (47 sources).......... [OK]",
  "> Loading MITRE ATT&CK Framework.................. [OK]",
  "> Calibrating ML Detection Models.................. [OK]",
  "> System Status: ONLINE",
  ">",
  "> ████████████████████████████████ 100%",
  ">",
  "> ACCESS GRANTED — Welcome, Analyst.",
];

const COMMAND_MAP: Record<string, string> = {
  p: "projects",
  a: "about",
  s: "metrics",
  t: "threat-landscape",
  m: "mitre",
  c: "projects",
  r: "research",
  x: "certifications",
  b: "__back__",
};

const TYPED_COMMANDS: Record<string, string | null> = {
  whoami: null,
  skills: "skills",
  "threat-status": null,
  certifications: "certifications",
  projects: "projects",
  help: null,
  clear: null,
  status: null,
  scan: null,
  matrix: null,
  hack: null,
  sudo: null,
  nmap: null,
};

function getCommandResponse(cmd: string): { text: string; navigate?: string; clear?: boolean } {
  const lower = cmd.trim().toLowerCase();
  switch (lower) {
    case "whoami":
      return { text: "Aniqa Ayub | Cybersecurity Researcher | AI Security Engineer | SIEM Specialist" };
    case "skills":
      return { text: "→ Navigating to Skills...", navigate: "skills" };
    case "threat-status":
      return { text: "Threat Monitoring: ACTIVE | 47 Feeds Online | 1,247 IOCs Tracked | Status: NOMINAL" };
    case "certifications":
      return { text: "→ Navigating to Certifications...", navigate: "certifications" };
    case "projects":
      return { text: "→ Navigating to Projects...", navigate: "projects" };
    case "help":
      return {
        text: [
          "AVAILABLE COMMANDS:",
          "  [P] Portfolio         → Security Case Studies",
          "  [A] About Analyst     → Profile & Background",
          "  [S] Security Metrics  → Performance Analytics",
          "  [T] Threat Intel      → Live Threat Feeds",
          "  [M] MITRE ATT&CK      → Expertise Matrix",
          "  [C] Case Studies      → Project Deep Dives",
          "  [R] Research          → Publications & Papers",
          "  [X] Certifications    → Credentials Repository",
          "  [B] Back              → Return to Command Center",
          "  whoami / skills / threat-status / certifications",
          "  projects / status / scan / clear",
        ].join("\n"),
      };
    case "clear":
      return { text: "", clear: true };
    case "status":
      return { text: "All systems operational. Uptime: 99.97%" };
    case "scan":
      return { text: "Initiating network scan... [████████████] Complete. 0 threats detected in local environment." };
    case "matrix":
      return { text: "Nice try. We don't do that here." };
    case "hack":
      return { text: "ACCESS DENIED — Unauthorized action logged." };
    case "sudo":
      return { text: "Nice try. Permission denied." };
    case "nmap":
      return { text: "Scanning... 65535 ports. 3 open (22, 80, 443). All secured." };
    case "p":
      return { text: "→ Navigating to Portfolio...", navigate: "projects" };
    case "a":
      return { text: "→ Navigating to About Analyst...", navigate: "about" };
    case "s":
      return { text: "→ Navigating to Security Metrics...", navigate: "metrics" };
    case "t":
      return { text: "→ Navigating to Threat Intelligence...", navigate: "threat-landscape" };
    case "m":
      return { text: "→ Navigating to MITRE ATT&CK...", navigate: "mitre" };
    case "c":
      return { text: "→ Navigating to Case Studies...", navigate: "projects" };
    case "r":
      return { text: "→ Navigating to Research...", navigate: "research" };
    case "x":
      return { text: "→ Navigating to Certifications...", navigate: "certifications" };
    case "h":
      return {
        text: [
          "AVAILABLE COMMANDS:",
          "  [P] Portfolio         → Security Case Studies",
          "  [A] About Analyst     → Profile & Background",
          "  [S] Security Metrics  → Performance Analytics",
          "  [T] Threat Intel      → Live Threat Feeds",
          "  [M] MITRE ATT&CK      → Expertise Matrix",
          "  [C] Case Studies      → Project Deep Dives",
          "  [R] Research          → Publications & Papers",
          "  [X] Certifications    → Credentials Repository",
          "  whoami / skills / threat-status / status / scan / clear",
        ].join("\n"),
      };
    default:
      return { text: `Command not found: ${cmd}. Type 'help' for available commands.` };
  }
}

interface Props {
  onNavigate: (sectionId: string) => void;
}

export default function CyberTerminalLanding({ onNavigate }: Props) {
  const [phase, setPhase] = useState<"boot" | "menu">("boot");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [currentBootLine, setCurrentBootLine] = useState(0);
  const [outputLines, setOutputLines] = useState<{ text: string; type: "input" | "output" | "error" | "nav" }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const pendingNavRef = useRef<string | null>(null);

  // Boot sequence — each line shown instantly, ~100ms apart → total ~2s
  useEffect(() => {
    if (phase !== "boot") return;
    if (currentBootLine >= BOOT_LINES.length) {
      const timer = setTimeout(() => setPhase("menu"), 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setBootLines((prev) => [...prev, BOOT_LINES[currentBootLine]]);
      setCurrentBootLine((l) => l + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [phase, currentBootLine]);

  // Escape key to skip boot
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "boot") {
        setPhase("menu");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase]);

  // Auto-focus input when menu phase
  useEffect(() => {
    if (phase === "menu" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  // Scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputLines]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      const result = getCommandResponse(trimmed);

      if (result.clear) {
        setOutputLines([]);
        setInputValue("");
        return;
      }

      const newLines: typeof outputLines = [];
      newLines.push({ text: `> ${trimmed}`, type: "input" });

      if (result.text) {
        // Multi-line output
        const lines = result.text.split("\n");
        lines.forEach((l) => {
          newLines.push({
            text: l,
            type: result.navigate ? "nav" : result.text.includes("DENIED") || result.text.includes("denied") ? "error" : "output",
          });
        });
      }

      setOutputLines((prev) => {
        const updated = [...prev, ...newLines];
        return updated.slice(-40); // keep last 40 lines
      });
      setInputValue("");

      if (result.navigate) {
        pendingNavRef.current = result.navigate;
        const timer = setTimeout(() => {
          if (pendingNavRef.current) {
            onNavigate(pendingNavRef.current);
            pendingNavRef.current = null;
          }
        }, 600);
        return () => clearTimeout(timer);
      }
    },
    [onNavigate]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(inputValue);
      return;
    }
    // Single-letter shortcut when input is empty
    if (inputValue === "" && e.key.length === 1) {
      const k = e.key.toLowerCase();
      if (COMMAND_MAP[k]) {
        e.preventDefault();
        const section = COMMAND_MAP[k];
        if (section === "__back__") {
          // B key just navigates to first section
          onNavigate("about");
        } else {
          processCommand(k);
        }
        return;
      }
    }
  };

  const handleMenuClick = (cmd: string) => {
    processCommand(cmd);
    if (inputRef.current) inputRef.current.focus();
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "#0A192F",
    fontFamily: "var(--font-geist-mono), monospace",
    color: "#CCD6F6",
    overflow: "hidden",
    zIndex: 100,
  };

  const scanLineStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(to right, transparent, rgba(0,229,255,0.4), transparent)",
    animation: "scan-sweep 4s linear infinite",
    pointerEvents: "none",
    zIndex: 10,
  };

  // ---- BOOT PHASE ----
  if (phase === "boot") {
    return (
      <div style={containerStyle}>
        <div style={scanLineStyle} />
        {/* SKIP button */}
        <button
          onClick={() => setPhase("menu")}
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            color: "#8892B0",
            background: "none",
            border: "1px solid rgba(0,229,255,0.2)",
            padding: "6px 14px",
            borderRadius: "4px",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px",
            cursor: "pointer",
            letterSpacing: "0.1em",
            zIndex: 20,
          }}
        >
          SKIP [ESC]
        </button>

        <div
          style={{
            padding: "60px 40px",
            maxWidth: "800px",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              lineHeight: "1.9",
              color: "#CCD6F6",
            }}
          >
            {bootLines.map((line, i) => {
              const isOk = line.endsWith("[OK]");
              const isGranted = line.includes("ACCESS GRANTED");
              const isHeader = line.startsWith("[BOOTING");
              return (
                <div
                  key={i}
                  style={{
                    color: isGranted ? "#00E5FF" : isHeader ? "rgba(0,229,255,0.9)" : "#CCD6F6",
                    fontWeight: isGranted || isHeader ? 700 : 400,
                  }}
                >
                  {isOk ? (
                    <>
                      <span>{line.slice(0, line.lastIndexOf("[OK]"))}</span>
                      <span style={{ color: "rgba(0,229,255,0.9)" }}>[OK]</span>
                    </>
                  ) : (
                    line
                  )}
                </div>
              );
            })}
            {currentBootLine < BOOT_LINES.length && (
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "14px",
                  backgroundColor: "#00E5FF",
                  animation: "blink 1s step-end infinite",
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- MENU PHASE ----
  const menuItems = [
    { key: "P", label: "Portfolio", desc: "Security Case Studies", cmd: "p" },
    { key: "A", label: "About Analyst", desc: "Profile & Background", cmd: "a" },
    { key: "S", label: "Security Metrics", desc: "Performance Analytics", cmd: "s" },
    { key: "T", label: "Threat Intelligence", desc: "Live Threat Feeds", cmd: "t" },
    { key: "M", label: "MITRE ATT&CK", desc: "Expertise Matrix", cmd: "m" },
    { key: "C", label: "Case Studies", desc: "Project Deep Dives", cmd: "c" },
    { key: "R", label: "Research", desc: "Publications & Papers", cmd: "r" },
    { key: "X", label: "Certifications", desc: "Credentials Repository", cmd: "x" },
    { key: "H", label: "Help", desc: "Command Reference", cmd: "h" },
  ];

  return (
    <div style={containerStyle} onClick={() => inputRef.current?.focus()}>
      <div style={scanLineStyle} />

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "760px",
            border: "1px solid rgba(0,229,255,0.3)",
            borderRadius: "4px",
            backgroundColor: "rgba(10,25,47,0.97)",
            boxShadow: "0 0 60px rgba(0,229,255,0.08), 0 0 120px rgba(0,0,0,0.6)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(0,229,255,0.2)",
              backgroundColor: "rgba(0,229,255,0.04)",
              fontSize: "12px",
              color: "#00E5FF",
              letterSpacing: "0.06em",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#00E5FF",
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            CYBER OPERATIONS COMMAND CENTER
          </div>

          {/* Body */}
          <div style={{ padding: "24px 24px 20px" }}>
            {/* Analyst info */}
            <div
              style={{
                marginBottom: "20px",
                fontSize: "12px",
                color: "#8892B0",
                lineHeight: "1.7",
              }}
            >
              <div>
                <span style={{ color: "#00E5FF" }}>ANALYST:</span> ANIQA AYUB
              </div>
              <div>
                <span style={{ color: "#00E5FF" }}>STATUS:</span> ACTIVE |{" "}
                <span style={{ color: "#00E5FF" }}>CLEARANCE:</span> LEVEL-5 |{" "}
                <span style={{ color: "#f59e0b" }}>THREAT LEVEL: ELEVATED</span>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid rgba(0,229,255,0.15)",
                marginBottom: "16px",
                paddingTop: "16px",
                fontSize: "11px",
                color: "rgba(0,229,255,0.6)",
                letterSpacing: "0.12em",
                textAlign: "center",
              }}
            >
              ══════════════ AVAILABLE OPERATIONS ══════════════
            </div>

            {/* Menu items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              {menuItems.map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleMenuClick(item.cmd)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    fontSize: "12px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      color: "#0A192F",
                      backgroundColor: "#00E5FF",
                      fontWeight: 700,
                      width: "20px",
                      height: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "3px",
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    {item.key}
                  </span>
                  <span style={{ color: "#CCD6F6", fontWeight: 600, minWidth: "160px" }}>{item.label}</span>
                  <span style={{ color: "#475569" }}>→</span>
                  <span style={{ color: "#8892B0" }}>{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid rgba(0,229,255,0.15)",
                marginBottom: "12px",
                paddingTop: "14px",
                fontSize: "11px",
                color: "rgba(0,229,255,0.6)",
                letterSpacing: "0.12em",
                textAlign: "center",
              }}
            >
              ══════════════════════════════════════════════════
            </div>

            {/* Terminal output history */}
            {outputLines.length > 0 && (
              <div
                ref={outputRef}
                style={{
                  maxHeight: "180px",
                  overflowY: "auto",
                  marginBottom: "8px",
                  padding: "8px 0",
                  borderTop: "1px solid rgba(0,229,255,0.08)",
                }}
              >
                {outputLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.6",
                      color:
                        line.type === "input"
                          ? "#00E5FF"
                          : line.type === "error"
                          ? "#FF4444"
                          : line.type === "nav"
                          ? "rgba(0,229,255,0.8)"
                          : "#8892B0",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
                padding: "8px 0",
                borderTop: "1px solid rgba(0,229,255,0.1)",
              }}
            >
              <span style={{ color: "#00E5FF", fontSize: "13px" }}>&gt;</span>
              <input
                ref={inputRef}
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#00E5FF",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "13px",
                  flex: 1,
                  caretColor: "#00E5FF",
                }}
                placeholder="Enter command..."
              />
              <span
                style={{
                  color: "#00E5FF",
                  animation: "blink 1s step-end infinite",
                  fontSize: "14px",
                }}
              >
                █
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              padding: "8px 20px",
              borderTop: "1px solid rgba(0,229,255,0.15)",
              backgroundColor: "rgba(0,229,255,0.02)",
              fontSize: "10px",
              color: "#475569",
              letterSpacing: "0.06em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>CYBER THREAT INTELLIGENCE PLATFORM v2.4.1</span>
            <span>TYPE COMMAND OR PRESS KEY SHORTCUT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
