'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { GuideArticle } from '@/lib/guideData';

interface GuideDetailContentProps {
  article: GuideArticle;
  locale: string;
}

const categoryLabels: Record<string, { tr: string; en: string }> = {
  equipment: { tr: 'Ekipman', en: 'Equipment' },
  technique: { tr: 'Teknik', en: 'Technique' },
  maintenance: { tr: 'Bakım', en: 'Maintenance' },
};

function slugify(value: string): string {
  const filtered = Array.from(value.toLowerCase())
    .filter((char) => (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === ' ' || char === '-')
    .join('')
    .trim();

  return filtered.split(/\s+/).join('-');
}

export default function GuideDetailContent({ article, locale }: Readonly<GuideDetailContentProps>) {
  const isEn = locale === 'en';
  const [readProgress, setReadProgress] = useState(0);

  const headings = useMemo(() => {
    const matches = Array.from(article.content.matchAll(/^##\s+(.+)$/gm));
    return matches.map((match) => match[1].trim());
  }, [article.content]);

  useEffect(() => {
    const onScroll = () => {
      const content = document.getElementById('guide-article-content');
      if (!content) {
        setReadProgress(0);
        return;
      }

      const rect = content.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const height = content.offsetHeight;
      const viewport = window.innerHeight;
      const scrollable = Math.max(height - viewport, 1);
      const current = window.scrollY - top;
      const progress = Math.min(100, Math.max(0, (current / scrollable) * 100));
      setReadProgress(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-20 lg:pt-24">
      <div className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-150" style={{ width: `${readProgress}%` }} />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_90%_25%,rgba(59,130,246,0.14),transparent_30%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href={`/${locale}/guides`}
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isEn ? 'Back to Guides' : 'Rehberlere Dön'}
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <header className="mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-500/30">
                <Tag className="w-3 h-3" />
                {categoryLabels[article.category][isEn ? 'en' : 'tr']}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              <span className="mr-3">{article.icon}</span>
              {article.title}
            </h1>

            <p className="text-lg text-slate-300">{article.description}</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 xl:gap-12">
          <article
            id="guide-article-content"
            className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur p-6 sm:p-8 lg:p-10"
          >
            <div className="prose prose-invert prose-lg prose-slate max-w-none prose-headings:text-white prose-p:text-slate-200 prose-strong:text-white prose-a:text-cyan-300 prose-th:border prose-th:border-slate-600 prose-th:bg-slate-800 prose-td:border prose-td:border-slate-700 prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-cyan-400 prose-blockquote:text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28 h-fit">
            {headings.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <h3 className="text-sm uppercase tracking-wide text-slate-400 mb-3">
                  {isEn ? 'On This Page' : 'Bu Rehberde'}
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

            <div className="rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                {isEn ? 'Build Your Perfect Setup' : 'Sana Uygun Setup\'ı Oluştur'}
              </h2>
              <p className="text-slate-200 mb-5 text-sm">
                {isEn
                  ? 'Use the calculator to get snowboard, boot and binding recommendations tailored to your profile.'
                  : 'Hesaplayıcıyı kullanarak profiline göre snowboard, bot ve binding önerileri al.'}
              </p>
              <Link
                href={`/${locale}/calculator`}
                className="inline-block w-full text-center px-6 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition-colors"
              >
                {isEn ? 'Open Calculator' : 'Hesaplayıcıyı Aç'}
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12 rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isEn ? 'Build Your Perfect Setup' : 'Sana Uygun Setup\'ı Oluştur'}
          </h2>
          <p className="text-slate-200 mb-6">
            {isEn
              ? 'Use the calculator to get snowboard, boot and binding recommendations tailored to your profile.'
              : 'Hesaplayıcıyı kullanarak profiline göre snowboard, bot ve binding önerileri al.'}
          </p>
          <Link
            href={`/${locale}/calculator`}
            className="inline-block px-6 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition-colors"
          >
            {isEn ? 'Open Calculator' : 'Hesaplayıcıyı Aç'}
          </Link>
        </div>
      </section>
    </main>
  );
}
