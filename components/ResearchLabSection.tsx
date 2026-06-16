"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FlaskConical, Cpu, Zap, Activity, ChevronRight } from "lucide-react";
import ThreatMap from "./ThreatMap";

const investigations = [
  {
    id: "INV-2024-087",
    title: "LAZARUS GROUP — CRYPTO EXCHANGE CAMPAIGN",
    status: "ACTIVE",
    priority: "P0",
    critical: true,
    progress: 72,
    ttps: ["T1566.001", "T1059.003", "T1486"],
    desc: "Tracking novel DPRK-linked malware campaign targeting DeFi infrastructure. New C2 protocol identified.",
  },
  {
    id: "INV-2024-083",
    title: "VOLT TYPHOON — CRITICAL INFRASTRUCTURE RECON",
    status: "MONITORING",
    priority: "P1",
    critical: false,
    progress: 55,
    ttps: ["T1190", "T1078", "T1105"],
    desc: "Chinese APT living-off-the-land techniques across US utilities sector. LOTL binary abuse documented.",
  },
  {
    id: "INV-2024-079",
    title: "NEW RANSOMWARE FAMILY — ZERO-DAY EXPLOITATION",
    status: "ACTIVE",
    priority: "P0",
    critical: true,
    progress: 38,
    ttps: ["T1190", "T1486", "T1489"],
    desc: "Novel ransomware leveraging unpatched ESXi vulnerability. Static analysis complete, dynamic in progress.",
  },
  {
    id: "INV-2024-071",
    title: "APT28 — NATO PHISHING INFRASTRUCTURE",
    status: "CLOSED",
    priority: "P2",
    critical: false,
    progress: 100,
    ttps: ["T1566", "T1071", "T1003"],
    desc: "Russian GRU spear-phishing campaign mapped and disrupted. IOCs shared via MISP and ISAC.",
  },
];

const labStats = [
  { label: "CVEs Authored", value: 47 },
  { label: "Samples Analyzed", value: 8400 },
  { label: "Rules Written", value: 1240 },
  { label: "Reports Published", value: 89 },
];

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / 60;
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, 1500 / 60);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span>{count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count}</span>;
}

export default function ResearchLabSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="research" ref={ref} className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyber-accent font-mono text-xs tracking-widest mb-4">04 // RESEARCH LAB</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            RESEARCH
            <br />
            <span className="text-cyber-accent">LAB</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-sm leading-relaxed">
            Active threat investigations, ongoing research, and the live intelligence
            feeds powering our analysis pipeline.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cyber-accent/8 border border-cyber-accent/10 rounded-sm overflow-hidden mb-10"
        >
          {labStats.map((s, i) => (
            <div key={s.label} className="bg-cyber-bg p-6 text-center">
              <div className="text-3xl font-mono font-bold text-cyber-accent mb-1">
                <AnimatedCounter target={s.value} inView={inView} />
              </div>
              <div className="text-cyber-muted text-xs font-mono tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Investigations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-panel border border-white/5 h-full flex flex-col">
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5">
                <FlaskConical className="w-3.5 h-3.5 text-cyber-accent" />
                <span className="font-mono text-xs tracking-widest text-cyber-accent">ACTIVE INVESTIGATIONS</span>
                <span className="ml-auto text-xs font-mono text-cyber-danger">
                  {investigations.filter((i) => i.status === "ACTIVE").length} ACTIVE
                </span>
              </div>

              <div className="divide-y divide-white/4 flex-1">
                {investigations.map((inv, i) => (
                  <motion.div
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-mono font-bold ${inv.critical ? "text-cyber-danger" : "text-cyber-muted"}`}>
                            {inv.priority}
                          </span>
                          <span className="text-cyber-muted/50 font-mono text-xs">{inv.id}</span>
                        </div>
                        <h4 className="font-mono text-xs font-bold text-cyber-text leading-snug">{inv.title}</h4>
                      </div>
                      <span className={`text-xs font-mono shrink-0 ${inv.critical ? "text-cyber-danger" : "text-cyber-accent"}`}>
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-cyber-muted text-xs leading-relaxed mb-3">{inv.desc}</p>
                    <div className="mb-2.5">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-cyber-muted">Progress</span>
                        <span className="text-cyber-accent">{inv.progress}%</span>
                      </div>
                      <div className="h-px bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${inv.progress}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full bg-cyber-accent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {inv.ttps.map((t) => (
                        <span key={t} className="text-xs font-mono px-1.5 py-0.5 bg-white/4 text-cyber-muted border border-white/8 rounded-sm">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="flex items-center justify-center gap-1.5 py-3 text-xs font-mono text-cyber-muted hover:text-cyber-accent transition-colors border-t border-white/5">
                VIEW ALL <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

          {/* Threat map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ThreatMap />
          </motion.div>
        </div>

        {/* Lab env */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Cpu, title: "MALWARE LAB", desc: "Air-gapped sandbox environment with 12 VMs, FlareVM/REMnux for dynamic and static analysis" },
            { icon: Activity, title: "INTEL PIPELINE", desc: "Automated IOC ingestion from 50+ OSINT feeds. Enrichment via VirusTotal, Shodan, PassiveTotal" },
            { icon: Zap, title: "RANGE INFRA", desc: "Private cyber range for red/blue team exercises. Simulates enterprise networks at scale" },
          ].map((item) => (
            <div key={item.title} className="glass-panel border border-white/5 p-5">
              <item.icon className="w-4 h-4 text-cyber-accent mb-3" />
              <h4 className="font-mono text-xs font-bold text-cyber-accent tracking-widest mb-2">{item.title}</h4>
              <p className="text-cyber-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
