interface StructuredDataProps {
  name: string;
  description: string;
  url: string;
}

export default function StructuredData({ name, description, url }: Readonly<StructuredDataProps>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Kişiselleştirilmiş snowboard boyutu hesaplama',
      'Boy, kilo ve tecrübeye göre ekipman önerisi',
      'Snowboard, bot ve binding seçimi',
      'Freestyle, all-mountain, freeride stil desteği',
      'Bütçeye göre filtreleme',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Snowboarders',
    },
    about: {
      '@type': 'Thing',
      name: 'Snowboarding Equipment',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
