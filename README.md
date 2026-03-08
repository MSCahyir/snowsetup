# Snowboard Ekipman Önerici

Boyunuza, kilonuza ve tecrübenize göre kişiselleştirilmiş snowboard, bot ve binding önerileri sunan web uygulaması.

## Teknolojiler

- **Backend**: .NET 8 Minimal API
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Hosting**: Google Cloud VM + Docker Compose + Caddy

## Proje Yapısı

```
snowboard/
├── backend/                 # .NET 8 API
│   ├── src/
│   │   └── Snowboard.Calculator.Api/
│   │       ├── Services/    # Recommendation logic
│   │       ├── Models/      # Equipment & User models
│   │       └── Endpoints/   # API routes
│   └── Dockerfile
├── frontend/                # Next.js 14
│   ├── src/
│   │   ├── app/            # Pages & SEO
│   │   ├── components/     # UI components
│   │   ├── lib/            # API client
│   │   └── types/          # TypeScript types
│   ├── .env.local
│   └── Dockerfile
├── deploy/
│   └── Caddyfile
├── docker-compose.yml
└── .github/workflows/       # CI/CD
```

## Özellikler

### Kullanıcı Bilgileri

- Boy (cm)
- Kilo (kg)
- Ayak numarası (EU)
- Cinsiyet

### Tecrübe Seviyeleri

- Yeni Başlayan
- Orta Seviye
- İleri Seviye
- Uzman

### Kayma Stilleri

- All-Mountain
- Freestyle / Park
- Freeride
- Powder
- Carving

### Öneriler

- Snowboard boyutu ve modeli
- Bot numarası ve modeli
- Binding bedeni ve modeli
- Uyum skoru ve açıklamalar
- Bütçeye göre filtreleme
- Kişiselleştirilmiş ipuçları

## Geliştirme

### Backend

```bash
cd backend
dotnet restore
dotnet run --project src/Snowboard.Calculator.Api --urls "http://localhost:5000"
```

API şurada çalışacak: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Uygulama şurada çalışacak: `http://localhost:3000`

## API Endpoints

### POST /api/recommendation

Kişiselleştirilmiş ekipman önerileri al.

**Request:**

```json
{
  "profile": {
    "heightCm": 175,
    "weightKg": 75,
    "bootSize": 42,
    "gender": "Male",
    "experience": "Intermediate",
    "preferredStyle": "AllMountain"
  },
  "maxBudget": 1500
}
```

**Response:**

```json
{
  "success": true,
  "profile": { ... },
  "recommendations": [
    {
      "snowboard": {
        "spec": { "brand": "Burton", "model": "Custom", ... },
        "recommendedLength": 156,
        "matchScore": 85
      },
      "boot": { ... },
      "binding": { ... },
      "totalPrice": 1179.97,
      "tips": ["..."]
    }
  ],
  "sizeInfo": {
    "recommendedBoardLength": 155,
    "minBoardLength": 150,
    "maxBoardLength": 160,
    "bindingSize": "L"
  }
}
```

### POST /api/recommendation/size

Sadece boyut hesaplama.

### GET /api/recommendation/styles

Mevcut kayma stillerini listele.

### GET /api/recommendation/levels

Tecrübe seviyelerini listele.

## Boyut Hesaplama Algoritması

1. **Temel uzunluk**: Boy - 20cm
2. **Kilo ayarı**: 80kg üstü her 5kg için +1cm
3. **Stil ayarı**:
   - Freestyle: -3cm (manevra için)
   - Freeride: +3cm (stabilite için)
   - Powder: +5cm (yüzme için)
4. **Tecrübe ayarı**:
   - Yeni başlayan: -3cm (kontrol için)
   - Uzman: +3cm (hız için)

## Deployment

### VM Üzerinde Çalıştırma

```bash
cd ~/snowsetup
git pull --ff-only origin main
docker compose up -d --build
docker compose ps
```

### GCP Firewall (zorunlu)

Let's Encrypt doğrulaması ve dış erişim için `80/443` inbound açık olmalı.

```bash
NET=$(gcloud compute instances describe snow-setup \
  --zone=us-west1-b \
  --format='get(networkInterfaces[0].network.basename())')

gcloud compute firewall-rules create allow-snowsetup-web \
  --network="$NET" \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --rules=tcp:80,tcp:443 \
  --source-ranges=0.0.0.0/0
```

Kural zaten varsa:

```bash
gcloud compute firewall-rules update allow-snowsetup-web \
  --rules=tcp:80,tcp:443 \
  --source-ranges=0.0.0.0/0
```

## CI/CD

GitHub Actions workflows:

- **backend-ci.yml**: .NET restore/build/test
- **frontend-ci.yml**: Lint, type-check, build
- **deploy-vm.yml**: `main` push sonrası VM'e SSH ile bağlanıp `docker compose up -d --build` çalıştırır

`deploy-vm.yml` için GitHub repo secrets:

- `VM_HOST`: VM dış IP adresi
- `VM_USER`: SSH kullanıcı adı (ornek: `m_cahyir2018`)
- `VM_SSH_KEY`: VM'e erişen private key (PEM formatı)

## Lisans

MIT
