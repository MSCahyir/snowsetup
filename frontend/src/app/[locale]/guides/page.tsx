import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import GuidesContent from '@/components/pages/GuidesContent';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'en' ? 'Snowboard Guides: Setup, Technique, Maintenance' : 'Snowboard Rehberleri: Setup, Teknik ve Bakim';
  const description =
    locale === 'en'
      ? 'Explore step-by-step snowboard guides for board selection, riding technique, tuning, and maintenance to ride safer and better.'
      : 'Board secimi, surus teknigi, tuning ve bakim konularinda adim adim snowboard rehberlerini inceleyin.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/guides`,
      languages: {
        tr: `${siteUrl}/tr/guides`,
        en: `${siteUrl}/en/guides`,
      },
    },
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GuidesContent />;
}
