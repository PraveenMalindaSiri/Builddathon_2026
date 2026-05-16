import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { ErrorState } from '@/components/common/ErrorState'
import { PageShell } from '@/components/layout/PageShell'
import { useAuth } from '@/contexts/AuthContext'
import * as authService from '@/services/authService'

export function SignupPage() {
  const { isAuthenticated, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  if (isAuthenticated) {
    navigate('/pitch', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setCheckEmail(false)
    try {
      const data = await authService.signUp(email, password, name || undefined)
      if (data.access_token) {
        await refreshUser()
        navigate('/pitch', { replace: true })
      } else {
        setCheckEmail(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-100">Create account</h1>
        <p className="mt-2 text-sm text-slate-400">Register to save sessions and generate pitches.</p>
        {checkEmail && (
          <p className="mt-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-200">
            Check your email to confirm your account, then sign in.
          </p>
        )}
        {error && !checkEmail && (
          <div className="mt-6">
            <ErrorState message={error} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input label="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
