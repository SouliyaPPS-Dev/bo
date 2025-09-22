import { httpGet as _get, httpPost as _post } from './public'

export function withToken(token: string | null) {
  const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

  return {
    get: <T>(url: string, init?: RequestInit) => {
      const mergedInit: RequestInit = {
        ...init,
        headers: {
          ...Object.fromEntries(new Headers(init?.headers).entries()),
          ...Object.fromEntries(new Headers(authHeaders).entries())
        }
      }
      return _get<T>(url, mergedInit)
    },
    post: <T>(url: string, body?: unknown, init?: RequestInit) => {
      const mergedInit: RequestInit = {
        ...init,
        headers: {
          ...Object.fromEntries(new Headers(init?.headers).entries()),
          ...Object.fromEntries(new Headers(authHeaders).entries())
        }
      }
      return _post<T>(url, body, mergedInit)
    },
  }
}
