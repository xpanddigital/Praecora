import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  variable: "--font-heading",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "CrateHQ — Done-for-you Instagram outreach for music catalog scouts",
    template: "%s | CrateHQ",
  },
  description:
    "AI-drafted personalized cold openers, smart reply triage, and a unified inbox — fully managed and built to keep your accounts safe.",
  openGraph: {
    title: "CrateHQ — Done-for-you Instagram outreach for music catalog scouts",
    description:
      "AI-drafted personalized cold openers, smart reply triage, and a unified inbox — fully managed and built to keep your accounts safe.",
    type: "website",
    siteName: "CrateHQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
