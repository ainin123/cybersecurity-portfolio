"use client";

import { Lock, GitBranch, AtSign, Download } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,229,255,0.1)",
        backgroundColor: "#0A192F",
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
          <div
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
                background: "linear-gradient(135deg, #00E5FF, rgba(0,229,255,0.5))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lock size={13} color="#0A192F" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  color: "#CCD6F6",
                }}
              >
                ANIQA{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #00E5FF, rgba(0,229,255,0.6))",
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
                  color: "#8892B0",
                  letterSpacing: "0.04em",
                  marginTop: "2px",
                }}
              >
                Cybersecurity Researcher &amp; AI Security Engineer
              </div>
            </div>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/aniqa-ayub"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#8892B0",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#00E5FF")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#8892B0")
              }
            >
              <GitBranch size={14} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/aniqa-ayub"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#8892B0",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#00E5FF")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#8892B0")
              }
            >
              <AtSign size={14} />
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              download
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#8892B0",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#00E5FF")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#8892B0")
              }
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(0,229,255,0.06)",
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
              color: "#475569",
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
        </div>
      </div>
    </footer>
  );
}
