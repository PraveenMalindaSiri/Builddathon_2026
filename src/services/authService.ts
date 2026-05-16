import { apiGet, apiPost, setToken, clearSessionKeys } from '@/lib/apiClient'
import type { AuthUser, SignInResponse } from '@/types/backend'

export async function signUp(email: string, password: string, name?: string) {
  const data = await apiPost<
    { email: string; password: string; name?: string },
    SignInResponse
  >('/api/auth/signup', { email, password, name })
  if (data.access_token) setToken(data.access_token)
  return data
}

export async function signIn(email: string, password: string) {
  const data = await apiPost<{ email: string; password: string }, SignInResponse>(
    '/api/auth/signin',
    { email, password },
  )
  setToken(data.access_token)
  return data
}

export async function signOut() {
  try {
    await apiPost('/api/auth/signout', {})
  } catch {
    // clear client even if server call fails
  } finally {
    setToken(null)
    clearSessionKeys()
  }
}

export async function getMe(): Promise<AuthUser> {
  return apiGet<AuthUser>('/api/auth/me')
}

export async function checkHealth() {
  return apiGet<{ status: string }>('/api/health')
}
