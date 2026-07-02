"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Server, Target, BookOpen, Briefcase, CircleCheck } from "lucide-react";

const FOCUS_AREAS = [
  { icon: Server, label: "SIEM Engineering", desc: "Detection engineering, SOAR integration, log management" },
  { icon: Target, label: "Penetration Testing", desc: "VAPT, web application, network reconnaissance" },
  { icon: Shield, label: "Network Defense", desc: "SOC operations, behavioural analytics, incident response" },
];

const CORE_VALUES = ["Precision", "Leadership", "Innovation", "Integrity"];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [profileHovered, setProfileHovered] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 0",
        backgroundColor: "#020810",
      }}
    >
      <div
        className="grid-overlay"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
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
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              fontWeight: 600,
              color: "#38a532",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ABOUT
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "60px",
            color: "#FFFFFF",
          }}
        >
          Defending Networks with{" "}
          <span
            style={{
              background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Precision & Intelligence
          </span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gap: "48px",
            alignItems: "start",
          }}
          className="lg:grid-cols-2"
        >
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "24px",
              }}
            >
              Security researcher and engineer with expertise in designing and
              deploying enterprise security monitoring solutions for critical
              national infrastructure. Proficient in behavioural analytics,
              threat intelligence integration, and cloud security deployment,
              building detection systems, automating critical workflows, and
              enforcing multi-tenant access governance across complex
              environments.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "40px",
              }}
            >
              Skilled in SOC analysis, vulnerability management, penetration
              testing, and automated incident response. Experienced in
              end-to-end security engagements, from detection engineering and
              external intelligence integration to product demonstrations and
              executive-level client presentations, translating technical
              findings into clear, actionable security outcomes.
            </p>

            {/* Focus areas */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ gap: "16px" }}
            >
              {FOCUS_AREAS.map((area, i) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{
                    padding: "18px 14px",
                    background: "rgba(2,8,16,0.7)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(56,165,50,0.12)",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(56,165,50,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <area.icon size={18} color="#38a532" />
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "4px",
                    }}
                  >
                    {area.label}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.4,
                    }}
                  >
                    {area.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Glass card with facts */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
            style={{
              background: "rgba(2,8,16,0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: profileHovered ? "1px solid rgba(56,165,50,0.35)" : "1px solid rgba(56,165,50,0.12)",
              borderRadius: "16px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s",
            }}
          >
            {/* Scanning line effect on hover */}
            {profileHovered && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(to right, transparent, rgba(56,165,50,0.5), transparent)",
                  animation: "scan-sweep 1.2s linear infinite",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            )}
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#38a532",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono), monospace",
                marginBottom: "24px",
              }}
            >
              Key Information
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "28px" }}>
              {[
                {
                  icon: BookOpen,
                  label: "Education",
                  value: "MS Cyber Security, Air University (2022–2025)",
                },
                {
                  icon: Target,
                  label: "Focus Areas",
                  value: "SIEM, SOC Analysis, Penetration Testing, Network Defense",
                },
                {
                  icon: CircleCheck,
                  label: "Current Role",
                  value: "Research Associate, National Centre for Cyber Security (NCCS), National Aerospace, Science and Technology Park (NASTP)",
                  highlight: true,
                },
                {
                  icon: Briefcase,
                  label: "Experience",
                  value: "Security Engineering, Cloud Security, AI Detection, Deployment Automation",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(56,165,50,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <item.icon size={15} color="#38a532" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.65)",
                        marginBottom: "2px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: item.highlight ? "#38a532" : "#FFFFFF",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Values */}
            <div
              style={{
                borderTop: "1px solid rgba(56,165,50,0.1)",
                paddingTop: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Core Values
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {CORE_VALUES.map((v) => (
                  <span
                    key={v}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "3px",
                      border: "1px solid rgba(56,165,50,0.15)",
                      borderLeft: "3px solid rgba(56,165,50,0.45)",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "12px",
                      fontWeight: 500,
                      fontFamily: "var(--font-geist-mono), monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

