import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SnowboardSizeLanding from '@/components/pages/SnowboardSizeLanding';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'Snowboard Size Calculator (Quick Tool)' : 'Snowboard Boyu Hesaplama (Hizli Arac)',
    description: isEn
      ? 'Use this quick snowboard size calculator to estimate ideal board length by height, weight, style, and level.'
      : 'Boy, kilo, stil ve seviyene gore ideal board uzunlugunu tahmin etmek icin bu hizli snowboard boyu hesaplama aracini kullan.',
    alternates: {
      canonical: `${siteUrl}/${locale}/snowboard-boyu-hesaplama`,
    },
  };
}

export default async function SnowboardSizeLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntityOfPage: `${siteUrl}/${locale}/snowboard-boyu-hesaplama`,
    mainEntity:
      locale === 'en'
        ? [
            {
              '@type': 'Question',
              name: 'How do I calculate snowboard size?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A practical starting point combines height, weight, riding style, and experience level to estimate a suitable board length range.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is shorter snowboard better for beginners?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'In many cases yes. Slightly shorter boards are easier to control and turn while learning fundamentals.',
              },
            },
          ]
        : [
            {
              '@type': 'Question',
              name: 'Snowboard boyu nasil hesaplanir?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Pratik bir baslangic icin boy, kilo, surus stili ve deneyim seviyesi birlikte degerlendirilerek uygun board boyu araligi hesaplanir.',
              },
            },
            {
              '@type': 'Question',
              name: 'Yeni baslayanlar icin daha kisa snowboard daha iyi mi?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Cogu durumda evet. Biraz daha kisa boardlar temel teknikleri ogrenirken kontrolu ve donusu kolaylastirir.',
              },
            },
          ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SnowboardSizeLanding locale={locale} />
    </>
  );
}
