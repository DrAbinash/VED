import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ved Singh — Aspiring Doctor | Traveller | Photographer | Chef",
  description:
    "Personal portfolio of Ved Singh, a final year MBBS student at Dr. D. Y. Patil Medical College, Pune. Passionate about solo travelling, photography, and cooking.",
  keywords: [
    "Ved Singh",
    "MBBS",
    "Doctor",
    "Photography",
    "Travelling",
    "Cooking",
    "Pune",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🩺</text></svg>",
  },
  openGraph: {
    title: "Ved Singh — Aspiring Doctor | Traveller | Photographer | Chef",
    description:
      "Personal portfolio of Ved Singh, a final year MBBS student at Dr. D. Y. Patil Medical College, Pune.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}