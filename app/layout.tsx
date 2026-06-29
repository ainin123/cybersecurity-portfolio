import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aniqaayub.vercel.app"),
  title: {
    default: "Aniqa Ayub | Cybersecurity Researcher · SIEM Engineer · SOC Analyst · AI Security",
    template: "%s | Aniqa Ayub",
  },
  description:
    "Aniqa Ayub is a Cybersecurity Researcher and SIEM Engineer at NCCS, NASTP Islamabad. Expertise in Wazuh SIEM, SOC operations, penetration testing, threat intelligence, AI-driven security, network forensics, and vulnerability assessment. Available for cybersecurity roles in SOC, threat intelligence, and AI security research.",
  keywords: [
    // Identity
    "Aniqa Ayub",
    "Aniqa Ayub cybersecurity",
    "Aniqa Ayub SIEM",
    "Aniqa Ayub portfolio",
    // Job titles that recruiters search
    "cybersecurity researcher",
    "SOC analyst",
    "SIEM engineer",
    "network security analyst",
    "information security analyst",
    "threat intelligence analyst",
    "security operations center analyst",
    "penetration tester",
    "ethical hacker",
    "AI security engineer",
    "machine learning security",
    "cloud security engineer",
    "incident response analyst",
    "vulnerability assessment specialist",
    "red team analyst",
    "blue team analyst",
    // Technologies
    "Wazuh SIEM",
    "Elastic Stack",
    "SOAR",
    "MITRE ATT&CK",
    "OSINT",
    "Burp Suite",
    "Nessus",
    "OpenVAS",
    "Wireshark",
    "Nmap",
    "Splunk",
    "MISP",
    "threat hunting",
    "malware analysis",
    "network forensics",
    "blockchain security",
    // Research areas
    "PII detection SIEM",
    "transformer NLP security",
    "hate speech detection machine learning",
    "AI correlation engine",
    "alert fatigue reduction",
    // Location & institution
    "NCCS NASTP",
    "Air University cybersecurity",
    "Pakistan cybersecurity expert",
    "Islamabad security researcher",
    "cybersecurity jobs Pakistan",
    "hire cybersecurity analyst",
    "cybersecurity portfolio",
    // Hiring intent signals
    "hire SOC analyst",
    "hire SIEM engineer",
    "cybersecurity graduate hire",
    "MS cybersecurity Air University",
  ],
  authors: [{ name: "Aniqa Ayub", url: "https://aniqaayub.vercel.app" }],
  creator: "Aniqa Ayub",
  category: "Cybersecurity",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Aniqa Ayub | Cybersecurity Researcher · SIEM Engineer · SOC Analyst",
    description:
      "Portfolio of Aniqa Ayub — Research Associate at NCCS, NASTP. Expert in enterprise SIEM (Wazuh/Elastic), penetration testing, threat intelligence, AI-driven security, and SOC operations. Open to global cybersecurity opportunities.",
    type: "website",
    locale: "en_US",
    url: "https://aniqaayub.vercel.app",
    siteName: "Aniqa Ayub Cybersecurity Portfolio",
    images: [
      {
        url: "/mypic.png",
        width: 1200,
        height: 630,
        alt: "Aniqa Ayub — Cybersecurity Researcher & SIEM Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniqa Ayub | Cybersecurity Researcher · SIEM Engineer · SOC Analyst",
    description:
      "Research Associate at NCCS, NASTP. Expert in Wazuh SIEM, penetration testing, threat intelligence, and AI-driven cybersecurity. Open to global opportunities.",
    images: ["/mypic.png"],
  },
  alternates: {
    canonical: "https://aniqaayub.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aniqaayub.vercel.app/#person",
      name: "Aniqa Ayub",
      url: "https://aniqaayub.vercel.app",
      image: "https://aniqaayub.vercel.app/mypic.png",
      jobTitle: ["Cybersecurity Researcher", "SIEM Engineer", "SOC Analyst", "AI Security Engineer"],
      worksFor: {
        "@type": "Organization",
        name: "National Centre for Cyber Security (NCCS), NASTP",
        address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      },
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Air University Islamabad" },
        { "@type": "EducationalOrganization", name: "Arid Agriculture University Rawalpindi" },
      ],
      knowsAbout: [
        "SIEM Engineering",
        "Wazuh",
        "Elastic Stack",
        "SOC Operations",
        "Penetration Testing",
        "Threat Intelligence",
        "MITRE ATT&CK",
        "Vulnerability Assessment",
        "Network Forensics",
        "AI Security",
        "Machine Learning",
        "NLP",
        "SOAR",
        "Incident Response",
        "Malware Analysis",
      ],
      description:
        "Cybersecurity Researcher and SIEM Engineer specializing in enterprise security operations, AI-driven threat detection, and network defense. Research Associate at NCCS, NASTP Islamabad.",
    },
    {
      "@type": "WebSite",
      "@id": "https://aniqaayub.vercel.app/#website",
      url: "https://aniqaayub.vercel.app",
      name: "Aniqa Ayub Cybersecurity Portfolio",
      description:
        "Professional cybersecurity portfolio showcasing SIEM engineering, penetration testing, threat intelligence, and AI security research.",
      author: { "@id": "https://aniqaayub.vercel.app/#person" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: "#0A192F", color: "#CCD6F6" }}
      >
        {children}
      </body>
    </html>
  );
}
