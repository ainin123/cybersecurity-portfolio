"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Mic2, FileText, Award, ExternalLink, Calendar } from "lucide-react";

const publications = [
  { type: "paper", title: "Dissecting LAZARUS GROUP's BlindingCan RAT: C2 Protocol Analysis and Detection Opportunities", venue: "BlackHat USA 2024", date: "2024-08", tags: ["Malware Analysis", "C2", "DPRK"] },
  { type: "talk", title: "From Zero to Shell: Modern Techniques in Initial Access Broker Operations", venue: "DEF CON 32", date: "2024-07", tags: ["Initial Access", "IAB", "Threat Intel"] },
  { type: "paper", title: "VOLT TYPHOON TTPs: Living-off-the-Land in Critical Infrastructure Networks", venue: "USENIX Security 2024", date: "2024-06", tags: ["APT", "LOTL", "ICS/OT"] },
  { type: "advisory", title: "CVE-2024-1337: Critical RCE in Fortinet SSL-VPN Gateway — Exploitation Analysis", venue: "Zero-Day Initiative", date: "2024-03", tags: ["CVE", "RCE", "Fortinet"] },
  { type: "blog", title: "Uncovering the TTPs Behind SCATTERED SPIDER's Social Engineering Playbook", venue: "ARES Intelligence Blog", date: "2024-02", tags: ["Social Engineering", "SIM Swapping", "BEC"] },
  { type: "talk", title: "Building a Threat Intelligence Platform on a Shoestring: OSS Stack for Enterprise-Grade Intel", venue: "RSA Conference 2024", date: "2024-05", tags: ["Threat Intel", "OSINT", "Platform Engineering"] },
  { type: "paper", title: "ShadowPad: Comprehensive Analysis of the Modular Backdoor Ecosystem", venue: "VirusBulletin VB2023", date: "2023-10", tags: ["ShadowPad", "Supply Chain", "China-Nexus"] },
  { type: "advisory", title: "CVE-2023-4911: Looney Tunables glibc Local Privilege Escalation — Weaponization Research", venue: "Qualys Security Advisory", date: "2023-10", tags: ["CVE", "LPE", "Linux"] },
];

const typeConfig: Record<string, { icon: typeof BookOpen; label: string }> = {
  paper: { icon: BookOpen, label: "RESEARCH PAPER" },
  talk: { icon: Mic2, label: "CONFERENCE TALK" },
  advisory: { icon: FileText, label: "CVE ADVISORY" },
  blog: { icon: Award, label: "BLOG POST" },
};

export default function PublicationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="publications" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyber-accent font-mono text-xs tracking-widest mb-4">05 // PUBLICATIONS</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            RESEARCH &
            <br />
            <span className="text-cyber-accent">PUBLICATIONS</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-sm leading-relaxed">
            Peer-reviewed research, conference talks, CVE advisories, and intelligence reports
            advancing the security community.
          </p>
        </motion.div>

        {/* Type legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <span key={type} className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-xs font-mono text-cyber-muted rounded-sm">
              <cfg.icon className="w-3 h-3 text-cyber-accent" />
              {cfg.label}
            </span>
          ))}
        </motion.div>

        <div className="space-y-2">
          {publications.map((pub, i) => {
            const cfg = typeConfig[pub.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                whileHover={{ x: 6, boxShadow: "0 4px 24px rgba(0,255,136,0.07)", borderColor: "rgba(0,255,136,0.25)" }}
                className="glass-panel border border-white/5 p-5 group transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-white/10 rounded-sm bg-white/3 shrink-0 mt-0.5">
                    <cfg.icon className="w-3.5 h-3.5 text-cyber-accent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-sm font-semibold text-cyber-text group-hover:text-cyber-accent transition-colors leading-snug mb-2">
                      {pub.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyber-muted mb-2.5">
                      <span className="text-cyber-accent">{pub.venue}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{pub.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded-sm bg-white/4 text-cyber-muted border border-white/8">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a href="#" className="shrink-0 p-2 border border-white/10 rounded-sm text-cyber-muted hover:text-cyber-accent hover:border-cyber-accent/25 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-cyber-accent/8 border border-cyber-accent/10 rounded-sm overflow-hidden"
        >
          {[
            { label: "Publications", value: "47+" },
            { label: "Conference Talks", value: "18" },
            { label: "Citations", value: "2.3K" },
            { label: "CVE Advisories", value: "23" },
          ].map((s) => (
            <div key={s.label} className="bg-cyber-bg p-6 text-center">
              <div className="text-2xl font-mono font-bold text-cyber-accent mb-1">{s.value}</div>
              <div className="text-cyber-muted text-xs font-mono tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
