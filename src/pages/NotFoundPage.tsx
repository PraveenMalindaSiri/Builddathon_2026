import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { PageShell } from '@/components/layout/PageShell'

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-slate-700">404</h1>
        <p className="mt-4 text-lg text-ink-soft">Page not found</p>
        <Link to="/" className="mt-8">
          <Button>Go back home</Button>
        </Link>
      </div>
    </PageShell>
  )
}
