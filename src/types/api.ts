export type ApiErrorResponse = {
  message: string
  code?: string
  details?: string
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'
