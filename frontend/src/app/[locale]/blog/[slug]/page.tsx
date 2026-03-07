import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/pages/BlogPostContent';
import { getBlogPost } from '@/lib/blogData';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} locale={locale} />;
}
