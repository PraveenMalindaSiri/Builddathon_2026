import axios, { AxiosError, isAxiosError } from 'axios'
import type { ApiErrorResponse } from '@/types/api'
import { env } from '@/config/env'

const client = axios.create({
  baseURL: env.backendUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000,
})

function parseError(error: unknown): string {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
    if (axiosError.code === 'ECONNABORTED') {
      return 'The request timed out. Please try again.'
    }
    if (!axiosError.response) {
      return 'Could not connect to backend. Please check whether the backend is running.'
    }
    return 'Something went wrong while generating your pitch. Please try again.'
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred. Please try again.'
}

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
  body: TRequest,
): Promise<TResponse> {
  try {
    const { data } = await client.post<TResponse>(path, body)
    return data
  } catch (error) {
    throw new Error(parseError(error))
  }
}
