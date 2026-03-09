export interface GuideArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  readTime: string;
  category: 'equipment' | 'technique' | 'maintenance';
  content: string;
}

const guidesTr: GuideArticle[] = [
  {
    id: 1,
    slug: 'snowboard-secim-rehberi',
    title: 'Snowboard Seçim Rehberi',
    description: 'Boy, kilo ve stil tercihlerinize göre ideal board seçimi',
    icon: '🏂',
    readTime: '15 dk',
    category: 'equipment',
    content: `
## Doğru Snowboard Seçimi Neden Önemli?

Doğru snowboard, öğrenme hızınızı artırır ve sakatlık riskini azaltır. Yanlış board ise dönüş kontrolünü zorlaştırır, yorgunluğu artırır ve pistteki keyfinizi düşürür.

## 1) Boyut Seçimi

Temel kural: board boyu, çene ile burun aralığında olmalı. Daha hassas seçim için kilo aralıklarını da dikkate alın:

- 50-60 kg: 142-148 cm
- 60-70 kg: 148-154 cm
- 70-80 kg: 154-159 cm
- 80+ kg: 159+ cm

## 2) Shape Seçimi

- **Twin**: Freestyle ve switch sürüş için ideal
- **Directional Twin**: All-mountain kullanım için dengeli
- **Directional**: Freeride ve yüksek hız için güçlü

## 3) Profil Seçimi

- **Rocker**: Hata affedici, yeni başlayanlar için kolay
- **Camber**: Güçlü kenar tutuşu, ileri seviye sürüş
- **Hybrid**: İki dünyanın dengesi

## 4) Flex Değeri

- Soft (1-3): Yeni başlayan, park odaklı
- Medium (4-6): All-mountain için en çok tercih edilen
- Stiff (7-10): Yüksek hız, freeride, carving

## 5) Genişlik (Waist Width)

Bot numaranız büyükse wide board tercih edin. Ayak taşması olursa kenar kontrolü düşer.

## Kısa Öneri

İlk board için medium-soft flex, directional twin shape ve hybrid/rocker profil seçmek en güvenli başlangıçtır.
`
  },
  {
    id: 2,
    slug: 'binding-secim-rehberi',
    title: 'Binding Seçim Rehberi',
    description: 'Flex, açı ve uyumluluk hakkında her şey',
    icon: '⛷️',
    readTime: '12 dk',
    category: 'equipment',
    content: `
## Binding Seçimi: Kontrolün Anahtarı

Binding, board ile bot arasındaki güç aktarımını sağlar. Uygun olmayan binding, iyi bir board'u bile verimsiz hale getirebilir.

## 1) Flex Uyumu

Board, bot ve binding flex değerleri birbirine yakın olmalıdır:

- Yeni başlayan: Soft-Medium
- All-mountain: Medium
- Freeride/Carving: Medium-Stiff

## 2) Beden Seçimi

Binding bedenleri markaya göre değişebilir. Her zaman marka tablosunu kontrol edin.

- S: Genelde 36-39
- M: Genelde 39-42
- L: Genelde 42-45+

## 3) Montaj Sistemleri

- 4x4
- 2x4
- Channel (özellikle bazı Burton modelleri)

Board'unuzun montaj standardı ile binding'inizin disk uyumluluğunu kontrol edin.

## 4) Açı ve Duruş

Başlangıç için popüler ayarlar:

- Duck stance: +15 / -15
- All-mountain: +15 / 0
- Freeride: +18 / +6

## 5) Highback ve Strap Ayarı

- Highback çok dik olursa dizlere baskı yapabilir
- Strap çok sıkıysa dolaşımı azaltır
- Botu sabitlerken ağrı yaratmayan bir ayar hedefleyin

## Sonuç

Binding seçerken ilk öncelik uyumluluk, ikinci öncelik flex dengesi olmalı.
`
  },
  {
    id: 3,
    slug: 'bot-secim-rehberi',
    title: 'Bot Seçim Rehberi',
    description: 'Doğru fit ve konfor için bot seçimi',
    icon: '👢',
    readTime: '10 dk',
    category: 'equipment',
    content: `
## Bot Fit'i Performansı Belirler

Ayağınıza uygun bot, board kontrolünüzü belirgin şekilde artırır. Konforsuz bot ise teknik seviyeniz ne olursa olsun sürüş kalitesini düşürür.

## 1) Numara ve Mondo

Mondo ölçüsü, ayak uzunluğunu santimetre cinsinden verir. Akşam saatinde ölçüm daha doğrudur.

## 2) Topuk Kilidi

Topuğunuz bot içinde fazla yükselmemeli. Topuk kayması, dönüşlerde güç kaybına neden olur.

## 3) Burun Mesafesi

Ayakta dik dururken parmaklar hafif temas edebilir. Diz kırıldığında temas azalmalı.

## 4) Flex Seçimi

- Soft: Freestyle, yeni başlayan
- Medium: All-mountain
- Stiff: Freeride, carving

## 5) Bağlama Sistemi

- Traditional lace: En hassas ayar
- Speed lace: Daha hızlı
- BOA: Pratik ve temiz kullanım

## Son Tavsiye

Bot mutlaka deneyilerek alınmalı. 10-15 dakika yürüyüş yapmadan karar vermeyin.
`
  },
  {
    id: 4,
    slug: 'giyim-rehberi',
    title: 'Snowboard Giyim Rehberi',
    description: 'Katman sistemi ve uygun kıyafet seçimi',
    icon: '🧥',
    readTime: '8 dk',
    category: 'equipment',
    content: `
## Katman Sistemi

Snowboard'da doğru giyim, performans kadar güvenlik için de önemlidir. En etkili yaklaşım 3 katman sistemidir.

## 1) Base Layer

Ter yönetimi sağlar. Pamuk yerine sentetik veya merino yün tercih edin.

## 2) Mid Layer

Isı yalıtımı sağlar. Hava sıcaklığına göre polar veya hafif kaz tüyü kullanılabilir.

## 3) Outer Layer

Su ve rüzgar koruması sağlar. Ceket ve pantolonda su geçirmezlik/dış nefes alabilirlik değerlidir.

## Teknik Değerler

- 10K/10K: Orta seviye koşullar
- 15K/15K: Sık kar ve değişken hava
- 20K+: Zorlu hava ve yoğun sürüş

## Ek Ekipman

- Bilek destekli eldiven
- Boyunluk
- Merino çorap
- Kask ve gözlük

## Sonuç

Doğru giyim, üşüme ve terleme dengesini kurar. Böylece gün boyu daha stabil performans elde edersiniz.
`
  },
  {
    id: 5,
    slug: 'yeni-baslayanlar-rehberi',
    title: 'Yeni Başlayanlar Rehberi',
    description: 'İlk adımlardan pistte kaymaya',
    icon: '🎿',
    readTime: '20 dk',
    category: 'technique',
    content: `
## İlk Gün Planı

İlk gün hedefiniz hız değil, denge ve güven olmalı. Düşmek öğrenmenin doğal bir parçasıdır.

## 1) Duruş ve Temel Pozisyon

- Dizler hafif kırık
- Kalça merkezde
- Omuzlar board hattına paralel
- Bakış ileri

## 2) Düz Zeminde Alıştırmalar

- Tek ayakla itiş
- Düz kayma
- Fren hissi

## 3) Heel ve Toe Edge Kontrolü

İki kenarı ayrı ayrı hissederek yavaş geçiş çalışmaları yapın.

## 4) J-Turn ve Garlands

Tam dönüşten önce yarım dönüş pratikleri, kenar kontrolünü hızla geliştirir.

## 5) Güvenli Düşme

- Elleri yere kilitlemeyin
- Omuz ve kalça ile yuvarlanın
- Bilekleri koruyun

## Hızlı İlerleme İpuçları

- Kısa ama düzenli antrenman
- Yumuşak pistlerde pratik
- Dinlenme araları

## Sonuç

İlk 3-5 gün içinde temel dönüşleri rahat yapabilir, bir sezon sonunda orta seviyeye ulaşabilirsiniz.
`
  },
  {
    id: 6,
    slug: 'carving-teknikleri',
    title: 'Carving Teknikleri',
    description: 'Keskin dönüşler ve kenar kontrolü',
    icon: '🎯',
    readTime: '15 dk',
    category: 'technique',
    content: `
## Carving Nedir?

Carving, board'u kaydırmadan kenar üzerinde temiz bir yay çizerek dönüş yapmaktır. Doğru carving hem hızlı hem kontrollü sürüş sağlar.

## 1) Kenar Açısı

Dönüş boyunca board kenarı karı kesmeli. Düz tabana düşmek kaymaya ve kontrol kaybına yol açar.

## 2) Ağırlık Transferi

- Dönüş başlangıcında merkezde kalın
- Apex noktasında dış ayağa yüklenin
- Çıkışta geçişe hazırlanmak için gövdeyi yumuşatın

## 3) Üst Gövde Kontrolü

Omuzlarınız dönüşe liderlik etmeli, ancak aşırı rotasyon board'u bozabilir.

## 4) Ritim

Sabit bir ritim yakalamak carving kalitesini artırır. Ani hareketlerden kaçının.

## Sık Hatalar

- Aşırı geriye yaslanma
- Dizleri kilitleme
- Geç kenar değişimi

## Sonuç

Carving için düzenli pist tekrarları en iyi gelişim yöntemidir. Temiz iz bırakmaya odaklanın.
`
  },
  {
    id: 7,
    slug: 'freestyle-temelleri',
    title: 'Freestyle Temelleri',
    description: 'Park, jump ve trick temelleri',
    icon: '🤸',
    readTime: '18 dk',
    category: 'technique',
    content: `
## Freestyle'a Güvenli Başlangıç

Freestyle gelişimi adım adım yapılmalı. Temel denge ve kenar kontrolü olmadan büyük feature denemeleri sakatlık riskini artırır.

## 1) Park Etiği

- Feature'a girmeden önce hattı gözlemleyin
- Öncelik sırasına uyun
- Düşüş sonrası hattı hızlı boşaltın

## 2) Ollie ve Nollie

Jump öncesi pop gücü için temel hareketlerdir. Düz zeminde tekrar edin.

## 3) Small Jumps

- Yaklaşma hızını sabit tutun
- Takeoff'ta dengeli pop
- Landing'de dizleri absorbe edin

## 4) Box Başlangıcı

Önce düz box ve düşük hız. Omuzları düz tutun, board'u kilitlemeden akışta kalın.

## 5) İlk Trick Önerileri

- 180 (frontside/backside)
- Tail press başlangıçları
- Basit grab denemeleri

## Sonuç

Freestyle gelişiminde en önemli unsur tekrar ve sabırdır. Küçük feature'larda temiz teknik, büyük feature'lardan daha değerlidir.
`
  },
  {
    id: 8,
    slug: 'powder-kayagi',
    title: 'Powder Kayağı',
    description: 'Derin karda kayma teknikleri',
    icon: '❄️',
    readTime: '12 dk',
    category: 'technique',
    content: `
## Powder Sürüşünün Mantığı

Powder'da amaç kenar basmak değil, kar üzerinde akış yakalamaktır. Hareketler daha yumuşak ve ritmiktir.

## 1) Duruş

Piste göre biraz daha geride kalmak nose batmasını azaltır. Ancak aşırı geriye yaslanmak bacakları hızlı yorar.

## 2) Dönüş Stili

Kısa sert hareketler yerine geniş ve yuvarlak dönüşler daha kontrollüdür.

## 3) Hız Yönetimi

Powder'da çok yavaş kalmak akışı keser. Güvenli ama akıcı bir hız koruyun.

## 4) Ekipman

- Directional board avantaj sağlar
- Daha uzun nose daha iyi yüzme sunar
- Setback stance kontrolü artırır

## Güvenlik

- Eşli sürüş
- Bölge bilgisi
- Hava/çığ durumu kontrolü

## Sonuç

Powder, teknik ve doğa okuması gerektirir. Doğru ekipman ve güvenli planla en keyifli snowboard deneyimlerinden biridir.
`
  },
  {
    id: 9,
    slug: 'waxlama-rehberi',
    title: 'Waxlama Rehberi',
    description: 'Board waxlama adım adım',
    icon: '🔧',
    readTime: '10 dk',
    category: 'maintenance',
    content: `
## Waxlama Neden Gerekli?

Wax, board tabanındaki sürtünmeyi azaltır ve hız/akış sağlar. Düzenli waxlama tabanı da korur.

## Gerekli Ekipman

- Wax ütüsü
- Uygun sıcaklık wax'ı
- Plastik kazıyıcı
- Fırça (naylon veya at kılı)

## Adım Adım Waxlama

1. Tabanı temizleyin
2. Ütüyle wax damlatın
3. Wax'ı eşit yayın
4. Soğumaya bırakın (20-30 dk)
5. Fazlayı kazıyın
6. Fırçalayın

## Sık Hatalar

- Ütüyü çok sıcak kullanmak
- Wax'ı yeterince kazımamak
- Kirli tabana wax uygulamak

## Sonuç

Her 3-5 sürüşte bir waxlama, performansı belirgin şekilde iyileştirir.
`
  },
  {
    id: 10,
    slug: 'kenar-bileme',
    title: 'Kenar Bileme',
    description: 'Keskin kenarlar için bileme teknikleri',
    icon: '🔪',
    readTime: '8 dk',
    category: 'maintenance',
    content: `
## Kenar Bileme Ne Sağlar?

Keskin kenarlar, buzlu ve sert pistlerde dönüş güvenliği sağlar. Mat kenar, kayma ve geç tepki yaratır.

## Kenar Açıları

- Side edge: Genelde 88-89
- Base edge: Genelde 0.5-1

Açı seçimi sürüş stilinize göre değişebilir.

## Temel Süreç

1. Board'u sabitleyin
2. Çapakları temizleyin
3. Side edge'i tek yönde işleyin
4. Gerekirse base edge'e hafif müdahale edin
5. Son kontrol yapın

## Dikkat

Fazla bileme kenarı inceltir ve ömrü azaltır. Emin değilseniz profesyonel servise gidin.
`
  },
  {
    id: 11,
    slug: 'sezon-sonu-bakim',
    title: 'Sezon Sonu Bakım',
    description: 'Depolama öncesi bakım önerileri',
    icon: '📦',
    readTime: '6 dk',
    category: 'maintenance',
    content: `
## Sezon Sonu Neden Kritik?

Yanlış depolama, pas ve taban kurumasına yol açar. Sezon sonunda yapılacak 20-30 dakikalık bakım, bir sonraki sezonu kurtarır.

## Adımlar

1. Board'u temizleyin ve tamamen kurutun
2. Kenarlarda nem/pas kontrolü yapın
3. Kalın bir koruyucu wax katmanı bırakın (kazımadan)
4. Binding vidalarını ve kayışları kontrol edin
5. Serin, kuru, güneş almayan alanda saklayın

## Kaçınılması Gerekenler

- Nemli bodrum ortamı
- Radyatör yanı
- Uzun süre sıkı bağlanmış strap/binding

## Sonuç

Doğru sezon sonu bakımı, ekipman ömrünü uzatır ve sezon açılışında ekstra masrafı azaltır.
`
  }
];

