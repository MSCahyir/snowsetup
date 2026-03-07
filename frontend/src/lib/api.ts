import { Product, ProductFilter, ProductListResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const productApi = {
  // Get all products with optional filters
  getProducts: async (filter?: ProductFilter): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    
    if (filter?.category) params.append('category', filter.category);
    if (filter?.brand) params.append('brand', filter.brand);
    if (filter?.minPrice !== undefined) params.append('minPrice', filter.minPrice.toString());
    if (filter?.maxPrice !== undefined) params.append('maxPrice', filter.maxPrice.toString());
    if (filter?.inStock !== undefined) params.append('inStock', filter.inStock.toString());
    if (filter?.featured !== undefined) params.append('featured', filter.featured.toString());
    if (filter?.search) params.append('search', filter.search);
    if (filter?.sortBy) params.append('sortBy', filter.sortBy);
    if (filter?.sortDesc !== undefined) params.append('sortDesc', filter.sortDesc.toString());
    if (filter?.page !== undefined) params.append('page', filter.page.toString());
    if (filter?.pageSize !== undefined) params.append('pageSize', filter.pageSize.toString());

    const queryString = params.toString();
    const endpoint = `/api/products${queryString ? '?' + queryString : ''}`;
    
    return fetchApi<ProductListResponse>(endpoint);
  },

  // Get a single product by ID
  getProductById: async (id: string): Promise<Product> => {
    return fetchApi<Product>(`/api/products/${id}`);
  },

  // Get featured products
  getFeaturedProducts: async (limit = 4): Promise<Product[]> => {
    return fetchApi<Product[]>(`/api/products/featured?limit=${limit}`);
  },

  // Get all brands
  getBrands: async (): Promise<string[]> => {
    return fetchApi<string[]>('/api/products/brands');
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    return fetchApi<string[]>('/api/products/categories');
  },
};

export default productApi;
