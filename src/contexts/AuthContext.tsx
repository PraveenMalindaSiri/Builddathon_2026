import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getToken } from '@/lib/apiClient'
import * as authService from '@/services/authService'
import type { AuthUser } from '@/types/backend'

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setUser(null)
      return
    }
    try {
      const me = await authService.getMe()
      setUser(me)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    void (async () => {
      setIsLoading(true)
      await refreshUser()
      setIsLoading(false)
    })()
  }, [refreshUser])

  const signIn = useCallback(async (email: string, password: string) => {
    const data = await authService.signIn(email, password)
    setUser(data.user)
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    const data = await authService.signUp(email, password, name)
    if (data.user) setUser(data.user)
  }, [])

  const signOut = useCallback(async () => {
    await authService.signOut()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user && !!getToken(),
      signIn,
      signUp,
      signOut,
      refreshUser,
    }),
    [user, isLoading, signIn, signUp, signOut, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
