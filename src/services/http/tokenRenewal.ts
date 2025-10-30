import { resolveApiUrl } from './config';
import {
  clearAccessToken,
  getStoredAccessToken,
  setAccessToken,
} from '@/services/auth/tokenStorage';

let renewPromise: Promise<string | null> | null = null;

async function performRenewRequest(currentToken: string): Promise<string | null> {
  try {
    const response = await fetch(resolveApiUrl('/auth/renew'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (!response.ok) {
      clearAccessToken();
      return null;
    }

    let payload: unknown;
    const text = await response.text();
    if (text) {
      try {
        payload = JSON.parse(text) as unknown;
      } catch {
        payload = undefined;
      }
    }

    const token =
      typeof payload === 'object' && payload !== null && 'token' in payload
        ? (payload as Record<string, unknown>).token
        : undefined;

    if (typeof token === 'string' && token) {
      setAccessToken(token);
      return token;
    }

    clearAccessToken();
    return null;
  } catch {
    clearAccessToken();
    return null;
  }
}

export async function renewAccessToken(): Promise<string | null> {
  if (renewPromise) return renewPromise;

  const currentToken = getStoredAccessToken();
  if (!currentToken) return null;

  renewPromise = performRenewRequest(currentToken).finally(() => {
    renewPromise = null;
  });

  return renewPromise;
}
