import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { SectionHeader } from '@/components/common/SectionHeader'
import { CampaignResultDashboard } from '@/components/campaign/CampaignResultDashboard'
import { PageShell } from '@/components/layout/PageShell'
import { STORAGE_KEYS } from '@/config/constants'
import { downloadCampaignZip, getCampaign } from '@/services/campaignService'
import type { CampaignGenerationResult } from '@/types/campaign'

export function CampaignResultPage() {
  const { campaignId: paramId } = useParams<{ campaignId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const stateResult = (location.state as { result?: CampaignGenerationResult } | null)?.result

  const campaignId = paramId || localStorage.getItem(STORAGE_KEYS.campaignId) || undefined

  const [result, setResult] = useState<CampaignGenerationResult | null>(stateResult ?? null)
  const [loading, setLoading] = useState(!stateResult && !!campaignId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (stateResult) {
      setResult(stateResult)
      return
    }
    if (!campaignId) {
      setLoading(false)
      return
    }
    void (async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCampaign(campaignId)
        setResult(data)
        localStorage.setItem(STORAGE_KEYS.lastCampaignResult, JSON.stringify(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campaign')
      } finally {
        setLoading(false)
      }
    })()
  }, [campaignId, stateResult])

  const handleDownloadZip = async () => {
    if (!campaignId) return
    await downloadCampaignZip(campaignId)
  }

  if (loading) {
    return (
      <PageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <LoadingSpinner label="Loading campaign package..." />
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
        <div className="mx-auto max-w-lg px-4 py-24">
          <EmptyState
            title="No campaign found"
            message="Generate a campaign or open one from history."
            actionLabel="Campaign Mode"
            actionTo="/campaign"
          />
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeader
            title="Campaign Package"
            description="Your generated campaign assets, ready to launch."
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate('/campaign')}>
              New campaign
            </Button>
            <Link to="/history">
              <Button variant="ghost">History</Button>
            </Link>
          </div>
        </div>
        <CampaignResultDashboard
          result={result}
          campaignId={campaignId}
          onDownloadZip={handleDownloadZip}
        />
      </div>
    </PageShell>
  )
}
