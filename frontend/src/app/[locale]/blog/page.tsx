import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BlogContent from '@/components/pages/BlogContent';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'en' ? 'Snowboard Blog: Tips, Gear, Comparisons' : 'Snowboard Blog: Ipuclari, Ekipman ve Karsilastirmalar';
  const description =
    locale === 'en'
      ? 'Read practical snowboard articles on sizing, gear selection, beginner progression, and style comparisons to improve your setup decisions.'
      : 'Boyut secimi, ekipman tercihleri, baslangic gelisimi ve stil karsilastirmalari hakkinda pratik snowboard iceriklerini okuyun.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        tr: `${siteUrl}/tr/blog`,
        en: `${siteUrl}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogContent />;
}
