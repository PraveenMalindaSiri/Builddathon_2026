import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { ErrorState } from '@/components/common/ErrorState'
import { PageShell } from '@/components/layout/PageShell'
import { useAuth } from '@/contexts/AuthContext'

export function LoginPage() {
  const { signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/pitch'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    navigate(redirect, { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-100">Sign in</h1>
        <p className="mt-2 text-sm text-slate-400">
          Sign in to run Pitch Mode and Campaign Mode on the live backend.
        </p>
        {error && (
          <div className="mt-6">
            <ErrorState message={error} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          No account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
