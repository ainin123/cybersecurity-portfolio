"use client";

import { useEffect, useState } from "react";

const TERMINAL_LINES = [
  { type: "cmd", text: "$ whoami" },
  { type: "out", text: "  aniqa-ayub — Cybersecurity Researcher & AI Security Engineer" },
  { type: "blank", text: "" },
  { type: "cmd", text: "$ cat current_focus.txt" },
  { type: "out", text: "  → AI-Powered Data Loss Prevention (DLP)" },
  { type: "out", text: "  → SIEM Engineering with Wazuh" },
  { type: "out", text: "  → Explainable AI for Security" },
  { type: "blank", text: "" },
  { type: "cmd", text: "$ ls specializations/" },
  { type: "out", text: "  threat-intelligence/  siem-engineering/  ai-security/  malware-analysis/" },
  { type: "blank", text: "" },
  { type: "cmd", text: "$ cat research_interests.txt" },
  { type: "out", text: "  → Transformer-based NLP for security classification" },
  { type: "out", text: "  → ML-driven anomaly detection in network traffic" },
  { type: "out", text: "  → XAI techniques for security model interpretability" },
  { type: "blank", text: "" },
  { type: "cursor", text: "$ _" },
];

export default function TerminalWidget() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= TERMINAL_LINES.length) {
      setDone(true);
      return;
    }

    const line = TERMINAL_LINES[currentLineIndex];

    if (line.type === "blank") {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { text: "", type: "blank" }]);
        setCurrentLineIndex((i) => i + 1);
        setCurrentCharIndex(0);
        setCurrentText("");
      }, 60);
      return () => clearTimeout(timeout);
    }

    if (currentCharIndex < line.text.length) {
      const speed = 20;
      const timeout = setTimeout(() => {
        setCurrentText(line.text.slice(0, currentCharIndex + 1));
        setCurrentCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const pause = line.type === "cmd" ? 300 : 60;
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { text: line.text, type: line.type }]);
        setCurrentLineIndex((i) => i + 1);
        setCurrentCharIndex(0);
        setCurrentText("");
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  const isTyping = !done && currentLineIndex < TERMINAL_LINES.length;

  return (
    <section
      id="terminal"
      style={{
        position: "relative",
        padding: "80px 0",
        backgroundColor: "#020810",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "rgba(2,8,16,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(37,150,190,0.15)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(37,150,190,0.06), 0 16px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Terminal chrome */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid rgba(37,150,190,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(2,8,16,0.8)",
            }}
          >
            <div style={{ display: "flex", gap: "7px" }}>
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#FF5F57" }} />
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#28C840" }} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.06em",
              }}
            >
              aniqa@cyber-lab:~$
            </span>
            <div style={{ width: "50px" }} />
          </div>

          {/* Terminal body */}
          <div
            style={{
              padding: "20px 20px 24px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "13px",
              lineHeight: "1.7",
              minHeight: "280px",
            }}
          >
            {displayedLines.map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.type === "cmd" ? "#2596be" : line.type === "blank" ? "transparent" : "rgba(255,255,255,0.65)",
                  marginBottom: "1px",
                }}
              >
                {line.text || " "}
              </div>
            ))}

            {/* Currently typing line */}
            {isTyping && currentLineIndex < TERMINAL_LINES.length && (
              <div
                style={{
                  color: TERMINAL_LINES[currentLineIndex].type === "cmd" ? "#2596be" : "rgba(255,255,255,0.65)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {currentText}
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "14px",
                    backgroundColor: "#2596be",
                    marginLeft: "1px",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            )}

            {/* Done — show blinking cursor */}
            {done && (
              <div style={{ color: "#2596be", display: "flex", alignItems: "center" }}>
                ${" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "14px",
                    backgroundColor: "#2596be",
                    marginLeft: "4px",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
