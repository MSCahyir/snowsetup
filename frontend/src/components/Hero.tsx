'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/hero-mountain.jpg')` 
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90" />
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      {/* Animated Snow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="snow-particle absolute w-2 h-2 bg-white/20 rounded-full animate-fall-1" style={{ left: '10%' }} />
        <div className="snow-particle absolute w-1 h-1 bg-white/30 rounded-full animate-fall-2" style={{ left: '20%' }} />
        <div className="snow-particle absolute w-2 h-2 bg-white/20 rounded-full animate-fall-3" style={{ left: '30%' }} />
        <div className="snow-particle absolute w-1.5 h-1.5 bg-white/25 rounded-full animate-fall-1" style={{ left: '50%' }} />
        <div className="snow-particle absolute w-1 h-1 bg-white/30 rounded-full animate-fall-2" style={{ left: '70%' }} />
        <div className="snow-particle absolute w-2 h-2 bg-white/20 rounded-full animate-fall-3" style={{ left: '85%' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-blue-200 text-sm font-medium">{t('badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('title')}{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{t('titleHighlight')}</span>{' '}
              {t('titleEnd')}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              {t('description')}{' '}
              <span className="text-cyan-400 font-medium">{t('free')}</span> {t('andFast')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToCalculator}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {t('calculateBtn')}
                </span>
              </button>
              
              <Link
                href="/guides"
                className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t('browseGuides')}
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400 text-sm">{t('stats.users')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400 text-sm">{t('stats.equipment')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">98%</div>
                <div className="text-gray-400 text-sm">{t('stats.satisfaction')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl rounded-full" />
              
              {/* Floating Cards */}
              <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏂</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Board</div>
                    <div className="text-gray-400 text-sm">155 cm önerildi</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 right-0 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👢</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Bot</div>
                    <div className="text-gray-400 text-sm">42 numara</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-20 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⛷️</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Binding</div>
                    <div className="text-gray-400 text-sm">L beden</div>
                  </div>
                </div>
              </div>

              {/* Central Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                    <span className="text-6xl">🎿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </section>
  );
}
