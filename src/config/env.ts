export const env = {
  apiUrl:
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    'http://localhost:3000',
  useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}

/** @deprecated use env.apiUrl */
export const backendUrl = env.apiUrl
