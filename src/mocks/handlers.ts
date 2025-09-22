import { http, HttpResponse } from 'msw'

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/signin', () => {
    return HttpResponse.json({ token: 'mock-token', user: { name: 'Backoffice User' } })
  }),

  // Add specific handlers above as needed. Unhandled requests will bypass.
]
