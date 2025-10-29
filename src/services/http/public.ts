import { resolveApiUrl } from './config';

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function buildHeaders(
  initHeaders: HeadersInit | undefined,
  enforceJson: boolean
): Headers {
  const headers = new Headers(initHeaders);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  if (enforceJson && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return headers;
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const contentLength = response.headers.get('content-length');
  if (contentLength === '0') return undefined;

  const text = await response.text();
  if (!text) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text);
    } catch {
      // Fall back to returning the raw text if JSON parsing fails
    }
  }

  return text;
}

function extractErrorMessage(response: Response, body: unknown): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    for (const key of ['message', 'error', 'detail']) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) return value;
    }
  }

  if (typeof body === 'string' && body.trim()) return body;
  return `Request failed with status ${response.status}`;
}

async function request<T>(
  url: string,
  init: RequestInit & { method: HttpVerb }
): Promise<T> {
  const response = await fetch(resolveApiUrl(url), init);
  const body = await parseBody(response);

  if (!response.ok) {
    throw new Error(extractErrorMessage(response, body));
  }

  return body as T;
}

export function httpGet<T>(url: string, init?: RequestInit): Promise<T> {
  return request<T>(url, {
    ...(init ?? {}),
    method: 'GET',
  });
}

export function httpPost<T>(
  url: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const headers = buildHeaders(init?.headers, true);
  return request<T>(url, {
    ...(init ?? {}),
    method: 'POST',
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

export function httpPut<T>(
  url: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const headers = buildHeaders(init?.headers, true);
  return request<T>(url, {
    ...(init ?? {}),
    method: 'PUT',
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

export function httpPatch<T>(
  url: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const headers = buildHeaders(init?.headers, true);
  return request<T>(url, {
    ...(init ?? {}),
    method: 'PATCH',
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

export function httpDelete<T>(
  url: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const headers = buildHeaders(init?.headers, Boolean(body));
  return request<T>(url, {
    ...(init ?? {}),
    method: 'DELETE',
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
}
