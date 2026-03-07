'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import productApi from '@/lib/api';

export default function FeaturedProducts() {
  const t = useTranslations('products');
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getFeaturedProducts(4);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryLabel = (category: string) => {
    if (locale === 'tr') {
      const labels: Record<string, string> = {
        'Snowboard': 'Snowboard',
        'Boot': 'Bot',
        'Binding': 'Bağlama',
        'Helmet': 'Kask',
        'Goggle': 'Gözlük',
        'Jacket': 'Mont',
        'Pants': 'Pantolon',
        'Gloves': 'Eldiven',
        'Accessory': 'Aksesuar',
      };
      return labels[category] || category;
    }
    return category;
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'Snowboard': '🏂',
      'Boot': '👢',
      'Binding': '⛷️',
      'Helmet': '🪖',
      'Goggle': '🥽',
      'Jacket': '🧥',
      'Pants': '👖',
      'Gloves': '🧤',
      'Accessory': '🎿',
    };
    return emojis[category] || '🏔️';
  };

  const getBadgeKey = (product: Product): string | null => {
    if (product.isBestSeller) return 'bestSeller';
    if (product.isNew) return 'new';
    return null;
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-96 mb-12"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-800/50 rounded-2xl overflow-hidden">
                  <div className="h-48 bg-slate-700"></div>
                  <div className="p-4">
                    <div className="h-5 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              {t('title')}
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl">
              {t('description')}
            </p>
          </div>
          <Link
            href="/products"
            className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            {t('allProducts')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const badgeKey = getBadgeKey(product);
            const features = locale === 'tr' && product.featuresTr ? product.featuresTr : product.features;
            
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl opacity-60">
                        {getCategoryEmoji(product.category)}
                      </span>
                    </div>
                  )}
                  
                  {/* Badge */}
                  {badgeKey && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        badgeKey === 'bestSeller' 
                          ? 'bg-orange-500/90 text-white' 
                          : 'bg-green-500/90 text-white'
                      }`}>
                        {t(`badges.${badgeKey}`)}
                      </span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-red-500/90 rounded-lg text-xs font-medium text-white">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% {t('discount')}
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-slate-900/80 backdrop-blur rounded-lg text-xs text-gray-300">
                      {getCategoryLabel(product.category)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {product.name}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs text-gray-500 bg-slate-700/50 px-2 py-0.5 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-white">
                      {product.price.toLocaleString('tr-TR')} ₺
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString('tr-TR')} ₺
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
