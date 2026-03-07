import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CalculatorSection from '@/components/CalculatorSection';

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

  return (
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
  );
}
