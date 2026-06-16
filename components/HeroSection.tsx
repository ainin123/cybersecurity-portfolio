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

// ─── Continent polygon data (simplified lat/lon outlines) ─────────────────────
const CONTINENTS: [number, number][][] = [
  // North America
  [[70,-140],[70,-95],[70,-70],[60,-64],[45,-53],[44,-66],[40,-74],
   [25,-80],[25,-90],[15,-85],[10,-83],[8,-77],[20,-87],[22,-105],
   [32,-117],[40,-124],[49,-124],[54,-130],[60,-140],[70,-140]],
  // South America
  [[10,-62],[11,-70],[11,-73],[5,-77],[0,-80],[-5,-81],[-18,-71],
   [-33,-72],[-56,-67],[-55,-65],[-33,-52],[-22,-43],[-5,-35],[0,-50],[10,-62]],
  // Europe
  [[71,28],[60,28],[56,21],[54,14],[58,8],[60,5],[58,-3],[51,-2],
   [48,-5],[43,-9],[36,-6],[36,5],[38,15],[42,28],[46,30],[52,22],
   [60,24],[64,26],[71,28]],
  // Africa
  [[37,10],[30,32],[22,37],[15,42],[10,42],[4,42],[-5,40],[-10,40],
   [-17,35],[-34,26],[-34,18],[-17,12],[0,9],[5,2],[8,-5],
   [15,-17],[28,-13],[37,10]],
  // Asia
  [[71,28],[71,60],[71,140],[55,135],[43,142],[38,140],[35,140],
   [30,122],[22,115],[10,110],[1,104],[4,98],[10,98],[15,100],
   [22,100],[28,97],[28,85],[22,80],[8,77],[22,80],[28,75],
   [22,70],[22,57],[15,50],[10,45],[0,42],[10,45],[10,50],
   [18,57],[25,57],[37,56],[42,50],[42,28],[46,30],[52,22],
   [60,24],[64,26],[71,28]],
  // Australia
  [[-16,136],[-12,132],[-15,129],[-22,113],[-33,115],[-35,117],
   [-34,122],[-31,130],[-32,133],[-37,139],[-38,143],[-38,148],
   [-28,153],[-18,146],[-14,141],[-16,136]],
  // Greenland
  [[83,-40],[83,-10],[76,-18],[72,-22],[76,-57],[80,-60],[83,-40]],
  // Japan (simplified)
  [[31,130],[36,136],[38,141],[44,145],[44,141],[41,140],[38,141],[35,137],[31,130]],
  // New Zealand (simplified)
  [[-34,172],[-35,174],[-36,175],[-41,175],[-46,168],[-42,171],[-34,172]],
  // UK (simplified)
  [[50,-5],[58,-3],[58,0],[51,1],[50,-1],[50,-5]],
  // Madagascar
  [[-13,49],[-14,50],[-25,47],[-25,44],[-18,43],[-13,49]],
];

// Country labels with lat/lon positions
const LABELS = [
  { name: "RUSSIA",     lat: 60,  lon: 80  },
  { name: "CHINA",      lat: 32,  lon: 105 },
  { name: "USA",        lat: 40,  lon: -98 },
  { name: "INDIA",      lat: 22,  lon: 80  },
  { name: "BRAZIL",     lat: -14, lon: -52 },
  { name: "GERMANY",    lat: 51,  lon: 10  },
  { name: "JAPAN",      lat: 36,  lon: 138 },
  { name: "AUSTRALIA",  lat: -25, lon: 134 },
  { name: "UK",         lat: 54,  lon: -2  },
  { name: "CANADA",     lat: 58,  lon: -100},
  { name: "FRANCE",     lat: 46,  lon: 2   },
  { name: "S.KOREA",    lat: 37,  lon: 128 },
];

// Attack source/target city coordinates
const CITIES: [number, number][] = [
  [38, -97],   // 0  USA
  [35, 104],   // 1  China
  [56,  60],   // 2  Russia
  [51,  -1],   // 3  UK
  [-14,-52],   // 4  Brazil
  [21,  79],   // 5  India
  [36, 138],   // 6  Japan
  [51,  10],   // 7  Germany
  [-25,134],   // 8  Australia
  [37, 128],   // 9  S. Korea
  [46,   2],   // 10 France
  [56,-100],   // 11 Canada
  [55,  37],   // 12 Moscow
  [31, 121],   // 13 Shanghai
  [28,  77],   // 14 India (Delhi)
  [35, 139],   // 15 Tokyo
  [48,   2],   // 16 Paris
  [52,  13],   // 17 Berlin
  [41, -74],   // 18 New York
  [34,-118],   // 19 Los Angeles
  [1,  104],   // 20 Singapore
  [37,  55],   // 21 Iran
  [30,  31],   // 22 Egypt
  [40, -4],    // 23 Spain
];

