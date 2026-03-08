import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Inter } from "next/font/google";
import Script from "next/script";
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snowsetup.com";
const GA_ID = "G-G65EEZM4H4";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: "Snowboard Ekipman Önerici - Boy, Kilo ve Tecrübeye Göre Snowboard Seçimi",
    en: "Snowboard Equipment Recommender - Board Selection by Height, Weight & Experience"
  };
  
  const descriptions = {
    tr: "Boyunuza, kilonuza ve tecrübenize göre en uygun snowboard, bot ve binding önerileri alın. Ücretsiz snowboard boyutu hesaplama ve ekipman seçim rehberi.",
    en: "Get personalized snowboard, boot, and binding recommendations based on your height, weight, and experience. Free snowboard size calculator and equipment selection guide."
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: titles[locale as Locale] || titles.tr,
      template: "%s | SnowSetup",
    },
    description: descriptions[locale as Locale] || descriptions.tr,
    keywords: [
      "snowboard boyutu hesaplama",
      "snowboard seçimi",
      "snowboard önerisi",
      "snowboard calculator",
      "snowboard size chart",
      "snowboard binding seçimi",
      "snowboard boot seçimi",
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
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      url: siteUrl,
      siteName: "SnowSetup",
      title: titles[locale as Locale] || titles.tr,
      description: descriptions[locale as Locale] || descriptions.tr,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "SnowSetup - Equipment Recommender",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: locale === 'en' ? "Snowboard Equipment Recommender" : "Snowboard Ekipman Önerici",
      description: descriptions[locale as Locale] || descriptions.tr,
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
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'tr': `${siteUrl}/tr`,
        'en': `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Import messages directly instead of using getMessages
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
