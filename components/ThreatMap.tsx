"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, AlertOctagon } from "lucide-react";

const threatNodes = [
  { x: 15, y: 30, label: "US-EAST", critical: false },
  { x: 48, y: 25, label: "EU-WEST", critical: false },
  { x: 72, y: 20, label: "RU-MOW", critical: true },
  { x: 80, y: 38, label: "CN-SHA", critical: true },
  { x: 62, y: 55, label: "IN-MUM", critical: false },
  { x: 25, y: 55, label: "BR-SAO", critical: false },
  { x: 50, y: 15, label: "UK-LON", critical: false },
  { x: 85, y: 55, label: "AU-SYD", critical: false },
  { x: 35, y: 35, label: "CA-YYZ", critical: false },
  { x: 55, y: 65, label: "NG-LOS", critical: false },
];

const connections = [
  { from: 2, to: 0 }, { from: 2, to: 1 }, { from: 3, to: 1 },
  { from: 3, to: 4 }, { from: 0, to: 6 }, { from: 8, to: 1 },
  { from: 2, to: 9 }, { from: 3, to: 7 },
];

const liveEvents = [
  { time: "00:00:12", src: "103.72.45.11", dst: "192.168.1.0/24", type: "C2 BEACON", critical: true },
  { time: "00:00:08", src: "45.142.12.99", dst: "10.0.0.50", type: "EXFILTRATION", critical: true },
  { time: "00:00:05", src: "178.33.9.21", dst: "172.16.4.0", type: "RECON SCAN", critical: false },
  { time: "00:00:02", src: "91.206.14.7", dst: "10.0.0.1", type: "BRUTE FORCE", critical: false },
  { time: "00:00:01", src: "MISP FEED", dst: "—", type: "IOC MATCH", critical: false },
];

export default function ThreatMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const activeConn = tick % connections.length;

  return (
    <div ref={ref} className="w-full">
      <div className="glass-panel border border-white/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Wifi className="w-3.5 h-3.5 text-cyber-accent" />
            <span className="font-mono text-xs tracking-widest text-cyber-accent">
              GLOBAL THREAT MAP — LIVE
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyber-danger">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-danger" />
              CRITICAL: 2
            </span>
            <span className="text-cyber-muted">MONITORED: 10</span>
          </div>
        </div>

        {/* Map */}
        <div className="relative bg-cyber-bg overflow-hidden" style={{ paddingBottom: "42%" }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 42" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="42" stroke="rgba(0,255,136,0.03)" strokeWidth="0.2" />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 5.25} x2="100" y2={i * 5.25} stroke="rgba(0,255,136,0.03)" strokeWidth="0.2" />
            ))}

            {connections.map((c, i) => {
              const from = threatNodes[c.from];
              const to = threatNodes[c.to];
              const isActive = i === activeConn;
              return (
                <g key={i}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isActive ? "rgba(239,68,68,0.6)" : "rgba(0,255,136,0.08)"}
                    strokeWidth={isActive ? 0.4 : 0.2}
                    strokeDasharray={isActive ? "1,1" : undefined}
                  />
                  {isActive && (
                    <circle r="0.7" fill="#ef4444">
                      <animateMotion dur="1.5s" repeatCount="indefinite"
                        path={`M${from.x},${from.y} L${to.x},${to.y}`} />
                    </circle>
                  )}
                </g>
              );
            })}

            {threatNodes.map((node, i) => {
              const color = node.critical ? "#ef4444" : "#00ff88";
              return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="1.4" fill={color} opacity="0.85" />
                  <circle cx={node.x} cy={node.y} r="3" fill={color} opacity="0">
                    <animate attributeName="r" values="1.4;5;1.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  <text x={node.x + 2} y={node.y - 2} fill={color} fontSize="2" fontFamily="monospace" opacity="0.6">
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Event feed */}
        <div className="border-t border-white/5">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
            <AlertOctagon className="w-3 h-3 text-cyber-danger" />
            <span className="font-mono text-xs text-cyber-muted tracking-widest">LIVE EVENT STREAM</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-danger" style={{ animation: "pulse-glow 1s infinite" }} />
          </div>
          {liveEvents.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="flex items-center gap-4 px-5 py-2.5 border-b border-white/4 text-xs font-mono"
            >
              <span className="text-cyber-muted w-16 shrink-0">{ev.time}</span>
              <span className={ev.critical ? "text-cyber-danger shrink-0" : "text-cyber-muted shrink-0"}>
                {ev.critical ? "●" : "○"}
              </span>
              <span className="text-cyber-muted hidden sm:block truncate">{ev.src}</span>
              <span className="text-cyber-text ml-auto whitespace-nowrap">{ev.type}</span>
            </motion.div>
          ))}
        </div>

        <div className="px-5 py-3.5 flex gap-6 text-xs font-mono text-cyber-muted">
          <span>IOCs: <span className="text-cyber-accent">847K</span></span>
          <span>Campaigns: <span className="text-cyber-accent">23</span></span>
          <span>Sources: <span className="text-cyber-accent">156</span></span>
        </div>
      </div>
    </div>
  );
}

