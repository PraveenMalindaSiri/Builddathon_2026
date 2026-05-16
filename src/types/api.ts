export type ApiErrorResponse = {
  error?: string
  message: string
  code?: string
  details?: string
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export class ApiAuthError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'ApiAuthError'
  }
}
