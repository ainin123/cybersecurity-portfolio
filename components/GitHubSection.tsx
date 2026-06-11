"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Star, Activity, Code, ArrowRight } from "lucide-react";

const STATS = [
  { icon: GitBranch, label: "Repositories", value: "30+", color: "#0ea5e9" },
  { icon: Star, label: "Stars", value: "Growing", color: "#f59e0b" },
  { icon: Activity, label: "Contributions", value: "Active", color: "#06b6d4" },
  { icon: Code, label: "Primary Language", value: "Python", color: "#7c3aed" },
];

const LANGUAGES = [
  { lang: "Python", pct: 65, color: "#0ea5e9" },
  { lang: "JavaScript", pct: 15, color: "#06b6d4" },
  { lang: "Bash", pct: 12, color: "#7c3aed" },
  { lang: "Java", pct: 8, color: "#64748b" },
];

export default function GitHubSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="github"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#0d1424",
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
            08 // GITHUB
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
            marginBottom: "60px",
            color: "#e2e8f0",
          }}
        >
          Open Source{" "}
          <span
            style={{
              background: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contributions
          </span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: "1fr",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT: Stats 2x2 grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  style={{
                    background: "rgba(13,20,36,0.7)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(14,165,233,0.15)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: `${stat.color}15`,
                      border: `1px solid ${stat.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <stat.icon size={18} color={stat.color} />
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: stat.color,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* GitHub profile note */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "10px",
                background: "rgba(14,165,233,0.05)",
                border: "1px solid rgba(14,165,233,0.12)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <GitBranch size={16} color="#0ea5e9" />
              <span
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                github.com/
                <span style={{ color: "#0ea5e9" }}>aniqa-ayub</span>
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Language breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "rgba(13,20,36,0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(14,165,233,0.15)",
              borderRadius: "14px",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#0ea5e9",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono), monospace",
                marginBottom: "28px",
              }}
            >
              Language Breakdown
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {LANGUAGES.map((lang, i) => (
                <div key={lang.lang}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: lang.color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#e2e8f0",
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        {lang.lang}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: lang.color,
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {lang.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      backgroundColor: "rgba(14,165,233,0.08)",
                      borderRadius: "100px",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.pct}%` } : {}}
                      transition={{
                        duration: 1.2,
                        delay: 0.3 + i * 0.12,
                        ease: "easeOut",
                      }}
                      style={{
                        height: "100%",
                        borderRadius: "100px",
                        background: `linear-gradient(to right, ${lang.color}, ${lang.color}80)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pie-like total indicator */}
            <div
              style={{
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(14,165,233,0.1)",
              }}
            >
              <div
                style={{
                  height: "8px",
                  display: "flex",
                  gap: "2px",
                  borderRadius: "100px",
                  overflow: "hidden",
                }}
              >
                {LANGUAGES.map((lang) => (
                  <motion.div
                    key={lang.lang}
                    initial={{ flex: 0 }}
                    animate={inView ? { flex: lang.pct } : {}}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    style={{
                      backgroundColor: lang.color,
                      minWidth: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "48px",
          }}
        >
          <a
            href="https://github.com/aniqa-ayub"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "8px",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "#0ea5e9",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              transition: "all 0.2s",
              backgroundColor: "rgba(14,165,233,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(14,165,233,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "#0ea5e9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(14,165,233,0.06)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(14,165,233,0.3)";
            }}
          >
            View GitHub Profile
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
