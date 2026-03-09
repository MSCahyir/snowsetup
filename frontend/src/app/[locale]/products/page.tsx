import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProductsContent from '@/components/pages/ProductsContent';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'en'
      ? 'Snowboard Products: Boards, Boots, Bindings'
      : 'Snowboard Urunleri: Board, Bot ve Binding';

  const description =
    locale === 'en'
      ? 'Browse snowboard products by category, price, and riding style. Compare boards, boots, and bindings selected for performance and fit.'
      : 'Kategori, fiyat ve kayis stiline gore snowboard urunlerini kesfedin. Board, bot ve binding modellerini performans ve uyuma gore karsilastirin.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/products`,
      languages: {
        tr: `${siteUrl}/tr/products`,
        en: `${siteUrl}/en/products`,
      },
    },
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsContent />;
}
