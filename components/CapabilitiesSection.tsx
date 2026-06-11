"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bug,
  Code2,
  Database,
  FileSearch,
  Layers,
  Radio,
  Server,
  ShieldAlert,
  Wifi,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    icon: Bug,
    title: "Exploit Development",
    level: 95,
    tags: ["Buffer Overflow", "ROP Chains", "Kernel Exploits"],
    color: "#ff3860",
  },
  {
    icon: FileSearch,
    title: "Malware Reverse Engineering",
    level: 92,
    tags: ["IDA Pro", "Ghidra", "x64dbg", "YARA"],
    color: "#00d4ff",
  },
  {
    icon: Radio,
    title: "Threat Intelligence",
    level: 97,
    tags: ["MITRE ATT&CK", "STIX/TAXII", "APT Tracking"],
    color: "#00ff88",
  },
  {
    icon: ShieldAlert,
    title: "Red Team Operations",
    level: 90,
    tags: ["Cobalt Strike", "C2 Dev", "OPSEC"],
    color: "#7c3aed",
  },
  {
    icon: Code2,
    title: "Vulnerability Research",
    level: 88,
    tags: ["Fuzzing", "Source Audit", "CVE Research"],
    color: "#ff8c00",
  },
  {
    icon: Wifi,
    title: "Network Penetration",
    level: 93,
    tags: ["Lateral Movement", "Pivoting", "802.11"],
    color: "#00d4ff",
  },
  {
    icon: Database,
    title: "Digital Forensics",
    level: 85,
    tags: ["Memory Forensics", "DFIR", "Volatility"],
    color: "#ffd700",
  },
  {
    icon: Server,
    title: "Cloud Security",
    level: 82,
    tags: ["AWS / Azure", "Container Escape", "IAM Abuse"],
    color: "#00ff88",
  },
  {
    icon: Layers,
    title: "Security Tool Development",
    level: 91,
    tags: ["C / C++", "Python", "Rust", "Go"],
    color: "#7c3aed",
  },
  {
    icon: Zap,
    title: "Incident Response",
    level: 88,
    tags: ["Triage", "Containment", "Threat Hunting"],
    color: "#ff3860",
  },
];

function CapabilityCard({
  cap,
  index,
  inView,
}: {
  cap: (typeof capabilities)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-panel p-6 group border border-white/5 hover:border-cyber-primary/30 transition-all duration-300"
      style={{
        ["--hover-color" as string]: cap.color,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-2.5 rounded"
          style={{
            background: `${cap.color}15`,
            border: `1px solid ${cap.color}30`,
          }}
        >
          <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
        </div>
        <span
          className="font-mono text-xs font-bold"
          style={{ color: cap.color }}
        >
          {cap.level}%
        </span>
      </div>

      <h3 className="font-mono font-semibold text-cyber-text text-sm mb-1 tracking-wide">
        {cap.title}
      </h3>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${cap.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + 0.04 * index, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${cap.color}80, ${cap.color})`,
            boxShadow: `0 0 8px ${cap.color}60`,
          }}
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {cap.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: `${cap.color}10`,
              color: `${cap.color}cc`,
              border: `1px solid ${cap.color}20`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="capabilities" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyber-primary font-mono text-xs tracking-widest">
              02 //
            </span>
            <span className="h-px flex-1 max-w-16 bg-cyber-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            SECURITY
            <br />
            <span className="text-cyber-primary">CAPABILITIES</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-base leading-relaxed">
            Battle-tested skillset forged through real-world offensive
            engagements, zero-day research, and intelligence operations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} inView={inView} />
          ))}
        </div>

        {/* Tool stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 glass-panel cyber-border p-6"
        >
          <h3 className="font-mono text-cyber-primary text-xs tracking-widest mb-5">
            ARSENAL // TOOL STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Cobalt Strike",
              "Metasploit",
              "Burp Suite Pro",
              "IDA Pro",
              "Ghidra",
              "Volatility",
              "Wireshark",
              "Nmap",
              "BloodHound",
              "Mimikatz",
              "Empire",
              "Sliver",
              "Frida",
              "Radare2",
              "YARA",
              "Elastic SIEM",
              "Splunk",
              "OpenCTI",
              "MISP",
              "Velociraptor",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 text-xs font-mono rounded border border-cyber-primary/20 text-cyber-muted hover:text-cyber-primary hover:border-cyber-primary/40 hover:bg-cyber-primary/5 transition-all cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
