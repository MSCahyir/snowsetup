'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UserProfile, RidingStyle, ExperienceLevel, Gender, RecommendationResponse } from '@/types';
import { getRecommendations } from '@/lib/calculatorApi';
import RecommendationResults from './RecommendationResults';

const ridingStyleKeys: { value: RidingStyle; labelKey: string; descKey: string }[] = [
  { value: 'AllMountain', labelKey: 'styles.allMountain', descKey: 'styleDescriptions.allMountain' },
  { value: 'Freestyle', labelKey: 'styles.freestyle', descKey: 'styleDescriptions.freestyle' },
  { value: 'Freeride', labelKey: 'styles.freeride', descKey: 'styleDescriptions.freeride' },
  { value: 'Powder', labelKey: 'styles.powder', descKey: 'styleDescriptions.powder' },
  { value: 'Carving', labelKey: 'styles.carving', descKey: 'styleDescriptions.carving' },
];

const experienceLevelKeys: { value: ExperienceLevel; labelKey: string; descKey: string }[] = [
  { value: 'Beginner', labelKey: 'experiences.beginner', descKey: 'experienceDescriptions.beginner' },
  { value: 'Intermediate', labelKey: 'experiences.intermediate', descKey: 'experienceDescriptions.intermediate' },
  { value: 'Advanced', labelKey: 'experiences.advanced', descKey: 'experienceDescriptions.advanced' },
  { value: 'Expert', labelKey: 'experiences.expert', descKey: 'experienceDescriptions.expert' },
];

const genderKeys: { value: Gender; labelKey: string }[] = [
  { value: 'Male', labelKey: 'male' },
  { value: 'Female', labelKey: 'female' },
];

export default function ProfileForm() {
  const t = useTranslations('form');
  const [formData, setFormData] = useState<UserProfile>({
    heightCm: 175,
    weightKg: 75,
    bootSize: 42,
    gender: 'Male',
    experience: 'Intermediate',
    preferredStyle: 'AllMountain',
  });
  const [maxBudget, setMaxBudget] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<RecommendationResponse | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await getRecommendations({
        profile: formData,
        maxBudget: maxBudget,
      });
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (results) {
    return (
      <RecommendationResults 
        results={results} 
        onBack={() => setResults(null)} 
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <section aria-labelledby="personal-info">
        <h2 id="personal-info" className="text-xl font-semibold text-white mb-4">
          {t('physicalInfo')}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-1">
              {t('height')} (cm)
            </label>
            <input
              type="number"
              id="height"
              min={100}
              max={220}
              value={formData.heightCm}
              onChange={(e) => handleInputChange('heightCm', Number.parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
              {t('weight')} (kg)
            </label>
            <input
              type="number"
              id="weight"
              min={30}
              max={150}
              value={formData.weightKg}
              onChange={(e) => handleInputChange('weightKg', Number.parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="bootSize" className="block text-sm font-medium text-gray-300 mb-1">
              {t('bootSize')}
            </label>
            <input
              type="number"
              id="bootSize"
              min={35}
              max={50}
              step={0.5}
              value={formData.bootSize}
              onChange={(e) => handleInputChange('bootSize', Number.parseFloat(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
              {t('gender')}
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value as Gender)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {genderKeys.map((g) => (
                <option key={g.value} value={g.value}>
                  {t(g.labelKey)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Experience Level */}
      <section aria-labelledby="experience-level">
        <h2 id="experience-level" className="text-xl font-semibold text-white mb-4">
          {t('experienceLevel')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {experienceLevelKeys.map((level) => (
            <label
              key={level.value}
              className={`relative flex cursor-pointer rounded-lg border p-4 transition-all ${
                formData.experience === level.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="experience"
                value={level.value}
                checked={formData.experience === level.value}
                onChange={(e) => handleInputChange('experience', e.target.value as ExperienceLevel)}
                className="sr-only"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium">{t(level.labelKey)}</span>
                <span className="text-gray-400 text-sm">{t(level.descKey)}</span>
              </div>
              {formData.experience === level.value && (
                <div className="absolute top-4 right-4">
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Riding Style */}
      <section aria-labelledby="riding-style">
        <h2 id="riding-style" className="text-xl font-semibold text-white mb-4">
          {t('ridingStyle')}
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {ridingStyleKeys.map((style) => (
            <label
              key={style.value}
              className={`relative flex cursor-pointer rounded-lg border p-4 transition-all ${
                formData.preferredStyle === style.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="style"
                value={style.value}
                checked={formData.preferredStyle === style.value}
                onChange={(e) => handleInputChange('preferredStyle', e.target.value as RidingStyle)}
                className="sr-only"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium">{t(style.labelKey)}</span>
                <span className="text-gray-400 text-sm">{t(style.descKey)}</span>
              </div>
              {formData.preferredStyle === style.value && (
                <div className="absolute top-4 right-4">
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Budget (Optional) */}
      <section aria-labelledby="budget">
        <h2 id="budget" className="text-xl font-semibold text-white mb-4">
          {t('budget')}
        </h2>
        <div>
          <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-300 mb-1">
            {t('maxBudget')} ($)
          </label>
          <input
            type="number"
            id="maxBudget"
            min={0}
            step={100}
            value={maxBudget || ''}
            onChange={(e) => setMaxBudget(e.target.value ? Number.parseInt(e.target.value, 10) : undefined)}
            placeholder={t('budgetPlaceholder')}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          />
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t('loading')}
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            {t('getRecommendations')}
          </>
        )}
      </button>
    </form>
  );
}
