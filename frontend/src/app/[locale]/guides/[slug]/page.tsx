import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import GuideDetailContent from '@/components/pages/GuideDetailContent';
import { getGuideArticle } from '@/lib/guideData';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getGuideArticle(slug, locale);

  if (!article) {
    return {
      title: locale === 'en' ? 'Guide Not Found' : 'Rehber Bulunamadi',
      description:
        locale === 'en'
          ? 'The requested guide page could not be found.'
          : 'Istenen rehber sayfasi bulunamadi.',
      alternates: {
        canonical: `${siteUrl}/${locale}/guides/${slug}`,
      },
    };
  }

  return {
    title: `${article.title} | SnowSetup Guides`,
    description: article.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/guides/${article.slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getGuideArticle(slug, locale);

  if (!article) {
    notFound();
  }

  return <GuideDetailContent article={article} locale={locale} />;
}
