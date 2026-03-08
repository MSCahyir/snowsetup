import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ProductDetailContent from '@/components/pages/ProductDetailContent';
import { productApi } from '@/lib/api';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = await productApi.getProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} locale={locale} />;
}
