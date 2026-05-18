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
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  // metadataBase makes the OG image URL absolute when shared. Without
  // this, link-preview scrapers (iMessage, Twitter/X, Slack, LinkedIn,
  // WhatsApp) can't resolve the image URL and fall back to scraping
  // page content — which is how the founder photo from /public/founder/
  // was getting picked up as the preview.
  metadataBase: new URL("https://www.praecora.com"),
  title: {
    default: "Praecora — Done-for-you Instagram outreach for music catalog scouts",
    template: "%s | Praecora",
  },
  description:
    "AI-drafted personalized cold openers, smart reply triage, and a unified inbox — fully managed and built to keep your accounts safe.",
  openGraph: {
    title: "Praecora — Done-for-you Instagram outreach for music catalog scouts",
    description:
      "AI-drafted personalized cold openers, smart reply triage, and a unified inbox — fully managed and built to keep your accounts safe.",
    type: "website",
    siteName: "Praecora",
    url: "https://www.praecora.com",
    // images is auto-populated by Next.js from src/app/opengraph-image.tsx
    // — don't override it here unless you want a different image.
  },
  twitter: {
    card: "summary_large_image",
    title: "Praecora — Done-for-you Instagram outreach for music catalog scouts",
    description:
      "AI-drafted personalized cold openers, smart reply triage, and a unified inbox — fully managed and built to keep your accounts safe.",
    // Same auto-population pattern: Next.js pulls from
    // src/app/opengraph-image.tsx by default for twitter:image too.
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
