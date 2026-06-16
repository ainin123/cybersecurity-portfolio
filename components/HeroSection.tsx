"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, AtSign } from "lucide-react";

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ─── Threat Globe ─────────────────────────────────────────────────────────────

function ThreatGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotDeg = 0;
    let time = 0;

    const CITIES = [
      { lat: 38,  lon: -97  }, // USA
      { lat: 35,  lon: 104  }, // China
      { lat: 56,  lon: 60   }, // Russia
      { lat: 51,  lon: -1   }, // UK
      { lat: -14, lon: -52  }, // Brazil
      { lat: 21,  lon: 79   }, // India
      { lat: 36,  lon: 138  }, // Japan
      { lat: 51,  lon: 10   }, // Germany
      { lat: -25, lon: 134  }, // Australia
      { lat: 37,  lon: 128  }, // S. Korea
      { lat: 46,  lon: 2    }, // France
      { lat: 56,  lon: -106 }, // Canada
      { lat: 1,   lon: 37   }, // Kenya
      { lat: 24,  lon: 45   }, // Saudi Arabia
    ];

    const attacks = [
      { src: 1, tgt: 0,  color: "#FF4444", progress: 0,    speed: 0.006 },
      { src: 2, tgt: 3,  color: "#FF6B35", progress: 0.35, speed: 0.005 },
      { src: 0, tgt: 1,  color: "#00E5FF", progress: 0.6,  speed: 0.007 },
      { src: 4, tgt: 0,  color: "#A855F7", progress: 0.15, speed: 0.008 },
      { src: 6, tgt: 5,  color: "#10B981", progress: 0.8,  speed: 0.005 },
      { src: 2, tgt: 7,  color: "#F59E0B", progress: 0.5,  speed: 0.006 },
      { src: 1, tgt: 6,  color: "#EC4899", progress: 0.9,  speed: 0.007 },
      { src: 9, tgt: 0,  color: "#14B8A6", progress: 0.25, speed: 0.006 },
      { src: 13,tgt: 3,  color: "#F97316", progress: 0.45, speed: 0.005 },
      { src: 5, tgt: 3,  color: "#6366F1", progress: 0.7,  speed: 0.006 },
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (lat: number, lon: number) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const R = Math.min(W, H) * 0.4;
      const cx = W / 2;
      const cy = H / 2;
      const latR = (lat * Math.PI) / 180;
      const lonR = ((lon + rotDeg) * Math.PI) / 180;
      const x = cx + R * Math.cos(latR) * Math.sin(lonR);
      const y = cy - R * Math.sin(latR);
      const z = R * Math.cos(latR) * Math.cos(lonR);
      return { x, y, z, visible: z > -R * 0.1 };
    };

    const bezierPt = (
      p0: { x: number; y: number },
      ctrl: { x: number; y: number },
      p1: { x: number; y: number },
      t: number
    ) => ({
      x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * ctrl.x + t ** 2 * p1.x,
      y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * ctrl.y + t ** 2 * p1.y,
    });

    const animate = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const R = Math.min(W, H) * 0.4;
      const cx = W / 2;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);
      time++;

      // 1. Outer atmosphere glow
      const atmGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
      atmGrad.addColorStop(0, "rgba(0,229,255,0.07)");
      atmGrad.addColorStop(1, "transparent");
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe body
      const globeGrad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.2, R * 0.1, cx, cy, R);
      globeGrad.addColorStop(0, "rgba(0,100,120,0.55)");
      globeGrad.addColorStop(0.45, "rgba(0,55,90,0.65)");
      globeGrad.addColorStop(0.85, "rgba(0,20,50,0.8)");
      globeGrad.addColorStop(1, "rgba(0,10,30,0.9)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // Globe rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,229,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Grid lines clipped to globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, Math.PI * 2);
      ctx.clip();

      // Parallels
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let penDown = false;
        for (let lon = -180; lon <= 182; lon += 3) {
          const p = project(lat, lon);
          if (p.visible) {
            if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true; }
            else ctx.lineTo(p.x, p.y);
          } else penDown = false;
        }
        ctx.strokeStyle = lat === 0 ? "rgba(0,229,255,0.22)" : "rgba(0,229,255,0.09)";
        ctx.lineWidth = lat === 0 ? 1 : 0.5;
        ctx.stroke();
      }

      // Meridians
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let penDown = false;
        for (let lat = -85; lat <= 85; lat += 3) {
          const p = project(lat, lon);
          if (p.visible) {
            if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true; }
            else ctx.lineTo(p.x, p.y);
          } else penDown = false;
        }
        ctx.strokeStyle = "rgba(0,229,255,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Orbital rings
      const drawRing = (
        angle: number, rx: number, ry: number,
        color: string, dash: number[]
      ) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      };
      drawRing(-0.35, R * 1.28, R * 0.22, "rgba(0,229,255,0.25)", []);
      drawRing(0.9,   R * 1.18, R * 0.18, "rgba(168,85,247,0.2)", [4, 4]);
      drawRing(-1.1,  R * 1.1,  R * 0.14, "rgba(236,72,153,0.15)", [3, 6]);

      // Satellite dot on first ring
      const satAngle = (time * 0.012) % (Math.PI * 2);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);
      const satX = Math.cos(satAngle) * R * 1.28;
      const satY = Math.sin(satAngle) * R * 0.22;
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#00E5FF";
      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 5. Attack arcs
      attacks.forEach((atk) => {
        const src = project(CITIES[atk.src].lat, CITIES[atk.src].lon);
        const tgt = project(CITIES[atk.tgt].lat, CITIES[atk.tgt].lon);
        if (!src.visible || !tgt.visible) { atk.progress = (atk.progress + atk.speed) % 1; return; }

        const dist = Math.hypot(tgt.x - src.x, tgt.y - src.y);
        const ctrl = {
          x: (src.x + tgt.x) / 2,
          y: (src.y + tgt.y) / 2 - dist * 0.55,
        };

        // Trail gradient
        const grad = ctx.createLinearGradient(src.x, src.y, tgt.x, tgt.y);
        grad.addColorStop(0, `${atk.color}00`);
        grad.addColorStop(0.5, `${atk.color}99`);
        grad.addColorStop(1, atk.color);

        ctx.beginPath();
        const steps = 80;
        for (let i = 0; i <= Math.floor(atk.progress * steps); i++) {
          const t = i / steps;
          const pt = bezierPt(src, ctrl, tgt, t);
          i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Moving head dot with glow
        const head = bezierPt(src, ctrl, tgt, atk.progress);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = atk.color;
        ctx.shadowColor = atk.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        atk.progress = (atk.progress + atk.speed) % 1;
      });

      // 6. City dots
      CITIES.forEach((city, i) => {
        const p = project(city.lat, city.lon);
        if (!p.visible) return;
        const pulse = Math.sin(time * 0.06 + i * 1.1) * 0.5 + 0.5;

        // Pulse ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + pulse * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${0.04 + pulse * 0.06})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${0.65 + pulse * 0.35})`;
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rotDeg += 0.08;
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: "rgba(10,25,47,0.9)",
          border: "1px solid rgba(0,229,255,0.18)",
          borderRadius: "8px",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        <span style={{ fontSize: "11px", color: "#00E5FF", letterSpacing: "0.12em", fontWeight: 700 }}>
          REALTIME THREAT MONITOR
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "7px", height: "7px", borderRadius: "50%",
              backgroundColor: "#FF4444",
              animation: "pulse-dot 1.2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "10px", color: "#FF4444", letterSpacing: "0.1em", fontWeight: 600 }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Globe canvas */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "12px",
          overflow: "hidden",
          background: "radial-gradient(ellipse at center, rgba(0,40,60,0.4) 0%, rgba(5,10,20,0.95) 100%)",
          border: "1px solid rgba(0,229,255,0.1)",
          boxShadow: "0 0 60px rgba(0,229,255,0.06), inset 0 0 80px rgba(0,0,0,0.5)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
        }}
      >
        {[
          { label: "ACTIVE FEEDS", value: "47" },
          { label: "IOCs TRACKED", value: "1,247" },
          { label: "ML ACCURACY", value: "98.3%" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(10,25,47,0.85)",
              border: "1px solid rgba(0,229,255,0.12)",
              borderRadius: "8px",
              padding: "10px 8px",
              textAlign: "center",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#00E5FF", lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: "9px", color: "#475569", letterSpacing: "0.08em", marginTop: "4px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main HeroSection ────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,229,255,0.06), transparent 70%)`;
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        paddingTop: isDesktop ? "120px" : "100px",
        paddingBottom: isDesktop ? "80px" : "60px",
        paddingLeft: isDesktop ? "48px" : "24px",
        paddingRight: isDesktop ? "48px" : "24px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, transition: "background 0.1s" }} />
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,229,255,0.05) 0%, transparent 65%)",
      }} />

      {/* Two-column wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "4px",
            border: "1px solid rgba(0,229,255,0.25)",
            backgroundColor: "rgba(0,229,255,0.06)",
            marginBottom: "28px",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#00E5FF",
              animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#00E5FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              [ THREAT INTELLIGENCE PLATFORM ]
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-geist-mono), monospace", fontWeight: 800, lineHeight: 1.0, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "block", color: "#CCD6F6", fontSize: "clamp(52px, 8vw, 88px)" }}>ANIQA</span>
            <span style={{
              display: "block", fontSize: "clamp(52px, 8vw, 88px)",
              background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>AYUB</span>
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security Engineer"].map((role) => (
              <span key={role} style={{
                padding: "4px 12px", borderRadius: "100px",
                border: "1px solid rgba(0,229,255,0.2)",
                backgroundColor: "rgba(0,229,255,0.06)",
                fontSize: "12px", fontWeight: 500, color: "#8892B0",
                fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em",
              }}>{role}</span>
            ))}
          </div>

          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#8892B0", maxWidth: "520px", marginBottom: "28px" }}>
            Building enterprise-grade security systems that detect what traditional tools miss.
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px",
            padding: "8px 14px", borderRadius: "6px",
            backgroundColor: "rgba(0,229,255,0.04)",
            border: "1px solid rgba(0,229,255,0.12)",
            width: "fit-content",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              backgroundColor: "#00E5FF",
              animation: "pulse-dot 1.5s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, color: "#00E5FF", letterSpacing: "0.1em" }}>
              STATUS: MONITORING GLOBAL THREAT LANDSCAPE
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <motion.a
              href="/resume.pdf" download
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "8px",
                background: "linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.7))",
                color: "#0A192F", fontWeight: 700, fontSize: "14px",
                textDecoration: "none", boxShadow: "0 0 24px rgba(0,229,255,0.25)",
              }}
            >
              <Download size={15} />
              Download Resume
            </motion.a>

            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "8px",
                border: "1px solid rgba(0,229,255,0.4)",
                color: "#00E5FF", fontWeight: 600, fontSize: "14px",
                background: "transparent", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <AtSign size={15} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: Threat Globe ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <ThreatGlobe />
        </motion.div>
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{
            position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 3,
          }}
        >
          <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono), monospace", color: "#475569", letterSpacing: "0.08em" }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={16} color="#475569" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
