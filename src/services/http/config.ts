declare const __APP_API_BASE_URL__: string | undefined;

const FALLBACK_BASE_URL = 'http://localhost:8080';

const rawBaseUrl =
  (typeof __APP_API_BASE_URL__ === 'string' && __APP_API_BASE_URL__.trim()) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
    ? String(import.meta.env.VITE_API_BASE_URL).trim()
    : '') ||
  FALLBACK_BASE_URL;

const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '');

export const API_BASE_URL = normalizedBaseUrl || FALLBACK_BASE_URL;

export const isLocalApiBase = /localhost|127\.0\.0\.1/i.test(API_BASE_URL);

export function resolveApiUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${API_BASE_URL}${path}`;
}
