import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BootSizeConverterLanding from '@/components/pages/BootSizeConverterLanding';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'Boot Size Converter (EU, US, CM)' : 'Boot Size Converter (EU, US, CM)',
    description: isEn
      ? 'Convert snowboard boot sizes between EU, US, and CM quickly and move to complete setup recommendations.'
      : 'Snowboard bot numaralarini EU, US ve CM arasinda hizlica donustur ve tam setup onerilerine gec.',
    alternates: {
      canonical: `${siteUrl}/${locale}/boot-size-converter`,
    },
  };
}

export default async function BootSizeConverterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntityOfPage: `${siteUrl}/${locale}/boot-size-converter`,
    mainEntity:
      locale === 'en'
        ? [
            {
              '@type': 'Question',
              name: 'How accurate is boot size conversion?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Conversion tools provide a strong baseline, but fit can differ by brand, shell shape, and liner construction.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is Mondo size in CM?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mondo size usually represents foot length in centimeters and is often the most direct sizing reference.',
              },
            },
          ]
        : [
            {
              '@type': 'Question',
              name: 'Bot numara donusumu ne kadar dogru?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Donusum araclari guclu bir referans verir; ancak fit, markaya, dis kabuk yapisina ve liner tasarimina gore degisebilir.',
              },
            },
            {
              '@type': 'Question',
              name: 'CM olarak Mondo olcusu nedir?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Mondo olcusu genellikle ayak uzunlugunu santimetre cinsinden ifade eder ve en dogrudan referanslardan biridir.',
              },
            },
          ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BootSizeConverterLanding locale={locale} />
    </>
  );
}
