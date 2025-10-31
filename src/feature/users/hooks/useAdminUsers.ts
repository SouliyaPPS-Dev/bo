import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAuth } from '@/services/auth';
import {
  listAdminUsers,
  USERS_QUERY_KEYS,
  type AdminUserListParams,
  type User,
} from '@/services/api/users';

export function useAdminUsers(params?: AdminUserListParams) {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const queryKey = useMemo(
    () => USERS_QUERY_KEYS.ADMIN_LIST(auth.token, params),
    [auth.token, params]
  );

  const query = useQuery<User[]>({
    queryKey,
    queryFn: () => listAdminUsers(auth.token, params),
    enabled: !!auth.token,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  return {
    ...query,
    invalidate,
  };
}
