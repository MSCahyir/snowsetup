'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface BootSizeConverterLandingProps {
  locale: string;
}

type SizeSystem = 'eu' | 'us' | 'cm';

function toCm(value: number, from: SizeSystem) {
  if (from === 'cm') return value;
  if (from === 'eu') return (value - 15) / 1.5;
  return value + 18;
}

function fromCm(cm: number, to: SizeSystem) {
  if (to === 'cm') return cm;
  if (to === 'eu') return cm * 1.5 + 15;
  return cm - 18;
}

export default function BootSizeConverterLanding({ locale }: Readonly<BootSizeConverterLandingProps>) {
  const isEn = locale === 'en';
  const [inputValue, setInputValue] = useState(42);
  const [inputSystem, setInputSystem] = useState<SizeSystem>('eu');

  const converted = useMemo(() => {
    const cm = toCm(inputValue, inputSystem);
    return {
      eu: fromCm(cm, 'eu'),
      us: fromCm(cm, 'us'),
      cm,
    };
  }, [inputSystem, inputValue]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-20 lg:pt-24">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {isEn ? 'Snowboard Boot Size Converter' : 'Snowboard Boot Size Converter'}
        </h1>
        <p className="mt-4 text-gray-300 max-w-3xl text-base sm:text-lg">
          {isEn
            ? 'Convert snowboard boot sizes between EU, US, and CM instantly, then continue to setup recommendations.'
            : 'Snowboard bot numaralarini EU, US ve CM arasinda aninda cevir; sonra setup onerilerine gec.'}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-white mb-4">{isEn ? 'Converter' : 'Donusturucu'}</h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-300">{isEn ? 'Size Value' : 'Numara Degeri'}</span>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number.parseFloat(e.target.value) || 0)}
                step={0.5}
                min={0}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">{isEn ? 'Input System' : 'Giris Sistemi'}</span>
              <select
                value={inputSystem}
                onChange={(e) => setInputSystem(e.target.value as SizeSystem)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white"
              >
                <option value="eu">EU</option>
                <option value="us">US</option>
                <option value="cm">CM (Mondo)</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-cyan-950/30 to-blue-950/20 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-white mb-4">{isEn ? 'Converted Sizes' : 'Donusen Olculer'}</h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-center">
              <div className="text-xs text-gray-400">EU</div>
              <div className="mt-2 text-2xl font-bold text-white">{converted.eu.toFixed(1)}</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-center">
              <div className="text-xs text-gray-400">US</div>
              <div className="mt-2 text-2xl font-bold text-white">{converted.us.toFixed(1)}</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-center">
              <div className="text-xs text-gray-400">CM</div>
              <div className="mt-2 text-2xl font-bold text-white">{converted.cm.toFixed(1)}</div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            {isEn
              ? 'Sizing can vary by brand and liner fit. Use this as a baseline, then verify with brand-specific charts.'
              : 'Numaralar markaya ve liner fit yapisina gore degisebilir. Bunu baslangic referansi olarak kullanip marka tablolariyla dogrula.'}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/calculator`}
              className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-3 text-white font-semibold hover:bg-cyan-400 transition-colors"
            >
              {isEn ? 'Get Full Setup Recommendation' : 'Tam Setup Onerisi Al'}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-4 py-3 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              {isEn ? 'See Boots & Bindings' : 'Bot ve Bindingleri Gor'}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <h2 className="text-2xl font-bold text-white">{isEn ? 'Buying Tips' : 'Satin Alma Ipuclari'}</h2>
        <ul className="mt-4 grid gap-3 text-sm text-gray-300">
          <li className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            {isEn ? 'Prioritize heel hold. Too much heel lift reduces response and control.' : 'Topuk kilidine oncelik ver. Fazla topuk boslugu kontrolu ve tepkiyi dusurur.'}
          </li>
          <li className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            {isEn ? 'Try boots with your snowboard socks in the afternoon when feet are slightly swollen.' : 'Botu snowboard corabiyla, ayagin hafif sis oldugu ogleden sonra dene.'}
          </li>
          <li className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            {isEn ? 'Check binding size compatibility before buying to avoid fit issues.' : 'Fit sorunu yasamamak icin satin almadan once binding beden uyumlulugunu kontrol et.'}
          </li>
        </ul>
      </section>
    </main>
  );
}
