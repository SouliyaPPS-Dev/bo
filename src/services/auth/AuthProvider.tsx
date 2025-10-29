import { PropsWithChildren, useMemo, useState } from 'react';
import * as authApi from '@/services/api/auth';
import type { AuthUser, RegisterRequest, SignInRequest } from '@/services/api/auth';
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
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('authUser');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      localStorage.removeItem('authUser');
      return null;
    }
  });

  const persistSession = (nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('accessToken', nextToken);
    localStorage.setItem('authUser', JSON.stringify(nextUser));
    // Set isAuthenticated flag for backward compatibility
    localStorage.setItem('isAuthenticated', 'true');
    // Clean up any legacy key
    localStorage.removeItem('auth_token');
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('isAuthenticated');
  };

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!token,
      token,
      user,
      signIn: async (credentials: SignInRequest) => {
        const res = await authApi.signIn(credentials);
        persistSession(res.token, res.user);
      },
      register: async (payload: RegisterRequest) => {
        const res = await authApi.register(payload);
        return res.user;
      },
      signOut: () => {
        clearSession();
        // Redirect to signin page
        window.location.href = '/signin';
      },
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
