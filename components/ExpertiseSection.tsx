"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck, Brain, Cloud, Cpu, Search, Lock,
  BarChart2, GitMerge, AlertTriangle, Users, Lightbulb, Server,
} from "lucide-react";

const EXPERTISE_CARDS = [
  {
    icon: ShieldCheck,
    title: "Threat Detection & Response",
    body: "Design and operationalise end-to-end detection pipelines that correlate multi-source telemetry, surface high-fidelity alerts, and drive automated containment workflows — reducing mean time to respond across enterprise environments.",
  },
  {
    icon: Brain,
    title: "AI-Augmented Security",
    body: "Integrate large language models and machine learning classifiers into security operations to accelerate triage, generate plain-language incident narratives, and automate repetitive analyst tasks without sacrificing accuracy.",
  },
  {
    icon: Cloud,
    title: "Cloud Security Architecture",
    body: "Architect identity-centric, zero-trust cloud environments with layered access controls, continuous posture assessment, encrypted data pathways, and policy-as-code enforcement across multi-cloud deployments.",
  },
  {
    icon: BarChart2,
    title: "SIEM Engineering & Optimisation",
    body: "Build and tune enterprise-grade SIEM platforms — normalising disparate log sources, crafting high-precision correlation rules, and implementing data-retention strategies that balance investigative depth with cost efficiency.",
  },
  {
    icon: Search,
    title: "Threat Intelligence & Hunting",
    body: "Operationalise structured threat intelligence to inform proactive hypothesis-driven hunts, adversary emulation exercises, and continuous detection coverage aligned to the ATT&CK framework.",
  },
  {
    icon: Cpu,
    title: "Security Automation & Orchestration",
    body: "Author reusable playbooks and orchestration workflows that connect detection, enrichment, and response tooling — enabling consistent, auditable actions at machine speed with full analyst oversight.",
  },
  {
    icon: Lock,
    title: "Identity & Access Governance",
    body: "Implement least-privilege access models, privileged-access management, and role-based control frameworks that enforce separation of duties and provide granular audit trails for compliance and forensic investigation.",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability & Risk Management",
    body: "Prioritise remediation efforts through risk-scored vulnerability programmes that contextualise asset criticality, exploitability, and business impact — enabling teams to focus limited resources on the highest-value fixes.",
  },
  {
    icon: GitMerge,
    title: "DevSecOps & Secure SDLC",
    body: "Embed security checkpoints throughout the software delivery pipeline — integrating static analysis, dependency scanning, secrets detection, and infrastructure-as-code validation into CI/CD workflows.",
  },
  {
    icon: Server,
    title: "Log Management & Data Engineering",
    body: "Design scalable ingestion architectures that normalise structured and unstructured logs at volume, enrich events with contextual metadata, and feed downstream analytics and detection systems reliably.",
  },
  {
    icon: Lightbulb,
    title: "Security Research & Innovation",
    body: "Conduct applied research at the intersection of AI and cybersecurity — producing peer-reviewed findings, novel detection methodologies, and proof-of-concept implementations that advance the field.",
  },
  {
    icon: Users,
    title: "Cross-Functional Collaboration",
    body: "Bridge technical and business stakeholders through clear risk communication, executive briefings, and translating complex threat landscapes into actionable prioritised roadmaps that align security investment to organisational goals.",
  },
];

const CONTRIBUTIONS = [
  "Reduced false-positive alert volume by over 60% through precision tuning of behavioural detection rules, enabling analysts to focus on genuine threats and cutting triage time across a 24/7 operations environment.",
  "Designed and deployed an AI-powered log analysis system that automatically classifies security events, extracts PII for redaction, and generates structured incident summaries — cutting manual enrichment effort by more than half.",
  "Built a modular threat intelligence integration layer that ingests, normalises, and correlates indicators from multiple open and commercial feeds, improving detection coverage against emerging adversary campaigns.",
  "Architected a zero-trust cloud security framework incorporating microsegmentation, continuous identity verification, and automated policy enforcement — adopted as the baseline standard across production workloads.",
  "Authored a full-cycle automated incident response capability that executes containment, evidence preservation, and stakeholder notification within minutes of confirmed threat validation.",
  "Delivered security capability demonstrations and stakeholder briefings that translated technical findings into risk-quantified business language, securing executive sponsorship for strategic security programmes.",
  "Developed infrastructure-as-code pipelines for repeatable, audit-ready security platform deployments — reducing provisioning time from days to hours and eliminating configuration drift.",
  "Published peer-reviewed research on AI-assisted anomaly detection, contributing novel methodologies now cited in academic and practitioner literature on next-generation security operations.",
];

