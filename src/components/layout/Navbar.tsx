import { Link, NavLink } from 'react-router-dom'
import { LogOut, Rocket } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { env } from '@/config/env'
import { useAuth } from '@/contexts/AuthContext'
import { getToken } from '@/lib/apiClient'
import { cn } from '@/lib/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm font-medium transition',
    isActive ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200',
  )

export function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth()
  const showAuth = isAuthenticated || !!getToken() || env.useMockApi

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-slate-100">
          <Rocket className="h-6 w-6 text-blue-400" aria-hidden />
          <span className="font-semibold">LaunchPad AI</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main">
          <NavLink to="/pitch" className={linkClass}>
            Pitch Mode
          </NavLink>
          <NavLink to="/campaign" className={linkClass}>
            Campaign Mode
          </NavLink>
          {showAuth && !env.useMockApi && (
            <NavLink to="/history" className={linkClass}>
              History
            </NavLink>
          )}
          {showAuth && user && (
            <span className="hidden text-xs text-slate-500 sm:inline">{user.email}</span>
          )}
          {showAuth && !env.useMockApi ? (
            <Button variant="ghost" size="sm" onClick={() => void signOut()}>
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          ) : !env.useMockApi ? (
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
