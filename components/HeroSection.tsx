"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  ChevronDown,
  Activity,
  Globe,
  AlertTriangle,
  Lock,
} from "lucide-react";

const roles = [
  "THREAT INTELLIGENCE ANALYST",
  "ADVERSARY SIMULATION ENGINEER",
  "MALWARE REVERSE ENGINEER",
  "RED TEAM OPERATOR",
  "VULNERABILITY RESEARCHER",
];

const metrics = [
  { label: "CVEs Disclosed", value: "47", icon: AlertTriangle, color: "text-cyber-accent" },
  { label: "Countries Monitored", value: "89", icon: Globe, color: "text-cyber-primary" },
  { label: "Threat Actors Tracked", value: "312", icon: Activity, color: "text-cyber-green" },
  { label: "Systems Hardened", value: "1.2K+", icon: Lock, color: "text-cyber-secondary" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        timeRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          55
        );
      } else {
        timeRef.current = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          28
        );
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-green/40 bg-cyber-green/10 text-cyber-green text-xs font-mono tracking-widest">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyber-green"
                  style={{ animation: "pulse-glow 1.5s infinite" }}
                />
                OPERATIVE ONLINE
              </span>
              <span className="text-cyber-muted text-xs font-mono">
                CLEARANCE: TS/SCI
              </span>
            </div>

            {/* Name */}
            <div className="mb-4">
              <h1 className="text-5xl lg:text-7xl font-bold font-mono tracking-tight leading-none">
                <span className="text-cyber-text">ANIQA</span>
                <br />
                <span
                  className="text-cyber-primary"
                  style={{
                    textShadow:
                      "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
                  }}
                >
                  AYUB
                </span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="h-8 mb-8">
              <span className="text-cyber-secondary font-mono text-sm lg:text-base tracking-widest font-semibold">
                {displayed}
                <span
                  className="inline-block w-0.5 h-4 bg-cyber-secondary ml-0.5 align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </span>
            </div>

            {/* Description */}
            <p className="text-cyber-muted text-base leading-relaxed max-w-lg mb-10">
              Weaponizing data to defend the digital frontier. Specializing in
              advanced persistent threat analysis, offensive security research,
              and enterprise threat intelligence platform development.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 bg-cyber-primary text-cyber-bg font-mono font-bold text-sm tracking-widest rounded hover:bg-cyber-primary/90 transition-all"
                style={{
                  boxShadow: "0 0 30px rgba(0,212,255,0.4)",
                }}
              >
                VIEW INTEL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 border border-cyber-primary/40 text-cyber-primary font-mono font-bold text-sm tracking-widest rounded hover:bg-cyber-primary/10 transition-all"
              >
                ESTABLISH CONTACT
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Radar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <RadarDisplay />
          </motion.div>
        </div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass-panel cyber-border p-5 flex items-center gap-4 hover:border-cyber-primary/40 transition-all"
            >
              <m.icon className={`w-6 h-6 ${m.color} shrink-0`} />
              <div>
                <div
                  className={`text-2xl font-mono font-bold ${m.color}`}
                  style={{ textShadow: "0 0 10px currentColor" }}
                >
                  {m.value}
                </div>
                <div className="text-cyber-muted text-xs font-mono tracking-wider">
                  {m.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Terminal hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 text-cyber-muted text-xs font-mono">
          <Terminal size={12} />
          <span>scroll to navigate</span>
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={16} className="text-cyber-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RadarDisplay() {
  const rings = [1, 0.75, 0.5, 0.25];
  const threats = [
    { angle: 35, ring: 0.3, color: "#ff3860", label: "APT-29" },
    { angle: 120, ring: 0.6, color: "#ff8c00", label: "C2" },
    { angle: 210, ring: 0.45, color: "#ff3860", label: "0-day" },
    { angle: 290, ring: 0.7, color: "#ffd700", label: "Recon" },
    { angle: 165, ring: 0.85, color: "#00ff88", label: "Patched" },
    { angle: 310, ring: 0.35, color: "#ff8c00", label: "Pivot" },
  ];

  return (
    <div className="relative w-72 h-72 lg:w-80 lg:h-80">
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(0,212,255,0.2))" }}
      >
        {/* Rings */}
        {rings.map((r, i) => (
          <circle
            key={i}
            cx="160"
            cy="160"
            r={r * 140}
            fill="none"
            stroke="rgba(0,212,255,0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Cross hairs */}
        <line x1="160" y1="20" x2="160" y2="300" stroke="rgba(0,212,255,0.1)" strokeWidth="1" />
        <line x1="20" y1="160" x2="300" y2="160" stroke="rgba(0,212,255,0.1)" strokeWidth="1" />

        {/* Sweep */}
        <g style={{ transformOrigin: "160px 160px", animation: "radar-sweep 4s linear infinite" }}>
          <path
            d="M160,160 L160,20 A140,140 0 0,1 160,20 Z"
            fill="none"
          />
          <path
            d={`M160,160 L${160 + 140 * Math.sin(0)},${160 - 140 * Math.cos(0)} A140,140 0 0,1 ${160 + 140 * Math.sin(Math.PI / 6)},${160 - 140 * Math.cos(Math.PI / 6)} Z`}
            fill="url(#sweepGrad)"
            opacity="0.4"
          />
        </g>

        <defs>
          <radialGradient id="sweepGrad" cx="0%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Threat dots */}
        {threats.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = 160 + t.ring * 140 * Math.sin(rad);
          const y = 160 - t.ring * 140 * Math.cos(rad);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill={t.color} />
              <circle cx={x} cy={y} r="8" fill={t.color} opacity="0.2">
                <animate
                  attributeName="r"
                  values="3;12;3"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0;0.4"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={x + 6}
                y={y - 5}
                fill={t.color}
                fontSize="7"
                fontFamily="monospace"
                opacity="0.8"
              >
                {t.label}
              </text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx="160" cy="160" r="4" fill="#00d4ff" />
        <circle cx="160" cy="160" r="12" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-primary/60" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-primary/60" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-primary/60" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-primary/60" />

      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-cyber-primary/60 tracking-widest">
        THREAT RADAR — LIVE
      </div>
    </div>
  );
}
