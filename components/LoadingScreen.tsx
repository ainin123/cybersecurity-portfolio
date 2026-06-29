"use client";

import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress from 0→100 over ~2.4 s, then fade out
    const start = performance.now();
    const duration = 2400;

    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(pct));
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        // Hold at 100% briefly then fade
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => onComplete(), 800);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/loading.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(2,8,16,0.82) 0%, rgba(4,22,10,0.75) 50%, rgba(2,8,16,0.82) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          padding: "0 24px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Status dot */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#38a532",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(56,165,50,0.85)",
              textTransform: "uppercase",
            }}
          >
            Initialising Secure Session
          </span>
        </div>

        {/* Welcome heading */}
        <div>
          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 48px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Welcome to my
          </h1>
          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: 0,
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Cyber Portfolio
          </h1>
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.04em",
            }}
          >
            Aniqa Ayub · Cybersecurity Researcher & SIEM Engineer
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              height: "3px",
              borderRadius: "100px",
              backgroundColor: "rgba(56,165,50,0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: "100px",
                background: "linear-gradient(to right, rgba(56,165,50,0.6), #38a532)",
                transition: "width 0.05s linear",
                boxShadow: "0 0 12px rgba(56,165,50,0.5)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <span>LOADING</span>
            <span style={{ color: "rgba(56,165,50,0.7)" }}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
