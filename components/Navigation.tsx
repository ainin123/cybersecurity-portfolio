"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";

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
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cyber-bg/95 backdrop-blur-xl border-b border-cyber-accent/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
          >
            <Shield className="w-5 h-5 text-cyber-accent" />
            <span className="font-mono font-bold text-sm tracking-widest text-cyber-accent">
              ARES<span className="text-cyber-muted mx-1.5">//</span>
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
                  className={`relative px-4 py-2 text-xs font-mono tracking-widest transition-all duration-200 ${
                    isActive ? "text-cyber-accent" : "text-cyber-muted hover:text-cyber-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 border border-cyber-accent/25 bg-cyber-accent/5 rounded"
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Status dot + burger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyber-accent"
                style={{ animation: "pulse-glow 2s infinite" }}
              />
              <span className="text-xs font-mono text-cyber-muted tracking-widest">
                ONLINE
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-cyber-muted p-1"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 bg-cyber-bg/98 backdrop-blur-xl border-b border-cyber-accent/10 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-3 py-3 text-xs font-mono tracking-widest text-cyber-muted hover:text-cyber-accent transition-colors"
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
