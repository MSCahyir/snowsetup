'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface SnowboardSizeLandingProps {
  locale: string;
}

type RidingStyle = 'all-mountain' | 'freestyle' | 'freeride';
type Experience = 'beginner' | 'intermediate' | 'advanced';

function calculateBoardLength(height: number, weight: number, style: RidingStyle, experience: Experience) {
  // Base estimate combines height and weight influence for practical first-pass sizing.
  let recommended = (height * 0.88 + weight * 0.18) / 1.06;

  if (style === 'freestyle') recommended -= 2;
  if (style === 'freeride') recommended += 2;

  if (experience === 'beginner') recommended -= 1.5;
  if (experience === 'advanced') recommended += 1.5;

  const min = Math.round(recommended - 3);
  const max = Math.round(recommended + 3);

  return {
    min,
    max,
    recommended: Math.round(recommended),
  };
}

export default function SnowboardSizeLanding({ locale }: Readonly<SnowboardSizeLandingProps>) {
  const isEn = locale === 'en';
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [style, setStyle] = useState<RidingStyle>('all-mountain');
  const [experience, setExperience] = useState<Experience>('intermediate');

  const result = useMemo(
    () => calculateBoardLength(height, weight, style, experience),
    [experience, height, style, weight],
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-20 lg:pt-24">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {isEn ? 'Snowboard Size Calculator' : 'Snowboard Boyu Hesaplama'}
        </h1>
        <p className="mt-4 text-gray-300 max-w-3xl text-base sm:text-lg">
          {isEn
            ? 'Estimate your ideal snowboard length instantly using your height, weight, riding style, and level.'
            : 'Boy, kilo, surus stili ve seviyene gore ideal snowboard boyunu hizlica hesapla.'}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isEn ? 'Quick Calculator' : 'Hizli Hesaplayici'}
          </h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-300">{isEn ? 'Height (cm)' : 'Boy (cm)'}</span>
              <input
                type="number"
                min={130}
                max={220}
                value={height}
                onChange={(e) => setHeight(Number.parseInt(e.target.value, 10) || 175)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">{isEn ? 'Weight (kg)' : 'Kilo (kg)'}</span>
              <input
                type="number"
                min={35}
                max={150}
                value={weight}
                onChange={(e) => setWeight(Number.parseInt(e.target.value, 10) || 75)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">{isEn ? 'Riding Style' : 'Surus Stili'}</span>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as RidingStyle)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
              >
                <option value="all-mountain">{isEn ? 'All Mountain' : 'All Mountain'}</option>
                <option value="freestyle">Freestyle</option>
                <option value="freeride">Freeride</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">{isEn ? 'Experience' : 'Seviye'}</span>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value as Experience)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
              >
                <option value="beginner">{isEn ? 'Beginner' : 'Baslangic'}</option>
                <option value="intermediate">{isEn ? 'Intermediate' : 'Orta'}</option>
                <option value="advanced">{isEn ? 'Advanced' : 'Ileri'}</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-blue-950/20 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isEn ? 'Your Estimated Size' : 'Tahmini Board Boyun'}
          </h2>

          <div className="rounded-xl bg-slate-900/70 border border-slate-700 p-5 text-center">
            <div className="text-cyan-300 text-sm uppercase tracking-wide">
              {isEn ? 'Recommended Length' : 'Onerilen Boy'}
            </div>
            <div className="mt-2 text-4xl sm:text-5xl font-black text-white">{result.recommended} cm</div>
            <div className="mt-2 text-gray-300 text-sm">
              {isEn ? 'Range' : 'Aralik'}: {result.min} - {result.max} cm
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            {isEn
              ? 'For a complete setup recommendation including boots and bindings, continue to the full recommendation flow.'
              : 'Bot ve binding dahil tam setup onerisi icin tam onerici akisina gec.'}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/calculator`}
              className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-3 text-white font-semibold hover:bg-cyan-400 transition-colors"
            >
              {isEn ? 'Open Full Calculator' : 'Tam Hesaplayiciyi Ac'}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-4 py-3 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              {isEn ? 'Browse Products' : 'Urunleri Incele'}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <h2 className="text-2xl font-bold text-white">{isEn ? 'FAQ' : 'Sik Sorulan Sorular'}</h2>
        <div className="mt-4 grid gap-4">
          <article className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <h3 className="font-semibold text-white">
              {isEn ? 'Is this result enough to buy a board?' : 'Bu sonuc tek basina board almak icin yeterli mi?'}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">
              {isEn
                ? 'It is a strong starting point. Also check boot size, stance preference, and brand-specific sizing charts.'
                : 'Guclu bir baslangic noktasi verir. Bot numarasi, stance tercihi ve marka olcu tablolarini da kontrol et.'}
            </p>
          </article>
          <article className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <h3 className="font-semibold text-white">
              {isEn ? 'Should beginners choose shorter boards?' : 'Yeni baslayanlar daha kisa board mu secmeli?'}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">
              {isEn
                ? 'Usually yes. Slightly shorter boards are easier to turn and more forgiving while learning.'
                : 'Genellikle evet. Biraz daha kisa boardlar donusu kolaylastirir ve ogrenme surecinde daha affedicidir.'}
            </p>
          </article>
        </div>

        <div className="mt-6">
          <Link href={`/${locale}/guides`} className="text-cyan-300 hover:text-cyan-200 font-medium">
            {isEn ? 'Read all guides ->' : 'Tum rehberleri oku ->'}
          </Link>
        </div>
      </section>
    </main>
  );
}
