"use client";

import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-cyber-accent" />
            <span className="font-mono font-bold text-sm text-cyber-accent tracking-widest">
              ARES<span className="text-cyber-muted mx-1.5">//</span>
              <span className="text-cyber-text">INTEL</span>
            </span>
          </div>

          <p className="text-cyber-muted font-mono text-xs">
            TLP:WHITE — All content for educational purposes only
          </p>

          <p className="text-cyber-muted/50 font-mono text-xs text-center md:text-right">
            © 2024 Aniqa Ayub. All rights reserved.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/4 flex flex-wrap justify-center gap-6 text-xs font-mono text-cyber-muted/40">
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
