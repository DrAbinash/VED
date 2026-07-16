import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site.config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: `${siteConfig.person.name} — ${siteConfig.person.tagline}`,
  description: siteConfig.person.shortBio,
  keywords: ["Ved Singh", "MBBS", "Future Doctor", "Solo Travelling", "Photography", "Cooking", "Pune", "Dr D Y Patil"],
  authors: [{ name: siteConfig.person.name }],
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    title: `${siteConfig.person.name} — ${siteConfig.person.tagline}`,
    description: siteConfig.person.shortBio,
    type: "profile",
    images: [{ url: siteConfig.person.heroPhoto, width: 1600, height: 900, alt: siteConfig.person.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.person.name} — ${siteConfig.person.tagline}`,
    description: siteConfig.person.shortBio,
    images: [siteConfig.person.heroPhoto],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.person.name,
    description: siteConfig.person.shortBio,
    jobTitle: siteConfig.person.title,
    affiliation: { "@type": "CollegeOrUniversity", name: siteConfig.person.college },
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
    sameAs: [siteConfig.social.instagram, siteConfig.social.foodInstagram].filter(Boolean),
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The hero photo is the page's LCP element — fetch it immediately. */}
        <link rel="preload" as="image" href={siteConfig.person.heroPhoto} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}