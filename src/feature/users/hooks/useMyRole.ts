import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/services/auth';
import {
  getMyRole,
  updateMyRole,
  USERS_QUERY_KEYS,
  type MeRoleResponse,
  type UpdateRolePayload,
} from '@/services/api/users';

export function useMyRole() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: USERS_QUERY_KEYS.ME_ROLE(auth.token),
    queryFn: () => getMyRole(auth.token),
    enabled: !!auth.token,
  });

  const mutation = useMutation({
    mutationFn: (payload: UpdateRolePayload) =>
      updateMyRole(auth.token, payload),
    onSuccess: (data) => {
      queryClient.setQueryData<MeRoleResponse>(
        USERS_QUERY_KEYS.ME_ROLE(auth.token),
        data
      );
    },
  });

  return {
    ...query,
    updateRole: mutation.mutateAsync,
    updateStatus: mutation,
  };
}
