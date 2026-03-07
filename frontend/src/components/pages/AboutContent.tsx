'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AboutContent() {
  const locale = useLocale();
  const t = useTranslations('about');

  const teamMembers = [
    { name: 'Ahmet Yılmaz', role: locale === 'en' ? 'Founder & Lead Developer' : 'Kurucu & Baş Geliştirici', image: '👨‍💻' },
    { name: 'Elif Demir', role: locale === 'en' ? 'Snowboard Expert' : 'Snowboard Uzmanı', image: '🏂' },
    { name: 'Can Öztürk', role: locale === 'en' ? 'Data Scientist' : 'Veri Bilimci', image: '📊' },
    { name: 'Selin Kaya', role: locale === 'en' ? 'Content Manager' : 'İçerik Yöneticisi', image: '✍️' },
  ];

  const values = [
    { key: 'accuracy', icon: '🎯' },
    { key: 'transparency', icon: '🔍' },
    { key: 'community', icon: '🤝' },
  ];

  const stats = [
    { value: '10K+', label: locale === 'en' ? 'Active Users' : 'Aktif Kullanıcı' },
    { value: '50+', label: locale === 'en' ? 'Equipment Brands' : 'Ekipman Markası' },
    { value: '500+', label: locale === 'en' ? 'Products Reviewed' : 'İncelenen Ürün' },
    { value: '98%', label: locale === 'en' ? 'Satisfaction Rate' : 'Memnuniyet Oranı' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">{t('title')}</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">{t('subtitle')}</p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{t('mission.title')}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{t('mission.description')}</p>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🏔️</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 shadow-lg">
                <div className="text-white">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-cyan-100 text-sm">{locale === 'en' ? 'Years Experience' : 'Yıllık Tecrübe'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('values.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.key} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{t(`values.${value.key}.title`)}</h3>
                <p className="text-gray-400">{t(`values.${value.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">{t('team.title')}</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">{t('team.description')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{member.image}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {locale === 'en' ? 'Ready to Find Your Perfect Gear?' : 'Mükemmel Ekipmanınızı Bulmaya Hazır mısınız?'}
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            {locale === 'en' 
              ? 'Use our free calculator to get personalized equipment recommendations.'
              : 'Kişiselleştirilmiş ekipman önerileri almak için ücretsiz hesaplayıcımızı kullanın.'}
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            {locale === 'en' ? 'Try Calculator' : 'Hesaplayıcıyı Dene'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
