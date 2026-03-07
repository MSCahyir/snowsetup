import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowsetup.com';
  const now = new Date();

  const locales = ['tr', 'en'];
  const corePaths = ['', '/products', '/blog', '/guides', '/about', '/calculator', '/contact', '/privacy', '/terms'];

  const blogSlugs = {
    tr: [
      'snowboard-boyutu-nasil-secilir',
      'yeni-baslayanlar-icin-snowboard',
      'snowboard-binding-rehberi',
      'snowboard-bot-secimi',
      'freestyle-vs-freeride',
      'snowboard-bakim-rehberi',
    ],
    en: [
      'how-to-choose-snowboard-size',
      'best-snowboards-for-beginners-2025',
      'snowboard-binding-guide',
      'snowboard-boot-selection',
      'freestyle-vs-freeride',
      'snowboard-maintenance-guide',
    ],
  };

  const guideSlugs = {
    tr: [
      'snowboard-secim-rehberi',
      'binding-secim-rehberi',
      'bot-secim-rehberi',
      'giyim-rehberi',
      'yeni-baslayanlar-rehberi',
      'carving-teknikleri',
      'freestyle-temelleri',
      'powder-kayagi',
      'waxlama-rehberi',
      'kenar-bileme',
      'sezon-sonu-bakim',
    ],
    en: [
      'snowboard-selection-guide',
      'binding-selection-guide',
      'boot-selection-guide',
      'clothing-guide',
      'beginners-guide',
      'carving-techniques',
      'freestyle-basics',
      'powder-riding',
      'waxing-guide',
      'edge-tuning',
      'end-of-season-care',
    ],
  };

  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: siteUrl,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 1,
  });

  for (const locale of locales) {
    for (const path of corePaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path === '' ? 0.9 : 0.8,
      });
    }

    for (const slug of blogSlugs[locale as 'tr' | 'en']) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const slug of guideSlugs[locale as 'tr' | 'en']) {
      entries.push({
        url: `${siteUrl}/${locale}/guides/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
