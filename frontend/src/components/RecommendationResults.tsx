import { RecommendationResponse, EquipmentRecommendation } from '@/types';

interface RecommendationResultsProps {
  results: RecommendationResponse;
  onBack: () => void;
}

export default function RecommendationResults({ results, onBack }: Readonly<RecommendationResultsProps>) {
  const { profile, recommendations, sizeInfo } = results;
  const bestSet = recommendations[0];
  const bestScore = bestSet
    ? ((bestSet.snowboard.matchScore + bestSet.boot.matchScore + bestSet.binding.matchScore) / 3).toFixed(0)
    : '0';

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-gray-300 hover:border-cyan-500/40 hover:text-white transition-all"
      >
        <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Formu Düzenle
      </button>

      {/* Hero Summary */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-blue-950/40 p-4 sm:p-6 md:p-8 shadow-2xl shadow-cyan-900/20 transition-shadow duration-300 hover:shadow-cyan-800/30">
        <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:gap-8">
          <div className="flex flex-wrap items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-cyan-300 text-sm uppercase tracking-wider font-semibold">Kisisel Oneri Ozeti</p>
              <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold text-white">Sana En Uygun Setup Hazir</h2>
              <p className="mt-2 text-slate-300 text-sm md:text-base">
                Profil: {profile.heightCm} cm • {profile.weightKg} kg • EU {profile.bootSize}
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/70 px-4 sm:px-5 py-3 sm:py-4 text-center min-w-32 sm:min-w-36 backdrop-blur-sm">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Ortalama Uyum</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-cyan-300">%{bestScore}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <MetricCard title="Board Uzunlugu" value={`${sizeInfo.recommendedBoardLength}`} hint={`${sizeInfo.minBoardLength}-${sizeInfo.maxBoardLength} cm`} accent="text-cyan-300" />
            <MetricCard title="Min. Genislik" value={`${sizeInfo.recommendedWaistWidth}`} hint="Waist (mm)" accent="text-violet-300" />
            <MetricCard title="Bot Numarasi" value={`${profile.bootSize}`} hint="EU" accent="text-emerald-300" />
            <MetricCard title="Binding Bedeni" value={sizeInfo.bindingSize} hint="Onerilen" accent="text-orange-300" />
          </div>

          <p className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-3 sm:p-4 text-sm md:text-base text-slate-200">
            {sizeInfo.explanation}
          </p>
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          Önerilen Ekipman Setleri
        </h2>
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={`${rec.totalPrice}-${rec.snowboard.spec.id}-${rec.boot.spec.id}-${rec.binding.spec.id}`}
              recommendation={rec}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Tips */}
      {recommendations[0]?.tips && recommendations[0].tips.length > 0 && (
        <section className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            İpuçları
          </h2>
          <ul className="space-y-2">
            {recommendations[0].tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-slate-200">
                <svg className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* New Search Button */}
      <button
        onClick={onBack}
        className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all"
      >
        Yeni Arama Yap
      </button>
    </div>
  );
}

function MetricCard({ title, value, hint, accent }: Readonly<{ title: string; value: string; hint: string; accent: string }>) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-3 sm:p-4 text-center">
      <div className={`text-2xl sm:text-3xl font-black ${accent}`}>{value}</div>
      <div className="mt-1 text-xs sm:text-sm text-slate-300">{title}</div>
      <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{hint}</div>
    </div>
  );
}

