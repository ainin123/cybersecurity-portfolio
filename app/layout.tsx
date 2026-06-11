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
  title: "Aniqa Ayub | Cybersecurity Researcher & AI Security Engineer",
  description:
    "AI-driven cybersecurity, SIEM engineering, threat intelligence, NLP security. Building intelligent security systems that detect what traditional tools miss.",
  keywords: [
    "cybersecurity",
    "AI security",
    "SIEM engineer",
    "threat intelligence",
    "NLP security",
    "DLP",
    "Wazuh",
    "machine learning security",
    "explainable AI",
  ],
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
        style={{ backgroundColor: "#060b18", color: "#e2e8f0" }}
      >
        {children}
      </body>
    </html>
  );
}
