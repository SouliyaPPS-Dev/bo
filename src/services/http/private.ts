import {
  httpDelete as _delete,
  httpGet as _get,
  httpPatch as _patch,
  httpPost as _post,
  httpPut as _put,
} from './public';

export function withToken(token: string | null) {
  const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    get: <T>(url: string, init?: RequestInit) => {
      return _get<T>(url, mergeInit(init, authHeaders));
    },
    post: <T>(url: string, body?: unknown, init?: RequestInit) => {
      return _post<T>(url, body, mergeInit(init, authHeaders));
    },
    put: <T>(url: string, body?: unknown, init?: RequestInit) => {
      return _put<T>(url, body, mergeInit(init, authHeaders));
    },
    patch: <T>(url: string, body?: unknown, init?: RequestInit) => {
      return _patch<T>(url, body, mergeInit(init, authHeaders));
    },
    delete: <T>(url: string, body?: unknown, init?: RequestInit) => {
      return _delete<T>(url, body, mergeInit(init, authHeaders));
    },
  };
}

function mergeInit(init: RequestInit | undefined, authHeaders: HeadersInit): RequestInit {
  const headers = new Headers(init?.headers);
  const auth = new Headers(authHeaders);

  auth.forEach((value, key) => {
    headers.set(key, value);
  });

  return {
    ...init,
    headers,
  };
}
