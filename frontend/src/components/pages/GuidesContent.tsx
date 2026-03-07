'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const guides = {
  tr: {
    equipment: [
      { id: 1, slug: 'snowboard-secim-rehberi', title: 'Snowboard Seçim Rehberi', description: 'Boy, kilo ve stil tercihlerinize göre ideal board seçimi', icon: '🏂', readTime: '15 dk' },
      { id: 2, slug: 'binding-secim-rehberi', title: 'Binding Seçim Rehberi', description: 'Flex, açı ve uyumluluk hakkında her şey', icon: '⛷️', readTime: '12 dk' },
      { id: 3, slug: 'bot-secim-rehberi', title: 'Bot Seçim Rehberi', description: 'Doğru fit ve konfor için bot seçimi', icon: '👢', readTime: '10 dk' },
      { id: 4, slug: 'giyim-rehberi', title: 'Snowboard Giyim Rehberi', description: 'Katman sistemi ve uygun kıyafet seçimi', icon: '🧥', readTime: '8 dk' },
    ],
    technique: [
      { id: 5, slug: 'yeni-baslayanlar-rehberi', title: 'Yeni Başlayanlar Rehberi', description: 'İlk adımlardan pistte kaymaya', icon: '🎿', readTime: '20 dk' },
      { id: 6, slug: 'carving-teknikleri', title: 'Carving Teknikleri', description: 'Keskin dönüşler ve kenar kontrolü', icon: '🎯', readTime: '15 dk' },
      { id: 7, slug: 'freestyle-temelleri', title: 'Freestyle Temelleri', description: 'Park, jump ve trick temelleri', icon: '🤸', readTime: '18 dk' },
      { id: 8, slug: 'powder-kayagi', title: 'Powder Kayağı', description: 'Derin karda kayma teknikleri', icon: '❄️', readTime: '12 dk' },
    ],
    maintenance: [
      { id: 9, slug: 'waxlama-rehberi', title: 'Waxlama Rehberi', description: 'Board waxlama adım adım', icon: '🔧', readTime: '10 dk' },
      { id: 10, slug: 'kenar-bileme', title: 'Kenar Bileme', description: 'Keskin kenarlar için bileme teknikleri', icon: '🔪', readTime: '8 dk' },
      { id: 11, slug: 'sezon-sonu-bakim', title: 'Sezon Sonu Bakım', description: 'Depolama öncesi bakım önerileri', icon: '📦', readTime: '6 dk' },
    ],
  },
  en: {
    equipment: [
      { id: 1, slug: 'snowboard-selection-guide', title: 'Snowboard Selection Guide', description: 'Ideal board selection based on height, weight, and style', icon: '🏂', readTime: '15 min' },
      { id: 2, slug: 'binding-selection-guide', title: 'Binding Selection Guide', description: 'Everything about flex, angles, and compatibility', icon: '⛷️', readTime: '12 min' },
      { id: 3, slug: 'boot-selection-guide', title: 'Boot Selection Guide', description: 'Boot selection for the right fit and comfort', icon: '👢', readTime: '10 min' },
      { id: 4, slug: 'clothing-guide', title: 'Snowboard Clothing Guide', description: 'Layer system and appropriate clothing selection', icon: '🧥', readTime: '8 min' },
    ],
    technique: [
      { id: 5, slug: 'beginners-guide', title: 'Beginners Guide', description: 'From first steps to riding on the slope', icon: '🎿', readTime: '20 min' },
      { id: 6, slug: 'carving-techniques', title: 'Carving Techniques', description: 'Sharp turns and edge control', icon: '🎯', readTime: '15 min' },
      { id: 7, slug: 'freestyle-basics', title: 'Freestyle Basics', description: 'Park, jump, and trick fundamentals', icon: '🤸', readTime: '18 min' },
      { id: 8, slug: 'powder-riding', title: 'Powder Riding', description: 'Techniques for riding in deep snow', icon: '❄️', readTime: '12 min' },
    ],
    maintenance: [
      { id: 9, slug: 'waxing-guide', title: 'Waxing Guide', description: 'Board waxing step by step', icon: '🔧', readTime: '10 min' },
      { id: 10, slug: 'edge-tuning', title: 'Edge Tuning', description: 'Tuning techniques for sharp edges', icon: '🔪', readTime: '8 min' },
      { id: 11, slug: 'end-of-season-care', title: 'End of Season Care', description: 'Pre-storage maintenance tips', icon: '📦', readTime: '6 min' },
    ],
  },
};

export default function GuidesContent() {
  const t = useTranslations('guides');
  const locale = useLocale();
  const guideData = guides[locale as keyof typeof guides] || guides.tr;

  const sectionLabels = {
    equipment: locale === 'en' ? 'Equipment Guides' : 'Ekipman Rehberleri',
    technique: locale === 'en' ? 'Technique Guides' : 'Teknik Rehberler',
    maintenance: locale === 'en' ? 'Maintenance Guides' : 'Bakım Rehberleri',
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">{t('title')}</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">{t('description')}</p>
        </div>

        {Object.entries(guideData).map(([category, items]) => (
          <section key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">{sectionLabels[category as keyof typeof sectionLabels]}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{guide.icon}</div>
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {guide.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
