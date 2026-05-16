import { motion } from 'framer-motion'
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
import { useActivePipeline } from '@/contexts/ActivePipelineContext'
import { useHideOnScroll } from '@/hooks/useHideOnScroll'
import { getToken } from '@/lib/apiClient'
import { cn } from '@/lib/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 font-grotesk',
    isActive
      ? 'bg-accent/10 text-accent glow-cyan'
      : 'text-ink-muted hover:bg-surface-2 hover:text-accent',
  )

export function Navbar() {
  const { user, signOut, isAuthenticated } = useAuth()
  const { pitchActive, campaignActive } = useActivePipeline()
  const hidden = useHideOnScroll()
  const showAuth = isAuthenticated || !!getToken() || env.useMockApi
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -72 : 0, opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="navbar-glass fixed top-0 right-0 left-0 z-40"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5 text-ink">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white ring-1 ring-accent/30 transition group-hover:ring-accent/60"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #a78bfa)' }}
          >
            <IconLogo size={22} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Pitch<span className="gradient-text">Smash</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <NavLink to="/pitch" className={linkClass}>
            <span className="relative">
              <IconPitch size={16} />
              {pitchActive && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent-cyan)]" />
              )}
            </span>
            <span className="hidden sm:inline">Pitch</span>
          </NavLink>
          <NavLink to="/campaign" className={linkClass}>
            <span className="relative">
              <IconCampaign size={16} />
              {campaignActive && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-violet shadow-[0_0_8px_#a78bfa]" />
              )}
            </span>
            <span className="hidden sm:inline">Campaign</span>
          </NavLink>
          {showAuth && !env.useMockApi && (
            <NavLink to="/history" className={linkClass}>
              <IconHistory size={16} />
              <span className="hidden sm:inline">History</span>
            </NavLink>
          )}
          {showAuth && user && (
            <span className="hidden max-w-[140px] truncate font-mono text-xs text-ink-muted lg:inline">
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
    </motion.header>
  )
}
