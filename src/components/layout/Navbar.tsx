import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import {
  IconCampaign,
  IconHistory,
  IconLogo,
  IconLogout,
  IconPitch,
} from '@/components/icons/Icons'
import { env } from '@/config/env'
import { useAuth } from '@/contexts/AuthContext'
import { getToken } from '@/lib/apiClient'
import { cn } from '@/lib/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-accent/10 text-accent'
      : 'text-ink-muted hover:bg-surface-2 hover:text-ink',
  )

export function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth()
  const showAuth = isAuthenticated || !!getToken() || env.useMockApi

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5 text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-gold/10 text-accent ring-1 ring-accent/30 transition group-hover:ring-accent/60">
            <IconLogo size={22} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Launch<span className="text-gradient-accent">Pad</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <NavLink to="/pitch" className={linkClass}>
            <IconPitch size={16} />
            <span className="hidden sm:inline">Pitch</span>
          </NavLink>
          <NavLink to="/campaign" className={linkClass}>
            <IconCampaign size={16} />
            <span className="hidden sm:inline">Campaign</span>
          </NavLink>
          {showAuth && !env.useMockApi && (
            <NavLink to="/history" className={linkClass}>
              <IconHistory size={16} />
              <span className="hidden sm:inline">History</span>
            </NavLink>
          )}
          {showAuth && user && (
            <span className="hidden max-w-[140px] truncate text-xs text-ink-muted lg:inline">
              {user.email}
            </span>
          )}
          {showAuth && !env.useMockApi ? (
            <Button variant="ghost" size="sm" onClick={() => void signOut()}>
              <IconLogout size={16} />
              <span className="hidden sm:inline">Sign out</span>
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
