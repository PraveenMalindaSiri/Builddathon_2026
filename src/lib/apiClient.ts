import axios, { type AxiosError, isAxiosError } from 'axios'
import { STORAGE_KEYS } from '@/config/constants'
import { env } from '@/config/env'
import { ApiAuthError, type ApiErrorResponse } from '@/types/api'

/** No client timeout — long AI steps can take several minutes; rely on backend errors. */
const client = axios.create({
  baseURL: env.apiUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 0,
})

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.token)
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(STORAGE_KEYS.token, token)
  else localStorage.removeItem(STORAGE_KEYS.token)
}

export function clearSessionKeys() {
  localStorage.removeItem(STORAGE_KEYS.sessionId)
  localStorage.removeItem(STORAGE_KEYS.jobId)
  localStorage.removeItem(STORAGE_KEYS.campaignId)
}

function parseError(error: unknown): string {
  if (error instanceof ApiAuthError) return error.message
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
    if (!axiosError.response) {
      return 'Could not connect to backend. Please check the API URL and that the server is running.'
    }
    return 'Something went wrong. Please try again.'
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred. Please try again.'
}

client.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? ''
      const isAuthAttempt =
        url.includes('/auth/signin') ||
        url.includes('/auth/signup')
      if (!isAuthAttempt) {
        setToken(null)
        clearSessionKeys()
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        }
      }
      return Promise.reject(new ApiAuthError('Session expired. Please sign in again.'))
    }
    return Promise.reject(error)
  },
)

export async function apiGet<T>(path: string): Promise<T> {
  try {
    const { data } = await client.get<T>(path)
    return data
  } catch (error) {
    throw new Error(parseError(error))
  }
}

export async function apiPost<TRequest, TResponse>(
  path: string,
  body?: TRequest,
): Promise<TResponse> {
  try {
    const { data } = await client.post<TResponse>(path, body ?? {})
    return data
  } catch (error) {
    throw new Error(parseError(error))
  }
}

export async function apiDelete<T>(path: string): Promise<T> {
  try {
    const { data } = await client.delete<T>(path)
    return data
  } catch (error) {
    throw new Error(parseError(error))
  }
}

export async function downloadBlob(path: string): Promise<Blob> {
  const token = getToken()
  const res = await fetch(`${env.apiUrl}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (res.status === 401) {
    setToken(null)
    clearSessionKeys()
    window.location.href = '/login'
    throw new ApiAuthError()
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as ApiErrorResponse).message || `Download failed (${res.status})`)
  }
  return res.blob()
}

export { client }
