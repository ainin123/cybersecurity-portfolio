"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, Radio } from "lucide-react";

const navLinks = [
  { href: "#mission", label: "MISSION" },
  { href: "#capabilities", label: "CAPABILITIES" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#research", label: "RESEARCH LAB" },
  { href: "#publications", label: "PUBLICATIONS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cyber-bg/90 backdrop-blur-xl border-b border-cyber-primary/20 shadow-lg shadow-cyber-primary/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Shield className="w-7 h-7 text-cyber-primary" />
              <span className="absolute inset-0 animate-ping opacity-20">
                <Shield className="w-7 h-7 text-cyber-primary" />
              </span>
            </div>
            <span className="font-mono font-bold text-lg tracking-widest text-cyber-primary">
              ARES
              <span className="text-cyber-muted mx-1">//</span>
              <span className="text-cyber-text">INTEL</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-xs font-mono font-semibold tracking-widest transition-all duration-200 ${
                    isActive
                      ? "text-cyber-primary"
                      : "text-cyber-muted hover:text-cyber-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-cyber-primary/10 border border-cyber-primary/30 rounded"
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Status + hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded border border-cyber-green/30 bg-cyber-green/5">
              <Radio className="w-3 h-3 text-cyber-green" />
              <span className="text-xs font-mono text-cyber-green tracking-wider">
                SYS:ONLINE
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyber-green"
                style={{ animation: "pulse-glow 2s infinite" }}
              />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-cyber-text p-1"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-0 z-40 bg-cyber-bg/95 backdrop-blur-xl border-b border-cyber-primary/20 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 text-sm font-mono font-semibold tracking-widest text-cyber-muted hover:text-cyber-primary hover:bg-cyber-primary/5 rounded transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
