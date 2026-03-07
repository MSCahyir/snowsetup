'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: 'tr' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { name: t('calculator'), href: '/calculator' },
    { name: t('products'), href: '/products' },
    { name: t('blog'), href: '/blog' },
    { name: t('guides'), href: '/guides' },
    { name: t('about'), href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-slate-950/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-2xl">🏂</span>
            <span className="hidden sm:inline">Snow<span className="text-cyan-400">Setup</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => switchLocale('tr')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  locale === 'tr' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  locale === 'en' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/calculator"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
            >
              {t('calculateEquipment')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white font-medium py-2 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 py-2">
                <span className="text-gray-400 text-sm">Dil:</span>
                <button
                  onClick={() => { switchLocale('tr'); setIsMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded text-sm ${locale === 'tr' ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
                >
                  TR
                </button>
                <button
                  onClick={() => { switchLocale('en'); setIsMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded text-sm ${locale === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
                >
                  EN
                </button>
              </div>
              
              <Link
                href="/calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white mt-4"
              >
                {t('calculateEquipment')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
