import { Link, NavLink } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import { cn } from '@/lib/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm font-medium transition',
    isActive ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200',
  )

export function Navbar() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-slate-100">
          <Rocket className="h-6 w-6 text-blue-400" aria-hidden />
          <span className="font-semibold">LaunchPad AI</span>
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main">
          <NavLink to="/pitch" className={linkClass}>
            Pitch Mode
          </NavLink>
          <NavLink to="/campaign" className={linkClass}>
            Campaign Mode
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
