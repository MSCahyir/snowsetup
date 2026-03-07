import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-slate-900 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white">{isEn ? 'Privacy Policy' : 'Gizlilik Politikasi'}</h1>
        <p className="mt-4 text-gray-300">
          {isEn
            ? 'We process only the minimum data required to provide recommendations and improve service quality.'
            : 'Oneri hizmeti sunmak ve kaliteyi artirmak icin yalnizca gerekli minimum veriyi isleriz.'}
        </p>
      </div>
    </main>
  );
}
