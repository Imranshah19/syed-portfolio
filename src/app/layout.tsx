import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://syed-portfolio-mu.vercel.app";

const title = "Syed Imran Shah | AI-Powered HR Professional & HR-Tech Developer";
const description =
  "MHRM + 10 years HR experience + full-stack AI development. Building production-grade HRMS and HR AI agents (NEXA HR). Open to UAE & Germany opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Syed Imran Shah",
    "HR-Tech Developer",
    "HRMS Developer",
    "AI HR",
    "HR Professional",
    "FastAPI",
    "Next.js",
    "Karachi",
  ],
  authors: [{ name: "Syed Imran Shah" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Syed Imran Shah",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "5assWSY3BA9mYZLhx9pRwvIFcWtw_HMzZUXXc_fBx6w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="site-atmosphere" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
