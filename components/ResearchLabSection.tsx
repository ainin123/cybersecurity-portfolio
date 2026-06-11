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
    color: "#ff3860",
    progress: 72,
    ttps: ["T1566.001", "T1059.003", "T1486"],
    desc: "Tracking novel DPRK-linked malware campaign targeting DeFi infrastructure. New C2 protocol identified.",
  },
  {
    id: "INV-2024-083",
    title: "VOLT TYPHOON — CRITICAL INFRASTRUCTURE RECON",
    status: "MONITORING",
    priority: "P1",
    color: "#ff8c00",
    progress: 55,
    ttps: ["T1190", "T1078", "T1105"],
    desc: "Chinese APT living-off-the-land techniques across US utilities sector. LOTL binary abuse documented.",
  },
  {
    id: "INV-2024-079",
    title: "NEW RANSOMWARE FAMILY — ZERO-DAY EXPLOITATION",
    status: "ACTIVE",
    priority: "P0",
    color: "#ff3860",
    progress: 38,
    ttps: ["T1190", "T1486", "T1489"],
    desc: "Novel ransomware leveraging unpatched ESXi vulnerability. Static analysis complete, dynamic in progress.",
  },
  {
    id: "INV-2024-071",
    title: "APT28 — NATO PHISHING INFRASTRUCTURE",
    status: "CLOSED",
    priority: "P2",
    color: "#00ff88",
    progress: 100,
    ttps: ["T1566", "T1071", "T1003"],
    desc: "Russian GRU spear-phishing campaign mapped and disrupted. IOCs shared via MISP and ISAC.",
  },
];

const labStats = [
  { label: "CVEs Authored", value: 47, color: "#ff3860", suffix: "" },
  { label: "Malware Samples Analyzed", value: 8400, color: "#00d4ff", suffix: "+" },
  { label: "Rules Written", value: 1240, color: "#00ff88", suffix: "" },
  { label: "Threat Reports Published", value: 89, color: "#7c3aed", suffix: "" },
];

function AnimatedCounter({
  target,
  inView,
  suffix = "",
}: {
  target: number;
  inView: boolean;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ResearchLabSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="research" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 hex-bg opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyber-primary font-mono text-xs tracking-widest">
              04 //
            </span>
            <span className="h-px flex-1 max-w-16 bg-cyber-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            RESEARCH
            <br />
            <span className="text-cyber-primary">LAB</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-base leading-relaxed">
            Active threat investigations, ongoing research, and the live
            intelligence feeds powering our analysis pipeline.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {labStats.map((s, i) => (
            <div
              key={s.label}
              className="glass-panel p-6 text-center border"
              style={{ borderColor: `${s.color}20` }}
            >
              <div
                className="text-3xl font-mono font-bold mb-2"
                style={{
                  color: s.color,
                  textShadow: `0 0 15px ${s.color}60`,
                }}
              >
                <AnimatedCounter target={s.value} inView={inView} suffix={s.suffix} />
              </div>
              <div className="text-cyber-muted text-xs font-mono tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Two columns: investigations + threat map */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Active investigations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-panel cyber-border h-full">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-cyber-primary/15">
                <FlaskConical className="w-4 h-4 text-cyber-primary" />
                <span className="font-mono text-xs tracking-widest text-cyber-primary font-bold">
                  ACTIVE INVESTIGATIONS
                </span>
                <span className="ml-auto px-2 py-0.5 text-xs font-mono font-bold rounded-full bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30">
                  {investigations.filter((i) => i.status === "ACTIVE").length} ACTIVE
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {investigations.map((inv, i) => (
                  <motion.div
                    key={inv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-5 hover:bg-white/2 transition-colors group cursor-default"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                            style={{
                              color: inv.color,
                              background: `${inv.color}15`,
                              border: `1px solid ${inv.color}25`,
                            }}
                          >
                            {inv.priority}
                          </span>
                          <span className="text-cyber-muted font-mono text-xs">
                            {inv.id}
                          </span>
                        </div>
                        <h4 className="font-mono text-xs font-bold text-cyber-text leading-snug">
                          {inv.title}
                        </h4>
                      </div>
                      <span
                        className="text-xs font-mono shrink-0 mt-1"
                        style={{ color: inv.color }}
                      >
                        {inv.status}
                      </span>
                    </div>

                    <p className="text-cyber-muted text-xs leading-relaxed mb-3">
                      {inv.desc}
                    </p>

                    {/* Progress */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-cyber-muted">Progress</span>
                        <span style={{ color: inv.color }}>{inv.progress}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${inv.progress}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${inv.color}80, ${inv.color})`,
                          }}
                        />
                      </div>
                    </div>

                    {/* TTPs */}
                    <div className="flex flex-wrap gap-1">
                      {inv.ttps.map((ttp) => (
                        <span
                          key={ttp}
                          className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 text-cyber-muted border border-white/10"
                        >
                          {ttp}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-cyber-primary/10">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono text-cyber-primary hover:text-cyber-text transition-colors">
                  VIEW ALL INVESTIGATIONS
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Threat map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ThreatMap />
          </motion.div>
        </div>

        {/* Lab environment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 grid sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: Cpu,
              title: "MALWARE LAB",
              desc: "Air-gapped sandbox environment with 12 VMs, FlareVM/REMnux for dynamic/static analysis",
              color: "#ff3860",
            },
            {
              icon: Activity,
              title: "INTEL PIPELINE",
              desc: "Automated IOC ingestion from 50+ OSINT feeds. Enrichment via VT, Shodan, PassiveTotal",
              color: "#00d4ff",
            },
            {
              icon: Zap,
              title: "RANGE INFRA",
              desc: "Private cyber range for red/blue team exercises. Simulates enterprise networks at scale",
              color: "#7c3aed",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="glass-panel p-5 border"
              style={{ borderColor: `${item.color}20` }}
            >
              <item.icon className="w-5 h-5 mb-3" style={{ color: item.color }} />
              <h4
                className="font-mono text-sm font-bold mb-2"
                style={{ color: item.color }}
              >
                {item.title}
              </h4>
              <p className="text-cyber-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
