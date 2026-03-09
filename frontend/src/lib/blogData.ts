export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

const blogPostsTr: BlogPost[] = [
  {
    id: 1,
    slug: 'snowboard-boyutu-nasil-secilir',
    title: 'Snowboard Boyutu Nasıl Seçilir? Kapsamlı Rehber',
    excerpt: 'Doğru snowboard boyutu seçimi, pistteki performansınızı doğrudan etkiler.',
    category: 'Rehber',
    readTime: '8 dk',
    date: '15 Ocak 2025',
    author: 'SnowSetup Ekibi',
    tags: ['snowboard', 'boyut', 'rehber'],
    content: `
## Giriş

Doğru snowboard boyutu seçmek, kayak deneyiminizin kalitesini doğrudan etkiler. Çok uzun bir board kontrolü zorlaştırırken, çok kısa bir board stabiliteden ödün verir. Bu rehberde, sizin için ideal snowboard boyutunu nasıl bulacağınızı adım adım anlatıyoruz.

## Boy ve Kilo Faktörü

### Klasik Yöntem: Çene-Burun Aralığı

Geleneksel olarak, snowboard boyutunuz ayakta dururken çeneniz ile burnunuz arasında olmalıdır. Bu yaklaşık olarak:

- **Boyunuz - 15cm** = Maksimum board uzunluğu
- **Boyunuz - 25cm** = Minimum board uzunluğu

### Modern Yaklaşım: Kilo Öncelikli

Günümüzde kilo, boy kadar önemli bir faktör olarak kabul edilmektedir:

| Kilo (kg) | Önerilen Board Uzunluğu (cm) |
|-----------|------------------------------|
| 50-55 | 140-145 |
| 55-65 | 145-152 |
| 65-75 | 152-157 |
| 75-85 | 157-162 |
| 85+ | 162+ |

## Kayma Stili Etkisi

### Freestyle
Freestyle için **2-4 cm daha kısa** board tercih edin. Kısa board:
- Daha kolay döner
- Trick'ler için idealdir
- Park'ta manevra kabiliyeti sağlar

### Freeride / Powder
Freeride için **3-5 cm daha uzun** board seçin:
- Daha fazla stabilite
- Yüksek hızda kontrol
- Derin karda yüzme

### All-Mountain
Standart hesaplama kullanın - ne çok kısa ne çok uzun.

## Genişlik (Waist Width)

Board genişliği, ayak numaranıza göre belirlenir:

- **39-42 numara**: Normal genişlik (245-250mm)
- **43-44 numara**: Mid-wide (250-255mm)
- **45+ numara**: Wide (255mm+)

**Önemli**: Ayak taşması (toe/heel drag) performansı ciddi şekilde etkiler!

## Deneyim Seviyesi

### Yeni Başlayanlar
- Hesaplanan boyuttan **3-5 cm kısa** board seçin
- Daha yumuşak flex tercih edin
- Rocker veya flat profil idealdir

### Orta Seviye
- Standart hesaplama kullanın
- Medium flex
- Hybrid profil

### İleri Seviye
- Hesaplanan boyuttan **2-3 cm uzun** board seçebilirsiniz
- Stiff flex mümkün
- Camber profil

## Sonuç

Doğru snowboard boyutu seçmek için:
1. Boy ve kilonuzu hesaba katın
2. Kayma stilinizi belirleyin
3. Deneyim seviyenize göre ayarlama yapın
4. Ayak numaranıza uygun genişlik seçin

**Hesaplayıcımızı kullanarak** tüm bu faktörleri otomatik olarak hesaplayabilir ve size özel önerileri görebilirsiniz!
    `
  },
  {
    id: 2,
    slug: 'yeni-baslayanlar-icin-snowboard',
    title: '2025 Yeni Başlayanlar İçin En İyi 10 Snowboard',
    excerpt: 'Snowboard maceranıza başlamak için doğru ekipman şart.',
    category: 'İnceleme',
    readTime: '12 dk',
    date: '10 Ocak 2025',
    author: 'SnowSetup Ekibi',
    tags: ['snowboard', 'yeni başlayanlar', 'inceleme', '2025'],
    content: `
## Giriş

Snowboard dünyasına adım atarken doğru ekipman seçimi kritik öneme sahiptir. Yeni başlayanlar için tasarlanmış board'lar, öğrenme sürecini kolaylaştırır ve daha hızlı ilerlemenizi sağlar.

## Yeni Başlayanlar İçin Board Özellikleri

İdeal başlangıç board'u şu özelliklere sahip olmalıdır:

- **Soft-Medium Flex**: Hataları affeder, kolay kontrol
- **Rocker veya Flat Profil**: Kenar takılmalarını önler
- **Twin veya Directional Twin Shape**: Çok yönlü kullanım
- **Uygun Fiyat**: İlk board'a aşırı yatırım gerekli değil

## 2025'in En İyi Başlangıç Board'ları

### 1. Burton Ripcord
**Fiyat**: ~18.000 ₺

Burton'ın yeni başlayanlar için tasarladığı Ripcord, flat profili ve soft flex'i ile hata affedici bir deneyim sunar. Flat Top profili, kenar takılmalarını minimuma indirir.

**Artıları:**
- Çok affedici
- Kolay dönüş
- Dayanıklı yapı

**Eksileri:**
- İlerleme sonrası yetersiz kalabilir

### 2. Rossignol District
**Fiyat**: ~16.000 ₺

All-mountain odaklı District, yeni başlayanlardan orta seviyeye geçişte ideal bir seçenek. AmpTek Rocker profili dengeli bir his sunar.

### 3. Salomon Pulse
**Fiyat**: ~14.000 ₺

Uygun fiyatı ve güvenilir performansıyla öne çıkan Pulse, flat-out camber profili ile kolay kontrol sağlar.

### 4. K2 Standard
**Fiyat**: ~15.000 ₺

Catch-Free Rocker teknolojisi sayesinde kenar takılmalarını önleyen Standard, güvenle öğrenmenizi sağlar.

### 5. Head Course
**Fiyat**: ~13.000 ₺

Bütçe dostu seçenekler arasında öne çıkan Course, temel özellikleri başarıyla sunar.

## Seçim Kriterleri

### Flex Değerlendirmesi (1-10)
- **1-3**: Çok yumuşak (yeni başlayanlar)
- **4-6**: Orta (gelişenler)
- **7-10**: Sert (uzmanlar)

### Profil Seçimi
- **Rocker**: En affedici, yeni başlayanlar için ideal
- **Flat**: Dengeli, çok yönlü
- **Camber**: Hassas, deneyim gerektirir

## Bütçe Önerileri

| Bütçe | Öneri |
|-------|-------|
| 10.000-15.000 ₺ | Head Course, Salomon Pulse |
| 15.000-20.000 ₺ | Burton Ripcord, Rossignol District |
| 20.000+ ₺ | Burton Process (gelecek için yatırım) |

## Sonuç

İlk snowboard alırken:
1. Bütçenizi belirleyin
2. Soft flex ve rocker/flat profil tercih edin
3. Boyut hesaplaması yapın
4. Fiziksel olarak mağazada görün

İlk board'unuzda aşırı harcama yapmayın - tarzınız ve seviyeniz değişecektir!
    `
  },
  {
    id: 3,
    slug: 'snowboard-binding-rehberi',
    title: 'Snowboard Binding Seçimi: Bilmeniz Gereken Her Şey',
    excerpt: 'Binding, board ile botunuz arasındaki kritik bağlantıdır.',
    category: 'Rehber',
    readTime: '10 dk',
    date: '5 Ocak 2025',
    author: 'SnowSetup Ekibi',
    tags: ['binding', 'ekipman', 'rehber'],
    content: `
## Binding Neden Önemli?

Binding, snowboard ekipmanlarınız arasında en az değer verilen ama en kritik parçalardan biridir. Kaliteli bir binding:

- Güç transferini optimize eder
- Konfor sağlar
- Güvenliği artırır
- Performansı yükseltir

## Binding Tipleri

### Strap Binding (Kayışlı)
En yaygın tip. İki kayış ile botu sabitlerer.

**Avantajları:**
- Güçlü tutus
- Ayarlanabilir
- Geniş uyumluluk

### Rear-Entry Binding
Arkadan giriş sistemi. Highback geriye yatar.

**Avantajları:**
- Hızlı giyim
- Pratik kullanım

**Dezavantajları:**
- Daha az ayar seçeneği
- Ağır olabilir

### Step-On Binding
Burton'ın patentli sistemi. Bot direk binding'e kilitlenir.

**Avantajları:**
- En hızlı giyim
- Rahat kullanım

**Dezavantajları:**
- Sadece uyumlu botlarla çalışır
- Pahalı

## Flex Değerlendirmesi

| Flex | Seviye | Stil |
|------|--------|------|
| Soft (1-3) | Başlangıç | Freestyle, Jib |
| Medium (4-6) | Orta | All-Mountain |
| Stiff (7-10) | İleri | Freeride, Carving |

## Beden Seçimi

Binding bedeni bot numaranıza göre belirlenir:

| Bot Numarası | Binding Bedeni |
|--------------|----------------|
| 36-38 | S |
| 39-42 | M |
| 43-45 | L |
| 46+ | XL |

## Stance Ayarları

### Stance Width (Duruş Genişliği)
Omuz genişliğiniz ± 2-3 cm idealdir.

### Stance Angle (Açılar)
- **Duck Stance**: +15/-15 (Freestyle)
- **Forward Stance**: +18/+6 (Freeride)
- **Neutral**: +15/0 (All-Mountain)

## Önerilen Markalar

1. **Burton** - Geniş ürün yelpazesi, Step-On sistemi
2. **Union** - Dayanıklılık ve performans
3. **Flux** - Japon kalitesi, konfor odaklı
4. **NOW** - Yenilikçi teknolojiler

## Sonuç

Binding seçerken:
1. Kayma stilinize uygun flex seçin
2. Bot numaranıza göre beden belirleyin
3. Board uyumluluğunu kontrol edin
4. Bütçenizi değerlendirin

Kaliteli binding uzun yıllar hizmet verir - yatırım yapmaktan çekinmeyin!
    `
  },
  {
    id: 4,
    slug: 'snowboard-bot-secimi',
    title: 'Snowboard Bot Seçimi: Doğru Numarayı Bulmak',
    excerpt: 'Snowboard botları, konfor ve performans için kritik öneme sahiptir.',
    category: 'Rehber',
    readTime: '9 dk',
    date: '28 Aralık 2024',
    author: 'SnowSetup Ekibi',
    tags: ['bot', 'ekipman', 'rehber'],
    content: `
## Neden Bot En Önemli Ekipman?

Snowboard botları, ekipman setinizin en önemli parçasıdır. Yanlış bot:
- Ayak ağrısına neden olur
- Soğuk ayaklara yol açar
- Kontrolü zorlaştırır
- Günü mahveder!

## Doğru Numara Nasıl Bulunur?

### Adım 1: Ayak Ölçümü
Akşam saatlerinde (ayak şiştiğinde) ölçüm yapın:
1. Duvara yaslanın
2. Kağıt üzerinde topuğu duvara dayayın
3. En uzun parmağı işaretleyin
4. Santimetre cinsinden ölçün

### Adım 2: Mondo Tablosu
| Ayak (cm) | Mondo | EU | US (Erkek) |
|-----------|-------|-----|------------|
| 25.0 | 25.0 | 39 | 7 |
| 26.0 | 26.0 | 41 | 8 |
| 27.0 | 27.0 | 42 | 9 |
| 28.0 | 28.0 | 43 | 10 |
| 29.0 | 29.0 | 44 | 11 |
| 30.0 | 30.0 | 46 | 12 |

## Bağlama Sistemleri

### Traditional Lace (Geleneksel Bağcık)
- En hassas ayar
- En ucuz
- Zaman alır

### Speed Lace / Quick Pull
- Hızlı bağlama
- İyi ayar
- Orta fiyat

### BOA Sistemi
- En hızlı
- Tek elle ayar
- Premium fiyat

### Çift BOA
- Üst ve alt ayrı ayar
- Maksimum kontrol
- En pahalı

## Flex Seçimi

### Soft (1-4)
- Yeni başlayanlar
- Freestyle
- Park riding

### Medium (5-7)
- Çoğu kayakçı için ideal
- All-mountain
- Çok yönlü

### Stiff (8-10)
- Uzmanlar
- Freeride
- Carving

## Deneme İpuçları

1. **Günün sonunda deneyin** - Ayak şişer
2. **Kayak çorabıyla deneyin** - Günlük çorap değil
3. **15 dakika yürüyün** - Basınç noktalarını hissedin
4. **Öne eğilin** - Tepki kontrolü
5. **Parmaklar temas etmeli** - Ama sıkmamalı

## Heat Moldable Liner

Bazı premium botlar ısıyla şekillenen iç bot (liner) içerir:
- Ayağınıza özel kalıp oluşur
- Maksimum konfor
- Daha iyi performans

## Sonuç

Bot alırken:
1. Doğru ölçüm yapın
2. Mağazada mutlaka deneyin
3. Flex'i stilinize göre seçin
4. Kaliteli çorap kullanın

**Asla online almadan önce denemeyin!**
    `
  },
  {
    id: 5,
    slug: 'freestyle-vs-freeride',
    title: 'Freestyle vs Freeride: Hangi Stil Sana Uygun?',
    excerpt: 'Snowboard stilleri arasındaki farkları anlayın.',
    category: 'Karşılaştırma',
    readTime: '7 dk',
    date: '20 Aralık 2024',
    author: 'SnowSetup Ekibi',
    tags: ['freestyle', 'freeride', 'karşılaştırma'],
    content: `
## İki Farklı Dünya

Snowboard dünyası temelde iki ana stile ayrılır: Freestyle ve Freeride. Her ikisi de benzersiz deneyimler sunar ve farklı ekipman gerektirir.

## Freestyle Nedir?

Freestyle, park içinde veya dışında trick'ler, jump'lar ve jib'ler yapmaya odaklanır.

### Özellikler
- Park riding
- Jump'lar ve trick'ler
- Rail ve box
- Halfpipe

### Ekipman Gereksinimleri
- **Board**: Twin tip, soft-medium flex, rocker/hybrid profil
- **Binding**: Soft flex, yüksek esneklik
- **Bot**: Soft flex, manevra kabiliyeti

### Kimler İçin?
- Kreativite sevenler
- Park odaklı kayakçılar
- Trick öğrenmek isteyenler

## Freeride Nedir?

Freeride, pistler dışında doğal arazide kayma stilidir.

### Özellikler
- Off-piste kayma
- Powder
- Doğal engeller
- Büyük dağlar

### Ekipman Gereksinimleri
- **Board**: Directional, stiff flex, camber/directional rocker
- **Binding**: Stiff flex, güçlü destek
- **Bot**: Stiff flex, tepki

### Kimler İçin?
- Macera arayanlar
- Doğa tutkunları
- Deneyimli kayakçılar

## Karşılaştırma Tablosu

| Özellik | Freestyle | Freeride |
|---------|-----------|----------|
| Arazi | Park, pist | Off-piste, dağ |
| Board Shape | Twin | Directional |
| Flex | Soft-Medium | Medium-Stiff |
| Profil | Rocker/Hybrid | Camber/Dir. Camber |
| Bot | Soft | Stiff |
| Deneyim | Her seviye | Orta-İleri |

## All-Mountain: Orta Yol

Kararsız mısınız? All-mountain stili her ikisinden özellikler taşır:

- Çok yönlü board
- Medium flex
- Hem piste hem off-piste uygun
- Başlangıç için ideal

## Nasıl Karar Verilir?

### Kendinize Sorun:
1. Nerede kaymayı tercih ediyorum?
2. Risk toleransım nedir?
3. Fiziksel kondisyonum nasıl?
4. Ne tür heyecan arıyorum?

### Öneriler:
- **Yeni başlayanlar**: All-mountain ile başlayın
- **Park meraklıları**: Freestyle'a yönelin
- **Macera arayanlar**: Freeride'ı keşfedin

## Sonuç

Doğru stil seçimi kişisel tercihlere bağlıdır. Her iki stili de denemenizi ve size en uygun olanı keşfetmenizi öneriyoruz!
    `
  },
  {
    id: 6,
    slug: 'snowboard-bakim-rehberi',
    title: 'Snowboard Bakım Rehberi: Sezon Boyu Performans',
    excerpt: 'Snowboard\'unuzun ömrünü uzatın ve performansını artırın.',
    category: 'Bakım',
    readTime: '6 dk',
    date: '15 Aralık 2024',
    author: 'SnowSetup Ekibi',
    tags: ['bakım', 'wax', 'kenar'],
    content: `
## Neden Bakım Önemli?

Düzenli bakım:
- Kayma hızını artırır
- Kontrolü iyileştirir
- Board ömrünü uzatır
- Güvenliği sağlar

## Temel Bakım Adımları

### 1. Taban Temizliği
Her kayma sonrası:
- Kiri silin
- Nem kalmasın
- Oda sıcaklığında kurulayın

### 2. Waxlama
**Ne sıklıkla?**
- Aktif kayakçılar: Her 3-5 kayma
- Hafta sonu kayakçıları: Ayda bir

**Wax Türleri:**
| Sıcaklık | Wax Rengi |
|----------|-----------|
| -1°C ve üstü | Sarı (sıcak) |
| -1 ile -7°C | Kırmızı |
| -7 ile -12°C | Mor |
| -12°C ve altı | Yeşil (soğuk) |

### 3. Kenar Bakımı
Keskin kenarlar = Daha iyi kontrol

**Ne zaman?**
- Kenarlar matlaştığında
- Çizikler oluştuğunda
- Buz tutmazsa

### 4. Binding Kontrolü
- Vidaları kontrol edin
- Kayışları inceleyin
- Toka mekanizmasını test edin

## Sezon Sonu Bakımı

1. **Temizlik**: Tüm kiri çıkarın
2. **Kalın wax**: Koruyucu katman
3. **Kenar koruma**: Hafif pas önleyici
4. **Depolama**: Serin, kuru ortam
5. **Binding gevşetme**: Gerilimi azaltın

## DIY vs Profesyonel Servis

### Evede Yapılabilir:
- Taban temizliği
- Basit waxlama
- Vida kontrolü

### Profesyonele Götürün:
- Kenar bileme
- Taban onarımı
- Derin çizikler
- Sezon sonu bakımı

## Gerekli Malzemeler

**Temel Set:**
- Wax
- Wax kazıma spatulası
- Naylon fırça
- Temizlik bezi

**İleri Seviye:**
- Wax ütüsü
- Kenar bileme aleti
- Taban onarım kiti

## Bakım Takvimi

| Zaman | İşlem |
|-------|-------|
| Her kayma sonrası | Temizlik, kurulama |
| 3-5 kayma | Waxlama |
| Ayda bir | Kenar kontrolü |
| Sezon ortası | Profesyonel bakım |
| Sezon sonu | Depolama hazırlığı |

## Sonuç

Düzenli bakım, board'unuzun performansını ve ömrünü maksimize eder. Temel bakımları kendiniz yapabilir, karmaşık işlemler için profesyonel destek alabilirsiniz.

**İyi kaymalar!** 🏂
    `
  },
];

