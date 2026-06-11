"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Cpu, Network } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "OFFENSIVE RESEARCH",
    desc: "Developing novel attack techniques and weaponizing zero-days for responsible disclosure and defensive countermeasure development.",
    color: "text-cyber-accent",
    border: "border-cyber-accent/30",
    bg: "bg-cyber-accent/5",
  },
  {
    icon: Eye,
    title: "THREAT INTELLIGENCE",
    desc: "Tracking APT groups, mapping TTPs to MITRE ATT&CK, and producing actionable intelligence reports for enterprise defense teams.",
    color: "text-cyber-primary",
    border: "border-cyber-primary/30",
    bg: "bg-cyber-primary/5",
  },
  {
    icon: Cpu,
    title: "MALWARE ANALYSIS",
    desc: "Static and dynamic reverse engineering of commodity malware and nation-state implants. Sandbox evasion research and YARA rule authoring.",
    color: "text-cyber-secondary",
    border: "border-cyber-secondary/30",
    bg: "bg-cyber-secondary/5",
  },
  {
    icon: Network,
    title: "ADVERSARY SIMULATION",
    desc: "Full-scope red team operations mimicking advanced adversaries. C2 infrastructure, lateral movement, and data exfiltration TTPs.",
    color: "text-cyber-green",
    border: "border-cyber-green/30",
    bg: "bg-cyber-green/5",
  },
];

export default function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mission" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 hex-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyber-primary font-mono text-xs tracking-widest">
              01 //
            </span>
            <span className="h-px flex-1 max-w-16 bg-cyber-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            THREAT INTELLIGENCE
            <br />
            <span className="text-cyber-primary">MANDATE</span>
          </h2>
          <p className="text-cyber-muted max-w-2xl text-base leading-relaxed">
            Operating at the intersection of offensive security and defensive
            intelligence. Every engagement is a mission to understand the
            adversary better than they understand themselves.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`glass-panel p-7 border ${p.border} ${p.bg} group cursor-default`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`p-3 rounded border ${p.border} ${p.bg} shrink-0`}
                >
                  <p.icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div>
                  <h3
                    className={`font-mono font-bold text-sm tracking-widest ${p.color} mb-3`}
                  >
                    {p.title}
                  </h3>
                  <p className="text-cyber-muted text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline / quick bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 glass-panel cyber-border p-8"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h3 className="font-mono font-bold text-cyber-primary text-sm tracking-widest mb-4">
                OPERATIVE PROFILE
              </h3>
              <p className="text-cyber-muted leading-relaxed text-sm">
                10+ years operating in adversarial environments across critical
                infrastructure, financial sector, and government networks. Former
                NSA/CISA contractor turned independent security researcher.
                Published vulnerabilities in Fortune 500 vendor software. Keynote
                speaker at DEF CON, Black Hat, and RSA Conference.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Clearance", value: "TS/SCI (Former)" },
                { label: "Base", value: "Washington D.C." },
                { label: "Status", value: "INDEPENDENT" },
                { label: "TLP", value: "WHITE" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2 border-b border-cyber-primary/10"
                >
                  <span className="text-cyber-muted font-mono text-xs tracking-widest">
                    {item.label}
                  </span>
                  <span className="text-cyber-primary font-mono text-xs font-bold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
