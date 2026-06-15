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

// ─── Holographic Canvas Scene ───────────────────────────────────────────────

function HoloScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // ── Particles ──
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }
    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1 + Math.random(),
        opacity: 0.1 + Math.random() * 0.3,
      }));
    };

    // ── Binary columns ──
    interface BinCol {
      x: number;
      chars: { y: number; ch: string }[];
    }
    let binCols: BinCol[] = [];

    const initBinCols = (h: number) => {
      binCols = [60, 250, 420].map((x) => ({
        x,
        chars: Array.from({ length: 14 }, (_, i) => ({
          y: (i / 14) * h,
          ch: Math.random() > 0.5 ? "1" : "0",
        })),
      }));
    };

    // ── Radar blips ──
    interface Blip {
      angle: number;
      r: number;
      pulse: number;
    }
    const blips: Blip[] = [
      { angle: 0.8, r: 22, pulse: 0 },
      { angle: 2.1, r: 40, pulse: 0.5 },
      { angle: 3.8, r: 30, pulse: 1.2 },
    ];

    const panelOffsets = [0, 1.5, 3, 4.5];
    let scanY = 0;
    let radarAngle = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initParticles(w, h);
      initBinCols(h);
    };

    resize();
    window.addEventListener("resize", resize);

    const roundRect = (
      x: number, y: number, w: number, h: number, r: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const animate = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);
      time++;
      scanY += 0.5;
      if (scanY > H) scanY = 0;
      radarAngle += 0.018;

      // 1. Background depth glow
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
      bgGrad.addColorStop(0, "rgba(0,229,255,0.04)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Three holographic monitors
      const monitors = [
        { x: 20,  y: 80,  w: 155, h: 108, skewX: -0.14, dataOffset: 0 },
        { x: 145, y: 50,  w: 195, h: 128, skewX: 0,     dataOffset: 7 },
        { x: 310, y: 80,  w: 155, h: 108, skewX: 0.14,  dataOffset: 14 },
      ];

      monitors.forEach((m) => {
        ctx.save();
        ctx.transform(1, 0, m.skewX, 1, -m.y * m.skewX, 0);

        roundRect(m.x, m.y, m.w, m.h, 6);
        ctx.fillStyle = "rgba(0,229,255,0.04)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,229,255,0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        roundRect(m.x, m.y, m.w, 16, 3);
        ctx.fillStyle = "rgba(0,229,255,0.08)";
        ctx.fill();

        [[m.x + 8, m.y + 8], [m.x + 18, m.y + 8], [m.x + 28, m.y + 8]].forEach(([cx, cy], ci) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,229,255,${0.2 + ci * 0.15})`;
          ctx.fill();
        });

        const scanLocal = ((time + m.dataOffset * 4) % (m.h - 16)) + m.y + 16;
        const scanGrad = ctx.createLinearGradient(m.x, scanLocal - 8, m.x, scanLocal + 2);
        scanGrad.addColorStop(0, "transparent");
        scanGrad.addColorStop(1, "rgba(0,229,255,0.18)");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(m.x + 2, scanLocal - 8, m.w - 4, 10);

        for (let row = 0; row < 6; row++) {
          const ry = m.y + 22 + row * 13;
          if (ry + 7 > m.y + m.h - 4) break;
          const isActive = row === Math.floor((time / 40 + m.dataOffset) % 6);
          const alpha = isActive ? 0.35 : 0.1;
          ctx.fillStyle = `rgba(0,229,255,${alpha})`;
          ctx.fillRect(m.x + 6, ry, m.w * 0.35, 7);
          ctx.fillRect(m.x + 6 + m.w * 0.35 + 6, ry, m.w * 0.35, 7);
        }

        ctx.restore();
      });

      // 3. Researcher figure
      const figX = 245, figY = 270;

      const haloGrad = ctx.createRadialGradient(figX, figY + 30, 0, figX, figY + 30, 80);
      haloGrad.addColorStop(0, "rgba(0,229,255,0.06)");
      haloGrad.addColorStop(1, "transparent");
      ctx.fillStyle = haloGrad;
      ctx.fillRect(figX - 80, figY - 50, 160, 160);

      // hair
      ctx.beginPath();
      ctx.arc(figX, figY, 22, Math.PI, 0);
      ctx.fillStyle = "rgba(0,229,255,0.2)";
      ctx.fill();

      // head
      ctx.beginPath();
      ctx.arc(figX, figY, 18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,229,255,0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,229,255,0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // neck
      ctx.fillStyle = "rgba(0,229,255,0.12)";
      ctx.fillRect(figX - 5, figY + 17, 10, 15);

      // body
      roundRect(figX - 30, figY + 30, 60, 70, 8);
      ctx.fillStyle = "rgba(0,229,255,0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,229,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // shoulders
      ctx.beginPath();
      ctx.moveTo(figX - 42, figY + 35);
      ctx.bezierCurveTo(figX - 28, figY + 24, figX + 28, figY + 24, figX + 42, figY + 35);
      ctx.strokeStyle = "rgba(0,229,255,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // left arm
      ctx.beginPath();
      ctx.moveTo(figX - 30, figY + 38);
      ctx.bezierCurveTo(figX - 50, figY + 60, figX - 58, figY + 82, figX - 55, figY + 92);
      ctx.strokeStyle = "rgba(0,229,255,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // right arm
      ctx.beginPath();
      ctx.moveTo(figX + 30, figY + 38);
      ctx.bezierCurveTo(figX + 50, figY + 60, figX + 58, figY + 82, figX + 55, figY + 92);
      ctx.stroke();

      // 4. Desk & keyboard
      ctx.beginPath();
      ctx.moveTo(0, 370);
      ctx.lineTo(W, 370);
      ctx.strokeStyle = "rgba(0,229,255,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      roundRect(180, 358, 130, 22, 4);
      ctx.strokeStyle = "rgba(0,229,255,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 3; row++) {
          ctx.beginPath();
          ctx.arc(186 + col * 12, 362 + row * 7, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,229,255,0.2)";
          ctx.fill();
        }
      }

      // 5. Floating UI panels
      const panels = [
        { x: 10,  y: 10,  w: 120, h: 55, label: "THREAT LEVEL", offset: panelOffsets[0] },
        { x: 350, y: 20,  w: 110, h: 50, label: "ACTIVE FEEDS: 47", offset: panelOffsets[1] },
        { x: 15,  y: 280, w: 100, h: 45, label: "ML MODEL: 98%", offset: panelOffsets[2] },
        { x: 370, y: 290, w: 100, h: 40, label: "CVEs TODAY: 12", offset: panelOffsets[3] },
      ];

      panels.forEach((p) => {
        const floatY = p.y + Math.sin(time * 0.001 + p.offset) * 5;
        roundRect(p.x, floatY, p.w, p.h, 6);
        ctx.fillStyle = "rgba(0,229,255,0.05)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,229,255,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "rgba(0,229,255,0.8)";
        ctx.font = "8px monospace";
        ctx.fillText(p.label, p.x + 8, floatY + 16);

        const barW = (p.w - 16) * 0.7;
        ctx.fillStyle = "rgba(0,229,255,0.08)";
        ctx.fillRect(p.x + 8, floatY + 24, p.w - 16, 6);
        ctx.fillStyle = "rgba(0,229,255,0.5)";
        ctx.fillRect(
          p.x + 8, floatY + 24,
          barW * (0.6 + Math.sin(time * 0.005 + p.offset) * 0.2),
          6
        );
      });

      // 6. Network connection lines (animated dashes)
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -(time * 0.02);
      ctx.strokeStyle = "rgba(0,229,255,0.2)";
      ctx.lineWidth = 0.8;

      const connections: [number, number, number, number][] = [
        [130, 35, 145, 50],
        [340, 20, 340, 80],
        [70,  55, 145, 80],
        [310, 80, 350, 45],
        [65, 280, 145, 180],
        [115, 280, 200, 220],
        [370, 290, 340, 195],
        [245, 268, 245, 180],
        [120,  35, 200,  50],
        [420, 305, 400, 130],
      ];
      connections.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // 7. Data particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        const dx = figX - p.x, dy = figY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 10) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
        }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.8) { p.vx *= 0.8 / speed; p.vy *= 0.8 / speed; }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.opacity})`;
        ctx.fill();
      });

      // 8. Binary streams
      if (time % 4 === 0) {
        binCols.forEach((col) => {
          col.chars.forEach((c) => {
            c.y += 1.5;
            if (c.y > H + 10) {
              c.y = -10;
              c.ch = Math.random() > 0.5 ? "1" : "0";
            }
          });
        });
      }
      ctx.font = "9px monospace";
      binCols.forEach((col) => {
        col.chars.forEach((c) => {
          const fade = 1 - c.y / H;
          ctx.fillStyle = `rgba(0,229,255,${0.12 * Math.max(0, fade)})`;
          ctx.fillText(c.ch, col.x, c.y);
        });
      });

      // 9. Scanning beam
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(W, scanY);
      ctx.strokeStyle = "rgba(0,229,255,0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.stroke();
      const beamGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY);
      beamGrad.addColorStop(0, "transparent");
      beamGrad.addColorStop(1, "rgba(0,229,255,0.06)");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, scanY - 20, W, 20);

      // 10. Radar
      const rCx = 60, rCy = H - 60, rMax = 50;
      [20, 35, 50].forEach((r) => {
        ctx.beginPath();
        ctx.arc(rCx, rCy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,229,255,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(rCx, rCy);
      ctx.lineTo(rCx + Math.cos(radarAngle) * rMax, rCy + Math.sin(radarAngle) * rMax);
      ctx.strokeStyle = "rgba(0,229,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      blips.forEach((b) => {
        b.pulse = (b.pulse + 0.05) % (Math.PI * 2);
        const bx = rCx + Math.cos(b.angle) * b.r;
        const by = rCy + Math.sin(b.angle) * b.r;
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${0.4 + Math.sin(b.pulse) * 0.3})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/3",
        border: "1px solid rgba(0,229,255,0.1)",
        borderRadius: "16px",
        background: "radial-gradient(ellipse at center, rgba(0,229,255,0.03) 0%, transparent 70%)",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(0,229,255,0.05), inset 0 0 60px rgba(0,229,255,0.02)",
        minHeight: "400px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

// ─── Main HeroSection ────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.1s",
        }}
      />

      {/* Background grid overlay */}
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      {/* Radial bg glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,229,255,0.05) 0%, transparent 65%)",
        }}
      />

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
          {/* Platform badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "4px",
              border: "1px solid rgba(0,229,255,0.25)",
              backgroundColor: "rgba(0,229,255,0.06)",
              marginBottom: "28px",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00E5FF",
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#00E5FF",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              [ THREAT INTELLIGENCE PLATFORM ]
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 800,
              lineHeight: 1.0,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#CCD6F6",
                fontSize: "clamp(52px, 8vw, 88px)",
              }}
            >
              ANIQA
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(52px, 8vw, 88px)",
                background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AYUB
            </span>
          </h1>

          {/* Role pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {["Cybersecurity Researcher", "SIEM Engineer", "AI Security Engineer"].map((role) => (
              <span
                key={role}
                style={{
                  padding: "4px 12px",
                  borderRadius: "100px",
                  border: "1px solid rgba(0,229,255,0.2)",
                  backgroundColor: "rgba(0,229,255,0.06)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#8892B0",
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {role}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#8892B0",
              maxWidth: "520px",
              marginBottom: "28px",
            }}
          >
            Building enterprise-grade security systems that detect what traditional tools miss.
          </p>

          {/* Live status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "36px",
              padding: "8px 14px",
              borderRadius: "6px",
              backgroundColor: "rgba(0,229,255,0.04)",
              border: "1px solid rgba(0,229,255,0.12)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#00E5FF",
                animation: "pulse-dot 1.5s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                fontWeight: 600,
                color: "#00E5FF",
                letterSpacing: "0.1em",
              }}
            >
              STATUS: MONITORING GLOBAL THREAT LANDSCAPE
            </span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.7))",
                color: "#0A192F",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(0,229,255,0.25)",
              }}
            >
              <Download size={15} />
              Download Resume
            </motion.a>

            <motion.button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "8px",
                border: "1px solid rgba(0,229,255,0.4)",
                color: "#00E5FF",
                fontWeight: 600,
                fontSize: "14px",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <AtSign size={15} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: Holographic Scene ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <HoloScene />

          {/* Terminal prompt label */}
          <div
            style={{
              marginTop: "14px",
              padding: "8px 16px",
              background: "rgba(10,25,47,0.9)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FF5F57", display: "inline-block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FFBD2E", display: "inline-block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#28C840", display: "inline-block" }} />
            </div>
            <span style={{ fontSize: "13px", color: "#00E5FF", letterSpacing: "0.06em" }}>
              aniqa@cyber-lab:~$
            </span>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "14px",
                backgroundColor: "#00E5FF",
                animation: "blink 1s step-end infinite",
                opacity: 0.8,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#475569",
              letterSpacing: "0.08em",
            }}
          >
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
