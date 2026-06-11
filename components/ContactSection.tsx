"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Key, MessageSquare, Send, Terminal, Shield, Copy, CheckCheck, AtSign, GitBranch, Briefcase } from "lucide-react";

const channels = [
  { icon: Mail, label: "ENCRYPTED EMAIL", value: "aniqa@ares-intel.io", note: "PGP preferred", href: "mailto:aniqa@ares-intel.io" },
  { icon: Key, label: "PGP FINGERPRINT", value: "A4F2 1D3E 8B7C 0E52 F8A1", note: "Keys.openpgp.org", href: "#", copyable: true },
  { icon: MessageSquare, label: "SIGNAL", value: "+1 (555) 0-ARES-INT", note: "Encrypted messaging", href: "#" },
];

const socials = [
  { icon: AtSign, label: "@ares_intel", href: "#" },
  { icon: GitBranch, label: "github/aniqa-ayub", href: "#" },
  { icon: Briefcase, label: "Aniqa Ayub", href: "#" },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyber-accent font-mono text-xs tracking-widest mb-4">06 // CONTACT</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            ESTABLISH
            <br />
            <span className="text-cyber-accent">CONTACT</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-sm leading-relaxed">
            For security research collaborations, responsible disclosure, incident response
            retainers, or speaking engagements. Encrypted communications preferred.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {channels.map((ch) => (
              <div key={ch.label} className="glass-panel border border-white/5 hover:border-cyber-accent/20 p-5 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-cyber-accent/20 rounded-sm bg-cyber-accent/5 shrink-0">
                    <ch.icon className="w-4 h-4 text-cyber-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cyber-muted font-mono text-xs tracking-widest mb-1">{ch.label}</p>
                    <p className="font-mono text-sm text-cyber-text truncate">{ch.value}</p>
                    <p className="text-cyber-muted font-mono text-xs mt-0.5">{ch.note}</p>
                  </div>
                  {ch.copyable && (
                    <button
                      onClick={() => handleCopy(ch.value)}
                      className="p-1.5 border border-white/10 rounded-sm text-cyber-muted hover:text-cyber-accent hover:border-cyber-accent/25 transition-colors"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5 text-cyber-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="glass-panel border border-cyber-danger/20 bg-cyber-danger/3 p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Shield className="w-3.5 h-3.5 text-cyber-danger" />
                <span className="font-mono text-xs font-bold text-cyber-danger tracking-widest">OPSEC NOTICE</span>
              </div>
              <p className="text-cyber-muted text-xs leading-relaxed">
                For sensitive disclosures, always use PGP-encrypted email. Avoid sharing
                classified information via unencrypted channels. Signal preferred for real-time coordination.
              </p>
            </div>

            <div className="glass-panel border border-white/5 p-5">
              <p className="text-xs font-mono text-cyber-muted tracking-widest mb-4">SOCIAL PROFILES</p>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="flex items-center gap-3 text-sm font-mono text-cyber-muted hover:text-cyber-accent transition-colors">
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel border border-white/5 h-full">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/5">
                <Terminal className="w-3.5 h-3.5 text-cyber-accent" />
                <span className="font-mono text-xs tracking-widest text-cyber-accent">SECURE MESSAGE TRANSMISSION</span>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-10 flex flex-col items-center justify-center gap-4 text-center min-h-80"
                >
                  <div className="p-4 rounded-full border border-cyber-accent/30 bg-cyber-accent/8">
                    <CheckCheck className="w-7 h-7 text-cyber-accent" />
                  </div>
                  <h3 className="font-mono font-bold text-cyber-accent">MESSAGE TRANSMITTED</h3>
                  <p className="text-cyber-muted text-xs max-w-xs font-mono leading-relaxed">
                    Secure transmission acknowledged. Expected response time: 24–48h.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 px-6 py-2 text-xs font-mono border border-cyber-accent/25 text-cyber-accent hover:bg-cyber-accent/8 rounded-sm transition-colors"
                  >
                    NEW TRANSMISSION
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "CALLSIGN / NAME", key: "name", type: "text", placeholder: "John Doe" },
                      { label: "CONTACT EMAIL", key: "email", type: "email", placeholder: "you@company.com" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          required
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="w-full bg-cyber-bg border border-white/10 rounded-sm px-4 py-2.5 text-sm font-mono text-cyber-text placeholder-cyber-muted/40 focus:outline-none focus:border-cyber-accent/40 transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">MISSION TYPE</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-cyber-bg border border-white/10 rounded-sm px-4 py-2.5 text-sm font-mono text-cyber-text focus:outline-none focus:border-cyber-accent/40 transition-colors"
                    >
                      <option value="">Select…</option>
                      <option>Vulnerability Disclosure</option>
                      <option>Red Team Engagement</option>
                      <option>Threat Intelligence Retainer</option>
                      <option>Speaking Engagement</option>
                      <option>Research Collaboration</option>
                      <option>Incident Response</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">MESSAGE</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your mission objectives, threat scenario, or collaboration proposal…"
                      className="w-full bg-cyber-bg border border-white/10 rounded-sm px-4 py-2.5 text-sm font-mono text-cyber-text placeholder-cyber-muted/40 focus:outline-none focus:border-cyber-accent/40 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-cyber-muted text-xs font-mono">
                      End-to-end <span className="text-cyber-accent">encrypted</span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-cyber-accent text-cyber-bg font-mono font-bold text-xs tracking-widest rounded-sm hover:bg-cyber-accent-dim transition-colors"
                      style={{ boxShadow: "0 0 20px rgba(0,255,136,0.2)" }}
                    >
                      <Send className="w-3.5 h-3.5" /> TRANSMIT
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
