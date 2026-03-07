'use client';

import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductDetailContentProps {
  product: Product;
  locale: string;
}

export default function ProductDetailContent({ product, locale }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  
  const allImages = [product.imageUrl, ...(product.galleryImages || [])];
  const description = locale === 'tr' && product.descriptionTr ? product.descriptionTr : product.description;
  const features = locale === 'tr' && product.featuresTr ? product.featuresTr : product.features;

  const categoryNames: Record<string, { tr: string; en: string }> = {
    Snowboard: { tr: 'Snowboard', en: 'Snowboard' },
    Boot: { tr: 'Bot', en: 'Boot' },
    Binding: { tr: 'Bağlama', en: 'Binding' },
    Helmet: { tr: 'Kask', en: 'Helmet' },
    Goggle: { tr: 'Gözlük', en: 'Goggle' },
    Jacket: { tr: 'Mont', en: 'Jacket' },
    Pants: { tr: 'Pantolon', en: 'Pants' },
    Gloves: { tr: 'Eldiven', en: 'Gloves' },
    Accessory: { tr: 'Aksesuar', en: 'Accessory' },
  };

  const categoryDisplay = categoryNames[product.category]?.[locale as 'tr' | 'en'] || product.category;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm py-4 border-b border-slate-700/30 mb-8">
          <Link href={`/${locale}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
            {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
          </Link>
          <span className="text-gray-600">/</span>
          <Link href={`/${locale}/products`} className="text-gray-400 hover:text-cyan-400 transition-colors">
            {locale === 'tr' ? 'Ürünler' : 'Products'}
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-cyan-400 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {locale === 'tr' ? 'YENİ' : 'NEW'}
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {locale === 'tr' ? 'ÇOK SATAN' : 'BESTSELLER'}
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 text-sm font-medium">{categoryDisplay}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-sm">{product.brand}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">
                {product.price.toLocaleString('tr-TR')} ₺
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('tr-TR')} ₺
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% {locale === 'tr' ? 'İNDİRİM' : 'OFF'}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">
                    {locale === 'tr' ? 'Stokta' : 'In Stock'}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-red-400 font-medium">
                    {locale === 'tr' ? 'Stokta Yok' : 'Out of Stock'}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-3">
                {locale === 'tr' ? 'Açıklama' : 'Description'}
              </h2>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="pt-4 border-t border-slate-700/50">
                <h2 className="text-lg font-semibold text-white mb-3">
                  {locale === 'tr' ? 'Özellikler' : 'Features'}
                </h2>
                <ul className="grid gap-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-4 border-t border-slate-700/50">
                <h2 className="text-lg font-semibold text-white mb-3">
                  {locale === 'tr' ? 'Teknik Özellikler' : 'Specifications'}
                </h2>
                <dl className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    value && (
                      <div key={key} className="bg-slate-800/50 rounded-lg p-3">
                        <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                          {key}
                        </dt>
                        <dd className="text-white font-medium">{value}</dd>
                      </div>
                    )
                  ))}
                </dl>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="pt-6 space-y-3">
              {product.affiliateUrl ? (
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl text-center hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/30"
                >
                  {locale === 'tr' ? 'Satın Al' : 'Buy Now'}
                </a>
              ) : (
                <button
                  disabled
                  className="block w-full bg-slate-700 text-gray-400 font-bold py-4 px-6 rounded-xl text-center cursor-not-allowed"
                >
                  {locale === 'tr' ? 'Yakında Satışta' : 'Coming Soon'}
                </button>
              )}
              
              <Link
                href={`/${locale}/products`}
                className="block w-full border border-slate-600 text-white font-medium py-3 px-6 rounded-xl text-center hover:bg-slate-800 transition-colors"
              >
                {locale === 'tr' ? '← Ürünlere Dön' : '← Back to Products'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
