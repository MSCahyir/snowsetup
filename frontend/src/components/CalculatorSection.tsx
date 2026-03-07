'use client';

import { useTranslations } from 'next-intl';
import ProfileForm from './ProfileForm';

export default function CalculatorSection() {
  const t = useTranslations('calculator');

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <ProfileForm />
        </div>

        {/* Trust Text */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          {t('trustText')}
        </p>
      </div>
    </section>
  );
}
