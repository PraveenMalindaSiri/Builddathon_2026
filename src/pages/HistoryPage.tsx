import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { SectionHeader } from '@/components/common/SectionHeader'
import { IconTrash } from '@/components/icons/Icons'
import { PageShell } from '@/components/layout/PageShell'
import { cn } from '@/lib/cn'
import {
  deleteAllCampaigns,
  deleteAllPitchSessions,
  deleteCampaign,
  deletePitchSession,
} from '@/services/sessionService'
import { getHistory } from '@/services/historyService'
import type { CampaignListItem, SessionListItem } from '@/types/launchpad'

type Tab = 'pitches' | 'campaigns'

function statusTone(status: string): 'success' | 'warning' | 'danger' | 'default' {
  if (status === 'done') return 'success'
  if (status === 'failed') return 'danger'
  if (status === 'processing') return 'warning'
  return 'default'
}

export function HistoryPage() {
  const [tab, setTab] = useState<Tab>('pitches')
  const [pitches, setPitches] = useState<SessionListItem[]>([])
  const [campaigns, setCampaigns] = useState<CampaignListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [clearingAll, setClearingAll] = useState(false)

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getHistory()
      setPitches(data.pitches ?? [])
      setCampaigns(data.campaigns ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadHistory()
  }, [loadHistory])

  const handleDeletePitch = async (sessionId: string) => {
    if (!window.confirm('Delete this pitch session permanently?')) return
    setDeletingId(sessionId)
    try {
      await deletePitchSession(sessionId)
      setPitches((prev) => prev.filter((s) => s.id !== sessionId))
      toast.success('Pitch deleted')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete pitch')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!window.confirm('Delete this campaign permanently?')) return
    setDeletingId(campaignId)
    try {
      await deleteCampaign(campaignId)
      setCampaigns((prev) => prev.filter((c) => c.id !== campaignId))
      toast.success('Campaign deleted')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete campaign')
    } finally {
      setDeletingId(null)
    }
  }

  const handleClearAll = async () => {
    const label = tab === 'pitches' ? 'pitch sessions' : 'campaigns'
    if (!window.confirm(`Delete all ${label} permanently? This cannot be undone.`)) return
    setClearingAll(true)
    try {
      if (tab === 'pitches') {
        const res = await deleteAllPitchSessions()
        setPitches([])
        toast.success(
          res.deletedCount > 0
            ? `Deleted ${res.deletedCount} pitch${res.deletedCount === 1 ? '' : 'es'}`
            : 'No pitches to delete',
        )
      } else {
        const res = await deleteAllCampaigns()
        setCampaigns([])
        toast.success(
          res.deletedCount > 0
            ? `Deleted ${res.deletedCount} campaign${res.deletedCount === 1 ? '' : 's'}`
            : 'No campaigns to delete',
        )
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to clear history')
    } finally {
      setClearingAll(false)
    }
  }

  const activeList = tab === 'pitches' ? pitches : campaigns
  const isEmpty = !loading && !error && activeList.length === 0

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeader
            title="History"
            description="Your pitch sessions and campaign packages in one place."
          />
          {activeList.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={clearingAll}
              onClick={() => void handleClearAll()}
            >
              {clearingAll ? 'Clearing…' : 'Clear all'}
            </Button>
          )}
        </div>

        <div className="mb-8 flex gap-2 rounded-xl border border-border bg-surface/60 p-1">
          {(['pitches', 'campaigns'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                tab === t
                  ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {t === 'pitches' ? `Pitched (${pitches.length})` : `Campaigns (${campaigns.length})`}
            </button>
          ))}
        </div>

        {loading && <LoadingSpinner label="Loading history..." />}
        {error && <ErrorState message={error} onRetry={() => void loadHistory()} />}

        {isEmpty && tab === 'pitches' && (
          <EmptyState
            title="No pitches yet"
            message="Generate your first pitch to see it here."
            actionTo="/pitch"
            actionLabel="Start Pitch Mode"
          />
        )}
        {isEmpty && tab === 'campaigns' && (
          <EmptyState
            title="No campaigns yet"
            message="Generate your first campaign to see it here."
            actionTo="/campaign"
            actionLabel="Start Campaign Mode"
          />
        )}

        {tab === 'pitches' && !loading && !error && pitches.length > 0 && (
          <ul className="space-y-3">
            {pitches.map((s) => (
              <li key={s.id}>
                <Card className="flex items-center gap-3 transition hover:border-accent/40">
                  <Link to={`/pitch/result/${s.id}`} className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{s.title}</p>
                    {s.concept_summary?.summary && (
                      <p className="mt-1 line-clamp-2 text-xs text-ink-muted">
                        {s.concept_summary.summary}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-ink-muted">
                      {new Date(s.updated_at).toLocaleString()}
                      {s.viability_score?.overall !== undefined &&
                        ` | Viability ${s.viability_score.overall}/100`}
                    </p>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Delete pitch"
                    disabled={deletingId === s.id}
                    onClick={() => void handleDeletePitch(s.id)}
                  >
                    <IconTrash size={16} />
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        )}

        {tab === 'campaigns' && !loading && !error && campaigns.length > 0 && (
          <ul className="space-y-3">
            {campaigns.map((c) => (
              <li key={c.id}>
                <Card className="flex items-center gap-3 overflow-hidden transition hover:border-warm/40">
                  {c.banner_url && (
                    <Link to={`/campaign/${c.id}`} className="hidden shrink-0 sm:block">
                      <img
                        src={c.banner_url}
                        alt=""
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    </Link>
                  )}
                  <Link to={`/campaign/${c.id}`} className="min-w-0 flex-1 py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{c.title}</p>
                      <Badge tone="info" className="normal-case">
                        {c.tone}
                      </Badge>
                      <Badge tone={statusTone(c.status)} className="normal-case">
                        {c.status}
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{c.description}</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {new Date(c.updated_at).toLocaleString()}
                    </p>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Delete campaign"
                    disabled={deletingId === c.id}
                    onClick={() => void handleDeleteCampaign(c.id)}
                  >
                    <IconTrash size={16} />
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  )
}
