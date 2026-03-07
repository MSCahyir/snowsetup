import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snowsetup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Snowboard Ekipman Önerici - Boy, Kilo ve Tecrübeye Göre Snowboard Seçimi",
    template: "%s | SnowSetup",
  },
  description:
    "Boyunuza, kilonuza ve tecrübenize göre en uygun snowboard, bot ve binding önerileri alın. Ücretsiz snowboard boyutu hesaplama ve ekipman seçim rehberi.",
  keywords: [
    "snowboard boyutu hesaplama",
    "snowboard seçimi",
    "snowboard önerisi",
    "snowboard calculator",
    "snowboard size chart",
    "snowboard binding seçimi",
    "snowboard boot seçimi",
    "kayak ekipmanı",
    "snowboard tecrübe seviyesi",
    "freestyle snowboard",
    "all-mountain snowboard",
    "freeride snowboard",
  ],
  authors: [{ name: "SnowSetup" }],
  creator: "SnowSetup",
  publisher: "SnowSetup",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "SnowSetup",
    title: "Snowboard Ekipman Önerici - Kişiselleştirilmiş Öneriler",
    description:
      "Boyunuza, kilonuza ve tecrübenize göre en uygun snowboard, bot ve binding önerileri alın. Ücretsiz online araç.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnowSetup - Ekipman Önerici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snowboard Ekipman Önerici",
    description:
      "Kişiselleştirilmiş snowboard, bot ve binding önerileri. Ücretsiz online araç.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
