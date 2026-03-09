import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CalculatorSection from '@/components/CalculatorSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'SnowSetup' : 'Snowboard Hesaplayici',
    description: isEn
      ? 'Calculate snowboard, boot, and binding recommendations with your profile.'
      : 'Profiline gore snowboard, bot ve binding onerilerini hesapla.',
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntityOfPage: `${siteUrl}/${locale}/calculator`,
    mainEntity: locale === 'en'
      ? [
          {
            '@type': 'Question',
            name: 'How does the snowboard size calculator work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The calculator combines your height, weight, boot size, riding level, and preferred style to estimate suitable board length, waist width, and setup recommendations.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can beginners use these recommendations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Recommendations include beginner-friendly options and practical sizing guidance to help new riders choose safer and easier-to-control equipment.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this snowboard calculator free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the calculator is free to use and provides personalized board, boot, and binding suggestions.',
            },
          },
        ]
      : [
          {
            '@type': 'Question',
            name: 'Snowboard boyutu hesaplayici nasil calisir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hesaplayici; boy, kilo, bot numarasi, seviye ve surus stilinizi birlikte degerlendirerek uygun board uzunlugu, waist genisligi ve setup onerileri uretir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Yeni baslayanlar bu onerileri kullanabilir mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Oneriler yeni baslayanlar icin daha kontrollu ekipman secenekleri ve pratik olculendirme yonlendirmeleri icerir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bu hesaplayici ucretsiz mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet, hesaplayici ucretsizdir ve size ozel board, bot ve binding onerileri sunar.',
            },
          },
        ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-slate-900 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {locale === 'en' ? 'Snowboard Equipment Calculator' : 'Snowboard Ekipman Hesaplayici'}
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            {locale === 'en'
              ? 'Get tailored board, boot and binding suggestions in a few steps.'
              : 'Birkac adimda sana uygun board, bot ve binding onerileri al.'}
          </p>
        </div>
        <CalculatorSection />
      </div>
    </>
  );
}
