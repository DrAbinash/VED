import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site.config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.person.name} — ${siteConfig.person.title} | ${siteConfig.person.college}`,
  description: siteConfig.person.shortBio,
  keywords: ["Ved Singh", "MBBS", "Doctor", "Photography", "Solo Travelling", "Cooking", "Pune", "Dr D Y Patil Medical College"],
  authors: [{ name: siteConfig.person.name }],
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    title: `${siteConfig.person.name} — ${siteConfig.person.title}`,
    description: siteConfig.person.shortBio,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.person.name} — ${siteConfig.person.title}`,
    description: siteConfig.person.shortBio,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.primary,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}