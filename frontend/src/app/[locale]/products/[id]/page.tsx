import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ProductDetailContent from '@/components/pages/ProductDetailContent';
import { productApi } from '@/lib/api';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const product = await productApi.getProductById(id).catch(() => null);

  if (!product) {
    return {
      title: locale === 'en' ? 'Product Not Found' : 'Urun Bulunamadi',
      description:
        locale === 'en'
          ? 'The requested product page could not be found.'
          : 'Istenen urun sayfasi bulunamadi.',
      alternates: {
        canonical: `${siteUrl}/${locale}/products/${id}`,
      },
    };
  }

  const descriptionBase = locale === 'tr' && product.descriptionTr ? product.descriptionTr : product.description;
  const description = descriptionBase.length > 160 ? `${descriptionBase.slice(0, 157)}...` : descriptionBase;

  return {
    title: `${product.brand} ${product.name} | SnowSetup`,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/products/${product.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = await productApi.getProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const productDescription = locale === 'tr' && product.descriptionTr ? product.descriptionTr : product.description;
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: productDescription,
    image: [product.imageUrl, ...(product.galleryImages || [])],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/${locale}/products/${product.id}`,
      priceCurrency: product.currency || 'TRY',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <ProductDetailContent product={product} locale={locale} />
    </>
  );
}