const PROJECTS = [
  {
    tag: "AI & Security Operations",
    title: "Intelligent Security Event Classifier",
    description:
      "Developed a production-grade machine learning pipeline that ingests raw security telemetry, classifies events by threat category, and auto-generates analyst-ready incident reports — reducing triage time and enabling tier-1 teams to handle higher alert volumes without additional headcount.",
    outcomes: ["60%+ reduction in analyst triage time", "Multi-source log correlation", "Natural language incident summaries"],
  },
  {
    tag: "Threat Detection Engineering",
    title: "Behavioural Anomaly Detection Platform",
    description:
      "Engineered a user and entity behaviour analytics system using statistical baselining and ML-driven deviation scoring. Detects insider threats, compromised credentials, and lateral movement patterns that signature-based tools routinely miss.",
    outcomes: ["Detects credential-based lateral movement", "Adaptive baselining per user role", "ATT&CK technique mapping"],
  },
  {
    tag: "Cloud Security",
    title: "Zero-Trust Cloud Posture Engine",
    description:
      "Designed an automated cloud security posture management system that continuously evaluates infrastructure configurations against security benchmarks, raises prioritised findings, and triggers remediation workflows — ensuring consistent control enforcement across dynamic cloud environments.",
    outcomes: ["Continuous compliance monitoring", "Policy-as-code enforcement", "Automated drift remediation"],
  },
  {
    tag: "Security Research",
    title: "AI-Driven Threat Intelligence Synthesiser",
    description:
      "Built a research prototype that aggregates unstructured threat intelligence from multiple sources, applies NLP classification to extract structured indicators and actor tactics, and surfaces actionable hunting leads — transforming noisy raw data into operationally relevant intelligence.",
    outcomes: ["NLP-based indicator extraction", "Multi-feed normalisation", "Hunt hypothesis generation"],
  },
];

