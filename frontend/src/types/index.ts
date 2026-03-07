// Enums
export type RidingStyle = 'AllMountain' | 'Freestyle' | 'Freeride' | 'Powder' | 'Carving';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type BootFlex = 'Soft' | 'Medium' | 'Stiff';
export type Gender = 'Male' | 'Female' | 'Unisex';

// User Profile
export interface UserProfile {
  heightCm: number;
  weightKg: number;
  bootSize: number;
  gender: Gender;
  experience: ExperienceLevel;
  preferredStyle: RidingStyle;
  age?: number;
}

// Request/Response
export interface RecommendationRequest {
  profile: UserProfile;
  maxBudget?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

// Equipment Specs
export interface SnowboardSpec {
  id: string;
  brand: string;
  model: string;
  lengthCm: number;
  waistWidthMm: number;
  suitableStyles: RidingStyle[];
  suitableLevels: ExperienceLevel[];
  gender: Gender;
  profile: string;
  flex: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface BootSpec {
  id: string;
  brand: string;
  model: string;
  availableSizes: number[];
  flex: BootFlex;
  flexRating: number;
  suitableStyles: RidingStyle[];
  suitableLevels: ExperienceLevel[];
  gender: Gender;
  lacingSystem: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface BindingSpec {
  id: string;
  brand: string;
  model: string;
  availableSizes: string[];
  flex: string;
  flexRating: number;
  suitableStyles: RidingStyle[];
  suitableLevels: ExperienceLevel[];
  gender: Gender;
  price: number;
  imageUrl: string;
  description: string;
}

// Recommendations
export interface SnowboardRecommendation {
  spec: SnowboardSpec;
  recommendedLength: number;
  minLength: number;
  maxLength: number;
  sizeExplanation: string;
  matchScore: number;
  reasons: string[];
}

export interface BootRecommendation {
  spec: BootSpec;
  recommendedSize: number;
  sizeExplanation: string;
  matchScore: number;
  reasons: string[];
}

export interface BindingRecommendation {
  spec: BindingSpec;
  recommendedSize: string;
  sizeExplanation: string;
  matchScore: number;
  reasons: string[];
}

export interface EquipmentRecommendation {
  snowboard: SnowboardRecommendation;
  boot: BootRecommendation;
  binding: BindingRecommendation;
  totalPrice: number;
  tips: string[];
}

export interface SizeCalculation {
  recommendedBoardLength: number;
  minBoardLength: number;
  maxBoardLength: number;
  recommendedWaistWidth: number;
  bindingSize: string;
  explanation: string;
}

export interface RecommendationResponse {
  success: boolean;
  profile: UserProfile;
  recommendations: EquipmentRecommendation[];
  sizeInfo: SizeCalculation;
}

// Option types for dropdowns
export interface StyleOption {
  value: RidingStyle;
  label: string;
  description: string;
}

export interface LevelOption {
  value: ExperienceLevel;
  label: string;
  description: string;
}
