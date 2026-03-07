// Product types matching backend models

export type ProductCategory = 
  | 'Snowboard' 
  | 'Boot' 
  | 'Binding' 
  | 'Helmet' 
  | 'Goggle' 
  | 'Jacket' 
  | 'Pants' 
  | 'Gloves' 
  | 'Accessory';

export interface ProductSpecs {
  // Snowboard specs
  length?: string;
  width?: string;
  profile?: string;
  flex?: string;
  shape?: string;
  terrain?: string;
  
  // Boot specs
  bootSize?: string;
  lacingSystem?: string;
  liner?: string;
  
  // Binding specs
  bindingSize?: string;
  baseplateType?: string;
  response?: string;
  
  // General
  material?: string;
  weight?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number | null;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  descriptionTr?: string;
  features: string[];
  featuresTr?: string[];
  imageUrl: string;
  galleryImages?: string[];
  affiliateUrl?: string | null;
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  specs?: ProductSpecs;
  createdAt: string;
}

export interface ProductFilter {
  category?: ProductCategory;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: 'price' | 'rating' | 'name' | 'newest';
  sortDesc?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availableBrands: string[];
}
