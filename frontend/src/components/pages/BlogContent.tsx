'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const blogPosts = {
  tr: [
    {
      id: 1,
      slug: 'snowboard-boyutu-nasil-secilir',
      title: 'Snowboard Boyutu Nasıl Seçilir? Kapsamlı Rehber',
      excerpt: 'Doğru snowboard boyutu seçimi, pistteki performansınızı doğrudan etkiler. Bu rehberde boy, kilo ve stil tercihlerinize göre ideal board boyutunu bulmanıza yardımcı oluyoruz.',
      category: 'Rehber',
      readTime: '8 dk',
      date: '15 Ocak 2025',
    },
    {
      id: 2,
      slug: 'yeni-baslayanlar-icin-snowboard',
      title: '2025 Yeni Başlayanlar İçin En İyi 10 Snowboard',
      excerpt: 'Snowboard maceranıza başlamak için doğru ekipman şart. İşte bu sezon yeni başlayanlar için en iyi 10 snowboard ve özellikleri.',
      category: 'İnceleme',
      readTime: '12 dk',
      date: '10 Ocak 2025',
    },
    {
      id: 3,
      slug: 'snowboard-binding-rehberi',
      title: 'Snowboard Binding Seçimi: Bilmeniz Gereken Her Şey',
      excerpt: 'Binding, board ile botunuz arasındaki kritik bağlantıdır. Flex, açı ayarları ve uyumluluk hakkında tüm detaylar.',
      category: 'Rehber',
      readTime: '10 dk',
      date: '5 Ocak 2025',
    },
    {
      id: 4,
      slug: 'snowboard-bot-secimi',
      title: 'Snowboard Bot Seçimi: Doğru Numarayı Bulmak',
      excerpt: 'Snowboard botları, konfor ve performans için kritik öneme sahiptir.',
      category: 'Rehber',
      readTime: '9 dk',
      date: '28 Aralık 2024',
    },
    {
      id: 5,
      slug: 'freestyle-vs-freeride',
      title: 'Freestyle vs Freeride: Hangi Stil Sana Uygun?',
      excerpt: 'Snowboard stilleri arasındaki farkları anlayın.',
      category: 'Karşılaştırma',
      readTime: '7 dk',
      date: '20 Aralık 2024',
    },
    {
      id: 6,
      slug: 'snowboard-bakim-rehberi',
      title: 'Snowboard Bakım Rehberi: Sezon Boyu Performans',
      excerpt: 'Snowboard\'unuzun ömrünü uzatın ve performansını artırın.',
      category: 'Bakım',
      readTime: '6 dk',
      date: '15 Aralık 2024',
    },
  ],
  en: [
    {
      id: 1,
      slug: 'how-to-choose-snowboard-size',
      title: 'How to Choose Snowboard Size? Comprehensive Guide',
      excerpt: 'The right snowboard size selection directly affects your performance on the slopes.',
      category: 'Guide',
      readTime: '8 min',
      date: 'January 15, 2025',
    },
    {
      id: 2,
      slug: 'best-snowboards-for-beginners-2025',
      title: 'Top 10 Best Snowboards for Beginners 2025',
      excerpt: 'Starting your snowboard adventure requires the right equipment.',
      category: 'Review',
      readTime: '12 min',
      date: 'January 10, 2025',
    },
    {
      id: 3,
      slug: 'snowboard-binding-guide',
      title: 'Snowboard Binding Selection: Everything You Need to Know',
      excerpt: 'The binding is the critical connection between your board and boots.',
      category: 'Guide',
      readTime: '10 min',
      date: 'January 5, 2025',
    },
    {
      id: 4,
      slug: 'snowboard-boot-selection',
      title: 'Snowboard Boot Selection: Finding the Right Fit',
      excerpt: 'Snowboard boots are critical for comfort and performance.',
      category: 'Guide',
      readTime: '9 min',
      date: 'December 28, 2024',
    },
    {
      id: 5,
      slug: 'freestyle-vs-freeride',
      title: 'Freestyle vs Freeride: Which Style Suits You?',
      excerpt: 'Understand the differences between snowboard styles.',
      category: 'Comparison',
      readTime: '7 min',
      date: 'December 20, 2024',
    },
    {
      id: 6,
      slug: 'snowboard-maintenance-guide',
      title: 'Snowboard Maintenance Guide: Performance All Season',
      excerpt: 'Extend your snowboard\'s life and enhance its performance.',
      category: 'Maintenance',
      readTime: '6 min',
      date: 'December 15, 2024',
    },
  ],
};

export default function BlogContent() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const posts = blogPosts[locale as keyof typeof blogPosts] || blogPosts.tr;

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">{t('title')}</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">{t('description')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🏔️</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur border border-cyan-400/30 rounded-full text-cyan-300 text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                  {t('readMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
