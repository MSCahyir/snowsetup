import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CalculatorSection from "@/components/CalculatorSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";
import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snowsetup.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData
        name={locale === 'en' ? "Snowboard Equipment Recommender" : "Snowboard Ekipman Önerici"}
        description={locale === 'en' 
          ? "Get personalized snowboard, boot, and binding recommendations based on your height, weight, and experience. Free online tool."
          : "Boyunuza, kilonuza ve tecrübenize göre en uygun snowboard, bot ve binding önerileri alın. Ücretsiz online araç."}
        url={siteUrl}
      />
      
      <Hero />
      <Features />
      <CalculatorSection />
      <FeaturedProducts />
      <BlogPreview />
      <Newsletter />
    </>
  );
}