const DOMAINS = [
  {
    key: "ai",
    label: "AI & Security Innovation",
    content: {
      heading: "Pioneering AI-Driven Security Operations",
      body: "Security operations teams are overwhelmed by alert volume and data complexity. My work applies large language models, supervised classifiers, and anomaly detection models directly inside the SOC — not as a research curiosity, but as operational tooling that analysts interact with every shift. I have designed systems that translate raw log streams into human-readable incident narratives, built classifiers that distinguish genuine threats from noise with high precision, and created AI-assisted triage flows that preserve analyst judgement while eliminating mechanical toil. This research is grounded in real-world operational constraints: latency budgets, data privacy requirements, and the need for explainable outputs that auditors and incident commanders can verify.",
      points: [
        "LLM-based incident narrative generation for tier-1 and tier-2 analysts",
        "Supervised and semi-supervised classifiers for security event categorisation",
        "PII detection and automated redaction within log pipelines",
        "Explainable AI outputs aligned to compliance and audit requirements",
        "Adversarial robustness testing of AI-assisted detection systems",
      ],
    },
  },
  {
    key: "cloud",
    label: "Cloud Security",
    content: {
      heading: "Zero-Trust Architecture for Modern Cloud Environments",
      body: "Cloud adoption fundamentally changes the threat surface: identities become the new perimeter, workloads are ephemeral, and configuration drift is constant. I design cloud security programmes that begin with identity governance — ensuring every principal operates under least-privilege — and extend through network microsegmentation, workload protection, secrets management, and continuous posture validation. Every control is expressed as code, version-controlled, and tested in CI/CD pipelines so that security policies travel with infrastructure rather than being applied as an afterthought. The result is a security posture that scales with the organisation and degrades gracefully under adversarial pressure.",
      points: [
        "Identity-first zero-trust architecture design and implementation",
        "Infrastructure-as-code security controls with automated validation",
        "Continuous cloud security posture management and drift detection",
        "Secrets management and cryptographic key lifecycle governance",
        "Multi-cloud security baseline development and enforcement",
      ],
    },
  },
  {
    key: "detection",
    label: "Threat Detection & Response",
    content: {
      heading: "High-Fidelity Detection at Enterprise Scale",
      body: "Effective detection is not about the volume of alerts — it is about the ratio of actionable signals to noise. I build detection programmes that start with adversary behaviour modelling (mapped to established frameworks), translate techniques into precise, testable detection logic, and continuously validate coverage through purple team exercises and detection engineering reviews. Response capabilities are designed with the same rigour: playbooks are automated where determinism is possible, human-in-the-loop where judgement is required, and every action is auditable. The goal is a detection and response programme that a SOC team can trust, measure, and improve.",
      points: [
        "Adversary behaviour modelling and ATT&CK-aligned detection coverage mapping",
        "High-precision correlation rule development with measurable false-positive targets",
        "Automated response playbook authoring and orchestration",
        "Detection validation through continuous purple team and adversary simulation",
        "SOC metrics programme design: MTTD, MTTR, detection coverage scoring",
      ],
    },
  },
  {
    key: "automation",
    label: "Automation & Engineering",
    content: {
      heading: "Security Engineering at DevOps Velocity",
      body: "Security controls that require manual configuration cannot keep pace with modern engineering teams. I embed security into the development lifecycle and the operational runbook simultaneously — integrating static analysis, dependency scanning, and secrets detection into every CI pipeline while maintaining orchestrated response workflows that execute containment actions in seconds. Infrastructure provisioning is fully automated and policy-validated so that every new environment arrives in a known-good security state. This engineering discipline turns security from a deployment blocker into a delivery enabler.",
      points: [
        "CI/CD security gate integration: SAST, dependency scanning, IaC validation",
        "SOAR playbook development for automated containment and evidence preservation",
        "Security platform deployment automation with configuration-as-code",
        "API-driven integration between detection, enrichment, and response tooling",
        "Security engineering metrics and automated regression testing for detection logic",
      ],
    },
  },
];

const LEADERSHIP = [
  {
    title: "Research Leadership",
    body: "Led applied security research programmes producing peer-reviewed publications, proof-of-concept implementations, and technical reports that translate academic findings into practitioner-ready guidance.",
  },
  {
    title: "Stakeholder Communication",
    body: "Regularly brief technical and executive audiences on threat landscape, programme risk posture, and strategic recommendations — translating complex findings into clear, prioritised business language.",
  },
  {
    title: "Knowledge Transfer",
    body: "Mentor analysts and engineers through structured knowledge-sharing, documentation, and hands-on pairing — building team capability and reducing single-point-of-failure dependencies on specialist knowledge.",
  },
];

