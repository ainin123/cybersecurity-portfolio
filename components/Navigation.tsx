"use client";

import { useEffect, useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import ScrollProgress from "./ScrollProgress";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ScrollProgress />
      <header
        style={{
          position: "fixed",
          top: "2px",
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(2,8,16,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(56,165,50,0.12)"
            : "1px solid transparent",
        }}
      >
        <nav
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "7px",
                background: "linear-gradient(135deg, #38a532 0%, rgba(56,165,50,0.5) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Lock size={14} color="#020810" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.12em",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
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
            </span>
          </button>

          {/* Desktop Links */}
          <ul
            style={{
              display: "flex",
              gap: "2px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    style={{
                      background: isActive ? "rgba(56,165,50,0.10)" : "transparent",
                      border: "none",
                      borderBottom: isActive ? "2px solid #38a532" : "2px solid transparent",
                      cursor: "pointer",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: isActive ? "#38a532" : "rgba(255,255,255,0.60)",
                      transition: "all 0.2s ease",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(56,165,50,0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.60)";
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FFFFFF",
              padding: "6px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden"
            style={{
              background: "rgba(2,8,16,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(56,165,50,0.12)",
              padding: "12px 24px 20px",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: isActive ? "rgba(56,165,50,0.10)" : "transparent",
                        border: "none",
                        borderLeft: isActive ? "2px solid #38a532" : "2px solid transparent",
                        cursor: "pointer",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: isActive ? "#38a532" : "rgba(255,255,255,0.60)",
                        fontFamily: "var(--font-geist-mono), monospace",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(56,165,50,0.06)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.60)";
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

