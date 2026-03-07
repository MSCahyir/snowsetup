'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();

  const blogPosts = [
    {
      id: 1,
      slug: locale === 'en' ? 'how-to-choose-snowboard-size' : 'snowboard-boyutu-nasil-secilir',
      titleKey: 'posts.sizeGuide.title',
      excerptKey: 'posts.sizeGuide.excerpt',
      image: '/blog/snowboard-size.jpg',
      category: locale === 'tr' ? 'Rehber' : 'Guide',
      readTime: '8',
      date: locale === 'tr' ? '15 Ocak 2025' : 'Jan 15, 2025',
    },
    {
      id: 2,
      slug: locale === 'en' ? 'best-snowboards-for-beginners-2025' : 'yeni-baslayanlar-icin-snowboard',
      titleKey: 'posts.beginnerBoards.title',
      excerptKey: 'posts.beginnerBoards.excerpt',
      image: '/blog/beginner-boards.jpg',
      category: locale === 'tr' ? 'İnceleme' : 'Review',
      readTime: '12',
      date: locale === 'tr' ? '10 Ocak 2025' : 'Jan 10, 2025',
    },
    {
      id: 3,
      slug: locale === 'en' ? 'snowboard-binding-guide' : 'snowboard-binding-rehberi',
      titleKey: 'posts.bindingGuide.title',
      excerptKey: 'posts.bindingGuide.excerpt',
      image: '/blog/binding-guide.jpg',
      category: locale === 'tr' ? 'Rehber' : 'Guide',
      readTime: '10',
      date: locale === 'tr' ? '5 Ocak 2025' : 'Jan 5, 2025',
    },
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              {t('title')}
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl">
              {t('description')}
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            {t('allPosts')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🏔️</span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur border border-cyan-400/30 rounded-full text-cyan-300 text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} {locale === 'tr' ? 'dk' : 'min'} {t('readTime')}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {t(post.titleKey)}
                  </Link>
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {t(post.excerptKey)}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                  {t('readMore')}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