export default function ExpertiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeDomain, setActiveDomain] = useState("ai");
  const domain = DOMAINS.find((d) => d.key === activeDomain)!;

  return (
    <section
      id="expertise"
      ref={ref}
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "16px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px", fontWeight: 600,
            color: "#38a532", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            EXPERTISE
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Professional Experience &{" "}
          <span style={{
            background: "linear-gradient(to right, #38a532, rgba(56,165,50,0.6))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Core Capabilities
          </span>
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            margin: "0 0 64px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: "680px",
          }}
        >
          Cybersecurity researcher and security engineer with hands-on expertise across threat detection, AI-augmented security operations, cloud architecture, and automated incident response — delivering measurable impact in complex enterprise environments.
        </motion.p>

        {/* ── Professional Summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{
            background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.68) 50%, rgba(2,8,16,0.72) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(56,165,50,0.15)",
            borderRadius: "20px",
            padding: "40px 48px",
            marginBottom: "56px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.4), transparent)",
          }} />
          <div style={{
            display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap",
            marginBottom: "20px",
          }}>
            <span style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#38a532", background: "rgba(56,165,50,0.08)",
              border: "1px solid rgba(56,165,50,0.2)", borderRadius: "4px",
              padding: "3px 10px",
            }}>
              Professional Summary
            </span>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: "15px", color: "rgba(255,255,255,0.80)", lineHeight: 1.8 }}>
            I am a cybersecurity researcher and security engineer specialising in the convergence of artificial intelligence and defensive security operations. My work spans the full detection and response lifecycle — from designing log ingestion architectures and authoring high-precision detection rules, to integrating AI models that accelerate analyst decision-making and automating containment workflows that execute at machine speed.
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "15px", color: "rgba(255,255,255,0.80)", lineHeight: 1.8 }}>
            With deep expertise in enterprise SIEM engineering, cloud security architecture, and threat intelligence operationalisation, I bring both the technical depth to build robust security systems and the research rigour to validate their effectiveness through peer-reviewed publication. I have contributed to security programmes protecting sensitive national infrastructure, applying structured methodologies and adversary-centric thinking to reduce organisational risk.
          </p>
          <p style={{ margin: 0, fontSize: "15px", color: "rgba(255,255,255,0.80)", lineHeight: 1.8 }}>
            My research at the intersection of AI and cybersecurity has produced novel detection methodologies and published findings that advance the field — demonstrating a commitment not just to applying current best practice, but to expanding what is possible in next-generation security operations.
          </p>
        </motion.div>

        {/* ── Core Expertise Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: "20px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(56,165,50,0.7)",
          }}>
            Core Expertise
          </span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "72px",
        }}>
          {EXPERTISE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.04 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{
                  background: "linear-gradient(135deg, rgba(2,8,16,0.65) 0%, rgba(4,20,8,0.60) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(56,165,50,0.12)",
                  borderRadius: "16px",
                  padding: "28px 28px 24px",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.3), transparent)",
                }} />
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "rgba(56,165,50,0.10)",
                  border: "1px solid rgba(56,165,50,0.20)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px",
                }}>
                  <Icon size={18} color="#38a532" />
                </div>
                <h3 style={{
                  margin: "0 0 10px",
                  fontSize: "14px", fontWeight: 700,
                  color: "#FFFFFF", lineHeight: 1.3,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  margin: 0, fontSize: "13px",
                  color: "rgba(255,255,255,0.55)", lineHeight: 1.7,
                }}>
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Key Contributions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginBottom: "20px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(56,165,50,0.7)",
          }}>
            Key Contributions & Impact
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45 }}
          style={{
            background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.68) 50%, rgba(2,8,16,0.72) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(56,165,50,0.15)",
            borderRadius: "20px",
            padding: "40px 48px",
            marginBottom: "72px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.4), transparent)",
          }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {CONTRIBUTIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
              >
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#38a532", flexShrink: 0, marginTop: "8px",
                }} />
                <p style={{
                  margin: 0, fontSize: "14px",
                  color: "rgba(255,255,255,0.75)", lineHeight: 1.75,
                }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Featured Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ marginBottom: "20px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(56,165,50,0.7)",
          }}>
            Featured Work
          </span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "72px",
        }}>
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.65) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(56,165,50,0.15)",
                borderRadius: "18px",
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.35), transparent)",
              }} />
              <span style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#38a532", background: "rgba(56,165,50,0.08)",
                border: "1px solid rgba(56,165,50,0.20)", borderRadius: "4px",
                padding: "3px 9px", alignSelf: "flex-start",
              }}>
                {proj.tag}
              </span>
              <h3 style={{
                margin: 0, fontSize: "15px", fontWeight: 700,
                color: "#FFFFFF", lineHeight: 1.3,
              }}>
                {proj.title}
              </h3>
              <p style={{
                margin: 0, fontSize: "13px",
                color: "rgba(255,255,255,0.60)", lineHeight: 1.75,
              }}>
                {proj.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                {proj.outcomes.map((o) => (
                  <div key={o} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "rgba(56,165,50,0.7)", flexShrink: 0,
                    }} />
                    <span style={{ fontSize: "12px", color: "rgba(56,165,50,0.85)" }}>{o}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Domain Deep-Dive ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ marginBottom: "20px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(56,165,50,0.7)",
          }}>
            Domain Deep-Dive
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.65 }}
          style={{
            background: "linear-gradient(135deg, rgba(2,8,16,0.72) 0%, rgba(4,22,10,0.68) 50%, rgba(2,8,16,0.72) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(56,165,50,0.15)",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "72px",
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.4), transparent)",
          }} />

          {/* Tab bar */}
          <div style={{
            display: "flex", borderBottom: "1px solid rgba(56,165,50,0.12)",
            overflowX: "auto", padding: "0 8px",
          }}>
            {DOMAINS.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveDomain(d.key)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "18px 20px",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  color: activeDomain === d.key ? "#38a532" : "rgba(255,255,255,0.45)",
                  borderBottom: activeDomain === d.key
                    ? "2px solid #38a532"
                    : "2px solid transparent",
                  marginBottom: "-1px",
                  transition: "all 0.2s",
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeDomain}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: "40px 48px" }}
          >
            <h3 style={{
              margin: "0 0 16px",
              fontSize: "20px", fontWeight: 700,
              color: "#FFFFFF", lineHeight: 1.3,
            }}>
              {domain.content.heading}
            </h3>
            <p style={{
              margin: "0 0 28px",
              fontSize: "14px", color: "rgba(255,255,255,0.68)", lineHeight: 1.8,
              maxWidth: "760px",
            }}>
              {domain.content.body}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {domain.content.points.map((pt) => (
                <div key={pt} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "#38a532", flexShrink: 0, marginTop: "9px",
                  }} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.70)", lineHeight: 1.65 }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Leadership & Collaboration ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ marginBottom: "20px" }}
        >
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(56,165,50,0.7)",
          }}>
            Leadership & Collaboration
          </span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "72px",
        }}>
          {LEADERSHIP.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.75 + i * 0.06 }}
              style={{
                background: "linear-gradient(135deg, rgba(2,8,16,0.65) 0%, rgba(4,20,8,0.60) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(56,165,50,0.12)",
                borderRadius: "16px",
                padding: "28px 28px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.3), transparent)",
              }} />
              <h3 style={{
                margin: "0 0 12px",
                fontSize: "15px", fontWeight: 700,
                color: "#FFFFFF",
              }}>
                {card.title}
              </h3>
              <p style={{
                margin: 0, fontSize: "13px",
                color: "rgba(255,255,255,0.60)", lineHeight: 1.75,
              }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{
            background: "linear-gradient(135deg, rgba(56,165,50,0.10) 0%, rgba(4,22,10,0.65) 50%, rgba(56,165,50,0.08) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(56,165,50,0.22)",
            borderRadius: "20px",
            padding: "48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(56,165,50,0.5), transparent)",
          }} />
          <h3 style={{
            margin: "0 0 16px",
            fontSize: "24px", fontWeight: 800,
            color: "#FFFFFF", lineHeight: 1.2,
          }}>
            Open to Strategic Security Roles
          </h3>
          <p style={{
            margin: "0 0 32px",
            fontSize: "15px", color: "rgba(255,255,255,0.60)", lineHeight: 1.7,
            maxWidth: "540px", marginLeft: "auto", marginRight: "auto",
          }}>
            I am actively exploring opportunities in security research, threat detection engineering, AI security, and senior SOC leadership roles. If you are building a high-impact security capability, let us talk.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "linear-gradient(135deg, #38a532, rgba(56,165,50,0.75))",
                border: "none", cursor: "pointer",
                padding: "13px 32px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 700, color: "#020810",
                letterSpacing: "0.04em",
                boxShadow: "0 0 24px rgba(56,165,50,0.30)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(56,165,50,0.50)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(56,165,50,0.30)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Get In Touch
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("research");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(56,165,50,0.35)", cursor: "pointer",
                padding: "13px 32px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(56,165,50,0.65)";
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(56,165,50,0.35)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
              }}
            >
              View Research
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
