import {
  RecommendationRequest,
  RecommendationResponse,
  SizeCalculation,
  UserProfile,
  ErrorResponse,
  StyleOption,
  LevelOption,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiError extends Error {
  constructor(public errorResponse: ErrorResponse) {
    super(errorResponse.message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new ApiError(error);
  }
  return response.json();
}

export async function getRecommendations(
  request: RecommendationRequest
): Promise<RecommendationResponse> {
  const response = await fetch(`${API_URL}/api/recommendation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  return handleResponse<RecommendationResponse>(response);
}

export async function calculateSize(
  profile: UserProfile
): Promise<SizeCalculation> {
  const response = await fetch(`${API_URL}/api/recommendation/size`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  return handleResponse<SizeCalculation>(response);
}

export async function getStyles(): Promise<StyleOption[]> {
  const response = await fetch(`${API_URL}/api/recommendation/styles`);
  return handleResponse<StyleOption[]>(response);
}

export async function getLevels(): Promise<LevelOption[]> {
  const response = await fetch(`${API_URL}/api/recommendation/levels`);
  return handleResponse<LevelOption[]>(response);
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

export { ApiError };
