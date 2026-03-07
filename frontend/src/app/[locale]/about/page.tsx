import { setRequestLocale } from 'next-intl/server';
import AboutContent from '@/components/pages/AboutContent';

// Force dynamic rendering to avoid static prerendering issues
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
