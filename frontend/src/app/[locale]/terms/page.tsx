import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';

  return (
    <main className="min-h-screen bg-slate-900 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white">{isEn ? 'Terms of Use' : 'Kullanim Kosullari'}</h1>
        <p className="mt-4 text-gray-300">
          {isEn
            ? 'By using this website, you agree to our terms and acknowledge that recommendations are advisory.'
            : 'Bu siteyi kullanarak kullanim kosullarini kabul eder ve onerilerin yonlendirici nitelikte oldugunu kabul edersiniz.'}
        </p>
      </div>
    </main>
  );
}
