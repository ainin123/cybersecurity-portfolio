"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, Tag, ArrowRight, BookOpen } from "lucide-react";

// ─── Blog Data ────────────────────────────────────────────────────────────────
type Category = "SIEM & AI" | "Threat Intelligence" | "AI & Research" | "Tutorials";

interface Post {
  id: number;
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const CATEGORY_COLORS: Record<Category, { text: string; bg: string; border: string }> = {
  "SIEM & AI":          { text: "#38a532", bg: "rgba(56,165,50,0.10)",   border: "rgba(56,165,50,0.25)"   },
  "Threat Intelligence":{ text: "#f59e0b", bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.25)"  },
  "AI & Research":      { text: "#3b82f6", bg: "rgba(59,130,246,0.10)",  border: "rgba(59,130,246,0.25)"  },
  "Tutorials":          { text: "#a855f7", bg: "rgba(168,85,247,0.10)",  border: "rgba(168,85,247,0.25)"  },
};

const POSTS: Post[] = [
  {
    id: 1,
    slug: "transformer-pii-detection-siem",
    category: "SIEM & AI",
    featured: true,
    title: "Transformer Ensembles for Real-Time PII Masking in SOC Log Streams",
    excerpt:
      "A deep dive into how fine-tuned transformer architectures — combined via ensemble fusion — can detect and mask Personally Identifiable Information within high-throughput SIEM log pipelines. We cover model selection, cross-format generalisation across syslog, CEF, and JSON, and the latency trade-offs of deploying NLP inference inside a live SOC.",
    date: "Jun 2025",
    readTime: "9 min read",
    tags: ["Transformers", "SIEM", "PII", "NLP", "SOC"],
  },
  {
    id: 2,
    slug: "mitre-attack-soc-coverage-gaps",
    category: "Threat Intelligence",
    title: "MITRE ATT&CK in the Real World: Mapping Coverage Gaps in a National SOC",
    excerpt:
      "Moving beyond the framework poster — how ATT&CK Navigator surfaces detection blind spots, guides SIEM rule prioritisation, and turns abstract tactics into measurable engineering goals inside a production SOC environment.",
    date: "May 2025",
    readTime: "6 min read",
    tags: ["MITRE", "ATT&CK", "SOC", "Detection Engineering"],
  },
  {
    id: 3,
    slug: "ai-correlation-alert-fatigue",
    category: "SIEM & AI",
    title: "AI-Driven Alert Correlation: Eliminating Alert Fatigue at the Source",
    excerpt:
      "Rule-based correlation in traditional SIEMs floods analysts with thousands of daily alerts, the vast majority false positives. This post explores how ML-driven cross-source event correlation identifies genuine attack chains that static rules miss — and cuts false-positive rates by an order of magnitude.",
    date: "Apr 2025",
    readTime: "7 min read",
    tags: ["Alert Fatigue", "ML", "SIEM", "Correlation"],
  },
  {
    id: 4,
    slug: "explainable-ai-hate-speech-shap",
    category: "AI & Research",
    title: "Why Explainability Matters in AI Security: SHAP-Based Hate Speech Detection",
    excerpt:
      "When we built our anti-religion hate speech detection system, high F1-scores were not enough — content moderators and auditors needed to understand exactly why the model flagged a post. A practical look at integrating SHAP explanations into a production NLP pipeline to support compliance and human-in-the-loop review.",
    date: "Mar 2025",
    readTime: "5 min read",
    tags: ["XAI", "SHAP", "NLP", "Content Moderation"],
  },
  {
    id: 5,
    slug: "wazuh-enterprise-deployment",
    category: "Tutorials",
    title: "Wazuh SIEM: Enterprise Deployment from Architecture to SOAR Integration",
    excerpt:
      "An end-to-end field guide to deploying Wazuh at enterprise scale — covering architecture planning, agent rollout across heterogeneous endpoints, custom rule authoring, Elastic Stack integration for long-term retention, and wiring Wazuh alerts into a SOAR playbook.",
    date: "Feb 2025",
    readTime: "12 min read",
    tags: ["Wazuh", "SIEM", "SOAR", "Elastic Stack"],
  },
  {
    id: 6,
    slug: "network-forensics-incident-response",
    category: "Tutorials",
    title: "Network Forensics for Incident Responders: A Practitioner's Field Guide",
    excerpt:
      "From packet capture to timeline reconstruction — the tools, methodologies, and cognitive frameworks that matter most when you are under pressure to triage a live incident. Covers Wireshark, Zeek, flow analysis, and evidence preservation best practices.",
    date: "Jan 2025",
    readTime: "8 min read",
    tags: ["Forensics", "Incident Response", "Wireshark", "Zeek"],
  },
];

const CATEGORIES: Array<Category | "All"> = ["All", "SIEM & AI", "Threat Intelligence", "AI & Research", "Tutorials"];
const EASE = [0.25, 0.4, 0.25, 1] as const;

// ─── Featured Post Card ───────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
  const cfg = CATEGORY_COLORS[post.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{
        background: "linear-gradient(135deg, rgba(4,14,26,0.85) 0%, rgba(6,24,13,0.78) 50%, rgba(4,14,26,0.85) 100%)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(56,165,50,0.14)",
        borderLeft: `4px solid ${cfg.text}`,
        borderRadius: "16px", padding: "36px 40px",
        marginBottom: "24px", position: "relative", overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "100%", pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 80% at 100% 50%, ${cfg.text}08, transparent)`,
      }} />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "9px", fontWeight: 800, letterSpacing: "0.18em",
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#38a532", background: "rgba(56,165,50,0.12)",
          border: "1px solid rgba(56,165,50,0.3)", padding: "3px 10px", borderRadius: "4px",
        }}>
          FEATURED
        </span>
        <span style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em",
          fontFamily: "var(--font-geist-mono), monospace",
          color: cfg.text, background: cfg.bg, border: `1px solid ${cfg.border}`,
          padding: "3px 10px", borderRadius: "4px",
        }}>
          {post.category}
        </span>
        <span style={{
          marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,0.35)",
          fontFamily: "var(--font-geist-mono), monospace", display: "flex", alignItems: "center", gap: "4px",
        }}>
          <Clock size={11} /> {post.readTime}
        </span>
      </div>

      <h3 style={{
        fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 800,
        color: "#FFFFFF", lineHeight: 1.35, margin: "0 0 14px 0",
      }}>
        {post.title}
      </h3>

      <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.60)", margin: "0 0 22px 0" }}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} style={{
              fontSize: "10px", padding: "2px 8px", borderRadius: "4px",
              fontFamily: "var(--font-geist-mono), monospace",
              color: "rgba(255,255,255,0.45)", background: "rgba(56,165,50,0.06)",
              border: "1px solid rgba(56,165,50,0.10)",
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>
            Aniqa Ayub · {post.date}
          </span>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "8px 18px", borderRadius: "8px",
            background: "rgba(56,165,50,0.12)", border: "1px solid rgba(56,165,50,0.30)",
            color: "#38a532", cursor: "pointer",
            fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600,
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(56,165,50,0.20)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(56,165,50,0.12)";
            }}
          >
            Read Post <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Regular Post Card ────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: Post; index: number }) {
  const cfg = CATEGORY_COLORS[post.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -5, boxShadow: `0 20px 56px rgba(0,0,0,0.4), 0 0 0 1px ${cfg.text}22` }}
      style={{
        background: "rgba(4,12,22,0.80)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(56,165,50,0.09)",
        borderTop: `3px solid ${cfg.text}`,
        borderRadius: "12px", padding: "24px",
        display: "flex", flexDirection: "column", gap: "12px",
        willChange: "transform", cursor: "default",
      }}
    >
      {/* Category + read time */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em",
          fontFamily: "var(--font-geist-mono), monospace",
          color: cfg.text, background: cfg.bg, border: `1px solid ${cfg.border}`,
          padding: "2px 8px", borderRadius: "4px",
        }}>
          {post.category}
        </span>
        <span style={{
          fontSize: "10px", color: "rgba(255,255,255,0.30)",
          fontFamily: "var(--font-geist-mono), monospace",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          <Clock size={10} /> {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "15px", fontWeight: 700, color: "#FFFFFF",
        lineHeight: 1.4, margin: 0, flex: 1,
      }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        fontSize: "12px", lineHeight: 1.7, color: "rgba(255,255,255,0.50)", margin: 0,
        display: "-webkit-box", WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical" as const, overflow: "hidden",
      }}>
        {post.excerpt}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {post.tags.slice(0, 3).map((t) => (
          <span key={t} style={{
            fontSize: "9px", padding: "2px 7px", borderRadius: "4px",
            fontFamily: "var(--font-geist-mono), monospace",
            color: "rgba(255,255,255,0.40)", background: "rgba(56,165,50,0.05)",
            border: "1px solid rgba(56,165,50,0.10)",
          }}>
            <Tag size={7} style={{ display: "inline", verticalAlign: "middle", marginRight: "3px" }} />
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        paddingTop: "12px", borderTop: "1px solid rgba(56,165,50,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: "10px", color: "rgba(255,255,255,0.28)",
          fontFamily: "var(--font-geist-mono), monospace",
        }}>
          {post.date}
        </span>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "none", border: "none", cursor: "pointer",
          color: cfg.text, fontSize: "11px", fontWeight: 600,
          fontFamily: "var(--font-geist-mono), monospace",
          padding: 0, transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Read More <ArrowRight size={11} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function BlogSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);
  const filtered = activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);
  const showFeatured = activeCategory === "All" || activeCategory === featured.category;

  return (
    <section
      id="blog"
      ref={ref}
      style={{ position: "relative", padding: "100px 0", backgroundColor: "#070709" }}
    >
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 45% at 80% 20%, rgba(56,165,50,0.05), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
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
                SECURITY INSIGHTS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#FFFFFF", margin: 0 }}
            >
              From the{" "}
              <span style={{
                background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Field
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.50)", margin: "8px 0 0", fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Technical writing on SIEM, AI security & threat intelligence
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <BookOpen size={14} color="rgba(56,165,50,0.7)" />
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px",
              color: "rgba(56,165,50,0.7)", letterSpacing: "0.06em",
            }}>
              {POSTS.length} Posts
            </span>
          </motion.div>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "32px" }}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            const cfg = cat !== "All" ? CATEGORY_COLORS[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "7px 16px", borderRadius: "8px",
                  border: active ? `1px solid ${cfg ? cfg.text + "55" : "rgba(56,165,50,0.5)"}` : "1px solid rgba(56,165,50,0.10)",
                  backgroundColor: active ? (cfg ? `${cfg.text}12` : "rgba(56,165,50,0.12)") : "rgba(2,8,16,0.5)",
                  color: active ? (cfg ? cfg.text : "#38a532") : "rgba(255,255,255,0.45)",
                  fontSize: "12px", fontWeight: 600, cursor: "pointer",
                  fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em",
                  transition: "all 0.2s",
                }}
              >
                {cat}
                <span style={{
                  fontSize: "9px", padding: "1px 5px", borderRadius: "100px",
                  background: active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                  color: active ? (cfg ? cfg.text : "#38a532") : "rgba(255,255,255,0.30)",
                }}>
                  {cat === "All" ? POSTS.length : POSTS.filter((p) => p.category === cat).length}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Featured post */}
        <AnimatePresence mode="wait">
          {showFeatured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <FeaturedCard post={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 0",
            color: "rgba(255,255,255,0.30)",
            fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px",
          }}>
            No posts in this category yet.
          </div>
        )}

      </div>
    </section>
  );
}
