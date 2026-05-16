import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { formatMarketStatus } from '@/lib/formatters'
import type { MarketScan, MarketStatus } from '@/types/pitch'

type MarketScanCardProps = {
  data: MarketScan
}

function statusTone(status: MarketStatus): 'danger' | 'warning' | 'success' | 'default' {
  if (status === 'saturated') return 'danger'
  if (status === 'crowded_but_possible') return 'warning'
  if (status === 'underserved') return 'success'
  return 'default'
}

export function MarketScanCard({ data }: MarketScanCardProps) {
  const competitors = data.competitors ?? []

  return (
    <div className="space-y-4">
      <Card>
        <Badge tone={statusTone(data.status)} className="mb-3">
          {formatMarketStatus(data.status)}
        </Badge>
        <p className="text-sm leading-relaxed text-ink-soft">{data.summary}</p>
        {data.suggestedPositioning && (
          <p className="mt-4 rounded-xl bg-blue-500/5 border border-accent/20 p-4 text-sm text-accent/80">
            <strong className="text-accent">Positioning: </strong>
            {data.suggestedPositioning}
          </p>
        )}
        {data.marketSizeEstimate && (
          <p className="mt-3 text-xs text-ink-muted">Market size: {data.marketSizeEstimate}</p>
        )}
      </Card>

      <Card>
        <h4 className="mb-4 font-semibold text-ink">Competitors</h4>
        {competitors.length === 0 ? (
          <p className="text-sm text-ink-muted">No competitor data returned.</p>
        ) : (
          <ul className="space-y-4">
            {competitors.map((c) => (
              <li key={c.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <p className="font-medium text-ink-soft">{c.name}</p>
                {c.description && <p className="mt-1 text-sm text-ink-muted">{c.description}</p>}
                <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                  {c.strength && (
                    <p><span className="text-accent">Strength:</span> {c.strength}</p>
                  )}
                  {c.weakness && (
                    <p><span className="text-gold">Weakness:</span> {c.weakness}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {data.opportunityGaps?.length > 0 && (
        <Card>
          <h4 className="mb-3 font-semibold text-ink">Opportunity gaps</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-ink-soft">
            {data.opportunityGaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
