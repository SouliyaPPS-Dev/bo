const DEFAULT_BASE_URL = 'http://localhost:8080';

const rawBaseUrl =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
    ? String(import.meta.env.VITE_API_BASE_URL).trim()
    : DEFAULT_BASE_URL;

const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '');

export const API_BASE_URL = normalizedBaseUrl || DEFAULT_BASE_URL;

export function resolveApiUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${API_BASE_URL}${path}`;
}

