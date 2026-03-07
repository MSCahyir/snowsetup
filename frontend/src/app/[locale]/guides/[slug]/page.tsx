import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import GuideDetailContent from '@/components/pages/GuideDetailContent';
import { getGuideArticle } from '@/lib/guideData';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function GuideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getGuideArticle(slug, locale);

  if (!article) {
    notFound();
  }

  return <GuideDetailContent article={article} locale={locale} />;
}
