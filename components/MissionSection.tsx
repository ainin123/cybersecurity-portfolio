"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Cpu, Network } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "OFFENSIVE RESEARCH",
    desc: "Developing novel attack techniques and weaponizing zero-days for responsible disclosure and defensive countermeasure development.",
  },
  {
    icon: Eye,
    title: "THREAT INTELLIGENCE",
    desc: "Tracking APT groups, mapping TTPs to MITRE ATT&CK, and producing actionable intelligence reports for enterprise defense teams.",
  },
  {
    icon: Cpu,
    title: "MALWARE ANALYSIS",
    desc: "Static and dynamic reverse engineering of commodity malware and nation-state implants. Sandbox evasion research and YARA rule authoring.",
  },
  {
    icon: Network,
    title: "ADVERSARY SIMULATION",
    desc: "Full-scope red team operations mimicking advanced adversaries. C2 infrastructure, lateral movement, and data exfiltration TTPs.",
  },
];

export default function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="mission" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyber-accent font-mono text-xs tracking-widest mb-4">01 // MISSION</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            THREAT INTELLIGENCE
            <br />
            <span className="text-cyber-accent">MANDATE</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-sm leading-relaxed">
            Operating at the intersection of offensive security and defensive intelligence.
            Every engagement is a mission to understand the adversary better than they understand themselves.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,255,136,0.07)", borderColor: "rgba(0,255,136,0.25)" }}
              className="glass-panel border border-white/5 p-7 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 border border-cyber-accent/20 rounded-sm bg-cyber-accent/5 shrink-0">
                  <p.icon className="w-4 h-4 text-cyber-accent" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-xs tracking-widest text-cyber-accent mb-3">
                    {p.title}
                  </h3>
                  <p className="text-cyber-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 glass-panel border border-white/5 p-8"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h3 className="font-mono font-bold text-xs tracking-widest text-cyber-accent mb-4">
                OPERATIVE PROFILE
              </h3>
              <p className="text-cyber-muted leading-relaxed text-sm">
                10+ years operating in adversarial environments across critical infrastructure,
                financial sector, and government networks. Former NSA/CISA contractor turned
                independent security researcher. Published vulnerabilities in Fortune 500 vendor
                software. Keynote speaker at DEF CON, Black Hat, and RSA Conference.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Clearance", value: "TS/SCI (Former)" },
                { label: "Base", value: "Washington D.C." },
                { label: "Status", value: "INDEPENDENT" },
                { label: "TLP", value: "WHITE" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-cyber-muted font-mono text-xs tracking-wider">{item.label}</span>
                  <span className="text-cyber-accent font-mono text-xs font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

