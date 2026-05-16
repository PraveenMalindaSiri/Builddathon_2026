import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { SectionHeader } from '@/components/common/SectionHeader'
import { PageShell } from '@/components/layout/PageShell'
import { PitchResultDashboard } from '@/components/pitch/PitchResultDashboard'
import { ExportActions } from '@/components/pitch/ExportActions'
import { PitchAudioCard } from '@/components/pitch/PitchAudioCard'
import { STORAGE_KEYS } from '@/config/constants'
import { loadStoredResult } from '@/hooks/usePitchGeneration'
import { getPitchResult } from '@/services/sessionService'
import type { PitchGenerationResult } from '@/types/pitch'

export function PitchResultPage() {
  const { sessionId: paramId } = useParams<{ sessionId?: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const stateResult = (location.state as { result?: PitchGenerationResult } | null)?.result

  const sessionId =
    paramId || localStorage.getItem(STORAGE_KEYS.sessionId) || stateResult?.sessionId

  const [result, setResult] = useState<PitchGenerationResult | null>(
    stateResult ?? loadStoredResult(),
  )
  const [loading, setLoading] = useState(!stateResult && !!sessionId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (stateResult) {
      setResult(stateResult)
      return
    }
    if (!sessionId) {
      setLoading(false)
      return
    }
    void (async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getPitchResult(sessionId)
        setResult(data)
        if (data.audioWarning && !data.audioUrl) {
          toast.warning('Pitch package ready. Voice audio was unavailable.', {
            description: data.audioWarning,
          })
        }
        localStorage.setItem(STORAGE_KEYS.lastPitchResult, JSON.stringify(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load session')
      } finally {
        setLoading(false)
      }
    })()
  }, [sessionId, stateResult])

  if (loading) {
    return (
      <PageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <LoadingSpinner label="Loading pitch package..." />
        </div>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <div className="mx-auto max-w-lg px-4 py-16">
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </PageShell>
    )
  }

  if (!result) {
    return (
      <PageShell>
        <div className="mx-auto max-w-lg px-4 py-24 sm:px-6">
          <EmptyState />
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeader
            title="Pitch Package"
            description="Your complete venture intelligence package, ready to present."
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate('/pitch')}>
              Start new idea
            </Button>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </div>
        <ExportActions result={result} sessionId={result.sessionId || sessionId || ''} />
        {result.audioUrl && <div className="mb-6"><PitchAudioCard audioUrl={result.audioUrl} /></div>}
        <PitchResultDashboard result={result} />
      </div>
    </PageShell>
  )
}