const guidesEn: GuideArticle[] = [
  {
    id: 1,
    slug: 'snowboard-selection-guide',
    title: 'Snowboard Selection Guide',
    description: 'Ideal board selection based on height, weight, and style',
    icon: '🏂',
    readTime: '15 min',
    category: 'equipment',
    content: `
## Why Board Selection Matters

The right snowboard helps you progress faster and reduces injury risk. A mismatched board makes turns harder and drains your energy.

## Key Selection Criteria

1. Length by height and weight
2. Shape (twin, directional twin, directional)
3. Profile (rocker, camber, hybrid)
4. Flex based on riding goals
5. Width matched to boot size

## Quick Recommendation

For most beginners: medium-soft flex, directional twin shape, and hybrid profile.
`
  },
  {
    id: 2,
    slug: 'binding-selection-guide',
    title: 'Binding Selection Guide',
    description: 'Everything about flex, angles, and compatibility',
    icon: '⛷️',
    readTime: '12 min',
    category: 'equipment',
    content: `
## Binding Basics

Bindings control power transfer from boots to board. Prioritize compatibility and flex balance.

## Checklist

- Correct binding size
- Mounting system compatibility
- Matching flex with board and boots
- Comfortable strap and highback setup

## Tip

A balanced setup usually performs better than the stiffest setup.
`
  },
  {
    id: 3,
    slug: 'boot-selection-guide',
    title: 'Boot Selection Guide',
    description: 'Boot selection for the right fit and comfort',
    icon: '👢',
    readTime: '10 min',
    category: 'equipment',
    content: `
## Fit First

Boot comfort and fit are the foundation of control.

## Essentials

- Measure feet in the evening
- Check heel hold
- Confirm toe contact is light, not painful
- Choose flex by riding style

## Final Advice

Always test boots before purchase.
`
  },
  {
    id: 4,
    slug: 'clothing-guide',
    title: 'Snowboard Clothing Guide',
    description: 'Layer system and appropriate clothing selection',
    icon: '🧥',
    readTime: '8 min',
    category: 'equipment',
    content: `
## Layering System

Use a 3-layer system for warmth, dryness, and comfort:

1. Base layer for moisture control
2. Mid layer for insulation
3. Outer layer for weather protection

## Tip

Avoid cotton in cold/wet conditions.
`
  },
  {
    id: 5,
    slug: 'beginners-guide',
    title: 'Beginners Guide',
    description: 'From first steps to riding on the slope',
    icon: '🎿',
    readTime: '20 min',
    category: 'technique',
    content: `
## Start Smart

Focus on balance, edge awareness, and safe falling before speed.

## Progression

1. Basic stance and posture
2. Flat-ground drills
3. Heel/toe edge control
4. J-turn and garlands
5. Linked turns
`
  },
  {
    id: 6,
    slug: 'carving-techniques',
    title: 'Carving Techniques',
    description: 'Sharp turns and edge control',
    icon: '🎯',
    readTime: '15 min',
    category: 'technique',
    content: `
## Carving Fundamentals

Carving is clean edge-to-edge turning without skidding.

## Focus Areas

- Stable edge angle
- Smooth weight transfer
- Controlled upper body
- Consistent rhythm
`
  },
  {
    id: 7,
    slug: 'freestyle-basics',
    title: 'Freestyle Basics',
    description: 'Park, jump, and trick fundamentals',
    icon: '🤸',
    readTime: '18 min',
    category: 'technique',
    content: `
## Build Safe Habits

Freestyle progression should be structured and gradual.

## Start With

- Park etiquette
- Ollie and nollie practice
- Small jump control
- Basic box entries
`
  },
  {
    id: 8,
    slug: 'powder-riding',
    title: 'Powder Riding',
    description: 'Techniques for riding in deep snow',
    icon: '❄️',
    readTime: '12 min',
    category: 'technique',
    content: `
## Powder Flow

Powder riding favors smooth, rounded movements and consistent momentum.

## Priorities

- Slightly rear-biased stance
- Rounded turn shapes
- Terrain awareness and safety planning
`
  },
  {
    id: 9,
    slug: 'waxing-guide',
    title: 'Waxing Guide',
    description: 'Board waxing step by step',
    icon: '🔧',
    readTime: '10 min',
    category: 'maintenance',
    content: `
## Why Waxing Helps

Wax reduces friction and protects the base.

## Steps

1. Clean base
2. Apply wax with iron
3. Cool down
4. Scrape excess
5. Brush finish
`
  },
  {
    id: 10,
    slug: 'edge-tuning',
    title: 'Edge Tuning',
    description: 'Tuning techniques for sharp edges',
    icon: '🔪',
    readTime: '8 min',
    category: 'maintenance',
    content: `
## Edge Tuning Basics

Sharp edges improve confidence on hard snow and ice.

## Keep In Mind

- Use consistent file direction
- Avoid over-tuning
- Get professional help if unsure
`
  },
  {
    id: 11,
    slug: 'end-of-season-care',
    title: 'End of Season Care',
    description: 'Pre-storage maintenance tips',
    icon: '📦',
    readTime: '6 min',
    category: 'maintenance',
    content: `
## Off-Season Protection

A short end-of-season routine prevents rust, dryness, and setup issues.

## Checklist

1. Clean and dry board
2. Inspect edges
3. Leave a thick storage wax layer
4. Store cool and dry
`
  }
];

export function getGuideArticle(slug: string, locale: string): GuideArticle | undefined {
  const primaryArticles = locale === 'en' ? guidesEn : guidesTr;
  const secondaryArticles = locale === 'en' ? guidesTr : guidesEn;

  const directMatch = primaryArticles.find((article) => article.slug === slug);
  if (directMatch) {
    return directMatch;
  }

  // Fallback for locale switches when the slug belongs to the other language.
  const crossLocaleMatch = secondaryArticles.find((article) => article.slug === slug);
  if (!crossLocaleMatch) {
    return undefined;
  }

  return primaryArticles.find((article) => article.id === crossLocaleMatch.id) ?? crossLocaleMatch;
}

export function getAllGuideArticles(locale: string): GuideArticle[] {
  return locale === 'en' ? guidesEn : guidesTr;
}
