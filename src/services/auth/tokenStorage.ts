const ACCESS_TOKEN_KEY = 'accessToken';
const LEGACY_ACCESS_TOKEN_KEY = 'auth_token';
const AUTH_FLAG_KEY = 'isAuthenticated';

export type AccessTokenListener = (token: string | null) => void;

const listeners = new Set<AccessTokenListener>();

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors (e.g., quota exceeded)
  }
}

function safeRemoveItem(key: string) {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

export function getStoredAccessToken(): string | null {
  const token = safeGetItem(ACCESS_TOKEN_KEY);
  if (token) return token;

  const legacy = safeGetItem(LEGACY_ACCESS_TOKEN_KEY);
  if (legacy) {
    safeSetItem(ACCESS_TOKEN_KEY, legacy);
    safeRemoveItem(LEGACY_ACCESS_TOKEN_KEY);
    return legacy;
  }

  return null;
}

export function setAccessToken(token: string) {
  safeSetItem(ACCESS_TOKEN_KEY, token);
  safeSetItem(AUTH_FLAG_KEY, 'true');
  listeners.forEach((listener) => {
    try {
      listener(token);
    } catch {
      // Swallow listener errors to avoid breaking other subscribers
    }
  });
}

export function clearAccessToken() {
  safeRemoveItem(ACCESS_TOKEN_KEY);
  safeRemoveItem(AUTH_FLAG_KEY);
  listeners.forEach((listener) => {
    try {
      listener(null);
    } catch {
      // Swallow listener errors to avoid breaking other subscribers
    }
  });
}

export function subscribeToAccessToken(listener: AccessTokenListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