// Attack definitions
const ATTACK_DEFS = [
  { s:1,  t:0,  c:"#FF4444" }, { s:2,  t:3,  c:"#FF6B35" },
  { s:0,  t:1,  c:"#00BFFF" }, { s:4,  t:0,  c:"#A855F7" },
  { s:6,  t:5,  c:"#10B981" }, { s:2,  t:7,  c:"#F59E0B" },
  { s:1,  t:6,  c:"#EC4899" }, { s:9,  t:0,  c:"#14B8A6" },
  { s:13, t:3,  c:"#F97316" }, { s:5,  t:3,  c:"#6366F1" },
  { s:12, t:18, c:"#FF3366" }, { s:1,  t:18, c:"#00E5FF" },
  { s:2,  t:18, c:"#FF4500" }, { s:7,  t:18, c:"#FFD700" },
  { s:15, t:18, c:"#FF69B4" }, { s:1,  t:19, c:"#7CFC00" },
  { s:2,  t:11, c:"#FF8C00" }, { s:13, t:18, c:"#DA70D6" },
  { s:20, t:5,  c:"#00FA9A" }, { s:21, t:18, c:"#FF6347" },
  { s:22, t:7,  c:"#40E0D0" }, { s:1,  t:16, c:"#EE82EE" },
  { s:2,  t:23, c:"#FFA500" }, { s:9,  t:5,  c:"#ADFF2F" },
  { s:13, t:6,  c:"#FF1493" }, { s:2,  t:10, c:"#1E90FF" },
];