function RecommendationCard({ recommendation, index }: Readonly<{ recommendation: EquipmentRecommendation; index: number }>) {
  const { snowboard, boot, binding, totalPrice } = recommendation;
  const score = ((snowboard.matchScore + boot.matchScore + binding.matchScore) / 3).toFixed(0);

  return (
    <div className="group rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/80 shadow-xl shadow-slate-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-cyan-900/20">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/70">
        <div className="flex items-center gap-3">
          <span className="bg-cyan-500 text-slate-950 w-9 h-9 rounded-full flex items-center justify-center font-black shadow-lg shadow-cyan-900/40">
            {index + 1}
          </span>
          <div>
            <div className="text-white font-semibold">Öneri Seti {index + 1}</div>
            <div className="text-xs text-slate-400">Genel uyum: %{score}</div>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <div className="text-xl sm:text-2xl font-black text-emerald-300">{totalPrice.toLocaleString('tr-TR')} ₺</div>
          <div className="text-xs text-slate-400">Toplam Fiyat</div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="p-4 sm:p-6 grid md:grid-cols-3 gap-4 sm:gap-5">
        {/* Snowboard */}
        <EquipmentItem
          type="Snowboard"
          brand={snowboard.spec.brand}
          model={snowboard.spec.model}
          price={snowboard.spec.price}
          imageUrl={snowboard.spec.imageUrl}
          matchScore={snowboard.matchScore}
          details={[
            `${snowboard.spec.lengthCm} cm`,
            snowboard.spec.profile,
            `Flex: ${snowboard.spec.flex}`,
          ]}
          reasons={snowboard.reasons}
        />

        {/* Boot */}
        <EquipmentItem
          type="Bot"
          brand={boot.spec.brand}
          model={boot.spec.model}
          price={boot.spec.price}
          imageUrl={boot.spec.imageUrl}
          matchScore={boot.matchScore}
          details={[
            `Numara: ${boot.recommendedSize}`,
            boot.spec.lacingSystem,
            `Flex: ${boot.spec.flexRating}/10`,
          ]}
          reasons={boot.reasons}
        />

        {/* Binding */}
        <EquipmentItem
          type="Binding"
          brand={binding.spec.brand}
          model={binding.spec.model}
          price={binding.spec.price}
          imageUrl={binding.spec.imageUrl}
          matchScore={binding.matchScore}
          details={[
            `Beden: ${binding.recommendedSize}`,
            `Flex: ${binding.spec.flexRating}/10`,
          ]}
          reasons={binding.reasons}
        />
      </div>
    </div>
  );
}

interface EquipmentItemProps {
  type: string;
  brand: string;
  model: string;
  price: number;
  imageUrl?: string;
  matchScore: number;
  details: string[];
  reasons: string[];
}

function EquipmentItem({ type, brand, model, price, imageUrl, matchScore, details, reasons }: Readonly<EquipmentItemProps>) {
  let scoreColor = 'text-orange-300';
  let badgeBg = 'bg-orange-500/15 border-orange-400/40';

  if (matchScore >= 80) {
    scoreColor = 'text-emerald-300';
    badgeBg = 'bg-emerald-500/15 border-emerald-400/40';
  } else if (matchScore >= 60) {
    scoreColor = 'text-amber-300';
    badgeBg = 'bg-amber-500/15 border-amber-400/40';
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-700/70 bg-slate-800/40 p-3.5 sm:p-4 transition-all duration-300 hover:border-cyan-500/35 hover:bg-slate-800/70">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300 tracking-wide">{type}</span>
        <span className={`text-sm font-bold rounded-full border px-2.5 py-1 ${scoreColor} ${badgeBg}`}>{matchScore.toFixed(0)}% uyum</span>
      </div>

      {/* Product Image */}
      {imageUrl && (
        <div className="relative h-28 sm:h-32 bg-slate-900 rounded-lg overflow-hidden border border-slate-700/70">
          <img
            src={imageUrl}
            alt={`${brand} ${model}`}
            className="w-full h-full object-contain p-2"
          />
        </div>
      )}
      
      <div>
        <div className="text-base sm:text-lg font-bold text-white">{brand}</div>
        <div className="text-sm sm:text-base text-cyan-300">{model}</div>
      </div>

      <div className="space-y-1">
        {details.map((detail) => (
          <div key={`${type}-${brand}-${model}-${detail}`} className="text-sm text-slate-300">{detail}</div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-700/80">
        <div className="text-lg font-black text-white">{price.toLocaleString('tr-TR')} ₺</div>
        <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-0.5">Tahmini Perakende</div>
      </div>

      {reasons.length > 0 && (
        <ul className="text-xs text-slate-400 space-y-1.5">
          {reasons.slice(0, 2).map((reason) => (
            <li key={reason} className="flex items-start gap-1.5">
              <span className="text-cyan-300">•</span>
              {reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
