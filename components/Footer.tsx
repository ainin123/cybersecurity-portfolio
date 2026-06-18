"use client";

import { useRef } from "react";
import { Lock, GitBranch, AtSign, Download } from "lucide-react";
import { motion, useInView } from "framer-motion";

const BLUR_FADE_EASE = [0.25, 0.4, 0.25, 1] as const;

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <footer
      ref={ref}
      style={{
        borderTop: "1px solid rgba(56,165,50,0.1)",
        backgroundColor: "#020810",
        padding: "48px 0 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, ease: BLUR_FADE_EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #38a532, rgba(56,165,50,0.5))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lock size={13} color="#020810" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  color: "#FFFFFF",
                }}
              >
                ANIQA{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AYUB
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.04em",
                  marginTop: "2px",
                }}
              >
                Cybersecurity Researcher &amp; AI Security Engineer
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: BLUR_FADE_EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <motion.a
              href="https://github.com/aniqa-ayub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: "#38a532" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#38a532")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")
              }
            >
              <GitBranch size={14} />
              GitHub
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/aniqa-ayub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: "#38a532" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#38a532")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")
              }
            >
              <AtSign size={14} />
              LinkedIn
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ y: -2, color: "#38a532" }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#38a532")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")
              }
            >
              <Download size={14} />
              Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: BLUR_FADE_EASE }}
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(56,165,50,0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            &copy; 2024 Aniqa Ayub. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#334155",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Built with Next.js &bull; Tailwind CSS &bull; Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