const blogPostsEn: BlogPost[] = [
  {
    id: 1,
    slug: 'how-to-choose-snowboard-size',
    title: 'How to Choose Snowboard Size? Comprehensive Guide',
    excerpt: 'The right snowboard size selection directly affects your performance on the slopes.',
    category: 'Guide',
    readTime: '8 min',
    date: 'January 15, 2025',
    author: 'SnowSetup Team',
    tags: ['snowboard', 'size', 'guide'],
    content: `
## Introduction

Choosing the right snowboard size directly impacts the quality of your riding experience. A board that's too long makes control difficult, while a board that's too short compromises stability.

## Height and Weight Factor

### Classic Method: Chin-Nose Range

Traditionally, your snowboard should be between your chin and nose when standing:

- **Your height - 15cm** = Maximum board length
- **Your height - 25cm** = Minimum board length

### Modern Approach: Weight Priority

Today, weight is considered as important as height:

| Weight (kg) | Recommended Board Length (cm) |
|-------------|-------------------------------|
| 50-55 | 140-145 |
| 55-65 | 145-152 |
| 65-75 | 152-157 |
| 75-85 | 157-162 |
| 85+ | 162+ |

## Riding Style Impact

### Freestyle
Choose a board **2-4 cm shorter** for freestyle.

### Freeride / Powder
Choose a board **3-5 cm longer** for freeride.

### All-Mountain
Use standard calculation - not too short, not too long.

## Width (Waist Width)

Board width is determined by your shoe size:

- **EU 39-42**: Regular width (245-250mm)
- **EU 43-44**: Mid-wide (250-255mm)
- **EU 45+**: Wide (255mm+)

## Conclusion

Use our calculator to automatically compute all these factors and see personalized recommendations!
    `
  },
  {
    id: 2,
    slug: 'best-snowboards-for-beginners-2025',
    title: 'Top 10 Best Snowboards for Beginners 2025',
    excerpt: 'Starting your snowboard adventure requires the right equipment.',
    category: 'Review',
    readTime: '12 min',
    date: 'January 10, 2025',
    author: 'SnowSetup Team',
    tags: ['snowboard', 'beginners', 'review', '2025'],
    content: `
## Introduction

Choosing the right equipment when stepping into the snowboard world is critically important. Boards designed for beginners make the learning process easier and help you progress faster.

## Features for Beginner Boards

The ideal beginner board should have:

- **Soft-Medium Flex**: Forgiving, easy control
- **Rocker or Flat Profile**: Prevents edge catches
- **Twin or Directional Twin Shape**: Versatile use
- **Reasonable Price**: No need to overspend on first board

## Top Picks for 2025

### 1. Burton Ripcord
A forgiving experience with flat profile and soft flex.

### 2. Rossignol District
Ideal for transition from beginner to intermediate.

### 3. Salomon Pulse
Stands out with affordable price and reliable performance.

### 4. K2 Standard
Prevents edge catches with Catch-Free Rocker technology.

### 5. Head Course
Budget-friendly option that delivers basic features well.

## Conclusion

Don't overspend on your first board - your style and level will change!
    `
  },
  {
    id: 3,
    slug: 'snowboard-binding-guide',
    title: 'Snowboard Binding Selection: Everything You Need to Know',
    excerpt: 'The binding is the critical connection between your board and boots.',
    category: 'Guide',
    readTime: '10 min',
    date: 'January 5, 2025',
    author: 'SnowSetup Team',
    tags: ['binding', 'equipment', 'guide'],
    content: `
## Why Bindings Matter

Quality bindings optimize power transfer, provide comfort, increase safety, and enhance performance.

## Binding Types

### Strap Binding
Most common type. Secures boot with two straps.

### Rear-Entry Binding
Rear entry system. Highback lays back.

### Step-On Binding
Burton's patented system. Boot clicks directly into binding.

## Flex Rating

| Flex | Level | Style |
|------|-------|-------|
| Soft (1-3) | Beginner | Freestyle, Jib |
| Medium (4-6) | Intermediate | All-Mountain |
| Stiff (7-10) | Advanced | Freeride, Carving |

## Conclusion

Quality bindings serve for many years - don't hesitate to invest!
    `
  },
  {
    id: 4,
    slug: 'snowboard-boot-selection',
    title: 'Snowboard Boot Selection: Finding the Right Fit',
    excerpt: 'Snowboard boots are critical for comfort and performance.',
    category: 'Guide',
    readTime: '9 min',
    date: 'December 28, 2024',
    author: 'SnowSetup Team',
    tags: ['boot', 'equipment', 'guide'],
    content: `
## Why Boots Are the Most Important Equipment

Snowboard boots are the most important piece of your equipment set. Wrong boots cause foot pain, cold feet, difficult control, and ruin your day!

## How to Find the Right Size

### Step 1: Foot Measurement
Measure in the evening (when feet are swollen).

### Step 2: Mondo Chart
| Foot (cm) | Mondo | EU | US (Men) |
|-----------|-------|-----|----------|
| 25.0 | 25.0 | 39 | 7 |
| 26.0 | 26.0 | 41 | 8 |
| 27.0 | 27.0 | 42 | 9 |

## Lacing Systems

- Traditional Lace
- Speed Lace / Quick Pull  
- BOA System
- Dual BOA

## Conclusion

Never buy online without trying them on first!
    `
  },
  {
    id: 5,
    slug: 'freestyle-vs-freeride',
    title: 'Freestyle vs Freeride: Which Style Suits You?',
    excerpt: 'Understand the differences between snowboard styles.',
    category: 'Comparison',
    readTime: '7 min',
    date: 'December 20, 2024',
    author: 'SnowSetup Team',
    tags: ['freestyle', 'freeride', 'comparison'],
    content: `
## Two Different Worlds

The snowboard world is fundamentally divided into two main styles: Freestyle and Freeride.

## What is Freestyle?

Freestyle focuses on tricks, jumps, and jibs in or out of the park.

## What is Freeride?

Freeride is the style of riding in natural terrain outside the pistes.

## Comparison Table

| Feature | Freestyle | Freeride |
|---------|-----------|----------|
| Terrain | Park, piste | Off-piste, mountain |
| Board Shape | Twin | Directional |
| Flex | Soft-Medium | Medium-Stiff |

## All-Mountain: Middle Ground

Undecided? All-mountain style carries features from both.

## Conclusion

The right style choice depends on personal preferences. We recommend trying both styles!
    `
  },
  {
    id: 6,
    slug: 'snowboard-maintenance-guide',
    title: 'Snowboard Maintenance Guide: Performance All Season',
    excerpt: 'Extend your snowboard\'s life and enhance its performance.',
    category: 'Maintenance',
    readTime: '6 min',
    date: 'December 15, 2024',
    author: 'SnowSetup Team',
    tags: ['maintenance', 'wax', 'edge'],
    content: `
## Why Maintenance Matters

Regular maintenance increases sliding speed, improves control, extends board life, and ensures safety.

## Basic Maintenance Steps

### 1. Base Cleaning
After each ride: wipe dirt, don't let moisture remain.

### 2. Waxing
- Active riders: Every 3-5 rides
- Weekend riders: Once a month

### 3. Edge Care
Sharp edges = Better control

### 4. Binding Check
Check screws, inspect straps, test buckle mechanism.

## End of Season Care

1. Cleaning
2. Thick wax for protection
3. Edge preservation
4. Cool, dry storage
5. Loosen binding tension

## Conclusion

Regular maintenance maximizes your board's performance and lifespan!
    `
  },
];

export function getBlogPost(slug: string, locale: string): BlogPost | undefined {
  const primaryPosts = locale === 'en' ? blogPostsEn : blogPostsTr;
  const secondaryPosts = locale === 'en' ? blogPostsTr : blogPostsEn;

  const directMatch = primaryPosts.find((post) => post.slug === slug);
  if (directMatch) {
    return directMatch;
  }

  // Fallback for locale switches when the slug belongs to the other language.
  const crossLocaleMatch = secondaryPosts.find((post) => post.slug === slug);
  if (!crossLocaleMatch) {
    return undefined;
  }

  return primaryPosts.find((post) => post.id === crossLocaleMatch.id) ?? crossLocaleMatch;
}

export function getAllBlogPosts(locale: string): BlogPost[] {
  return locale === 'en' ? blogPostsEn : blogPostsTr;
}
