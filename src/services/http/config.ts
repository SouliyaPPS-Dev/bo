declare const __APP_API_BASE_URL__: string | undefined;

const REMOTE_DEFAULT_BASE_URL = 'https://api-test-production-2d7d.up.railway.app';

const rawBaseUrl =
  (typeof __APP_API_BASE_URL__ === 'string' && __APP_API_BASE_URL__.trim()) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
    ? String(import.meta.env.VITE_API_BASE_URL).trim()
    : '') ||
  REMOTE_DEFAULT_BASE_URL;

const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '');

export const API_BASE_URL = normalizedBaseUrl || REMOTE_DEFAULT_BASE_URL;

export const isLocalApiBase = /localhost|127\.0\.0\.1/i.test(API_BASE_URL);

export function resolveApiUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${API_BASE_URL}${path}`;
}
