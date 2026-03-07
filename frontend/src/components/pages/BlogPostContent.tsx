'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPost } from '@/lib/blogData';

interface BlogPostContentProps {
  post: BlogPost;
  locale: string;
}

function slugify(value: string): string {
  const filtered = Array.from(value.toLowerCase())
    .filter((char) => (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === ' ' || char === '-')
    .join('')
    .trim();

  return filtered.split(/\s+/).join('-');
}

export default function BlogPostContent({ post, locale }: Readonly<BlogPostContentProps>) {
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const headings = useMemo(() => {
    const matches = Array.from(post.content.matchAll(/^##\s+(.+)$/gm));
    return matches.map((match) => match[1].trim());
  }, [post.content]);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById('blog-article-content');
      if (!article) {
        setReadProgress(0);
        return;
      }

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(articleHeight - viewportHeight, 1);
      const current = window.scrollY - articleTop;
      const progress = Math.min(100, Math.max(0, (current / scrollable) * 100));
      setReadProgress(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: globalThis.location.href,
      });
      return;
    }

    await navigator.clipboard.writeText(globalThis.location.href);
    setCopied(true);
    globalThis.setTimeout(() => setCopied(false), 1500);
  };

  let copyButtonText = 'Linki Kopyala';
  if (locale === 'en') {
    copyButtonText = 'Copy Link';
  }
  if (copied && locale === 'en') {
    copyButtonText = 'Copied';
  }
  if (copied && locale !== 'en') {
    copyButtonText = 'Kopyalandi';
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-20 lg:pt-24">
      <div className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-150" style={{ width: `${readProgress}%` }} />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,0.15),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {locale === 'en' ? 'Back to Blog' : 'Blog\'a Dön'}
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <header className="mb-8 lg:mb-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 mb-5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 font-medium">
              {post.category}
            </span>
              <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
              <span className="inline-flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight max-w-5xl">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl">{post.excerpt}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800/80 border border-slate-700 text-slate-200 rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 xl:gap-12">
          <article
            id="blog-article-content"
            className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur p-6 sm:p-8 lg:p-10"
          >
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-200 prose-a:text-cyan-300 prose-strong:text-white prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-blockquote:border-cyan-400 prose-blockquote:text-slate-300 prose-th:border prose-th:border-slate-600 prose-th:bg-slate-800 prose-td:border prose-td:border-slate-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28 h-fit">
            {headings.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-3">
                  {locale === 'en' ? 'On This Page' : 'Bu Yazıda'}
                </h3>
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li key={heading}>
                      <span className="text-sm text-slate-300">{heading}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-3">
                {locale === 'en' ? 'Share' : 'Paylaş'}
              </h3>
              <button
                onClick={handleShare}
                className="w-full px-4 py-2.5 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
              >
                {copyButtonText}
              </button>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-5">
              <h3 className="text-lg font-bold text-white mb-2">
                {locale === 'en' ? 'Find Your Perfect Setup' : 'Sana Uygun Setup\'ı Bul'}
              </h3>
              <p className="text-sm text-slate-200 mb-4">
                {locale === 'en'
                  ? 'Get board, boot and binding suggestions in minutes.'
                  : 'Dakikalar içinde snowboard, bot ve binding önerisi al.'}
              </p>
              <Link
                href={`/${locale}/calculator`}
                className="inline-block w-full text-center px-4 py-2.5 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
              >
                {locale === 'en' ? 'Open Calculator' : 'Hesaplayıcıyı Aç'}
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <h3 className="text-2xl font-bold mb-2 text-white">
            {locale === 'en' ? 'Find Your Perfect Snowboard' : 'Mükemmel Snowboard\'unu Bul'}
          </h3>
          <p className="text-slate-300 mb-6">
            {locale === 'en'
              ? 'Use our calculator to get personalized equipment recommendations based on your profile.'
              : 'Hesaplayıcımızı kullanarak profilinize göre kişiselleştirilmiş ekipman önerileri alın.'}
          </p>
          <Link
            href={`/${locale}/calculator`}
            className="inline-block px-6 py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            {locale === 'en' ? 'Try Calculator' : 'Hesaplayıcıyı Dene'}
          </Link>
        </div>
      </section>
    </main>
  );
}
