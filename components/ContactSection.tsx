"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AtSign, GitBranch, Mail, Download, ArrowRight, CircleCheck, Send } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: AtSign,
    label: "LinkedIn",
    value: "linkedin.com/in/aniqa-ayub",
    href: "https://linkedin.com/in/aniqa-ayub",
    color: "#0ea5e9",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/aniqa-ayub",
    href: "https://github.com/aniqa-ayub",
    color: "#06b6d4",
  },
  {
    icon: Mail,
    label: "Email",
    value: "aniqa.ayub@email.com",
    href: "mailto:aniqa.ayub@email.com",
    color: "#7c3aed",
  },
  {
    icon: Download,
    label: "Resume",
    value: "Download PDF Resume",
    href: "/resume.pdf",
    color: "#0ea5e9",
    download: true,
  },
];

const SUBJECTS = [
  "Collaboration",
  "Job Opportunity",
  "Research",
  "Consulting",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "Collaboration",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#060b18",
      }}
    >
      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(14,165,233,0.05) 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#0ea5e9",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            09 // CONTACT
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "16px",
            color: "#e2e8f0",
          }}
        >
          Let&apos;s{" "}
          <span
            style={{
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Connect
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontSize: "16px",
            color: "#94a3b8",
            marginBottom: "60px",
            maxWidth: "560px",
            lineHeight: 1.6,
          }}
        >
          Open to cybersecurity research collaborations, SIEM engineering roles,
          AI security projects, and consulting engagements.
        </motion.p>

        <div
          style={{
            display: "grid",
            gap: "40px",
            gridTemplateColumns: "1fr",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT: Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {CONTACT_METHODS.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.download ? undefined : "_blank"}
                rel="noopener noreferrer"
                download={method.download}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                whileHover={{ borderColor: method.color, x: 4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  borderRadius: "12px",
                  background: "rgba(13,20,36,0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(14,165,233,0.15)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9px",
                      background: `${method.color}15`,
                      border: `1px solid ${method.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <method.icon size={17} color={method.color} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        marginBottom: "2px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {method.label}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#e2e8f0",
                      }}
                    >
                      {method.value}
                    </div>
                  </div>
                </div>
                <ArrowRight size={15} color="#64748b" />
              </motion.a>
            ))}
          </motion.div>

          {/* RIGHT: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              background: "rgba(13,20,36,0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(14,165,233,0.15)",
              borderRadius: "16px",
              padding: "32px",
            }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "360px",
                  gap: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(14,165,233,0.12)",
                    border: "1px solid rgba(14,165,233,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircleCheck size={32} color="#0ea5e9" />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#e2e8f0",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", maxWidth: "280px", lineHeight: 1.6 }}>
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: "6px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "8px",
                      background: "rgba(6,11,24,0.8)",
                      border: "1px solid rgba(14,165,233,0.15)",
                      color: "#e2e8f0",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: "6px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "8px",
                      background: "rgba(6,11,24,0.8)",
                      border: "1px solid rgba(14,165,233,0.15)",
                      color: "#e2e8f0",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: "6px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "8px",
                      background: "rgba(6,11,24,0.8)",
                      border: "1px solid rgba(14,165,233,0.15)",
                      color: "#e2e8f0",
                      fontSize: "14px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} style={{ backgroundColor: "#0d1424" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: "6px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message..."
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "8px",
                      background: "rgba(6,11,24,0.8)",
                      border: "1px solid rgba(14,165,233,0.15)",
                      color: "#e2e8f0",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 24px",
                    borderRadius: "8px",
                    background: loading
                      ? "rgba(14,165,233,0.5)"
                      : "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                    border: "none",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "15px",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 0 24px rgba(14,165,233,0.25)",
                    transition: "opacity 0.2s",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: #475569;
        }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(14,165,233,0.4) !important;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.08);
        }
      `}</style>
    </section>
  );
}
