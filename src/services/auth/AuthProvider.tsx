import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import * as authApi from '@/services/api/auth';
import type {
  AuthUser,
  RegisterRequest,
  SignInRequest,
} from '@/services/api/auth';
import type { AuthContextType, AuthRouterContext } from './context';
import {
  clearAccessToken,
  getStoredAccessToken,
  setAccessToken,
  subscribeToAccessToken,
} from './tokenStorage';

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(() => getStoredAccessToken());
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
    setAccessToken(nextToken);
    localStorage.setItem('authUser', JSON.stringify(nextUser));
    // Clean up any legacy key
    localStorage.removeItem('auth_token');
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    clearAccessToken();
    localStorage.removeItem('authUser');
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

  useEffect(() => {
    const unsubscribe = subscribeToAccessToken((nextToken) => {
      setToken((prev) => (prev === nextToken ? prev : nextToken));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const nextContext: AuthRouterContext = {
      ...(router.options.context ?? {}),
      auth: value,
    };

    router.update({
      context: nextContext,
    });

    const matchIds = new Set<string>();

    router.state.matches.forEach((match) => matchIds.add(match.id));
    router.state.pendingMatches?.forEach((match) => matchIds.add(match.id));
    router.state.cachedMatches.forEach((match) => matchIds.add(match.id));

    matchIds.forEach((matchId) => {
      router.updateMatch(matchId, (prevMatch) => {
        const prevContext = (prevMatch.context as Record<string, unknown> | undefined) ?? {};
        const previousAuth = (prevContext as Partial<AuthRouterContext>).auth;

        if (previousAuth === value) {
          return prevMatch;
        }

        return {
          ...prevMatch,
          context: {
            ...prevContext,
            auth: value,
          } satisfies AuthRouterContext,
        };
      });
    });
  }, [router, value]);

  return <>{children}</>;
}
