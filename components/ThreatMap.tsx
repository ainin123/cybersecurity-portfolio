"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Wifi, AlertOctagon, CheckCircle2 } from "lucide-react";

const threatNodes = [
  { x: 15, y: 30, label: "US-EAST", type: "origin", status: "active" },
  { x: 48, y: 25, label: "EU-WEST", type: "target", status: "warning" },
  { x: 72, y: 20, label: "RU-MOW", type: "source", status: "critical" },
  { x: 80, y: 38, label: "CN-SHA", type: "source", status: "critical" },
  { x: 62, y: 55, label: "IN-MUM", type: "target", status: "clear" },
  { x: 25, y: 55, label: "BR-SAO", type: "target", status: "warning" },
  { x: 50, y: 15, label: "UK-LON", type: "target", status: "active" },
  { x: 85, y: 55, label: "AU-SYD", type: "target", status: "clear" },
  { x: 35, y: 35, label: "CA-YYZ", type: "origin", status: "active" },
  { x: 55, y: 65, label: "NG-LOS", type: "target", status: "warning" },
];

const connections = [
  { from: 2, to: 0 },
  { from: 2, to: 1 },
  { from: 3, to: 1 },
  { from: 3, to: 4 },
  { from: 0, to: 6 },
  { from: 8, to: 1 },
  { from: 2, to: 9 },
  { from: 3, to: 7 },
];

const statusColors: Record<string, string> = {
  critical: "#ff3860",
  warning: "#ff8c00",
  active: "#00d4ff",
  origin: "#7c3aed",
  clear: "#00ff88",
};

const liveEvents = [
  { time: "00:00:12", src: "103.72.45.11", dst: "192.168.1.0/24", type: "C2 BEACON", sev: "CRITICAL" },
  { time: "00:00:08", src: "45.142.12.99", dst: "10.0.0.50", type: "EXFIL", sev: "HIGH" },
  { time: "00:00:05", src: "178.33.9.21", dst: "172.16.4.0", type: "RECON SCAN", sev: "MEDIUM" },
  { time: "00:00:02", src: "91.206.14.7", dst: "10.0.0.1", type: "BRUTE FORCE", sev: "HIGH" },
  { time: "00:00:01", src: "MISP FEED", dst: "—", type: "IOC MATCH", sev: "LOW" },
];

const sevColor: Record<string, string> = {
  CRITICAL: "#ff3860",
  HIGH: "#ff8c00",
  MEDIUM: "#ffd700",
  LOW: "#00ff88",
};

export default function ThreatMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const activeConn = tick % connections.length;

  return (
    <div ref={ref} className="w-full">
      <div className="glass-panel cyber-border overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-primary/15">
          <div className="flex items-center gap-3">
            <Wifi className="w-4 h-4 text-cyber-primary" />
            <span className="font-mono text-xs tracking-widest text-cyber-primary font-bold">
              GLOBAL THREAT MAP — LIVE FEED
            </span>
          </div>
          <div className="flex items-center gap-4">
            {[
              { label: "CRITICAL", count: 2, color: "#ff3860" },
              { label: "HIGH", count: 4, color: "#ff8c00" },
              { label: "MEDIUM", count: 7, color: "#ffd700" },
            ].map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-xs font-mono">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-cyber-muted">{s.label}</span>
                <span className="font-bold" style={{ color: s.color }}>
                  {s.count}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="relative bg-cyber-bg/60 overflow-hidden" style={{ paddingBottom: "42%" }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 42"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Grid */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 5}
                y1="0"
                x2={i * 5}
                y2="42"
                stroke="rgba(0,212,255,0.04)"
                strokeWidth="0.2"
              />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 5.25}
                x2="100"
                y2={i * 5.25}
                stroke="rgba(0,212,255,0.04)"
                strokeWidth="0.2"
              />
            ))}

            {/* Connections */}
            {connections.map((c, i) => {
              const from = threatNodes[c.from];
              const to = threatNodes[c.to];
              const isActive = i === activeConn;
              return (
                <g key={i}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isActive ? statusColors[threatNodes[c.from].status] : "rgba(0,212,255,0.1)"}
                    strokeWidth={isActive ? 0.4 : 0.2}
                    strokeDasharray={isActive ? "1,1" : undefined}
                  />
                  {isActive && (
                    <circle r="0.8" fill={statusColors[threatNodes[c.from].status]}>
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M${from.x},${from.y} L${to.x},${to.y}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {threatNodes.map((node, i) => {
              const color = statusColors[node.status];
              return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="1.5" fill={color} opacity="0.9" />
                  <circle cx={node.x} cy={node.y} r="3" fill={color} opacity="0.15">
                    <animate
                      attributeName="r"
                      values="1.5;4;1.5"
                      dur={`${2 + i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0;0.3"
                      dur={`${2 + i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={node.x + 2}
                    y={node.y - 2}
                    fill={color}
                    fontSize="2"
                    fontFamily="monospace"
                    opacity="0.7"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Overlay label */}
          <div className="absolute bottom-3 right-3 text-xs font-mono text-cyber-muted/40">
            ARES // THREAT-INTEL
          </div>
        </div>

        {/* Live events feed */}
        <div className="border-t border-cyber-primary/10">
          <div className="px-6 py-3 border-b border-cyber-primary/10 flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-cyber-accent" />
            <span className="font-mono text-xs tracking-widest text-cyber-muted">
              LIVE EVENT STREAM
            </span>
            <span
              className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-accent"
              style={{ animation: "pulse-glow 1s infinite" }}
            />
          </div>
          <div className="overflow-hidden max-h-40">
            {liveEvents.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-4 px-6 py-2.5 border-b border-white/5 hover:bg-white/2 transition-colors"
              >
                <span className="text-cyber-muted font-mono text-xs w-16 shrink-0">
                  {ev.time}
                </span>
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded shrink-0"
                  style={{
                    color: sevColor[ev.sev],
                    background: `${sevColor[ev.sev]}15`,
                    border: `1px solid ${sevColor[ev.sev]}30`,
                  }}
                >
                  {ev.sev}
                </span>
                <span className="text-cyber-muted font-mono text-xs hidden sm:block">
                  {ev.src}
                </span>
                <span className="text-cyber-muted font-mono text-xs hidden md:block">
                  → {ev.dst}
                </span>
                <span className="text-cyber-text font-mono text-xs ml-auto">
                  {ev.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="px-6 py-4 flex flex-wrap gap-6">
          {[
            { icon: CheckCircle2, label: "Indicators Ingested", value: "847K", color: "text-cyber-green" },
            { icon: AlertOctagon, label: "Active Campaigns", value: "23", color: "text-cyber-accent" },
            { icon: Wifi, label: "Telemetry Sources", value: "156", color: "text-cyber-primary" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-cyber-muted text-xs font-mono">{s.label}:</span>
              <span className={`font-mono text-xs font-bold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
