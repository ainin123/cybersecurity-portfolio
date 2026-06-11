"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  Key,
  MessageSquare,
  Send,
  Terminal,
  Shield,
  Copy,
  CheckCheck,
  AtSign,
  GitBranch,
  Briefcase,
} from "lucide-react";

const channels = [
  {
    icon: Mail,
    label: "ENCRYPTED EMAIL",
    value: "mercer@ares-intel.io",
    note: "PGP preferred",
    color: "#00d4ff",
    href: "mailto:mercer@ares-intel.io",
  },
  {
    icon: Key,
    label: "PGP FINGERPRINT",
    value: "A4F2 1D3E 8B7C 0E52 F8A1",
    note: "Keys.openpgp.org",
    color: "#7c3aed",
    href: "#",
    copyable: true,
  },
  {
    icon: MessageSquare,
    label: "SIGNAL",
    value: "+1 (555) 0-ARES-INT",
    note: "Encrypted messaging",
    color: "#00ff88",
    href: "#",
  },
];

const socials = [
  { icon: AtSign, label: "@ares_intel", href: "#" },
  { icon: GitBranch, label: "github/ares-mercer", href: "#" },
  { icon: Briefcase, label: "Alex Mercer", href: "#" },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 70%)",
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
              06 //
            </span>
            <span className="h-px flex-1 max-w-16 bg-cyber-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono text-cyber-text mb-4">
            ESTABLISH
            <br />
            <span className="text-cyber-primary">CONTACT</span>
          </h2>
          <p className="text-cyber-muted max-w-xl text-base leading-relaxed">
            For security research collaborations, responsible disclosure, incident response
            retainers, or speaking engagements. Encrypted communications preferred.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: channels + security notice */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contact channels */}
            {channels.map((ch) => (
              <div
                key={ch.label}
                className="glass-panel p-5 border group hover:border-cyber-primary/30 transition-all"
                style={{ borderColor: `${ch.color}20` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5 rounded shrink-0"
                    style={{
                      background: `${ch.color}12`,
                      border: `1px solid ${ch.color}25`,
                    }}
                  >
                    <ch.icon className="w-4 h-4" style={{ color: ch.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-cyber-muted tracking-widest mb-1">
                      {ch.label}
                    </div>
                    <div
                      className="font-mono text-sm font-semibold truncate"
                      style={{ color: ch.color }}
                    >
                      {ch.value}
                    </div>
                    <div className="text-xs font-mono text-cyber-muted mt-0.5">
                      {ch.note}
                    </div>
                  </div>
                  {ch.copyable && (
                    <button
                      onClick={() => handleCopy(ch.value)}
                      className="shrink-0 p-2 rounded border border-white/10 text-cyber-muted hover:text-cyber-primary hover:border-cyber-primary/30 transition-all"
                    >
                      {copied ? (
                        <CheckCheck className="w-3.5 h-3.5 text-cyber-green" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Security notice */}
            <div className="glass-panel border border-cyber-accent/20 bg-cyber-accent/3 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-cyber-accent" />
                <span className="font-mono text-xs font-bold text-cyber-accent tracking-widest">
                  OPSEC NOTICE
                </span>
              </div>
              <p className="text-cyber-muted text-xs leading-relaxed">
                For sensitive disclosures, always use PGP-encrypted email.
                Avoid sharing classified or proprietary information via unencrypted
                channels. Signal preferred for real-time coordination.
              </p>
            </div>

            {/* Socials */}
            <div className="glass-panel cyber-border p-5">
              <div className="text-xs font-mono text-cyber-muted tracking-widest mb-4">
                SOCIAL PROFILES
              </div>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-3 text-sm font-mono text-cyber-muted hover:text-cyber-primary transition-colors group"
                  >
                    <s.icon className="w-4 h-4 group-hover:text-cyber-primary transition-colors" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel cyber-border h-full">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-cyber-primary/15">
                <Terminal className="w-4 h-4 text-cyber-primary" />
                <span className="font-mono text-xs tracking-widest text-cyber-primary font-bold">
                  SECURE MESSAGE TRANSMISSION
                </span>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 flex flex-col items-center justify-center gap-4 text-center min-h-80"
                >
                  <div
                    className="p-4 rounded-full border"
                    style={{
                      background: "rgba(0,255,136,0.1)",
                      borderColor: "rgba(0,255,136,0.3)",
                    }}
                  >
                    <CheckCheck className="w-8 h-8 text-cyber-green" />
                  </div>
                  <h3 className="font-mono font-bold text-cyber-green text-lg">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-cyber-muted text-sm max-w-sm font-mono">
                    Secure transmission acknowledged. Expected response time: 24-48h.
                    Check your encrypted inbox for confirmation.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 px-6 py-2 text-xs font-mono font-bold border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary/10 rounded transition-all"
                  >
                    NEW TRANSMISSION
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">
                        CALLSIGN / NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-cyber-bg/60 border border-cyber-primary/20 rounded px-4 py-3 text-sm font-mono text-cyber-text placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-primary/60 focus:bg-cyber-bg transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">
                        CONTACT EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-cyber-bg/60 border border-cyber-primary/20 rounded px-4 py-3 text-sm font-mono text-cyber-text placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-primary/60 focus:bg-cyber-bg transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">
                      SUBJECT / MISSION TYPE
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-cyber-bg/60 border border-cyber-primary/20 rounded px-4 py-3 text-sm font-mono text-cyber-text focus:outline-none focus:border-cyber-primary/60 transition-all"
                    >
                      <option value="">Select mission type…</option>
                      <option>Vulnerability Disclosure</option>
                      <option>Red Team Engagement</option>
                      <option>Threat Intelligence Retainer</option>
                      <option>Speaking Engagement</option>
                      <option>Research Collaboration</option>
                      <option>Incident Response</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted tracking-widest mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-cyber-bg/60 border border-cyber-primary/20 rounded px-4 py-3 text-sm font-mono text-cyber-text placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-primary/60 focus:bg-cyber-bg transition-all resize-none"
                      placeholder="Describe your mission objectives, threat scenario, or collaboration proposal…"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-cyber-muted text-xs font-mono">
                      All communications are{" "}
                      <span className="text-cyber-green">end-to-end encrypted</span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-cyber-primary text-cyber-bg font-mono font-bold text-sm tracking-widest rounded hover:bg-cyber-primary/90 transition-all"
                      style={{ boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
                    >
                      <Send className="w-4 h-4" />
                      TRANSMIT
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
