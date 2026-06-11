"use client";

import { Shield, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-cyber-primary/10 bg-cyber-surface/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-cyber-primary" />
            <span className="font-mono font-bold text-cyber-primary tracking-widest">
              ARES<span className="text-cyber-muted mx-1">//</span>INTEL
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 text-cyber-muted font-mono text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>
              TLP:WHITE | All content for educational purposes only
            </span>
          </div>

          {/* Copyright */}
          <div className="text-cyber-muted font-mono text-xs text-center md:text-right">
            <span className="text-cyber-primary">©</span> 2024 ARES INTEL. All rights reserved.
            <br />
            <span className="text-cyber-muted/50">Built with Next.js • Powered by threat data</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-6 text-xs font-mono text-cyber-muted/50">
          <span>RESPONSIBLE DISCLOSURE</span>
          <span>•</span>
          <span>PRIVACY POLICY</span>
          <span>•</span>
          <span>PGP PUBLIC KEY</span>
          <span>•</span>
          <span>TERMS OF ENGAGEMENT</span>
        </div>
      </div>
    </footer>
  );
}
