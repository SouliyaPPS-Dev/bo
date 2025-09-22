export async function signIn(params: { email: string; password: string }) {
  // Mock implementation; replace with real HTTP call
  await new Promise((r) => setTimeout(r, 400))
  return { token: 'dev-token', user: { email: params.email } }
}

