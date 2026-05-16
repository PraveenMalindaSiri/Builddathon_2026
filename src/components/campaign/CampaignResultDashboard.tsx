import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { IconDownload } from '@/components/icons/Icons'
import { env } from '@/config/env'
import type { CampaignGenerationResult } from '@/types/campaign'

type CampaignResultDashboardProps = {
  result: CampaignGenerationResult
  campaignId?: string
  onDownloadZip?: () => void
  showNewCampaignLink?: boolean
}

export function CampaignResultDashboard({
  result,
  campaignId,
  onDownloadZip,
  showNewCampaignLink = true,
}: CampaignResultDashboardProps) {
  return (
    <div className="space-y-6">
      {campaignId && !env.useMockApi && onDownloadZip && (
        <Button variant="secondary" onClick={() => void onDownloadZip()}>
          <IconDownload size={16} />
          Download campaign ZIP
        </Button>
      )}
      {result.referenceImageUrl && (
        <Card>
          <h3 className="font-display font-semibold text-ink">Your reference upload</h3>
          <img
            src={result.referenceImageUrl}
            alt="Reference upload"
            className="mt-3 max-h-48 w-full rounded-xl object-cover"
          />
        </Card>
      )}
      {result.bannerUrl && (
        <Card>
          <h3 className="font-display font-semibold text-ink">Generated banner</h3>
          <img
            src={result.bannerUrl}
            alt="Campaign banner"
            className="mt-3 max-h-64 w-full rounded-xl object-cover"
          />
        </Card>
      )}
      {result.audioUrl && (
        <Card>
          <h3 className="font-display font-semibold text-ink">Campaign audio</h3>
          <audio controls className="mt-3 w-full" src={result.audioUrl} />
        </Card>
      )}
      {result.videoUrl && (
        <Card>
          <h3 className="font-display font-semibold text-ink">Promo video</h3>
          <video controls className="mt-3 w-full rounded-xl" src={result.videoUrl} />
        </Card>
      )}
      <Card>
        <h3 className="font-display font-semibold text-ink">Taglines</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          {result.taglines.map((t) => (
            <li key={t}>&ldquo;{t}&rdquo;</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="font-display font-semibold text-ink">Hero copy</h3>
        <p className="mt-2 text-lg font-medium text-ink">{result.heroCopy.headline}</p>
        <p className="text-sm text-ink-muted">{result.heroCopy.subheadline}</p>
      </Card>
      <Card>
        <h3 className="font-display font-semibold text-ink">Social captions</h3>
        <div className="mt-3 space-y-4">
          {result.socialCaptions.map((c) => (
            <div key={c.platform}>
              <p className="text-xs font-medium uppercase tracking-wide text-accent">{c.platform}</p>
              <p className="mt-1 text-sm text-ink-soft">{c.caption}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="font-display font-semibold text-ink">Email</h3>
        <p className="mt-2 text-sm font-medium text-ink">{result.emailCopy.subject}</p>
        <pre className="mt-2 whitespace-pre-wrap text-sm text-ink-muted">{result.emailCopy.body}</pre>
      </Card>
      <Card>
        <h3 className="font-display font-semibold text-ink">
          Ad script ({result.adScript.duration})
        </h3>
        <pre className="mt-2 whitespace-pre-wrap text-sm text-ink-soft">{result.adScript.script}</pre>
      </Card>
      {showNewCampaignLink && (
        <Link to="/campaign">
          <Button variant="secondary">Generate another campaign</Button>
        </Link>
      )}
    </div>
  )
}
