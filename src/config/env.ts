export const env = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}
