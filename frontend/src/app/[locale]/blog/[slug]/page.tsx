import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/pages/BlogPostContent';
import { getBlogPost } from '@/lib/blogData';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);

  if (!post) {
    return {
      title: locale === 'en' ? 'Blog Post Not Found' : 'Blog Yazisi Bulunamadi',
      description:
        locale === 'en'
          ? 'The requested blog post could not be found.'
          : 'Istenen blog yazisi bulunamadi.',
      alternates: {
        canonical: `${siteUrl}/${locale}/blog/${slug}`,
      },
    };
  }

  return {
    title: `${post.title} | SnowSetup Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }

  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: `${siteUrl}/${locale}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }} />
      <BlogPostContent post={post} locale={locale} />
    </>
  );
}
