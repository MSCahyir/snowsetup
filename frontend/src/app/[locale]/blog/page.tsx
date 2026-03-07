import { setRequestLocale } from 'next-intl/server';
import BlogContent from '@/components/pages/BlogContent';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogContent />;
}
