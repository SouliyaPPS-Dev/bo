import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/services/auth';
import {
  changePassword,
  type ChangePasswordPayload,
} from '@/services/api/users';

export function useChangePassword() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      changePassword(auth.token, payload),
  });
}
