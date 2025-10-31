import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/services/auth';
import {
  createAdminUser,
  deleteAdminUser,
  updateAdminUser,
  updateAdminUserRole,
  resetAdminUserRole,
  USERS_QUERY_KEYS,
  type CreateAdminUserPayload,
  type UpdateAdminUserPayload,
  type UpdateRolePayload,
} from '@/services/api/users';

export function useAdminUserMutations() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const invalidateList = () =>
    void queryClient.invalidateQueries({
      queryKey: USERS_QUERY_KEYS.ADMIN_ROOT,
    });

  const invalidateDetail = (id: string) => {
    void queryClient.invalidateQueries({
      queryKey: USERS_QUERY_KEYS.ADMIN_DETAIL(auth.token, id),
    });
    void queryClient.invalidateQueries({
      queryKey: USERS_QUERY_KEYS.ADMIN_ROLE(auth.token, id),
    });
  };

  const createMutation = useMutation({
    mutationFn: (payload: CreateAdminUserPayload) =>
      createAdminUser(auth.token, payload),
    onSuccess: invalidateList,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAdminUserPayload;
    }) => updateAdminUser(auth.token, id, payload),
    onSuccess: (_data, variables) => {
      invalidateList();
      invalidateDetail(variables.id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminUser(auth.token, id),
    onSuccess: (_data, id) => {
      invalidateList();
      invalidateDetail(id);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateRolePayload;
    }) => updateAdminUserRole(auth.token, id, payload),
    onSuccess: (_data, variables) => {
      invalidateList();
      invalidateDetail(variables.id);
    },
  });

  const resetRoleMutation = useMutation({
    mutationFn: (id: string) => resetAdminUserRole(auth.token, id),
    onSuccess: (_data, id) => {
      invalidateList();
      invalidateDetail(id);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    updateRoleMutation,
    resetRoleMutation,
  };
}
