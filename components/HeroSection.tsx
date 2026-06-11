"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronDown, Activity, Globe, AlertTriangle, Lock } from "lucide-react";

const roles = [
  "THREAT INTELLIGENCE ANALYST",
  "ADVERSARY SIMULATION ENGINEER",
  "MALWARE REVERSE ENGINEER",
  "RED TEAM OPERATOR",
  "VULNERABILITY RESEARCHER",
];

const metrics = [
  { label: "CVEs Disclosed", value: 47, suffix: "", icon: AlertTriangle },
  { label: "Countries Monitored", value: 89, suffix: "", icon: Globe },
  { label: "Threat Actors Tracked", value: 312, suffix: "", icon: Activity },
  { label: "Systems Hardened", value: 1200, suffix: "+", icon: Lock },
];

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const steps = 60;
    const inc = target / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, duration / steps);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

function MetricCard({ m, index, active }: { m: typeof metrics[0]; index: number; active: boolean }) {
  const count = useCounter(m.value, active, 1600 + index * 200);
  const display = m.value >= 1000 ? `${(count / 1000).toFixed(1)}K${m.suffix}` : `${count}${m.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
      className="bg-cyber-bg p-6 flex items-center gap-4 group hover:bg-cyber-surface transition-colors cursor-default"
    >
      <m.icon className="w-5 h-5 text-cyber-accent shrink-0 group-hover:scale-110 transition-transform" />
      <div>
        <div
          className="text-2xl font-mono font-bold text-cyber-accent tabular-nums"
          style={{ textShadow: "0 0 12px rgba(0,255,136,0.4)" }}
        >
          {display}
        </div>
        <div className="text-cyber-muted text-xs font-mono tracking-wider mt-0.5">{m.label}</div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        timeRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      } else {
        timeRef.current = setTimeout(() => setTyping(false), 2400);
      }
    } else {
      if (displayed.length > 0) {
        timeRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => { if (timeRef.current) clearTimeout(timeRef.current); };
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,255,136,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3 mb-10"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyber-accent shrink-0"
                style={{ animation: "pulse-glow 2s infinite" }}
              />
              <span className="text-xs font-mono text-cyber-muted tracking-widest">
                CLEARANCE: TS/SCI — OPERATIVE ONLINE
              </span>
            </motion.div>

            {/* Glitch name */}
            <div className="mb-6 select-none">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-6xl lg:text-8xl font-bold font-mono tracking-tight leading-none"
              >
                <span className="text-cyber-text">ANIQA</span>
                <br />
                {/* Glitch layers */}
                <span className="relative inline-block">
                  <span
                    className="text-cyber-accent"
                    style={{ textShadow: "0 0 40px rgba(0,255,136,0.4)" }}
                  >
                    AYUB
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 text-cyber-accent opacity-80"
                    style={{ animation: "glitch-1 7s infinite", color: "#00ff88" }}
                  >
                    AYUB
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-60"
                    style={{ animation: "glitch-2 7s infinite 0.05s", color: "#ef4444" }}
                  >
                    AYUB
                  </span>
                </span>
              </motion.h1>
            </div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-6 mb-8"
            >
              <span className="text-cyber-muted font-mono text-sm tracking-widest">
                {displayed}
                <span
                  className="inline-block w-px h-3.5 bg-cyber-accent ml-0.5 align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-cyber-muted text-base leading-relaxed max-w-lg mb-10"
            >
              Weaponizing data to defend the digital frontier. Specializing in
              advanced persistent threat analysis, offensive security research,
              and enterprise threat intelligence platform development.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(0,255,136,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3 bg-cyber-accent text-cyber-bg font-mono font-bold text-xs tracking-widest rounded-sm hover:bg-cyber-accent-dim transition-colors"
                style={{ boxShadow: "0 0 20px rgba(0,255,136,0.25)" }}
              >
                VIEW INTEL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "rgba(0,255,136,0.07)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3 border border-cyber-accent/30 text-cyber-accent font-mono font-bold text-xs tracking-widest rounded-sm transition-colors"
              >
                ESTABLISH CONTACT
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center"
          >
            <RadarDisplay />
          </motion.div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-cyber-accent/10 border border-cyber-accent/10 rounded-sm overflow-hidden"
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} index={i} active={mounted} />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-cyber-muted flex items-center gap-2">
          <Terminal size={11} /> scroll to navigate
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={14} className="text-cyber-accent/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RadarDisplay() {
  const threats = [
    { angle: 35, ring: 0.3, critical: true, label: "APT-29" },
    { angle: 120, ring: 0.6, critical: false, label: "C2" },
    { angle: 210, ring: 0.45, critical: true, label: "0-day" },
    { angle: 290, ring: 0.7, critical: false, label: "Recon" },
    { angle: 165, ring: 0.85, critical: false, label: "Patched" },
    { angle: 310, ring: 0.35, critical: true, label: "Pivot" },
  ];

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="relative w-72 h-72 lg:w-80 lg:h-80"
    >
      <svg viewBox="0 0 320 320" className="w-full h-full">
        {[1, 0.75, 0.5, 0.25].map((r, i) => (
          <circle key={i} cx="160" cy="160" r={r * 140} fill="none" stroke="rgba(0,255,136,0.1)" strokeWidth="1" />
        ))}
        <line x1="160" y1="20" x2="160" y2="300" stroke="rgba(0,255,136,0.07)" strokeWidth="1" />
        <line x1="20" y1="160" x2="300" y2="160" stroke="rgba(0,255,136,0.07)" strokeWidth="1" />

        <g style={{ transformOrigin: "160px 160px", animation: "radar-sweep 4s linear infinite" }}>
          <path
            d={`M160,160 L${160 + 140 * Math.sin(0)},${160 - 140 * Math.cos(0)} A140,140 0 0,1 ${160 + 140 * Math.sin(Math.PI / 5)},${160 - 140 * Math.cos(Math.PI / 5)} Z`}
            fill="url(#sweepGrad)"
            opacity="0.5"
          />
        </g>

        <defs>
          <radialGradient id="sweepGrad" cx="0%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.25" />
          </radialGradient>
        </defs>

        {threats.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = 160 + t.ring * 140 * Math.sin(rad);
          const y = 160 - t.ring * 140 * Math.cos(rad);
          const color = t.critical ? "#ef4444" : "#00ff88";
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="2.5" fill={color} opacity="0.9" />
              <circle cx={x} cy={y} r="6" fill={color} opacity="0">
                <animate attributeName="r" values="2.5;10;2.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <text x={x + 5} y={y - 4} fill={color} fontSize="6.5" fontFamily="monospace" opacity="0.7">{t.label}</text>
            </g>
          );
        })}

        <circle cx="160" cy="160" r="3.5" fill="#00ff88" />
        <circle cx="160" cy="160" r="10" fill="none" stroke="#00ff88" strokeWidth="0.8" opacity="0.3" />
      </svg>

      {/* Animated corner brackets */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
          className={`absolute w-6 h-6 border-cyber-accent/40 ${cls}`}
        />
      ))}

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-mono text-cyber-muted/50 tracking-widest whitespace-nowrap">
        THREAT RADAR — LIVE
      </div>
    </motion.div>
  );
}
