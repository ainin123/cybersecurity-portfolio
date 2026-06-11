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
  title: "ARES | Threat Intelligence Platform",
  description:
    "Elite cybersecurity researcher specializing in threat intelligence, adversary simulation, and advanced persistent threat analysis.",
  keywords: [
    "cybersecurity",
    "threat intelligence",
    "penetration testing",
    "red team",
    "malware analysis",
    "SOC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-cyber-bg text-cyber-text min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
