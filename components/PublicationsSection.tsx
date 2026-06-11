"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  Mic2,
  FileText,
  Award,
  ExternalLink,
  Calendar,
} from "lucide-react";

const publications = [
  {
    type: "paper",
    title: "Dissecting LAZARUS GROUP's BlindingCan RAT: C2 Protocol Analysis and Detection Opportunities",
    venue: "BlackHat USA 2024",
    date: "2024-08",
    tags: ["Malware Analysis", "C2 Protocols", "DPRK"],
    impact: "★★★★★",
    color: "#ff3860",
    link: "#",
  },
  {
    type: "talk",
    title: "From Zero to Shell: Modern Techniques in Initial Access Broker Operations",
    venue: "DEF CON 32",
    date: "2024-07",
    tags: ["Initial Access", "IAB", "Threat Intel"],
    impact: "★★★★★",
    color: "#00d4ff",
    link: "#",
  },
  {
    type: "paper",
    title: "VOLT TYPHOON TTPs: Living-off-the-Land in Critical Infrastructure Networks",
    venue: "USENIX Security 2024",
    date: "2024-06",
    tags: ["APT", "LOTL", "ICS/OT"],
    impact: "★★★★☆",
    color: "#00ff88",
    link: "#",
  },
  {
    type: "advisory",
    title: "CVE-2024-1337: Critical RCE in Fortinet SSL-VPN Gateway — Exploitation Analysis",
    venue: "Zero-Day Initiative",
    date: "2024-03",
    tags: ["CVE", "RCE", "Fortinet"],
    impact: "★★★★★",
    color: "#7c3aed",
    link: "#",
  },
  {
    type: "blog",
    title: "Uncovering the TTPs Behind SCATTERED SPIDER's Social Engineering Playbook",
    venue: "ARES Intelligence Blog",
    date: "2024-02",
    tags: ["Social Engineering", "SIM Swapping", "BEC"],
    impact: "★★★★☆",
    color: "#ff8c00",
    link: "#",
  },
  {
    type: "talk",
    title: "Building a Threat Intelligence Platform on a Shoestring: OSS Stack for Enterprise-Grade Intel",
    venue: "RSA Conference 2024",
    date: "2024-05",
    tags: ["Threat Intel", "OSINT", "Platform Engineering"],
    impact: "★★★★☆",
    color: "#ffd700",
    link: "#",
  },
  {
    type: "paper",
    title: "ShadowPad: Comprehensive Analysis of the Modular Backdoor Ecosystem",
    venue: "VirusBulletin VB2023",
    date: "2023-10",
    tags: ["ShadowPad", "Supply Chain", "China-Nexus"],
    impact: "★★★★☆",
    color: "#00d4ff",
    link: "#",
  },
  {
    type: "advisory",
    title: "CVE-2023-4911: Looney Tunables glibc Local Privilege Escalation — Weaponization Research",
    venue: "Qualys Security Advisory",
    date: "2023-10",
    tags: ["CVE", "LPE", "Linux"],
    impact: "★★★★★",
    color: "#ff3860",
    link: "#",
  },
];

const typeConfig: Record<
  string,
  { icon: typeof BookOpen; label: string; color: string }
> = {
  paper: { icon: BookOpen, label: "RESEARCH PAPER", color: "#00d4ff" },
  talk: { icon: Mic2, label: "CONFERENCE TALK", color: "#7c3aed" },
  advisory: { icon: FileText, label: "CVE ADVISORY", color: "#ff3860" },
  blog: { icon: Award, label: "BLOG POST", color: "#ff8c00" },
};

export default function PublicationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="publications" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyber-primary font-mono text-xs tracking-widest">
              05 //
            </span>
            <span className="h-px flex-1 max-w-16 bg-cyber-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            RESEARCH &
            <br />
            <span className="text-cyber-primary">PUBLICATIONS</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-base leading-relaxed">
            Peer-reviewed research, conference talks, CVE advisories, and
            intelligence reports advancing the security community.
          </p>
        </motion.div>

        {/* Type filter badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <span
              key={type}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono cursor-default"
              style={{
                color: cfg.color,
                borderColor: `${cfg.color}30`,
                background: `${cfg.color}08`,
              }}
            >
              <cfg.icon className="w-3 h-3" />
              {cfg.label}
            </span>
          ))}
        </motion.div>

        {/* Publications list */}
        <div className="space-y-3">
          {publications.map((pub, i) => {
            const cfg = typeConfig[pub.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="glass-panel border border-white/5 hover:border-cyber-primary/25 p-5 group transition-all cursor-default"
              >
                <div className="flex items-start gap-5">
                  {/* Type icon */}
                  <div
                    className="p-2.5 rounded shrink-0 mt-0.5"
                    style={{
                      background: `${cfg.color}12`,
                      border: `1px solid ${cfg.color}25`,
                    }}
                  >
                    <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-3 mb-2">
                      <h3 className="font-mono text-sm font-semibold text-cyber-text group-hover:text-cyber-primary transition-colors leading-snug">
                        {pub.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyber-muted mb-3">
                      <span
                        className="font-bold"
                        style={{ color: pub.color }}
                      >
                        {pub.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {pub.date}
                      </span>
                      <span
                        className="text-cyber-yellow"
                        style={{ textShadow: "0 0 8px rgba(255,215,0,0.4)" }}
                      >
                        {pub.impact}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-cyber-muted border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={pub.link}
                    className="shrink-0 p-2 rounded border border-white/10 text-cyber-muted hover:text-cyber-primary hover:border-cyber-primary/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Citation stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 glass-panel cyber-border p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Publications", value: "47+", color: "#00d4ff" },
            { label: "Conference Talks", value: "18", color: "#7c3aed" },
            { label: "Citations", value: "2.3K", color: "#00ff88" },
            { label: "CVE Advisories", value: "23", color: "#ff3860" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-2xl font-mono font-bold mb-1"
                style={{ color: s.color, textShadow: `0 0 10px ${s.color}50` }}
              >
                {s.value}
              </div>
              <div className="text-cyber-muted text-xs font-mono tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
