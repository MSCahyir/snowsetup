'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { Product, ProductCategory } from '@/lib/types';
import productApi from '@/lib/api';

const CATEGORIES: ProductCategory[] = ['Snowboard', 'Boot', 'Binding', 'Helmet', 'Goggle'];

export default function ProductsContent() {
  const t = useTranslations('products');
  const locale = useLocale();
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'name' | 'newest'>('rating');
  const [sortDesc, setSortDesc] = useState(true);
  const sortDirectionLabel = sortDesc
    ? (locale === 'tr' ? 'Azalan' : 'Desc')
    : (locale === 'tr' ? 'Artan' : 'Asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProducts({
          category: selectedCategory || undefined,
          brand: selectedBrand || undefined,
          sortBy,
          sortDesc,
          pageSize: 50,
        });
        
        // Group products by category
        const grouped: Record<string, Product[]> = {};
        response.products.forEach((product) => {
          const cat = product.category;
          if (!grouped[cat]) {
            grouped[cat] = [];
          }
          grouped[cat].push(product);
        });
        
        setProductsByCategory(grouped);
        setAvailableBrands(response.availableBrands);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand, sortBy, sortDesc]);

  const getCategoryLabel = (category: string) => {
    if (locale === 'tr') {
      const labels: Record<string, string> = {
        'Snowboard': 'Snowboard\'lar',
        'Boot': 'Botlar',
        'Binding': 'Bağlamalar',
        'Helmet': 'Kasklar',
        'Goggle': 'Gözlükler',
        'Jacket': 'Montlar',
        'Pants': 'Pantolonlar',
        'Gloves': 'Eldivenler',
        'Accessory': 'Aksesuarlar',
      };
      return labels[category] || category;
    }
    const labels: Record<string, string> = {
      'Snowboard': 'Snowboards',
      'Boot': 'Boots',
      'Binding': 'Bindings',
      'Helmet': 'Helmets',
      'Goggle': 'Goggles',
      'Jacket': 'Jackets',
      'Pants': 'Pants',
      'Gloves': 'Gloves',
      'Accessory': 'Accessories',
    };
    return labels[category] || category;
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
      <div className="min-h-screen bg-slate-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-96 mx-auto mb-16"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={() => globalThis.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            {locale === 'tr' ? 'Tekrar Dene' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{t('badge')}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">{t('title')}</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">{t('description')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          {/* Category Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {locale === 'tr' ? 'Kategori' : 'Category'}
            </label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory || null)}
              className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {locale === 'tr' ? 'Marka' : 'Brand'}
            </label>
            <select
              value={selectedBrand || ''}
              onChange={(e) => setSelectedBrand(e.target.value || null)}
              className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="">{locale === 'tr' ? 'Tümü' : 'All'}</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {locale === 'tr' ? 'Sıralama' : 'Sort By'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="rating">{locale === 'tr' ? 'Puan' : 'Rating'}</option>
              <option value="price">{locale === 'tr' ? 'Fiyat' : 'Price'}</option>
              <option value="name">{locale === 'tr' ? 'İsim' : 'Name'}</option>
              <option value="newest">{locale === 'tr' ? 'En Yeni' : 'Newest'}</option>
            </select>
          </div>

          {/* Sort Direction */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {locale === 'tr' ? 'Yön' : 'Order'}
            </label>
            <button
              onClick={() => setSortDesc(!sortDesc)}
              className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 hover:border-cyan-500 transition-colors"
            >
              {sortDesc ? '↓' : '↑'} {sortDirectionLabel}
            </button>
          </div>
        </div>

        {/* Products by Category */}
        {Object.entries(productsByCategory).map(([category, products]) => (
          <section key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span>{getCategoryEmoji(category)}</span>
              {getCategoryLabel(category)}
              <span className="text-sm font-normal text-gray-400">({products.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const badgeKey = getBadgeKey(product);
                const features = locale === 'tr' && product.featuresTr ? product.featuresTr : product.features;
                
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-60">{getCategoryEmoji(product.category)}</span>
                        </div>
                      )}
                      
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

                      {product.originalPrice && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-red-500/90 rounded-lg text-xs font-medium text-white">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% {t('discount')}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 bg-slate-900/80 backdrop-blur rounded-lg text-xs text-gray-300">
                          {product.brand}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {product.name}
                      </h3>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {features.slice(0, 2).map((feature) => (
                          <span key={`${product.id}-${feature}`} className="text-xs text-gray-500 bg-slate-700/50 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{product.price.toLocaleString('tr-TR')} ₺</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice.toLocaleString('tr-TR')} ₺</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {Object.keys(productsByCategory).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {locale === 'tr' ? 'Ürün bulunamadı.' : 'No products found.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
