import { setRequestLocale } from 'next-intl/server';
import ProductsContent from '@/components/pages/ProductsContent';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsContent />;
}
