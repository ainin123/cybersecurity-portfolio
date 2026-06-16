"use client";

import { useEffect, useState } from "react";

export default function FloatingTerminalNav({ onReturn }: { onReturn: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    const handleKey = (e: KeyboardEvent) => {
      if (
        (e.key === "b" || e.key === "B") &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        onReturn();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onReturn]);

  return (
    <button
      onClick={onReturn}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        background: "rgba(2,8,16,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(56,165,50,0.3)",
        color: "#38a532",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "11px",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        letterSpacing: "0.1em",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
        boxShadow: "0 0 20px rgba(56,165,50,0.1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      [ B ] COMMAND CENTER
    </button>
  );
}
