"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, RefreshCw, Rss, AlertTriangle } from "lucide-react";

// ─── Sources ──────────────────────────────────────────────────────────────────
const SOURCES = [
  {
    id: "thn",
    label: "The Hacker News",
    abbr: "THN",
    feed: "https://feeds.feedburner.com/TheHackersNews",
    accentColor: "#e74c3c",
    description: "Breaking security news & analysis",
  },
  {
    id: "bc",
    label: "BleepingComputer",
    abbr: "BC",
    feed: "https://www.bleepingcomputer.com/feed/",
    accentColor: "#38a532",
    description: "Malware, CVEs & incident coverage",
  },
  {
    id: "krebs",
    label: "Krebs on Security",
    abbr: "KOS",
    feed: "https://krebsonsecurity.com/feed/",
    accentColor: "#3b82f6",
    description: "Investigative security journalism",
  },
  {
    id: "cisa",
    label: "CISA Advisories",
    abbr: "CISA",
    feed: "https://www.cisa.gov/cybersecurity-advisories/advisories.xml",
    accentColor: "#f59e0b",
    description: "US Government security advisories",
  },
] as const;

type SourceId = (typeof SOURCES)[number]["id"];

// ─── Static fallback (shown when RSS unavailable) ─────────────────────────────
const STATIC_FALLBACK: NewsItem[] = [
  {
    title: "XZ Utils Supply Chain Backdoor (CVE-2024-3094)",
    link: "#",
    excerpt: "A carefully engineered backdoor was discovered in the XZ Utils compression library, affecting systemd-linked SSH daemons on multiple Linux distributions.",
    pubDate: "Mar 2024",
    thumbnail: "",
    author: "Security Advisory",
  },
  {
    title: "Fortinet FortiOS Critical RCE Vulnerability",
    link: "#",
    excerpt: "An out-of-bounds write flaw in FortiOS and FortiProxy allows unauthenticated remote code execution, actively exploited in the wild before patches were available.",
    pubDate: "Feb 2024",
    thumbnail: "",
    author: "Vulnerability Report",
  },
  {
    title: "HTTP/2 Rapid Reset — Record DDoS Amplification",
    link: "#",
    excerpt: "A protocol-level vulnerability in HTTP/2 stream cancellation allows attackers to sustain record-breaking DDoS floods against web infrastructure.",
    pubDate: "Oct 2023",
    thumbnail: "",
    author: "Threat Research",
  },
  {
    title: "LockBit 3.0 Ransomware Targets Critical Infrastructure",
    link: "#",
    excerpt: "The most prolific ransomware-as-a-service operation continues double-extortion campaigns against healthcare, finance, and government sectors globally.",
    pubDate: "Ongoing",
    thumbnail: "",
    author: "Threat Intelligence",
  },
  {
    title: "Volt Typhoon Pre-Positioning in US Critical Infrastructure",
    link: "#",
    excerpt: "Chinese state-sponsored APT uses living-off-the-land techniques to maintain persistent access to US utilities, preparing for potential future disruption.",
    pubDate: "2024",
    thumbnail: "",
    author: "APT Report",
  },
  {
    title: "AI-Powered Phishing Bypasses Enterprise Defences",
    link: "#",
    excerpt: "LLM-generated spear-phishing emails are defeating traditional email security gateways with personalised content indistinguishable from legitimate communication.",
    pubDate: "2024",
    thumbnail: "",
    author: "Emerging Threats",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface NewsItem {
  title: string;
  link: string;
  excerpt: string;
  pubDate: string;
  thumbnail: string;
  author: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function stripHtml(html: string): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
  return text.length > 190 ? text.slice(0, 190) + "…" : text;
}

function relativeTime(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    if (isNaN(diff)) return dateStr;
    const h = Math.floor(diff / 3_600_000);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d ago`;
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      background: "rgba(2,8,16,0.7)", backdropFilter: "blur(16px)",
      border: "1px solid rgba(56,165,50,0.08)", borderRadius: "12px",
      padding: "0", overflow: "hidden", display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: "150px", background: "rgba(56,165,50,0.04)" }} />
      <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ height: "18px", width: "42px", borderRadius: "4px", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ height: "18px", width: "60px", borderRadius: "4px", background: "rgba(255,255,255,0.04)" }} />
        </div>
        <div style={{ height: "16px", borderRadius: "4px", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ height: "16px", width: "80%", borderRadius: "4px", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ height: "13px", width: "55%", borderRadius: "4px", background: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  );
}

// ─── News Card ────────────────────────────────────────────────────────────────
function NewsCard({
  item, accent, abbr, index,
}: {
  item: NewsItem; accent: string; abbr: string; index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = item.thumbnail && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -4, boxShadow: `0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px ${accent}33` }}
      style={{
        background: "rgba(4,12,22,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(56,165,50,0.10)", borderRadius: "12px",
        overflow: "hidden", display: "flex", flexDirection: "column",
        cursor: "default", willChange: "transform",
        borderLeft: `3px solid ${accent}`,
      }}
    >
      {/* Thumbnail / placeholder */}
      <div style={{
        height: "150px", flexShrink: 0, overflow: "hidden", position: "relative",
        background: hasImage ? "transparent" : `linear-gradient(135deg, rgba(2,8,16,0.9) 0%, ${accent}18 100%)`,
      }}>
        {hasImage ? (
          <img
            src={item.thumbnail} alt=""
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <Rss size={28} color={`${accent}55`} />
          </div>
        )}
        {/* Gradient fade at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(to top, rgba(4,12,22,0.85), transparent)",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {/* Source + date */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <span style={{
            fontSize: "9px", fontWeight: 800, letterSpacing: "0.12em",
            fontFamily: "var(--font-geist-mono), monospace",
            color: accent, background: `${accent}15`,
            border: `1px solid ${accent}35`, padding: "2px 7px", borderRadius: "4px",
          }}>
            {abbr}
          </span>
          <span style={{
            fontSize: "10px", color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-geist-mono), monospace",
          }}>
            {relativeTime(item.pubDate)}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "14px", fontWeight: 700, color: "#FFFFFF",
          lineHeight: 1.45, margin: 0, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as const, overflow: "hidden",
        }}>
          {item.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.50)",
          margin: 0,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as const, overflow: "hidden",
        }}>
          {item.excerpt}
        </p>

        {/* Footer */}
        {item.link && item.link !== "#" && (
          <a
            href={item.link} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontSize: "11px", fontWeight: 600, color: accent,
              textDecoration: "none", marginTop: "2px",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.03em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Read Article <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function ThreatLandscape() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [activeId, setActiveId] = useState<SourceId>("thn");
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const cache = useRef<Partial<Record<SourceId, NewsItem[]>>>({});
  const [displayItems, setDisplayItems] = useState<NewsItem[]>([]);

  const activeSource = SOURCES.find((s) => s.id === activeId)!;

  const fetchFeed = useCallback(async (source: (typeof SOURCES)[number]) => {
    if (cache.current[source.id]) {
      setDisplayItems(cache.current[source.id]!);
      setLoading(false);
      return;
    }
    setLoading(true);
    setUsingFallback(false);
    try {
      const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.feed)}&count=9`;
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      const data = await res.json();
      if (data.status !== "ok" || !data.items?.length) throw new Error("empty");
      const items: NewsItem[] = data.items.map((it: {
        title?: string; link?: string; description?: string;
        content?: string; pubDate?: string; thumbnail?: string;
        enclosure?: { link?: string }; author?: string;
      }) => ({
        title: it.title ?? "",
        link: it.link ?? "#",
        excerpt: stripHtml(it.description ?? it.content ?? ""),
        pubDate: it.pubDate ?? "",
        thumbnail: it.thumbnail || it.enclosure?.link || "",
        author: it.author ?? "",
      }));
      cache.current[source.id] = items;
      setDisplayItems(items);
      setLastUpdated(new Date());
    } catch {
      setUsingFallback(true);
      setDisplayItems(STATIC_FALLBACK);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + re-fetch when tab changes
  useEffect(() => {
    fetchFeed(activeSource);
  }, [activeSource, fetchFeed]);

  const handleRefresh = () => {
    delete cache.current[activeId];
    fetchFeed(activeSource);
  };

  return (
    <section
      id="threat-landscape"
      ref={ref}
      style={{ position: "relative", padding: "100px 0", backgroundColor: "#020810" }}
    >
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(56,165,50,0.04), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ marginBottom: "12px" }}
            >
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px",
                fontWeight: 600, color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
              }}>
                LIVE INTELLIGENCE
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#FFFFFF", margin: 0 }}
            >
              Intelligence{" "}
              <span style={{
                background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Feed
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.50)", margin: "8px 0 0", fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {activeSource.description} · {usingFallback ? "Curated feed" : lastUpdated ? `Updated ${relativeTime(lastUpdated.toISOString())}` : "Fetching…"}
            </motion.p>
          </div>

          {/* Refresh button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
            onClick={handleRefresh}
            disabled={loading}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "8px",
              background: "rgba(56,165,50,0.08)", border: "1px solid rgba(56,165,50,0.20)",
              color: "#38a532", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px",
              fontWeight: 600, letterSpacing: "0.06em",
              opacity: loading ? 0.5 : 1, transition: "opacity 0.2s",
            }}
          >
            <RefreshCw size={13} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            Refresh
          </motion.button>
        </div>

        {/* Source tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          style={{
            display: "flex", flexWrap: "wrap", gap: "6px",
            marginBottom: "32px",
          }}
        >
          {SOURCES.map((src) => {
            const active = activeId === src.id;
            return (
              <button
                key={src.id}
                onClick={() => setActiveId(src.id)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "8px 18px", borderRadius: "8px",
                  border: active ? `1px solid ${src.accentColor}60` : "1px solid rgba(56,165,50,0.12)",
                  backgroundColor: active ? `${src.accentColor}14` : "rgba(2,8,16,0.6)",
                  color: active ? src.accentColor : "rgba(255,255,255,0.50)",
                  fontSize: "12px", fontWeight: 600, cursor: "pointer",
                  fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em",
                  transition: "all 0.2s",
                }}
              >
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  backgroundColor: active ? src.accentColor : "rgba(255,255,255,0.2)",
                  flexShrink: 0, transition: "background 0.2s",
                }} />
                {src.label}
              </button>
            );
          })}
        </motion.div>

        {/* Fallback notice */}
        {usingFallback && (
          <div style={{
            display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px",
            padding: "10px 16px", borderRadius: "8px",
            background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)",
          }}>
            <AlertTriangle size={14} color="#f59e0b" />
            <span style={{
              fontSize: "12px", color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-geist-mono), monospace",
            }}>
              Live feed unavailable — showing curated threat intelligence
            </span>
          </div>
        )}

        {/* Cards grid */}
        {loading ? (
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {displayItems.map((item, i) => (
              <NewsCard
                key={item.link + i}
                item={item}
                accent={activeSource.accentColor}
                abbr={activeSource.abbr}
                index={i}
              />
            ))}
          </motion.div>
        )}

        {/* Attribution */}
        <div style={{
          marginTop: "36px", paddingTop: "20px",
          borderTop: "1px solid rgba(56,165,50,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
        }}>
          <Rss size={11} color="rgba(255,255,255,0.25)" />
          <span style={{
            fontSize: "11px", color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.05em",
          }}>
            Powered by {activeSource.label} · Content belongs to respective publishers
          </span>
        </div>

      </div>
    </section>
  );
}
