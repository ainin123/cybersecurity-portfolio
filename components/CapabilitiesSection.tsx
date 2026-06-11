"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bug, Code2, Database, FileSearch, Layers, Radio, Server, ShieldAlert, Wifi, Zap } from "lucide-react";

const capabilities = [
  { icon: Bug, title: "Exploit Development", level: 95, tags: ["Buffer Overflow", "ROP Chains", "Kernel Exploits"] },
  { icon: FileSearch, title: "Malware Reverse Engineering", level: 92, tags: ["IDA Pro", "Ghidra", "x64dbg", "YARA"] },
  { icon: Radio, title: "Threat Intelligence", level: 97, tags: ["MITRE ATT&CK", "STIX/TAXII", "APT Tracking"] },
  { icon: ShieldAlert, title: "Red Team Operations", level: 90, tags: ["Cobalt Strike", "C2 Dev", "OPSEC"] },
  { icon: Code2, title: "Vulnerability Research", level: 88, tags: ["Fuzzing", "Source Audit", "CVE Research"] },
  { icon: Wifi, title: "Network Penetration", level: 93, tags: ["Lateral Movement", "Pivoting", "802.11"] },
  { icon: Database, title: "Digital Forensics", level: 85, tags: ["Memory Forensics", "DFIR", "Volatility"] },
  { icon: Server, title: "Cloud Security", level: 82, tags: ["AWS / Azure", "Container Escape", "IAM Abuse"] },
  { icon: Layers, title: "Security Tool Development", level: 91, tags: ["C / C++", "Python", "Rust", "Go"] },
  { icon: Zap, title: "Incident Response", level: 88, tags: ["Triage", "Containment", "Threat Hunting"] },
];

export default function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="capabilities" ref={ref} className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyber-accent font-mono text-xs tracking-widest mb-4">02 // CAPABILITIES</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            SECURITY
            <br />
            <span className="text-cyber-accent">CAPABILITIES</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-sm leading-relaxed">
            Battle-tested skillset forged through real-world offensive engagements,
            zero-day research, and intelligence operations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.04 * i }}
              className="glass-panel border border-white/5 hover:border-cyber-accent/20 p-5 group transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <cap.icon className="w-4 h-4 text-cyber-accent" />
                <span className="font-mono text-xs text-cyber-muted">{cap.level}%</span>
              </div>

              <h3 className="font-mono text-sm font-semibold text-cyber-text mb-3">{cap.title}</h3>

              <div className="h-px bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${cap.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 + 0.03 * i, ease: "easeOut" }}
                  className="h-full bg-cyber-accent rounded-full"
                  style={{ boxShadow: "0 0 6px rgba(0,255,136,0.5)" }}
                />
              </div>

              <div className="flex flex-wrap gap-1">
                {cap.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded-sm bg-white/4 text-cyber-muted border border-white/8">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 glass-panel border border-white/5 p-6"
        >
          <h3 className="font-mono text-xs text-cyber-accent tracking-widest mb-5">ARSENAL // TOOL STACK</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Cobalt Strike", "Metasploit", "Burp Suite Pro", "IDA Pro", "Ghidra",
              "Volatility", "Wireshark", "Nmap", "BloodHound", "Mimikatz", "Empire",
              "Sliver", "Frida", "Radare2", "YARA", "Elastic SIEM", "Splunk",
              "OpenCTI", "MISP", "Velociraptor",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 text-xs font-mono rounded-sm border border-white/8 text-cyber-muted hover:text-cyber-accent hover:border-cyber-accent/25 transition-colors cursor-default"
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
