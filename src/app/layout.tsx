import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://syed-imran-shah-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Syed Imran Shah | AI-Powered HR Professional & HR-Tech Developer",
  description:
    "MHRM + 10 years HR experience + full-stack AI development. Building production-grade HRMS and HR AI agents. Open to UAE & Germany opportunities.",
  keywords: [
    "HR-Tech",
    "HRMS Developer",
    "AI HR",
    "FastAPI",
    "Next.js",
    "Karachi",
    "UAE",
    "Germany",
    "LangGraph",
    "HR AI Agents",
  ],
  authors: [{ name: "Syed Imran Shah", url: siteUrl }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Syed Imran Shah",
    title: "Syed Imran Shah | AI-Powered HR Professional & HR-Tech Developer",
    description:
      "MHRM + 10 years HR experience + full-stack AI development. Building production-grade HRMS and HR AI agents. Open to UAE & Germany opportunities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Imran Shah | AI-Powered HR Professional & HR-Tech Developer",
    description:
      "MHRM + 10 years HR experience + full-stack AI development. Building production-grade HRMS and HR AI agents.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
