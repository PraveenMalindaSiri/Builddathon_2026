import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { SectionHeader } from '@/components/common/SectionHeader'
import { PageShell } from '@/components/layout/PageShell'
import { deletePitchSession, listSessions } from '@/services/sessionService'

type SessionRow = {
  id: string
  created_at?: string
  concept_summary?: { oneLineSummary?: string; one_line_summary?: string }
  viability_score?: { overall?: number }
}

export function HistoryPage() {
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    void (async () => {
      try {
        const data = await listSessions()
        setSessions(data as SessionRow[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sessions')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleDelete = async (sessionId: string) => {
    if (!window.confirm('Delete this pitch session permanently?')) return
    setDeletingId(sessionId)
    try {
      await deletePitchSession(sessionId)
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
      toast.success('Session deleted')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete session')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          title="Your pitch history"
          description="Past sessions saved on the server."
        />
        {loading && <LoadingSpinner label="Loading sessions..." />}
        {error && <ErrorState message={error} />}
        {!loading && !error && sessions.length === 0 && (
          <EmptyState
            title="No sessions yet"
            message="Generate your first pitch to see it here."
            actionTo="/pitch"
          />
        )}
        <ul className="mt-6 space-y-3">
          {sessions.map((s) => {
            const summary =
              s.concept_summary?.oneLineSummary ||
              s.concept_summary?.one_line_summary ||
              'Pitch session'
            const score = s.viability_score?.overall
            return (
              <li key={s.id}>
                <Card className="flex items-center gap-3 transition hover:border-blue-500/40">
                  <Link to={`/pitch/result/${s.id}`} className="min-w-0 flex-1">
                    <p className="font-medium text-slate-100">{summary}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {s.created_at ? new Date(s.created_at).toLocaleString() : s.id}
                      {score !== undefined && ` · Viability ${score}/100`}
                    </p>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Delete session"
                    disabled={deletingId === s.id}
                    onClick={() => void handleDelete(s.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    </PageShell>
  )
}
