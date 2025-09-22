import { PropsWithChildren, useMemo, useState } from 'react';
import * as authApi from '@/services/api/auth';
import { AuthContext, AuthContextType } from './context';

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => {
    // Prefer the new key; fall back to legacy and migrate if present
    const newToken = localStorage.getItem('accessToken');
    if (newToken) return newToken;
    const legacy = localStorage.getItem('auth_token');
    if (legacy) {
      localStorage.setItem('accessToken', legacy);
    }
    return legacy;
  });

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!token,
      token,
      signIn: async ({ email, password }) => {
        const res = await authApi.signIn({ email, password });
        setToken(res.token);
        localStorage.setItem('accessToken', res.token);
        // Set isAuthenticated flag for backward compatibility
        localStorage.setItem('isAuthenticated', 'true');
        // Clean up any legacy key
        localStorage.removeItem('auth_token');
      },
      signOut: () => {
        setToken(null);
        // Clear all localStorage data on logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isAuthenticated');
        // Redirect to signin page
        window.location.href = '/signin';
      },
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
