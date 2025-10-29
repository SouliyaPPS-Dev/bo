import { withToken } from '@/services/http/private';

// Query Keys Management - Following TanStack Query rules
export const PRODUCTS_QUERY_KEYS = {
  ALL: ['products'] as const,
  LIST: (token: string | null) => ['products', 'list', token] as const,
  DETAIL: (token: string | null, id: string) => ['products', 'detail', token, id] as const,
} as const;

// API Error Type - Following documented error structure
export interface ApiError {
  code: string;
  message: string;
  detail?: string;
  status: number;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type ProductPayload = {
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
};

export type ProductListResponse = {
  items: Product[];
};

export function list(token: string | null): Promise<Product[]> {
  return withToken(token)
    .get<ProductListResponse>('/products')
    .then((res) => res.items);
}

export function getById(token: string | null, id: string): Promise<Product> {
  return withToken(token).get<Product>(`/products/${id}`);
}

export function create(
  token: string | null,
  payload: ProductPayload
): Promise<Product> {
  return withToken(token).post<Product>('/products', payload);
}

export function update(
  token: string | null,
  id: string,
  payload: ProductPayload
): Promise<Product> {
  return withToken(token).put<Product>(`/products/${id}`, payload);
}

export function patch(
  token: string | null,
  id: string,
  payload: Partial<ProductPayload>
): Promise<Product> {
  return withToken(token).patch<Product>(`/products/${id}`, payload);
}

export function remove(token: string | null, id: string): Promise<void> {
  return withToken(token).delete<void>(`/products/${id}`);
}

