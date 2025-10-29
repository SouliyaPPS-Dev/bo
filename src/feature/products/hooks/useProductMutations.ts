import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/services/auth';
import * as productsApi from '@/services/api/products';
import type { Product, ProductPayload } from '@/services/api/products';

type DeleteContext = {
  previousProducts: Product[] | undefined;
};

const ensureToken = (token: string | null) => {
  if (!token) {
    throw new Error('missingAuthToken');
  }
};

export function useProductMutations() {
  const auth = useAuth();
  const token = auth.token ?? null;
  const queryClient = useQueryClient();

  const invalidateProducts = () => {
    void queryClient.invalidateQueries({
      queryKey: productsApi.PRODUCTS_QUERY_KEYS.ALL,
    });
  };

  const listQueryKey = useMemo(
    () => productsApi.PRODUCTS_QUERY_KEYS.LIST(token),
    [token]
  );

  const createMutation = useMutation<
    productsApi.Product,
    productsApi.ApiError,
    ProductPayload
  >({
    mutationFn: async (payload: ProductPayload) => {
      ensureToken(token);
      return productsApi.create(token, payload);
    },
    onSuccess: () => {
      invalidateProducts();
    },
  });

  const updateMutation = useMutation<
    productsApi.Product,
    productsApi.ApiError,
    { id: string; payload: ProductPayload }
  >({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ProductPayload;
    }) => {
      ensureToken(token);
      return productsApi.update(token, id, payload);
    },
    onSuccess: () => {
      invalidateProducts();
    },
  });

  const deleteMutation = useMutation<void, productsApi.ApiError, string, DeleteContext>({
    mutationFn: async (id: string) => {
      ensureToken(token);
      await productsApi.remove(token, id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: listQueryKey });
      const previousProducts = queryClient.getQueryData<Product[]>(listQueryKey);
      queryClient.setQueryData<Product[] | undefined>(listQueryKey, (current) =>
        current?.filter((product) => product.id !== id)
      );
      return { previousProducts };
    },
    onError: (_error, _id, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(listQueryKey, context.previousProducts);
      }
    },
    onSettled: () => {
      invalidateProducts();
    },
  });

  return {
    createProduct: createMutation.mutateAsync,
    updateProduct: (id: string, payload: ProductPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    deleteProduct: deleteMutation.mutateAsync,
    createStatus: {
      isPending: createMutation.isPending,
      error: createMutation.error ?? null,
    },
    updateStatus: {
      isPending: updateMutation.isPending,
      error: updateMutation.error ?? null,
    },
    deleteStatus: {
      isPending: deleteMutation.isPending,
      error: deleteMutation.error ?? null,
    },
  };
}
