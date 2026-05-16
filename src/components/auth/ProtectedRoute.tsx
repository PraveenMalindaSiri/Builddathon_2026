import { Navigate, useLocation } from 'react-router-dom'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { env } from '@/config/env'
import { useAuth } from '@/contexts/AuthContext'
import { getToken } from '@/lib/apiClient'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useAuth()
  const location = useLocation()
  const hasToken = !!getToken()

  if (env.useMockApi) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner label="Loading..." />
      </div>
    )
  }

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
