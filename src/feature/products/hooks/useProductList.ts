import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/services/auth';
import * as productsApi from '@/services/api/products';

export function useProductList() {
  const auth = useAuth();
  const token = auth.token ?? null;

  const query = useQuery<productsApi.Product[], productsApi.ApiError>({
    queryKey: productsApi.PRODUCTS_QUERY_KEYS.LIST(token),
    queryFn: () => productsApi.list(token),
    enabled: Boolean(token),
  });

  const products = useMemo(() => query.data ?? [], [query.data]);

  return {
    products,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error ?? null,
    refetch: query.refetch,
  };
}