// ─── Threat Globe ─────────────────────────────────────────────────────────────
function ThreatGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotDeg = 20; // start showing Asia-Pacific
    let time = 0;

    // Mutable attack state
    const attacks = ATTACK_DEFS.map((d, i) => ({
      ...d,
      progress: (i / ATTACK_DEFS.length),
      speed: 0.004 + Math.random() * 0.004,
    }));

    // Stars (generated once)
    const STARS: { x: number; y: number; r: number; a: number }[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      // Re-seed stars relative to canvas size
      STARS.length = 0;
      for (let i = 0; i < 180; i++) {
        STARS.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2,
          a: 0.2 + Math.random() * 0.6,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const getR = () => Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.42;
    const getCx = () => canvas.offsetWidth / 2;
    const getCy = () => canvas.offsetHeight / 2;

    const project = (lat: number, lon: number) => {
      const R = getR(), cx = getCx(), cy = getCy();
      const latR = (lat * Math.PI) / 180;
      const lonR = ((lon + rotDeg) * Math.PI) / 180;
      const x = cx + R * Math.cos(latR) * Math.sin(lonR);
      const y = cy - R * Math.sin(latR);
      const z = R * Math.cos(latR) * Math.cos(lonR);
      return { x, y, z, visible: z > 0 };
    };

    const bezierPt = (
      p0: { x: number; y: number },
      c: { x: number; y: number },
      p1: { x: number; y: number },
      t: number
    ) => ({
      x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * c.x + t * t * p1.x,
      y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t * t * p1.y,
    });

    const animate = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const R = getR(), cx = getCx(), cy = getCy();

      ctx.clearRect(0, 0, W, H);
      time++;

      // 1. Starfield
      STARS.forEach((s) => {
        const twinkle = s.a * (0.7 + 0.3 * Math.sin(time * 0.02 + s.x));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${twinkle})`;
        ctx.fill();
      });

      // 2. Atmosphere glow (outer ring)
      const atmGrad = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.18);
      atmGrad.addColorStop(0, "rgba(0,180,120,0.12)");
      atmGrad.addColorStop(1, "transparent");
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // 3. Globe ocean
      const oceanGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.15, 0, cx, cy, R);
      oceanGrad.addColorStop(0, "rgba(10,50,55,0.95)");
      oceanGrad.addColorStop(0.6, "rgba(5,25,35,0.97)");
      oceanGrad.addColorStop(1, "rgba(2,10,18,1)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // 4. Continent silhouettes (clipped to globe)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, Math.PI * 2);
      ctx.clip();

      CONTINENTS.forEach((poly) => {
        ctx.beginPath();
        let penDown = false;
        poly.forEach(([lat, lon]) => {
          const p = project(lat, lon);
          if (p.z > 0) {
            if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true; }
            else ctx.lineTo(p.x, p.y);
          } else {
            penDown = false;
          }
        });
        ctx.closePath();
        ctx.fillStyle = "rgba(35,65,45,0.85)";
        ctx.fill();
        ctx.strokeStyle = "rgba(55,100,70,0.4)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      ctx.restore();

      // 5. Globe rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,200,130,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Highlight arc (top-left sheen)
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI * 1.15, Math.PI * 1.65);
      ctx.strokeStyle = "rgba(100,220,180,0.15)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // 6. Attack arcs
      attacks.forEach((atk) => {
        const src = project(CITIES[atk.s][0], CITIES[atk.s][1]);
        const tgt = project(CITIES[atk.t][0], CITIES[atk.t][1]);

        if (!src.visible && !tgt.visible) {
          atk.progress = (atk.progress + atk.speed) % 1;
          return;
        }

        const dist = Math.hypot(tgt.x - src.x, tgt.y - src.y);
        const ctrl = {
          x: (src.x + tgt.x) / 2,
          y: (src.y + tgt.y) / 2 - dist * 0.5 - 20,
        };

        // Draw trail up to current progress
        const steps = 80;
        const endStep = Math.floor(atk.progress * steps);
        if (endStep > 1) {
          ctx.beginPath();
          for (let i = 0; i <= endStep; i++) {
            const t = i / steps;
            const pt = bezierPt(src, ctrl, tgt, t);
            const alpha = (i / endStep) * 0.9;
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = atk.c;
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Moving head with glow
        const head = bezierPt(src, ctrl, tgt, atk.progress);
        ctx.shadowColor = atk.c;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = atk.c;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Source marker (small square, like Kaspersky)
        if (src.visible) {
          const pulse = Math.sin(time * 0.08 + atk.s) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.rect(src.x - 2.5, src.y - 2.5, 5, 5);
          ctx.fillStyle = `${atk.c}`;
          ctx.globalAlpha = 0.5 + pulse * 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        atk.progress = (atk.progress + atk.speed) % 1;
      });

      // 7. Country labels
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      LABELS.forEach((lbl) => {
        const p = project(lbl.lat, lbl.lon);
        if (p.z < R * 0.1) return; // only show when clearly visible
        const alpha = Math.min(1, (p.z / R) * 2);
        ctx.fillStyle = `rgba(180,220,200,${alpha * 0.7})`;
        ctx.fillText(lbl.name, p.x, p.y);
      });
      ctx.textAlign = "left";

      rotDeg += 0.06; // slow steady rotation
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "7px 14px",
        background: "rgba(5,15,25,0.9)",
        border: "1px solid rgba(0,200,130,0.2)",
        borderRadius: "8px",
        fontFamily: "var(--font-geist-mono), monospace",
      }}>
        <span style={{ fontSize: "11px", color: "#00C882", letterSpacing: "0.12em", fontWeight: 700 }}>
          REALTIME THREAT MONITOR
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#FF3333",
            animation: "pulse-dot 1s ease-in-out infinite", display: "inline-block",
          }} />
          <span style={{ fontSize: "10px", color: "#FF3333", letterSpacing: "0.1em", fontWeight: 700 }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Globe */}
      <div style={{
        position: "relative", width: "100%", aspectRatio: "1 / 1",
        borderRadius: "12px", overflow: "hidden",
        background: "#020810",
        border: "1px solid rgba(0,200,130,0.08)",
        boxShadow: "0 0 80px rgba(0,180,100,0.06)",
      }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {[
          { label: "ATTACKS/DAY",  value: "178M+" },
          { label: "IOCs TRACKED", value: "1,247"  },
          { label: "FEEDS ONLINE", value: "47"      },
        ].map((s) => (
          <div key={s.label} style={{
            background: "rgba(5,15,25,0.9)",
            border: "1px solid rgba(0,200,130,0.12)",
            borderRadius: "8px", padding: "10px 8px", textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#00C882", lineHeight: 1 }}>
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
    glowRef.current.style.background =
      `radial-gradient(400px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,229,255,0.06), transparent 70%)`;
  };

  return (
    <section
      id="hero" ref={sectionRef} onMouseMove={handleMouseMove}
      style={{
        position: "relative", minHeight: "100vh", overflow: "hidden",
        paddingTop: isDesktop ? "120px" : "100px",
        paddingBottom: isDesktop ? "80px" : "60px",
        paddingLeft: isDesktop ? "48px" : "24px",
        paddingRight: isDesktop ? "48px" : "24px",
        display: "flex", alignItems: "center",
      }}
    >
      <div ref={glowRef} style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1, transition:"background 0.1s" }} />
      <div className="grid-overlay" style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }} />
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,229,255,0.05) 0%, transparent 65%)",
      }} />

      <div style={{
        position:"relative", zIndex:2, maxWidth:"1280px", margin:"0 auto", width:"100%",
        display:"grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
        gap:"48px", alignItems:"center",
      }}>
        {/* ── LEFT ── */}
        <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, ease:"easeOut" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 14px",
            borderRadius:"4px", border:"1px solid rgba(0,229,255,0.25)",
            backgroundColor:"rgba(0,229,255,0.06)", marginBottom:"28px",
            fontFamily:"var(--font-geist-mono), monospace",
          }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:"#00E5FF", animation:"pulse-dot 2s ease-in-out infinite", flexShrink:0 }} />
            <span style={{ fontSize:"11px", fontWeight:600, color:"#00E5FF", letterSpacing:"0.12em", textTransform:"uppercase" }}>
              [ THREAT INTELLIGENCE PLATFORM ]
            </span>
          </div>

          <h1 style={{ fontFamily:"var(--font-geist-mono), monospace", fontWeight:800, lineHeight:1.0, marginBottom:"20px", letterSpacing:"-0.02em" }}>
            <span style={{ display:"block", color:"#CCD6F6", fontSize:"clamp(52px, 8vw, 88px)" }}>ANIQA</span>
            <span style={{
              display:"block", fontSize:"clamp(52px, 8vw, 88px)",
              background:"linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>AYUB</span>
          </h1>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"24px" }}>
            {["Cybersecurity Researcher","SIEM Engineer","AI Security Engineer"].map((r) => (
              <span key={r} style={{
                padding:"4px 12px", borderRadius:"100px",
                border:"1px solid rgba(0,229,255,0.2)", backgroundColor:"rgba(0,229,255,0.06)",
                fontSize:"12px", fontWeight:500, color:"#8892B0",
                fontFamily:"var(--font-geist-mono), monospace", letterSpacing:"0.04em",
              }}>{r}</span>
            ))}
          </div>

          <p style={{ fontSize:"16px", lineHeight:1.7, color:"#8892B0", maxWidth:"520px", marginBottom:"28px" }}>
            Building enterprise-grade security systems that detect what traditional tools miss.
          </p>

          <div style={{
            display:"flex", alignItems:"center", gap:"10px", marginBottom:"36px",
            padding:"8px 14px", borderRadius:"6px",
            backgroundColor:"rgba(0,229,255,0.04)", border:"1px solid rgba(0,229,255,0.12)",
            width:"fit-content",
          }}>
            <span style={{ width:"7px", height:"7px", borderRadius:"50%", backgroundColor:"#00E5FF", animation:"pulse-dot 1.5s ease-in-out infinite", flexShrink:0 }} />
            <span style={{ fontFamily:"var(--font-geist-mono), monospace", fontSize:"11px", fontWeight:600, color:"#00E5FF", letterSpacing:"0.1em" }}>
              STATUS: MONITORING GLOBAL THREAT LANDSCAPE
            </span>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
            <motion.a href="/resume.pdf" download whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"11px 22px", borderRadius:"8px",
                background:"linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.7))",
                color:"#0A192F", fontWeight:700, fontSize:"14px",
                textDecoration:"none", boxShadow:"0 0 24px rgba(0,229,255,0.25)",
              }}>
              <Download size={15} />
              Download Resume
            </motion.a>
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"11px 22px", borderRadius:"8px",
                border:"1px solid rgba(0,229,255,0.4)", color:"#00E5FF",
                fontWeight:600, fontSize:"14px", background:"transparent",
                cursor:"pointer", transition:"all 0.2s",
              }}>
              <AtSign size={15} />
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* ── RIGHT: Globe ── */}
        <motion.div
          initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.9, delay:0.3, ease:"easeOut" }}
        >
          <ThreatGlobe />
        </motion.div>
      </div>

      {mounted && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
          style={{
            position:"absolute", bottom:"32px", left:"50%", transform:"translateX(-50%)",
            display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", zIndex:3,
          }}>
          <span style={{ fontSize:"11px", fontFamily:"var(--font-geist-mono), monospace", color:"#475569", letterSpacing:"0.08em" }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ repeat:Infinity, duration:2 }}>
            <ChevronDown size={16} color="#475569" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
