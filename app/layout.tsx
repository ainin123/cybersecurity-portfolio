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
  title: "Aniqa Ayub | Network Security Analyst & SIEM Engineer | NCCS NASTP",
  description:
    "Aniqa Ayub — Research Associate at the National Centre for Cyber Security (NCCS), NASTP, Islamabad. Expert in Wazuh SIEM deployment, penetration testing, SOC analysis, threat intelligence, and network defense automation.",
  keywords: [
    "Aniqa Ayub",
    "network security analyst",
    "SIEM engineer",
    "Wazuh SIEM",
    "penetration testing",
    "SOC analyst",
    "cybersecurity researcher",
    "NCCS NASTP",
    "threat intelligence",
    "vulnerability assessment",
    "ethical hacking",
    "network defense",
    "SOC analysis",
    "incident response",
    "Islamabad cybersecurity",
    "Pakistan cybersecurity",
    "MISP",
    "Wireshark",
    "Nessus",
    "OpenVAS",
  ],
  authors: [{ name: "Aniqa Ayub" }],
  openGraph: {
    title: "Aniqa Ayub | Network Security Analyst & SIEM Engineer",
    description:
      "Research Associate at NCCS, NASTP. Specializing in enterprise SIEM solutions, penetration testing, threat intelligence, and network defense — based in Islamabad, Pakistan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: "#0A192F", color: "#CCD6F6" }}
      >
        {children}
      </body>
    </html>
  );
}
